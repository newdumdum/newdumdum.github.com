/**
 * @author ShiChunhua
 * @fileoverview 时时中心.
 */
application.Core.registerModule("NowBox", function(sandbox){
    var config = sandbox.getConfig(), 
	lib = sandbox.getLib(),
	
	box = null,
	dateBox = null,
	resultBox = null,
	tipBox = null,
	tipContent = null,
	isBuildDateBox = false,
	dateCon,
	dateBlock,
	dateList = [],
	dateDomList = [],
	isTipShow = false,
	currentShowDate = null,
	currentOrder = null,
	dateLeftButton, dateRightButton;
    
	/**
	 * 初始化
	 */
	function init(){
		box = lib.g(config.boxId);
		resultBox = lib.g(config.resultBoxId);
		dateBox = lib.g(config.dateBoxId);
		tipBox = lib.g(config.tipBoxId);
		tipContent = lib.g(config.tipContentId);
		
		sandbox.on('NowBox-ShowList', showList);
	}
	
	
	/**
	 * 显示频道列表
	 */
	function showList(){
		/*
		sandbox.notify('BarBox-SecondStatus', {
			text: '当前'
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
			,title: '当前'
		});
		
		sandbox.notify('HomeBox-ZoomEffect', {zoomIn: true});
		
		lib.show(box);
		setTimeout(function(){
			zoomEffect(true);
		}, 0);
		
		setTimeout(function(){
			if(!isBuildDateBox){
				buildDateBox();
			}
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
		sandbox.notify('NetBox-getProgramList', {
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
		lib.show(resultBox);
		var str = [];
		str[str.length] = lib.string.format(config.resultTitleHTML, {
			title: config.titleName
		});
		str[str.length] = '<div class="tableListContent">';
		
		
		var channel = result.selectSingleNode('.//channel').firstChild.nodeValue, 
		channelId = result.selectSingleNode('.//channelId').textContent,
		programId, programName;
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
				,channelId: channelId
				,channel: channel
				,time: item.selectSingleNode('./time').firstChild.nodeValue
			});
		}
		str[str.length] = '</div>';
		
		resultBox.innerHTML = str.join('');
	}
	
	
	/**
	 * 构建日期选择控件
	 */
	function buildDateBox(){
		dateBox.innerHTML = '';
		var now = new Date(), curDate = now.getUTCDate();
		dateList = getDateList(now.getUTCFullYear(), now.getUTCMonth(), curDate, 8);
		
		var item, topLine = lib.dom.create('div', {'class': 'topLine'});
		dateBox.appendChild(topLine);
		dateCon = lib.dom.create('div', {'class': 'dateBox'});
		dateBox.appendChild(dateCon);
		var inLine = lib.dom.create('div', {'class': 'inLine'});
		dateCon.appendChild(inLine);
		
		dateBlock = lib.dom.create('div', {'class': 'block', 'data-dateblock': '1'});
		dateCon.appendChild(dateBlock);
		dateBlock.innerHTML = curDate;
		
		dateLeftButton = lib.dom.create('div', {'class': 'leftArrow'});
		dateBox.appendChild(dateLeftButton);
		
		dateRightButton = lib.dom.create('div', {'class': 'rightArrow'});
		dateBox.appendChild(dateRightButton);
		
		var order = 0;
		dateDomList = [];
		for(var i = 0 ; i < dateList.length ; i ++){
			item = lib.dom.create('div', {
				'class': dateList[i].date == curDate ? 'date current' : 'date'
				,'data-info': dateList[i].info
				,'data-date': dateList[i].date
				,'data-order': i
			});
			item.innerHTML = dateList[i].date;
			dateCon.appendChild(item);
			
			if(curDate == dateList[i].date){
				order = i;
				currentOrder = i;
				currentShowDate = dateList[i].info;
			}
			dateDomList.push(item);
			
			/*
			lib.on(item, 'click', function(e){
				checkBlock(e.target.getAttribute('data-order') * 1);
				dateBlock.innerHTML = e.target.getAttribute('data-date');
			});
			*/
		}
		
		checkBlock(order);
		initDragEvent(order);
		initArrowEvent();
	}
	
	function checkBlock(order){
		lib.setStyles(dateBlock, {
			'left': order * config.singleWidth + config.marginLeft + 'px'
		});
	}
	
	function initArrowEvent(){
		lib.on(dateLeftButton, 'click', function(){
			moveNext(false);
		});
		
		lib.on(dateRightButton, 'click', function(){
			moveNext(true);
		});
	}
	
	function moveNext(isNext){
		var o = currentOrder;
		if(isNext){
			o ++;
			if(o > dateDomList.length - 1){
				o = dateDomList.length - 1;
			}
		}else{
			o --;
			if(o < 0){
				o = 0;
			}
		}
		if(currentOrder == o){
			return;
		}
		currentOrder = o;
		checkBlock(o);
		dateBlock.innerHTML = dateDomList[o].getAttribute('data-date');
		changeDate(dateDomList[o].getAttribute('data-info'));
	}
	
	/**
	 * 获取一定时间段内的日期信息
	 */
	function getDateList(y, m, d, between){
		var list = [];
		for(var i = d - between/2 ; i < d + between/2; i ++ ){
			var date = new Date(y, m, i);
			var dateStr = date.getUTCFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
			list.push({
				date: new Date(y, m, i).getDate()
				,info: dateStr
				,day: getDayText(y, m, i)
			});
		}
		return list;
	}
	
	function getDayText(y, m, i){
		var text = '', d = new Date(y, m, i), n = new Date();
		if(d.getDay() == n.getDay()){
			text = '今天';
		}else if(d.getDay() == n.getDay() + 1){
			text = '明天'
		}else if(d.getDay() == n.getDay() - 1){
			text = '昨天'
		}else{
			text = '星期' + getDay(d.getDay());
		}
		
		function getDay(w){
			var week = ['日', '一', '二', '三', '四', '五', '六'];
			return week[w];
		}
		return text;
	}
	
	
	/**
	 * 初始日期拖拽事件
	 */
	function initDragEvent(order){
		var isDown = false, merge, x, intv = null, bx, curIndex = order, toDate, toInfo, tmpX;
		
		lib.on(dateBox, 'mousedown', function(e){down(e);});
		lib.on(document, 'mousemove', function(e){move(e);});
		lib.on(document, 'mouseup', function(e){up(e);});
		
		lib.on(dateBox, 'touchstart', function(e){down(e);});
		lib.on(document, 'touchmove', function(e){move(e);});
		lib.on(document, 'touchend', function(e){up(e);});
		
		function down(e){
			var elm = e.target, 
			date = elm.getAttribute('data-info'), 
			isBlock = elm.getAttribute('data-dateblock');
			
			if(!(date || isBlock)){
				return;
			}
			isDown = true;
			bx = lib.dom.getPosition(dateCon).left
			x = e.clientX || e.pageX;
			if(date){
				curIndex = elm.getAttribute('data-order') * 1;
				toDate = elm.getAttribute('data-date');
				toInfo = elm.getAttribute('data-info');
				dateBlock.innerHTML = toDate;
				checkBlock(curIndex);
				currentOrder = curIndex;
				//changeDate(toInfo);
			}
			merge = x - lib.dom.getPosition(elm).left;
			var downX = x;
			if(!intv){
				intv = window.setInterval(function(){
					if(tmpX == x){
						return;
					}
					var toX = x - bx - merge;
					if(toX < config.marginLeft){ toX = config.marginLeft; }
					if(toX + elm.clientWidth + config.marginLeft > dateCon.clientWidth){ toX = dateCon.clientWidth - elm.clientWidth - config.marginLeft; }
					var index = Math.floor((toX + merge - config.marginLeft) /config.singleWidth);
										
					if(!isTipShow){
						lib.show(tipBox);
						isTipShow = true;
					}
					tipContent.innerHTML = dateList[index].day;
					toInfo = dateList[index].info;
					lib.setStyles(tipBox, {
						'left': bx + toX - tipBox.clientWidth/2 + config.singleWidth/2 + 'px'
					});
					
					tmpX = x;
					
					if(x == downX){
						return;
					}
					
					if(index != curIndex){
						var text = dateList[index].date;
						dateBlock.innerHTML = text;
					}
					lib.setStyles(dateBlock, {
						'left': toX + 'px'
					});
					curIndex = index;
				}, 20);
			}
		}
		
		function move(e){
			if(!isDown){return;}
			x = e.clientX || e.pageX;
		}
		function up(e){
			if(isDown){
				isDown = false;
				window.clearInterval(intv);
				intv = null;
				checkBlock(curIndex);
				
				lib.hide(tipBox);
				isTipShow = false;
				tmpX = null;
				currentOrder = curIndex;
				changeDate(toInfo);
			}
		}
	}
	
	/**
	 * 日期改变
	 */
	function changeDate(toDate){
		if(currentShowDate == toDate){
			return;
		}
		currentShowDate = toDate;
		
		// start date change request
		console.log(currentShowDate);
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
