var express = require('express')
var bodyParser = require('body-parser');
var app = express()

//Getting the db connection
var db = require('./db');
var methodOverride = require('method-override');
var path=require('path');
var url=require('url');
var root=__dirname;
//Getting the routes

//var login = require('./routes/login.js')
//login(app)

//var signup = require('./routes/signup')
//var add= require('./routes/add')

//Adding the bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: true}));
app.use(methodOverride());
app.set('port', process.env.PORT || 8090);
//Adding the routes
/*app.get('/:message',function(req,res){
	res.json({"message":"error"});
});*/
app.use(express.static(__dirname+"/public"));
app.use('/Images/~logo.png',express.static(__dirname + '/Images/~logo.png'));
app.use('/libraries/angular.js',express.static(__dirname + '/libraries/angular.js'));
//app.use('/routes/signin.html',express.static(__dirname + '/routes/signin.html'));
//app.use('/routes/register.html',express.static(__dirname + '/routes/register.html'));
app.use('/libraries/angular-route.min.js',express.static(__dirname + '/libraries/angular-route.min.js'));
app.use('/libraries/jquery.js',express.static(__dirname + '/libraries/jquery.js'));
app.use('/Controllers/tableController.js',express.static(__dirname + '/Controllers/tableController.js'));
app.use('/Controllers/factory.js',express.static(__dirname + '/Controllers/factory.js'));
app.use('/Controllers/timepicker-tpl.js',express.static(__dirname + '/Controllers/timepicker-tpl.js'));
app.use('/Controllers/timepicker.js',express.static(__dirname + '/Controllers/timepicker.js'));
app.use('/Controllers/position.js',express.static(__dirname + '/Controllers/position.js'));
app.use('/Json/interviewdata.json',express.static(__dirname+'/Json/interviewdata.json'));

//app.use("/add", add)
//app.use("/login",login)

//app.listen(8090);

var server = require('http').createServer(app);
	require('./routes/login.js')(app);
	require('./routes/add.js')(app);
	require('./routes/password.js')(app);

    
server.listen(app.get('port'), function(){
	console.log('PhotoGRID Running on port: ' + app.get('port'));
})
