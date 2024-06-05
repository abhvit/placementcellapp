const mongoose=require('mongoose');
const StudentSchema=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    college:{
        type:String,
        required:true
    },
    dsa_score:{
        type:Number,
        required:true

    },

    webd_score:{
        type:Number,
        required:true
    },
    react_score:{
        type:Number,
        required:true
    }
});

const Student=mongoose.model('Student', StudentSchema);
module.exports=Student;     