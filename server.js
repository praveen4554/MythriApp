var express = require('express')
var bodyParser = require('body-parser');
var app = express()

//Getting the db connection
var db = require('./db');
var methodOverride = require('method-override');

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
app.get('/',function(req,res){
	res.sendFile('index.html',{root: __dirname });
});
app.use('/Images/~logo.png',express.static(__dirname + '/Images/~logo.png'));
app.use('/libraries/angular.js',express.static(__dirname + '/libraries/angular.js'));
app.use('/routes/signin.html',express.static(__dirname + '/routes/signin.html'));
app.use('/routes/register.html',express.static(__dirname + '/routes/register.html'));

//app.use("/add", add)
//app.use("/login",login)

//app.listen(8090);

var server = require('http').createServer(app);
	require('./routes/login.js')(app);


server.listen(app.get('port'), function(){
	console.log('PhotoGRID Running on port: ' + app.get('port'));
})