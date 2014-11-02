var host = location.origin.replace(/^http/,'ws');
var socket = io.connect(host, {secure: true});
window.onload = function(){
	$('#submit').click( function(){
		if($('#username').val().search(/[^A-Za-z0-9]/)==-1 && $('#password').val().search(/[^A-Za-z0-9]/)==-1 && $('#number').val().search(/0-9/)==-1){
			socket.emit('signup', {username : $('#username').val(),password : $('#password').val(), number : $('#number').val()});
			document.cookie=$('#username').val();
			window.location.href="/home";
			}
		else{
			$('#alertlocation').after('<div class="alert alert-danger alert-dismissable" id="failed"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button> ERROR: Invalid Username/Password. </div>');
		}
	});
}
