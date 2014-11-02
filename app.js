
var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , mongodb = require('mongodb')
  , mongoClient = mongodb.MongoClient
  , mongoose = require('mongoose')
  , hbs = require('hbs');

var MONGOHQ_URL='mongodb://client:clientpass@ds049180.mongolab.com:49180/heroku_app31187440'
mongoose.connect(MONGOHQ_URL);

var loginSchema = mongoose.Schema({
	User: String,
	Pass: String,
	No: String
});

var yoSchema = mongoose.Schema({
	Yoname: String,
	Gno: String
});

var loginMod = mongoose.model('loginMod',loginSchema);

var yoMod = mongoose.model('yoMod',yoSchema);

// view engine setup
app.set('port', process.env.PORT || 8080);

app.set('view engine', 'html');
app.engine('html',hbs.__express);
app.use(express.static('public'));
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.get('/',function(req,res){
	res.render('index',{title:'PubPal - Login'});
});

app.get('/map',function(req,res){
	res.render('map',{title:'PubPal - Map'});
});

app.get('/home',function(req,res){
	res.render('home',{title:'PubPal - Home'});
});

app.get('/signup',function(req,res){
	res.render('signup',{title:'PubPal - Sign Up'});
});

app.get('/create',function(req,res){
	res.render('create',{title:'PubPal - Create'});
});

server.listen(app.get('port'), function(){
	console.log('Express server up and running on port ' + app.get('port'));
});


io.sockets.on('connection', function (ws){ //ws is client websocket
	ws.on('signup', function(data){
		var signUp = new loginMod({ User : data.username, Pass : data.password, No : data.number});
		signUp.save();
		console.log('New User: '+data.username);
		
	});
	ws.on('yoadd', function(data){
		var yoAdd = new yoMod({ Yoname : data.yoname, Gno : data.username});
		yoAdd.save();
		console.log('Added '+data.yoname+' to '+Gno);
	});
	ws.on('login', function(data){
		console.log('test '+data.username+ ' ');
		loginMod.findOne({User: data.username}, function (err, doc){
			console.log(data.password + " and "+doc.Pass);
			if(doc.Pass == data.password){
				ws.emit('accept',true);
			}
			else{
				ws.emit('accept',false);
			}
		});
	});
});
