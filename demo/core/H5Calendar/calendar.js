/**
 * @author 史纯华(shichunhua)
 * @fileoverview webkit日历控件
 * 				需要调用tangram
 * 				AceCalendar 提供接口(方法) 具体参数见对应方法注释:
 * @version 1.0.0.0
 */

/**
 * AceCalendar构造函数
 * @param {Object} params 参数:
 * 	{HTMLElement} render 容器
 * 	{Int} width 控件的宽度
 * 	{String} [pattern] 日期格式 默认 yyyy/MM/dd hh:mm:ss
 * 	{String} [initiation] 默认日期(时间) 默认取系统日期(时间)
 * 	{Boolean} [showTime] 是否显示时间 默认为false
 * 	{Boolean} [showFuture] 是否可选取未来日期 默认true
 * 	{Boolean} [showPast] 是否可选取过去日期 默认true
 * 	{Boolean} [atwill] 是否随意选取日期  即是否有选择限制 默认为false
 * 	{Array} [allowList] 如果有选取限制, 给出哪些日期是可选的 格式同pattern中指定的
 */
if(!ace){
	var ace = baidu || T;
}
function AceCalendar(params){
	this._params = params;
	this._render = params.render;
	this._width = params.width || 238;
	this._showTime = params.showTime != null ? params.showTime : false;
	this._pattern = params.pattern || (this._showTime ? 'yyyy/MM/dd hh:mm:ss' : 'yyyy/MM/dd');
	this._initiation = this._getCurrentTime(params.initiation);
	this._now = this._getCurrentTime();
	this._showFuture = params.showFuture != null ? params.showFuture : true;
	this._showPast = params.showPast != null ? params.showPast : true;
	this._atwill = params.atwill != null ? params.atwill : true;
	this._allowList = params.allowList;
	
	this._weekArr = ['日', '一', '二', '三', '四', '五', '六'];
	this._monthArr = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
	
	this._moveTop = null;
	
	this._selectInfo = {
		step: ['month', 'year', 'yearpart', 'yearbigpart']
	};
	
	this._tempDate = {
		target: [],
		year: null,
		month: null,
		date: null
	};
	
	this._init();
}

AceCalendar.prototype = {		
	/**
	 * 初始化
	 */
	_init: function(){
		this._buildDom();
		this._addEvent();
	},
	/**
	 * 创建DOM对象
	 * @param {Object} tagName
	 * @param {Object} params
	 */
	$C: function(tagName, params){
		var elm = document.createElement(tagName);
		for(var item in params){
			if(item == 'className'){
				elm.className = params[item];
			}else if(item == 'innerHTML'){
				elm.innerHTML = params[item];
			}else{
				elm.setAttribute(item, params[item]);
			}
		}
		return elm;
	},
	/**
	 * 添加DOM对象
	 * @param {Object} cNode
	 * @param {Object} pNode
	 */
	$A: function(cNode, pNode){
		return pNode != null ? pNode.appendChild(cNode) : document.body.appendChild(cNode);
	},
	/**
	 * 移除DOM对象
	 * @param {Object} cNode
	 */
	$R: function(cNode){
		return cNode.parentNode.removeChild(cNode);
	},
	
	/**
	 * 获取当前日期和时间
	 */
	_getCurrentTime: function(dateStr){
		var d = dateStr ? this._getTimeByString(dateStr) : new Date();
		return {
			year: d.getUTCFullYear(),
			month: d.getMonth() + 1,
			date: d.getDate(),
			week: d.getDay(),
			hour: d.getHours(),
			minute: d.getMinutes(),
			second: d.getSeconds()
		}
	},
	
	/**
	 * 通过字符串取日期对象
	 */
	_getTimeByString: function(dateStr){
		var year = dateStr.substring(this.parten.indexOf("yyyy"),this.parten.lastIndexOf("yyyy")+4);
		var month = dateStr.substring(this.parten.indexOf("MM"),this.parten.lastIndexOf("MM")+2);
		var date = dateStr.substring(this.parten.indexOf("dd"),this.parten.lastIndexOf("dd")+2);
		
		var hour = dateStr.substring(this.parten.indexOf("hh"),this.parten.lastIndexOf("hh")+2);
		var minute = dateStr.substring(this.parten.indexOf("mm"),this.parten.lastIndexOf("mm")+2);
		var second = dateStr.substring(this.parten.indexOf("ss"),this.parten.lastIndexOf("ss")+2);

		var nDate = this._showTime ? 
			new Date(Number(year), Number(month) - 1, Number(date), Number(hour), Number(minute), Number(second))
			: new Date(Number(year), Number(month) - 1, Number(date));
			
		if(isNaN(nDate)) {
			nDate = new Date();
		}
		return nDate;
	},
	
	/**
	 * 获取双位字符
	 */
	_toDoubleString: function(s){
		s = Number(s);
		if(s < 10){
			return '0' + s;
		}else{
			return s.toString();
		}
	},
	
	/**
	 * 构建日历所需要的DOM结构
	 */
	_buildDom: function(){
		// 主容器
		this._mainBox = this.$C('div', {'className': 'ace_calendar'});
		this.$A(this._mainBox, this._render);
		
		// 日历内容容器
		this._contentBox = this.$C('div', {'className': 'ace_calendar_calendarBox'});
		this.$A(this._contentBox, this._mainBox);
		
		// 年份月份选择容器
		this._selectBox = this.$C('div', {'className': 'ace_calendar_selectBox'});
		this.$A(this._selectBox, this._mainBox);
		ace.hide(this._selectBox);
		
		// 实体头部
		this._head = this.$C('div', {'className': 'ace_calendar_head'});
		this.$A(this._head, this._contentBox);
		
		// 实体的body
		this._body = this.$C('div', {'className': 'ace_calendar_body'});
		this.$A(this._body, this._contentBox);
		
		// 动画容器
		this._bodyBox = this.$C('div', {'className': 'ace_calendar_bodyBox'});
		this.$A(this._bodyBox, this._body);
		
		// 实体的时间选择
		this._timebody = this.$C('div', {'className': 'ace_calendar_timebody'});
		this.$A(this._timebody, this._contentBox);
		
		// 实体的底部
		this._root = this.$C('div', {'className': 'ace_calendar_root'});
		this.$A(this._root, this._contentBox);
		
		this._buildHead();
		this._buildBody();
		this._buildTime();
		this._buildRoot();
		this._buildSelectBox();
	},
	
	/**
	 * 构建头部信息
	 */
	_buildHead: function(){
		this._mainPreButton = this.$C('div', {'className': 'ace_calendar_mainPreButton'});
		this._mainPreButton.innerHTML = '3';
		this.$A(this._mainPreButton, this._head);
		
		this._mainTitle = this.$C('div', {'className': 'ace_calendar_mainTitle'});
		this.$A(this._mainTitle, this._head);
		this._setHead(this._initiation.year, this._initiation.month);
		
		this._mainNextButton = this.$C('div', {'className': 'ace_calendar_mainNextButton'});
		this._mainNextButton.innerHTML = '4';
		this.$A(this._mainNextButton, this._head);
		
		
		this._weekBox = this.$C('div', {'className': 'ace_calendar_weekBox'});
		this.$A(this._weekBox, this._head);
		
		this._buildWeek();
	},
	
	/**
	 * 构建实体内容信息
	 */
	_buildBody: function(){
		// 动画月的容器
		this._monthBox = this.$C('div', {'className': 'ace_calendar_listBox'});
		this.$A(this._monthBox, this._bodyBox);
		
		this._effectMonthBox = this.$C('div', {'className': 'ace_calendar_listBox'});
		this.$A(this._effectMonthBox, this._bodyBox);
		
		this._showDateList(this._monthBox, this._initiation.year, this._initiation.month);
		
		ace.setStyles(this._body, {
			'width': this._width + 'px'
			,'height': this._monthBox.clientHeight + 'px'
		});
		ace.setStyles(this._effectMonthBox, {
			'height': this._monthBox.clientHeight
		});
		
		ace.setStyles(this._bodyBox, {
			'width': this._width + 'px'
			,'height': this._monthBox.clientHeight * 2 + 'px'
		});
		
		this._moveTop = 0;
		
		var me = this;
		setTimeout(function(){
			me.onMonthChange(me._initiation.year, me._initiation.month);
		}, 20);
	},
	
	/**
	 * 显示月份的日期列表
	 */
	_showDateList: function(container, year, month) {
		container.innerHTML = '';
		var list = this._getMonthDayList(year, month),
		theDaysInMonth = new Date(year, month, 0).getDate(),
		w = (this._width / this._weekArr.length).toFixed(2);
		
		for (var i = 1; i < 7; i++) {
			for (var j = 0; j < 7; j++) {
				var dateInfo = this._getDateInfo(year, month, list[i][j]),
				dataStr = dateInfo.year + '-' + dateInfo.month + '-' + dateInfo.date;
				var item = this.$C('div', {
					className: i % 2 == 0 ? 'ace_calendar_dateItem' : 'ace_calendar_dateItem otherRow',
					innerHTML: dateInfo.date,
					'data-date': dataStr
				});
				ace.setStyles(item, {
					'width': w - 2 + 'px'
				});
				if(list[i][j] < 1 || list[i][j] > theDaysInMonth){
					ace.addClass(item, 'otherMonth');
				}
				if(dateInfo.year == this._now.year && dateInfo.month == this._now.month && dateInfo.date == this._now.date){
					ace.addClass(item, 'now');
				}
				if(dateInfo.year == this._tempDate.year && dateInfo.month == this._tempDate.month && dateInfo.date == this._tempDate.date){
					ace.addClass(item, 'current');
					this._tempDate.target.push(item);
				}
				this.$A(item, container);
			}
		}
	},
	
	/**
	 * 获取某年某月的日期列表
	 */
	_getMonthDayList: function(year, month) {
		var aMonth = [];
		for (i = 1; i < 7; i++) aMonth[i] = new Array(i);
	
		var dCalDate = new Date(year, month - 1, 1);
		var iDayOfFirst = dCalDate.getDay();
		var iDaysInMonth = new Date(year, month, 0).getDate();
		var iOffsetLast = new Date(year, month - 1, 0).getDate() - iDayOfFirst + 1;
		var iDate = 1;
		var iNext = 1;
	
		for (d = 0; d < 7; d++) aMonth[1][d] = (d < iDayOfFirst) ? ( - iDayOfFirst + d + 1) : iDate++;
		for (w = 2; w < 7; w++) for (d = 0; d < 7; d++) aMonth[w][d] = iDate++;
		return aMonth;
	},
	
	/**
	 * 获取日期信息
	 */
	_getDateInfo: function(year, month, date) {
		var curDate = new Date(year, month - 1, date);
		if (curDate.getMonth() + 1 == 1 && curDate.getDate() == 1) {
			return {
				year: curDate.getUTCFullYear() + 1,
				month: curDate.getMonth() + 1,
				date: curDate.getDate()
			}
		} else {
			return {
				year: curDate.getUTCFullYear(),
				month: curDate.getMonth() + 1,
				date: curDate.getDate()
			}
		}
	},
	
	/**
	 * 构建时间信息
	 */
	_buildTime: function(){
		
	},
	
	/**
	 * 构建页脚信息
	 */
	_buildRoot: function(){
		this._todayButton = this.$C('div', {'className': 'ace_calendar_todayButton'});
		this._todayButton.innerHTML = '今天';
		this.$A(this._todayButton, this._root);
	},
	
	/**
	 * 构建年月选择图层
	 */
	_buildSelectBox: function(){			
		if(!this._showYear){
			this._showYear = this._initiation.year;
		}
		if(!this._showMonth){
			this._showMonth = this._initiation.month;
		}
		
		var headBox = this.$C('div', {'className': 'ace_calendar_yearMonthHeadBox'});
		this.$A(headBox, this._selectBox);
		
		this._selectHead = this.$C('div', {'className': 'ace_calendar_yearMonthHead'});
		this._selectHead.innerHTML = this._showYear;
		this.$A(this._selectHead, headBox);
		
		this._selectYearPreButton = this.$C('div', {'className': 'ace_calendar_yearMonthPreButton'});
		this._selectYearPreButton.innerHTML = '3';
		this.$A(this._selectYearPreButton, headBox);
		
		this._selectYearNextButton = this.$C('div', {'className': 'ace_calendar_yearMonthNextButton'});
		this._selectYearNextButton.innerHTML = '4';
		this.$A(this._selectYearNextButton, headBox);
		
		
		this._yearMonthListBox = this.$C('div', {'className': 'ace_calendar_yearMonthListBox'});
		this.$A(this._yearMonthListBox, this._selectBox);
		
		
		this._selectInfo.year = this._showYear;
		this._selectInfo.month = this._showMonth;
		this._selectInfo.type = this._selectInfo.step[0];
		
		this._fillSelectMonth();
	},
	
	/**
	 * 填充选择图层中的月份
	 */
	_fillSelectMonth: function(){
		this._selectInfo.type = 'month';
		this._yearMonthListBox.innerHTML = '';
		
		this._selectHead.innerHTML = this._selectInfo.year;
		
		for(var i = 0, iLen = this._monthArr.length ; i < iLen ; i ++){
			var item = this.$C('div', {'className': 'ace_calendar_selectListItem', 'data-month': i + 1});
			item.innerHTML = this._monthArr[i];
			ace.setStyles(item, {
				'width': Math.floor(this._width/4 - 12) + 'px'
			});
			if(i + 1 == this._now.month && this._selectInfo.year == this._now.year){
				ace.addClass(item, 'now');
			}
			if(i + 1 == this._selectInfo.month){
				ace.addClass(item, 'current');
			}
			this.$A(item, this._yearMonthListBox);
		}
	},
	
	/**
	 * 添加周信息的DOM
	 */
	_buildWeek: function(){
		var iLen = this._weekArr.length, w = (this._width/iLen).toFixed(2);
		for(var i = 0 ; i < iLen ; i ++){
			var item = this.$C('div', {'className': 'ace_calendar_weekItem', 'innerHTML': this._weekArr[i]});
			this.$A(item, this._weekBox);
			ace.setStyles(item, {'width': w + 'px'});
		}
		
		ace.setStyles(this._weekBox, {
			'width': this._width + 'px'
		});
	},
	
	/**
	 * 添加日历中元素事件
	 */
	_addEvent: function(){
		var me = this;
		// 主界面前后按钮
		ace.on(this._mainPreButton, 'click', function(){
			me._showPreMonth();
			
			ace.addClass(me._mainTitle, 'flip');
			setTimeout(function(){
				ace.removeClass(me._mainTitle, 'flip');
			}, 300);
		});
		ace.on(this._mainNextButton, 'click', function(){
			me._showNextMonth();
			
			ace.addClass(me._mainTitle, 'flip');
			setTimeout(function(){
				ace.removeClass(me._mainTitle, 'flip');
			}, 300);
		});
		
		// 主界面年月点击
		ace.on(this._mainTitle, 'click', function(){
			me._showYearMonthSelect(true);
		});
		
		// 选择界面前后按钮
		ace.on(this._selectYearPreButton, 'click', function(){
			me._showSelectPreYear();
			
			ace.addClass(me._selectHead, 'vflip');
			ace.addClass(me._yearMonthListBox, 'flip');
			setTimeout(function(){
				ace.removeClass(me._yearMonthListBox, 'flip');
				ace.removeClass(me._selectHead, 'vflip');
			}, 300);
		});
		ace.on(this._selectYearNextButton, 'click', function(){
			me._showSelectNextYear();
			
			ace.addClass(me._selectHead, 'vflip');
			ace.addClass(me._yearMonthListBox, 'flip');
			setTimeout(function(){
				ace.removeClass(me._yearMonthListBox, 'flip');
				ace.removeClass(me._selectHead, 'vflip');
			}, 300);
		});
		
		// 选择界面标题点击
		ace.on(this._selectHead, 'click', function(){
			ace.addClass(me._selectHead, 'flip');
			ace.addClass(me._yearMonthListBox, 'zoomin');
			setTimeout(function(){
				me._fillYearList(true);
				ace.removeClass(me._yearMonthListBox, 'zoomin');
				ace.removeClass(me._selectHead, 'flip');
			}, 300);
		});
		
		// 选择界面图层点击
		ace.on(this._yearMonthListBox, 'click', function(e){
			if(me._selectInfo.type == 'month'){
				me._checkSelectYearMonth(e);
			}else{		
				ace.addClass(me._selectHead, 'flip');			
				ace.addClass(me._yearMonthListBox, 'zoomin');
				setTimeout(function(){
					me._checkSelectYearMonth(e);
					ace.removeClass(me._yearMonthListBox, 'zoomin');
					ace.removeClass(me._selectHead, 'flip');	
				}, 300);
			}
		});
		
		// 日期点击
		ace.on(this._body, 'click', function(e){
			if(!e.target.getAttribute('data-date')){
				return;
			}
			var date = e.target.getAttribute('data-date').split('-');
			me._tempDate.year = Number(date[0]);
			me._tempDate.month = Number(date[1]);
			me._tempDate.date = Number(date[2]);
			
			me._selectInfo.date = me._tempDate.date;
			me._selectDate(me._tempDate.year, me._tempDate.month, me._tempDate.date);
			if(me._tempDate.target.length != 0){
				while(me._tempDate.target.length){
					ace.removeClass(me._tempDate.target.pop(), 'current');
				}
			}
			ace.addClass(e.target, 'current');
			me._tempDate.target.push(e.target);
		});
		
		// "今天"点击
		ace.on(this._todayButton, 'click', function(e){
			me._turnToday();
			me._selectDate(me._now.year, me._now.month, me._now.date);
		});
	},
	
	/**
	 * 显示上个月信息
	 */
	_showPreMonth: function(){
		var me = this;
		ace.removeClass(this._bodyBox, 'moving');
		ace.setStyles(me._bodyBox, {
			'top':0 - this._monthBox.clientHeight + 'px'
		});
			
		this._showDateList(this._effectMonthBox, this._showYear, this._showMonth);
		
		this._showMonth = this._showMonth - 1;
		if(this._showMonth < 1){
			this._showMonth = 12;
			this._showYear = this._showYear - 1;
			
			if(this._showYear < 1900){
				this._showYear = 1900;
			}
		}
		this._showDateList(this._monthBox, this._showYear, this._showMonth);
		
		setTimeout(function(){
			ace.addClass(me._bodyBox, 'moving');
			ace.setStyles(me._bodyBox, {
				'top':0  + 'px'
			});
		}, 10);
		
		this._setHead(this._showYear, this._showMonth);
		
		this._selectInfo.year = this._showYear;
		this._selectInfo.month = this._showMonth;
		
		this.onMonthChange(this._showYear, this._showMonth);
	},
	
	/**
	 * 显示下个月信息
	 */
	_showNextMonth: function(){
		var me = this;
		ace.removeClass(this._bodyBox, 'moving');
		ace.setStyles(me._bodyBox, {
			'top':0 + 'px'
		});
		
		this._showDateList(this._monthBox, this._showYear, this._showMonth);
		
		this._showMonth = this._showMonth + 1;
		if(this._showMonth > 12){
			this._showMonth = 1;
			this._showYear = this._showYear + 1;
		}
		this._showDateList(this._effectMonthBox, this._showYear, this._showMonth);
		
		setTimeout(function(){
			ace.addClass(me._bodyBox, 'moving');
			ace.setStyles(me._bodyBox, {
				'top':0 - me._monthBox.clientHeight + 'px'
			});
		}, 10);
		
		this._setHead(this._showYear, this._showMonth);
		
		this._selectInfo.year = this._showYear;
		this._selectInfo.month = this._showMonth;
		
		this.onMonthChange(this._showYear, this._showMonth);
	},
	
	/**
	 * 设置头信息
	 */
	_setHead: function(year, month){
		this._mainTitle.innerHTML = year + '年 ' + month + '月';
	},
	
	/**
	 * 年月选择图层
	 */
	_showYearMonthSelect: function(isShow, cb){
		var me = this;
		if(isShow){
			ace.show(this._selectBox);
			this._fillSelectMonth();
			cb && cb();
			window.setTimeout(function(){
				ace.addClass(me._selectBox, 'show');
			}, 10);
		}else{
			ace.removeClass(this._selectBox, 'show');
			window.setTimeout(function(){
				ace.hide(me._selectBox);
				cb && cb();
			}, 200);
		}
		/*
		var me = this, cHeight = this._contentBox.clientHeight;
		ace.setStyles(this._selectBox, {
			'top': - cHeight + 'px'
			,'height': cHeight + 'px'
		});			
		
		if(isShow){
			ace.show(this._selectBox);
			this._fillSelectMonth();
		}
		var Tween = ace.ui.Tween, Easing = ace.ui.Easing, me = this;
		isShow ? new Tween(this._selectBox, 'top', - cHeight, 0, Easing.Quad.easeOut, .2, function(){
			cb && cb();
		})
		: new Tween(this._selectBox, 'top', 0, - cHeight, Easing.Quad.easeOut, .2, function(){
			ace.hide(me._selectBox);
			cb && cb();
		});
		*/
	},
	
	/**
	 * 显示选择图层前一个年段
	 */
	_showSelectPreYear: function(){
		if(this._selectInfo.type == 'yearpart'){
			this._selectInfo.type = 'year';
			this._selectInfo.year = Number(this._selectInfo.year.toString().split('').splice(0, 2).join('') + '00') - 100;
			if(this._selectInfo.year < 1900){
				this._selectInfo.year = 1900;
			}
			this._fillYearList();
		}else if(this._selectInfo.type == 'year'){
			this._selectInfo.type = 'month';
			this._selectInfo.year = this._selectInfo.year - this._selectInfo.year.toString().split('').pop() - 1 - 12;
			if(this._selectInfo.year < 1900){
				this._selectInfo.year = 1900;
			}
			this._fillYearList();
		}else if(this._selectInfo.type == 'month'){
			this._selectInfo.year --;
			if(this._selectInfo.year < 1900){
				this._selectInfo.year = 1900;
			}
			this._showYear = this._selectInfo.year;
			
			this._fillSelectMonth();
		}
	},
	
	/**
	 * 显示选择图层下一个年段
	 */
	_showSelectNextYear: function(){
		if(this._selectInfo.type == 'yearpart'){
			this._selectInfo.type = 'year';
			this._selectInfo.year = Number(this._selectInfo.year.toString().split('').splice(0, 2).join('') + '00') + 100;
			if(this._selectInfo.year > 2200){
				this._selectInfo.year = 2200;
			}
			this._fillYearList();
		}else if(this._selectInfo.type == 'year'){
			this._selectInfo.type = 'month';
			this._selectInfo.year = this._selectInfo.year - this._selectInfo.year.toString().split('').pop() - 1 + 12;
			if(this._selectInfo.year > 2200){
				this._selectInfo.year = 2200;
			}
			this._fillYearList();
		}else if(this._selectInfo.type == 'month'){
			this._selectInfo.year ++;
			if(this._selectInfo.year > 2200){
				this._selectInfo.year = 2200;
			}
			this._showYear = this._selectInfo.year;
						
			this._fillSelectMonth();
		}
	},
	
	/**
	 * 填充选择图层中年份列表
	 */
	_fillYearList: function(){
		if(this._selectInfo.type == 'month'){
			this._selectInfo.type = 'year';
		}else if(this._selectInfo.type == 'year'){
			this._selectInfo.type = 'yearpart';
		}else if(this._selectInfo.type == 'yearpart'){
			return;
		}
		this._yearMonthListBox.innerHTML = '';
		this._selectHead.innerHTML = '';
		
		var showYearLength, startYear, item, yearMerge;
		if(this._selectInfo.type == 'year'){
			showYearLength = 12;
			startYear = this._selectInfo.year - this._selectInfo.year.toString().split('').pop() - 1;
			this._selectHead.innerHTML = startYear + ' - ' + (startYear + showYearLength - 1);
			
			for(var i = 0, iLen = showYearLength ; i < iLen ; i ++){
				item = this.$C('div', {'className': 'ace_calendar_selectListItem', 'data-year': startYear + i});
				item.innerHTML = startYear + i;
				ace.setStyles(item, {
					'width': Math.floor(this._width/4 - 12) + 'px'
				});
				if(startYear + i == this._now.year){
					ace.addClass(item, 'now');
				}
				if(startYear + i == this._selectInfo.year){
					ace.addClass(item, 'current');
				}
				this.$A(item, this._yearMonthListBox);
			}
		}
		
		if(this._selectInfo.type == 'yearpart'){
			showYearLength = 11;
			startYear = Number(this._selectInfo.year.toString().split('').splice(0, 2).join('') + '00');
			this._selectHead.innerHTML = startYear + ' - ' + (startYear + 99);
			yearMerge = Math.ceil(99 / showYearLength);
			
			var sY, eY;
			for(var i = 0, iLen = showYearLength - 1 ; i < iLen ; i ++){
				sY = eY ? (eY + 1) : (startYear + i * yearMerge);
				eY = eY ? eY + yearMerge + 1 : (startYear + (i + 1) * yearMerge);
				
				item = this.$C('div', {'className': 'ace_calendar_selectListItem part', 'data-year': sY + '-' + eY});
				item.innerHTML = sY + ' - ' + eY;
				ace.setStyles(item, {
					'width': Math.floor(this._width/4 - 12) + 'px'
				});
				if(sY <= this._now.year && eY >= this._now.year){
					ace.addClass(item, 'now');
				}
				if(sY <= this._selectInfo.year && eY >= this._selectInfo.year){
					ace.addClass(item, 'current');
				}
				this.$A(item, this._yearMonthListBox);
			}
		}
	},
	
	/**
	 * 选择了年或月或年段
	 */
	_checkSelectYearMonth: function(e){
		if(!e.target.getAttribute('data-year') && !e.target.getAttribute('data-month')){
			return;
		}
		if(this._selectInfo.type == 'yearpart'){
			this._selectInfo.type = 'month';
			this._selectInfo.year = Number(e.target.getAttribute('data-year').split('-')[0]);
			this._fillYearList();
		}else if(this._selectInfo.type == 'year'){
			this._selectInfo.year = Number(e.target.getAttribute('data-year'));
			this._fillSelectMonth();
		}else if(this._selectInfo.type == 'month'){
			this._selectInfo.month = Number(e.target.getAttribute('data-month'));
			
			var me = this;
			this._showYearMonthSelect(false, function(){
				var d = new Date(me._showYear, me._showMonth, 0).valueOf(), 
				nd = new Date(me._selectInfo.year, me._selectInfo.month, 0).valueOf();
				
				if(nd > d){
					if(me._selectInfo.month == 1){
						me._showYear = me._selectInfo.year - 1;
						me._showMonth = 12;
					}else{
						me._showYear = me._selectInfo.year;
						me._showMonth = me._selectInfo.month - 1;
					}
					me._showNextMonth();
				}else{
					if(me._selectInfo.month == 12){
						me._showYear = me._selectInfo.year + 1;
						me._showMonth = 1;
					}else{
						me._showYear = me._selectInfo.year;
						me._showMonth = me._selectInfo.month + 1;
					}
					me._showPreMonth();
				}
			});
		}
	},
	
	/**
	 * 转到今日
	 */
	_turnToday: function(){
		this._tempDate.year = this._now.year;
		this._tempDate.month = this._now.month;
		this._tempDate.date = this._now.date;
		
		if(this._now.year == this._showYear && this._now.month == this._showMonth){
			this._showDateList(this._effectMonthBox, this._showYear, this._showMonth);
			this._showDateList(this._monthBox, this._showYear, this._showMonth);
			
			this.onMonthChange(this._showYear, this._showMonth);
			return;
		}
		
		var me = this,
		d = new Date(me._showYear, me._showMonth, 0).valueOf(), 
		nd = new Date(me._now.year, me._now.month, 0).valueOf();
		
		if(me._tempDate.target.length != 0){
			while(me._tempDate.target.length){
				ace.removeClass(me._tempDate.target.pop(), 'current');
			}
		}
		
		if(nd > d){
			if(me._now.month == 1){
				me._showYear = me._now.year - 1;
				me._showMonth = 12;
			}else{
				me._showYear = me._now.year;
				me._showMonth = me._now.month - 1;
			}
			me._showNextMonth();
		}else{
			if(me._now.month == 12){
				me._showYear = me._now.year + 1;
				me._showMonth = 1;
			}else{
				me._showYear = me._now.year;
				me._showMonth = me._now.month + 1;
			}
			me._showPreMonth();
		}
		
		this.onMonthChange(this._showYear, this._showMonth);
	},
	
	/**
	 * 更新月份数据
	 */
	_updateDate: function(list){
		var pDomList = this._effectMonthBox.getElementsByTagName('div'),
		cDomList = this._monthBox.getElementsByTagName('div');
		
		var year, month, date;
		
		for(var i = 0 ; i < pDomList.length ; i ++){
			var d = pDomList[i].getAttribute('data-date').split('-');
			year = Number(d[0]);
			month = Number(d[1]);
			date = Number(d[2]);
			if(this._checkInDate(list, year, month, date)){
				ace.addClass(pDomList[i], 'hasData');
			}
		}
		for(var i = 0 ; i < cDomList.length ; i ++){
			var d = cDomList[i].getAttribute('data-date').split('-');
			year = Number(d[0]);
			month = Number(d[1]);
			date = Number(d[2]);
			if(this._checkInDate(list, year, month, date)){
				ace.addClass(cDomList[i], 'hasData');
			}
		}
	},
	
	/**
	 * 验证是否在可选列表日期中
	 */
	_checkInDate: function(list, year, month, date){
		var str = this._pattern.replace('yyyy', year)
			.replace('MM', this._toDoubleString(month))
			.replace('M', month)
			.replace('dd', this._toDoubleString(date))
			.replace('d', date);
			
		for(var i = 0 ; i < list.length ; i ++){
			if(list[i] == str){
				return true;
			}
		}
		
		return false;
	},
	
	/**
	 * 选择日期
	 */
	_selectDate: function(year, month, date){
		var info = {
			year: year,
			month: month,
			date: date,
			
			string: this._pattern.replace('yyyy', year)
			.replace('MM', this._toDoubleString(month))
			.replace('M', month)
			.replace('dd', this._toDoubleString(date))
			.replace('d', date)
		};
		this.onSelectData(info);
	},
	
	/**
	 * 对外接口, 给出选择日期, 由调用方覆写
	 */
	onSelectData: function(info){
		console.log(info.string);
	},
	
	/**
	 * 通知外部切换月份, 以获取当月及前后各一个月数据, 做可用标识
	 */
	onMonthChange: function(year, month){
		
	},
	
	/**
	 * 更新数据, 由外部调用
	 */
	updateDate: function(list){
		this._updateDate(list);
	}
}