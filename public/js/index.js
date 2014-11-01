var host = location.origin.replace(/^http/,'ws');
var socket = io.connect(host, {secure: true});
window.onload = function(){
	$('#submit').click( function(){
		socket.emit('login',{username : $('#username').val(),password : $('#password').val()});
	});
	socket.on('accept', function(data){
		if(data){
		document.cookie=JSON.stringify(data);
		window.location.href="/home";
		}
		else{
		$('#alertlocation').after('<div class="alert alert-danger alert-dismissable" id="failed"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button> ERROR: Invalid Login. </div>');
		}
	});
}
