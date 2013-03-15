/**
 * @author ShiChunhua
 * @fileoverview UI框架.
 */
application.Core.registerModule("MainBox", function(sandbox){
    var config = sandbox.getConfig(), 
	lib = sandbox.getLib(),
	
	loadingBox = null,
	messageBox = null;
    
	/**
	 * 初始化
	 */
	function init(){
		loadingBox = lib.g(config.loadingBoxId);
		
		lib.on(document, 'contextmenu', function(e){
			lib.event.stop(e);
			return false;
		});
		
		initTouch();
		initMessageBox();
		
		sandbox.on('MainBox-ShowLoading', showLoading);
		sandbox.on('MainBox-HideLoading', hideLoading);
	}
	
	function initTouch(){
		lib.on(document, 'mousedown', function(e){down(e);});
		lib.on(document, 'mouseout', function(e){up(e);});
		lib.on(document, 'mouseup', function(e){up(e);});
		
		lib.on(document, 'touchstart', function(e){down(e);});
		lib.on(document, 'touchcancel', function(e){up(e);});
		lib.on(document, 'touchend', function(e){up(e);});
		
		lib.on(document, 'click', function(e){click(e);});
		
		function down(e){
			var elm = e.target || e.srcElement, isParent;
			if((elm && elm.getAttribute && elm.getAttribute('data-item') == 'table') || 
			(isParent = (elm.parentNode && elm.parentNode.getAttribute && elm.parentNode.getAttribute('data-item') == 'table' 
			&& elm.getAttribute('data-event') == null))){
				lib.addClass(isParent ? elm.parentNode : elm, 'down');
			}
		}
		
		function up(e){
			var elm = e.target || e.srcElement, isParent;
			if((elm && elm.getAttribute && elm.getAttribute('data-item') == 'table') || 
			(isParent = (elm.parentNode && elm.parentNode.getAttribute && elm.parentNode.getAttribute('data-item') == 'table'))){
				lib.removeClass(isParent ? elm.parentNode : elm, 'down');
			}
		}
		
		function click(e){
			var elm = e.target || e.srcElement, isParent;
			if((elm && elm.getAttribute && elm.getAttribute('data-event') != null) || 
			(isParent = (elm.parentNode && elm.parentNode.getAttribute && elm.parentNode.getAttribute('data-event') != null))){
				var n = (isParent ? elm.parentNode : elm), evt = n.getAttribute('data-event');
				if(evt){
					sandbox.notify(evt, {node: n});
				}
			}
		}
	}
	
	/**
	 * 处理消息盒子 
	 */
	function initMessageBox(){
		messageBox = lib.g(config.messageBoxId);
		lib.hide(messageBox);
		
		sandbox.on('MessageBox-ShowMessage', function(params){
			showMessageBox(params);
		});
	}
	
	function showMessageBox(params){
		messageBox.innerHTML = '';
		var type = params.type || 'alert';
		
		var box = lib.dom.create('div', {
			'class': 'box'
		});
		messageBox.appendChild(box);
		
		var content = lib.dom.create('div', {
			'class': 'content'
		});
		content.innerHTML = params.text;
		box.appendChild(content);
		
		var bar = lib.dom.create('div', {'class': 'bar'});
		box.appendChild(bar);
		
		var okBt, noBt;
		switch(type){
			case 'confirm':
				okBt = new MacButton({text: '确定', width: 50, styles: {position: 'absolute', left: '50%', top: '6px', 'margin-left': '-65px'}});
				okBt.onclick = function(){
					params.ok && params.ok();
					lib.hide(messageBox);
				}
				bar.appendChild(okBt.getNode());
				
				noBt = new MacButton({text: '取消', width: 50, styles: {position: 'absolute', left: '50%', top: '6px', 'margin-right': '-65px'}});
				noBt.onclick = function(){
					params.no && params.no();
					lib.hide(messageBox);
				}
				bar.appendChild(noBt.getNode());
				break;
			case 'alert':
				okBt = new MacButton({text: '确定', width: 50, styles: {position: 'absolute', left: '50%', top: '6px', 'margin-left': '-25px'}});
				okBt.onclick = function(){
					params.ok && params.ok();
					lib.hide(messageBox);
				}
				bar.appendChild(okBt.getNode());
				break;
		}
		
		params.buildOK && params.buildOK();
		lib.show(messageBox);
	}
	
	
	
	function showLoading(){
		lib.removeClass(loadingBox, 'fadeIn');
		if(loadingBox.className.indexOf('doLoading') == -1){
			lib.addClass(loadingBox, 'doLoading');
		}
		lib.show(loadingBox);
	}
	
	function hideLoading(){
		lib.addClass(loadingBox, 'fadeIn');
		setTimeout(function(){
			lib.removeClass(loadingBox, 'fadeIn');
			lib.removeClass(loadingBox, 'doLoading');
			lib.hide(loadingBox);
		}, 300);
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
