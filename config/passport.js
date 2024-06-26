const passport = require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/Employee');



passport.use(new LocalStrategy({
    usernameFeild: 'email'
},
    function(email,password,done){
        //find a user and establish identity
        User.findOne({email:email}, function(err, user){
            if(err){
                console.log('error in finding user --> Passport');
                return  done(err);
            }

            return done(null, user);
        });
    }
));


//serializing the user to decide which key is to be kept in the cookies

passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function (id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null, user);
    });
});

//check if the user is authenticated

passport.checkAuthentication=function(req,res,next){
    // if the user is signed in,then pass on the request to the next function(controller's action)

    if(req.isAuthenticated()){
        return next();
    }

     //if the user is not signed in
     return res.redirect('back');
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views

        res.locals.userinfo=req.user;
        res.locals.login=true;
        return next()
    }
    else
        res.locals.login=false;

        next();

}

module.exports=passport;