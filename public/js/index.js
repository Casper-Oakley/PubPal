var host = location.origin.replace(/^http/,'ws');
var socket = io.connect(host, {secure: true});
window.onload = function(){
	$('#submit').click( function(){
		if($('#username').val().search(/[^A-Za-z0-9]/)==-1 && $('#password').val().search(/[^A-Za-z0-9]/==-1){
			socket.emit('login',{username : $('#username').val(),password : $('#password').val()});
		}
		else{
			$('#alertlocation').after('<div class="alert alert-danger alert-dismissable" id="failed"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button> ERROR: Invalid Login. </div>');
		}
	});
	socket.on('accept', function(data){
		if(data){
			document.cookie=$('#username').val();
			window.location.href="/home";
		} else{
		$('#alertlocation').after('<div class="alert alert-danger alert-dismissable" id="failed"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button> ERROR: Invalid Login. </div>');
		}
	});
	$('#signup').click( function(){
		window.location.href="/signup";
	});
}
