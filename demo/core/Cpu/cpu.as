/*
* ��  ��: CPUʹ����չ��AS
* ��  ��: IRD ShiCH
* ��  ��: 2009-2-23
*/

// http�����ַ
_URL_CUP = datasrc;

//������̨�����������ݣ������ݶ�λ����̨�����Ͻ�;
Stage.align  = "TL";
Stage.scaleMode = "noScale";
_quality = "BEST";

var perLayer:MovieClip = _root.createEmptyMovieClip("perLayer",this.getNextHighestDepth());
var perOverLayer:MovieClip = _root.createEmptyMovieClip("perOverLayer",this.getNextHighestDepth());
var gridLayer:MovieClip = _root.createEmptyMovieClip("gridLayer",this.getNextHighestDepth());
var gridPointLayer:MovieClip = _root.createEmptyMovieClip("gridPointLayer",this.getNextHighestDepth());

// ��¼ѭ������
var runCount:Number = 0;
// gridֵ����
var gridPoint:Array = [];

// �����ƶ���С
var gridMoveMarge:Number = 2;

function GetCpuData(){
    var xmlData:XML = new XML();
    xmlData.contentType = "application/octet-stream";
    xmlData.ignoreWhite = true;

    xmlData.onLoad = function(success) {
        var responseNode:Object = this.firstChild;    //�õ�RESPONSE�ڵ�
        var CpuInfoNode:Object = responseNode.firstChild;
        var InfoNode:Object = CpuInfoNode.firstChild;
        var showValue:String = InfoNode.firstChild;

        BuildData(showValue);
    }
    xmlData.sendAndLoad(_URL_CUP,xmlData);
}

function BuildData(showValue:String){
    percentTxt.text = showValue + "%";
    drawPerLayer(showValue);
    drawGrid(showValue);
}

// �ٷֱ��ڸǲ�
function drawOverLayer(){
    perOverLayer.beginFill(0x000000);
    perOverLayer.moveTo(47, 30);
    perOverLayer.lineTo(47, 53);
    perOverLayer.lineTo(48, 53);
    perOverLayer.lineTo(48, 30);
    perOverLayer.lineTo(47, 30);
    perOverLayer.endFill();
}
drawOverLayer();

function drawPerLayer(showValue:String){
    perLayer.clear();

    var vCount:Number = Math.ceil(parseInt(showValue)/100*6);

    for(var i=0;i<vCount;i++){
        perBlock(i);
    }
}

function perBlock(dep:Number){
    var yNum:Number = dep*3;
    var bH:Number = 2;

    perLayer.beginFill(0x00FF00);
    perLayer.moveTo(31, 50-yNum);
    perLayer.lineTo(64, 50-yNum);
    perLayer.lineTo(64, 50-yNum+bH);
    perLayer.lineTo(31, 50-yNum+bH);
    perLayer.lineTo(31, 50-yNum);
    perLayer.endFill();
}

function drawHLine(){
    var hLineMC:MovieClip = gridLayer.createEmptyMovieClip("hLineMC",gridLayer.getNextHighestDepth());
    var maxY:Number = Math.floor(51/11);
    for(var i=0;i<maxY;i++){
        var x:Number = 119;
        var y:Number = 26 + (i + 1) * 11;
        hLineMC.moveTo(x, y);
        hLineMC.lineStyle(1, 0x008040, 100, false, "none", "none", "bevel", 1);
        hLineMC.lineTo(x + 229, y);
    }
}
drawHLine();

function drawGrid(showValue:String){
    runCount ++;
    if(runCount == 6){
        runCount = 0;
    }
    drawVLine();
    drawPointLine(showValue);
}

function drawVLine(){
    var vLineMC:MovieClip = gridLayer["vLineMC"];
    if(null == vLineMC){    
        vLineMC = gridLayer.createEmptyMovieClip("vLineMC",gridLayer.getNextHighestDepth());
    }
    vLineMC.clear();
    
    var maxX:Number = Math.floor(229/11);
    for(var i=0;i<maxX;i++){
        var x:Number = 119 + (i + 1) * 11 - runCount * gridMoveMarge;
        vLineMC.moveTo(x, 26);
        vLineMC.lineStyle(1, 0x008040, 100, false, "none", "none", "bevel", 1);
        vLineMC.lineTo(x, 77);

        if(runCount != 0 && i == maxX - 1){
            vLineMC.moveTo(x + 11, 26);
            vLineMC.lineStyle(1, 0x008040, 100, false, "none", "none", "bevel", 1);
            vLineMC.lineTo(x + 11, 77);
        }
    }
}

function drawPointLine(showValue:String){
    gridPointLayer._quality = "LOW";
    gridPointLayer.clear();

    if(gridPoint.length < Math.floor(229/2)){
        gridPoint.push(parseInt(showValue));
    }else{
        gridPoint.shift();
        gridPoint.push(parseInt(showValue));
    }
    var iLen:Number = gridPoint.length-2;
    var oLeft:Number = 344;
    var oTop:Number = 76;
    var cHei:Number = 51;

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
    }
}

GetCpuData();
setInterval(function(){GetCpuData()},1000);

// �Ҽ��˵�
var menu = new ContextMenu();
menu.hideBuiltInItems();
//menu.customItems.push(new ContextMenuItem("..�����������μ����ϵͳ�������޹�˾..",resoftMenu));
_root.menu = menu;

function resoftMenu(){
    getURL("http://www.resoft.css.com.cn","_blank");
}