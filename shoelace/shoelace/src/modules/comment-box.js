/**
 * @author ShiChunhua
 * @fileoverview 节目评论处理.
 */
application.Core.registerModule("CommentBox", function(sandbox){
    var config = sandbox.getConfig(), 
	lib = sandbox.getLib(),
	box = null,
	textArea = null;
    
	/**
	 * 初始化
	 */
	function init(){
		box = lib.g(config.boxId);
		textArea = lib.g(config.textAreaId);
		
		sandbox.on('CommentBox-Edit', showCommentInfo);
	}
	
	function showCommentInfo(params){
		lib.addClass(box, 'zoomOut');
		lib.show(box);
		setTimeout(function(){
			lib.removeClass(box, 'right');
			lib.addClass(params.moveBox, 'left');
		}, 0);
		
		function goBack(){
			lib.addClass(box, 'right');
			lib.removeClass(params.moveBox, 'left');
			setTimeout(function(){
				lib.hide(box);
				lib.removeClass(box, 'zoomOut');
			}, 200);
		}
		
		setTimeout(function(){
			textArea.focus();
		}, 300);
		
		function sendComment(){
			
		}
		
		sandbox.notify('BarBox-AddQueue', {
			buttons: [{
				text: '取消'
				,width: 'auto'
				,style: {position: 'absolute', left: '6px', top: '6px', padding: '0 6px'}
				,action: goBack
				,isReturn: true
			},{
				text: '发送'
				,width: 'auto'
				,style: {position: 'absolute', right: '6px', top: '6px', padding: '0 6px'}
				,action: sendComment
			}]
			,title: '评论'
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
