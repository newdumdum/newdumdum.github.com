  /*
  * Description : Create News Show Form , whitch impact flash effect.
  * Author : ShiCH IRD
  * Date : 2008-3-21
  */
  
  __ISIE = true;
  __PATH = "files/images/PHOTOS/";
  __IMGINFO = "1.jpg|Bird Girl;2.jpg|Ice Montains;3.jpg|River Stone;4.jpg|Avril Lavigne;5.jpg|Colorful Hears;6.jpg|Hill;7.jpg|Vista;8.jpg|A Couple Of Cats";
  __IMGCOUNT = 0;
  __TIMECMD = null;
  
  // ******** PUBLIC FUNCTION START **********
  $ = function (id,isTagName){
    return isTagName ? document.getElementsByTagName(id) : document.getElementById(id);
  }
  $C = function(tagName){
      return document.createElement(tagName);
  }
  $R = function(curNode,parentNode){
      return parentNode ? parentNode.removeChild(curNode) : document.body.removeChild(curNode);
  }
  $A = function(curNode,parentNode){
      return parentNode ? parentNode.appendChild(curNode) : document.body.appendChild(curNode);
  }
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
  Array.prototype.Add = function(obj){
      this[this.length] = obj;
  }
  // ******** PUBLIC FUNCTION END **********

  function init(){
      CheckBrowser();
      LoadImages();
  }

  function LoadImages(){
      if(__IMGINFO == ""){
          alert("Í¼Æ¬ÐÅÏ¢³ö´í");
          return;
      }
      var picArr = new Array();
      if(__IMGINFO.indexOf(";") != -1){
          __IMGCOUNT = __IMGINFO.split(";").length;
          for(var i=0;i<__IMGCOUNT;i++){
              var img = new Image();
              var nameStr = __IMGINFO.split(";")[i].split("|")[1];
              var srcStr = __PATH + __IMGINFO.split(";")[i].split("|")[0];
              img.src = srcStr;
              img.info = nameStr;
              picArr.Add(img);
          }
      }else{
          _IMGCOUNT = 1;
          var img = new Image();
          var nameStr = __IMGINFO.split("|")[1];
          var srcStr = __PATH + __IMGINFO.split("|")[0];
          img.src = srcStr;
          img.info = nameStr;
          picArr.Add(img);
      }
      AddToolBars(picArr);
  }

  function AddToolBars(picArr){
      var imgDiv = $("imgDiv");
      var layerDiv = $("layerDiv");
      with(layerDiv.style){
          position = "absolute";
          left = "0px";
          top = "350px";
          opacity = "0.5";
      }
      var picInfoDiv = $("picInfoDiv");
      //picInfoDiv.style.top = parseInt(parseInt($("picDiv").offsetHeight) - 40) + "px";

      var toolDiv = $("toolDiv");
      toolDiv.setAttribute("checkedBT","0");
      toolDiv.setAttribute("maxPicLen",picArr.length-1);
      for(var i=0;i<picArr.length;i++){
          var div = $C("div");
          $A(div,toolDiv);
          i == 0 ? div.className = "toolBT_Over" : div.className = "toolBT";
          div.innerHTML = i+1;
          div.setAttribute("checkedID",i);
          div.id = "newsBT_"+i;
          div.onmouseover = function(){
              if(this.getAttribute("checkedID") != toolDiv.getAttribute("checkedBT")){
                  this.className = "toolBT_Over";
              }
          }
          div.onmouseout = function(){
              if(this.getAttribute("checkedID") != toolDiv.getAttribute("checkedBT")){
                  this.className = "toolBT";
              }
          }
          div.onclick = function(){
              var toolDivID = toolDiv.getAttribute("checkedBT");
              var checkedID = this.getAttribute("checkedID");
              var oldBT = $("newsBT_"+ toolDivID);
              oldBT.className = "toolBT";
              this.className = "toolBT_Over";
              toolDiv.setAttribute("checkedBT",checkedID);
              showPic(checkedID,picArr);
              //if(null != __TIMECMD){clearTimeout(__TIMECMD);};
              //changePic(picArr);
          }
      }
      showPic(0,picArr);
      setTimeout(function(){changePic(picArr);},1000);

      $("picDiv").onclick = function(){
          var img = $("showImg");
          window.open(img.src);
      }
  }

  function changePic(picArr){
      __TIMECMD = setTimeout(function(){
          var toolDiv = $("toolDiv");
          var maxLen = toolDiv.getAttribute("maxPicLen");
          var curPic = toolDiv.getAttribute("checkedBT");//alert(curPic);
          var showOrder = parseInt(curPic) + 1 > maxLen ? 0 : parseInt(curPic) + 1;
          var bt = $("newsBT_" + showOrder);
          var toolDivID = toolDiv.getAttribute("checkedBT");

          var checkedID = bt.getAttribute("checkedID");
          var oldBT = $("newsBT_"+ toolDivID);
          oldBT.className = "toolBT";
          bt.className = "toolBT_Over";
          toolDiv.setAttribute("checkedBT",checkedID);
          showPic(checkedID,picArr);

          changePic(picArr)
      },4000);
  }

  function showPic(checkedID,picArr){//alert(checkedID);
     var picInfoDiv = $("picInfoDiv");
     var img = $("showImg");
     var imgObj = picArr[checkedID];
     img.onload = function(){
        this.style.visibility = "visible";
        picInfoDiv.innerHTML = imgObj.info;
     }
     img.src = imgObj.src;
  }

  function CheckBrowser(){
      var ua = navigator.userAgent.toUpperCase();
      if(ua.indexOf("MSIE") != -1){
          __ISIE = true;
      }else{
          __ISIE = false;
      }
  }

  function BoundingRect(obj){
      var absTop = 0;
      var absLeft = 0;
      var tempObj = obj;
      while(tempObj != document.body){
          absTop += tempObj.offsetTop - tempObj.offsetParent.scrollTop;
          absLeft += tempObj.offsetLeft - tempObj.offsetParent.scrollLeft;
          tempObj = tempObj.offsetParent;
      }
      this.top = absTop;
      this.left = absLeft;
  }


  window.onload = init;