/*
* 功 能 : 页面效果库
* 作 者 : 史纯华
* 日 期 : 2009-7-20
*/
function Effect(elm){
    if(null == elm || typeof elm != "object"){
        alert("不能实例化效果库,对象不存在.");
        return;
    }
    this.elm = elm;
    this.checkBrowser();
}

//==================================================================
// 缩放效果,w和h分别指要缩放到的宽和高(正整数)　handler 完成后要执行的方法. fastToSlow(bool　由快到慢)
//==================================================================
Effect.prototype.resize = function(w,h,handler,slowToFast){
    if(null == slowToFast) slowToFast = false;
    if(slowToFast) this.addMarge = 1;
    if(w < 0 || h < 0) return;
    var curW = this.elm.offsetWidth;
    var curH = this.elm.offsetHeight;
    this.runResize(curW,curH,Math.floor(w),Math.floor(h),slowToFast);
    this.runResizeHander = function(){handler == null ? void(0) : handler();};
}
Effect.prototype.runResize = function(cW,cH,w,h,slowToFast){
    if(cW != w || cH != h){
        var oThis = this,rate = 5;
        if(slowToFast){
            this.addMarge *= 2;
            var toW,toH;
            if(cW < w){
                if(cW + this.addMarge >= w){toW = w;}else{toW = cW + this.addMarge;}
            }else if(cW > w){
                if(cW - this.addMarge <= w){toW = w;}else{toW = cW - this.addMarge;}
            }else{
                toW = w;
            }

            if(cH < h){
                if(cH + this.addMarge >= h){toH = h;}else{toH = cH + this.addMarge;}
            }else if(cH > h){
                if(cH - this.addMarge <= h){toH = h;}else{toH = cH - this.addMarge;}
            }else{
                toH = h;
            }
        }else{
            var margeW = Math.floor(Math.abs(cW - w)/rate);
            var margeH = Math.floor(Math.abs(cH - h)/rate);
            cW != w ? margeW = margeW + 1 : margeW = 0;
            cH != h ? margeH = margeH + 1 : margeH = 0;
            var toW = cW < w ? cW + margeW : cW - margeW,toH = cH < h ? cH + margeH : cH - margeH;
        }
        this.elm.style.width = toW + "px";
        this.elm.style.height = toH + "px";
        setTimeout(function(){
            oThis.runResize(toW,toH,w,h,slowToFast);
        },10);
    }else{
        this.runResizeHander();
    }
}

//==================================================================
// 震动效果,t表示要持续的秒数(正整数或小数)
//==================================================================
Effect.prototype.shake = function(t,handler){
    if(null == t) t = .5;
    var oP = this.elm.style.position || "static",oThis = this;
    var rate = 50,count = 0,cell = 1;
    this.elm.style.position = "relative";
    var cmd = setInterval(function(){
        oThis.elm.style.left = (count%2 == 0 ? cell : - cell) + "px";
        oThis.elm.style.top = (Math.floor(Math.random()*10 + 1) % 2 == 0 ? cell : -cell) + "px";
        count ++;
        if(t*1000/rate == count){
            clearInterval(cmd);
            oThis.elm.style.position = oP;
            if(handler) setTimeout(function(){handler();},100);
        }
    },rate);
}

//==================================================================
// 高亮效果,color表示高亮时的颜色,可以是16进制的(#DECAFE),RGB的(rgb(10,5,8))或英文值(red)
//==================================================================
Effect.prototype.shine = function(color,handler){
    if(null == color) color = "#FFFF00";
    var rate = /msie/i.test(navigator.userAgent) ? 25 : 10;
    var oC = this.elm.style.backgroundColor;
    var oG = this.elm.style.backgroundImage;
    this.elm.style.backgroundColor = color;
    this.elm.style.backgroundImage = "url()";
    var oThis = this,op = 0,inCmd,outCmd;
    inCmd = setInterval(function(){
        oThis.elm.style.filter = "Alpha(opacity="+op+")";
        oThis.elm.style.opacity = op/100;
        op = op + rate;
        if(op >= 100){
            clearInterval(inCmd);
            var np = 100;
            outCmd = setInterval(function(){
                oThis.elm.style.filter = "Alpha(opacity="+np+")";
                oThis.elm.style.opacity = np/100;
                np = np - rate;
                if(np <= 0){
                    clearInterval(outCmd);
                    oThis.elm.style.backgroundColor = oC;
                    oThis.elm.style.backgroundImage = oG;
                    oThis.elm.style.filter = "Alpha(opacity=100)";
                    oThis.elm.style.opacity = 1;
                    if(handler) handler();
                }
            },20);
        }
    },20);
}


//==================================================================
// 渐显效果,handler 完成后要执行的方法. time 效果执行时间
//==================================================================
Effect.prototype.fadeIn = function(handler,time){
    if(time == null) time = 1;
    var rate = 10,marge = (1/time)*1000/100,curFilter = 0,oThis = this;
    oThis.elm.style.filter = "Alpha(opacity="+curFilter+")";
    oThis.elm.style.opacity = curFilter/100;

    this.filterCmd = setInterval(function(){
        curFilter = curFilter + marge;
        oThis.elm.style.filter = "Alpha(opacity="+curFilter+")";
        oThis.elm.style.opacity = curFilter/100;
        if(curFilter + marge >= 100){
            oThis.elm.style.filter = "Alpha(opacity=100)";
            oThis.elm.style.opacity = 1;
            clearInterval(oThis.filterCmd);
            if(handler)
                handler();
        }
    },rate);
}

//==================================================================
// 渐隐效果,handler 完成后要执行的方法. time 效果执行时间
//==================================================================
Effect.prototype.fadeOut = function(handler,time){
    if(time == null) time = 1;
    var rate = 10,marge = (1/time)*1000/100,curFilter = 100,oThis = this;
    oThis.elm.style.filter = "Alpha(opacity="+curFilter+")";
    oThis.elm.style.opacity = curFilter/100;

    this.filterCmd = setInterval(function(){
        curFilter = curFilter - marge;
        oThis.elm.style.filter = "Alpha(opacity="+curFilter+")";
        oThis.elm.style.opacity = curFilter/100;
        if(curFilter - marge <= 0){
            oThis.elm.style.filter = "Alpha(opacity=0)";
            oThis.elm.style.opacity = 0;
            clearInterval(oThis.filterCmd);
            if(handler)
                handler();
        }
    },rate);
}

//==================================================================
// 移动效果,left,top 目标位置　handler 完成后要执行的方法. fastToSlow(bool　由快到慢)
//==================================================================
Effect.prototype.moveTo = function(left,top,handler,fastToSlow){
    var step = 8; 
    if(fastToSlow == null) fastToSlow = true;
    if(!fastToSlow) step = 1;
    this.position = this.elm.style.position || "static";
    var rect = this.rect(),ol = rect.left,ot = rect.top;
    this.elm.setAttribute("_effectMoveLeft",ol);
    this.elm.setAttribute("_effectMoveTop",ot);
    this.runMove(left,top,handler,fastToSlow,step);
}

Effect.prototype.runMove = function(l,t,h,f,s){
      var oThis = this;
      var ol = Math.floor(this.elm.getAttribute("_effectMoveLeft")),ot = Math.floor(this.elm.getAttribute("_effectMoveTop"));
      var lM,tM,tl,tt;
      if(f){
          lM = l - ol == 0 ? 0 : Math.floor(Math.abs(l - ol)/s) + 1;
          tM = t - ot == 0 ? 0 : Math.floor(Math.abs(t - ot)/s) + 1;
          if(ol + lM == l){tl = l;}else if(ol + lM < l){tl = ol + lM;}else{tl = ol - lM;}
          if(ot + tM == t){tt = t;}else if(ot + tM < t){tt = ot + tM;}else{tt = ot - tM;}
      }else{
          s *= 1.3;
          lM = l - ol == 0 ? 0 : s;
          tM = t - ot == 0 ? 0 : s;
          if(ol + lM == 0){tl = l;}else{if(l - ol > 0){if(ol + lM < l){tl = ol + lM;}else{tl = l;}}else{if(ol - lM > l){tl = ol - lM;}else{tl = l}}}
          if(ot + tM == 0){tt = t;}else{if(t - ot > 0){if(ot + tM < t){tt = ot + tM;}else{tt = t;}}else{if(ot - tM > t){tt = ot - tM;}else{tt = t}}}
      }

      this.elm.style.position = "absolute";
      this.elm.style.left = tl + "px";
      this.elm.style.top = tt + "px";    
      this.elm.style.zIndex = "999999";   

      if(!(tl == l && tt == t)){
          this.elm.setAttribute("_effectMoveLeft",tl);
          this.elm.setAttribute("_effectMoveTop",tt);
          setTimeout(function(){oThis.runMove(l,t,h,f,s);},20);
      }else{
          if(h) h();
      }
}

Effect.prototype.rect = function(){
    var absTop = 0;
    var absLeft = 0;
    var tempObj = this.elm;
    while(tempObj != document.body && tempObj.tagName.toLowerCase() != "html"){
        absTop += tempObj.offsetTop - tempObj.offsetParent.scrollTop;
        absLeft += tempObj.offsetLeft - tempObj.offsetParent.scrollLeft;
        tempObj = tempObj.offsetParent;
    }
    return {top:absTop,left:absLeft};
}

Effect.prototype.drag = function(){
}

Effect.prototype.checkBrowser = function(){
    var ua = navigator.userAgent;
    this.isIE = /msie/gi.test(ua);
}

//==================================================================
// 为对象绑定事件
//==================================================================
Effect.prototype.addEvent = function(elm,type,handler,useCapture){
    try{
        elm.attachEvent("on"+type,function(){handler();});
    }catch(e){
        try{
            if(null == useCapture) useCapture = false;
            elm.addEventListener(type,handler,useCapture);
        }catch(e1){
            elm["on"+type] = function(){
                handler;
            }
        }
    }
}
//==================================================================
// 取消对象绑定事件
//==================================================================
Effect.prototype.fireEvent = function(elm,type,handler,useCapture){
    try{
        elm.detachEvent("on"+type,handler);
    }catch(e){
        try{
            if(null == useCapture) useCapture = false;
            elm.removeEventListener(type,handler,useCapture);
        }catch(e1){
            elm["on"+type] = function(){handler;}
        }
    }
}