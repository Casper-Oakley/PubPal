
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
	res.render('index',{title:'Sticker Maker - Make'});
});

server.listen(app.get('port'), function(){
	console.log('Express server up and running on port ' + app.get('port'));
});