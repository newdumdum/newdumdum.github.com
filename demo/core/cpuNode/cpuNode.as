/*
* 功  能: CPU使用率展现AS
* 作  者: IRD ShiCH
* 日  期: 2009-4-14
*/

// http请求地址
_URL_CPU = datasrc;

//缩放舞台并不缩放内容，将内容定位于舞台的左上角;
Stage.align  = "TL";
Stage.scaleMode = "noScale";
_quality = "BEST";

var gridLayer:MovieClip = _root.createEmptyMovieClip("gridLayer",this.getNextHighestDepth());
var gridPointLayer:MovieClip = _root.createEmptyMovieClip("gridPointLayer",this.getNextHighestDepth());
var gridNodeInfoLayer:MovieClip = _root.createEmptyMovieClip("gridPointInfoLayer",this.getNextHighestDepth());

// 记录循环次数
var runCount:Number = 0;
// grid值数组
var gridPoint:Array = [];

// 网格宽度
var gridWidth = 290;
// 网格移动大小
var gridMoveMarge:Number = 2;

// 提示信息颜色
_INFOMCCOLOE = "0xF9F900";
// 提示节点颜色
_INFONODECOLOR = "0x643801";

//==============================================
// 取数据
//==============================================
function GetCpuData(){
    var xmlData:XML = new XML();
    xmlData.contentType = "application/octet-stream";
    xmlData.ignoreWhite = true;

    xmlData.onLoad = function(success) {
        var responseNode:Object = this.firstChild;    //得到RESPONSE节点
        var CpuInfoNode:Object = responseNode.firstChild;
        var InfoNode:Object = CpuInfoNode.firstChild;
        var titleNode:Object = InfoNode.nextSibling;

        var showValue:String = InfoNode.firstChild;
        var showTitle:String = titleNode.firstChild;

        BuildData(showValue,showTitle);
    }
    xmlData.sendAndLoad(_URL_CPU,xmlData);
}

//==============================================
// 加载数据
//==============================================
function BuildData(showValue:String,showTitle:String){
    titleTxt.text = showTitle;
    drawGrid(showValue);
}

//==============================================
// 画网络横线
//==============================================
function drawHLine(){
    var hLineMC:MovieClip = gridLayer.createEmptyMovieClip("hLineMC",gridLayer.getNextHighestDepth());
    var maxY:Number = Math.floor(110/11);

    for(var i=0;i<maxY-1;i++){
        var x:Number = 5;
        var y:Number = 24 + (i + 1) * 11;
        hLineMC.moveTo(x, y);
        hLineMC.lineStyle(1, 0x008040, 100, false, "none", "none", "bevel", 1);
        hLineMC.lineTo(295, y);
    }
}
drawHLine();

//==============================================
// 加载画竖线和节点方法
//==============================================
function drawGrid(showValue:String){
    runCount ++;
    if(runCount == 6){
        runCount = 0;
    }
    drawVLine();
    drawPointLine(showValue);
}

//==============================================
// 画竖线
//==============================================
function drawVLine(){
    var vLineMC:MovieClip = gridLayer["vLineMC"];
    if(null == vLineMC){    
        vLineMC = gridLayer.createEmptyMovieClip("vLineMC",gridLayer.getNextHighestDepth());
    }
    vLineMC.clear();
    
    var maxX:Number = Math.floor(gridWidth/11);
    for(var i=0;i<maxX;i++){
        var x:Number = 4 + (i + 1) * 11 - runCount * gridMoveMarge;
        vLineMC.moveTo(x, 24);
        vLineMC.lineStyle(1, 0x008040, 100, false, "none", "none", "bevel", 1);
        vLineMC.lineTo(x, 134);

        if(runCount != 0 && i == maxX - 1 && x + 11 <= 294){
            vLineMC.moveTo(x + 11, 24);
            vLineMC.lineStyle(1, 0x008040, 100, false, "none", "none", "bevel", 1);
            vLineMC.lineTo(x + 11, 134);
        }
    }
}

//==============================================
// 画网格内折线
//==============================================
function drawPointLine(showValue:String){
    gridPointLayer._quality = "LOW";
    gridPointLayer.clear();

    var PointNodeMC:MovieClip = gridPointLayer["PointNodeMC"];
    if(null == PointNodeMC){
        PointNodeMC = gridPointLayer.createEmptyMovieClip("PointNodeMC",gridPointLayer.getNextHighestDepth());
    }else{
        PointNodeMC.clear();
    }
    
    var maxLen = Math.ceil(gridWidth/2);
    if(gridPoint.length < maxLen){
        gridPoint.push(parseInt(showValue));
    }else{
        gridPoint.shift();
        gridPoint.push(parseInt(showValue));
    }
    var iLen:Number = gridPoint.length-2;
    var oLeft:Number = 292;
    var oTop:Number = 134;
    var cHei:Number = 110;
    
    for(var i:Number = iLen ; i >= 0 ; i --){
        var curValue:Number = gridPoint[i];

        var x:Number = oLeft - (iLen - i - 1) * gridMoveMarge;
        var y:Number = oTop - (curValue/100 * cHei);
        
        if(i == iLen){
            var pValue:Number = gridPoint[i+1];
            var x2:Number = oLeft - (iLen - i) * gridMoveMarge;
            var y2:Number = oTop - (pValue/100 * cHei);
            gridPointLayer.moveTo(x2, y2);
        }
        gridPointLayer.lineStyle(1, 0x00FF00, 100, false, "normal", "round", "miter", 255);
        gridPointLayer.lineTo(x, y);

        DrowPoint(showValue,x,y,i);
    }
}

//==============================================
// 画提示信息节点
//==============================================
function DrowPoint(value:String, x:Number, y:Number,order:Number){
    var curLeft = x;
    var curTop = y;

    var PointNodeMC:MovieClip = gridPointLayer["PointNodeMC"];
    var EachNodeMC:MovieClip = PointNodeMC["EachNodeMC_"+String(order)];
    if(null == EachNodeMC){
        EachNodeMC = PointNodeMC.createEmptyMovieClip("EachNodeMC_"+String(order),PointNodeMC.getNextHighestDepth());
    }else{
        EachNodeMC.clear();
    }

    EachNodeMC.beginFill(0xFFFFFF);
    EachNodeMC.lineStyle(1,_INFOMCCOLOE, 100, true, "none", "round", "miter", 1);
    EachNodeMC.moveTo(curLeft-1, curTop-1);
    EachNodeMC.lineTo(curLeft+1, curTop-1);
    EachNodeMC.lineTo(curLeft+1,curTop+1);
    EachNodeMC.lineTo(curLeft-1,curTop+1);
    EachNodeMC.lineTo(curLeft-1, curTop-1);
    EachNodeMC.endFill();

    AddPointAction(order);
}

//==============================================
// 添加节点事件
//==============================================
function AddPointAction(order:Number){
    var PointNodeMC:MovieClip = gridPointLayer["PointNodeMC"];
    var EachNodeMC:MovieClip = PointNodeMC["EachNodeMC_"+String(order)];

    EachNodeMC.order = order;
    EachNodeMC.onRollOver = function(){
        ShowDetailNodeInfo(this._xmouse,this._ymouse,this.order);
        updateAfterEvent();
    }
    EachNodeMC.onRollOut = function(){
        HideDetailNodeInfo();
        updateAfterEvent();
    }
    HideDetailNodeInfo();
}

//==============================================
// 显示节点提示信息
//==============================================
function ShowDetailNodeInfo(x:Number, y:Number, order:Number){
    var NodeInfoMC:MovieClip = gridNodeInfoLayer["NodeInfoMC"];
    if(null == NodeInfoMC){
        NodeInfoMC = gridNodeInfoLayer.createEmptyMovieClip("NodeInfoMC",gridNodeInfoLayer.getNextHighestDepth());
    }
    // 加入文字
    var fmt:TextFormat = new TextFormat();
    fmt.font = "Verdana";
    fmt.size = 10;
    fmt.align = "center";

    var txTop:Number = (y-20) < 20 ? (y+20) : (y-20);
    var txLeft:Number = x+23 > 294 ? x - 23 : x;
    var textBox = NodeInfoMC.createTextField("nodeInfoTX", NodeInfoMC.getNextHighestDepth(), txLeft, txTop, 20, 15);
    textBox.text = gridPoint[order] + "%";
    textBox.border = true;
    textBox.borderColor = _INFONODECOLOR;
    textBox.background = true;
    textBox.backgroundColor = 0xFFFFFF;
    textBox.textColor = _INFONODECOLOR;
    textBox.autoSize = true;
    textBox.wordWrap = false;
    textBox.multiline = false;
    textBox.selectable = false;
    textBox.setTextFormat(0, textBox.length, fmt);
}

//==============================================
// 隐藏节点提示信息
//==============================================
function HideDetailNodeInfo(){
    var NodeInfoMC:MovieClip = gridNodeInfoLayer["NodeInfoMC"];
    var NodeInfoTX:TextField = NodeInfoMC["nodeInfoTX"];
    if(null != NodeInfoTX){    
        NodeInfoTX.removeTextField();
    }
}

//==============================================
// 右键菜单信息
//==============================================
var menu = new ContextMenu();
menu.hideBuiltInItems();
//menu.customItems.push(new ContextMenuItem("..北京中软融鑫计算机系统工程有限公司..",resoftMenu));
_root.menu = menu;

//==============================================
// 右键菜单点击方法
//==============================================
function resoftMenu(){
    getURL("http://www.resoft.css.com.cn","_blank");
}

//==============================================
// 第一次加载数据及每间隔一秒再取数据
//==============================================
GetCpuData();
setInterval(function(){GetCpuData()},1000);