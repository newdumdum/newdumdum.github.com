/**
 * @author ShiChunhua
 * @fileoverview 节目详细信息处理.
 */
application.Core.registerModule("ProgramDetailBox", function(sandbox){
    var config = sandbox.getConfig(), 
	lib = sandbox.getLib(),
	box = null,
	infoBox = null,
	commentBox = null,
	
	programId = null,
	
	addButton = null,
	shareButton = null;
    
	/**
	 * 初始化
	 */
	function init(){
		box = lib.g(config.boxId);
		infoBox = lib.g(config.infoBoxId);
		
		addButton = lib.g(config.addButtonId);
		shareButton = lib.g(config.shareButtonId);
		
		commentBox = lib.g(config.commendBoxId);
		
		sandbox.on('ProgramDetailBox-ShowProgram', getProgramInfo);
		
		initButton();
	}
	
	function getProgramInfo(params){
		var pInfo = {
			moveBox : lib.g(params.node.getAttribute('data-boxId')),
			title : params.node.getAttribute('data-programName'),
			programId : params.node.getAttribute('data-programId'),
			programName: params.node.getAttribute('data-programName'),
			time: params.node.getAttribute('data-programTime'),
			searchBox: params.node.getAttribute('data-searchbox') ? lib.g(params.node.getAttribute('data-searchbox')) : false
			,channelName: params.node.getAttribute('data-channelName')
			,channelId: params.node.getAttribute('data-channelId')
		}
		
		programId = pInfo.programId;
		
		lib.addClass(box, 'zoomOut');
		lib.show(box);
		setTimeout(function(){
			lib.removeClass(box, 'right');
			lib.addClass(pInfo.moveBox, 'left');
		}, 0);
		if(pInfo.searchBox){
			lib.hide(pInfo.searchBox);
		}
		
		function goBack(){
			lib.addClass(box, 'right');
			lib.removeClass(pInfo.moveBox, 'left');
			setTimeout(function(){
				lib.hide(box);
				lib.removeClass(box, 'zoomOut');
			}, 300);
			if(pInfo.searchBox){
				lib.show(pInfo.searchBox);
			}
		}
		
		function addComment(){
			sandbox.notify('CommentBox-Edit', {
				programId: pInfo.programId
				,moveBox: box
			});
		}
		
		sandbox.notify('BarBox-AddQueue', {
			buttons: [{
				text: '返回'
				,width: 'auto'
				,style: {position: 'absolute', left: '6px', top: '6px', padding: '0 6px'}
				,action: goBack
				,isReturn: true
			},{
				type: 'image'
				,image: 'write'
				,text: ''
				,width: 'auto'
				,style: {position: 'absolute', right: '6px', top: '6px'}
				,action: addComment
			}]
			,title: pInfo.title
		});
		
		showInfo(pInfo);
		getCommentInfo(pInfo.programId);
		checkFavorateButton();
	}
	
	function showInfo(params){
		infoBox.innerHTML = lib.string.format(config.infoHTML, {
			channel: params.channelName
			,program: params.programName
			,time: params.time
		});
	}
	
	function initButton(){
		lib.on(addButton, 'click', function(){
			if(addButton.className.indexOf('disable') == -1){
				sandbox.notify('LocalStoreBox-AddFavorate', {
					id: programId
				});
				lib.addClass(addButton, 'disable');
			}else{
				sandbox.notify('LocalStoreBox-RemoveFavorate', {
					id: programId
				});
				lib.removeClass(addButton, 'disable');
			}
		});
		
		lib.on(shareButton, 'click', function(){
			shareProgram();
		});
	}
	
	function checkFavorateButton(){
		sandbox.notify('LocalStoreBox-CheckFavorate', {
			id: programId
			,callback: function(isIn){
				lib.removeClass(addButton, 'disable');
				if(isIn){
					lib.addClass(addButton, 'disable');
				}
			}
		});
	}
	
	function getCommentInfo(id){
		commentBox.innerHTML = '';
		sandbox.notify('MainBox-ShowLoading');
		sandbox.notify('NetBox-getProgramComment', {
			params: {
				program: id
			},
			callback: function(v){
				showCommentList(v)
			}
		});
	}
	
	
	function showCommentList(result){
		sandbox.notify('MainBox-HideLoading');
		
		var str = [];
		str[str.length] = '<div class="tablelist comment">';
		
		var items = result.selectNodes('.//item'), iLen = items.length;
		if(iLen == 0){
			str[str.length] = '<div class="item">' + config.noCommentHTML + '</div>';
		}else{
			str[str.length] = lib.string.format(config.resultTitleHTML, {
				title: '评论'
			});
		}
		
		for(var i = 0 ; i < iLen ; i ++){
			var item = items[i];
			str[str.length] = lib.string.format(config.resultItemHTML, {
				nickname: lib.string.encodeHTML(item.selectSingleNode('./nickname').firstChild.nodeValue)
				,text: lib.string.encodeHTML(item.selectSingleNode('./content').firstChild.nodeValue)
				,time: lib.string.encodeHTML(item.selectSingleNode('./time').firstChild.nodeValue)
			});
		}
		
		
		str[str.length] = '</div>';
		
		
		commentBox.innerHTML = str.join('');
	}
	
	function shareProgram(){
		
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
