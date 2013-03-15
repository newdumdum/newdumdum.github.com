/**
 * @author ShiChunhua
 * @fileoverview 用户中心.
 */
application.Core.registerModule("UserBox", function(sandbox){
    var config = sandbox.getConfig(), 
	lib = sandbox.getLib(),
	
	box = null,
	areaInfoBox = null,
	areaInfoText = null,
	
	province = null,
	city = null;
    
	/**
	 * 初始化
	 */
	function init(){
		box = lib.g(config.boxId);
		areaInfoBox = lib.g(config.areaInfoBoxId);
		areaInfoText = lib.g(config.areaInfoTextId);
		
		sandbox.on('LocalStoreBox-TellLocation', function(params){
			province = params.location.split('|')[0];
			city = params.location.split('|')[1];
			areaInfoText.innerHTML = province == city ? province : province + ' - ' + city; 
		});
		
		sandbox.on('UserBox-ShowUserInfo', showUserInfo);
	}
	
	/**
	 * 显示用户设置信息
	 */
	function showUserInfo(){
		/*
		sandbox.notify('BarBox-SecondStatus', {
			text: '设置'
			,callback: function(){hideUserInfo();}
		});
		*/		
		sandbox.notify('BarBox-AddQueue', {
			buttons: [{
				type: 'image'
				,image: 'all'
				,text: ''
				,width: 30
				,style: {position: 'absolute', left: '6px', top: '6px'}
				,action: function(){
					hideUserInfo();
				}
				,isReturn: true
			}]
			,title: '设置'
		});
		
		sandbox.notify('HomeBox-ZoomEffect', {zoomIn: true});
		
		lib.show(box);
		setTimeout(function(){
			zoomEffect(true);
		}, 0);
	}
	
	/**
	 * 隐藏用户设置信息
	 */
	function hideUserInfo(){
		sandbox.notify('HomeBox-ZoomEffect', {zoomIn: false});
		zoomEffect(false);
		setTimeout(function(){
			lib.hide(box);
		}, 300);
	}
	
	/**
	 * 缩放效果 
	 */
	function zoomEffect(isZoomOut){
		if(isZoomOut){
			if(box.className.indexOf('zoomOut') == -1){
				lib.addClass(box, 'zoomOut');
			}
		}else{
			lib.removeClass(box, 'zoomOut');
		}
	}
	
	/**
	 * 显示城市选择
	 */
	function showCitySelect(){
		
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
