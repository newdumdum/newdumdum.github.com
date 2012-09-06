//HTTP请求地址
_DATA_SRC = datasrc;
if(null == _DATA_SRC){
    _DATA_SRC = "line.xml";
}
_URL_METER = _DATA_SRC;

//缩放舞台并不缩放内容，将内容定位于舞台的左上角;
Stage.align  = "TL";
Stage.scaleMode = "noScale";
_quality = "BEST";

// 坐标颜色
_AXISCOLOR = "0xEAA041";

// 内部线颜色
_DOTCOLOR = "0xFFFFFF";

// 坐标文字颜色
_AXISTEXTCOLOR = "0x643801";

// 左侧坐标轴要分的段数
_LEFTCOUNT = 10;

// 标题颜色
_TITLECOLOR = "0xC4C207";

// 节点值的数组
_POINTARR = new Array();

// 最大值和最小值
_MAXVALUE = null;
_MINVALUE = null;

var mc_ColorArea:MovieClip = _root.createEmptyMovieClip("mc_ColorArea",this.getNextHighestDepth());
var mc_line:MovieClip = _root.createEmptyMovieClip("mc_line",this.getNextHighestDepth());
var mc_YNum:MovieClip = _root.createEmptyMovieClip("mc_YNum",this.getNextHighestDepth());

var xmlData:XML = new XML();
xmlData.contentType = "application/octet-stream";
xmlData.ignoreWhite = true;

xmlData.onLoad = function(success) {
    InitMC();

    var responseNode:Object = this.firstChild;    //得到RESPONSE节点
    var YAXIS:Object = responseNode.firstChild.firstChild;
    var AlarmNode:Object = YAXIS.nextSibling;
    var RedNode:Object = AlarmNode.firstChild;
    var YellowNode:Object = RedNode.nextSibling;
    var GreenNode:Object = YellowNode.nextSibling;

    var NodeName:String = YAXIS.firstChild.nodeValue;
    var MaxValue:Number = YAXIS.attributes["MaxValue"];
    var MinValue:Number = YAXIS.attributes["MinValue"];
    var DefValue:Number = YAXIS.attributes["DefValue"];
    var isShowFunBt:String = YAXIS.attributes["isShowFunBT"];
    var RedValue:Number = RedNode.attributes["value"];
    var RedColor:Number = RedNode.attributes["color"];
    var YellowValue:Number = YellowNode.attributes["value"];
    var YellowColor:Number = YellowNode.attributes["color"];
    var GreenValue:Number = GreenNode.attributes["value"];
    var GreenColor:Number = GreenNode.attributes["color"];

    _MAXVALUE = MaxValue;
    _MINVALUE = MinValue;

    _POINTARR.Add(DefValue);
    
    DrowYAXIS(MaxValue,MinValue,DefValue);
    DrowXAXIS();
    AddFlashName(NodeName);
    GiveMarkColor(MaxValue,MinValue,RedValue,YellowValue,GreenValue,RedColor,YellowColor,GreenColor);

    RebuildXAxis();

    AddButtonCommand(isShowFunBt);
}
xmlData.sendAndLoad(_URL_METER,xmlData);

function InitMC(){
    var mc_ColorArea:MovieClip = _root["mc_ColorArea"];
    if(null == mc_ColorArea){
        mc_ColorArea = _root.createEmptyMovieClip("mc_ColorArea",_root.getNextHighestDepth());
    }else{
        mc_ColorArea.removeMovieClip();
        mc_ColorArea = _root.createEmptyMovieClip("mc_ColorArea",_root.getNextHighestDepth());
    }
    var mc_line:MovieClip = _root["mc_line"];
    if(null == mc_line){
        mc_line = _root.createEmptyMovieClip("mc_line",_root.getNextHighestDepth());
    }else{
        mc_line.removeMovieClip();
        mc_line = _root.createEmptyMovieClip("mc_line",_root.getNextHighestDepth());
    }
    var mc_YNum:MovieClip = _root["mc_YNum"];
    if(null == mc_YNum){
        mc_YNum = _root.createEmptyMovieClip("mc_YNum",_root.getNextHighestDepth());
    }else{
        mc_YNum.removeMovieClip();
        mc_YNum = _root.createEmptyMovieClip("mc_YNum",_root.getNextHighestDepth());
    }
    mc_ColorArea.clear();
    mc_line.clear();
    mc_YNum.clear();
    _MAXVALUE = null;
    _MINVALUE = null;
    _POINTARR = new Array();
}

// 画Y轴
function DrowYAXIS(MaxValue:Number, MinValue:Number, CurValue:Number){    
    var YAXIS:MovieClip = mc_line["YAXIS"];
    if(null == YAXIS){
        YAXIS = mc_line.createEmptyMovieClip("YAXIS",mc_line.getNextHighestDepth());
    }
    YAXIS.moveTo(50, 17);
    YAXIS.lineStyle(1, _AXISCOLOR, 100, true, "none", "round", "miter", 1);
    YAXIS.lineTo(50, 135);

    YAXIS.moveTo(50, 17);
    YAXIS.lineStyle(1, _AXISCOLOR, 100, true, "none", "round", "miter", 1);
    YAXIS.lineTo(53, 22);
    YAXIS.moveTo(50, 17);
    YAXIS.lineStyle(1, _AXISCOLOR, 100, true, "none", "round", "miter", 1);
    YAXIS.lineTo(47, 22);

    DrowYMark(MaxValue,MinValue,CurValue,110);
}

// 画X轴
function DrowXAXIS(){
    var XAXIS:MovieClip = mc_line["XAXIS"];
    if(null == XAXIS){
        XAXIS = mc_line.createEmptyMovieClip("XAXIS",mc_line.getNextHighestDepth());
    }
    XAXIS.moveTo(50, 135);
    XAXIS.lineStyle(1, _AXISCOLOR, 100, true, "none", "round", "miter", 1);
    XAXIS.lineTo(340, 135);

    
    XAXIS.moveTo(340, 135);
    XAXIS.lineStyle(1, _AXISCOLOR, 100, true, "none", "round", "miter", 1);
    XAXIS.lineTo(335, 138);
    XAXIS.moveTo(340, 135);
    XAXIS.lineStyle(1, _AXISCOLOR, 100, true, "none", "round", "miter", 1);
    XAXIS.lineTo(335, 132);
}

// 根据界限值 画出颜色区
function GiveMarkColor(MaxValue:Number, MinValue:Number, RedValue:Number, YellowValue:Number, GreenValue:Number, RedColor:Number, YellowColor:Number, GreenColor:Number){
    var perValue:Number = parseFloat(((MaxValue - MinValue)/110).toString());
    var RedHeight:Number = (RedValue - MinValue) / perValue;
    var YellowHeight:Number = (YellowValue - MinValue) / perValue;
    var GreenHeight:Number = (GreenValue - MinValue) / perValue;

    // 红色区
    RedColor = RedColor == null ? 0xFDD0D0 : RedColor;
    mc_ColorArea.beginFill(RedColor);
    mc_ColorArea.moveTo(51, 135);
    mc_ColorArea.lineTo(51, 135-RedHeight);
    mc_ColorArea.lineTo(335,135-RedHeight);
    mc_ColorArea.lineTo(335,135);
    mc_ColorArea.lineTo(51, 135);
    mc_ColorArea.endFill();

    //黄色区
    YellowColor = YellowColor == null ? 0xFFEAB0 : YellowColor;
    mc_ColorArea.beginFill(YellowColor);
    mc_ColorArea.moveTo(51, 135-RedHeight);
    mc_ColorArea.lineTo(51, 135-RedHeight-YellowHeight);
    mc_ColorArea.lineTo(335,135-RedHeight-YellowHeight);
    mc_ColorArea.lineTo(335,135-RedHeight);
    mc_ColorArea.lineTo(51, 135-RedHeight);
    mc_ColorArea.endFill();

    //绿色区
    GreenColor = GreenColor == null ? 0xDBF4D2 : GreenColor;
    mc_ColorArea.beginFill(GreenColor);
    mc_ColorArea.moveTo(51, 135-RedHeight-YellowHeight);
    mc_ColorArea.lineTo(51, 25);
    mc_ColorArea.lineTo(335,25);
    mc_ColorArea.lineTo(335,135-RedHeight-YellowHeight);
    mc_ColorArea.lineTo(51, 135-RedHeight-YellowHeight);
    mc_ColorArea.endFill();
}


function DrowYMark(MaxValue:Number, MinValue:Number, CurValue:Number, Len:Number){
    var perValue:Number = parseFloat(((MaxValue - MinValue)/_LEFTCOUNT).toString());
    var numMarge:Number = (parseInt((perValue%10).toString()).toString().length) * 10;
    
    var startNum:Number = (MinValue < numMarge) ? MinValue : numMarge;

    var moveMarge = Len / _LEFTCOUNT;
    var tmpY:Number = 135;
    for(var i:Number = 0 ; i <= _LEFTCOUNT ; i ++){
        // 画左侧刻度
        var YAXIS:MovieClip = mc_line["YAXIS"];
        YAXIS.moveTo(50, tmpY);
        YAXIS.lineStyle(1, _AXISCOLOR, 100, true, "none", "round", "miter", 1);
        YAXIS.lineTo(47, tmpY);

        // 画内部线
        YAXIS.moveTo(50, tmpY);
        YAXIS.lineStyle(1, _DOTCOLOR, 50, true, "none", "round", "miter", 1);
        YAXIS.lineTo(335, tmpY);

        // 加入文字
        var fmt:TextFormat = new TextFormat();
        fmt.font = "Verdana";
        fmt.size = 10;
        fmt.align = "right";

        var textBox = mc_YNum.createTextField("Y_NUM_MARK_"+(i.toString()), mc_YNum.getNextHighestDepth(), 2, tmpY-8, 46, 14);
        textBox.text = parseInt(parseFloat((MinValue).toString()) +  parseFloat((perValue * i).toString())) ;
        textBox.border = false;
        textBox.textColor = _AXISTEXTCOLOR;
        textBox.background = false;
        textBox.autoSize = false;
        textBox.wordWrap = false;
        textBox.multiline = false;
        textBox.selectable = false;

        textBox.setTextFormat(0, textBox.length, fmt);

        tmpY = tmpY - moveMarge;
    }
}

function AddFlashName(flashName:String){
    var NameMC:MovieClip = mc_line["NameMC"];
    if(null == NameMC){
        NameMC = mc_line.createEmptyMovieClip("NameMC",mc_line.getNextHighestDepth());
    }
    
    // 加入标题文字
    var fmt:TextFormat = new TextFormat();
    fmt.font = "宋体";
    fmt.size = 12;
    fmt.align = "center";
    fmt.bold = true;

    var textBox = NameMC.createTextField("FlashNameTX", NameMC.getNextHighestDepth(), 5, 5, 380, 18);
    textBox.text = flashName;
    textBox.border = false;
    textBox.textColor = _TITLECOLOR;
    textBox.background = false;
    textBox.autoSize = false;
    textBox.wordWrap = false;
    textBox.multiline = false;
    textBox.selectable = false;

    textBox.setTextFormat(0, textBox.length, fmt);

    // 加入Y坐标文字
    var fmtY:TextFormat = new TextFormat();
    fmtY.font = "宋体";
    fmtY.size = 12;
    fmtY.align = "center";

    var textBoxY = NameMC.createTextField("FlashNameTX_Y", NameMC.getNextHighestDepth(), 42, 2, 15, 18);
    textBoxY.text = "值";
    textBoxY.border = false;
    textBoxY.textColor = _AXISTEXTCOLOR;
    textBoxY.background = false;
    textBoxY.autoSize = false;
    textBoxY.wordWrap = false;
    textBoxY.multiline = false;
    textBoxY.selectable = false;

    textBoxY.setTextFormat(0, textBoxY.length, fmtY);
    // 加入X坐标文字
    var textBoxX = NameMC.createTextField("FlashNameTX_X", NameMC.getNextHighestDepth(), 335, 128, 55, 18);
    textBoxX.text = "压力点";
    textBoxX.border = false;
    textBoxX.textColor = _AXISTEXTCOLOR;
    textBoxX.background = false;
    textBoxX.autoSize = false;
    textBoxX.wordWrap = false;
    textBoxX.multiline = false;
    textBoxX.selectable = false;

    textBoxX.setTextFormat(0, textBoxX.length, fmtY);
}

/*
* 功    能: 更改节点信息回调方法
* 参    数: prop:, oldVal:原值, newVal:新值, userData:用户数据
* 返 回 值: newVal
* 作    者: SCH
* 日    期: 2008-7-7
*/
function changePonitValue(prop, oldVal, newVal, userData){
    _POINTARR.Add(newVal);
    RebuildXAxis();
}

function RebuildXAxis(){
    var ErectLineMC:MovieClip = mc_line["ErectLineMC"];
    if(null == ErectLineMC){
        ErectLineMC = mc_line.createEmptyMovieClip("ErectLineMC",mc_line.getNextHighestDepth());
    }else{
        ErectLineMC.removeMovieClip();
        ErectLineMC = mc_line.createEmptyMovieClip("ErectLineMC",mc_line.getNextHighestDepth());
    }

    var mc_Node:MovieClip = _root["mc_Node"];
    if(null == mc_Node){
        mc_Node = _root.createEmptyMovieClip("mc_Node",_root.getNextHighestDepth());
    }else{
        mc_Node.removeMovieClip();
        mc_Node = _root.createEmptyMovieClip("mc_Node",_root.getNextHighestDepth());
    }

    var len:Number = _POINTARR.length;
    for(var i = 0 ; i < len ; i ++){
        DrowPoint(_POINTARR[i],i,len,ErectLineMC);
    }
    for(var j = 0 ; j < len ; j ++){
        if(j != len - 1 && len != 1){
            LineToPoint(_POINTARR[j],_POINTARR[j+1],len,j);
        }
    }
    updateAfterEvent();
}

function DrowPoint(value:Number, x:Number, len:Number, ErectLineMC:MovieClip){
    var curLeft:Number = GetNodeX(len,x);
    var curTop:Number = GetNodeY(value);

    
    var PointNodeMC:MovieClip = mc_Node["PointNodeMC"];
    if(null == PointNodeMC){
        PointNodeMC = mc_Node.createEmptyMovieClip("PointNodeMC_"+x,mc_Node.getNextHighestDepth());
    }

    PointNodeMC.beginFill(0xFFFFFF);
    PointNodeMC.lineStyle(1, 0x9933CC, 100, true, "none", "round", "miter", 1);
    PointNodeMC.moveTo(curLeft-1, curTop-1);
    PointNodeMC.lineTo(curLeft+1, curTop-1);
    PointNodeMC.lineTo(curLeft+1,curTop+1);
    PointNodeMC.lineTo(curLeft-1,curTop+1);
    PointNodeMC.lineTo(curLeft-1, curTop-1);
    PointNodeMC.endFill();

    PointNodeMC.curNodeValue = value;

    PointNodeMC.onRollOver = function(){
        ShowDetailNodeInfo(this._xmouse,this._ymouse,PointNodeMC.curNodeValue);
    }
    PointNodeMC.onRollOut = function(){
        HideDetailNodeInfo();
    }

    // 画内部竖线
    if(x != 0){
        DrowErectLine(ErectLineMC,curLeft,x);
    }
}

function LineToPoint(valueA:Number, valueB:Number, len:Number ,x:Number){
    var x1 = GetNodeX(len,x);
    var y1 = GetNodeY(valueA);
    var x2 = GetNodeX(len,x+1);
    var y2 = GetNodeY(valueB);

    mc_Node.moveTo(x1, y1);
    mc_Node.lineStyle(1, 0xAF5ED7, 100, true, "none", "round", "miter", 1);
    mc_Node.lineTo(x2, y2);
}

function ShowDetailNodeInfo(x:Number, y:Number, value:Number){
    var NodeInfoMC:MovieClip = mc_Node["NodeInfoMC"];
    if(null == NodeInfoMC){
        NodeInfoMC = mc_Node.createEmptyMovieClip("NodeInfoMC",mc_Node.getNextHighestDepth());
    }
    // 加入文字
    var fmt:TextFormat = new TextFormat();
    fmt.font = "Verdana";
    fmt.size = 10;
    fmt.align = "center";

    var txTop:Number = (y-20) < 20 ? (y+20) : (y-20);
    var textBox = NodeInfoMC.createTextField("nodeInfoTX", NodeInfoMC.getNextHighestDepth(), x, txTop, 20, 15);
    textBox.text = value;
    textBox.border = true;
    textBox.borderColor = _AXISTEXTCOLOR;
    textBox.background = true;
    textBox.backgroundColor = 0xFFFFFF;
    textBox.textColor = _AXISTEXTCOLOR;
    textBox.autoSize = true;
    textBox.wordWrap = false;
    textBox.multiline = false;
    textBox.selectable = false;
    textBox.setTextFormat(0, textBox.length, fmt);
}
function HideDetailNodeInfo(){
    var NodeInfoMC:MovieClip = mc_Node["NodeInfoMC"];
    var NodeInfoTX:TextField = NodeInfoMC["nodeInfoTX"];
    if(null != NodeInfoTX){    
        NodeInfoTX.removeTextField();
    }
}

function GetNodeX(len:Number,x:Number){
    var maxLen:Number = 290;
    var marge:Number = parseInt((290/len).toString());
    var curLeft:Number;
    if(x == 0){
        curLeft = 50;
    }else{
        curLeft = 50 + x * marge;
    }
    return curLeft;
}
function GetNodeY(value:Number){
    var curTop:Number = parseInt((135 - value/((_MAXVALUE - _MINVALUE)/110)).toString());
    return curTop;
}

function DrowErectLine(ErectLineMC:MovieClip, x:Number,order:Number){
    ErectLineMC.moveTo(x, 135);
    ErectLineMC.lineStyle(1, _DOTCOLOR, 50, true, "none", "round", "miter", 1);
    ErectLineMC.lineTo(x, 20);
    
    ErectLineMC.moveTo(x, 135);
    ErectLineMC.lineStyle(1, _AXISCOLOR, 50, true, "none", "round", "miter", 1);
    ErectLineMC.lineTo(x, 138);

    // 加入文字
    //取消文字
    return;

    var fmt:TextFormat = new TextFormat();
    fmt.font = "Verdana";
    fmt.size = 10;
    fmt.align = "center";

    var txTop:Number = (y-20) < 0 ? (y+20) : (y-20);
    var textBox = ErectLineMC.createTextField("downText_"+order, ErectLineMC.getNextHighestDepth(), x-9, 138, 20, 15);
    textBox.text = order;
    textBox.border = false;
    textBox.background = false;
    textBox.textColor = _AXISTEXTCOLOR;
    textBox.autoSize = false;
    textBox.wordWrap = false;
    textBox.multiline = true;
    textBox.selectable = false;

    textBox.setTextFormat(0, textBox.length, fmt);
}

function AddButtonCommand(isShowFunBt:String){
    ResetBT.onPress = function(){
        _POINTARR.length = 0;
        RebuildXAxis();
    }
    
    if(isShowFunBt == "true"){

        YJBT._visible = true;
        JSBT._visible = true;
        BKBT._visible = true;

        JSBT.onPress = function(){
            fscommand("BuildEdgeValueTable","1");
        }
        YJBT.onPress = function(){
            fscommand("BuildEdgeValueTable","2");
        }
        BKBT.onPress = function(){
            fscommand("BuildEdgeValueTable","3");
        }
    }else{
        YJBT._visible = false;
        JSBT._visible = false;
        BKBT._visible = false;
    }
}

// 数组扩展
Array.prototype.Contains = function(str){
    var isHas = false;
    for(var i = 0 ;i < this.length; i ++){
        if(this[i] == str){
            isHas = true;
            break;
        }
    }
    return isHas;
}
Array.prototype.Add = function(str){
    this[this.length] = str;
}
Array.prototype.Index = function(srt){
    var curIndex = null;
    for(var i = 0 ;i < this.length; i ++){
        if(this[i] == str){
            curIndex = i;
            break;
        }
    }
    return curIndex;
}



function ReloadData(prop, oldVal, newVal, userData){
    xmlData.sendAndLoad(newVal,xmlData);
}

var watchObj:Object = new Object();
watchObj.watch("changeValue", changePonitValue, "");
var urlObj:Object = new Object();
urlObj.watch("reloadByUrl", ReloadData, "");


// 右键菜单
var menu = new ContextMenu();
menu.hideBuiltInItems();
//menu.customItems.push(new ContextMenuItem("..北京中软融鑫计算机系统工程有限公司..",resoftMenu));
_root.menu = menu;

function resoftMenu(){
    getURL("http://www.resoft.css.com.cn","_blank");
}