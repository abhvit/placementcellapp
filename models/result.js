import mongoose from 'mongoose';

const resultSchema=mongoose.Schema({
    student_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student',
        required: true
    },

    interview_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Interview',
        required: true
    },
    result:{
        type:String,
        required:true
    }
});

const Result=mongoose.model('Result', resultSchema);
mpdule.exports=Result;