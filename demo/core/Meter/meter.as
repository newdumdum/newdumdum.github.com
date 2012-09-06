import mx.controls.Alert;
//HTTP请求地址
_DATA_SRC = datasrc;
if(null == _DATA_SRC){
    _DATA_SRC = "meter.xml";
}
_URL_METER = _DATA_SRC;

__MAXVALUE = null;
__MINVALUE = null;
__METERNAME = null;
__DEFAULTRAD = -180;
__VALUETYPE = null;

//区域颜色
__AREARED = 0xFF6666;
__AREAYEL = 0xFFCC66;
__AREAGRE = 0xABE8AB;

__COLORRAD = 57;
__CENTERX = 75;
__CENTERY = 75;


//缩放舞台并不缩放内容，将内容定位于舞台的左上角;
Stage.align  = "TL";
Stage.scaleMode = "noScale";
_quality = "BEST";

pointerLayer._rotation = __DEFAULTRAD;

LoadingLayer._visible = true;
LoadingLayer._alpha = 80;

METER = {};

var xmlData:XML = new XML();
xmlData.contentType = "application/octet-stream";
xmlData.ignoreWhite = true;


var ColorAreaMC:MovieClip = _root.createEmptyMovieClip("ColorAreaMC",this.getNextHighestDepth());

xmlData.onLoad = function(success) {
    var responseNode:Object = this.firstChild;    //得到RESPONSE节点
    var meterInfoNode:Object = responseNode.firstChild;
    var meterNameNode:Object = meterInfoNode.firstChild;
    var meterValueNode:Object = meterNameNode.nextSibling;
    var meterMaxValueNode:Object = meterValueNode.nextSibling;
    var meterMinValueNode:Object = meterMaxValueNode.nextSibling;
    var valueTypeNode:Object = meterMinValueNode.nextSibling;
    var unitNode:Object = valueTypeNode.nextSibling;

    var colorNode:Object = responseNode.firstChild.nextSibling;
    var redNode:Object = colorNode.firstChild;
    var yellowNode:Object = redNode.nextSibling;
    var greenNode:Object = yellowNode.nextSibling;

    var meterName = meterNameNode.firstChild.nodeValue;
    var meterValue = meterValueNode.firstChild.nodeValue;
    var meterMaxValue = meterMaxValueNode.firstChild.nodeValue; 
    var meterMinValue = meterMinValueNode.firstChild.nodeValue; 
    var valueType = valueTypeNode.firstChild.nodeValue;
    var valueUnit = unitNode.firstChild.nodeValue;

    var redValue = redNode.firstChild.nodeValue;
    var redColor = redNode.Attributes["color"];
    __AREARED = redColor == null ? __AREARED : redColor;
    var yellowValue = yellowNode.firstChild.nodeValue;
    var yelColor = redNode.Attributes["color"];
    __AREAYEL = yelColor == null ? __AREAYEL : yelColor;
    var greenValue = greenNode.firstChild.nodeValue;
    var greColor = redNode.Attributes["color"];
    __AREAGRE = greColor == null ? __AREAGRE :  greColor;

    __MAXVALUE = meterMaxValue;
    __MINVALUE = meterMinValue;
    __METERNAME = meterName;
    __VALUETYPE = valueType;

    drawColorArea(redValue,yellowValue,greenValue);

    giveMeterDefText(meterName,valueUnit);

    showMeterPointer(meterValue);

    addBaseMcListen();

    initTX();

    addInputCmd();

    setTimeout(function(){LoadingLayer._visible = false;},100);
}
xmlData.sendAndLoad(_URL_METER,xmlData);


function giveMeterDefText(meterName:String, valueUnit:String){
    meterUnitTX.text = "单位:" + valueUnit;
    meterNameTX.text = meterName;
    minValueTX.text = __MINVALUE;
    maxValueTX.text = __MAXVALUE;

    giveMarkText();
}

function giveMarkText(){
    // 由于表盘大小限制 文字暂不显示。。。
    mValueTX2._visible = false;
    mValueTX3._visible = false;
    mValueTX4._visible = false;
    mValueTX5._visible = false;
    return;

    var rat = (parseFloat(__MAXVALUE) - parseFloat(__MINVALUE))/5;
    mValueTX2.text = ForDight((parseFloat(__MINVALUE) + 1*rat),2);
    mValueTX3.text = ForDight((parseFloat(__MINVALUE) + 2*rat),2);
    mValueTX4.text = ForDight((parseFloat(__MINVALUE) + 3*rat),2);
    mValueTX5.text = ForDight((parseFloat(__MINVALUE) + 4*rat),2);
}

function initTX(){
    var fmt:TextFormat = new TextFormat();
    fmt.font = "Verdana";
    fmt.size = 10;
    fmt.align = "center";
    fmt.letterSpacing = -1;
    fmt.color = 0x643801;

    curValueTX._quality = "BEST";
    curValueTX.selectable = true;
    curValueTX.border = true;
    curValueTX.borderColor = 0x999999;
    curValueTX.background = true;
    curValueTX.backgroundColor = 0xFFFFE6;

    meterNameTX.selectable = false;
    meterUnitTX.selectable = false;

    minValueTX.selectable = false;
    minValueTX.setTextFormat(0, minValueTX.length, fmt);

    maxValueTX.selectable = false;
    maxValueTX.setTextFormat(0, maxValueTX.length, fmt);

    mValueTX2.selectable = false;
    mValueTX2.setTextFormat(0, mValueTX2.length, fmt);

    mValueTX3.selectable = false;
    mValueTX3.setTextFormat(0, mValueTX3.length, fmt);

    mValueTX4.selectable = false;
    mValueTX4.setTextFormat(0, mValueTX4.length, fmt);

    mValueTX5.selectable = false;
    mValueTX5.setTextFormat(0, mValueTX5.length, fmt);
}

// 显示指针
function showMeterPointer(meterValue:String){
    var seiral:Number = 180/( parseFloat(__MAXVALUE) - parseFloat(__MINVALUE) ) ;
    var moveR:Number = seiral * (parseFloat(meterValue) - parseFloat(__MINVALUE)) + __DEFAULTRAD;
    if(parseFloat(__MINVALUE) > parseFloat(meterValue) || parseFloat(meterValue) > parseFloat(__MAXVALUE)){        
        curValueTX.text = "数据出错";
        return;
    }else{
        runPointerLayer(moveR);
        showMeterValue(meterValue);
    }
}

//显示文字
function showMeterValue(meterValue:String){
    var showMeterValue =  parseFloat(meterValue);
    showMeterValue = ForDight(showMeterValue,2);

    curValueTX.text = __VALUETYPE == 1 ? showMeterValue : showMeterValue + "%";
}

function runPointerLayer(setR:Number){
    pointerLayer._rotation = setR;
    updateAfterEvent();
}

function watchDefValueChange(prop, oldVal, newVal, userData){
    showMeterPointer(newVal,__MAXVALUE,__MINVALUE);
}

function addBaseMcListen(){
    _MoveDrag = false;
    _MarkRunValue = null;
    movePanel.onMouseDown = function(){
        if(this._ymouse >=0 && this._ymouse <= 75){
            _MoveDrag = true;
            Mouse.hide();
        }
    }
    movePanel.onMouseMove = function(){
        if(_MoveDrag){
            var rad:Number = getCurMouseToCenterRad(this._xmouse,this._ymouse);
            if(!(rad <= __DEFAULTRAD && rad >= __DEFAULTRAD - 180)){
                runPointerLayer(rad);
                var seiral = 180/( parseFloat(__MAXVALUE) - parseFloat(__MINVALUE) );
                var temRad = (rad - __DEFAULTRAD) < 0 ? (rad - __DEFAULTRAD) + 360 : (rad - __DEFAULTRAD);
                var cutValue = temRad/seiral + parseFloat(__MINVALUE);
                cutValue = parseFloat(cutValue);
                var curValue = cutValue.toString();
                showMeterValue(curValue);

                var giveOutValue = parseInt(curValue);
                if(parseFloat(__MAXVALUE) - parseFloat(__MINVALUE) <= 100){
                    giveOutValue = ForDight(curValue,2);
                }
                fscommand("getFlashValue",giveOutValue);
                _MarkRunValue = curValue;
            }
        }
    }
    movePanel.onMouseUp = function(){
        if(_MoveDrag){
            _MoveDrag = false;
            Mouse.show();

            var giveOutValue = parseInt(_MarkRunValue);
            if(parseFloat(__MAXVALUE) - parseFloat(__MINVALUE) <= 100){
                giveOutValue = ForDight(_MarkRunValue,2);
            }
            fscommand("GiveOutPointValue",giveOutValue);
        }
    }
}

function getCurMouseToCenterRad(mX:Number, mY:Number){
    var tanRad:Number = Math.atan((pointerLayer._y - mY)/(pointerLayer._x - mX));
    var rad:Number = (360 * tanRad/Math.PI) + __DEFAULTRAD;
    return rad;
}

// 格式化
function ForDight(Dight,How) {  
    Dight = Math.round(Dight*Math.pow(10,How))/Math.pow(10,How);  
    return Dight;  
} 


function drawColorArea(redValue:String, yellowValue:String, greenValue:String){
    var redRad = parseInt(String(180 * (redValue - parseFloat(__MINVALUE))/(parseFloat(__MAXVALUE) - parseFloat(__MINVALUE))));
    var yelRad = parseInt(String(180 * (yellowValue - redValue)/(parseFloat(__MAXVALUE) - parseFloat(__MINVALUE))));
    var greRad = parseInt(String(180 - yelRad - redRad));//180 * greenValue/(parseFloat(__MAXVALUE) - parseFloat(__MINVALUE));

    drawPie(0,redRad,__AREARED + 2,true,redValue);
    drawPie(redRad + 1,yelRad,__AREAYEL - 1,true,yellowValue);
    drawPie(redRad + yelRad + 2,greRad - 2,__AREAGRE);
}

function drawPie(startRad:Number,margeRad:Number,color:Number,isMarkText:Boolean,markValue:String){
    areaMC.beginFill(color,50);
    areaMC.moveTo(__CENTERX,__CENTERY);
    areaMC.lineStyle(1, color);
    
    var tmpRad = 0;
    for(var i = startRad ; i<=(startRad+margeRad) ; i++){
        areaMC.lineTo(getPoint(i).x,getPoint(i).y);
        tmpRad = i;
    }

    if(isMarkText){
        GiveColorText(tmpRad,markValue);
    }

    areaMC.lineTo(__CENTERX,__CENTERY);
    areaMC.endFill();
}

function GiveColorText(curRad:Number,markValue:String){
    var fmt:TextFormat = new TextFormat();
    fmt.font = "Verdana";
    fmt.size = 10;
    fmt.align = "left";
    fmt.letterSpacing = -1;
    fmt.color = 0x643801;

    var txX = __CENTERX - 68 * Math.cos(curRad*Math.PI/180); 
    txX = curRad >= 90 ? txX - (__COLORRAD - 38) * Math.sin((curRad-90)*Math.PI/180) : txX;
    var txY = __CENTERY - __COLORRAD * Math.sin(curRad*Math.PI/180) - 12;
    txX = parseInt(String(txX));
    txY = parseInt(String(txY));
    var tx = areaMC.createTextField("areaValueTX_"+curRad, areaMC.getNextHighestDepth(), txX, txY, 11, 14);
    tx.autoSize  = "left";
    tx.text = markValue;
    tx.setTextFormat(0, tx.length, fmt);
}


function getPoint(radNum:Number):Object{	
    var tmpX = __CENTERX - __COLORRAD * Math.cos(radNum*Math.PI/180);      
    var tmpY = __CENTERY - __COLORRAD * Math.sin(radNum*Math.PI/180);
    return {
        x:tmpX,y:tmpY
    };	
}

var chageObj:Object = new Object();
chageObj.watch("valueChanged",watchDefValueChange,"");

// 添加键盘事件 2008-7-30
Key.addListener(_root); 
_root.onKeyDown = function(){
    if(Key.getCode() == 37 || Key.getCode() == 38){
        if(Key.isDown(Key.SHIFT)){
            MovePointerByKeyBoard(true,1);
        }else{
            MovePointerByKeyBoard(true,0.1);
        }
    }else if(Key.getCode() == 39 || Key.getCode() == 40){
        if(Key.isDown(Key.SHIFT)){
            MovePointerByKeyBoard(false,1);
        }else{
            MovePointerByKeyBoard(false,0.1);
        }
    }
}
_root.onKeyUp = function(){
    if(Key.getCode() == 37 || Key.getCode() == 39){
        GiveOutValueByKeyBoard();
    }
}

function MovePointerByKeyBoard(leftDir,marge){
    Selection.setFocus(null);
    var curValue = parseFloat(curValueTX.text);
    if(leftDir){
        curValue = (curValue - marge) <= parseFloat(__MINVALUE) ? parseFloat(__MINVALUE) : (curValue - marge);
    }else{
        curValue = (curValue + marge) >= parseFloat(__MAXVALUE) ? parseFloat(__MAXVALUE) : (curValue + marge);
    }

    showMeterPointer(curValue);
    var giveOutValue = parseInt(curValue);
    if(parseFloat(__MAXVALUE) - parseFloat(__MINVALUE) <= 100){
        giveOutValue = ForDight(curValue,2);
    }
    fscommand("getFlashValue",giveOutValue);
    _MarkRunValue = curValue;
}

function GiveOutValueByKeyBoard(){
    var giveOutValue = parseInt(_MarkRunValue);
    if(parseFloat(__MAXVALUE) - parseFloat(__MINVALUE) <= 100){
        giveOutValue = ForDight(_MarkRunValue,2);
    }
    fscommand("GiveOutPointValue",giveOutValue);
}

function GiveOutNodeData(){
    var curValue = _MarkRunValue;
    var giveOutValue = parseInt(curValue);
    if(parseFloat(__MAXVALUE) - parseFloat(__MINVALUE) <= 100){
        giveOutValue = ForDight(curValue,2);
    }
    fscommand("getFlashValue",giveOutValue);
    _MarkRunValue = curValue;
}

function addInputCmd(){
    curValueTX.onChanged  = function(){
        if(Key.getCode() == 13){
            var str = this.text;
            var newStr = str.substring(0,str.indexOf("\r")) + str.substring(str.indexOf("\r")+1,str.length);
            this.text = newStr;
            Selection.setFocus(null);

            _MarkRunValue = parseFloat(newStr);
            if(parseFloat(__MINVALUE) < _MarkRunValue && _MarkRunValue < parseFloat(__MAXVALUE)){
                showMeterPointer(_MarkRunValue);
                GiveOutValueByKeyBoard();
                GiveOutNodeData();
            }else{
                var errorStr = "给定数据出错.";
                Alert.show(errorStr, "提示");
            }
        }
    }
}

// 右键菜单
var menu = new ContextMenu();
menu.hideBuiltInItems();
//menu.customItems.push(new ContextMenuItem("..北京中软融鑫计算机系统工程有限公司..",resoftMenu));
_root.menu = menu;

function resoftMenu(){
    getURL("http://www.resoft.css.com.cn","_blank");
}