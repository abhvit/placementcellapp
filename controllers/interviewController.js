const interviewSchema=require('../models/interview')
const resultSchema=require('../models/results')
const studentSchema=require('../models/student')

module.exports.addInterview=async(req,res)=>{
    const student_list=req.body.student_list;
    const interviewData=await interviewSchema.create({
        title:req.body.title,
        date:req.body.date,
        description:req.body.description,
        student_mapped:student_list
    });
    //console.log(interviewData)

    if(interviewData && interviewData.student_mapped.length>0){
         //if we have interview data the initially we can set result of all student to hold
         if(typeof(student_list)!='string'){
            for(let i=0; i<student_list.length;i++){
                await resultSchema.create({
                    interview_id: interviewData.id,
                    student_id:student_list[i],
                    result:"On hold"//setting intially data to hold
                });
            }
         }
         else{//if only one student needs to be mapped
            await ResultSchema.create({
                interview_id: interviewData.id,
                student_id: student_list,
                result: "On hold"//setting intially data to hold
            });
         }
         return res.redirect('back');
    }
    else {//if user didn't select to map the student then don't create enrty in result schema
        return res.redirect('back')
    }
}

module.exports.showInterview=async(req,res)=>{//show the interview and result data to the user

    const studentData=await studentSchema.find({});
    const interview_data=await interviewSchema.findById(req.query.number).populate('student_mapped');
    resultSchema.find({interview_id:req.query.number},(err,data)=>{
        
        if(err){
            console.log("ERROR IN RESSCHEMA" + err);
            return;
        }
               // console.log("data")


               
               // console.log("data")
               res.render('interview_explore', {
                data:interview_data,//sending interview schema data
                result: data, //sending result
                studentData: studentData
               })
    }).clone()

}