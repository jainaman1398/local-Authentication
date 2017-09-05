var express=require('express');
const router=express.Router();
var passport=require('./passport.js');

function iflogged(req,res,next) {
    if (req.user) {
        console.log(req.user);
    next();
  }
  else
    res.redirect('/');
}

function notlogged(req,res,next)
{
    if(!(req.user)) {
        next();
    }
    else
   res.redirect('/chat');
}

router.get('/',notlogged,function (req,res) {
    res.render('signin');
})


router.get('/chat',iflogged,function (req,res) {
   // res.sendFile(__dirname+'/public_static/chatapp.html');
    res.send("hello");
})

router.get('/signup',notlogged,function (req,res) {
    var messages=req.flash('error');
    res.render('signup',{message:messages,hasErrors:messages.length>0});
})
router.get('/signin',notlogged,function (req,res) {
    var messages=req.flash('error');
    res.render('signin',{message:messages,hasErrors:messages.length>0});
})

router.post('/signup',passport.authenticate('local.signup',{
    successRedirect:'/chat',
    failureRedirect:'/signup',
    failureFlash:true
}));

router.post('/signin',passport.authenticate('local.signin',{
    successRedirect:'/chat',
    failureRedirect:'/signin',
    failureFlash:true
}));



module.exports=router;