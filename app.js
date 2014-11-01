
/**
 * Module dependencies.
 */


var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , hbs = require('hbs');

app.set('port', process.env.PORT || 3000);

app.set('view engine', 'html');
app.engine('html',hbs.__express);
app.use(express.static('public'));

app.get('/',function(req,res){
	res.render('index',{title:'Sticker Maker - Make'});
});

server.listen(app.get('port'), function(){
	console.log('Express server up and running on port ' + app.get('port'));
});
