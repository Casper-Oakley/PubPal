var host = location.origin.replace(/^http/,'ws');
var socket = io.connect(host, {secure: true});
window.onload = function(){
	$('#submit').click( function(){
		$('.yoname').each(function (index){
		if($(this).val().search(/[^A-Za-z0-9]/)==-1){
			socket.emit('yoadd', {yoname : $(this).val(), username : document.cookie});
		}
		else{
			$('#alertlocation').after('<div class="alert alert-danger alert-dismissable" id="failed"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button> ERROR: Invalid Yo Name </div>');
		}
		});
	});
	$('.yoname').each(function(){
		$(this).change(function(){
			$(this).after('<input class="yoname" type="text" placeholder="Yo Name"><br>');
		});
	});
}
