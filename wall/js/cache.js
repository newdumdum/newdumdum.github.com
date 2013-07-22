/**
* 缓存功能服务
*/
var CACHE = (function(){
	var CACHE_MAP = {};

	function set(url){
		if(!CACHE_MAP[url]){
			var img = new Image();
			img.src = url;
			CACHE_MAP[url] = img;
		}
	}
	

	return {
		set: set
	}
})();