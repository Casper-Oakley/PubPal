var x = 0;

$(function(){
	var checkTextInput = function(){
		$('.inputFields').change(function(){
			$('<div class="inputFields' + (++x) + '"><input type="text" class="yoSername" placeholder="userName"></input><input type="text" class="span3" placeholder="yoSername"></input><br></div>').insertAfter('.inputFields');
		});
	};
});
