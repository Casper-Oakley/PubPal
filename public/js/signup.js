var host = location.origin.replace(/^http/,'ws');
var socket = io.connect(host, {secure: true});
window.onload = function(){
	$('#submit').click( function(){
		socket.emit('signup', {username : $('#username').val(),password : $('#password').val(), number : $('#number').val()});
		document.cookie=JSON.stringify({username : $('#username').val(),password : $('#password').val()});
		window.location.href="/home";
	});
}
