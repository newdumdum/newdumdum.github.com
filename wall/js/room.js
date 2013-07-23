/**
* 场景功能服务
*/
var ROOM = (function(){
	var ROOM_OK_LISTENER = [];
	var SWF;
	var IS_SWF_READY = false;
	var flashId = 'w3d';
	var BEFORE_CACHE;
	function init(){
		/**
		* 添加主程序的SWF文件
		*/
		function addMainSwf(){      
			var flashvars = {
			};
			var params = {
				menu: "false",
				scale: "noScale",
				allowFullscreen: "true",
				allowScriptAccess: "always",
				bgcolor: "#E7E7E7"
			};
			var attributes = {
				id: flashId
			};
			swfobject.embedSWF("resources/swf/wall.swf", "swfContainer", "974", "600", "11.0.0", "resources/swf/expressInstall.swf", flashvars, params, attributes); 
		}

		/**
		* 获取flash对象
		*/
		function getFlash(mv) {
			if (window.document[mv]) {
				return window.document[mv];
			}
			if (navigator.appName.indexOf("Microsoft Internet")==-1) {
				if (document.embeds && document.embeds[mv])
				return document.embeds[mv]; 
			} else {
				return document.getElementById(mv);
			} 	
		}

		addMainSwf();

		window.FLASH_READY = function(){
			SWF = getFlash(flashId);
			IS_SWF_READY = true;
			if(BEFORE_CACHE){
				SWF.fillView(BEFORE_CACHE);
				SWF.fillView(BEFORE_CACHE);
			}
			fireEvent('viewOk');
		}

		// 调试数据
		window.FLASH_CONSOLE = function(str){
			console.log(str);
		}
	}

	function fillView(params){
		var item = params.item;

		var curRoomInfo = [
			{
				background: item.east
				,width: item.eastWidth
				,height: item.eastHeight
				,front: item.front.split(',')[0]
			},{
				background: item.south
				,width: item.southWidth
				,height: item.southHeight
				,front: item.front.split(',')[1]
			},{
				background: item.west
				,width: item.westWidth
				,height: item.westHeight
				,front: item.front.split(',')[2]
			},{
				background: item.north
				,width: item.northWidth
				,height: item.northHeight
				,front: item.front.split(',')[3]
			}
		];

		// 缓存图片
		// $.each(curRoomInfo, function(index, item){
		// 	doCache(item.background);
		// 	doCache(item.front);
		// });

		if(IS_SWF_READY){
			SWF.fillView(curRoomInfo);
			SWF.fillView(curRoomInfo);
		}
		BEFORE_CACHE = curRoomInfo;
	}

	function fillPicture(params){
		var item = params.item;
		if(IS_SWF_READY){
			SWF.fillPicture(item);
		}
	}

	function fillFrame(params){
		if(IS_SWF_READY){
			SWF.fillPictureFrame(params);
		}
	}


	function rotateView(argument) {
		if(IS_SWF_READY){
			SWF.rotateView(argument);
		}
	}

	function zoomView(argument) {
		if(IS_SWF_READY){
			SWF.zoomView(argument);
		}
	}
	function resetZoom(){
	}


	function addListen(handler){
		ROOM_OK_LISTENER.push(handler);
	}

	function fireEvent(type){
		$.each(ROOM_OK_LISTENER, function(index, handler){
			handler && handler(type);
		});
	}

	function doCache(url){
		CACHE.set(url);
	}

	init();


	return {
		fillView: fillView
		,fillPicture: fillPicture
		,fillFrame: fillFrame
		,rotateView: rotateView
		,zoomView: zoomView

		,addListen: addListen
	}
})();