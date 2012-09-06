$ = function(id){
    return document.getElementById(id);
}
function init(){
    var type = GetUrlParams("type");
    if(type == ""){
        type = "proTypeAll";
    }else if(type != "proTypeAll"){
        type = "proType" + type;
    }
    var curDiv = $(type);
    curDiv.style.background = "#FF9900";
    setLeftMenuStyle(type);
}

function setLeftMenuStyle(type){
    var divCon = $("leftMenuDiv");
    var divs = divCon.getElementsByTagName("div");
    for(var i=0;i<divs.length;i++){
      var curDiv = divs[i];
      curDiv.onmouseover = function(){
          if(this.id != type){
              this.style.cursor = "hand";
              this.style.backgroundColor = "#7AD5EF";
              this.style.color = "#FFFFFF";
          }
      }
      curDiv.onmouseout = function(){
          if(this.id != type){
              clearTrBgStyle(this);
          }
      }
      curDiv.onclick = function(){
          var goUrl = this.getAttribute("goUrl");
          location.href = goUrl;
      }
    }
}

function clearTrBgStyle(curObj,colorStr){
  var delayTime = 50;
  curObj.style.cursor = "hand";
  curObj.style.borderBottom = "1px dotted #CCC";
  if(null == colorStr){
      colorStr = "#31BCE6";
  }
  curObj.style.backgroundColor = colorStr;
  switch(colorStr){
      case "#31BCE6":
          colorStr = "#5ACAEB";
          setTimeout(function (){clearTrBgStyle(curObj, colorStr);},delayTime);
          break;
      case "#5ACAEB":
          colorStr = "#7AD5EF";
          setTimeout(function (){clearTrBgStyle(curObj, colorStr);},delayTime);
          break;
      case "#7AD5EF":
          colorStr = "#A6E2F4";
          setTimeout(function (){clearTrBgStyle(curObj, colorStr);},delayTime);
          break;
      case "#A6E2F4":
          colorStr = "#D0EEF9";
          setTimeout(function (){clearTrBgStyle(curObj, colorStr);},delayTime);
          break;
      case "#D0EEF9":
          colorStr = "#E4F1F7";                
          curObj.style.color = "#000000";
          setTimeout(function (){clearTrBgStyle(curObj, colorStr);},delayTime);
          break;
      case "#E4F1F7":
          colorStr = "#FFFFFF";
          setTimeout(function (){clearTrBgStyle(curObj, colorStr);},delayTime);
          break;
      case "#FFFFFF":
          break;
  }
}

/*
* 功  能: 获取地址栏参数
* 作  者: SCH
* 日  期: 2007/11/21 2:09 AM
*/
function GetUrlParams(str){
    var rValue = "";
    var paramsStr = location.search.substring(1);
    if(paramsStr.indexOf("&") != -1){
        for(var i=0;i<paramsStr.split("&").length;i++){
            var name = paramsStr.split("&")[i].split("=")[0];
            var value = paramsStr.split("&")[i].split("=")[1];
            if(str == name){
                rValue = value;
                break;
            }
        }
    }else{
        var name = paramsStr.split("=")[0];
        var value = paramsStr.split("=")[1];
        if(name == str){
            rValue = value;
        }
    }
    return rValue;
}

window.onload = init;