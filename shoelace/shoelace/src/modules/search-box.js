/**
 * @author ShiChunhua
 * @fileoverview 搜索中心.
 */
application.Core.registerModule("SearchBox", function(sandbox){
    var config = sandbox.getConfig(), 
	lib = sandbox.getLib(),
	
	box = null,
	tab = null,
	resultBox = null,
	
	searchNode = null,
	searchType = 'channel';
    
	/**
	 * 初始化
	 */
	function init(){
		box = lib.g(config.boxId);
		tab = lib.g(config.tabId);
		resultBox = lib.g(config.resultBoxId);
		
		sandbox.on('SearchBox-Show', showSearchBox);
		sandbox.on('SearchBox-Hide', hideSearchBox);
		
		searchNode = tab.getElementsByTagName('div')[0];
		lib.on(tab, 'click', function(e){
			var elm = e.target || e.srcElement, type = elm.getAttribute('data-searchtype');
			if(type == searchType){
				return;
			}
			searchType = type;
			lib.removeClass(searchNode, 'checked');
			searchNode = elm;
			lib.addClass(searchNode, 'checked');
		});
		
		sandbox.on('SearchBox-DoSearch', function(params){doSearch(params.text);});
		sandbox.on('SearchBox-StopSearch', stopSearch);
	}
	
	
	/**
	 * 显示搜索模块
	 */
	function showSearchBox(){
		sandbox.notify('HomeBox-ZoomEffect', {zoomIn: true, hideSearch: false});
		
		lib.show(box);
		setTimeout(function(){
			zoomEffect(true);
		}, 0);
	}
	
	/**
	 * 隐藏搜索模块
	 */
	function hideSearchBox(){
		sandbox.notify('HomeBox-ZoomEffect', {zoomIn: false});
		zoomEffect(false);
		setTimeout(function(){
			lib.hide(box);
		}, 300);
	}
	
	function doSearch(text){
		lib.hide(tab);
		resultBox.innerHTML = '';
		sandbox.notify('MainBox-ShowLoading');
		sandbox.notify('NetBox-doSearch', {
			params: {
				type: searchType
				,text: text
			},
			callback: function(v){
				showResult(v);
			}
		});
	}
	
	function stopSearch(){
		lib.show(tab);
		resultBox.innerHTML = '';
		sandbox.notify('MainBox-HideLoading');
		lib.hide(resultBox);
	}
	
	function showResult(result){
		sandbox.notify('MainBox-HideLoading');
		lib.show(resultBox);
		var str = [];
		str[str.length] = lib.string.format(config.resultTitleHTML, {
			title: config.typeInfo[searchType]
		});
		str[str.length] = '<div class="tableListContent">';
		
		if(searchType == 'channel'){
			var items = result.selectNodes('.//item'), item, iLen = items.length, channelId, channel;
			if(iLen == 0){
				str = [config.emptyResult];
			}
			for(var i = 0 ; i < iLen ; i ++){
				item = items[i];
				channel = item.selectSingleNode('./channel').firstChild.nodeValue;
				channelId = item.selectSingleNode('./id').textContent;
				str[str.length] = lib.string.format(config.resultItemHTML, {
					text: channel
					,channelId: channelId
					,channel: channel
				});
			}
		}else if(searchType == 'program'){
			var channel, channelId,
			programId, programName;
			var items = result.selectNodes('.//item'), item, iLen = items.length;
			if(iLen == 0){
				str = [config.emptyResult];
			}
			for(var i = 0 , iLen = items.length ; i < iLen ; i ++){
				item = items[i];
				channel = item.selectSingleNode('./channel').firstChild.nodeValue;
				channelId = item.selectSingleNode('./channelId').textContent;
				programName = item.selectSingleNode('./program').firstChild.nodeValue;
				programId = item.selectSingleNode('./id').textContent;
				str[str.length] = lib.string.format(config.resultProgramItemHTML, {
					text: programName
					,programId:programId
					,programName: programName
					,channelId: channelId
					,channel: channel
					,time: item.selectSingleNode('./time').firstChild.nodeValue
				});
			}
		}
		str[str.length] = '</div>';
		
		resultBox.innerHTML = str.join('');
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
	 * 销毁
	 */
	function destroy(){
		
	}
    
    return {
        init: init,
        destroy: destroy
    };
});
