const studentSchema = require('../models/student')//student schema
const ResultSchema = require('../models/results');//result schema
const interviewSchema = require('../models/interview');//result schema
const { options } = require('../routes');

//module to add student to DB
module.exports.addStudent = (req, res) => {
    //inserting data to student DB
    studentSchema.create({//get all data from query
        email: req.query.email,
        name: req.query.name,
        address: req.query.address,
        batch: req.query.batch,
        college: req.query.college,
        dsa_score: req.query.dsa_score,
        webd_score: req.query.webdscore,
        react_score: req.query.react_score
    }, (err, data) => {
        if (err) {
            console.log("Some error occured while putting data for student: " + err);
            return;
        }
        res.redirect('back');
    });
}


module.exports.result = async (req, res) => {
    //first finding if data is already there or not 
    //to differntiate between new data and old data

    const filter = { student_id: req.query.sid, interview_id: req.query.jid };
    const update = { result: req.body.result };
    //upsert means that if there is no matching data then make if it is then update it 
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    //if matching data of filter found then update it else create it
    await ResultSchema.findOneAndUpdate(filter, update, options, (err, data) => {
        if (err)
            console.log(err);
        res.redirect('back')
    }).clone();

}

async function createResult(sid, iid) {//function to create new entry for the result model
    // console.log(sid + "" + iid);
    await ResultSchema.create({
        interview_id: iid,
        student_id: sid,
        result: "On hold"//setting intially data to hold
    });
    return;
}

async function updateInterview(iid, sid) {//function to update the interview model
    // console.log(sid + "" + iid);
    const doc = await interviewSchema.findOne({ _id: iid })
    // Append items to student_mapped
    doc.student_mapped.push(sid)
    // Update document
    await doc.save()
    return;
}

module.exports.map = async (req, res) => {
    const student_list = req.body.student_list;
    // console.log(student_list);
    if (typeof (student_list) == 'string') {//if user select only one student 
        const result = await ResultSchema.find({ interview_id: req.body.inter_id, student_id: student_list });
        // console.log(result)
        if (result.length == 0) {//create only if there doesn't exsist data on result tab
            createResult(student_list, req.body.inter_id)
            updateInterview(req.body.inter_id, student_list)
        }
    }
    else {//if user select more than one student 
        student_list.forEach(student => {
            const result = ResultSchema.find({ interview_id: req.body.inter_id, student_id: student });
            if (result.length == 0) {//create only if there doesn't exsist data on result tab
                createResult(student, req.body.inter_id)
                updateInterview(req.body.inter_id, student)
            }
        });
    }
    res.redirect('back')
}

module.exports.showstudent = async (req, res) => {
    let student_id = req.query.sid;
    var ObjectId = require('mongoose').Types.ObjectId; 
    student_id=new ObjectId(student_id);
    // console.log(student_id)

    const data = await ResultSchema.find({student_id: student_id}).populate('interview_id').clone();
    // console.log(data)
    await studentSchema.findById(student_id, (err, sdata) => {
        res.render('student_explore', {
            data: data,
            StudentData: sdata
        })
    }).clone();

}

