/*
* 功    能: 滑动图片展示类
* 运行环境: IE6.0+,FF3.0+,NetScape,Opera
* 作    者: IRD ShiCH
* 日    期: 2009-2-18
*/

function SliderPic(){
    // 数据格式 1为xml对象,2为json对象
    this.dataType   = 1;

    // 数据源对象
    this.data       = null;

    // 容器对象
    this.container  = null;

    // 最大化后点击事件
    this.clickEvt   = null;

    // 图片最大宽度
    this.imgWidth   = 400;

    // 图片最大高度
    this.imgHeight  = 400;

    // 图片边框宽度
    this.spaceWidth = 4;

    // 缓动频率
    this.moveRate   = 4;

    // 数据缓存(无需用户设置)
    this.tempData   = [];
}

/*
* 功  能：添加扩展方法
* 返回值：
*/
SliderPic.prototype.$ = function(id){
    return document.getElementById(id);
}
SliderPic.prototype.$C = function(tagName,attrObject){
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
SliderPic.prototype.$A = function(elm,pElm){
    return pElm ? pElm.appendChild(elm) : document.body.appendChild(elm);
}
SliderPic.prototype.$R = function(elm,pElm){
    return pElm ? pElm.removeChild(elm) : document.body.removeChild(elm);
}
SliderPic.prototype.$T = function(tagName,pElm){
      return pElm ? pElm.getElementsByTagName(tagName) : document.getElementsByTagName(tagName);
  }

/*
* 功  能: 数据初始化
* 作  者: IRD ShiCH
* 参  数: 默认展示图片序号
* 返回值: null
*/
SliderPic.prototype.init = function(showIndex){
    if(null == this.container){
        alert("SliderPic 容器不可用");
        return;
    }
    if(null == this.data || typeof this.data != "object"){
        alert("SliderPic 数据源不可用");
        return;
    }
    this.build();

    if(showIndex)
        this.getPicNewPos(showIndex);
}

/*
* 功  能: 构建内容
* 作  者: IRD ShiCH
* 参  数: null
* 返回值: null
*/
SliderPic.prototype.build = function(){
    var cH = this.imgHeight + this.spaceWidth * 2 + 2 ;
    var cW = this.container.offsetWidth;
    var str = [];
    str[str.length] = "<div class=\"SliderPicDiv\" style=\"width:"+cW+"px;height:"+cH+"px\">";
    str[str.length] = " <table cellSpacing=\"0\" cellPadding=\"0\" border=\"0\" height=\"100%\" align=\"center\">";
    str[str.length] = "   <tr>";
    str[str.length] = "   </tr>";
    str[str.length] = " </table>";
    str[str.length] = "</div>";
    this.container.innerHTML = str.join("");

    if(this.dataType == 1){
        this.buildXml();
    }else if(this.dataType == 2){
        this.buildJson();
    }

    // 2009-8-18 解决内存泄漏问题
    str = null;
}

/*
* 功  能: 构建以XML为数据源内容
* 作  者: IRD ShiCH
* 参  数: null
* 返回值: null
*/
SliderPic.prototype.buildXml = function(){
    var rows = this.data.selectNodes(".//row");
    var rLen = rows.length;
    if(rLen == 0){return;}
    var trObj = this.$T("tr",this.container)[0];

    for(var i=0;i<rLen;i++){
        var curRow  = rows[i];
        var src     = curRow.getAttribute("src");
        var id      = curRow.getAttribute("id");
        this.$A(this.createDomElement(i,id,src),trObj);
    }
    this.adjustPicPos();
    this.attachEvent();

    // 2009-8-18 解决内存泄漏问题
    trObj = null;
}

/*
* 功  能: 构建以JSON为数据源内容
* 作  者: IRD ShiCH
* 参  数: null
* 返回值: null
*/
SliderPic.prototype.buildJson = function(){
    var trObj = this.$T("tr",this.container)[0];
    var count = 0;
    for(var item in this.data){
        var src     = this.data[item].src;
        var id      = this.data[item].id;
        this.$A(this.createDomElement(count,id,src),trObj);
        count++;
    }

    if(count != 0){
        this.adjustPicPos();
        this.attachEvent();
    }

    // 2009-8-18 解决内存泄漏问题
    trObj = null;
}

/*
* 功  能: 使用Dom构建内容
* 作  者: IRD ShiCH
* 参  数: 序号,数据id,图片地址
* 返回值: td对象
*/
SliderPic.prototype.createDomElement = function(order,id,src){
    var oThis   = this;
    var td      = this.$C("td");

    var div     = this.$C("div");
    this.$A(div,td);

    var table   = this.$C("table",{
        cellSpacing:"0",
        cellPadding:"0",
        className:"ta1"
    });
    var tb      = this.$C("tbody");
    var tr      = this.$C("tr");
    var tdL     = this.$C("td");
    var tdC     = this.$C("td");
    var tdR     = this.$C("td");
    this.$A(table,div);
    this.$A(tb,table);
    this.$A(tr,tb);
    this.$A(tdL,tr);
    this.$A(tdC,tr);
    this.$A(tdR,tr);
    var table2  = this.$C("table",{
        cellSpacing:"0",
        cellPadding:"0"
    });
    var tb2     = this.$C("tbody");
    var trT     = this.$C("tr");
    var trM     = this.$C("tr");
    var trB     = this.$C("tr");
    var tdT     = this.$C("td");
    var tdM     = this.$C("td",{className:"mainTD"});
    var tdB     = this.$C("td");
    this.$A(table2,tdC);
    this.$A(tb2,table2);
    this.$A(trT,tb2);
    this.$A(tdT,trT);
    this.$A(trM,tb2);
    this.$A(tdM,trM);
    this.$A(trB,tb2);
    this.$A(tdB,trB);

    var lDiv      = this.$C("div",{className:"borderDiv"});
    this.$A(lDiv,tdL);

    var rDiv      = this.$C("div",{className:"borderDiv"});
    this.$A(rDiv,tdR);

    var tDiv      = this.$C("div",{className:"borderDiv"});
    this.$A(tDiv,tdT);

    var bDiv      = this.$C("div",{className:"borderDiv"});
    this.$A(bDiv,tdB);

    lDiv.style.opacity = rDiv.style.opacity = tDiv.style.opacity = bDiv.style.opacity = 0.2;

    var cDiv = this.$C("div",{className:"imgDiv"});
    this.$A(cDiv,tdM);

    var img       = this.$C("img",{
        dataID:id,
        _showOrder:order,
        src:src
    });
    this.$A(img,cDiv);

    var image = new Image();
    image.target = img;
    image.order = order;

    if(/msie/i.test(navigator.userAgent)){
        image.onreadystatechange = function(){
            if(this.readyState == "complete"){
                this.target.setAttribute("_width",this.width);
                this.target.setAttribute("_height",this.height);
                this.target.setAttribute("_loaded","true");
                oThis.fitCurrentImage(this.order);
                oThis.removeObject(this);
            }
        }
    }else{
        image.onload = function(){
            this.target.setAttribute("_width",this.width);
            this.target.setAttribute("_height",this.height);
            this.target.setAttribute("_loaded","true");
            oThis.fitCurrentImage(this.order);
            oThis.removeObject(this);
        }
    }
    image.src = src;

    this.tempData[order] = {imgObj:img,divObj:div,imgDiv:cDiv};

    // 2009-8-18 解决内存泄漏问题
    table2 = tb2 = trT = trM = trB = tdT = tdM = tdB = lDiv = rDiv = tDiv = bDiv = cDiv = img = div = null;
    try{
        return td;
    }finally{
        td = null;
    }
}

SliderPic.prototype.removeObject = function(obj){
    obj = null;
}

/*
* 功  能: 调整图片位置
* 作  者: IRD ShiCH
* 参  数: null
* 返回值: null
*/
SliderPic.prototype.adjustPicPos = function(){
    for(var i=0,iLen=this.tempData.length;i<iLen;i++){
        var curImg = this.tempData[i].imgObj;
        var divObj = this.tempData[i].divObj;

        var cW = this.F(this.imgWidth/(i*1.5 + 1));
        var cH = this.F(this.imgHeight/(i*1.5 + 1));
        var cL = this.F(-i*this.imgWidth/iLen);
        this.tempData[i].cW = cW;
        this.tempData[i].cH = cH;
        this.tempData[i].cL = cL;
        this.tempData[i].cT = 0;
        this.tempData[i].zI = iLen - i;

        this.resizePic(i);

        curImg = divObj = cW = cH = cL = null;
    }
}

/*
* 功  能: 调整图片大小及位置
* 作  者: IRD ShiCH
* 参  数: 图像序号
* 返回值: null
*/
SliderPic.prototype.resizePic = function(order){
    var curImg = this.tempData[order].imgObj;
    var conDiv = this.tempData[order].divObj;
    var imgDiv = this.tempData[order].imgDiv;
    
    var cW = this.tempData[order].cW;
    var cH = this.tempData[order].cH;
    var cL = this.tempData[order].cL;
    var cT = this.tempData[order].cT;
    var zI = this.tempData[order].zI;
    
    var countW = this.F(cW),countH = this.F(cH);
    imgDiv.style.width = countW + "px";
    imgDiv.style.height = countH + "px";
    
    if(curImg.getAttribute("_loaded") == "true"){
        this.fitCurrentImage(order);
    }
    var divs = this.$T("div",conDiv);
    var lDiv = divs[0];
    var tDiv = divs[1];
    var bDiv = divs[3];
    var rDiv = divs[4];
    if(null == lDiv || null == tDiv || null == bDiv || null == rDiv) return;

    lDiv.style.height = this.F(cH) + (this.spaceWidth * 2) + "px";
    lDiv.style.width = this.spaceWidth + "px";

    tDiv.style.width = this.F(cW) + "px";
    tDiv.style.height = this.spaceWidth + "px";

    bDiv.style.width = this.F(cW) + "px";
    bDiv.style.height = this.spaceWidth + "px";

    rDiv.style.height = this.F(cH) + (this.spaceWidth * 2) + "px";
    rDiv.style.width = this.spaceWidth + "px";
    
    if(cL != null && cT != null && zI != null){
        conDiv.style.position = "relative";
        conDiv.style.left = this.F(cL) + "px";
        conDiv.style.top = this.F(cT) + "px";
        conDiv.style.zIndex = zI;
    }

    // 2009-8-18 解决内存泄漏问题
    curImg = conDiv = imgDiv = divs = lDiv = rDiv = bDiv = rDiv = cW = cH = cL = cT = zI = null;
}

SliderPic.prototype.fitCurrentImage = function(order){
    if(this.tempData[order] == null) return;
    var curImg = this.tempData[order].imgObj;
    var cW = this.tempData[order].cW;
    var cH = this.tempData[order].cH;
    var countW = this.F(cW),countH = this.F(cH);

    var imgDW = curImg.getAttribute("_width");
    var imgDH = curImg.getAttribute("_height");
    var toCH = this.F(countW * imgDH/imgDW);
    if(toCH < countH){
        var toCW = this.F(countH * imgDW/imgDH);
        curImg.style.width = toCW + "px";
        curImg.style.height = countH + "px";
    }else{
        curImg.style.width = countW + "px";
        curImg.style.height = toCH + "px";
    }
    curImg = null;
}

/*
* 功  能: 添加事件
* 作  者: IRD ShiCH
* 参  数: null
* 返回值: null
*/
SliderPic.prototype.attachEvent = function(){
    var oThis = this;
    for(var i=0,iLen=this.tempData.length;i<iLen;i++){
        var curImg = this.tempData[i].imgObj;
        var divObj = this.tempData[i].divObj;
        var order = curImg.getAttribute("_showOrder");
        divObj.setAttribute("_order",order);

        divObj.onclick = function(){
            var order = this.getAttribute("_order");
            oThis.getPicNewPos(order);
        }
        curImg = divObj = null;
    }
}

/*
* 功  能: 重新调整图片大小
* 作  者: IRD ShiCH
* 参  数: 图片序号
* 返回值: null
*/
SliderPic.prototype.getPicNewPos = function(order){
    var imgElm = this.tempData[order].imgObj;
    if(this.tempData[order].cW == this.imgWidth && this.tempData[order].cH == this.imgHeight){
        this.clickEvt(imgElm);
        return;
    }

    var iLen = this.tempData.length;
    for(var i=order;i>=0;i--){
        var nW = this.F(this.imgWidth/((order - i)*1.5 + 1));
        var nH = this.F(this.imgHeight/((order - i)*1.5 + 1));
        var nL = this.F(-i*this.imgWidth/iLen);

        this.tempData[i].nW = nW;
        this.tempData[i].nH = nH;
        this.tempData[i].nL = nL;
        this.tempData[i].nT = 0;
        this.tempData[i].nzI = iLen-(order - i);

        nW = nH = nL = null;

        this.moveBlock(i);
    }
    for(var j=(this.F(order)+1);j<iLen;j++){
        var nW = this.F(this.imgWidth/((j-order)*1.5 + 1));
        var nH = this.F(this.imgHeight/((j-order)*1.5 + 1));
        var nL = this.F(-j*this.imgWidth/iLen);

        this.tempData[j].nW = nW;
        this.tempData[j].nH = nH;
        this.tempData[j].nL = nL;
        this.tempData[j].nT = 0;
        this.tempData[j].nzI = iLen-j;

        nW = nH = nL = null;

        this.moveBlock(j);
    }

    imgElm = null;
}

/*
* 功  能: 调整图片动画
* 作  者: IRD ShiCH
* 参  数: 图片序号
* 返回值: null
*/
SliderPic.prototype.moveBlock = function(order){
    var oThis   = this;
    var curImg  = this.tempData[order].imgObj;
    var cW      = this.tempData[order].cW;
    var cH      = this.tempData[order].cH;
    var czI     = this.tempData[order].zI;
    
    var nW      = this.tempData[order].nW;
    var nH      = this.tempData[order].nH;
    var nzI     = this.tempData[order].nzI;

    var tarW,tarH,tarL;

    var mW = this.F(this.A(this.F(nW) - this.F(cW))/this.moveRate);
    mW = mW < 1 ? 1 : mW;
    if(this.F(nW) > this.F(cW)){
        if(this.F(nW) < this.F(cW) + mW){
            tarW = this.F(nW);
            this.tempData[order].wLoaded = true;
        }else{
            tarW = this.F(cW) + mW;
        }
    }else{
        if(this.F(nW) > this.F(cW) - mW){
            tarW = this.F(nW);
            this.tempData[order].wLoaded = true;
        }else{
            tarW = this.F(cW) - mW;
        }
    }

    var mH = this.F(this.A(this.F(nH) - this.F(cH))/this.moveRate);
    mH = mH < 1 ? 1 : mH;
    if(this.F(nH) > this.F(cH)){
        if(this.F(nH) < this.F(cH) + mH){
            tarH = this.F(nH);
            this.tempData[order].hLoaded = true;
        }else{
            tarH = this.F(cH) + mH;
        }
    }else{
        if(this.F(nH) > this.F(cH) - mH){
            tarH = this.F(nH);
            this.tempData[order].hLoaded = true;
        }else{
            tarH = this.F(cH) - mH;
        }
    }

    this.tempData[order].cW = tarW;
    this.tempData[order].cH = tarH;
    this.tempData[order].zI = nzI;

    this.resizePic(order);

    if(!(this.tempData[order].wLoaded && this.tempData[order].hLoaded)){
        setTimeout(function(){
            oThis.moveBlock(order);
        },10);
    }else{
        this.tempData[order].wLoaded = false;
        this.tempData[order].hLoaded = false;
    }

    curImg = cW = cH = czI = nW = nH = nzI = mW = mH = tarW = tarH = tarL = null;
}

/*
* 功  能: Math.floor方法缩写
* 作  者: IRD ShiCH
* 参  数: 原值
* 返回值: Math.floor(原值);
*/
SliderPic.prototype.F = function(number){
    return Math.floor(number);
}

/*
* 功  能: Math.abs方法缩写
* 作  者: IRD ShiCH
* 参  数: 原值
* 返回值: Math.abs(原值);
*/
SliderPic.prototype.A = function(number){
    return Math.abs(number);
}