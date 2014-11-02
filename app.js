//Module Dependencies
var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , mongodb = require('mongodb')
  , mongoClient = mongodb.MongoClient
  , mongoose = require('mongoose')
  , favicon = require('serve-favicon')
  , request = require('request')
  , hbs = require('hbs')
  , twilio = require('twilio')
  , Yo = require('./node_modules/node-yo-master/lib/yo');

//local variables used 
var yo = new Yo({'api_token':'b2da4b8e-5b27-46fb-addb-8172b6b21a4b'});
var client = new twilio.RestClient('AC37cb5af509c24ae9dbe5c01e48d1f412', '048f0c1de0b8c3978539dac94ac0fe8d');
var MONGOHQ_URL='mongodb://client:clientpass@ds049180.mongolab.com:49180/heroku_app31187440'
mongoose.connect(MONGOHQ_URL);

//define schemas for MongoDB
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

//define models used to access database
var loginMod = mongoose.model('loginMod',loginSchema);
var yoMod = mongoose.model('yoMod',yoSchema);
var destMod = mongoose.model('destMod', destSchema);

// view engine setup
app.set('port', process.env.PORT || 80);
app.set('view engine', 'html');
app.engine('html',hbs.__express);
app.use(express.static('public'));
app.use(favicon(__dirname + '/public/favicon.ico'));

//routes for the server
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
	console.log('number texted from '+req);
	//yo everyone in the group
	
	//yo yo tester code	
	loginMod.findOne({No : req.from}, function(err, doc){
		yoMod.find({Gno : doc.User}, function(err, doc){
			doc.forEach(function(entry){
				yo.yo(entry.Yoname, function(err, data){
					if(err){
						console.log('yo to '+ entry.Yoname +' unsuccessful');
					} else {
						console.log('yo successful');
					}
				});
			});
		});
	});
	//reply with the next address in the location
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
