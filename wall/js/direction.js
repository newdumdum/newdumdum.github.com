/**
* 角度功能服务
*/
var DIRECTION = (function(){

	function initDirection(){
		$('#turnLeft').click(function(){
			ROOM.rotateView(-1);
		});
		$('#turnRight').click(function(){
			ROOM.rotateView(1);
		});
		$('#zoomIn').click(function(){
			ROOM.zoomView(-1);
		});
		$('#zoomOut').click(function(){
			ROOM.zoomView(1);
		});
	}

	initDirection();
})();