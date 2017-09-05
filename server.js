const express=require('express');
var fs=require('fs');
var path=require('path');
const app=express();
var port=process.env.port||8080;
var validator=require('express-validator');
var hbs = require('express-hbs');
var bodyParser = require('body-parser');
var session=require('express-session');
var index=require('./index');
var passport=require('passport')
var flash=require('connect-flash');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());

var mongoose=require('mongoose');
//mongoose.connect('mongodb://localhost:8080/chatapp');
var promise = mongoose.connect('mongodb://localhost:8080/chatapp', {
    useMongoClient: true,
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(session({
    secret:'somesecret',
    resave:false,
    saveUninitialized: false,
    cookie:{maxAge:24*3600*1000}
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/',index);


app.listen(port,function () {
    console.log("App is rocking at http://localhost:"+port);
})