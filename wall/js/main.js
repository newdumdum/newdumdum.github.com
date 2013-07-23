/**
* 主流程功能服务
*/
var MAIN = (function(){
	function getUrlParams(name){
		var reg = new RegExp("(\\?|#|&)" + name + "=([^&#]*)(&|#|$)");
		var match = location.href.match(reg);
		return (!match ? "" : match[2]);
	}

	var pictureId = getUrlParams('pictureId');
	if(pictureId){
		var picOK = false, roomOK = false, picInfo;

		NET.getPictureById(pictureId, function(data){
			picInfo = {item: data};
			picOK = true;
			checkOk();
		});

		ROOM.addListen(function(type){
			if(type == 'viewOk'){
				roomOK = true;
				checkOk();
			}
		});

		function checkOk(){
			if(roomOK && picOK){
				ROOM.fillPicture(picInfo);
				TOOL.updateInfo(picInfo);
				TOOL.fillPicture([picInfo.item]);
			}
		}
	}
})();