/**
 * @author ShiChunhua
 * @fileoverview 频道中心.
 */
application.Core.registerModule("ChannelBox", function(sandbox){
    var config = sandbox.getConfig(), 
	lib = sandbox.getLib(),
	
	box = null,
	tab = null,
	resultBox = null,
	
	tabNode = null,
	tabType = 'all';
    
	/**
	 * 初始化
	 */
	function init(){
		box = lib.g(config.boxId);
		tab = lib.g(config.tabId);
		resultBox = lib.g(config.resultBoxId);
		
		tabNode = tab.getElementsByTagName('div')[0];
		lib.on(tab, 'click', function(e){
			var elm = e.target || e.srcElement, type = elm.getAttribute('data-channeltype');
			if(type == tabType){
				return;
			}
			tabType = type;
			lib.removeClass(tabNode, 'checked');
			tabNode = elm;
			lib.addClass(tabNode, 'checked');
			
			getList();
		});
		
		sandbox.on('ChannelBox-ShowList', showList);
	}
	
	
	/**
	 * 显示频道列表
	 */
	function showList(){
		/*
		sandbox.notify('BarBox-SecondStatus', {
			text: '频道'
			,callback: function(){hideList();}
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
					hideList();
				}
				,isReturn: true
			}]
			,title: '频道'
		});
		
		sandbox.notify('HomeBox-ZoomEffect', {zoomIn: true});
		
		lib.show(box);
		setTimeout(function(){
			zoomEffect(true);
		}, 0);
		
		setTimeout(function(){
			getList();
		}, 300);
	}
	
	/**
	 * 隐藏频道列表
	 */
	function hideList(){
		sandbox.notify('HomeBox-ZoomEffect', {zoomIn: false});
		zoomEffect(false);
		setTimeout(function(){
			lib.hide(box);
		}, 300);
	}
	
	function getList(){
		resultBox.innerHTML = '';
		sandbox.notify('MainBox-ShowLoading');
		sandbox.notify('NetBox-getChannelList', {
			params: {
				type: tabType
				,page: '1'
				,count: '20'
			},
			callback: function(v){
				showResult(v);
			}
		});
	}
	
	function showResult(result){
		sandbox.notify('MainBox-HideLoading');
		lib.show(resultBox);
		var str = [];
		str[str.length] = lib.string.format(config.resultTitleHTML, {
			title: config.typeInfo[tabType]
		});
		str[str.length] = '<div class="tableListContent">';
		
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
