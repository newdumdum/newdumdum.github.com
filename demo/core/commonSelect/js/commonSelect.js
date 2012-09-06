/*
* ¹«ÓÃselectÌæ»»
* ShiCH
* 2008-9-24
*/

function commonSelect(){
    this.container = null;
    this.data = null;
    this.isIE = /msie/i.test(navigator.userAgent);
    this.maxWidth = null;
    this.layerMaxHeight = 146;
    this.layerRelHeight = 0;
    this.singleRowHeight = 16.5;
    this.type = 1;
    this.css = 1;
}

commonSelect.prototype.$ = function(id){
    return document.getElementById(id);
}
commonSelect.prototype.$C = function(tagName,attrObject){
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
commonSelect.prototype.$A = function(elm,pElm){
    return pElm ? pElm.appendChild(elm) : document.body.appendChild(elm);
}
commonSelect.prototype.$R = function(elm,pElm){
    return pElm ? pElm.removeChild(elm) : document.body.removeChild(elm);
}

String.prototype.commonSelectRealLength = function(){
    var str = this;
    try{
        var reg = /[^\x00-\xff]/g;
        return str.replace(reg,"xx").length;
    }catch(e){
        return str.length;
    }
}

commonSelect.prototype.init = function(){
    this.GetMaxWidth();
    this.FillContent();
    this.AddCommand();
}

commonSelect.prototype.FillContent = function(){
    var css;
    switch(this.css){
        case 1:
            css = "commonSelect";
            break;
        case 2:
            css = "commonSelect_blue";
            break;
    }
    this.container.className = css;
    this.container.style.width = (this.type == 1 ? this.maxWidth + 32 : this.maxWidth) + "px";

    var inDiv = this.$C("div",{className:"commonSelectInDiv"});
    this.$A(inDiv,this.container);

    var html = [];
    html[html.length] = "<table cellSpacing='0' cellPadding='0'>";
    html[html.length] = " <tr>";
    html[html.length] = "   <td></td>";
    html[html.length] = "   <td></td>";
    html[html.length] = "   <td></td>";
    html[html.length] = " </tr>";
    html[html.length] = "</table>";
    inDiv.innerHTML = html.join("");
    
    if(this.type == 1){
        var leftBT = this.$C("div",{className:"commonSelectLeftBT",innerHTML:"&nbsp;"});
        this.$A(leftBT,this.container.getElementsByTagName("td")[0]);
        this.leftBT = leftBT;
    }

    var contentDiv = this.$C("div",{className:"commonSelectContentDiv"});
    contentDiv.style.width = this.maxWidth + "px";
    this.$A(contentDiv,this.container.getElementsByTagName("td")[1]);
    this.contentDiv = contentDiv;

    if(this.type == 1){
        var rightBT = this.$C("div",{className:"commonSelectRightBT",innerHTML:"&nbsp;"});
        this.$A(rightBT,this.container.getElementsByTagName("td")[2]);
        this.rightBT = rightBT;
    }

    this.AdapterContentAndLayerDiv();
}

commonSelect.prototype.AdapterContentAndLayerDiv = function(){
    if(this.data == null){
        this.contentDiv.innerHTML = "";
        return;
    }

    var layer = this.$C("div",{className:"commonSelectLayer"});
    layer.style.display = "none";
    layer.style.width = this.maxWidth + "px";
    this.$A(layer,this.container);
    this.layer = layer;   

    var moveDiv = this.$C("div",{className:"commonSelectMoveDiv"});
    this.$A(moveDiv,this.contentDiv);
    this.moveDiv = moveDiv;   

    var count = 0;
    this.count = 0;
    this.maxCount = 0;

    var defValue,defText;
    if(this.data.indexOf(";") != -1){
        this.maxCount = this.data.split(";").length - 1;
        for(var i=0,iLen=this.data.split(";").length;i<iLen;i++){
            var curOption = this.data.split(";")[i];
            var text = curOption.split("|")[0];
            var value = curOption.split("|")[1];

            if(i == 0){
                defValue = value;
                defText = text;
            }

            var layerOption = this.$C("div",{className:"commonSelectLayerOption",value:value,_count:count,innerHTML:text});
            this.$A(layerOption,this.layer);
            layerOption.style.width = (this.isIE ? this.maxWidth : this.maxWidth - 20) + "px";

            var moveOption = this.$C("div",{className:"commonSelectMoveOption",value:value,_count:count,innerHTML:text});
            this.$A(moveOption,this.moveDiv);
            moveOption.style.width = (this.isIE ? this.maxWidth : this.maxWidth - 3) + "px";

            count ++;

            this.AddOptionCommand(layerOption);
        }
    }else{
        var text = this.data.split("|")[0];
        var value = this.data.split("|")[1];

        var moveOption = this.$C("span",{className:"commonSelectLayerOption",value:value,_count:count,innerHTML:text});
        this.$A(moveOption,this.moveDiv);

        defValue = value;
        defText = text;
    }

    this.value = defValue;
    this.text = defText;
    
    moveDiv.style.width = this.maxWidth * (this.maxCount + 1) + "px";
    this.MakeLayerSize();
}

commonSelect.prototype.AddOptionCommand = function(obj){
    var oThis = this;
    obj.onmouseover = function(){
        if(this.className != "commonSelectLayerOption_check"){
            this.className = "commonSelectLayerOption_over";
        }
    }
    obj.onmouseout = function(){
        if(this.className != "commonSelectLayerOption_check"){
            this.className = "commonSelectLayerOption";
        }
    }
    obj.onclick = function(){
        oThis.layer.style.display = "none";
        var count = this.getAttribute("_count");
        oThis.moveTo(count);
        oThis.OptionsFocus(count);
    }
}

commonSelect.prototype.OptionsFocus = function(count){
    var divs = this.layer.getElementsByTagName("div");

    var showDiv = null;
    for(var i=0,iLen=divs.length;i<iLen;i++){
        var curDiv = divs[i];
        curDiv.className = "commonSelectLayerOption";
        if(curDiv.getAttribute("_count") == count){
            curDiv.className = "commonSelectLayerOption_check";
        }
    }
}

commonSelect.prototype.AddCommand = function(){
    var oThis = this;
    if(this.type == 1){
        this.leftBT.onmouseover = function(){
            this.className = "commonSelectLeftBT_over";
        }
        this.leftBT.onmouseout = function(){
            this.className = "commonSelectLeftBT";
        }
        this.leftBT.onclick = function(){
            var count = oThis.count - 1 <= 0 ? 0 : oThis.count - 1;
            oThis.moveTo(count);
            //alert(window.clipboardData.setData("text",oThis.container.outerHTML));
        }

        this.rightBT.onmouseover = function(){
            this.className = "commonSelectRightBT_over";
        }
        this.rightBT.onmouseout = function(){
            this.className = "commonSelectRightBT";
        }
        this.rightBT.onclick = function(){
            var count = oThis.count + 1 >= oThis.maxCount ? oThis.maxCount : oThis.count + 1;
            oThis.moveTo(count);
        }
    }

    this.contentDiv.onclick = function(){
        var rect = oThis.BoundingRect(oThis.contentDiv);
        var oH = Math.floor(oThis.contentDiv.offsetHeight);
        oThis.OptionsFocus(oThis.count);

        var oLeft = rect.left;
        var oTop = rect.top + oH - 1;
        var isBottom = oTop + Math.floor(oThis.layerRelHeight) >= document.body.clientHeight + Math.max(document.documentElement.scrollTop,document.body.scrollTop);
        oTop = isBottom ? rect.top - oThis.layerRelHeight - 1 : oTop;
        with(oThis.layer.style){
            display = "";
            position = "absolute";
            left = oLeft + "px";
            top = oTop + "px";
            zIndex = oThis.GetMaxZIndex() + 1;
        }
    }
    this.contentDiv.onmouseover = function(){
        this.setAttribute("_overed","true");
    }
    this.contentDiv.onmouseout = function(){
        this.setAttribute("_overed","false");
        setTimeout(function(){oThis.CheckLayerShow();},300);
    }

    this.layer.onmouseover = function(){
        this.setAttribute("_overed","true");
    }
    this.layer.onmouseout = function(){
        this.setAttribute("_overed","false");
        setTimeout(function(){oThis.CheckLayerShow();},300);
    }
}

commonSelect.prototype.moveTo = function(count){
    var divs = this.moveDiv.getElementsByTagName("div");

    var showDiv = null;
    var has = false;
    for(var i=0,iLen=divs.length;i<iLen;i++){
        var curDiv = divs[i];
        if(curDiv.getAttribute("_count") == count){
            showDiv = curDiv;
            has = true;
            break;
        }
    }

    var moveValue = count * this.maxWidth;
    this.SmoothMoveItem(this.contentDiv.scrollLeft,moveValue);
  
    if(this.count != count){
        this.value = showDiv.getAttribute("value");
        this.text = showDiv.innerText;

        this.onchange();
    }

    if(has){
        this.count = count;
    }
}

commonSelect.prototype.GetMaxWidth = function(){
    var maxW = 0;
    var iLen = 0;
    if(this.data.indexOf(";") != -1){
        iLen=this.data.split(";").length
        for(var i=0;i<iLen;i++){
            var curOption = this.data.split(";")[i];
            var text = curOption.split("|")[0];

            var div = this.$C("div",{innerHTML:text});
            div.style.display = "inline";
            div.style.whiteSpace = "noWrap";
            div.style.visibility = "hidden";
            this.$A(div);
            var curW = Math.floor(div.offsetWidth);
            this.$R(div);

            maxW = maxW <= curW ? curW : maxW;
        }
    }else{
        var text = this.data.split("|")[0];

        var div = this.$C("div",{innerHTML:text});
        div.style.display = "inline";
        div.style.whiteSpace = "noWrap";
        div.style.visibility = "hidden";
        this.$A(div);
        var curW = Math.floor(div.offsetWidth);
        this.$R(div);

        maxW = maxW <= curW ? curW : maxW;
    }
    this.maxWidth = iLen > 9 ? maxW + 22 : maxW + 6;
}

commonSelect.prototype.MakeLayerSize = function(){
    if((this.maxCount + 1) * this.singleRowHeight <= this.layerMaxHeight){
        this.layerRelHeight = (this.maxCount + 1) * this.singleRowHeight;
        this.layer.style.height = (this.maxCount + 1) * this.singleRowHeight + "px";
    }else{
        this.layer.style.height = this.layerMaxHeight + "px";
        this.layerRelHeight = this.layerMaxHeight;
    }
}

commonSelect.prototype.GetMaxZIndex = function(){
      var rIndex = 0;
      var divs = document.getElementsByTagName("div");
      for(var i=0,iLen=divs.length;i<iLen;i++){
          var div = divs[i];
          if(div.isTempLayer != "true"){
              var index = div.style.zIndex;
              if(null == index || "" == index){
                  index = 1;
              }
              rIndex = rIndex < index ? index : rIndex;
          }
      }
      return rIndex;
}

commonSelect.prototype.SmoothMoveItem = function(oValue,value){
    var oThis = this;
    var step = (Math.abs(oValue - value) / this.maxWidth ) * 25;

    if(this.contentDiv.scrollLeft < value){
        this.contentDiv.scrollLeft += step;
        if(this.contentDiv.scrollLeft > value){
            this.contentDiv.scrollLeft = value;
        }
        setTimeout(function(){oThis.SmoothMoveItem(oValue,value);},10);
    }else if(this.contentDiv.scrollLeft > value){
        this.contentDiv.scrollLeft -= step;
        if(this.contentDiv.scrollLeft < value){
            this.contentDiv.scrollLeft = value;
        }
        setTimeout(function(){oThis.SmoothMoveItem(oValue,value);},10);
    }
}

commonSelect.prototype.BoundingRect = function(el){
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

commonSelect.prototype.CheckLayerShow = function(){
    if(!(this.layer.getAttribute("_overed") == "true" || this.contentDiv.getAttribute("_overed") == "true")){
        this.layer.style.display = "none";
    }
}

commonSelect.prototype.onchange = function(){
}