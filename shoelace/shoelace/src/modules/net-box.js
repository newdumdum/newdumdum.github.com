/**
 * @author ShiChunhua
 * @fileoverview 网络交互.
 */
application.Core.registerModule("NetBox", function(sandbox){
    var config = sandbox.getConfig(), 
	lib = sandbox.getLib(),
	
	uuid = null,
	username = null,
	userLocation = null,
	
	isUidOK = false,
	isUnameOK = false,
	isLocOK = false;
    
	/**
	 * 初始化
	 */
	function init(){
		sandbox.on('LocalStoreBox-TellUUID', function(params){
			uuid = params.uuid;
			isUidOK = true;
			checkBaseOK();
		});
		sandbox.on('LocalStoreBox-TellUserName', function(params){
			username = params.username;
			isUnameOK = true;
			checkBaseOK();
		});
		sandbox.on('LocalStoreBox-TellLocation', function(params){
			userLocation = params.location;
			isLocOK = true;
			checkBaseOK();
		});
		
		/**
		 * 获取频道列表
		 */
		sandbox.on('NetBox-getChannelList', function(details){
			getChannelList(details.params, details.callback);
		});
		
		/**
		 * 获取节目列表
		 */
		sandbox.on('NetBox-getProgramList', function(details){
			getProgramList(details.params, details.callback);
		});
		
		/**
		 * 获取节目列表
		 */
		sandbox.on('NetBox-getProgramComment', function(details){
			getProgramComment(details.params, details.callback);
		});
		
		/**
		 * 查询功能
		 */
		sandbox.on('NetBox-doSearch', function(details){
			if(details.params.type == 'channel'){
				searchChannel(details.params, details.callback);
			}else if(details.params.type == 'program'){
				searchProgram(details.params, details.callback);
			}
		});
		
		/**
		 * 获取新闻列表
		 */
		sandbox.on('NetBox-getNewsList', function(details){
			getNewsList(details.params, details.callback);
		});
		
		/**
		 * 获取收藏列表
		 */
		sandbox.on('NetBox-getFavorateList', function(details){
			getFavorateList(details.params, details.callback);
		});
		
		
		/**
		 * 获取分类列表
		 */
		sandbox.on('NetBox-getLabelList', function(details){
			getLabelList(details.params, details.callback);
		});
		
		sandbox.on('NetBox-Requset', function(params){
			
		});
	}
	
	/**
	 * 验证本地基础数据是否已经读取完成
	 */
	function checkBaseOK(){
		if(isUidOK && isUnameOK && isLocOK){
			sandbox.notify('NetBox-Ready');
		}
	}
	
	/**
	 * 获取频道列表
	 */
	function getChannelList(params, callback){
		params = lib.object.extend(params, {uid: uuid, local: userLocation});
		var p = [];
		for(var item in params){
			p.push(item + '=' + params[item]);
		}
		
		request(config.serviceURL + 'getChannelList/index.xml', params, callback);
	}
	
	/**
	 * 获取节目列表
	 */
	function getProgramList(params, callback){
		params = lib.object.extend(params, {uid: uuid, local: userLocation});
		var p = [];
		for(var item in params){
			p.push(item + '=' + params[item]);
		}
		
		request(config.serviceURL + 'getProgramList/index.xml?t=' + (+new Date()), params, callback);
	}
	
	/**
	 * 获取收藏列表
	 */
	function getFavorateList(params, callback){
		params = lib.object.extend(params, {uid: uuid, local: userLocation});
		var p = [];
		for(var item in params){
			p.push(item + '=' + params[item]);
		}
		
		request(config.serviceURL + 'getProgramList/index.xml?t=' + (+new Date()), params, callback);
	}
	
	/**
	 * 获取分类列表
	 */
	function getLabelList(params, callback){
		params = lib.object.extend(params, {uid: uuid, local: userLocation});
		var p = [];
		for(var item in params){
			p.push(item + '=' + params[item]);
		}
		
		request(config.serviceURL + 'getLabelList/index.xml?t=' + (+new Date()), params, callback);
	}
	
	/**
	 * 搜索频道
	 */
	function searchChannel(params, callback){
		params = lib.object.extend(params, {uid: uuid, local: userLocation});
		var p = [];
		for(var item in params){
			p.push(item + '=' + params[item]);
		}
		
		request(config.serviceURL + 'searchChannel/index.xml?t=' + (+new Date()), params, callback);
	}
	
	/**
	 * 搜索节目
	 */
	function searchProgram(params, callback){
		params = lib.object.extend(params, {uid: uuid, local: userLocation});
		var p = [];
		for(var item in params){
			p.push(item + '=' + params[item]);
		}
		
		request(config.serviceURL + 'searchProgram/index.xml?t=' + (+new Date()), params, callback);
	}
	
	/**
	 * 获取节目评论
	 */
	function getProgramComment(params, callback){
		params = lib.object.extend(params, {uid: uuid, local: userLocation});
		var p = [];
		for(var item in params){
			p.push(item + '=' + params[item]);
		}
		
		request(config.serviceURL + 'getProgramComment/index.xml?t=' + (+new Date()), params, callback);
	}
	
	/**
	 * 获取新闻
	 */
	function getNewsList(params, callback){
		params = lib.object.extend(params, {uid: uuid, local: userLocation});
		var p = [];
		for(var item in params){
			p.push(item + '=' + params[item]);
		}
		
		request(config.serviceURL + 'getNewsList/index.xml?t=' + (+new Date()), params, callback);
	}
	
	/**
	 * 发送网络请求
	 */
	function request(url, params, callback){
		lib.ajax.get(url, function(xhr, msg){
			if(xhr.status == '200'){
				callback && callback(XML(msg));
			}
		});
		/*
		lib.ajax.post(url, params, function(xhr, msg){
			if(xhr.status == '200'){
				callback && callback(XML(msg));
			}
		});
		*/
	}
	
	/**
	 * 销毁
	 */
	function destroy(){
		
	}
    
    return {
        init: init,
        destroy: destroy
    };
});
