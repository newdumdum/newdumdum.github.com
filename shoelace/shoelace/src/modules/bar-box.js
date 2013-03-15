/**
 * @author ShiChunhua
 * @fileoverview 导航.
 */
application.Core.registerModule("BarBox", function(sandbox){
    var config = sandbox.getConfig(), 
	lib = sandbox.getLib(),
	
	box = null,
	barStatusQueue = [];
    
	/**
	 * 初始化
	 */
	function init(){
		box = lib.g(config.boxId);
		
		buildHomeBar();
		
		sandbox.on('BarBox-AddQueue', addQueue);
		sandbox.on('BarBox-BackStep', backStep);
	}
	
	/**
	 * 主页状态条
	 */
	function buildHomeBar(){
		box.innerHTML = '';
		var selfBt = new MacButton({type: 'image', image: 'self', width: 30, styles: {position: 'absolute', left: '6px', top: '6px'}});
		selfBt.onclick = function(){
			sandbox.notify('UserBox-ShowUserInfo');
		}
		box.appendChild(selfBt.getNode());
		
		var title = lib.dom.create('div', {'class': 'title'});
		title.innerHTML = config.homeTitle;
		box.appendChild(title);
		
		barStatusQueue = [];
	}
	
	/**
	 * 添加状态队列
	 */
	function addQueue(params){
		barStatusQueue.push(params);
		buildQueueBar(params);
	}
	
	/**
	 * 建立队列状态栏
	 */
	function buildQueueBar(params){
		box.innerHTML = '';
		
		var buttonInfo = params.button;
		
		for(var i = 0 , iLen = params.buttons.length ; i < iLen ; i ++){
			var buttonInfo = params.buttons[i];
			var bt = new MacButton({text: buttonInfo.text, type: buttonInfo.type, image: buttonInfo.image, width: buttonInfo.width, styles: buttonInfo.style});
			addButtonAction(buttonInfo, bt);
			box.appendChild(bt.getNode());
		}
		
		var title = lib.dom.create('div', {'class': 'title'});
		title.innerHTML = params.title;
		box.appendChild(title);
	}
	
	/**
	 * 添加按钮事件
	 */
	function addButtonAction(info, button){
		button.onclick = function(){
			info.action & info.action();
			if(info.isReturn){
				barStatusQueue.pop();
				if(barStatusQueue.length != 0){
					buildQueueBar(barStatusQueue[barStatusQueue.length - 1]);
				}else{
					buildHomeBar();
				}
			}
		}
	}
	
	/**
	 * 后退
	 */
	function backStep(params){
		var b = params.step, arr = new Array(b);
		while(arr.length){
			arr.pop();
			var p = barStatusQueue.pop();
			if(p){
				for(var i = 0 , iLen = p.buttons.length ; i < iLen ; i ++){
					if(p.buttons[i].isReturn){
						p.buttons[i].action && p.buttons[i].action();
					}
				}
				if(barStatusQueue.length > 0){
					buildQueueBar(barStatusQueue[barStatusQueue.length - 1]);
				}else{
					buildHomeBar();
				}
			}else{
				buildHomeBar();
			}
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
