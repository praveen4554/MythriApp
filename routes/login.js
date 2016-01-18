'use strict'
module.exports = function(app){

  var app = app;
  //node mailer
  var nodemailer = require("nodemailer");
  var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "praveen4554@gmail.com",
        pass: "9441468901"
    }
});
var rand,mailOptions,host,link;
/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/

  //var mongdb = mongoose;
  var MongoClient = require('mongodb').MongoClient;

  var path = require('path');
  var rpath="";
var user,username,pwd,password,email,val;
  // addpost Module
  app.post('/login', function(req, res){
        user = req.body.username;
        password=req.body.password;
        //console.log('Usernameis', user);
 });
  app.get('/login',function(req,res){
    var query={"username": user,"password":password};
    MongoClient.connect('mongodb://localhost:27017/login', function(err, db) {
    db.collection('login').findOne(query,function(err, doc) {
        if(err) {
          throw err;
        }
        else{
          if((doc==null)||(user=" "))
          {
            val='./routes/signin.html';
            console.log(doc);
            res.sendFile(path.resolve(val));
          }
          else
          {
             val='./index.html';
             console.log("hello");
             res.sendFile(path.resolve(val));
          }
      }
      db.close();
     });
  });
  })
app.get('/register',function(req,res){
  //console.log("hello");
  res.sendFile(path.resolve('./routes/register.html'));
});
app.post('/registration',function(req,res){
    username=req.body.uname;
    pwd=req.body.pwd;
    email=req.body.email;
    
});
app.get('/registration',function(req,res){
            var query={"username": username};
    MongoClient.connect('mongodb://localhost:27017/login', function(err, db) {
    db.collection('login').findOne(query,function(err, doc) {
       //console.log("got it");
        if(err) {
          throw err;
        }
        else{
          if(doc==null)
          {
            var query={"username": username,"password":pwd,"email":email};
            db.collection('login').insertOne(query,function(err, docs) {
            if(err) throw err;
              else{
                  rpath='./index.html';
                  res.sendFile(path.resolve(rpath));
                }
                  db.close();
                });
              }
                else
                {
                  rpath='./routes/register.html';
                  res.sendFile(path.resolve(rpath));
                }
              }
            db.close();
          });
        });
      });
}
