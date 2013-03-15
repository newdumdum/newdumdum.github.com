/**
 * @author ShiChunhua
 * @fileoverview 新闻中心.
 */
application.Core.registerModule("NewsBox", function(sandbox){
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
		
		sandbox.on('NewsBox-ShowList', showList);
		sandbox.on('NewsBox-ShowNewsDetail', showDetails);
	}
	
	function showList(params){
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
			,title: '推荐'
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
	
	function hideList(){
		sandbox.notify('HomeBox-ZoomEffect', {zoomIn: false});
		zoomEffect(false);
		setTimeout(function(){
			lib.hide(box);
		}, 300);
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
	
	function getList(){
		resultBox.innerHTML = '';
		sandbox.notify('MainBox-ShowLoading');
		sandbox.notify('NetBox-getNewsList', {
			params: {
				page: '1'
				,count: '20'
			},
			callback: function(v){
				showResult(v);
			}
		});
	}
	
	function showResult(result){
		sandbox.notify('MainBox-HideLoading');
		var str = [];
		
		var items = result.selectNodes('.//item'), item, iLen = items.length, date, day, month, year;
		if(iLen == 0){
			str = [config.emptyResult];
		}
		for(var i = 0 ; i < iLen ; i ++){
			item = items[i];
			date = item.getAttribute('date');
			var infos = item.selectNodes('./info');
			
			var news = getNewsText(infos);
			str[str.length] = lib.string.format(config.sectionHTML, {
				day: date.split('-')[2]
				,month: date.split('-')[1]
				,year: date.split('-')[0]
				,news: news
			});
		}
		
		resultBox.innerHTML = str.join('');
	}
	
	function getNewsText(items){
		var str = [], iLen = items.length;
		for(var i = 0 ; i < iLen ; i ++){
			item = items[i];
			str[str.length] = lib.string.format(config.itemHTML, {
				text: lib.string.encodeHTML(item.firstChild.nodeValue)
				,link: item.getAttribute('link')
			});
		}
		
		return str.join('');
	}
	
	
	/**
	 * 显示新闻明细
	 */
	function showDetails(params){
		var pInfo = {
			link: params.node.getAttribute('data-link')
		}
		
		console.log(pInfo);
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
