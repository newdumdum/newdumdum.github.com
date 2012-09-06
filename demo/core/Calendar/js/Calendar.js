/*
* Function  : Calendar Select JavaScript
* Author    : ShiCH
* Date      : 2009-3-16
*/

function Calendar(){
    this.render = null;
    this.caller = null;
    this.singleHeight = 132;
    this.step = 5;
    this.isIE = /msie/i.test(navigator.userAgent);
    this.parten = "yyyy-MM-dd";

    this.moveEnd = true;
}

Array.prototype.CalendarIndex = function(str){
    var curIndex = null;
    for(var i = 0 , iLen = this.length ;i < iLen ; i ++){
        if(this[i] == str){
            curIndex = i;
            break;
        }
    }
    return curIndex;
}

Calendar.prototype.$ = function(id){
    return document.getElementById(id);
}
Calendar.prototype.$C = function(tagName,attrObject){
    var elm = window.document.createElement(tagName);
    if(null != attrObject && typeof(attrObject) == "object"){
          for(var item in attrObject){
              if(item == "innerHTML" || item == "className")
                  elm[item] = attrObject[item];
              else
                  elm.setAttribute(item,attrObject[item]);
          }
    }
    return elm;
}
Calendar.prototype.$A = function(elm,pElm){
    return pElm ? pElm.appendChild(elm) : document.body.appendChild(elm);
}
Calendar.prototype.$R = function(elm,pElm){
    return pElm ? pElm.removeChild(elm) : document.body.removeChild(elm);
}
Calendar.prototype.$T = function(tagName,pElm){
    return pElm ? pElm.getElementsByTagName(tagName) : document.getElementsByTagName(tagName);
}

Calendar.prototype.init = function(oldDate){
    if(null == this.render){
        return;
    }
    if(this.render.tagName.toUpperCase() != "INPUT"){
        alert("The Render Of The Calendar Must Be \"Input\"");
        return;
    }

    this.weekArr = ["S","M","T","W","T","F","S"];
    //this.weekArr = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    this.weekFullArr = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    //this.weekArr = ["日","一","二","三","四","五","六"];
    this.monthArr = ["January","February","March","April","May","June","July","August","September","October","November","Decmber"];
    //this.monthArr = ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];
    
    this.build();
    this.attachEvent();
}

Calendar.prototype.build = function(){
    var year,month,date;
    var oldValue = this.render.value;
    if(oldValue == ""){
        with(new Date()){
            year  = getUTCFullYear();
            month = getMonth() + 1;
            date  = getDate();
        }
    }else{
        var dateStr = this.getDefaultDate(oldValue);
        year = Math.ceil(dateStr.split("-")[0]);
        month = Math.ceil(dateStr.split("-")[1]) + 1;
        date = Math.ceil(dateStr.split("-")[2]);
    }

    this.year = year;
    this.month = month;
    this.date = date;
    this.highMonth = month;
    this.highYear = year;
    
    if(null == this.layer){
        this.layer = this.$C("div",{className:"CalendarBox"});
        this.$A(this.layer,document.body);

        this.head = this.$C("div",{className:"header"});
        this.$A(this.head,this.layer);

        this.body = this.$C("div",{className:"body"});
        this.$A(this.body,this.layer);

        var b1 = this.$C("div");
        var b2 = this.$C("div");
        var b3 = this.$C("div");
        this.$A(b1,this.body);
        this.$A(b2,this.body);
        this.$A(b3,this.body);
        b1.style.height = b2.style.height = b3.style.height = this.singleHeight + "px";
        b1.style.display = b2.style.display = b3.style.display = "block";

        this.bodyArr = [b1,b2,b3];
        
        var rect = this.BoundingRect(this.render);
        this.layer.style.position = "absolute";
        this.layer.style.left = Math.floor(rect.left) + 'px';
        this.layer.style.top = Math.floor(rect.top) + Math.floor(this.render.offsetHeight) + 'px';
        
        with(this.layer){
            oncopy        = function(){selection.empty();}; 
            onbeforecopy  = function(){return false;}; 
            up            = function(){selection.empty();};
            oncontextmenu = function(){return false;}; 
            ondragstart   = function(){return false;}; 
            onselectstart = function(){return false;}; 
            onselect      = function(){selection.empty();};
        }
    }
    this.buildHead();
    this.buildBody(true);
    this.buildSelectLayer();
}

Calendar.prototype.buildHead = function(){
    // Head Start
    if(null == this.showHead){
        var headT = this.$C("div",{className:"headTop"});
        this.$A(headT,this.head);

        var headB = this.$C("div",{className:"headBottom"});
        this.$A(headB,this.head);

        this.pre = this.$C("div",{className:"previewMonthButton"});
        this.$A(this.pre,headT);

        this.showHead = this.$C("div",{className:"headDes"});
        
        var showSelector = this.$C("a",{innerHTML:this.monthArr[this.month-1] + " " + this.year,href:"javascript:void(0);"});
        this.$A(showSelector,this.showHead);
        this.$A(this.showHead,headT);

        this.nxt = this.$C("div",{className:"nextMonthButton"});
        this.$A(this.nxt,headT);

        for(var i=0,iLen=this.weekArr.length;i<iLen;i++){
            var d = this.$C("div",{className:"week",innerHTML:this.weekArr[i],title:this.weekFullArr[i]});
            this.$A(d,headB);
        }
    }else{
        this.showHead.getElementsByTagName("a")[0].innerHTML = this.monthArr[this.month-1] + " " + this.year;;
    }
    // Head End
}

Calendar.prototype.buildBody = function(isNext){
    this.monthTable = this.getData();
    var con = isNext ? this.bodyArr[2] : this.bodyArr[0];
    con.innerHTML = "";

    var theDaysInMonth = new Date(this.year, this.month, 0).getDate();
    for(var i=1;i<7;i++){
        for(var j=0;j<7;j++){
            var backDate = this.starCaTran(this.year,this.month,this.monthTable[i][j]);
            var isHightLight = this.date == this.monthTable[i][j] && this.month == this.highMonth && this.year == this.highYear;
            var div = this.$C("div",{
                className:(this.monthTable[i][j] < 1 || this.monthTable[i][j] > theDaysInMonth) ? "OtherMonthDate" : (isHightLight ? "Today" :"CurMonthDate"),
                innerHTML:backDate.split("-")[2],
                _today:backDate
            });
            if(isHightLight){
                this.selectedDate = div;
                this.oldClass = (this.monthTable[i][j] < 1 || this.monthTable[i][j] > theDaysInMonth) ? "OtherMonthDate" : "CurMonthDate";
            }
            this.$A(div,con);
        }
    }
    this.move(isNext,con);
    //alert(window.clipboardData.setData("text",this.body.outerHTML));
}

Calendar.prototype.getData = function(){
    var year = this.year;
    var month = this.month;

    var aMonth = [];
    for(i=1;i<7;i++)
        aMonth[i] = new Array(i);

    var dCalDate = new Date(year, month-1, 1);
    var iDayOfFirst = dCalDate.getDay();
    var iDaysInMonth = new Date(year, month, 0).getDate();
    var iOffsetLast = new Date(year, month-1, 0).getDate() - iDayOfFirst + 1;
    var iDate = 1;
    var iNext = 1;

    for (d = 0; d < 7; d++)
        aMonth[1][d] = (d < iDayOfFirst)?(-iDayOfFirst + d + 1) : iDate++;
    for (w = 2; w < 7; w++)
        for (d = 0; d < 7; d++)
            aMonth[w][d] = iDate++;
    return aMonth;
}

Calendar.prototype.starCaTran = function(year,month,date){
    var curDate = new Date(year,month-1,date);
    if(curDate.getMonth()+1 == 1 && curDate.getDate() == 1){
        with(curDate)
            return getUTCFullYear() + 1  + "-" +(getMonth()+1) + "-" + getDate();
    }else{
        with(curDate)
            return getUTCFullYear() + "-" +(getMonth()+1) + "-" + getDate();
    }
}

Calendar.prototype.attachEvent = function(){
    var oThis = this;
    this.Event.add(document,'click',function(event){
        var evt = event ? event : window.event;
        var elm = evt.srcElement || evt.target;


        var isLayer = false,pElm = elm,i = 0;
        while(i < 10 && pElm){
            if(pElm == oThis.layer){
                isLayer = true;
                break;
            }else{
                pElm = pElm.parentNode;
            }
            i++;
        }

        if(!isLayer && oThis.caller != elm){
            oThis.dispose();
        }
    });

    this.pre.onclick = function(){
        if(!oThis.moveEnd){
            return;
        }
        oThis.year = Math.floor(oThis.month) - 1 < 1 ? Math.floor(oThis.year - 1) : oThis.year;
        oThis.month = Math.floor(oThis.month) - 1 < 1 ? 12 : Math.floor(oThis.month) - 1;

        oThis.buildHead();
        oThis.buildBody(false);
    }
    this.nxt.onclick = function(){
        if(!oThis.moveEnd){
            return;
        }
        oThis.year = Math.floor(oThis.month) + 1 > 12 ? Math.floor(oThis.year) + 1 : oThis.year;
        oThis.month = Math.floor(oThis.month) + 1 > 12 ? 1 : Math.floor(oThis.month) + 1;

        oThis.buildHead();
        oThis.buildBody(true);
    }

    this.body.onclick = function(event){
        if(!oThis.moveEnd){
            return;
        }
        //alert(window.clipboardData.setData("text",this.outerHTML));
        var evt = event ? event : window.event;
        var obj = evt.srcElement || evt.target;
        var storeDate = obj.getAttribute("_today");
        if(storeDate != null){
            if(null != oThis.selectedDate){                  
                var selectYear = storeDate.split("-")[0];
                var selectMonth = storeDate.split("-")[1];
                if(selectYear != oThis.year || selectMonth != oThis.month){
                    var isNext = Math.floor(oThis.month) < Math.floor(selectMonth) || Math.floor(oThis.year) < Math.floor(selectYear);
                    oThis.year = selectYear;
                    oThis.month = selectMonth;
                    oThis.date = storeDate.split("-")[2];
                    oThis.highMonth = oThis.month;
                    oThis.highYear = oThis.year;
                    oThis.buildHead();
                    oThis.buildBody(isNext);
                }else{
                    oThis.selectedDate.className = oThis.oldClass;
                    oThis.selectedDate = obj;
                    oThis.oldClass = obj.className;
                    obj.className = "Today";
                }
            }
        }

        
        if(storeDate != null){
            oThis.render.value = oThis.formateDate(storeDate);
        }
    }
    
    /*
    this.body.ondblclick = function(event){
        if(!oThis.moveEnd){
            return;
        }
        var evt = event ? event : window.event;
        var obj = evt.srcElement || evt.target;
        var storeDate = obj.getAttribute("_today");
        if(storeDate != null){
            oThis.render.value = oThis.formateDate(storeDate);
            oThis.dispose();
        }
    }
    */

    this.showHead.getElementsByTagName("a")[0].onclick = function(){
        oThis.showYearMonth();
    }

    this.yearAndMonthLayer.onclick = function(event){
        var evt = event ? event : window.event;
        var obj = evt.srcElement || evt.target;
        var type = obj.getAttribute("_type");
        if(type == "ok"){
            var year = this.getAttribute("_selectedYear");
            var month = this.getAttribute("_selectedMonth");
            var needMove = (Math.floor(oThis.month) != Math.floor(month)) || (Math.floor(oThis.year) != Math.floor(year));

            if(needMove){
                var isNext = Math.floor(oThis.month) < Math.floor(month) || Math.floor(oThis.year) < Math.floor(year);
                oThis.year = year;
                oThis.month = Number(month);
                setTimeout(function(){
                    oThis.buildHead();
                    oThis.buildBody(isNext);
                },300);
            }
            oThis.moveMin();
        }
        if(type == "no"){
            oThis.moveMin();
        }
        if(type == "month"){
            var month = obj.getAttribute("_month");
            this.setAttribute("_selectedMonth",Math.floor(month) + 1);

            
            oThis.yearAndMonthLayerM.className = "item";
            obj.className = "itemHighLight";
            oThis.yearAndMonthLayerM = obj;
        }
        if(type == "year"){
            var year = obj.getAttribute("_year");
            this.setAttribute("_selectedYear",year);
            
            oThis.yearAndMonthLayerY.className = "item";
            obj.className = "itemHighLight";
            oThis.yearAndMonthLayerY = obj;
        }
    }
}

Calendar.prototype.move = function(isNext,con){
    var oThis = this;
    this.moveEnd = false;

    var t = Math.floor(this.body.scrollTop);
    if(t < this.singleHeight * 2 && isNext){
        var margin = Math.ceil(Math.abs(t - this.singleHeight * 2)/this.step);
        this.body.scrollTop = t + margin > this.singleHeight * 2 ? this.singleHeight * 2 : t + margin;
        setTimeout(function(){
            oThis.move(isNext,con);
        },10);
    }else if(isNext){
        var firstObj = this.bodyArr[0].cloneNode(true);
        this.$R(this.bodyArr[0],this.body);
        this.$A(firstObj,this.body);

        this.bodyArr.shift();
        this.bodyArr.push(firstObj);
        this.body.scrollTop = this.singleHeight;

        this.moveEnd = true;
    }
    
    if(t > 0 && !isNext){
        var margin = Math.ceil(Math.abs(t - 0)/this.step);
        this.body.scrollTop = t - margin < 0 ? 0 : t - margin;
        setTimeout(function(){
            oThis.move(isNext,con);
        },10);
    }else if(!isNext){
        var lastObj = this.bodyArr[2].cloneNode(true);
        this.$R(this.bodyArr[2],this.body);
        this.isIE ? this.body.insertAdjacentElement("afterBegin",lastObj) : this.body.insertBefore(lastObj,this.body.firstChild);

        this.bodyArr.pop();
        this.bodyArr.unshift(lastObj);
        this.body.scrollTop = this.singleHeight;

        this.moveEnd = true;
    }
}

Calendar.prototype.showYearMonth = function(){
    this.refocusDate();
    this.moveMax();
}

Calendar.prototype.buildSelectLayer = function(){ 
    var oThis = this;
    var oRect = this.BoundingRect(this.layer);
    var rect = this.BoundingRect(this.head);
    var zIndex = Math.floor(this.layer.style.zIndex == null ? 1 : this.layer.style.zIndex) + 1;

    this.yearAndMonthLayer = this.$C("div",{className:"selectLayer"});
    this.yearAndMonthLayer.style.display = "none";

    /*
    with(this.yearAndMonthLayer.style){
        width = this.layer.offsetWidth - 2 + 'px';
        height = "1px";
        position = "absolute";
        left = rect.left - oRect.left - 1 + "px";
        top = rect.top - oRect.top - 1 + "px";
        zIndex = zIndex;
        display = "none";
    }
    */

    this.$A(this.yearAndMonthLayer,this.layer);
    this.addYearAndMonthContent(this.year,this.month);
}

Calendar.prototype.refocusDate = function(){
    this.yearAndMonthLayer.setAttribute("_selectedYear",this.year);
    this.yearAndMonthLayer.setAttribute("_selectedMonth",this.month);
    var oThis = this;
    var divs = this.yearAndMonthLayer.getElementsByTagName("div");
    for(var i=0,iLen=divs.length;i<iLen;i++){
        var curDiv = divs[i];
        var year = curDiv.getAttribute("_year");
        var month = curDiv.getAttribute("_month");
        if(year != null){
            if(year == this.year){
                oThis.yearAndMonthLayerY = curDiv;
                curDiv.className = "itemHighLight";
                var tmpYearDiv = curDiv;
                setTimeout(function(){
                    oThis.moveSelectLayerTop(tmpYearDiv);
                },300);
            }else{
                curDiv.className = "item";
            }
        }
        if(month != null){
            if(month == this.month-1){
                oThis.yearAndMonthLayerM = curDiv;
                curDiv.className = "itemHighLight";
                var tmpMonthDiv = curDiv;
                setTimeout(function(){
                    oThis.moveSelectLayerTop(tmpMonthDiv);
                },300);
            }else{
                curDiv.className = "item";
            }
        }
    }
}

Calendar.prototype.BoundingRect = function(el){
		var ua = navigator.userAgent.toLowerCase();
		var parent = null;
		var pos = [];
		var box;
		if (el.getBoundingClientRect){ //ie
			box = el.getBoundingClientRect();
			var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
			var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
			return {
				left: box.left + scrollLeft,
				top: box.top + scrollTop
			};
		}else if (document.getBoxObjectFor){ // gecko
			box = document.getBoxObjectFor(el);
			var borderLeft = (el.style.borderLeftWidth) ? parseInt(el.style.borderLeftWidth) : 0;
			var borderTop = (el.style.borderTopWidth) ? parseInt(el.style.borderTopWidth) : 0;
			pos = [box.x - borderLeft, box.y - borderTop];
		}else{ // safari & opera    
			pos = [el.offsetLeft, el.offsetTop];
			parent = el.offsetParent;
			if (parent != el) {
				while (parent) {
					pos[0] += parent.offsetLeft;
					pos[1] += parent.offsetTop;
					parent = parent.offsetParent;
				}
			}
			if (/opera/.test(ua) || (/safari/.test(ua) && el.style.position == 'absolute')) {
				pos[0] -= document.body.offsetLeft;
				pos[1] -= document.body.offsetTop;
			}
		}

		el.parentNode ? parent = el.parentNode : parent = null;

		while (parent && parent.tagName.toUpperCase() != 'BODY' && parent.tagName.toUpperCase() != 'HTML') { // account for any scrolled ancestors   
			pos[0] -= parent.scrollLeft;
			pos[1] -= parent.scrollTop;
			parent.parentNode ? parent = parent.parentNode : parent = null;
		}
		return {
			left: pos[0],
			top: pos[1]
		}	
}

Calendar.prototype.dispose = function(){
    if(null != this.layer){
        this.$R(this.layer);
        this.layer = null;
        this.showHead = null;
    }
}

Calendar.prototype.addYearAndMonthContent = function(year,month){
    this.yearAndMonthLayer.innerHTML = "";
    this.yearAndMonthLayer.setAttribute("_selectedYear",year);
    this.yearAndMonthLayer.setAttribute("_selectedMonth",month);

    var lDiv = this.$C("div",{className:"selectLayerLeft"});
    this.$A(lDiv,this.yearAndMonthLayer);

    for(var i=0,iLen=this.monthArr.length;i<iLen;i++){
        var div = this.$C("div",{
            innerHTML:this.monthArr[i],
            _month:i,
            _type:"month",
            className:i == month ? "itemHighLight" : "item"
        });
        this.$A(div,lDiv);
    }

    var rDiv = this.$C("div",{className:"selectLayerRight"});
    this.$A(rDiv,this.yearAndMonthLayer);
    var startYear = year < 1949 ? year : 1949;
    for(var i=startYear,iLen=Math.floor(year)+10;i<iLen;i++){
        var div = this.$C("div",{
            className:i == year ? "itemHighLight" : "item",
            innerHTML:i,
            _year:i,
            _type:"year"
        });
        this.$A(div,rDiv);
    }

    var bDiv = this.$C("div",{className:"selectLayerBottom"});
    this.$A(bDiv,this.yearAndMonthLayer);

    selectLayerOK = this.$C("div",{
        className:"selectLayerBT",
        innerHTML:"ok",
        _type:"ok"
    });
    this.$A(selectLayerOK,bDiv);

    selectLayerNO = this.$C("div",{
        className:"selectLayerBT",
        innerHTML:"cancle",
        _type:"no"
    });
    this.$A(selectLayerNO,bDiv);
}

Calendar.prototype.moveMax = function(){
    var oThis = this;
    this.yearAndMonthLayer.style.display = "";
    var h = Math.floor(this.yearAndMonthLayer.offsetHeight);
    if(h < this.layer.offsetHeight){
        var margin = Math.ceil(Math.abs(h - this.layer.offsetHeight)/this.step);
        this.yearAndMonthLayer.style.height = h + margin + "px";
        this.yearAndMonthLayer.scrollTop = h;
        setTimeout(function(){
            oThis.moveMax();
        },10)
    }else{
        this.yearAndMonthLayer.scrollTop = 0;
        this.yearAndMonthLayer.style.height = this.layer.offsetHeight + "px";
    }
}

Calendar.prototype.moveMin = function(){
    var oThis = this;
    this.yearAndMonthLayer.style.display = "";
    var h = Math.floor(this.yearAndMonthLayer.offsetHeight);
    var margin = Math.ceil(Math.abs(h - 0)/this.step);
    var oH = 8;
    if(h - margin > oH){
        this.yearAndMonthLayer.style.height = h - margin + "px";
        this.yearAndMonthLayer.scrollTop = h - margin;
        setTimeout(function(){
            oThis.moveMin();
        },10)
    }else{
        this.yearAndMonthLayer.scrollTop = this.layer.offsetHeight;
        this.yearAndMonthLayer.style.height = "1px";
        this.yearAndMonthLayer.style.display = "none";
    }
}

Calendar.prototype.moveSelectLayerTop = function(elm){
    var oThis = this;
    var t = Math.floor(elm.parentNode.scrollTop);
    var et = Math.floor(elm.offsetTop);
    var oh = Math.floor(elm.parentNode.offsetHeight);
    var os = Math.floor(elm.parentNode.scrollHeight);
    if(t < et && os - t > oh){
        var margin = Math.ceil(Math.abs(t - et)/this.step);
        elm.parentNode.scrollTop = t + margin;
        setTimeout(function(){
            oThis.moveSelectLayerTop(elm);
        },10);
    }else{
        elm.parentNode.scrollTop = et;
    }
}

Calendar.prototype.formateDate = function(dateStr){
    var dateArr = dateStr.split("-");
    var year = Number(dateArr[0]);
    var month = Number(dateArr[1]);
    var date = Number(dateArr[2]);

    month = month < 10 ? "0" + month : month;
    date = date < 10 ? "0" + date : date;

    return this.parten.replace(/yyyy/ig,year).replace(/MM/ig,month).replace(/dd/ig,date);
}

Calendar.prototype.getDefaultDate = function(dateStr){
    var year = dateStr.substring(this.parten.indexOf("yyyy"),this.parten.lastIndexOf("yyyy")+4);
    var month = dateStr.substring(this.parten.indexOf("MM"),this.parten.lastIndexOf("MM")+2);
    var date = dateStr.substring(this.parten.indexOf("dd"),this.parten.lastIndexOf("dd")+2);
    
    var nDate = new Date(year,Math.floor(month) - 1,Math.floor(date));
    if(isNaN(nDate)){
        nDate = new Date();
    }
    return nDate.getUTCFullYear() + "-" + nDate.getMonth() + "-" + nDate.getDate();
}

Calendar.prototype.Event = {
    add : function(oTarget, sEventType, fnHandler){
        if (oTarget.addEventListener) {
            oTarget.addEventListener(sEventType, fnHandler, false);
        }
        else if (oTarget.attachEvent) {
            oTarget.attachEvent("on" + sEventType, fnHandler);
        }
        else {
            oTarget["on" + sEventType] = fnHandler;
        }
    },

    remove : function(oTarget, sEventType, fnHandler){
        if (oTarget.removeEventListener) {
            oTarget.removeEventListener(sEventType, fnHandler, false);
        }
        else if (oTarget.detachEvent) {
            oTarget.detachEvent("on" + sEventType, fnHandler);
        }
        else {
            oTarget["on" + sEventType] = null;
        }
    }
}