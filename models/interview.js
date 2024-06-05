import mongoose from 'mongoose';

const InterviewSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    student_mapped:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student'
    }]

});

const Interview=mongoose.model('Interview',InterviewSchema);
module.exports=Interview;