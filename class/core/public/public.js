/*
 * 功  能: 页面信息记录对象
 * 作  者: IRD ShiCH
 * 参  数: null
 * 返回值: null
 */
PAGEPUBLICINFO = {};

/*
 * 功  能: 获取HTML对象
 * 作  者: IRD ShiCH
 * 参  数: 对象ID或数据tagName,是否取单个对象
 * 返回值: HTML对象
 */
$ = function(id, isTagName){
    return isTagName ? document.getElementsByTagName(id) : document.getElementById(id);
}

/*
 * 功  能: 创建HTML对象
 * 作  者: IRD ShiCH
 * 参  数: 要创建对象的标签名
 * 返回值: HTML对象
 */
$C = function(tagName){
    return document.createElement(tagName);
}

/*
 * 功  能: 移除HTML对象
 * 作  者: IRD ShiCH
 * 参  数: 当前对象，父对象(可为空)
 * 返回值: HTML对象
 */
$R = function(curNode, parentNode){
    return parentNode ? parentNode.removeChild(curNode) : document.body.removeChild(curNode);
}

/*
 * 功  能: 添加HTML对象
 * 作  者: IRD ShiCH
 * 参  数: 当前对象，父对象(可为空)
 * 返回值: HTML对象
 */
$A = function(curNode, parentNode){
    return parentNode ? parentNode.appendChild(curNode) : document.body.appendChild(curNode);
}

/*
 * 功  能: String对象扩展
 * 作  者: IRD ShiCH
 * 参  数: 字符串
 * 返回值: 被格式化过的HTML串
 */
String.prototype.FormateToHtml = function(){
    var str = this;
    return str.replace(/\>/g, "&gt;").replace(/\</g, "&lt;").replace(/\'/g, "&#39;").replace(/\"/g, "&#34;");
}

/*
 * 功  能: String对象扩展
 * 作  者: IRD ShiCH
 * 参  数: 字符串
 * 返回值: 字符串真实长度(一个全角字符或汉字等于2个半角字符)
 */
String.prototype.RelLen = function(){
    var str = this;
    try {
        var reg = /[^\x00-\xff]/g;
        return str.replace(reg, "xx").length;
    } 
    catch (e) {
        return str.length;
    }
}

/*
 * 功  能: String对象扩展
 * 作  者: IRD ShiCH
 * 参  数: 字符串
 * 返回值: 被去掉左右空格的字符串
 */
String.prototype.Trim = function(){
    return Trim(this);
}
String.prototype.LTrim = function(){
    return LTrim(this);
}
String.prototype.RTrim = function(){
    return RTrim(this);
}
function LTrim(str){
    var i;
    for (i = 0; i < str.length; i++) {
        if (str.charAt(i) != " " && str.charAt(i) != " ") 
            break;
    }
    str = str.substring(i, str.length);
    return str;
}

function RTrim(str){
    var i;
    for (i = str.length - 1; i >= 0; i--) {
        if (str.charAt(i) != " " && str.charAt(i) != " ") 
            break;
    }
    str = str.substring(0, i + 1);
    return str;
}

function Trim(str){
    return LTrim(RTrim(str));
}

/*
 * 功  能: Array 对象扩展
 * 作  者: IRD ShiCH
 * 参  数: 数据值
 * 返回值: true/false
 */
Array.prototype.Contains = function(str){
    var isHas = false;
    for (var i = 0, iLen = this.length; i < iLen; i++) {
        if (this[i] == str) {
            isHas = true;
            break;
        }
    }
    return isHas;
}

/*
 * 功  能: Array 对象扩展
 * 作  者: IRD ShiCH
 * 参  数: 数据值
 * 返回值: 索引值
 */
Array.prototype.Index = function(str){
    var curIndex = null;
    for (var i = 0, iLen = this.length; i < iLen; i++) {
        if (this[i] == str) {
            curIndex = i;
            break;
        }
    }
    return curIndex;
}

/*
 * 功  能: 获取地址栏参数
 * 作  者: IRD ShiCH
 * 参  数: 参数名
 * 返回值: 参数值
 */
function GetUrlParams(name){
    var reg = new RegExp("(\\?|#|&)" + name + "=([^&#]*)(&|#|$)");
    var match = location.href.match(reg);
    return (!match ? "" : match[2]);
}

/*
 * 功  能: 获取当前脚本路径
 * 作  者: IRD ShiCH
 * 参  数: null
 * 返回值: 脚本相对路径
 */
function GetScriptPath(){
    var path = "";
    var publicScript = document.getElementsByTagName("script");
    for (var i = 0, iLen = publicScript.length; i < iLen; i++) {
        var curScript = publicScript[i];
        var src = curScript.getAttribute("src");
        if (src.indexOf("public.js") != -1) {
            path = src.substring(0, src.indexOf("public.js"));
            break;
        }
    }
    return path;
}

/*
 * 功  能: 浏览器校验
 * 作  者: IRD ShiCH
 * 参  数: null
 * 返回值: null
 */
function BrowserCheck(){
    var ua = navigator.userAgent;
    this._ie = /msie/i.test(ua);
    this._moz = navigator.product == "Gecko";
    this._platform = navigator.platform;
    if (this._moz) {
        /rv\:([^\);]+)(\)|;)/.test(ua);
        this._version = RegExp.$1;
        this._ie55 = false;
        this._ie6 = false;
        // 加入IE7判断 ShiCH 2009-01-08 14:24
        this._ie7 = false;
        this._hta = false;
    }
    else {
        /MSIE\s+([^\);]+)(\)|;)/.test(ua);
        this._version = RegExp.$1;
        this._ie55 = /msie 5\.5/i.test(ua);
        this._ie6 = /msie 6/i.test(ua);
        // 加入IE7判断 ShiCH 2009-01-08 14:24
        this._ie7 = /msie 7/i.test(ua);
        this._hta = !window.external;
    }
}

/*
 * 功  能: 获取对象绝对位置
 * 作  者: IRD ShiCH
 * 参  数: 当前对象
 * 返回值: null
 */
function BoundingRect(obj){
    var absTop = 0;
    var absLeft = 0;
    var tempObj = obj;
    while (tempObj != document.body) {
        absTop += tempObj.offsetTop - tempObj.offsetParent.scrollTop;
        absLeft += tempObj.offsetLeft - tempObj.offsetParent.scrollLeft;
        tempObj = tempObj.offsetParent;
    }
    this.top = absTop;
    this.left = absLeft;
}

/*
 * 功  能: 屏蔽JS报错
 * 作  者: IRD ShiCH
 * 参  数: null
 * 返回值: true
 */
window.onerror = function(){
    return true;
}

/*
 * 功  能: 屏蔽鼠标右键及文字选中
 * 作  者: IRD ShiCH
 * 参  数: HTML对象
 * 返回值: null
 */
function stopMouseMoreFunction(elm){
    if (null == elm) {
        elm = document;
    }
    elm.oncopy = function(){
        selection.empty();
    };
    elm.onbeforecopy = function(){
        return false;
    };
    elm.up = function(){
        selection.empty();
    };
    elm.oncontextmenu = function(){
        return false;
    };
    elm.ondragstart = function(){
        return false;
    };
    elm.onselectstart = function(){
        return false;
    };
    elm.onselect = function(){
        selection.empty();
    };
}

/*
 * 功  能: 开启鼠标右键及文字选中
 * 作  者: IRD ShiCH
 * 参  数: HTML对象
 * 返回值: null
 */
function restartMouseMoreFunction(elm){
    if (null == elm) {
        elm = document;
    }
    elm.oncopy = null;
    elm.onbeforecopy = null;
    elm.up = null;
    elm.oncontextmenu = function(){
        return false;
    };
    elm.ondragstart = null;
    elm.onselectstart = null;
    elm.onselect = null;
}

/*******************************************  工具条及鼠标样式内容 开始 ******************************************************/

/*
 * 功  能: 激活工具栏
 * 作  者: IRD ShiCH
 * 参  数: 对象ID,点击后执行的方法,是否TAB页样式,是否默认已选中
 * 返回值: null
 */
function activeToolBt(id, cmd, tabPage, checkFlag){

    var obj = $(id);
    obj.style.display = "";
    
    var span = obj.getElementsByTagName("span")[0];
    var img = obj.getElementsByTagName("img")[0];
    
    img.style.filter = "";
    //如果是默认被选中
    if (checkFlag) {
        obj.setAttribute("hasBeenClicked", true);
        obj.className = "imgContainerClick";
        span.className = "imgInnerText";
    }
    if (tabPage) {
        obj.onmouseover = function(){
            var hasBeenClicked = this.getAttribute("hasBeenClicked");
            if (!hasBeenClicked) {
                this.className = "imgContainerOver";
                span.className = "imgInnerTextOver";
            }
        };
        obj.onmousedown = function(){
            var hasBeenClicked = this.getAttribute("hasBeenClicked");
            if (!hasBeenClicked) {
                this.className = "imgContainerDown";
                span.className = "imgInnerTextOver";
            }
        };
        obj.onmouseup = function(){
            var hasBeenClicked = this.getAttribute("hasBeenClicked");
            if (!hasBeenClicked) {
                this.className = "imgContainerOver";
                span.className = "imgInnerText";
            }
        };
        obj.onmouseout = function(){
            var hasBeenClicked = this.getAttribute("hasBeenClicked");
            if (!hasBeenClicked) {
                this.className = "imgContainer";
                span.className = "imgInnerText";
            }
        };
        obj.onclick = function(){
            if (true != this.getAttribute("hasBeenClicked")) {
                //清空其它按钮点击样式
                var con = this.parentNode;
                for (var i = 0, iLen = this.parentNode.childNodes.length; i < iLen; i++) {
                    var curNode = this.parentNode.childNodes[i];
                    if ("SPAN" == curNode.nodeName) {
                        if (curNode.getAttribute("hasBeenClicked")) {
                            curNode.setAttribute("hasBeenClicked", false);
                            curNode.className = "imgContainer";
                            curNode.getElementsByTagName("span")[0].className = "imgInnerText";
                            break;
                        }
                    }
                }
                this.setAttribute("hasBeenClicked", true);
                this.className = "imgContainerClick";
                span.className = "imgInnerText";
                cmd();
            }
        }
        
        span.onmousemove = function(){
            return false;
        }
    }
    else {
        obj.onmouseover = function(){
            this.className = "imgContainerOver";
            span.className = "imgInnerTextOver";
        };
        obj.onmousedown = function(){
            this.className = "imgContainerDown";
            span.className = "imgInnerTextOver";
        };
        obj.onmouseup = function(){
            this.className = "imgContainerOver";
            span.className = "imgInnerText";
        };
        obj.onmouseout = function(){
            this.className = "imgContainer";
            span.className = "imgInnerText";
        };
        obj.onclick = cmd;
        
        span.onmousemove = function(){
            return false;
        }
    }
}

/*
 * 功  能: 释放工具栏
 * 作  者: IRD ShiCH
 * 参  数: 对象ID
 * 返回值: null
 */
function fireToolBt(id){
    var obj = $(id);
    var span = obj.getElementsByTagName("span")[0];
    var img = obj.getElementsByTagName("img")[0];
    img.style.filter = "Gray()";
    
    obj.onmouseover = obj.onmouseout = obj.onmousedown = obj.onmouseup = obj.onclick = function(){
        span.className = "imgInnerText";
    };
    span.onmousemove = function(){
        return false;
    };
}

/*
 * 功  能: 隐藏工具栏
 * 作  者: SCH
 * 参  数: 对象ID
 * 返回值: null
 */
function disToolBt(id){
    try {
        var obj = $(id);
        obj.style.display = "none";
    } 
    catch (e) {
    };
    }

/*
 * 功  能: 清除工具栏按钮样式
 * 作  者: IRD ShiCH
 * 参  数: 工具栏ID
 * 返回值: null
 */
function clearToolBt(id){
    var obj = $(id);
    for (var i = 0, iLen = obj.childNodes.length; i < iLen; i++) {
        var curNode = obj.childNodes[i];
        if ("SPAN" == curNode.nodeName) {
            curNode.setAttribute("hasBeenClicked", false);
            curNode.className = "imgContainer";
        }
    }
}

/*******************************************  工具条及鼠标样式内容 结束 ******************************************************/

/*
 * 功  能: 格式化字符
 * 作  者: IRD ShiCH
 * 参  数: 原字符串
 * 返回值: 格式化过的字符串
 */
function formatDots(str){
    str = str.replace(/\&/g, "&amp;");
    str = str.replace(/\</g, "&lt;");
    str = str.replace(/\>/g, "&gt;");
    str = str.replace(/\'/g, "&#39;");
    str = str.replace(/\"/g, "&#34;");
    
    return str;
}

/*
 * 功  能: 格式化字符
 * 作  者: IRD ShiCH
 * 参  数: 原字符串
 * 返回值: 格式化过的字符串
 */
function unFormatDots(str){
    str = str.replace(/\&amp;/g, "&");
    str = str.replace(/\&lt;/g, "<");
    str = str.replace(/\&gt;/g, ">");
    str = str.replace(/\&#39;/g, "'");
    str = str.replace(/\&#34;/g, "\"");
    
    return str;
}

/*
 * 功  能: 可拖动TABLE列方法
 * 作  者: IRD ShiCH
 * 参  数: table对象
 * 返回值:
 */
function AddTableResizeCommand(table){
    table.style.tableLayout = "fixed";
    table.style.overflow = "auto";
    var tH = table.offsetHeight - table.getElementsByTagName("tr")[table.getElementsByTagName("tr").length - 1].offsetHeight;
    var headerTR = table.getElementsByTagName("tr")[0];
    var headerTDS = headerTR.getElementsByTagName("td");
    fixedOtherHeaderTD(headerTDS);
    for (var i = 0, iLen = headerTDS.length; i < iLen; i++) {
        var curTD = headerTDS[i];
        curTD.onmousemove = function(){
            var rect = new BoundingRect(this);
            var oW = this.offsetWidth;
            var oH = this.offsetHeight;
            if (event.clientX >= rect.left + oW - 2 && event.clientX <= rect.left + oW && event.clientY >= rect.top && event.clientY <= rect.top + oH || this.getAttribute("canMoved") == "true") {
                document.body.style.cursor = "col-resize";
                this.setAttribute("canResized", "true");
            }
            else {
                document.body.style.cursor = "default";
                this.setAttribute("canResized", "false");
            }
            
            if (this.getAttribute("canMoved") == "true") {
                var div = $("resizeLineDiv");
                with (div.style) {
                    position = "absolute";
                    left = event.clientX - rect.left >= 0 ? event.clientX : rect.left + "px";
                    top = rect.top + document.body.scrollTop + "px";
                    width = "2px";
                    height = tH + "px";
                    borderRight = "1px dotted #999";
                    zIndex = "9999";
                }
            }
            else {
                var div = $("resizeLineDiv");
                if (null != div) {
                    if (div.style.display != "none") {
                        div.style.display = "none";
                    }
                }
            }
        }
        
        curTD.onmousedown = function(){
            if (this.getAttribute("canResized") == "true") {
                this.setCapture();
                var rect = new BoundingRect(this);
                this.setAttribute("canMoved", "true");
                var div = $("resizeLineDiv");
                if (null == div) {
                    var div = $C("div");
                    div.id = "resizeLineDiv";
                    $A(div);
                }
                with (div.style) {
                    position = "absolute";
                    left = event.clientX + "px";
                    top = rect.top + document.body.scrollTop + "px";
                    width = "2px";
                    height = tH + "px";
                    borderRight = "1px dotted #999";
                    zIndex = "9999";
                    display = "";
                }
            }
            else {
                this.setAttribute("canMoved", "false");
            }
        }
        
        curTD.onmouseup = function(){
            if (this.getAttribute("canMoved") == "true") {
                this.releaseCapture();
                var rect = this.getBoundingClientRect();
                this.style.width = (event.clientX - rect.left) <= 20 ? 20 : event.clientX - rect.left + "px";
                document.body.style.cursor = "default";
                this.setAttribute("canMoved", "false");
                var div = $("resizeLineDiv");
                if (null != div) {
                    if (div.style.display != "none") {
                        div.style.display = "none";
                    }
                }
            }
        }
        
        curTD.onmouseout = function(){
            document.body.style.cursor = "default";
            this.setAttribute("canResized", "false");
        }
    }
}


function fixedOtherHeaderTD(headerTDS){
    for (var j = 0, jLen = headerTDS.length; j < jLen; j++) {
        var oTD = headerTDS[j];
        oTD.style.width = oTD.offsetWidth + "px";
    }
    //alert(window.clipboardData.setData("text",table.innerHTML));
}

/*
 * 功  能: 把时间串转换成日期对象
 * 作  者: IRD ShiCH
 * 参  数: 时间串，日期格式串
 * 返回值:
 */
function stringToDate(str, pattern){
    var testYear = str.substr(pattern.indexOf("yyyy"), 4);
    var testMonth = str.substr(pattern.indexOf("MM"), 2);
    var testDay = str.substr(pattern.indexOf("dd"), 2);
    
    var testDate = testYear + "/" + testMonth + "/" + testDay;
    
    var HH = pattern.indexOf("HH");
    var mm = pattern.indexOf("mm");
    var ss = pattern.indexOf("ss");
    var testHour = -1 == HH ? "00" : str.substr(HH, 2);
    var testMinute = -1 == mm ? "00" : str.substr(mm, 2);
    var testSecond = -1 == ss ? "00" : str.substr(ss, 2);
    testDate += " " + testHour + ":" + testMinute + ":" + testSecond;
    
    testDate = new Date(testDate);
    
    if (testDate.getFullYear() != parseInt(testYear, 10) || testDate.getMonth() != parseInt(testMonth, 10) - 1 || testDate.getDate() != parseInt(testDay, 10)) {
        return null;
    }
    else {
        return new Date(testDate);
    }
}

/*
 * 功  能: 把日期对象转换成时间串
 * 作  者: IRD ShiCH
 * 参  数: 时间对象，日期格式串
 * 返回值: 时间串
 */
function dateToString(dateObj, pattern){
    if (typeof(dateObj) != "object") {
        alert("给定参数number类型错误，typeof(dateObj)=" + typeof(dateObj));
        return;
    }
    function addZero(number, digit){
        var str = number.toString(10);
        if (str.length > digit) {
            return str;
        }
        else {
            var zero = (1 << (digit - str.length)).toString(2).substring(1);
            str = zero + str;
            return str;
        }
    }
    
    var dateStr = dateObj.getFullYear() + '-' + addZero(dateObj.getMonth() + 1, 2) + '-' + addZero(dateObj.getDate(), 2);
    var timeStr = addZero(dateObj.getHours(), 2) + ':' + addZero(dateObj.getMinutes(), 2) + ':' + addZero(dateObj.getSeconds(), 2);
    
    var datePattern = pattern.split(" ")[0];
    var timePattern = pattern.split(" ")[1];
    
    var xmldomobj = new ActiveXObject('MSXML.DOMDocument');
    var xsldomobj = new ActiveXObject('MSXML.DOMDocument');
    
    var xmlStr = [];
    xmlStr[xmlStr.length] = "<root xml:space=\"preserve\" xmlns:dt=\"urn:schemas-microsoft-com:datatypes\">";
    xmlStr[xmlStr.length] = "<Date dt:dt=\"datetime\">";
    xmlStr[xmlStr.length] = dateStr;
    xmlStr[xmlStr.length] = "</Date>";
    xmlStr[xmlStr.length] = "<Time dt:dt=\"datetime\">";
    xmlStr[xmlStr.length] = dateStr + "T" + timeStr;
    xmlStr[xmlStr.length] = "</Time>";
    xmlStr[xmlStr.length] = "</root>";
    xmldomobj.loadXML(xmlStr.join(""));
    
    var xslStr = [];
    xslStr[xslStr.length] = "<xsl:stylesheet xmlns:xsl=\"http://www.w3.org/TR/WD-xsl\" xmlns:dt=\"urn:schemas-microsoft-com:datatypes\">";
    xslStr[xslStr.length] = "<xsl:template match=\"/\">";
    xslStr[xslStr.length] = "<xsl:for-each select=\"root/Date\">";
    xslStr[xslStr.length] = "<xsl:eval>formatDate(this.nodeTypedValue, \"" + datePattern + "\");</xsl:eval>";
    xslStr[xslStr.length] = "</xsl:for-each>";
    if ("" != timePattern && null != timePattern) {
        xslStr[xslStr.length] = "<xsl:for-each select=\"root/Time\">";
        xslStr[xslStr.length] = "<xsl:eval>\" \" + formatTime(this.nodeTypedValue, \"" + timePattern + "\");</xsl:eval>";
        xslStr[xslStr.length] = "</xsl:for-each>";
    }
    xslStr[xslStr.length] = "</xsl:template>";
    xslStr[xslStr.length] = "</xsl:stylesheet>";
    xsldomobj.loadXML(xslStr.join(""));
    
    var str = xmldomobj.transformNode(xsldomobj);
    xmldomobj = null;
    xsldomobj = null;
    
    return str;
}

/*
 * 功  能: 将变量值转换成字符串
 * 作  者: IRD ShiCH
 * 参  数: 变量
 * 返回值: 字符串
 */
function convertToString(value){
    var str = "";
    switch (typeof(value)) {
        case "number":
        case "boolean":
        case "function":
            str = value.toString();
            break;
        case "object":
            if (null == value) {
                str = "null";
            }
            else {
                if (null != value.toString) {
                    str = value.toString();
                }
                else {
                    str = "[object]";
                }
            }
            break;
        case "string":
            str = value;
            break;
        case "undefined":
            str = "";
            break;
    }
    return str;
}


/*
 * 功  能: 封装Alert事件
 * 作  者: IRD ShiCH
 * 参  数: 简要信息，确定后执行方法
 * 返回值: null
 */
function Alert(info, handler){
    info = convertToString(info);
    
    var maxWords = 100;
    var params = {};
    params.type = "alert";
    params.info = info;
    params.handler = handler;
    if (maxWords < info.length) {
        params.info = info.substring(0, maxWords) + "...";
    }
    ShowPagePublicInfoLayer(params);
}

/*
 * 功  能: 封装Confirm事件
 * 作  者: IRD ShiCH
 * 参  数: 简要信息，点击确定后要执行的方法
 * 返回值: true/false
 */
function Confirm(info, handler){
    info = convertToString(info);
    
    var maxWords = 100;
    var params = {};
    params.type = "confirm";
    params.info = info;
    params.handler = handler;
    if (maxWords < info.length) {
        params.info = info.substring(0, maxWords) + "...";
    }
    ShowPagePublicInfoLayer(params);
}

/*
 * 功  能: 封装Prompt事件
 * 作  者: IRD ShiCH
 * 参  数: 简要信息，默认值，标题，是否保护
 * 返回值: 用户输入信息
 */
function Prompt(info, defaultValue, title, protect){
    info = convertToString(info);
    defaultValue = convertToString(defaultValue);
    title = convertToString(title);
    
    var params = {};
    params.type = "prompt";
    params.info = info;
    params.defaultValue = defaultValue;
    params.title = title;
    params.protect = protect;
    return ShowPagePublicInfoLayer(params);
}

/*
 * 功  能: 封装提示图层
 * 作  者: IRD ShiCH
 * 参  数: 对象
 * 返回值:
 */
function ShowPagePublicInfoLayer(params){
    if (PAGEPUBLICINFO.cssLoaded == null) {
        var path = GetScriptPath();
        var head = document.getElementsByTagName("head")[0];
        var css = $C("link");
        css.href = path + "css/pageInfo.css";
        css.rel = "stylesheet";
        css.type = "text/css";
        $A(css, head);
        PAGEPUBLICINFO.cssLoaded = true;
    }
    var body = document.documentElement;
    var bW = body.offsetWidth;
    var bH = body.offsetHeight;
    var sL = body.scrollLeft;
    var sT = body.scrollTop;
    var layer = $C("div");
    layer.style.width = bW;
    layer.style.height = bH;
    layer.style.left = sL;
    layer.style.top = sT;
    layer.className = "pageAllInfo";
    $A(layer);
    
    PAGEPUBLICINFO.LayerObj = layer;
    
    var type = params.type;
    var iconPos = "0 0";
    if (type == "alert") {
        iconPos = "0px -96px";
    }
    else 
        if (type == "confirm") {
            iconPos = "0px -64px";
        }
        else {
            iconPos = "0px -32px";
        }
    
    var str = [];
    str[str.length] = "<table width=\"100%\" cellSpacing=\"0\" cellPadding=\"0\" height=\"100%\" border=\"0\">";
    str[str.length] = "   <tr>";
    str[str.length] = "     <td align=\"center\">";
    str[str.length] = "       <table class=\"pageAllInfoTable\" cellSpacing=\"0\" cellPadding=\"0\" border=\"0\">";
    str[str.length] = "         <tr>";
    str[str.length] = "           <td valign=top height=100% width=8>";
    str[str.length] = "             <table cellSpacing=0 cellPadding=0 height=100%>";
    str[str.length] = "               <tr>";
    str[str.length] = "                   <td class=\"left-top\"></td>";
    str[str.length] = "               </tr>";
    str[str.length] = "               <tr>";
    str[str.length] = "                   <td><div class=\"left-center\"></div></td>";
    str[str.length] = "               </tr>";
    str[str.length] = "               <tr>";
    str[str.length] = "                   <td class=\"left-down\"></td>";
    str[str.length] = "               </tr>";
    str[str.length] = "             </table>";
    //str[str.length] = "             <div class=\"left-top\"></div>";
    //str[str.length] = "             <div class=\"left-center\"></div>";
    //str[str.length] = "             <div class=\"left-down\"></div>";
    str[str.length] = "           </td>";
    str[str.length] = "           <td class=\"mainTD\">";
    str[str.length] = "             <table cellSpacing=\"0\" width=\"100%\" height=\"100%\" cellPadding=\"0\" border=\"0\">";
    str[str.length] = "               <tr>";
    str[str.length] = "                 <td>";
    str[str.length] = "                   <div class=\"titleLeft\">Windows Internet Explorer</div>";
    str[str.length] = "                   <div class=\"titleRight\">";
    str[str.length] = "                     <div onmouseover=\"javascript:this.style.backgroundPosition='-15px 0px';\" onmouseout=\"javascript:this.style.backgroundPosition='0px 0px';\" onclick=\"javascript:closePageInfoLayer();\"></div>";
    str[str.length] = "                   </div>";
    str[str.length] = "                 </td>";
    str[str.length] = "               </tr>";
    str[str.length] = "               <tr>";
    str[str.length] = "                 <td class=\"cooTD\">";
    str[str.length] = "                   <div class=\"infoInco\" style=\"background-position:" + iconPos + ";\"></div>";
    str[str.length] = "                   <div class=\"infoContent\">" + params.info + "</div>";
    str[str.length] = "                 </td>";
    str[str.length] = "               </tr>";
    str[str.length] = "               <tr>";
    str[str.length] = "                 <td align=\"center\" class=\"buttonTD\">";
    str[str.length] = "                   <div class=\"pageBT\" onclick=\"javascript:pageInfoOK();\" onmouseover=\"javascript:this.className='pageBT_over';\" onmouseout=\"javascript:this.className='pageBT';\">";
    str[str.length] = "                     <div class=\"left\"></div><div class=\"con\">确定</div><div class=\"right\"></div>";
    str[str.length] = "                   </div>";
    
    if (type != "alert") {
        str[str.length] = "                   <div class=\"spaceDiv\"></div><div class=\"pageBT\" onclick=\"javascript:pageInfoCancle();\" onmouseover=\"javascript:this.className='pageBT_over';\" onmouseout=\"javascript:this.className='pageBT';\">";
        str[str.length] = "                     <div class=\"left\"></div><div class=\"con\">取消</div><div class=\"right\"></div>";
        str[str.length] = "                   </div>";
    }
    
    str[str.length] = "                 </td>";
    str[str.length] = "               </tr>";
    str[str.length] = "             </table>";
    str[str.length] = "           </td>";
    str[str.length] = "           <td valign=top height=100% width=8>";
    str[str.length] = "             <table cellSpacing=0 cellPadding=0 height=100%>";
    str[str.length] = "               <tr>";
    str[str.length] = "                   <td class=\"right-top\"></td>";
    str[str.length] = "               </tr>";
    str[str.length] = "               <tr>";
    str[str.length] = "                   <td><div class=\"right-center\"></div></td>";
    str[str.length] = "               </tr>";
    str[str.length] = "               <tr>";
    str[str.length] = "                   <td class=\"right-down\"></td>";
    str[str.length] = "               </tr>";
    str[str.length] = "             </table>";
    //str[str.length] = "             <div class=\"right-top\"></div>";
    //str[str.length] = "             <div class=\"right-center\"></div>";
    //str[str.length] = "             <div class=\"right-down\"></div>";
    str[str.length] = "           </td>";
    str[str.length] = "         </tr>";
    str[str.length] = "       </table>";
    str[str.length] = "     </td>";
    str[str.length] = "   </tr>";
    str[str.length] = "<table>";
    
    layer.innerHTML = str.join("");
    stopMouseMoreFunction(layer);
    PAGEPUBLICINFO.okHandler = params.handler;
    
    
    disablePageControl(true);
    disableBody(true);
    document.onkeypress = function(e){
        var evt = e ? e : window.event;
        if (evt.keyCode == 32 || evt.keyCode == 13 || evt.keyCode == 0) {
            pageInfoOK();
        }
    }
}

/*
 * 功  能: 关闭页面提示信息图层
 * 作  者: IRD ShiCH
 * 参  数: null
 * 返回值: null
 */
function closePageInfoLayer(){
    $R(PAGEPUBLICINFO.LayerObj);
    PAGEPUBLICINFO.LayerObj = null;
    disablePageControl(false);
    disableBody(false);
    document.onkeypress = function(){
    };
}

/*
 * 功  能: 设置页面中input,select的disable属性
 * 作  者: IRD ShiCH
 * 参  数: 禁用/可用 (boolean),容器对象
 * 返回值: null
 */
function disablePageControl(bool, elm){
    var selects = elm ? elm.getElementsByTagName("select") : document.getElementsByTagName("select");
    var inputs = elm ? elm.getElementsByTagName("input") : document.getElementsByTagName("input");
    if (bool) {
        for (var i = 0, iLen = selects.length; i < iLen; i++) {
            var curSelect = selects[i];
            var disabled = curSelect.disabled;
            curSelect.setAttribute("_disabled", disabled ? "1" : "0");
            if (!disabled) {
                curSelect.disabled = true;
            }
        }
        for (var j = 0, jLen = inputs.length; j < jLen; j++) {
            var curInput = inputs[j];
            var disabled = curInput.disabled;
            curInput.setAttribute("_disabled", disabled ? "1" : "0");
            var exc = curInput.getAttribute("_except");
            if (!disabled && exc != "1") {
                curInput.disabled = true;
            }
        }
    }
    else {
        for (var i = 0, iLen = selects.length; i < iLen; i++) {
            var curSelect = selects[i];
            var dis = curSelect.getAttribute("_disabled");
            curSelect.disabled = dis == "1" ? true : false;
        }
        for (var j = 0, jLen = inputs.length; j < jLen; j++) {
            var curInput = inputs[j];
            var dis = curInput.getAttribute("_disabled");
            curInput.disabled = dis == "1" ? true : false;
        }
    }
}

/*
 * 功  能: 设置页面滚动属性
 * 作  者: IRD ShiCH
 * 参  数: 禁用/可用 (boolean)
 * 返回值: null
 */
function disableBody(bool){
    if (bool) {
        var s = document.body.scroll;
        if (s == "") {
            PAGEPUBLICINFO.bodyScroll = "yes";
        }
        else {
            PAGEPUBLICINFO.bodyScroll = s;
        }
        if (PAGEPUBLICINFO.bodyScroll != "no") {
            document.body.scroll = "no";
        }
    }
    else {
        document.body.scroll = PAGEPUBLICINFO.bodyScroll;
    }
}

/*
 * 功  能: 页面提示层点击确定按钮事件
 * 作  者: IRD ShiCH
 * 参  数: null
 * 返回值: null
 */
function pageInfoOK(){
    closePageInfoLayer();
    if (null != PAGEPUBLICINFO.okHandler) {
        PAGEPUBLICINFO.okHandler();
    }
    PAGEPUBLICINFO.okHandler = null;
}

/*
 * 功  能: 页面提示层点击取消按钮事件
 * 作  者: IRD ShiCH
 * 参  数: null
 * 返回值: null
 */
function pageInfoCancle(){
    closePageInfoLayer();
    PAGEPUBLICINFO.okHandler = null;
}

/*
 * 功  能: 添加事件
 * 作  者: IRD ShiCH
 * 参  数: null
 * 返回值: null
 */
function addEventHandler(oTarget, sEventType, fnHandler){
    if (oTarget.addEventListener) {
        oTarget.addEventListener(sEventType, fnHandler, false);
    }
    else 
        if (oTarget.attachEvent) {
            oTarget.attachEvent("on" + sEventType, fnHandler);
        }
        else {
            oTarget["on" + sEventType] = fnHandler;
        }
}

/*
 * 功  能: 注销事件
 * 作  者: IRD ShiCH
 * 参  数: null
 * 返回值: null
 */
function removeEventHandler(oTarget, sEventType, fnHandler){
    if (oTarget.removeEventListener) {
        oTarget.removeEventListener(sEventType, fnHandler, false);
    }
    else 
        if (oTarget.detachEvent) {
            oTarget.detachEvent("on" + sEventType, fnHandler);
        }
        else {
            oTarget["on" + sEventType] = null;
        }
}

/*
 * 功  能: 事件处理
 */
var Handler = {};
if (document.addEventListener) {
    Handler.add = function(element, eventType, handler){
        element.addEventListener(eventType, handler, false);
    }
    
    Handler.remove = function(element, eventType, handler){
        element.aremoveEventListener(eventType, handler, false);
    }
}
else 
    if (document.attachEvent) {
        Handler.add = function(element, eventType, handler){
            if (Handler._find(element, eventType, handler) != -1) 
                return;
            
            var wrappedHandler = function(e){
                if (!e) 
                    e = window.event;
                var event = {
                    _event: e,
                    type: e.type,
                    target: e.srcElement,
                    currentTarget: element,
                    relatedTarget: e.fromTarget ? e.fromElement : e.toElement,
                    eventPhase: (e.srcElement == element) ? 2 : 3,
                    
                    clientX: e.clientX,
                    clientY: e.clientY,
                    
                    screenX: e.screenX,
                    screenY: e.screenY,
                    
                    altKey: e.altKey,
                    ctrlKey: e.ctrlKey,
                    shiftKey: e.shiftKey,
                    charCode: e.keyCode,
                    keyCode: e.keyCode,
                    
                    stopPropagation: function(){
                        this._event.cancelBubble = true;
                    },
                    preventDefault: function(){
                        this._event.returnValue = false;
                    }
                }
                
                if (Function.prototype.call) 
                    handler.call(element, event);
                else {
                    element._currentHandler = handler;
                    element._currentHandler(event);
                    element._currentHandler = null;
                }
            }
            
            element.attachEvent("on" + eventType, wrappedHandler);
            
            var h = {
                element: element,
                eventType: eventType,
                handler: handler,
                wrappedHandler: wrappedHandler
            };
            
            var d = element.document || element;
            
            var w = d.parentWindow;
            
            var id = Handler._uid();
            
            if (!w._allHandlers) 
                w._allHandlers = {};
            w._allHandlers[id] = h;
            
            if (!element._handlers) 
                element._handlers = [];
            element._handlers.push(id);
            
            if (!w._onunloadHandlerRegistered) {
                w._onunloadHandlerRegistered = true;
                w.attachEvent("onunload", Handler._removeAllHandlers);
            }
        }
        
        Handler.remove = function(element, eventType, handler){
            var i = Handler._find(element, eventType, handler);
            if (i == -1) 
                return;
            
            var d = element.document || element;
            var w = d.parentWindow;
            
            var handlerId = element._handlers[i];
            var h = w._allHandlers[handlerId];
            
            element.detachEvent("on" + eventType, h.wrappedHandler);
            element._handlers.splice(i, 1);
            delete w._allHandlers[handlerId];
        }
        
        Handler._find = function(element, eventType, handler){
            var handlers = element._handlers;
            if (!handlers) 
                return -1;
            
            var d = element.document || element;
            var w = d.parentWindow;
            
            for (var i = handlers.length - 1; i >= 0; i--) {
                var handlerId = handlers[i];
                var h = w._allHandlers[handlerId];
                if (h.eventType == eventType && h.handler == handler) {
                    return i;
                }
            }
            return -1;
        }
        
        Handler._removeAllHandlers = function(){
            var w = this;
            for (var id in w._allHandlers) {
                var h = w._allHandlers[id];
                h.element.detachEvent("on" + h.eventType, h.wrappedHandler);
                delete w._allHandlers[id];
            }
        }
        
        Handler._counter = 0;
        Handler._uid = function(){
            return "h" + Handler._counter++;
        };
    }

/*
 * 功  能: 事件重定义
 * 作  者: IRD ShiCH
 * 参  数: null
 * 返回值: null
 */
window._alert = window.alert;
window._confirm = window.confirm;
window._prompt = window.prompt;

//if((new BrowserCheck())._ie){
try {
    document.execCommand("BackgroundImageCache", false, true);
} 
catch (e) {
}
/*
window.alert = Alert;
window.confirm = Confirm;
window.prompt = Prompt;
*/
//}
