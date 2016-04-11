'use strict'
module.exports = function(app){

  var app = app;
  //node mailer
  var nodemailer = require("nodemailer");
  var shortid = require('shortid');
  var rand;
  var message="Login failed";
  var transporter = nodemailer.createTransport("SMTP",{
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
var user,username,pwd,password,mail,val,verify;
  // addpost Module
  app.get('/forget', function(req, res){
        res.sendFile(path.resolve('./routes/passwordreset.html'));
 });
  app.post('/reset',function(req,res){
    mail=req.body.email;
  });
  app.get('/reset',function(req,res){
    var query={"email": mail};
    console.log(mail);
    MongoClient.connect('mongodb://localhost:27017/login', function(err, db) {
    db.collection('login').findOne(query,function(err, doc) {
        if(err) {
          throw err;
        }
        else{
          if(doc==null||doc==undefined)
          {
            res.send("Enter valid email");
          }
          else
          {
          var username=doc.username;
          var pass=doc.password;
          console.log("username"+username+""+pass);
            var message = {
       from: 'Praveen <praveen4554@gmail.com>',
    to: mail,
    subject: 'password',
    headers: {
        'X-Laziness-level': 1000
    },
    text: 'Hello',
    html: '<p>Hello username is <b>'+ username+'</b> </p>'+
        '<p>password is <b>'+pass+'</b> </p>',
      };

transporter.sendMail(message, function(error, info) {
    if (error) {
        console.log("error"+error);
        return;
      }
      else
      {        
      res.redirect("/");
      }

      });
          
        }
      }
      db.close();
     });
  });
  });
}