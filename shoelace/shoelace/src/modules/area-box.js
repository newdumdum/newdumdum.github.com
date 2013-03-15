/**
 * @author ShiChunhua
 * @fileoverview 地区选择处理.
 */
application.Core.registerModule("AreaBox", function(sandbox){
    var config = sandbox.getConfig(), 
    userConfig = sandbox.getConfig('UserBox'),
	lib = sandbox.getLib(),
	box = null,
	listBox = null,
	subBox = null,
	subListBox = null,
	isListBuild = false,
	
	currentPorvince = '',
	currentCity = '';
    
	/**
	 * 初始化
	 */
	function init(){
		box = lib.g(config.boxId);
		listBox = lib.g(config.listBoxId);
		subBox = lib.g(config.subBoxId);
		subListBox = lib.g(config.subListBoxId);
		
		sandbox.on('AreaBox-ShowAreaSelect', function(params){
			showProvinceSelect(params);
			buildProvinceList();
		});
		sandbox.on('AreaBox-SelectProvince', function(params){
			showCitySelect(params);
			selectProvince(params);
			buildCityList(params);
		});
		
		sandbox.on('AreaBox-SelectOK', function(params){
			selectCity(params);
			backToSet();
		});
	}
	
	function showProvinceSelect(params){
		var pInfo = {
			moveBox : lib.g(params.node.getAttribute('data-boxId')),
			itemName: '省份选择',
			title : params.node.getAttribute('data-boxName')
		}
		
		lib.addClass(box, 'zoomOut');
		lib.show(box);
		setTimeout(function(){
			lib.removeClass(box, 'right');
			lib.addClass(pInfo.moveBox, 'left');
		},0)
		
		function goBack(){
			lib.addClass(box, 'right');
			lib.removeClass(pInfo.moveBox, 'left');
			setTimeout(function(){
				lib.hide(box);
				lib.removeClass(box, 'zoomOut');
			}, 200);
		}
		
		sandbox.notify('BarBox-AddQueue', {
			buttons: [{
				text: pInfo.title
				,width: 'auto'
				,style: {position: 'absolute', left: '6px', top: '6px', padding: '0 6px'}
				,action: goBack
				,isReturn: true
			}]
			,title: pInfo.itemName
		});
	}
	
	function showCitySelect(params){
		var pInfo = {
			moveBox : lib.g(params.node.getAttribute('data-boxId')),
			itemName: '城市选择',
			title : params.node.getAttribute('data-boxName')
		}
		
		lib.addClass(subBox, 'zoomOut');
		lib.show(subBox);
		setTimeout(function(){
			lib.removeClass(subBox, 'right');
			lib.addClass(pInfo.moveBox, 'left');
		}, 0);
		
		function goBack(){
			lib.addClass(subBox, 'right');
			lib.removeClass(pInfo.moveBox, 'left');
			setTimeout(function(){
				lib.hide(subBox);
				lib.removeClass(subBox, 'zoomOut');
			},200);
		}
		
		sandbox.notify('BarBox-AddQueue', {
			buttons: [{
				text: pInfo.title
				,width: 'auto'
				,style: {position: 'absolute', left: '6px', top: '6px', padding: '0 6px'}
				,action: goBack
				,isReturn: true
			}]
			,title: pInfo.itemName
		});
	}
	
	function buildProvinceList(){
		if(isListBuild){
			return;
		}
		var html = [];
		for(var item in userConfig.areaInfo){
			html[html.length] = lib.string.format(config.provinceItem, {
				province: item
			});
		}
		
		listBox.innerHTML = html.join('');
		isListBuild = true;
	}
	
	function buildCityList(p){
		var html = [], list = userConfig.areaInfo[currentPorvince];
		for(var i = 0 , iLen = list.length ; i < iLen; i ++){
			html[html.length] = lib.string.format(config.cityItem, {
				city: list[i]
			});
		}
		
		subListBox.innerHTML = html.join('');
	}
	
	function selectProvince(params){
		var pInfo = {
			moveBox : lib.g(params.node.getAttribute('data-boxId')),
			province : params.node.getAttribute('data-province'),
			title : params.node.getAttribute('data-boxName')
		}
		currentPorvince = pInfo.province;
	}
	
	function selectCity(params){
		currentCity = params.node.getAttribute('data-city');
		var local = currentPorvince + '|' + currentCity;
		sandbox.notify('LocalStoreBox-TellLocation', {location: local}, true);
		sandbox.notify('LocalStoreBox-SetValue', {
			details: {
				name: sandbox.getConfig('LocalStoreBox').userLocalKey
				,value: local
			},
			callback: null
		});
	}
	
	function backToSet(){
		sandbox.notify('BarBox-BackStep', {'step': 2});
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
