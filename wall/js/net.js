/**
* 网络功能服务
*/
var NET = (function(){

	function getCategory(callback){
		$.ajax({
			url: CONFIG.SERVER + 'getCategory.action'
		}).done(function(data){
			if(typeof(data) == 'string'){
				data = $.parseJSON(data);
			}
			callback && callback(data);
		});
	}

	function getArtist(categoryId, callback){
		$.ajax({
			url: CONFIG.SERVER + 'getArtist.action' + (categoryId ? '?categoryId=' + encodeURIComponent(categoryId) : '')
		}).done(function(data){
			if(typeof(data) == 'string'){
				data = $.parseJSON(data);
			}
			callback && callback(data);
		});
	}

	function getPicture(categoryId, artistId, callback){
		$.ajax({
			url: CONFIG.SERVER + 'getPicture.action' + '?categoryId=' + encodeURIComponent(categoryId) + '&artistId=' + encodeURIComponent(artistId)
		}).done(function(data){
			if(typeof(data) == 'string'){
				data = $.parseJSON(data);
			}
			callback && callback(data);
		});
	}

	function getRoom(callback){
		$.ajax({
			url: CONFIG.SERVER + 'getRoomInfo.action'
		}).done(function(data){
			if(typeof(data) == 'string'){
				data = $.parseJSON(data);
			}
			callback && callback(data);
		});
	}

	function getPictureFrame(callback){
		$.ajax({
			url: CONFIG.SERVER + 'getPictureFrame.action'
		}).done(function(data){
			if(typeof(data) == 'string'){
				data = $.parseJSON(data);
			}
			callback && callback(data);
		});
	}

	function getPictureById(id, callback){
		$.ajax({
			url: CONFIG.SERVER + 'getPictureById.action?id=' + id
		}).done(function(data){
			if(typeof(data) == 'string'){
				data = $.parseJSON(data);
			}
			callback && callback(data);
		});
	}

	return {
		getCategory: getCategory
		,getArtist: getArtist
		,getPicture: getPicture
		,getRoom: getRoom
		,getPictureFrame: getPictureFrame
		,getPictureById: getPictureById
	}
})();