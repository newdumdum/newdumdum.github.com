 /*
 * Description : Build Pic And Give Resizing effect,move effect and so on.
 * Run Condition : IE,Mozilla
 * Author : ShiCH IRD
 * Date : 2008-3-13
 */

 __MAXWIDTH = 600;
 __MINWIDTH = 100;
 __IMGSRC = null;
 __PICWIDTH = null;
 __PICHEIGHT = null;
 __CANMOVE = true;
 __ISIE = true;

$ = function (id,isTagName){
    return isTagName ? document.getElementsByTagName(id) : document.getElementById(id);
}
$C = function(tagName){
    return document.createElement(tagName);
}
$R = function(curNode,parentNode){
    return parentNode ? parentNode.removeChild(curNode) : document.body.removeChild(curNode);
}
$A = function(curNode,parentNode){
    return parentNode ? parentNode.appendChild(curNode) : document.body.appendChild(curNode);
}

window.onload = function(){
    CheckBrowser();
    var div = $("outDiv");
    div.style.display = "";
    giveMoveCmd();
    getImgInfo();
    setOuterDivWidth();
    SetFrameMoveCmd();
}

function giveMoveCmd(){
    var div = $("outDiv");
    var sBt = $("goBT");
    sBt.onclick = function(){
        var oWidth = div.getAttribute("oWidth");
        resizeDiv(null == oWidth || oWidth != parseInt(__MINWIDTH+7));
    }
    sBt.onmouseover = function(){
        this.style.backgroundPositionX = "0px";
    }
    sBt.onmouseout = function(){
        this.style.backgroundPositionX = "-15px";
    }
}

function cancleMoveCmd(){
    var sBt = $("goBT");
}

function resizeDiv(dir){
    var btSpan = $("goBT");
    var div = $("outDiv");
    var img = $("showImg");
    
    var t=0,d=50,r=15, cmd = setInterval(function(){
        var marge = dir ? Math.floor(easeOut(t,__MAXWIDTH,__MINWIDTH - __MAXWIDTH,d)) : Math.floor(easeOut(t,__MINWIDTH,__MAXWIDTH-__MINWIDTH,d));
        var curWidth = Math.floor(marge);
        t++;
        if(t == d){
            btSpan.className = dir ? "goBt_B" : "goBt";
            giveMoveCmd();
            clearInterval(cmd);
            resizeImg(curWidth-(dir ? 4 : 8),true);
            return;
        }

        div.style.width = curWidth + "px";
        div.setAttribute("oWidth",curWidth);
        cancleMoveCmd();
        resizeImg(curWidth-4,false);
    },r);
}

function resizeImg(width,isNeed){
    var img = $("showImg");
    if(isNeed){
        img.setAttribute("width",width);
        img.setAttribute("height",width*(__PICHEIGHT/__PICWIDTH));
    }
    
    var div = $("inConDiv");
    div.style.height = parseInt(width*(__PICHEIGHT/__PICWIDTH)) + (__ISIE ? 4 : 0) + "px";
}

function setOuterDivWidth(){
    var div = $("outDiv");
    div.style.width = __MAXWIDTH + "px";
}
function getImgInfo(reselect){
    var ran = parseInt(String(Math.random()*10).substring(0,1));
    __IMGSRC = "images/showPic/photo_"+ran+".jpg";
    var div = $("inConDiv");
    if(!reselect){
        div.style.widht = __MAXWIDTH + "px";
        div.style.height = "20px";
    }
    var img = $("showImg");
    if(null == img){
        img = $C("img");
        img.id = "showImg";
        $A(img,div);
    }
    img.onload = function(){
        __PICWIDTH = this.width;
        __PICHEIGHT = this.height;
        if(null == reselect){
            this.setAttribute("width",parseInt(__MAXWIDTH-6));
            this.setAttribute("height",parseInt(__MAXWIDTH-6)*(__PICHEIGHT/__PICWIDTH));
        }
        this.onclick = function(){
            getImgInfo(1);
        }
        this.style.cursor = "hand";
        this.style.cursor = "pointer";
        this.alt = "点击随机更换图片";

        div.style.height = parseInt(this.getAttribute("height")) + "px";
    }
    img.src = __IMGSRC;
    div.setAttribute("UNSELECTABLE","on");
    img.setAttribute("UNSELECTABLE","on");
}

// 添加拖动事件
function SetFrameMoveCmd(){
    var barDiv = $("barDiv");

    var __OVER = false;
    var __DROG = false;
    var __ABSLEFT = 0;
    var __ABSTOP = 0;

    barDiv.onmouseover = function(){
        __OVER = true;
    }

    barDiv.onmousedown = function(e){
        if(!__CANMOVE){return;};
        var evt = e ? e : window.event;
        var goBt = $("goBT");
        var gRect = new BoundingRect(goBt);
        // 禁止有按钮的地方拖动
        if(evt.clientX >= gRect.left && evt.clientX <= (gRect.left + 15) && evt.clientY >= gRect.top && evt.clientY <= (gRect.top + 15)){return;};
        var mainDiv = $("outDiv");
        var moveDiv = $("moveDiv");
        var __SCROLLX = parseInt(Math.max(document.documentElement.scrollLeft,document.body.scrollLeft));
        var __SCROLLY = parseInt(Math.max(document.documentElement.scrollTop,document.body.scrollTop));
        if(null == moveDiv){
            moveDiv = $C("div");
            moveDiv.id = "moveDiv";
            $A(moveDiv);
        }
        var Rect = new BoundingRect(mainDiv);

        moveDiv.style.display = "";
        moveDiv.style.position = "absolute";
        moveDiv.style.width = mainDiv.offsetWidth + 'px';
        moveDiv.style.height = mainDiv.offsetHeight + 'px';
        moveDiv.style.border = "1px dotted #000000";
        moveDiv.style.backgroundColor = "#EEE";
        moveDiv.style.zIndex = "999999";
        moveDiv.style.left = Rect.left + __SCROLLX + 'px';
        moveDiv.style.top = Rect.top + __SCROLLY + 'px';

        moveDiv.className = "filterDiv";

        __ABSLEFT = Math.abs(Rect.left - evt.clientX);
        __ABSTOP = Math.abs(Rect.top - evt.clientY);
        __DROG = true;
        this.style.cursor = "move";
        
        /*
        if(__ISIE){
            moveDiv.setCapture();
        }else{
            evt.preventDefault();
        }
        */
    }

    document.onmousemove = function(event){
        if(null == event){event = window.event;};
        if(__DROG){
            var __SCROLLX = parseInt(Math.max(document.documentElement.scrollLeft,document.body.scrollLeft));
            var __SCROLLY = parseInt(Math.max(document.documentElement.scrollTop,document.body.scrollTop));
            var oLeft = event.clientX + __SCROLLX - __ABSLEFT - 2 <= 0 ? 0 : event.clientX + __SCROLLX - __ABSLEFT - 2;
            var oTop = event.clientY + __SCROLLY - __ABSTOP - 2 <= 0 ? 0 : event.clientY + __SCROLLY - __ABSTOP - 2;
            setTimeout(function(){GoAndMove(oLeft,oTop);},80);
        }
    }

    function GoAndMove(oLeft,oTop){
        var mainDiv = $("outDiv"),
          moveDiv = $("moveDiv");
        moveDiv.style.position = "absolute";
        moveDiv.style.width = mainDiv.offsetWidth + 'px';
        moveDiv.style.height = mainDiv.offsetHeight + 'px';
        moveDiv.style.border = "1px dotted #000000";
        moveDiv.style.zIndex = "999999";
        moveDiv.style.left = parseInt(oLeft) + 'px';
        moveDiv.style.top = parseInt(oTop) + 'px';
        moveDiv.style.cursor = "move";
    }

    document.onmouseup = function(event){
        if(null == event){event = window.event;};
        __DROG = false;
        try{
            barDiv.style.cursor = "default";
            var mainDiv = $("outDiv");
            var moveDiv = $("moveDiv");
            var __SCROLLX = parseInt(Math.max(document.documentElement.scrollLeft,document.body.scrollLeft));
            var __SCROLLY = parseInt(Math.max(document.documentElement.scrollTop,document.body.scrollTop));
            var oLeft = event.clientX + __SCROLLX - __ABSLEFT <= 0 ? 0 : event.clientX + __SCROLLX - __ABSLEFT;
            var oTop = event.clientY + __SCROLLY - __ABSTOP <= 0 ? 0 : event.clientY + __SCROLLY - __ABSTOP;
            if(moveDiv.style.display != "none"){
                var oRect = new BoundingRect(mainDiv);
                var rctTop = oRect.top;
                var rctLeft = oRect.left;
                SmoothMoveFatherPic(mainDiv,oLeft,oTop,rctLeft,rctTop);
            }
            moveDiv.style.display = "none";
            //if(__ISIE) moveDiv.releaseCapture();
        }catch(e){};
    }

    // 平滑移动效果
    function SmoothMoveFatherPic(mainDiv,oLeft,oTop,rctLeft,rctTop){
        var markLeft = mainDiv.getAttribute("markLeft");
        var markTop = mainDiv.getAttribute("markTop");
        if(null == markLeft){markLeft = rctLeft;};
        if(null == markTop){markTop = rctTop;};
        var curLeftMarge = parseInt(oLeft) - parseInt(markLeft) == 0 ? 0 : parseInt(Math.abs(parseInt(oLeft) - parseInt(markLeft))/8) + 1;
        var curTopMarge = parseInt(oTop) - parseInt(markTop) == 0 ? 0 : parseInt(Math.abs(parseInt(oTop) - parseInt(markTop))/8) + 1;
        var curLeft,curTop;

        if(parseInt(markLeft) + parseInt(curLeftMarge) == parseInt(oLeft)){
            curLeft = parseInt(oLeft);
        }else if(parseInt(markLeft) + parseInt(curLeftMarge) < parseInt(oLeft)){
            curLeft = parseInt(markLeft) + parseInt(curLeftMarge);
        }else{
            curLeft = parseInt(markLeft) - parseInt(curLeftMarge);
        }

        if(parseInt(markTop) + parseInt(curTopMarge) == parseInt(oTop)){
            curTop = parseInt(oTop);
        }else if(parseInt(markTop) + parseInt(curTopMarge) < parseInt(oTop)){
            curTop = parseInt(markTop) + parseInt(curTopMarge);
        }else{
            curTop = parseInt(markTop) - parseInt(curTopMarge);
        }

        mainDiv.style.position = "absolute";
        mainDiv.style.left = curLeft + 'px';
        mainDiv.style.top = curTop + 'px';    
        mainDiv.style.zIndex = "999998";

        if(!(parseInt(curLeft) == parseInt(oLeft) && parseInt(curTop) == parseInt(oTop))){
            __CANMOVE = false;
            setTimeout(function(){SmoothMoveFatherPic(mainDiv,oLeft,oTop,rctLeft,rctTop);},20);
        }else{
            __CANMOVE = true;
        }
        mainDiv.setAttribute("markLeft",curLeft);
        mainDiv.setAttribute("markTop",curTop);
    }
}

function CheckBrowser(){
    var ua = navigator.userAgent.toUpperCase();
    if(ua.indexOf("MSIE") != -1){
        __ISIE = true;
    }else{
        __ISIE = false;
    }
}

function BoundingRect(el){
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

/*
* params:
* t：current time（当前时间）；
* b：beginning value（初始值）；
* c：change in value（变化量）；
* d：duration（持续时间）
*/
function easeOut (t,b,c,d){
    if ((t/=d) < (1/2.75)) {
        return c*(7.5625*t*t) + b;
    } else if (t < (2/2.75)) {
        return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
    } else if (t < (2.5/2.75)) {
        return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
    } else {
        return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
    }
}