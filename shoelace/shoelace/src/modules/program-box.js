/**
 * @author ShiChunhua
 * @fileoverview 节目处理.
 */
application.Core.registerModule("ProgramBox", function(sandbox){
    var config = sandbox.getConfig(), 
	lib = sandbox.getLib(),
	box = null,
	listBox = null;
    
	/**
	 * 初始化
	 */
	function init(){
		box = lib.g(config.boxId);
		listBox = lib.g(config.listBoxId);
		
		sandbox.on('ProgramBox-ShowChannelProgram', getChannelProgram);
	}
	
	function getChannelProgram(params){
		var pInfo = {
			moveBox : lib.g(params.node.getAttribute('data-boxId')),
			channelId : params.node.getAttribute('data-channelId'),
			channelName : params.node.getAttribute('data-channelName'),
			title : params.node.getAttribute('data-boxName'),
			searchBox: params.node.getAttribute('data-searchbox') ? lib.g(params.node.getAttribute('data-searchbox')) : false
		}
		
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
				lib.hide(listBox);
				lib.removeClass(box, 'zoomOut');
			}, 200);
			if(pInfo.searchBox){
				lib.show(pInfo.searchBox);
			}
		}
		
		sandbox.notify('BarBox-AddQueue', {
			buttons: [{
				text: pInfo.title
				,width: 'auto'
				,style: {position: 'absolute', left: '6px', top: '6px', padding: '0 6px'}
				,action: goBack
				,isReturn: true
			}]
			,title: pInfo.channelName
		});
		
		sandbox.notify('MainBox-ShowLoading');
		sandbox.notify('NetBox-getProgramList', {
			params: {
				channel: pInfo.channelId
			},
			callback: function(v){
				showList(v, pInfo);
			}
		});
	}
	
	
	function showList(result, params){
		sandbox.notify('MainBox-HideLoading');
		lib.show(listBox);
		var str = [];
		str[str.length] = lib.string.format(config.resultTitleHTML, {
			title: params.channelName
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
				,channelId: params.channelId
				,channel: params.channelName
			});
		}
		str[str.length] = '</div>';
		
		listBox.innerHTML = str.join('');
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
