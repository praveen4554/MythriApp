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
var user,username,pwd,password,email,val,verify;
  // addpost Module
  app.post('/login', function(req, res){
        user = req.body.username;
        password=req.body.password;
        //console.log('Usernameis', user);
 });
  app.get('/login',function(req,res,next){
    var query={"username": user,"password":password};
    MongoClient.connect('mongodb://localhost:27017/login', function(err, db) {
    db.collection('login').findOne(query,function(err, doc) {
        if(err) {
          throw err;
        }
        else{
          if((doc==null)||(user==undefined))
          {
            res.redirect("/");
          }
          else
          {
             res.redirect("/sign"+user);
          }
      }
      db.close();
     });
  });
  })
  /*app.get('/:message',function(req,res){
    var msg=req.params.message;
    console.log(msg);
    res.json({"message":msg});
  });*/
  /*app.use("/",function(req,res){
            console.log("hello");
            console.log(req.url);
            val='./routes/signin.html';
            res.sendFile(path.resolve(val));
  })*/
app.post('/registeration',function(req,res){
    username=req.body.uname;
    pwd=req.body.pwd;
    email=req.body.email;
});
app.get('/registeration',function(req,res){
  //var mail=req.params.mail;
  //console.log(mail);
  //var mail=req.params.mail;
  console.log("hi");
  var query={"email":email};
  MongoClient.connect('mongodb://localhost:27017/login', function(err, db) {
  db.collection('login').findOne(query,function(err,doc){
    if(err)
    {
      throw err;
    }
    else
    {
      if(doc==null)
      { 
        rand=shortid.generate();
        var message = {
       from: 'Praveen <praveen4554@gmail.com>',
    to: email,
    subject: 'Email verification code',
    headers: {
        'X-Laziness-level': 1000
    },
    text: 'Hello',
    html: '<p><b>Hello</b> '+
        '<p>email verification code is</p>'+rand,
    };
    console.log('Sending Mail');
transporter.sendMail(message, function(error, info) {
    if (error) {
        console.log("error"+error);
        res.send(500);
      }
      else
      {
        console.log(info);
       }
       });
        res.sendFile(path.resolve('./routes/emailverification.html'));
      }
      else
      {
        //console.log("already registered");
        res.json({"message":"username or mail id is already registered"});
      }
    }
  });
});
});
app.get('/register',function(req,res){
  //console.log("hello");
  res.sendFile(path.resolve('./routes/register.html'));
});
/*app.get('/registration',function(req,res){
            var query={"username": username};
    MongoClient.connect('mongodb://localhost:27017/login', function(err, db) {
    db.collection('login').findOne(query,function(err, doc) {
       console.log("got it");
        if(err) {
          throw err;
        }
        else{
          if(doc==null)
          {
            console.log("got it1");
            if(rand==verify)
              {
                console.log("got it2");
            var query={"username": username,"password":pwd,"email":email};
            db.collection('login').insertOne(query,function(err, docs) {
                if(err) {
                  console.log("error"+err);
                }
                    else{
                         console.log("okay");
                        res.json({"code":"is not okay"});
                      }
                       res.redirect("/login");
                    db.close();
                  });
                }
              else
              {
                console.log(rand+"has"+verify);
                res.json({"verification":"verify code is wrong"});
               }
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
      });*/
app.post('/valid',function(req,res){
    verify=req.body.verify;
});
app.get('/valid',function(req,res){
        if(rand==verify)
              {
                console.log("got it2");
               var query={"username": username,"password":pwd,"email":email};
               MongoClient.connect('mongodb://localhost:27017/login', function(err, db) {
              db.collection('login').insertOne(query,function(err, docs) {
                if(err) {
                  console.log("error"+err);
                  }
                    else{
                         console.log("okay");
                       res.redirect("/login");
                        }
                    db.close();
                  });
                });
                }
              else
              {
                console.log(rand+"has"+verify);
                res.json({"verification":"verify code is wrong"});
               }
             });
}