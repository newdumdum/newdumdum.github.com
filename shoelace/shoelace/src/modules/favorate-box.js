/**
 * @author ShiChunhua
 * @fileoverview 收藏中心.
 */
application.Core.registerModule("FavorateBox", function(sandbox){
    var config = sandbox.getConfig(), 
	lib = sandbox.getLib(),
	
	box = null,
	resultBox = null;
    
	/**
	 * 初始化
	 */
	function init(){
		box = lib.g(config.boxId);
		resultBox = lib.g(config.resultBoxId);
		
		sandbox.on('FavorateBox-ShowList', showList);
	}
	
	
	/**
	 * 显示频道列表
	 */
	function showList(){
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
			,title: '收藏'
		});
		
		sandbox.notify('HomeBox-ZoomEffect', {zoomIn: true});
		
		lib.show(box);
		setTimeout(function(){
			zoomEffect(true);
		}, 0);
		
		setTimeout(function(){
			sandbox.notify('LocalStoreBox-GetFavorate', {
				callback: function(list){
					getList(list);
				}
			});
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
	
	function getList(list){
		resultBox.innerHTML = '';
		sandbox.notify('MainBox-ShowLoading');
		sandbox.notify('NetBox-getFavorateList', {
			params: {
				ids: list.join(',')
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
			title: '我的收藏'
		});
		str[str.length] = '<div class="tableListContent">';
		//console.log(result);
		var programId, programName;
		var items = result.selectNodes('.//item'), item, iLen = items.length;
		if(iLen == 0){
			str = [config.emptyResult];
		}
		for(var i = 0 , iLen = items.length ; i < iLen ; i ++){
			item = items[i];
			programName = item.selectSingleNode('./program').firstChild.nodeValue;
			programId = item.selectSingleNode('./id').textContent;
			str[str.length] = lib.string.format(config.resultProgramItemHTML, {
				text: programName
				,programId:programId
				,programName: programName
				,time: item.selectSingleNode('./time').firstChild.nodeValue
				,channelId: ''
				,channel: ''
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
