   /*
   * Description : Build Pic Move Layer And Give Resizing effect,move effect and so on.
   * Run Condition : IE,Mozilla 3.0,Safari...
   * Author : ShiCH IRD
   * Date : 2008-9-16
   */

  function DragLayer(){
      this.container    = null;
      this.containerID  = null;
      this.maxWidth     = 400;
      this.color        = "";
      this.clear        = true;
      this.title        = "";
      this.html         = null;
      this.allowDrag    = true;
      this.isSwap       = false;

      this.canMove      = true;
      this.isIE         = true;
      this.defaultX     = 0;
      this.defaultY     = 0;
      this.step         = 8;
      this.depth        = 0;
      this.CheckBrowser();
  }

  DragLayer.prototype.$ = function(id){
      return document.getElementById(id);
  }
  DragLayer.prototype.$C = function(tagName,attrObject){
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
  DragLayer.prototype.$A = function(elm,pElm){
      return pElm ? pElm.appendChild(elm) : document.body.appendChild(elm);
  }
  DragLayer.prototype.$R = function(elm,pElm){
      return pElm ? pElm.removeChild(elm) : document.body.removeChild(elm);
  }

  DragLayer.prototype.init = function(posX,posY,posSX,posSY){
      this.borderMargin = 0;
      if(this.container != null){
          this.containerID = this.container.id;
          this.loadHTML = false;
      }else if(this.containerID != null){
          this.loadHTML = true;
      }else{
          _alert("DrayLayer未指定源");
          return;
      }
      this.FillContent();
      //this.ActiveMoveCommand();
      this.ActiveDragCommand();

      if(null != posX && null != posY){
          this.defaultX = posX;
          this.defaultY = posY;
          this.InitLayerPosition(posX,posY,posSX,posSY);
      }
  }

  DragLayer.prototype.CheckBrowser = function(){
      var ua = navigator.userAgent.toUpperCase();
      this.isIE = /msie/i.test(ua);
  }

  DragLayer.prototype.ActiveDragCommand = function(){
      var oThis = this;
      var barDiv = this.$("barDiv_"+this.containerID);

      barDiv.onmousedown = function(evt){
          if(!(oThis.canMove) || !oThis.allowDrag){return;};
          var goBt = oThis.$("goBT_"+oThis.containerID);
          var gRect = oThis.BoundingRect(goBt);
          var gWidth = Math.floor(goBt.offsetWidth);
          var gHeight = Math.floor(goBt.offsetHeight);
          // 禁止有按钮的地方拖动
          evt = evt ? evt : window.event;
          if(evt.clientX >= gRect.left && evt.clientX <= (gRect.left + gWidth) && evt.clientY >= gRect.top && evt.clientY <= (gRect.top + gHeight)){return;};
          var mainDiv = oThis.$("moveContentsDiv_"+oThis.containerID);
          var moveDiv = oThis.$("moveDiv_"+oThis.containerID);
          var __SCROLLX = Math.floor(Math.max(document.documentElement.scrollLeft,document.body.scrollLeft));
          var __SCROLLY = Math.floor(Math.max(document.documentElement.scrollTop,document.body.scrollTop));
          if(null == moveDiv){
              moveDiv = oThis.$C("div",{id:"moveDiv_"+oThis.containerID,isTempLayer:"true"});
              oThis.$A(moveDiv);
          }
          var Rect = oThis.BoundingRect(mainDiv);

          moveDiv.style.display = "";
          moveDiv.style.position = "absolute";
          moveDiv.style.width = oThis.isIE ? mainDiv.offsetWidth : mainDiv.offsetWidth - 1;
          moveDiv.style.height = oThis.isIE ? mainDiv.offsetHeight : mainDiv.offsetHeight - 1
          moveDiv.style.border = "1px dotted #000000";
          moveDiv.style.backgroundColor = "#EEE";
          moveDiv.style.zIndex = oThis.GetMaxIndexOfLayer() + 1;
          moveDiv.style.left = Rect.left + __SCROLLX - oThis.borderMargin;
          moveDiv.style.top = Rect.top + __SCROLLY - oThis.borderMargin;

          // Mozilla浏览器不支持filter这种写法,所以用样式控制 
          moveDiv.className = "DragLayerFilterDiv";
          moveDiv.style.opacity = "0.5";

          oThis.__ABSLEFT = Math.abs(Rect.left - evt.clientX);
          oThis.__ABSTOP = Math.abs(Rect.top - evt.clientY);
          oThis.__DROG = true;

          var inConDiv = oThis.$("inConDiv_"+oThis.containerID);
          var cElm = inConDiv.firstChild;
          if(null != cElm){
              try{
                  cElm.style.visibility = "hidden";
              }catch(e){}
          }

          if(oThis.isIE){
              this.setCapture();
          }else{
              window.document.addEventListener("mousemove",thisMove=function(evt){oThis.moveResizeDiv(evt);},false);
              window.document.addEventListener("mouseup",thisUp=function(evt){oThis.stopResizeDiv(evt);},false);
              evt.preventDefault();
          }
      }
      
      if(this.isIE){
          barDiv.onmousemove = function(evt){
              oThis.moveResizeDiv(evt);
          }
          barDiv.onmouseup = function(){
              this.releaseCapture();
              oThis.stopResizeDiv();
          }
      }
  }

  DragLayer.prototype.moveResizeDiv = function(evt){
      var oThis = this;
      evt = evt ? evt : window.event;
      if(oThis.__DROG){
          var __SCROLLX = Math.floor(Math.max(document.documentElement.scrollLeft,document.body.scrollLeft));
          var __SCROLLY = Math.floor(Math.max(document.documentElement.scrollTop,document.body.scrollTop));
          var oLeft = evt.clientX + __SCROLLX - oThis.__ABSLEFT - this.borderMargin <= 0 ? 0 : evt.clientX + __SCROLLX - oThis.__ABSLEFT - this.borderMargin;
          var oTop = evt.clientY + __SCROLLY - oThis.__ABSTOP - this.borderMargin <= 0 ? 0 : evt.clientY + __SCROLLY - oThis.__ABSTOP - this.borderMargin;
          setTimeout(function(){oThis.GoAndMove(oLeft,oTop);},60);
      }

  }
  
  DragLayer.prototype.GoAndMove = function(oLeft,oTop){
      var moveDiv = this.$("moveDiv_"+this.containerID);
      var mainDiv = this.$("moveContentsDiv_"+this.containerID);

      moveDiv.style.position = "absolute";
      moveDiv.style.width = mainDiv.offsetWidth;
      moveDiv.style.height = mainDiv.offsetHeight;
      moveDiv.style.border = "1px dotted #000000";
      moveDiv.style.zIndex = "999999";
      moveDiv.style.left = Math.floor(oLeft);
      moveDiv.style.top = Math.floor(oTop);
      moveDiv.style.cursor = "move";
  }

  DragLayer.prototype.stopResizeDiv = function(evt){
      var oThis = this;
      var barDiv = this.$("barDiv_"+this.containerID);
      evt = evt ? evt : window.event;
      oThis.__DROG = false;

      barDiv.style.cursor = "default";
      var moveDiv = this.$("moveDiv_"+oThis.containerID);

      var mainDiv = this.$("moveContentsDiv_"+oThis.containerID);
      var __SCROLLX = Math.floor(Math.max(document.documentElement.scrollLeft,document.body.scrollLeft));
      var __SCROLLY = Math.floor(Math.max(document.documentElement.scrollTop,document.body.scrollTop));
      var oLeft = evt.clientX + __SCROLLX - oThis.__ABSLEFT - this.borderMargin <= 0 ? 0 : evt.clientX + __SCROLLX - oThis.__ABSLEFT - this.borderMargin;
      var oTop = evt.clientY + __SCROLLY - oThis.__ABSTOP - this.borderMargin <= 0 ? 0 : evt.clientY + __SCROLLY - oThis.__ABSTOP - this.borderMargin;
          
      if(!this.isSwap){
              if(moveDiv.style.display != "none"){
              var oRect = oThis.BoundingRect(mainDiv);
              var rctTop = oRect.top;
              var rctLeft = oRect.left;
              oThis.depth = oThis.GetMaxIndexOfLayer() + 1;
              oThis.SmoothMoveFatherLayer(mainDiv,oLeft,oTop,rctLeft,rctTop);
          }
      }

      moveDiv.style.display = "none";

      var inConDiv = this.$("inConDiv_"+oThis.containerID);
      var cElm = inConDiv.firstChild;
      if(null != cElm){
          try{
              cElm.style.visibility = "visible";
          }catch(e){}
      }

      if(!this.isIE){
          try{
              window.document.removeEventListener("onmousemove",thisMove,false);
              window.document.removeEventListener("onmouseup",thisUp,false);
          }catch(e){alert(e.description);};
      }

      oThis.upLeft = oLeft + oThis.__ABSLEFT;
      oThis.upTop = oTop + oThis.__ABSTOP;
      this.EndDrag();
 }

 DragLayer.prototype.ActiveMoveCommand = function(){
      var resizeBt = this.$("goBT_"+this.containerID);
      var oThis = this;
      resizeBt.onclick = function(){
          oThis.InitLayerPosition(oThis.defaultX,oThis.defaultY);
      }
      resizeBt.onmouseover = function(){
          this.style.backgroundPositionX = "0px";
      }
      resizeBt.onmouseout = function(){
          this.style.backgroundPositionX = "-15px";
      }
 }

 DragLayer.prototype.InitLayerPosition = function(dX,dY,posSX,posSY){
      var mainDiv = this.$("moveContentsDiv_"+this.containerID);

      var moveDiv = this.$("moveDiv_"+this.containerID);
      if(null != moveDiv){
          moveDiv.style.display = "none";
      }
      var pLeft = posSX == null ? 0 : posSX;
      var pTop = posSY == null ? 0 : posSY;

      this.SmoothMoveFatherLayer(mainDiv,dX,dY,pLeft,pTop);

      var inConDiv = ("inConDiv_"+this.containerID);
      if(null != inConDiv.firstChild){
          inConDiv.firstChild.style.visibility = "visible";
      }
 }

 DragLayer.prototype.FillContent = function(){
      var tmpCon = this.loadHTML ? this.html : this.container.innerHTML;
      var id = this.containerID;
      var class1,class2,class3,class4,class5,class6,class7;
      switch(this.color){
          case "" :
              class1 = "moveContentsDiv";
              class2 = "moveDiv_leftBg";
              class3 = "moveDiv_rightBg";
              class4 = "barDiv";
              //class5 = "goBt";
              class5 = "buttonContainer";
              class6 = "inConDiv";
              class7 = "moveBlockTitle";
              break;
          case "pink":
              class1 = "moveContentsDiv_pink";
              class2 = "moveDiv_leftBg_pink";
              class3 = "moveDiv_rightBg_pink";
              class4 = "barDiv_pink";
              //class5 = "goBt_pink";
              class5 = "buttonContainer_pink";
              class6 = "inConDiv_pink";
              class7 = "moveBlockTitle_pink";
              break;
          case "green":
              class1 = "moveContentsDiv_green";
              class2 = "moveDiv_leftBg_green";
              class3 = "moveDiv_rightBg_green";
              class4 = "barDiv_green";
              //class5 = "goBt_green";
              class5 = "buttonContainer_green";
              class6 = "inConDiv_green";
              class7 = "moveBlockTitle_green";
              break;
          case "yellow":
              class1 = "moveContentsDiv_yellow";
              class2 = "moveDiv_leftBg_yellow";
              class3 = "moveDiv_rightBg_yellow";
              class4 = "barDiv_yellow";
              //class5 = "goBt_yellow";
              class5 = "buttonContainer_yellow";
              class6 = "inConDiv_yellow";
              class7 = "moveBlockTitle_yellow";
              break;
      }
      

      this.baseDiv = this.$C("div");
      this.$A(this.baseDiv);
      var conStr = [];
      conStr[conStr.length] = "<div id=\"moveContentsDiv_"+id+"\" class=\""+class1+"\" style=\"width:"+this.maxWidth+"px\">";
      conStr[conStr.length] = "   <div class=\""+class2+"\"></div>";
      conStr[conStr.length] = "   <div class=\""+class3+"\"></div>";
      conStr[conStr.length] = "   <div id=\"barDiv_"+id+"\" class=\""+class4+"\">";
      conStr[conStr.length] = "     <div class=\""+class7+"\" title=\""+this.title+"\">"+this.title+"</div>";
      conStr[conStr.length] = "     <div id=\"goBT_"+id+"\" class=\""+class5+"\">&nbsp;</div>";
      conStr[conStr.length] = "   </div>";
      conStr[conStr.length] = "   <div id=\"inConDiv_"+id+"\" class=\""+class6+"\">";
      conStr[conStr.length] = tmpCon;
      conStr[conStr.length] = "   </div>";
      conStr[conStr.length] = "</div>";
      this.baseDiv.innerHTML = conStr.join("");

      if(this.clear && !this.loadHTML){
          this.$R(this.container);
      }
 }

 DragLayer.prototype.SmoothMoveFatherLayer = function(mainDiv,oLeft,oTop,rctLeft,rctTop){
      var oThis = this;
      var markLeft = mainDiv.getAttribute("_markLeft");
      var markTop = mainDiv.getAttribute("_markTop");
      if(null == markLeft){markLeft = rctLeft;};
      if(null == markTop){markTop = rctTop;};
      var curLeftMarge = Math.floor(oLeft) - Math.floor(markLeft) == 0 ? 0 : Math.floor(Math.abs(Math.floor(oLeft) - Math.floor(markLeft))/this.step) + 1;
      var curTopMarge = Math.floor(oTop) - Math.floor(markTop) == 0 ? 0 : Math.floor(Math.abs(Math.floor(oTop) - Math.floor(markTop))/this.step) + 1;
      var curLeft,curTop;

      if(Math.floor(markLeft) + Math.floor(curLeftMarge) == Math.floor(oLeft)){
          curLeft = Math.floor(oLeft);
      }else if(Math.floor(markLeft) + Math.floor(curLeftMarge) < Math.floor(oLeft)){
          curLeft = Math.floor(markLeft) + Math.floor(curLeftMarge);
      }else{
          curLeft = Math.floor(markLeft) - Math.floor(curLeftMarge);
      }

      if(Math.floor(markTop) + Math.floor(curTopMarge) == Math.floor(oTop)){
          curTop = Math.floor(oTop);
      }else if(Math.floor(markTop) + Math.floor(curTopMarge) < Math.floor(oTop)){
          curTop = Math.floor(markTop) + Math.floor(curTopMarge);
      }else{
          curTop = Math.floor(markTop) - Math.floor(curTopMarge);
      }

      mainDiv.style.position = "absolute";
      mainDiv.style.left = curLeft;
      mainDiv.style.top = curTop;    
      mainDiv.style.zIndex = oThis.depth;   

      if(!(Math.floor(curLeft) == Math.floor(oLeft) && Math.floor(curTop) == Math.floor(oTop))){
          this.canMove = false;
          setTimeout(function(){oThis.SmoothMoveFatherLayer(mainDiv,oLeft,oTop,rctLeft,rctTop);},20);
      }else{
          this.canMove = true;
      }
      mainDiv.setAttribute("_markLeft",curLeft);
      mainDiv.setAttribute("_markTop",curTop);
 }

 DragLayer.prototype.AddButton = function(x,y,oX,oY,handler,title){
    var buttonCon = this.$("goBT_"+this.containerID);
    if(null != buttonCon){
        var button = this.$C("div",{className:this.isIE ? "blockButton" : "Moz_blockButton"});
        this.$A(button,buttonCon);
        this.ActiveButton(button,x,y,oX,oY,handler);

        if(null != title){
            button.title = title;
        }
    }
 }

 DragLayer.prototype.ActiveButton = function(button,x,y,oX,oY,handler){
    button.style.backgroundPosition = x + "px " + y + "px";
    button.onmouseover = function(){
        this.style.backgroundPosition = oX + "px " + oY + "px";
    }
    button.onmouseout = function(){
        this.style.backgroundPosition = x + "px " + y + "px";
    }
    button.onclick = function(){
        handler();
    }
 }

 DragLayer.prototype.GetMaxIndexOfLayer = function(){
     var rIndex = 0;
     var divs = document.getElementsByTagName("div");
     for(var i=0;i<divs.length;i++){
         var div = divs[i];
         if(div.getAttribute("isTempLayer") != "true"){
             var index = div.style.zIndex;
             if(null == index || "" == index){
                 index = 1;
             }
             rIndex = rIndex < Math.floor(index) ? Math.floor(index) : rIndex;
         }
     }
     return Math.floor(rIndex);
 }

 DragLayer.prototype.GetScriptPath = function(){
      var path = "";
      var publicScript = document.getElementsByTagName("script");
      for(var i=0,iLen=publicScript.length;i<iLen;i++){
          var curScript = publicScript[i];
          var src = curScript.getAttribute("src");
          if(src.indexOf("dragLayer.js") != -1){
              path = src.substring(0,src.indexOf("dragLayer.js"));
              break;
          }
      }
      return path;
 }

 DragLayer.prototype.showWaitingLayer = function(){
      var contentDiv = this.$("inConDiv_"+this.containerID);
      if(null == this.waitingLayer){
          this.waitingLayer = this.$C("div",{className:"waitingLayer"});
          this.$A(this.waitingLayer,contentDiv);
          var path = this.GetScriptPath();
          if(path != ""){
              path = path.substring(0,path.length-1);
          }
          path = path.substring(0,path.lastIndexOf("/")) + "/images/loading.gif";
          this.waitingLayer.innerHTML = "<img src=\""+path+"\" />";
      }
      this.waitingLayer.style.display = "";
      this.waitingLayer.style.position = "absolute";
      this.waitingLayer.style.left = "1px";
      this.waitingLayer.style.top = "19px";
      this.waitingLayer.style.width = this.maxWidth - 2 + "px";
      this.waitingLayer.style.height = contentDiv.offsetHeight - 2 + "px";
      this.waitingLayer.style.paddingLeft = this.maxWidth/2 - 8 + "px";
      this.waitingLayer.style.paddingTop = contentDiv.offsetHeight/2 - 8 + "px";
 }

 DragLayer.prototype.BoundingRect = function(el){
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

 DragLayer.prototype.hideWaitingLayer = function(){
      if(null != this.waitingLayer){
          this.waitingLayer.style.display = "none";
      }
 }

 DragLayer.prototype.reloadHTML = function(html){
      var contentDiv = this.$("inConDiv_"+this.containerID);
      contentDiv.innerHTML = html;
 }

 DragLayer.prototype.Close = function(){
      this.baseDiv.style.display = "none";
 }

 DragLayer.prototype.EndDrag = function(){
 }