
var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , mongodb = require('mongodb')
  , mongoClient = mongodb.MongoClient
  , mongoose = require('mongoose')
  , hbs = require('hbs')
  , twilio = require('twilio')
  , Yo = require('./node_modules/node-yo-master/lib/yo');

var y = new Yo({'api_token':'b2da4b8e-5b27-46fb-addb-8172b6b21a4b'});
var client = new twilio.RestClient('AC37cb5af509c24ae9dbe5c01e48d1f412', '048f0c1de0b8c3978539dac94ac0fe8d');
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

var destSchema = mongoose.Schema({
	Location: String,
	Index: Number,
	User: String
});

var loginMod = mongoose.model('loginMod',loginSchema);

var yoMod = mongoose.model('yoMod',yoSchema);

var destMod = mongoose.model('destMod', destSchema);

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

app.get('/sendTexts', function(req, res){
	//text the number
	var input = req.query;
	console.log('number texted');
	//yo everyone in the group

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
		console.log('Added '+data.yoname+' to '+data.username);
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
	//socket.emit('destination', {name : place.name,location : place.geometry.location, number : order, username : document.cookie});
	ws.on('destination', function(data){
		var destination = new destMod({Location : data.name, Index : data.number, User : data.username});
		destination.save();
		console.log('yay'+data.name);
	});
});
