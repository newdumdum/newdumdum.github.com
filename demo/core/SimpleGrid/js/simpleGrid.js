/*
* 功  能：简单的GRID控件，提供点击表头排序功能
* 作  者：史纯华
*/
function SimpleGrid(){
    // XML内容数据
    this.data = null;

    // 翻页数据
    this.pageData = null;

    // 容器
    this.container = null;

    // 表头列数据
    this.dataColumn = [];

    // 表头列对应内容的位置信息
    this.columnAlign = [];

    // 是否使用前台排序
    this.frontOrder = true;

    // 记录当前是哪一列在排序
    this.orderColumn = null;

    // 检验数字的正则表达式
    this.numberReg = /(^\-{0,1}\d+\.{0,1}\d+$)|(^\-{0,1}\d+$)/;

    //数字有可能被格式化成千分位显示，这种情况需要考虑
    this.thousandNumReg= /^\-{0,1}(\d{1,3},){0,}\d{1,3}$|^\-{0,1}(\d{1,3},){0,}\d{1,3}.\d{1,2}$/;

    //数字有可能被格式化成百分数；
    this.percentNumReg =  /^\-{0,1}(\d{1,3},){0,}\d{1,3}%$|^\-{0,1}(\d{1,3},){0,}\d{1,3}.\d{1,2}%$/;

    // 汇总行
    this.totalRow = null;

    // 是否可拖动列
    this.canResize = false;

    // 是否固定表头
    this.fiexedTitle = false;
}


SimpleGrid.prototype.$ = function(id){
    return document.getElementById(id);
}
SimpleGrid.prototype.$C = function(tagName,attrObject){
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
SimpleGrid.prototype.$A = function(elm,pElm){
    return pElm ? pElm.appendChild(elm) : document.body.appendChild(elm);
}
SimpleGrid.prototype.$R = function(elm,pElm){
    return pElm ? pElm.removeChild(elm) : document.body.removeChild(elm);
}

SimpleGrid.prototype.Load = function(data,pageData){
    this.CheckBrowser();
    this.bakData = data.cloneNode(true);
    this.data = data;
    this.pageData = pageData;
    this.SetUUID();
    this.CheckTotalRow();
    this.BuildTable();
    this.BuildTitle();
    this.BuildBody();
    this.BuildPage();
    this.AddResizeCommand();
}

SimpleGrid.prototype.CheckTotalRow = function(){
    var dataNode = this.data.selectSingleNode(".//data");
    var tRow = dataNode.selectSingleNode(".//row[@isSummary]");
    if(null != tRow){
        this.totalRow = tRow.cloneNode(true);
        var pNode = tRow.parentNode;
        pNode.removeChild(tRow);
    }
}

SimpleGrid.prototype.SetUUID = function(){
    var dataNode = this.data.selectSingleNode(".//data");
    var rows = dataNode.selectNodes(".//row");
    for(var i=0;i<rows.length;i++){
        rows[i].setAttribute("_uuid",(i+1));
    }
}

SimpleGrid.prototype.BuildTable = function(){
    var str = [];
    str[str.length] = "<table cellSpacing=\"0\" cellPadding=\"0\" border=\"0\" class=\"simpleGridTable\">";
    str[str.length] = "   <tbody>";
    str[str.length] = "   </tbody>";
    str[str.length] = "</table>";
    this.container.innerHTML = str.join("");
}

SimpleGrid.prototype.BuildTitle = function(){
    var oThis = this;
    var columnNode = this.data.selectSingleNode(".//column");
    this.showOrder = columnNode.getAttribute("showOrder") == "true" ? true : false;
    var labels = columnNode.selectNodes(".//label");
    var tbody = this.container.getElementsByTagName("tbody")[0];

    var tr = this.$C("tr",{className:this.fiexedTitle ? "simpleGridTitleTr_Fiexed" : "simpleGridTitleTr"});
    this.$A(tr,tbody);
    if(this.showOrder){
        var td = this.$C("td",{className:"simpleGridTitleOrderTd",innerHTML:"序号"});
        this.$A(td,tr);
        td.style.width = "30px";
    }

    for(var i=0;i<labels.length;i++){
        var att = labels[i].getAttribute("name");
        var align = labels[i].getAttribute("align");
        var width = labels[i].getAttribute("width");
        var disableOrder = labels[i].getAttribute("disableOrder");
        this.dataColumn[this.dataColumn.length] = att;
        this.columnAlign[this.columnAlign.length] = align;

        var td = this.$C("td");
        if(!this.showOrder && i == 0){
            td.className = "simpleGridTitleFirstTd";
        }else{
            td.className = "simpleGridTitleTd";
        }
        if(width != null){
            td.style.width = width + "px";
        }

        var div = this.$C("div",{
            className:"simpleGridTitleDiv_Normal",
            innerHTML:labels[i].firstChild.nodeValue,
            labelID:att,
            disableOrder:disableOrder
        });
        this.$A(td,tr);
        this.$A(div,td);

        div.onclick = function(){
            if(this.getAttribute("disableOrder") == "true"){return;};
            window.status = "排序中,请稍等...";
            if(null != oThis.orderColumn && oThis.orderColumn != this){
                oThis.orderColumn.className = "simpleGridTitleDiv_Normal";
                oThis.orderColumn.removeAttribute("direction");
            }
            oThis.orderColumn = this;

            var labelID = this.getAttribute("labelID");
            var direction = this.getAttribute("direction");
            if(direction == null){
                this.setAttribute("direction","1");
                direction = 1;
                this.className = "simpleGridTitleDiv_Down";
            }else if(direction == 1){
                this.setAttribute("direction","0");
                direction = 0;
                this.className = "simpleGridTitleDiv_Up";
            }else{
                this.setAttribute("direction","1");
                direction = 1;
                this.className = "simpleGridTitleDiv_Down";
            }
            oThis.RebuildBody(labelID,direction);
            window.status = "";
        }
    }
}

SimpleGrid.prototype.BuildBody = function(){
    var oThis = this;
    this.highLightTR = {};

    var dataNode = this.data.selectSingleNode(".//data");
    var rows = dataNode.selectNodes(".//row");

    var labels = this.data.selectNodes(".//label");

    var tbody = this.container.getElementsByTagName("tbody")[0];

    for(var i=0;i<rows.length;i++){
        var curRow = rows[i];
        var uuid = curRow.getAttribute("_uuid");

        var tr = this.$C("tr",{className:"simpleGridBodyTr"});
        if(i % 2 != 0){
            tr.style.backgroundColor = "#FAFAFA";
        }else{
            tr.style.backgroundColor = "#FFF";
        }
        this.$A(tr,tbody);

        tr.setAttribute("_uuid",uuid);
        this.AddTRCommand(tr);
        
        if(this.showOrder){
            var td = this.$C("td",{className:"simpleGridOrderTd",innerHTML:(i+1)});
            this.$A(td,tr);
        }

        var clickEvt = curRow.getAttribute("clickEvent");
        var ___clickObj = null;
        if(null != clickEvt && "" != clickEvt){
            try{
                eval("___clickObj="+clickEvt);
            }catch(e){
            }
        }

        for(var j=0;j<this.dataColumn.length;j++){
            var width = labels[j].getAttribute("width");
            var td = this.$C("td");
            var rowDiv = this.$C("div",{
                className:"simpleGridBodyDiv",
                innerHTML:curRow.getAttribute(this.dataColumn[j]),
                title:curRow.getAttribute(this.dataColumn[j])
            });
            if(!this.showOrder && j == 0){
                td.className = "simpleGridBodyFirstTd";
            }else{
                td.className = "simpleGridBodyTd";
            }
            this.$A(rowDiv,td);

            if(null != this.columnAlign[j]){
                rowDiv.style.textAlign = this.columnAlign[j];
            }
            if(null != width){
                td.style.width = width + "px";
                rowDiv.style.width = width - 3 + "px";
            }
            this.$A(td,tr);

            if(null != ___clickObj){
                if(null != ___clickObj[this.dataColumn[j]]){
                    td.attachEvent("onclick",___clickObj[this.dataColumn[j]]);
                }
            }
        }
    }

    // 汇总行

    if(null != this.totalRow){
        var tTr = this.$C("tr",{className:"simpleGridTotalTr"});
        this.$A(tTr,tbody);
        
        if(this.showOrder){
            var tTd = this.$C("td",{className:"simpleGridOrderTd",innerHTML:(rows.length+1)});
            this.$A(tTd,tTr);
        }

        for(var k=0;k<this.dataColumn.length;k++){
            var tTd = this.$C("td");
            var tDiv = this.$C("div",{
                className:"simpleGridBodyDiv",
                title:this.totalRow.getAttribute(this.dataColumn[k]),
                innerHTML:this.totalRow.getAttribute(this.dataColumn[k])
            });
            if(!this.showOrder && k == 0){
                tTd.className = "simpleGridBodyFirstTotalTd";
            }else{
                tTd.className = "simpleGridTotalTd";
            }
            this.$A(tDiv,tTd);
            if(null != this.columnAlign[k]){
                tDiv.style.textAlign = this.columnAlign[k];
            }
            this.$A(tTd,tTr);
        }
    }
}

SimpleGrid.prototype.RebuildBody = function(labelID,direction){
    var oThis = this;
    if(this.frontOrder){
        this.RemoveTR();
        
        var tbody = this.container.getElementsByTagName("tbody")[0];
        var arr = this.GetOrderedUUID(labelID,direction);
        var dataNode = this.data.selectSingleNode(".//data");

        for(var i=0;i<arr.length;i++){
            var uuid = arr[i];
            var curRow = dataNode.selectSingleNode(".//row[@_uuid='"+uuid+"']");

            var tr = this.$C("tr",{className:"simpleGridBodyTr",_uuid:uuid});
            if(i % 2 != 0){
                tr.style.backgroundColor = "#FAFAFA";
            }else{
                tr.style.backgroundColor = "#FFF";
            }
            this.$A(tr,tbody);

            this.AddTRCommand(tr);
            if(uuid == this.highLightTR.dataID){              
                oThis.highLightTR.color = tr.style.backgroundColor;
                tr.removeAttribute("style");
                tr.className = "simpleGridBodyTrHighLight";
                oThis.highLightTR.obj = tr;
                oThis.highLightTR.dataID = tr.getAttribute("_uuid");
            }

            
            if(this.showOrder){
                var td = this.$C("td",{className:"simpleGridOrderTd",innerHTML:(i + 1)});
                this.$A(td,tr);
            }

            var clickEvt = curRow.getAttribute("clickEvent");
            var ___clickObj = null;
            if(null != clickEvt && "" != clickEvt){
                try{
                    eval("___clickObj="+clickEvt);
                }catch(e){
                }
            }

            for(var j=0;j<this.dataColumn.length;j++){
                var td = this.$C("td");
                var rowDiv = this.$C("div",{
                    className:"simpleGridBodyDiv",
                    title:curRow.getAttribute(this.dataColumn[j]),
                    innerHTML:curRow.getAttribute(this.dataColumn[j])
                });
                if(!this.showOrder && j == 0){
                    td.className = "simpleGridBodyFirstTd";
                }else{
                    td.className = "simpleGridBodyTd";
                }
                this.$A(rowDiv,td);

                if(null != this.columnAlign[j]){
                    rowDiv.style.textAlign = this.columnAlign[j];
                }
                this.$A(td,tr);
                if(this.titleItemWidthArr != null && this.titleItemWidthArr.length >= this.dataColumn.length){
                    var width = this.titleItemWidthArr[(this.showOrder ? j+1 : j)];
                    td.style.width = width + "px";
                    rowDiv.style.width = width - 3 + "px";
                }

                if(null != ___clickObj){
                    if(null != ___clickObj[this.dataColumn[j]]){
                        td.attachEvent("onclick",___clickObj[this.dataColumn[j]]);
                    }
                }
            }
        }

        // 汇总行

        if(null != this.totalRow){
            var tTr = this.$C("tr",{className:"simpleGridTotalTr"});
            var tRLen = dataNode.selectNodes(".//row").length;
            this.$A(tTr,tbody);
            
            if(this.showOrder){
                var tTd = this.$C("td",{className:"simpleGridOrderTd",innerHTML:(tRLen+1)});
                this.$A(tTd,tTr);
            }

            for(var k=0;k<this.dataColumn.length;k++){
                var tTd = this.$C("td");
                var tDiv = this.$C("div",{
                    className:"simpleGridBodyDiv",
                    innerHTML:this.totalRow.getAttribute(this.dataColumn[k])
                });
                if(!this.showOrder && k == 0){
                    tTd.className = "simpleGridBodyFirstTotalTd";
                }else{
                    tTd.className = "simpleGridTotalTd";
                }
                this.$A(tDiv,tTd);
                if(null != this.columnAlign[k]){
                    tDiv.style.textAlign = this.columnAlign[k];
                }
                this.$A(tTd,tTr);
                if(this.titleItemWidthArr != null && this.titleItemWidthArr.length >= this.dataColumn.length){
                    var width = this.titleItemWidthArr[(this.showOrder ? k+1 : k)];
                    tTd.style.width = width + "px";
                    tDiv.style.width = width - 3 + "px";
                }
            }
        }
    }else{
        this.OrderColumnOnClick(labelID,direction);
    }
}

SimpleGrid.prototype.GetOrderedUUID = function(labelID,direction){
    var dataArr = [];
    var tmpArr = [];
    var uuidArr = [];
    var tmpUuidArr = [];

    var isNum = this.CheckNumber(labelID);

    var dataNode = this.data.selectSingleNode(".//data");
    var rows = dataNode.selectNodes(".//row");
    for(var i=0;i<rows.length;i++){
        dataArr[dataArr.length] = isNum ? this.ParseNumber(rows[i].getAttribute(labelID)) : rows[i].getAttribute(labelID);
        tmpArr[tmpArr.length] = isNum ? this.ParseNumber(rows[i].getAttribute(labelID)) : rows[i].getAttribute(labelID);
        tmpUuidArr[tmpUuidArr.length] = rows[i].getAttribute("_uuid");
    }

    function asc(x,y){return x > y ? 1 : -1;}
    function desc(x,y){return x > y ? -1 : 1;}  

    1 == direction ? dataArr.sort(asc) : dataArr.sort(desc);
    for(var j=0;j<dataArr.length;j++){
        var index = tmpArr.Index(dataArr[j]);
        delete tmpArr[index];
        uuidArr[uuidArr.length] = tmpUuidArr[index];
    }

    return uuidArr;
}

SimpleGrid.prototype.CheckNumber = function(labelID){
    var dataNode = this.data.selectSingleNode(".//data");
    var rows = dataNode.selectNodes(".//row");

    var isNum = true;

    for(var i=0;i<rows.length;i++){
        var value = rows[i].getAttribute(labelID);
        if((this.numberReg.test(value))||(this.thousandNumReg.test(value))||(this.percentNumReg.test(value))){
			      continue;           
        }else{
            isNum = false;
            break;
        }
    }
    return isNum;
}

SimpleGrid.prototype.ParseNumber = function(inputStr){
    var number = 0;
    if (this.numberReg.test(inputStr)){
        number = Number(inputStr);
    }else if(this.thousandNumReg.test(inputStr)){
        len = inputStr.split(",").length;
        for(index=0;index<len;index++){
            inputStr = inputStr.replace(",","");
        }
        number = Number(inputStr);
    } else if (this.percentNumReg.test(inputStr)) {
        len = inputStr.split(",").length;
        for(index=0;index<len;index++){
            inputStr = inputStr.replace(",","");
        }
        number = Number(inputStr.replace("%",""));
    }
    return number;
}

SimpleGrid.prototype.RemoveTR = function(){
    var tbody = this.container.getElementsByTagName("tbody")[0];;
    var trs = tbody.getElementsByTagName("tr");
    var arr = [];
    if(trs.length > 1){
        for(var i=1;i<trs.length;i++){
            var curTr = trs[i];
            arr.push(curTr);
        }
    }

    for(var j=0;j<arr.length;j++){
        this.$R(arr[j],tbody);
    }
}

SimpleGrid.prototype.BuildPage = function(){
    if(this.pageData == null){
        return;
    }
    this.totalPage = this.pageData.getAttribute("totalPage");
    this.curPage = this.pageData.getAttribute("curPage");

    if(this.numberReg.test(this.totalPage)){
        if(Number(this.totalPage) > 1){
            this.CreatePageBody();
            this.frontOrder = false;
        }
    }
}

SimpleGrid.prototype.CreatePageBody = function(){
    var oThis = this;

    var pageDiv = this.$C("div",{className:"simpleGridPageDiv"});
    this.$A(pageDiv,this.container);

    var firstSpan = this.$C("span"),previewSpan = this.$C("span"),pageSpan = this.$C("span"),nextSpan = this.$C("span"),lastSpan = this.$C("span");
    firstSpan.className = previewSpan.className = nextSpan.className = lastSpan.className = "goPageSpan";
    pageSpan.className = "selectPageSpan";
    this.$A(firstSpan,pageDiv);
    this.$A(previewSpan,pageDiv);
    this.$A(pageSpan,pageDiv);
    this.$A(nextSpan,pageDiv);
    this.$A(lastSpan,pageDiv);

    firstSpan.innerHTML = "9";
    firstSpan.title = "首页";
    firstSpan.onclick = function(){
        if(oThis.curPage != 1){
            oThis.GoPage(1);
        }else{
            alert("已经是第一页");
        }
    }
    
    previewSpan.innerHTML = "3";
    previewSpan.title = "上一页";
    previewSpan.onclick = function(){
        if(parseInt(oThis.curPage) - 1 < 1){
            alert("已经是第一页");
        }else{
            oThis.GoPage(parseInt(oThis.curPage) - 1);
        }
    }
    
    nextSpan.innerHTML = "4";
    nextSpan.title = "下一页";
    nextSpan.onclick = function(){
        if(parseInt(oThis.curPage) + 1 > parseInt(oThis.totalPage)){
            alert("已经是最后一页");
        }else{
            oThis.GoPage(parseInt(oThis.curPage) + 1);
        }
    }
    
    lastSpan.innerHTML = ":";
    lastSpan.title = "末页";
    lastSpan.onclick = function(){
        if(parseInt(oThis.curPage) != parseInt(oThis.totalPage)){
            oThis.GoPage(oThis.totalPage);
        }else{
            alert("已经是最后一页");
        }
    }

    var pageSelect = this.$C("select",{className:"gridPageSelect"});
    this.$A(pageSelect,pageSpan);
    for(var i=1;i<=this.totalPage;i++){
        var option = new Option(i,i);
        pageSelect.options.add(option);
        if(i == this.curPage){
            pageSelect.options[i-1].selected = true;
        }
    }
    pageSelect.onchange = function(){
        oThis.GoPage(this.options[this.selectedIndex].value);
    }
}

SimpleGrid.prototype.GetXML = function(){
    return this.bakData;
}

SimpleGrid.prototype.GoPage = function(page){
}

SimpleGrid.prototype.OrderColumnOnClick = function(labelID,direction){
}

SimpleGrid.prototype.AddResizeCommand = function(){
    if(this.canResize){
        var table = this.container.getElementsByTagName("table")[0];
        this.AddTableResizeCommand(table);
    }
}

SimpleGrid.prototype.AddTRCommand = function(trObj){
    var oThis = this;
    trObj.onmouseover = function(){
        if(this != oThis.highLightTR.obj){
            this.className = "simpleGridBodyTrOver";
        }
    }
    trObj.onmouseout = function(){
        if(this != oThis.highLightTR.obj){
            this.className = "simpleGridBodyTr";
        }
    }
    trObj.onclick = function(){
        if(null != oThis.highLightTR.obj){
            oThis.highLightTR.obj.className = "simpleGridBodyTr";
            oThis.highLightTR.obj.style.backgroundColor = oThis.highLightTR.color;
        }
        oThis.highLightTR.color = this.style.backgroundColor;
        this.removeAttribute("style");
        this.className = "simpleGridBodyTrHighLight";
        oThis.highLightTR.obj = this;
        oThis.highLightTR.dataID = this.getAttribute("_uuid");
    }
}

SimpleGrid.prototype.AddTableResizeCommand = function(table){
    var oThis = this;
    table.style.tableLayout = "fixed";
    table.style.overflow = "auto";
    var tH = table.offsetHeight - table.getElementsByTagName("tr")[table.getElementsByTagName("tr").length-1].offsetHeight;
    var headerTR = table.getElementsByTagName("tr")[0];
    var headerTDS = headerTR.getElementsByTagName("td");
    this.fixedOtherHeaderTD(headerTDS);

    for(var i=0,iLen=headerTDS.length;i<iLen;i++){
        var curTD = headerTDS[i];
        curTD.setAttribute("_cellOrder",i);
        curTD.onmousemove = function(event){
            var evt = event ? event : window.event;
            var rect = oThis.BoundingRect(this);
            var oW = this.offsetWidth;
            var oH = this.offsetHeight;
            if(evt.clientX >= rect.left + oW - 2 && evt.clientX <= rect.left + oW && evt.clientY >= rect.top && evt.clientY <= rect.top + oH || this.getAttribute("canMoved") == "true"){
                if(this.getAttribute("canMoved") != "true")
                    document.body.style.cursor = "col-resize";
                this.setAttribute("canResized","true");
            }else{
                document.body.style.cursor = "default";
                this.setAttribute("canResized","false");
            }

            var div = oThis.$("resizeGridLineDiv");
            if(null != div && div.style.display != "none"){
                with(div.style){
                    position = "absolute";
                    left = evt.clientX - rect.left - 1 >= 0 ? evt.clientX - 1 : rect.left + "px";
                    top = rect.top + document.body.scrollTop + "px";
                    width = "2px";
                    height = tH + "px";
                    borderRight = "1px dotted #999";
                    zIndex = "9999";
                }
            }
        }

        curTD.onmousedown = function(event){
            var thisTdObj = this;
            var evt = event ? event : window.event;
            if(this.getAttribute("canResized") == "true"){
                if(oThis.isIE){
                    this.setCapture();
                }else{
                    window.document.addEventListener("mouseup",thisUp=function(evt){oThis.resizeUp(evt,thisTdObj);},false);
                    evt.preventDefault();
                }
                var rect = oThis.BoundingRect(this);
                this.setAttribute("canMoved","true");
                var div = oThis.$("resizeGridLineDiv");
                if(null == div){
                    var div = oThis.$C("div",{id:"resizeGridLineDiv"});
                    oThis.$A(div);
                }
                with(div.style){
                    position = "absolute";
                    left = evt.clientX - 1 + "px";
                    top = rect.top + document.body.scrollTop + "px";
                    width = "2px";
                    height = tH + "px";
                    borderRight = "1px dotted #999";
                    zIndex = "9999";
                    display = "";
                }
            }else{
                this.setAttribute("canMoved","false");
            }
        }

        curTD.onmouseup = function(event){
            var evt = event ? event : window.event;
            if(this.getAttribute("canMoved") == "true"){
                if(oThis.isIE)
                    this.releaseCapture();

                var rect = oThis.BoundingRect(this);
                var toWidth = (evt.clientX - rect.left) <= 20 ? 20 : evt.clientX - rect.left;
                this.style.width = toWidth + "px";
                var cellOrder = this.getAttribute("_cellOrder");
                oThis.resizeBodyCell(cellOrder,toWidth);
                document.body.style.cursor = "default";
                this.setAttribute("canMoved","false");
                var div = oThis.$("resizeGridLineDiv");
                if(null != div){
                    if(div.style.display != "none"){
                        div.style.display = "none";
                    }
                }
            }
        }

        curTD.onmouseout = function(){
            document.body.style.cursor = "default";
            this.setAttribute("canResized","false");
        }
    }
}

SimpleGrid.prototype.resizeUp = function(event,elm){
    var evt = event ? event : window.event;
    if(elm.getAttribute("canMoved") == "true"){
        try{
            window.document.removeEventListener("onmouseup",thisUp,false);
        }catch(e){alert(e.description);};

        var rect = this.BoundingRect(elm);
        var toWidth = (evt.clientX - rect.left) <= 20 ? 20 : evt.clientX - rect.left;
        elm.style.width = toWidth + "px";
        var cellOrder = elm.getAttribute("_cellOrder");
        this.resizeBodyCell(cellOrder,toWidth);
        document.body.style.cursor = "default";
        elm.setAttribute("canMoved","false");
        var div = this.$("resizeGridLineDiv");
        if(null != div){
            if(div.style.display != "none"){
                div.style.display = "none";
            }
        }
    }
}


SimpleGrid.prototype.fixedOtherHeaderTD = function(headerTDS){
    this.titleItemWidthArr = [];
    for(var j=0,jLen=headerTDS.length;j<jLen;j++){
        var oTD = headerTDS[j];
        oTD.style.width = oTD.clientWidth + "px";
        this.titleItemWidthArr.push(oTD.clientWidth);
    }
}

SimpleGrid.prototype.resizeBodyCell = function(order,toWidth){
    if(this.showOrder && order == 0)
        return;
    this.titleItemWidthArr[order] = toWidth;
    var table = this.container.getElementsByTagName("table")[0];
    var oRows = table.getElementsByTagName("tr");
    for(var i=1,iLen=oRows.length;i<iLen;i++){
        var curRow = oRows[i];
        var curTd = curRow.getElementsByTagName("td")[order];
        if(null != curTd){
            curTd.style.width = toWidth + "px";
            var div = curTd.getElementsByTagName("div")[0];
            div.style.width = toWidth - 3 + "px";
        }
    }
}

SimpleGrid.prototype.BoundingRect = function(elm){
   var absTop = 0;
   var absLeft = 0;
   var tempObj = elm;
   while(tempObj != document.body){
       absTop += tempObj.offsetTop - tempObj.offsetParent.scrollTop;
       absLeft += tempObj.offsetLeft - tempObj.offsetParent.scrollLeft;
       tempObj = tempObj.offsetParent;
   }
   return {top:absTop,left:absLeft};
}

SimpleGrid.prototype.CheckBrowser = function(){
      var ua = navigator.userAgent.toUpperCase();
      this.isIE = /msie/i.test(ua);
}


Array.prototype.Index = function(str){
    var curIndex = null;
    for(var i = 0 , iLen = this.length ;i < iLen ; i ++){
        if(this[i] == str){
            curIndex = i;
            break;
        }
    }
    return curIndex;
}