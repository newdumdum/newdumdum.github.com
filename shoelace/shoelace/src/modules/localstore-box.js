/**
 * @author ShiChunhua
 * @fileoverview 本地存储.
 */
application.Core.registerModule("LocalStoreBox", function(sandbox){
    var config = sandbox.getConfig(), 
	lib = sandbox.getLib();
    
	/**
	 * 初始化
	 */
	function init(){
		sandbox.on('LocalStoreBox-SetValue', function(params){
			setValue(params.details, params.callback);
		});
		sandbox.on('LocalStoreBox-GetValue', function(params){
			getValue(params.details, params.callback);
		});
		
		sandbox.on('LocalStoreBox-AddFavorate', function(params){
			addFavorate(params.id);
		});
		sandbox.on('LocalStoreBox-RemoveFavorate', function(params){
			removeFavorate(params.id);
		});
		sandbox.on('LocalStoreBox-CheckFavorate', function(params){
			checkFavorate(params);
		});
		sandbox.on('LocalStoreBox-GetFavorate', function(params){
			getFavorate(params.callback);
		});
		
		initUUID();
		initUserInfo();
		initLocalInfo();
	}
	
	/**
	 * 初始化UUID数据
	 */
	function initUUID(){
		getValue({
			name: config.uuidKey
		}, function(v){
			var uuid = null;
			if(!v){
				uuid = createUUID();
				setValue({
					name: config.uuidKey
					,value: uuid
				}, function(){});
			}else{
				uuid = v;
			}
			
			sandbox.notify('LocalStoreBox-TellUUID', {uuid: uuid}, true);
		});
	}
	
	/**
	 * 获取用户信息
	 */
	function initUserInfo(){
		getValue({
			name: config.userNameKey
		}, function(v){
			var username = null;
			if(!v){
				username = '';
			}else{
				username = v;
			}
			
			sandbox.notify('LocalStoreBox-TellUserName', {username: username}, true);
		});
	}
	
	/**
	 * 获取位置信息
	 */
	function initLocalInfo(){
		getValue({
			name: config.userLocalKey
		}, function(v){
			var location = null;
			if(!v){
				location = '北京|北京';
			}else{
				location = v;
			}
			
			sandbox.notify('LocalStoreBox-TellLocation', {location: location}, true);
		});
	}
	
	/**
	 * 获取收藏数据
	 */
	function getFavorate(callback){
		getValue({
			name: config.userFavorateKey
		}, function(v){
			var f = null;
			if(!v){
				f = [];
			}else{
				f = lib.json.decode(v);
			}
			callback && callback(f);
		});
	}
	
	function setFavorate(id){
		getFavorate(function(v){
			var list = v;
			if(list.indexOf(id) != -1){
				return;
			}
			list.push(id);
			setValue({
				name: config.userFavorateKey
				,value: lib.json.encode(list)
			}, function(){
				
			});
		});
	}
	
	function checkFavorate(params){
		getFavorate(function(v){
			var list = v;
			params.callback && params.callback(list.indexOf(params.id) != -1);
		});
	}
	
	/**
	 * 获取本地数据
	 */
	function getValue(details, callback){
        if (lib.more.storage) {
            var storage = new lib.more.storage.Store(config.localAreaKey, {});
            storage.get(details.name, function(status, value){
                callback &&
                callback(value);
            });
        } else {
            callback && callback({});
        }
	}
	
	/**
	 * 设置本地数据
	 */
	function setValue(details, callback){
        if (lib.more.storage) {
            var storage = new lib.more.storage.Store(config.localAreaKey, {});
            storage.set(details.name, details.value);
        }
        callback && callback();
	}
	
	
	/**
	 * 创建UUID
	 */
	function createUUID(){
	    var s = [];
	    var hexDigits = "0123456789ABCDEF";
	    for (var i = 0; i < 32; i++) {
	        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	    }
	    s[12] = "4";// bits 12-15 of the time_hi_and_version field to 0010
	    s[16] = hexDigits.substr((s[16] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
	    var uuid = s.join("");
	    return uuid;
	}
	
	function addFavorate(id){
		setFavorate(id);
	}
	
	function removeFavorate(id){
		getFavorate(function(v){
			var list = v, index = list.indexOf(id);
			if(index == -1){
				return;
			}
			list.splice(index, 1);
			setValue({
				name: config.userFavorateKey
				,value: lib.json.encode(list)
			}, function(){
				
			});
		});
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
