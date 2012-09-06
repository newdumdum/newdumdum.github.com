  /*
  * 功  能: 可伸缩侧边栏 
  * 作  者: IRD ShiCH
  * 日  期: 2009-3-3
  */
  function SiderBar(){
      this.container = null;
      this.width = 200;

      this.minWidth = 21;
      this.isIE = /msie/gi.test(navigator.userAgent);
      this.moveMarge = this.isIE ? 2 : 3;
  }

  SiderBar.prototype.$ = function(id){
      return document.getElementById(id);
  }
  SiderBar.prototype.$C = function(tagName,attrObject){
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
  SiderBar.prototype.$A = function(elm,pElm){
      return pElm ? pElm.appendChild(elm) : document.body.appendChild(elm);
  }
  SiderBar.prototype.$R = function(elm,pElm){
      return pElm ? pElm.removeChild(elm) : document.body.removeChild(elm);
  }
  SiderBar.prototype.addEvent = function(obj,type,handler,preventDefault){
      if(window.attachEvent){
          obj.attachEvent("on"+type,function(){handler();});
      }else{
          obj.addEventListener(type,function(){handler();},preventDefault == null ? false : preventDefault);
      }
  }

  SiderBar.prototype.init = function(){
      if(null == this.container){
          alert("siderBar 初始错误。未指定容器");
          return;
      }
      this.container.style.position = "relative";

      this.prepareData();
      this.addButton();
      this.checkWidthAndHeight();
      this.active();

      var oThis = this;
      this.addEvent(window,"resize",function(){oThis.checkWidthAndHeight();});
      //window.attachEvent("onresize",function(){oThis.checkWidthAndHeight();});

      this.onload();
  }

  SiderBar.prototype.prepareData = function(){
      this.container.className = "siderBar";
      this.container.style.width = this.width + "px";

      this.bar = null;
      this.barButton = null;
      this.item = {};
      this.item.base = [];
      this.item.title = [];
      this.item.content = [];
      this.item.button = [];

      this.hideLayer = this.$C("div",{className:"hideLayer"});
      this.$A(this.hideLayer,this.container);
      this.hideLayer.style.display = "none";

      var divs = this.container.getElementsByTagName("div");
      
      for(var i=0,iLen=divs.length;i<iLen;i++){
          var curItem = divs[i];
          if(curItem.className.toUpperCase() == "BAR"){
              this.bar = curItem;
          }
          if(curItem.className.toUpperCase() == "TEAM"){
              this.item.base[this.item.base.length] = curItem;
              var cDivs = curItem.getElementsByTagName("div");
              for(var j=0,jLen=cDivs.length;j<jLen;j++){
                  var newItem = cDivs[j];
                  if(newItem.className.toUpperCase() == "TITLE"){
                      this.item.title[this.item.title.length] = newItem;
                  }
                  if(newItem.className.toUpperCase() == "CONTENT"){
                      this.item.content[this.item.content.length] = newItem;
                  }
              }
          }
      }
  }
  
  SiderBar.prototype.addButton = function(){
      var bt = this.$C("div",{className:"barBT"});
      this.$A(bt,this.bar);
      this.barButton = bt;

      for(var i=0,iLen=this.item.title.length;i<iLen;i++){
          var curTitleDiv = this.item.title[i];
          var tDiv = this.$C("div",{className:"teamTitle",innerHTML:curTitleDiv.innerHTML});
          var btDiv = this.$C("div",{className:i == 0 ? "teamBT_Expand" : "teamBT"});

          curTitleDiv.innerHTML = "";
          this.$A(btDiv,curTitleDiv);
          this.$A(tDiv,curTitleDiv);
          this.item.button[this.item.button.length] = btDiv;
      }
  }

  SiderBar.prototype.checkWidthAndHeight = function(){
      var contentHeight = this.container.clientHeight - this.bar.clientHeight - 22  * this.item.title.length;// - (this.isIE ? 0 : 1 * this.item.title.length);
      for(var i=0,iLen=this.item.content.length;i<iLen;i++){
          var curItem = this.item.content[i];
          curItem.style.height = contentHeight + "px";
          curItem.style.width = this.width + "px";
      }

      for(var j=0,jLen=this.item.title.length;j<jLen;j++){
          var curItem = this.item.title[j];
          curItem.style.width = this.width + "px";
      }
  }

  SiderBar.prototype.active = function(){
      var oThis = this;
      this.closed = false;
      this.barButton.onmouseover = function(){
          this.style.backgroundPositionX = "-15px";
      }
      this.barButton.onmouseout = function(){
          this.style.backgroundPositionX = "0px";
      }
      this.barButton.onclick = function(){
          oThis.resize();
      }

      for(var i=0,iLen=this.item.button.length;i<iLen;i++){
          var curBT = this.item.button[i];
          curBT.setAttribute("_order",i);
          curBT.onmouseover = function(){
              this.style.backgroundPositionX = "-15px";
          }
          curBT.onmouseout = function(){
              this.style.backgroundPositionX = "0px";
          }
          curBT.parentNode.onclick = function(){
              var order = this.getElementsByTagName("div")[0].getAttribute("_order");
              oThis.moveItem(order);
          }
          
          with(curBT.parentNode){
              oncopy        = function(){selection.empty();}; 
              onbeforecopy  = function(){return false;}; 
              up            = function(){selection.empty();};
              oncontextmenu = function(){return false;}; 
              ondragstart   = function(){return false;}; 
              onselectstart = function(){return false;}; 
              onselect      = function(){selection.empty();};
          }
      }
      for(var j=0,jLen=this.item.content.length;j<jLen;j++){
          var curItem = this.item.content[j];
          if(curItem.style.display != "none" && j != 0){
              curItem.style.display = "none";
          }else{
              curItem.style.display = "";
          }
      }

      this.openItem = 0;
  }

  SiderBar.prototype.resize = function(){
      var rect = this.BoundingRect(this.container);
      
      this.container.style.position = "absolute";
      this.container.style.left = rect.left;
      this.container.style.top = rect.top;

      if(this.closed){
          this.hideHideLayer();
          this.toMaxSize();
          this.closed = false;
      }else{
          this.toMinSize();
          this.closed = true;
          //this.container.parentNode.style.width = this.minWidth;
      }
  }

  SiderBar.prototype.toMaxSize = function(width){
      var oThis = this;
      if(width == null){
          width = this.minWidth;
      }
      var curWidth = this.container.clientWidth;
      var marge = Math.floor(Math.abs(this.width - curWidth)/this.moveMarge) + 1;
      if(width < this.width){
          width = width + marge;
          if(width < this.width){
              this.container.style.width = width + "px";
              setTimeout(function(){
                  oThis.toMaxSize(width);
              },10);
          }else{
              this.container.style.width = this.width + "px";
              this.barButton.className = "barBT";
              setTimeout(function(){
                  oThis.container.style.position = "relative";
                  oThis.container.style.left = '0px';
                  oThis.container.style.top = '0px';
                  oThis.resizeEnd();
              },100);
          }
      }else{
          this.barButton.className = "barBT";
          setTimeout(function(){
              oThis.container.style.position = "relative";
              oThis.container.style.left = '0px';
              oThis.container.style.top = '0px';
              oThis.resizeEnd();
          },100);
      }
  }

  SiderBar.prototype.toMinSize = function(width){
      var oThis = this;
      if(width == null){
          width = this.width;
      }
      var curWidth = this.container.clientWidth;
      var marge = Math.floor(Math.abs(curWidth - this.minWidth)/this.moveMarge) + 1;
      if(width > this.minWidth){
          width = width - marge;
          if(width > this.minWidth){
              this.container.style.width = width + "px";
              setTimeout(function(){
                  oThis.toMinSize(width);
              },10);
          }else{
              this.showHideLayer();
              this.container.style.width = this.minWidth + "px";
              this.barButton.className = "barBT_Expand";
              setTimeout(function(){
                  oThis.container.style.position = "relative";
                  oThis.container.style.left = '0px';
                  oThis.container.style.top = '0px';
                  oThis.resizeEnd();
              },100);
          }
      }else{
          this.showHideLayer();
          this.container.style.width = this.minWidth + "px";
          this.barButton.className = "barBT_Expand";
          setTimeout(function(){
              oThis.container.style.position = "relative";
              oThis.container.style.left = '0px';
              oThis.container.style.top = '0px';
              oThis.resizeEnd();
          },100);
      }
  }

  SiderBar.prototype.moveItem = function(x){
      if(x == this.openItem){
          this.close(x);
          this.openItem = null;
      }else if(null != this.openItem){
          this.open(x);
          this.close(this.openItem);
          this.openItem = x;
      }else{
          this.open(x);
          this.openItem = x;
      }
  }

  SiderBar.prototype.open = function(x){
      var bt = this.item.button[x];
      bt.className = "teamBT_Expand";
      var content = this.item.content[x];
      content.style.display = "";
  }

  SiderBar.prototype.close = function(x){
      var bt = this.item.button[x];
      bt.className = "teamBT";
      var content = this.item.content[x];
      content.style.display = "none";
  }

  SiderBar.prototype.showHideLayer = function(){
      this.hideLayer.style.display = "";
      this.hideLayer.style.width = this.minWidth + "px";
      this.hideLayer.style.height = this.container.clientHeight - 20 + "px";
      this.hideLayer.style.position = "absolute";      
      this.hideLayer.style.left = 0 + "px";
      this.hideLayer.style.top = 20 + "px";

      this.bar.style.backgroundPosition = "0px 50px";
  }

  SiderBar.prototype.BoundingRect = function(el){
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

  SiderBar.prototype.hideHideLayer = function(){
      this.hideLayer.style.display = "none";
      this.bar.style.backgroundPosition = "0px 0px";
  }

  SiderBar.prototype.resizeEnd = function(){
  }
  SiderBar.prototype.onload = function(){
  }