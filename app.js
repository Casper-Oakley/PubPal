
var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , hbs = require('hbs');


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

server.listen(app.get('port'), function(){
	console.log('Express server up and running on port ' + app.get('port'));
});

io.sockets.on('connection', function (ws){ //ws is client websocket
	//do something with ws
});
