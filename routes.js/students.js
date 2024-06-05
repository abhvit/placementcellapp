const express=require('express');
const router=new express.Router();
const student_controller=require('../controllers/studentController');

router.use('/showstudent',student_controller.showstudent);
router.use('/add-student',student_controller.addStudent);
router.use('/result',student_controller.result);
router.use('/map',student_controller.map);

module.exports=router;