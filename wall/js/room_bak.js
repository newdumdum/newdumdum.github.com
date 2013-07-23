/**
* 场景功能服务
*/
var ROOM = (function(){
	var ROOM_OK_LISTENER = [];
	var paper, room, picture, pictureFrame, curRoomInfo, curOrder = 1;
	var transparentImage = 'resources/images/transparent.png';
	var front, pictureDrag;
	var zoomBase = 1, zoomMerge = 0.2;
	function init(){
		paper = Raphael('room', 974, 600);
	}

	function fillView(params){
		zoomBase = 1;
		curOrder = 1;
		if(room){
			room.remove();
		}
		var item = params.item;

		curRoomInfo = [
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
		$.each(curRoomInfo, function(index, item){
			doCache(item.background);
			doCache(item.front);
		});

		room = paper.image(curRoomInfo[curOrder].background, 0, 0, curRoomInfo[curOrder].width, curRoomInfo[curOrder].height);
		front = paper.image(curRoomInfo[curOrder].front, 0, 0, curRoomInfo[curOrder].width, curRoomInfo[curOrder].height);
		if(params.isFirst == 1){
			fireEvent('viewOk');
		}
		if(picture){
			picture.toFront();
		}
		front.toFront();
		if(pictureDrag){
			pictureDrag.toFront();
		}
	}

	function fillPicture(params){
		if(picture){
			picture.remove();
		}
		resetZoom();
		var item = params.item;
		doCache(item.pictureUrl);
		picture = paper.image(item.pictureUrl, (curRoomInfo[curOrder].width - item.width) / 2, curRoomInfo[curOrder].height / 2 - item.height, item.width, item.height);
		
		if(!pictureDrag){
			doCache(transparentImage);
			pictureDrag = paper.image(transparentImage, (curRoomInfo[curOrder].width - item.width) / 2, curRoomInfo[curOrder].height / 2 - item.height, item.width, item.height);
		}else{
			pictureDrag.attr({
				x: (curRoomInfo[curOrder].width - item.width) / 2
				,y: curRoomInfo[curOrder].height / 2 - item.height
				,width: item.width
				,height: item.height
			});
		}
		pictureDrag.attr({
			'cursor': 'move'
		});

		var move = function(dx, dy){
			this.attr({x: this.ox + dx, y: this.oy + dy});
			picture.attr({x: this.ox + dx, y: this.oy + dy});
		}
		var dragger = function(){			
			this.ox =  this.attr("x");
			this.oy = this.attr("y");
			this.animate({"fill-opacity": .2}, 500);
		}
		var up = function(){
			this.animate({"fill-opacity": 0}, 500);
		}
		pictureDrag.drag(move, dragger, up);

		front.toFront();
		front.toFront();
		pictureDrag.toFront();
	}

	function fillFrame(params){
		if(!params || !picture){
			return;
		}
		//doCache();
	}


	function rotateView(argument) {
		if(!room){
			return;
		}
		resetZoom();

		var oldInfo = curRoomInfo[curOrder];
		if(argument < 0){
			curOrder = curOrder - 1 < 0 ? 3 : curOrder - 1;
		}else{
			curOrder = curOrder + 1 > 3 ? 0 : curOrder + 1;
		}


		room.animate({
			'transform': 't' + (argument > 0 ? '-' : '') + oldInfo.width + ',0'
		}, 100, 'linear', function(){
		});
		var tmp = paper.image(curRoomInfo[curOrder].background, argument < 0 ? 0 - Number(curRoomInfo[curOrder].width) : oldInfo.width, 0, curRoomInfo[curOrder].width, curRoomInfo[curOrder].height);
		if(picture){
			picture.toFront();
		}

		tmp.animate({
			'transform': 't' + (argument > 0 ? '-' : '') + curRoomInfo[curOrder].width + ',0'
		}, 100, 'linear', function(){
			room.remove();
			tmp.remove();
			room = paper.image(curRoomInfo[curOrder].background, 0, 0, curRoomInfo[curOrder].width, curRoomInfo[curOrder].height);
			if(picture){
				picture.toFront();
			}
			front.remove();
			front = paper.image(curRoomInfo[curOrder].front, 0, 0, curRoomInfo[curOrder].width, curRoomInfo[curOrder].height);
			front.toFront();
			if(pictureDrag){
				pictureDrag.toFront();
			}
		});
	}

	function zoomView(argument) {
		// body...
		if(!room){
			return;
		}
		if(argument > 0){
			zoomBase = zoomBase + zoomMerge;
		}else{
			zoomBase = zoomBase - zoomMerge;
		}
		zoomBase = zoomBase < 1 ? 1 : zoomBase;
		zoomBase = zoomBase > 5 ? 5 : zoomBase;

		room.animate({
			'transform': 's'+ zoomBase + ',' + zoomBase
		}, 300);
		front.animate({
			'transform': 's'+ zoomBase + ',' + zoomBase
		}, 300);
		picture.animate({
			'transform': 's'+ zoomBase + ',' + zoomBase
		}, 300);
		pictureDrag.animate({
			'transform': 's'+ zoomBase + ',' + zoomBase
		}, 300);
	}
	function resetZoom(){
		zoomBase = 1;
		if(room){
			room.animate({
				'transform': 's1,1'
			}, 300);
			front.animate({
				'transform': 's1,1'
			}, 300);
		}
		if(picture){
			picture.animate({
				'transform': 's1,1'
			}, 300);
		}
		if(pictureDrag){
			pictureDrag.animate({
				'transform': 's1,1'
			}, 300);
		}
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