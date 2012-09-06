/*
* 功 能 : 信息提示框
* 作 者 : 史纯华
* 日 期 : 2009-8-4
*/

function MessageBox(id){
    this.target = this.$(id) || id || {};
    this.showCmd = null;
    this.filterCmd = null;
}

MessageBox.prototype.$ = function(id){
    return document.getElementById(id);
}
MessageBox.prototype.$C = function(tagName,attrObject){
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
MessageBox.prototype.$A = function(elm,pElm){
    return pElm ? pElm.appendChild(elm) : document.body.appendChild(elm);
}
MessageBox.prototype.$R = function(elm,pElm){
    return pElm ? pElm.removeChild(elm) : document.body.removeChild(elm);
}
MessageBox.prototype.$T = function(tagName,pElm){
    return pElm ? pElm.getElementsByTagName(tagName) : document.getElementsByTagName(tagName);
}
MessageBox.prototype.BoundingRect = function(elm){
    var absTop = 0;
    var absLeft = 0;
    var tempObj = elm;
    while(tempObj != document.body && tempObj.tagName.toLowerCase() != 'html'){
        absTop += tempObj.offsetTop - tempObj.offsetParent.scrollTop;
        absLeft += tempObj.offsetLeft - tempObj.offsetParent.scrollLeft;
        tempObj = tempObj.offsetParent;
    }
    return {top:absTop,left:absLeft};
}

MessageBox.prototype.Show = function(text){
    if(this.showCmd) {clearTimeout(this.showCmd); this.showCmd = null;};
    if(this.filterCmd) {clearInterval(this.filterCmd); this.silterCmd = null;};
    this.div = this.$("messageBox");
    this.iframe = this.$("messageBoxIframe");
    if(null == this.div){
        var str = [];

        str[str.length] = "<div class='msgBox_top'>";
        str[str.length] = " <div class='l'></div>";
        str[str.length] = " <div class='c' id='msgBox_topBorder'></div>";
        str[str.length] = " <div class='r'></div>";
        str[str.length] = "</div>";
        str[str.length] = "<div class='msgBox_center'>";
        str[str.length] = " <div class='c' id='MessageBoxTextContainer'></div>";
        str[str.length] = "</div>";
        str[str.length] = "<div class='msgBox_bottom'>";
        str[str.length] = " <div class='l'></div>";
        str[str.length] = " <div class='c' id='msgBox_bottomBorder'></div>";
        str[str.length] = " <div class='r'></div>";
        str[str.length] = "</div>";

        this.div = this.$C("div",{id:"messageBox",className:"messageBox",innerHTML:str.join("")});
        this.iframe = this.$C("iframe",{id:"messageBoxIframe",className:"messageBoxIframe",frameBorder:"0",scrolling:"no"});
        this.$A(this.iframe);
        this.$A(this.div);
    }
    this.$("MessageBoxTextContainer").innerHTML = text;
    this.CheckPos();
}

MessageBox.prototype.CheckPos = function(){
    var r = this.BoundingRect(this.target),
      dw = this.div.offsetWidth,dh = this.div.offsetHeight,
      ow = this.target.offsetWidth,oh = this.target.offsetHeight,
      rl = r.left,rt = r.top,
      bh = document.body.offsetHeight + Math.floor(Math.max(document.documentElement.scrollTop,document.body.scrollTop)),
      bw = document.body.offsetWidth + Math.floor(Math.max(document.documentElement.scrollLeft,document.body.scrollLeft)),
      dt,dl;
    //dl = rl + ow + dw >= bw ? rl - dw - 5 : rl + ow + 5;
    dt = rt + oh >= bh ? rt - dh - 5 : rt + oh + 5;
    dl = rl;
    with(this.div.style){
        position = "absolute";
        left = dl + "px";
        top = dt + "px";
        zIndex = 9999;
        filter = "Alpha(opacity=100)";
    }
    this.div.style.opacity = 1;
    
    var ir = this.BoundingRect(this.div);
    with(this.iframe.style){
        width = this.div.offsetWidth + "px";
        height = this.div.offsetHeight + "px";
        position = "absolute";
        left = ir.left + "px";
        top = ir.top + "px";
        zIndex = 9998;
        filter = "Alpha(opacity=100)";
        opacity = 1;
    }


    var oThis = this;
    
    var b = new oThis.Browser();
    if(b._ie && !b._ie8){
        oThis.$('msgBox_topBorder').style.width = this.div.offsetWidth - 16 + 'px';
        oThis.$('msgBox_bottomBorder').style.width = this.div.offsetWidth - 16 + 'px';;
    }

    this.showCmd = setTimeout(function(){
        oThis.FadeIn();
    },2000);
}

MessageBox.prototype.FadeIn = function(){
    var t = 10,r = 5,f = 100,c = f/r,oThis = this;
    this.filterCmd = setInterval(function(){
        c -- ;
        f = f - r;
        oThis.div.style.filter = "Alpha(opacity="+f+")";
        oThis.div.style.opacity = f/100;

        oThis.iframe.style.filter = "Alpha(opacity="+f+")";
        oThis.iframe.style.opacity = f/100;

        if(c == 0){
            oThis.div.style.top = "-10000px";
            oThis.iframe.style.top = "-10000px";
            
            var b = new oThis.Browser();
            if(b._ie && !b._ie8){
                oThis.$('msgBox_topBorder').style.width = '1px';
                oThis.$('msgBox_bottomBorder').style.width = '1px';
            }

            clearInterval(oThis.filterCmd);
        }
    },t);
}

MessageBox.prototype.Browser = function(){
    var ua = navigator.userAgent;
    this._ie = /msie/i.test(ua);
    this._moz = navigator.product == "Gecko";
    this._platform = navigator.platform;
    if (this._moz) {
        /rv\:([^\);]+)(\)|;)/.test(ua);
        this._version = RegExp.$1;
        this._ie55 = false;
        this._ie6 = false;
        this._ie7 = false;
        this._ie8 = false;
        this._hta = false;
    }
    else {
        /MSIE\s+([^\);]+)(\)|;)/.test(ua);
        this._version = RegExp.$1;
        this._ie55 = /msie 5\.5/i.test(ua);
        this._ie6 = /msie 6/i.test(ua);
        this._ie7 = /msie 7/i.test(ua);
        this._ie8 = /msie 8/i.test(ua);
        this._hta = !window.external;
    }
}