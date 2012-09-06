/*
* ��  ��: CPUʹ����չ��AS
* ��  ��: IRD ShiCH
* ��  ��: 2009-4-14
*/

// http�����ַ
_URL_CPU = datasrc;

//������̨�����������ݣ������ݶ�λ����̨�����Ͻ�;
Stage.align  = "TL";
Stage.scaleMode = "noScale";
_quality = "BEST";

var gridLayer:MovieClip = _root.createEmptyMovieClip("gridLayer",this.getNextHighestDepth());
var gridPointLayer:MovieClip = _root.createEmptyMovieClip("gridPointLayer",this.getNextHighestDepth());
var gridNodeInfoLayer:MovieClip = _root.createEmptyMovieClip("gridPointInfoLayer",this.getNextHighestDepth());

// ��¼ѭ������
var runCount:Number = 0;
// gridֵ����
var gridPoint:Array = [];

// ������
var gridWidth = 290;
// �����ƶ���С
var gridMoveMarge:Number = 2;

// ��ʾ��Ϣ��ɫ
_INFOMCCOLOE = "0xF9F900";
// ��ʾ�ڵ���ɫ
_INFONODECOLOR = "0x643801";

//==============================================
// ȡ����
//==============================================
function GetCpuData(){
    var xmlData:XML = new XML();
    xmlData.contentType = "application/octet-stream";
    xmlData.ignoreWhite = true;

    xmlData.onLoad = function(success) {
        var responseNode:Object = this.firstChild;    //�õ�RESPONSE�ڵ�
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
// ��������
//==============================================
function BuildData(showValue:String,showTitle:String){
    titleTxt.text = showTitle;
    drawGrid(showValue);
}

//==============================================
// ���������
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
// ���ػ����ߺͽڵ㷽��
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
// ������
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
// ������������
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
// ����ʾ��Ϣ�ڵ�
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
// ��ӽڵ��¼�
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
// ��ʾ�ڵ���ʾ��Ϣ
//==============================================
function ShowDetailNodeInfo(x:Number, y:Number, order:Number){
    var NodeInfoMC:MovieClip = gridNodeInfoLayer["NodeInfoMC"];
    if(null == NodeInfoMC){
        NodeInfoMC = gridNodeInfoLayer.createEmptyMovieClip("NodeInfoMC",gridNodeInfoLayer.getNextHighestDepth());
    }
    // ��������
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
// ���ؽڵ���ʾ��Ϣ
//==============================================
function HideDetailNodeInfo(){
    var NodeInfoMC:MovieClip = gridNodeInfoLayer["NodeInfoMC"];
    var NodeInfoTX:TextField = NodeInfoMC["nodeInfoTX"];
    if(null != NodeInfoTX){    
        NodeInfoTX.removeTextField();
    }
}

//==============================================
// �Ҽ��˵���Ϣ
//==============================================
var menu = new ContextMenu();
menu.hideBuiltInItems();
//menu.customItems.push(new ContextMenuItem("..�����������μ����ϵͳ�������޹�˾..",resoftMenu));
_root.menu = menu;

//==============================================
// �Ҽ��˵��������
//==============================================
function resoftMenu(){
    getURL("http://www.resoft.css.com.cn","_blank");
}

//==============================================
// ��һ�μ������ݼ�ÿ���һ����ȡ����
//==============================================
GetCpuData();
setInterval(function(){GetCpuData()},1000);