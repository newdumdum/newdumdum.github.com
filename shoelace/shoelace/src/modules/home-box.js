/**
 * @author ShiChunhua
 * @fileoverview 主页处理.
 */
application.Core.registerModule("HomeBox", function(sandbox){
    var config = sandbox.getConfig(), 
	lib = sandbox.getLib(),
	
	mainBox,
	searchBox, searchText, blankReg = /(^s*)|(s*$)/g,
	clearButton,
	
	blockBox,
	widgets = [];
    
	/**
	 * 初始化
	 */
	function init(){
		mainBox = lib.g(config.mainBoxId);
		searchBox = lib.g(config.searchBoxId);
		searchText = lib.g(config.searchTextId);
		clearButton = lib.g(config.clearButtonId);
		blockBox = lib.g(config.blockBoxId);
		
		lib.hide(clearButton);
		
		
		sandbox.on('HomeBox-ZoomEffect', function(params){
			zoomEffect(params.zoomIn, params.hideSearch);
		});
		
		sandbox.on('HomeBox-CancleSearch', function(){
			lib.removeClass(searchBox, 'focus');
			
			searchText.value = config.defaultValue;
			lib.hide(clearButton);
			
			//sandbox.notify('BarBox-NormalStatus');
			sandbox.notify('SearchBox-Hide');
			sandbox.notify('SearchBox-StopSearch', null, true);
		});
		
		lib.on(searchText, 'focus', function(){
			if(searchBox.className.indexOf('focus') == -1){
				lib.addClass(searchBox, 'focus');
			
				//sandbox.notify('BarBox-SearchStatus');
				sandbox.notify('BarBox-AddQueue', {
					buttons: [{
						text: '取消'
						,width: 'auto'
						,style: {position: 'absolute', right: '6px', top: '6px', padding: '0 6px'}
						,action: function(){
							sandbox.notify('HomeBox-CancleSearch');
						}
						,isReturn: true
					}]
					,title: ''
				});
				
				sandbox.notify('SearchBox-Show');
			}
			if(searchText.value.replace(blankReg, '') == config.defaultValue 
			|| searchText.value.replace(blankReg, '') == ''){
				searchText.value = '';
			}
		});
		
		lib.on(searchText, 'keyup', function(){
			if(searchText.value.replace(blankReg, '') != config.defaultValue 
			&& searchText.value.replace(blankReg, '') != ''){
				lib.show(clearButton);
				sandbox.notify('SearchBox-DoSearch', {
					text: searchText.value.replace(blankReg, '')
				}, true);
			}
			if(searchText.value.replace(blankReg, '') == '' 
			|| searchText.value.replace(blankReg, '') == config.defaultValue){
				sandbox.notify('SearchBox-StopSearch', null, true);
			}
		});
		
		initClearButton();
		
		showWidgets();
	}
	
	function showWidgets(){
		var info = config.widgetInfo;
		
		for(var i = 0 , iLen = info.length ; i < iLen ; i ++){
			var widget = new Widget(info[i]);
			widget.onClick = function(){
				sandbox.notify(this._params.command, {}, true);
			}
			blockBox.appendChild(widget.getNode());
			widgets.push(widget);
		}
	}
	
	function initClearButton(){
		lib.on(clearButton, 'click', function(){
			lib.hide(clearButton);
			searchText.value = '';
			searchText.focus();
			sandbox.notify('SearchBox-StopSearch', null, true);
		});
		
		lib.on(clearButton, 'touchstart', function(){
			lib.addClass(clearButton, 'down');
		});
		lib.on(clearButton, 'mousedown', function(){
			lib.addClass(clearButton, 'down');
		});
		lib.on(clearButton, 'mouseup', function(){
			lib.removeClass(clearButton, 'down');
		});
		lib.on(clearButton, 'mouseout', function(){
			lib.removeClass(clearButton, 'down');
		});
		lib.on(clearButton, 'touchend', function(){
			lib.removeClass(clearButton, 'down');
		});
		lib.on(clearButton, 'touchcancel', function(){
			lib.removeClass(clearButton, 'down');
		});
	}
	
	
	/**
	 * 缩放效果 
	 */
	function zoomEffect(isZoomIn, hideSearch){
		if(isZoomIn){			
			if(mainBox.className.indexOf('zoomIn') == -1){
				lib.addClass(mainBox, 'zoomIn');
			}
			if(hideSearch != false && searchBox.className.indexOf('fadeOut') == -1){
				lib.addClass(searchBox, 'fadeOut');
			}
		}else{
			lib.removeClass(mainBox, 'zoomIn');
			if(hideSearch != false){
				lib.removeClass(searchBox, 'fadeOut');
			}
		}
	}
	
	/**
	 * 通过id获取widget实例
	 */
	function getWidgetById(id){
		for(var i = 0, iLen = widgets.length ; i < iLen ; i ++){
			if(widgets[i].getId() == id){
				return widgets[i];
			}
		}
		
		return null;
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
