const express = require('express')
const router = express.Router();
const index_controller = require('../controllers/indexController');
const passport=require('passport');

router.use('/createSession',passport.authenticate('local',{
    failureRedirect:'/login'
}),index_controller.createSession);

// router.use('/createSession',  index_controller.createSession);

router.use('/interview',passport.checkAuthentication, require('./interview'));
router.use('/csv', index_controller.csv)
router.use('/signup', index_controller.signup);
router.use('/login', index_controller.login)
router.use('/logout', index_controller.destroySession);

//redirect request of /student to ./student.js
router.use('/student' , require('./student'));
router.use('/' , index_controller.index);


module.exports = router;