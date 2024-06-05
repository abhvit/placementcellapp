const studentSchema=require('../models/student');
const interviewSchema=require('../models/interview');
const resultSchema=require('../models/results');
const empSchema=require('../models/Employee');
const e=require('express');
const Result=require('../models/results');
module.exports.index=(req,res)=>{

    if(!req.isAuthenticated()){//if user is already authenticated and had cookie of it then if he goes to signup 
        //redirect it back to home index.ejs
        return res.render('login');

    }

    studentSchema.find({}, (err, studentdata)=>{
        if(err){
            console.log("some error occured while fetching data for student: " + err);
            return;
        }
        else{
            interviewSchema.find({}).populate(student_mapped).exec((err, interviewSchema)=>{
                if(err){
                    console.log("some error occured while fetching data for interview: " + err);
                    return;
                }
                res.render('index',{
                    studentdata: studentdata,
                    interviewData: interviewdata
                })
            });
        }
    })
    
}

module.exports.csv=async(req,res)=>{
    const excelJS=require('exceljs');
    try{
        const workbook=new excelJS.Workbook();
        const worksheet=workbook.addWorksheet("Student Data", { properties: {tabColor: {argb: 'FFC0000'}}});//adding worksheet to csv
        workbook.addWorksheet('New Sheet', {
            headerFooter: {oddFooter: "Page &P of &N", oddHeader: 'Odd Page'}
        });
        worksheet.getCell('A1').fill={
            type:'pattern',
            pattern:'darkTrellis',
            fgColor: { argb: 'FFFFFF00' },
            bgColor: { argb: 'FF0000FF' }
        };
        worksheet.columns=[//column with its names
        {header: "S no",key:"serial_no", filterButton: false},
        {header: "Student id", key: "_id", filterButton:true},
        {header: "student name", key: "name",filterButton: true},
        {header:"student college", key:"college",filterButton:true},
        {header:"DSA Final Score", key:"dsa_score",filterButton:true},
        {header:"WebD Final Score", key:"webd_score",filterButton:true},
        {header:"React Final Score", key:"react_score",filterButton:true},
        {header:"Interview Name", key:"title",filterButton:true},
        {header:"Interview Date", key:"date",filterButton: true},
        {header:"Interview Status", key:"status", filterButton:true},

        ];

        //getting all the data from result schema
        const studentdata=await resultSchema.find({}).populate('student_id').populate('interview_id');
        let counter=1;
        console.log(studentdata)
        studentdata.forEach(async(data)=>{
            data.student_id.serial_no=counter;
            counter++;
            console.log(data.interview_id.title);
              // const adata=data.student_id+data.interview_id
              worksheet.addRow(data.student_id)
              const row=worksheet.lastRow;
              row.getCell(8).value=data.interview_id.title
              row.getCell(9).value=data.interview_id.date
              row.getCell(10).value=data.result
        })
        worksheet.autoFilter='A1:J1';//to add auto filter inside the csv
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheatml.sheet"
            //setting header to download the file 
        )
         //setting header to download the csv file 
         res.setHeader("Content-Disposition", 'attachement; filename=InterviewData.csv');

         return workbook.csv.write(res).then(() => {
            res.status(200)//sending res as 200 i.e request is successfull
            // res.redirect('back')
    })
} catch(err){
    console.log(err.message);
}
}

module.exports.signup = async (req, res) => {
    if (req.isAuthenticated()){//if user is already authenticated and had cookie of it then if he goes to signup 
        //redirect it back to home index.ejs
        return res.redirect('/');
    }

    empSchema.create({
        name: req.body.name,
        email: req.body.email,
        emp_id: req.body.empid,
        password: req.body.password
    })
    res.redirect('back')
}

module.exports.login=async(req,res)=>{
    if(req.isAuthenticated()){
        res.redirect('/')
    }
    empSchema.find({
        email:req.body.email,
        password:req.body.password
    },(err,data)=>{
        if(err){
            console.log("ERROR IN GETTING EMP DATA: "+ err);return}
            //console.log(data)
            res.redirect('back')
    })
}


// creating session for a particular user


module.exports.createSession=(req,res)=>{
    console.log("Session created");

    empSchema.findOne({
        email:req.body.email
    }, (err,data)=>{
        if(err){
            console.log("ERROR IN GETTING EMP DATA: " + err); return}
              // console.log(data)
        // res.redirect('back')
        if(data){
            if(req.body.password!=data.password)//if password mismatch
            {
                console.log("Wrong username/password");
                return res.render('login');
            }
            else{
                res.cookie('user_id',data_id);
                res.redirect('/');
            }
                 
        }
    })
}


//destroying session i.e signout
module.exports.destroySession=function(req,res,next){
    req.logout(function(err) {
     if (err) { return next(err); }
     res.redirect('/');//redirecting to index.ejs
   });
 }