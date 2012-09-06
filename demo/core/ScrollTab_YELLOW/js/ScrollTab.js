//======================================================================
// 功    能：公用可滚动TAB页控件
//           数据源可使用XML或JSON
//           具体使用方法见example.htm
//
// 运行环境：IE6.0+,FF3.0+,NS,Opera
//
// 作    者：IRD ShiCH
//
// 日    期：2009-2-16
//======================================================================

function ScrollTab(){
    // tab页可用数据类型,1:xml对象,2:json对象.
    this.dataType     = 1;

    // 要加载的数据对象
    this.data         = null;

    // 点击tab页事件
    this.clickEvt     = null;

    // tab页的父容器
    this.container    = null;

    // 生成tab页的总宽度
    this.width        = 540;

    // 每个tab页的宽度
    this.singleWidth  = 75;

    // 用于自动检验浏览器，无需设置
    this.isIE         = true;
}

/*
* 功  能：添加扩展方法
* 返回值：
*/
ScrollTab.prototype.$ = function(id){
    return document.getElementById(id);
}
ScrollTab.prototype.$C = function(tag){
    return document.createElement(tag);
}
ScrollTab.prototype.$A = function(elm,pElm){
    return pElm ? pElm.appendChild(elm) : document.body.appendChild(elm);
}
ScrollTab.prototype.$R = function(elm,pElm){
    return pElm ? pElm.removeChild(elm) : document.body.removeChild(elm);
}

/*
* 功  能：初始化
* 返回值：
*/
ScrollTab.prototype.init = function(){
    if(null == this.container){
        alert("请指定tab页的父容器.");
        return;
    }
    if(null == this.data){
        alert("tab页未指定数据对象或对象不存在.");
        return;
    }
    if(isNaN(Number(this.width)) || isNaN(Number(this.singleWidth))){
        alert("指定tab页宽度不是数字.");
        return;
    }
    this.checkBrowser();
    this.width = this.isIE ? this.width : this.width + 60;
    this.build();
}

/*
* 功  能：检查浏览器
* 返回值：
*/
ScrollTab.prototype.checkBrowser = function(){
    var ua = navigator.userAgent;
    this.isIE = /msie/i.test(ua);
}

/*
* 功  能：构建TAB内容
* 返回值：
*/
ScrollTab.prototype.build = function(){
    this.container.className = "tabContainerDiv";
    var conStr = [];

    conStr[conStr.length] = "<div class=\"scrollTabCon\">";
    conStr[conStr.length] = "<table border=\"0\" cellSpacing=\"0\" cellPadding=\"0\">";
    conStr[conStr.length] = " <tr>";
    conStr[conStr.length] = "   <td class=\"rollTabTD\">";
    conStr[conStr.length] = "     <div type=\"left\" class=\"tabRoll_dy_left\" style=\"visibility:hidden\">&nbsp;</div>";
    conStr[conStr.length] = "   </td>";
    conStr[conStr.length] = "   <td>";
    conStr[conStr.length] = "   <div type=\"roll\" style=\"width:"+this.width+"px;overflow:hidden;\">";

    conStr[conStr.length] = "     <table border=\"0\" cellSpacing=\"0\" cellPadding=\"0\">";
    conStr[conStr.length] = "       <tbody>";
    conStr[conStr.length] = "         <tr class=\"bodyTr\">";


    conStr[conStr.length] = "         </tr>";
    conStr[conStr.length] = "       </tbody>";
    conStr[conStr.length] = "     </table>";
    
    conStr[conStr.length] = "   </div>";
    conStr[conStr.length] = "   </td>";
    conStr[conStr.length] = "   <td class=\"rollTabTD\">";
    conStr[conStr.length] = "     <div type=\"right\" class=\"tabRoll_dy_right\" style=\"visibility:hidden\">&nbsp;</div>";
    conStr[conStr.length] = "   </td>";
    conStr[conStr.length] = " </tr>";
    conStr[conStr.length] = "</table>";


    conStr[conStr.length] = "</div>";

    this.container.innerHTML = conStr.join("");

    
    if(this.dataType == 1){
        this.buildXML();
    }else if(this.dataType == 2){
        this.buildJSON();
    }

    this.attachEvent();
    this.checkTabRoll();
}

/*
* 功  能：构建XML形式数据内容
* 返回值：
*/
ScrollTab.prototype.buildXML = function(){
    var tabs = this.data.selectNodes(".//Tab");
    var tLen = tabs.length;
    var trObj = this.container.getElementsByTagName("table")[0].getElementsByTagName("table")[0].getElementsByTagName("tr")[0];
    
    if(tLen == 0){return;}

    if(tLen != 1){
        for(var i=0;i<tLen;i++){
            var curTab = tabs[i];
            var id = curTab.getAttribute("id");
            var name = curTab.getAttribute("name");

            var td = this.$C("td");
            var div = this.$C("div");
            var inDiv = this.$C("div");
            var textDiv = this.$C("div");
            this.$A(td,trObj);
            this.$A(div,td);
            this.$A(inDiv,div);
            this.$A(textDiv,inDiv);

            
            div.className = i == 0 ? "tabOutDiv_Checked" : "tabOutDiv";
            div.setAttribute("type","leader");
            div.setAttribute("dataId",id);
            inDiv.className = "tabMainDiv2";
            textDiv.className = "intext";
            textDiv.style.width = this.singleWidth - 6 + "px";
            textDiv.innerHTML = name;
            div.title = name;
        }
    }else{
        var id = tabs.getAttribute("id");
        var name = tabs.getAttribute("name");

        var td = this.$C("td");
        var div = this.$C("div");
        var inDiv = this.$C("div");
        var textDiv = this.$C("div");
        this.$A(td,trObj);
        this.$A(div,td);
        this.$A(inDiv,div);
        this.$A(textDiv,inDiv);

        
        div.className = "tabOutDiv_Checked";
        div.setAttribute("dataId",id);
        inDiv.className = "tabMainDiv2";
        textDiv.className = "intext";
        textDiv.style.width = this.singleWidth - 6 + "px";
        textDiv.innerHTML = name;
        div.title = name;
    }
}

/*
* 功  能：构建JSON形式数据内容
* 返回值：
*/
ScrollTab.prototype.buildJSON = function(){
    var trObj = this.container.getElementsByTagName("table")[0].getElementsByTagName("table")[0].getElementsByTagName("tr")[0];
    var count = 0;
    for(var item in this.data){
        var id = this.data[item].id;
        var name = this.data[item].name;

        var td = this.$C("td");
        var div = this.$C("div");
        var inDiv = this.$C("div");
        var textDiv = this.$C("div");
        this.$A(td,trObj);
        this.$A(div,td);
        this.$A(inDiv,div);
        this.$A(textDiv,inDiv);

        
        div.className = count == 0 ? "tabOutDiv_Checked" : "tabOutDiv";
        div.setAttribute("type","leader");
        div.setAttribute("dataId",id);
        inDiv.className = "tabMainDiv2";
        textDiv.className = "intext";
        textDiv.style.width = this.singleWidth - 6 + "px";
        textDiv.innerHTML = name;
        div.title = name;

        count ++;
    }
}

/*
* 功  能：添加事件
* 返回值：
*/
ScrollTab.prototype.attachEvent = function(){
    var oThis = this;
    var divs = this.container.getElementsByTagName("div");
    for(var i=0,iLen=divs.length;i<iLen;i++){
        var curDiv = divs[i];
        var type = curDiv.getAttribute("type");
        if(type == "leader"){
            curDiv.onmouseover = function(){
                oThis.shineTab(this,true);
            }

            curDiv.onmouseout = function(){
                oThis.shineTab(this,false);
            }

            curDiv.onclick = function(){
                oThis.changeTab(this);
                oThis.clickEvt(this);
            }
        }else if(type == "left"){
            oThis.leftButton = curDiv;
        }else if(type == "right"){
            oThis.rightButton = curDiv;
        }else if(type == "roll"){
            oThis.mainRollDiv = curDiv;
        }
    }
}

/*
* 功  能：校验tab是否具有滚动事件
* 返回值：
*/
ScrollTab.prototype.checkTabRoll = function(){
    var oThis = this;
    var rollDiv = this.mainRollDiv;
    var leftBT  = this.leftButton;
    var rightBT = this.rightButton;
    if(rollDiv.scrollWidth == rollDiv.offsetWidth){return;}

    var rollWidth = parseInt(rollDiv.style.width);
    var tabWidth = this.isIE ? this.singleWidth + 15 : this.singleWidth + 25;

    leftBT.style.visibility = "visible";
    rightBT.style.visibility = "visible";

    if(rollDiv.scrollLeft > 0){
        leftBT.className = "tabRoll_dy_left_canUse";
        leftBT.onclick = function(){
            oThis.ROLLEND = false;
            oThis.disableTabRoll();
            var curLeft = parseInt(rollDiv.scrollLeft);
            var tarLeft = curLeft - tabWidth;
            rollDiv.setAttribute("curLeft",curLeft);
            rollDiv.setAttribute("tarLeft",tarLeft);
            oThis.rollTabEffect(rollDiv);
        }
    }else{
        leftBT.className = "tabRoll_dy_left";
        leftBT.onclick = function(){};
    }
    
    if(rollDiv.scrollLeft != rollDiv.scrollWidth - rollWidth){
        rightBT.className = "tabRoll_dy_right_canUse";
        rightBT.onclick = function(){
            oThis.ROLLEND = false;
            oThis.disableTabRoll();
            var curLeft = parseInt(rollDiv.scrollLeft);
            var tarLeft = curLeft + tabWidth;
            rollDiv.setAttribute("curLeft",curLeft);
            rollDiv.setAttribute("tarLeft",tarLeft);
            oThis.rollTabEffect(rollDiv);
        }
    }else{
        rightBT.className = "tabRoll_dy_right";
        rightBT.onclick = function(){};
    }
}

/*
* 功  能：高亮选中tab
* 返回值：
*/
ScrollTab.prototype.changeTab = function(elm){
    if(this.ROLLEND == false){return;}    
    var trObj = this.container.getElementsByTagName("table")[0].getElementsByTagName("table")[0].getElementsByTagName("tr")[0];
    var tds = trObj.getElementsByTagName("td");
    for(var i=0,iLen=tds.length;i<iLen;i++){
        var curTD = tds[i];
        var curDiv = curTD.firstChild;
        curDiv.className = "tabOutDiv";
    }
    elm.className = "tabOutDiv_Checked";
}

/*
* 功  能：高亮方法
* 返回值：
*/
ScrollTab.prototype.shineTab = function(elm,highlight){
    if(highlight){
        if(elm.className != "tabOutDiv_Checked"){
            elm.className = "tabOutDiv_Over";
        }
    }else{
        if(elm.className != "tabOutDiv_Checked"){
            elm.className = "tabOutDiv";
        }
    }
}

/*
* 功  能：取消tab按钮点击事件
* 返回值：
*/
ScrollTab.prototype.disableTabRoll = function(){
    var leftBT = this.leftButton;
    var rightBT = this.rightButton;
    leftBT.onclick = rightBT.onclick = function(){};
    leftBT.className = "tabRoll_dy_left";
    rightBT.className = "tabRoll_dy_right";
}

/*
* 功  能：滚动动画效果
* 返回值：
*/
ScrollTab.prototype.rollTabEffect = function(elm){
    var oThis = this;
    var curLeft = parseInt(elm.getAttribute("curLeft"));
    var tarLeft = parseInt(elm.getAttribute("tarLeft"));
    var step = parseInt(Math.abs(tarLeft - curLeft) / 2 ) == 0 ? 1 : parseInt(Math.abs(tarLeft - curLeft) / 2 );
    if(tarLeft > curLeft){
        var cLeft = curLeft + step;
        if(cLeft < tarLeft){
            elm.scrollLeft = cLeft;
            elm.setAttribute("curLeft",cLeft);
            setTimeout(function(){oThis.rollTabEffect(elm);},10);
        }else{
            elm.scrollLeft = tarLeft;
            oThis.checkTabRoll();
            oThis.ROLLEND = true;
        }
    }else{
        var cLeft = curLeft - step;
        if(cLeft > tarLeft){
            elm.scrollLeft = cLeft;
            elm.setAttribute("curLeft",cLeft);
            setTimeout(function(){oThis.rollTabEffect(elm);},10);
        }else{
            elm.scrollLeft = tarLeft;
            oThis.checkTabRoll();
            oThis.ROLLEND = true;
        }
    }
}