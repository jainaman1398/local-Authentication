var mongoose =require('mongoose');
var Schema=mongoose.Schema;

var yoyo=new Schema({
    Name:{
        type:String,require:true
    },
    Email:{
        type:String,require:true
    },
    password:{
        type:String,require:true
    }
},{runSettersOnQuery: true});

var Signin=mongoose.model('Signin',yoyo);
module.exports=Signin;