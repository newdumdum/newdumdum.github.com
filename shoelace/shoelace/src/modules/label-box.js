/**
 * @author ShiChunhua
 * @fileoverview 分类中心.
 */
application.Core.registerModule("LabelBox", function(sandbox){
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
		
		sandbox.on('LabelBox-ShowList', showList);
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
			,title: '分类'
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
		sandbox.notify('NetBox-getLabelList', {
			params: {
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
		
		var items = result.selectNodes('.//item'), item, iLen = items.length;
		if(iLen == 0){
			str = [config.emptyResult];
		}
		for(var i = 0 , iLen = items.length ; i < iLen ; i ++){
			item = items[i];
			var name = item.firstChild.nodeValue;
			var id = item.getAttribute('id');
			str[str.length] = lib.string.format(config.resultLabelHTML, {
				id: id
				,name: name
			});
		}
		
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
