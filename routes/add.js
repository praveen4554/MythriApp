'use strict'
module.exports = function(app){


  var nodemailer = require("nodemailer");
  var transporter = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "praveen4554@gmail.com",
        pass: "9441468901"
    }
});
var rand,mailOptions,host,link;
/*------------------Routing Started ------------------------*/

  //var mongdb = mongoose;
  var ObjectId = require('mongodb').ObjectID;
  var MongoClient = require('mongodb').MongoClient;

  var path = require('path');
  var a=[];
  function PersonsPush(person){
      a.push({
        _id:person._id,
        interviewdate:person.interviewdate,
        interviewtiming:person.interviewtiming,
        consultantname: person.consultantname,
        interviewtype: person.interviewtype,
        client:person.client,
        proxy: person.proxy,
        Marketingby: person.Marketingby,
        comments:person.comments
      });
      //console.log(a);
  }
var findRestaurants = function(db, callback) {
  a=[];
   var cursor =db.collection('details').find( );
   cursor.each(function(err, doc) {
    //console.log(doc);
      if (doc != null) {
        PersonsPush(doc);
      } 
      else {
         callback();
      }
   });
};
var user,username,pwd,password,email,val,uname,check;
  // addpost Module
  app.get('/signin', function(req, res){
        MongoClient.connect('mongodb://localhost:27017/details', function(err, db) {
          if(db==undefined)
          {
            console.log("hello");
          }
    findRestaurants(db, function() {
      db.close();
      console.log(uname);
      //console.log(a);
    res.json(a);
  });
    a=[];
  });
        //console.log('Usernameis', user);
 });

  app.get('/signin:q',function(req,res){
    //1180d59d24
            //console.log(uname+"yes"+decrypt(uname));
    res.send({"username":uname});
  });
  app.get('/sign:b',function(req,res){
            uname=req.params.b;
            val='routes/signin.html';
            res.sendFile(path.resolve(val));
  })
   
  app.post('/insert',function(req,res){

    var idate=req.body.interviewdate;
    var mail=req.body.mail;
    var timing=req.body.interviewtime;
    var cname=req.body.consultantName;
    var itype=req.body.interviewtype;
    var cv=req.body.client;
    var proxy=req.body.proxy;
    var market=req.body.Marketingby;
    var cmnts=req.body.comments;
    //console.log(cmnts);
    var query={"interviewdate":idate,"interviewtiming":timing,"consultantname":cname,"interviewtype":itype,"client":cv,"proxy":proxy,"Marketingby":market,"comments":cmnts};
    //console.log(query);
    MongoClient.connect('mongodb://localhost:27017/details', function(err, db) {
    db.collection('details').insertOne(query,function(err, doc) {
       //console.log("got it");
        if(err) {
          throw err;
        }
        else{ var message = {
       from: 'Praveen <praveen4554@gmail.com>',
    to: mail,
    subject: 'Interview Schedule',
    headers: {
        'X-Laziness-level': 1000
    },
    text: 'Hello',
    html: '<p><b>Hello</b> '+
        '<p>You have interview at</p>'+timing+'<p>The consultant name</p>'+cname,
    };
    console.log('Sending Mail');
    transporter.sendMail(message, function(error, info) {
      if (error) {
        console.log("error"+error);
       }
       else
       {
        res.redirect('/');
       }
       });           
       res.redirect('/');  
          }
          db.close();
          });
        });
  })
  app.post('/update',function(req,res){

    var idate=req.body.interviewdate;
    var timing=req.body.interviewtime;
    var cname=req.body.consultantName;
    var itype=req.body.interviewtype;
    var cv=req.body.client;
    var proxy=req.body.proxy;
    var market=req.body.Marketingby;
    var cmnts=req.body.comments;
    var id=req.body.id;
    var mail=req.body.mail;
    //console.log(cmnts);
    var query={"_id":ObjectId(id)};
    var query1={"interviewdate":idate,"interviewtiming":timing,"consultantname":cname,"interviewtype":itype,"client":cv,"proxy":proxy,"Marketingby":market,"comments":cmnts};
    //console.log(query);
    MongoClient.connect('mongodb://localhost:27017/details', function(err, db) {
    db.collection('details').updateOne(query,query1,function(err, doc) {
       //console.log("got it");
        if(err) {
          throw err;
        }
        else{
            var message = {
                from: 'Praveen <praveen4554@gmail.com>',
                to: mail,
               subject: 'Interview Schedule',
              headers: {
              'X-Laziness-level': 1000
              },
              text: 'Hello',
             html: '<p><b>Hello</b> '+
              '<p>You have interview at</p>'+timing+'<p>The consultant name</p>'+cname,
        };
    console.log('Sending Mail');
    transporter.sendMail(message, function(error, info) {
      if (error) {
        console.log("error"+error);
       }
       else
       {
        res.redirect('/');
       }
       });
      }
      res.redirect('/');
          db.close();
          });
        });
  })

  app.delete('/delete:a', function(req, res){
     
        var id=req.params.a;
        MongoClient.connect('mongodb://localhost:27017/details', function(err, db) {
            var query={"_id":ObjectId(id)};
        db.collection('details').remove(query,function(err, doc) {
       //console.log("got it");
          if(err) {
           console.log(err);
          }
        else{
           res.json(doc); 
          }
          db.close();
          });
        });
 });
}
