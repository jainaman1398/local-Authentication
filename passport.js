var User=require('./model/user');
var passport=require('passport');
var localStrategy=require('passport-local').Strategy;

var mongoose=require('mongoose');
//mongoose.connect('mongodb://localhost:8080/chatapp');
var promise = mongoose.connect('mongodb://localhost:8080/chatapp', {
    useMongoClient: true,
});


passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('local.signup',new localStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true},
    function (req,email,password,done) {
        User.findOne({'Email':email},function (err,user) {
            if(user)
            {
                return done(null,false,{message:"User is registerd already"});
            }

            var newUser=new User();
            newUser.Email=email;
            newUser.password=password;
            newUser.Name=req.body.username;
            
            newUser.save(function (err,result) {
                if(err)
                    return err;
                    return done(null,newUser);
            })
        })

    }
));

passport.use('local.signin',new localStrategy({

        usernameField:'email',
        passwordField:'password',
        passReqToCallback:true},
    function (req,email,password,done) {
        User.findOne({'Email': email}, function (err, user) {
            if (!user) {
                return done(null, false, {message: "User doesn't Exist"});
            }

            if(user.password!=password){
                return done(null,false,{message:"Password is Incorrect"});
            }
            return done(null,user);
        });

    }));
console.log("passport");
module.exports=passport;