  DOM = {
      $ : function(id){
          return document.getElementById(id);
      },
      $C : function(tagName,attrObject){
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
      },
      $A : function(elm,pElm){
          return pElm ? pElm.appendChild(elm) : document.body.appendChild(elm);
      },
      $R : function(elm,pElm){
          return pElm ? pElm.removeChild(elm) : document.body.removeChild(elm);
      },
      $T : function(tagName,pElm){
          return pElm ? pElm.getElementsByTagName(tagName) : document.getElementsByTagName(tagName);
      }
  }

  PAGE = {
      pageSize : 10,
      init : function(){
          this.checkSliderWidth();
          window.onresize = this.checkSliderWidth;
          this.getFloders();
      },
      checkSliderWidth : function(){
          var ctrlDiv = DOM.$("sliderCon");
          ctrlDiv.style.width = document.documentElement.offsetWidth < 650 ? "650px" : "100%";

          var folderDiv = DOM.$("folderDiv");
          folderDiv.style.height = document.documentElement.offsetHeight - 306 < 0 ? "0px" : document.documentElement.offsetHeight - 306 + "px";
      },
      getFloders : function(){
          var oThis = this;
          var p = new ajax();
          p.url = "Demo/service/photoFolderList.asp";
          p.onresult = function(){
              var data = this.data.selectSingleNode(".//Data");
              if(null == data) return;
              oThis.buildFolders(data);
          }
          p.send();
      },
      buildFolders : function(data){
          var oThis = this;
          this.focusDiv = null;
          var rows = data.selectNodes(".//row");
          for(var i=0,iLen=rows.length;i<iLen;i++){
              var curRow = rows[i];
              var id = curRow.getAttribute("id");
              var date = curRow.getAttribute("time");
              var name = curRow.firstChild.nodeValue;

              var div = DOM.$C("div",{
                  dataId : id , 
                  title : name ,
                  className : "singleFolder",
                  innerHTML : "<div class='pic'></div><div class='title'>"+name+"</div>"
              });
              DOM.$A(div,DOM.$("folderDiv"));

              var imgD = DOM.$T("div",div)[0];

              imgD.onmouseover = function(){if(this.getAttribute("_hasBeenClicked") != "true") this.className = "picOver";}
              imgD.onmouseout  = function(){if(this.getAttribute("_hasBeenClicked") != "true") this.className = "pic";}
              imgD.onmousedown = function(){if(this.getAttribute("_hasBeenClicked") != "true") this.className = "picDown";}
              imgD.onmouseup = function(){if(this.getAttribute("_hasBeenClicked") != "true") this.className = "picOver";}

              imgD.onclick = function(){
                  oThis.id = this.parentNode.getAttribute("dataId");
                  oThis.getPics(oThis.id,1);

                  if(null != oThis.focusDiv){
                      oThis.focusDiv.className = "pic";
                      oThis.focusDiv.setAttribute("_hasBeenClicked","false");
                  }
                  oThis.focusDiv = this;
                  this.setAttribute("_hasBeenClicked","true");
                  this.className = "picFocus";
              }
              imgD = null;
          }
      },
      getPics : function(id,page){
          DOM.$("pageDiv").style.display = "none";
          this.page = page;
          var oThis = this;
          var p = new ajax();
          p.url = "Demo/service/photoShow.asp?id=" + id + "&page=" + page + "&pageSize=" + this.pageSize;
          p.onresult = function(){
              //_alert(window.clipboardData.setData("text",this.getResponseText()));
              var data = this.data.selectSingleNode(".//SliderPic");
              if(null == data) return;
              var index = parseInt(data.selectNodes(".//row").length / 2);
              var div = DOM.$("sliderCon");
              var slider = new SliderPic();
              slider.container = div;
              slider.data = data;
              slider.imgWidth = 250;
              slider.imgHeight = 250;
              slider.init(index);
              slider.clickEvt = function(elm){
                  oThis.toMax(elm);
              }
              DOM.$("pageDiv").style.display = "";
              var pageInfo = this.data.selectSingleNode(".//PageInfo/info");
              oThis.totalPage = pageInfo.getAttribute("totalPage");
              DOM.$("pageCount").innerHTML = oThis.page + "/" + oThis.totalPage;
              oThis.slider = slider;
          }
          p.send();
      },
      ShowFirst : function(clicked,highlight,elm){
          if(this.page == 1){
              elm.style.backgroundPosition = "0px 0px";
              return;
          }
          if(highlight)
              elm.style.backgroundPosition = "-16px 0px";
          else
              elm.style.backgroundPosition = "0px 0px";
          if(clicked)
              this.getPics(this.id,1);
      },
      ShowPre : function(clicked,highlight,elm){
          if(this.page == 1){
              elm.style.backgroundPosition = "0px -16px";
              return;
          }
          if(highlight)
              elm.style.backgroundPosition = "-16px -16px";
          else
              elm.style.backgroundPosition = "0px -16px";
          if(clicked)
              this.getPics(this.id,this.page - 1);
      },
      ShowNext : function(clicked,highlight,elm){
          if(this.page == this.totalPage){
              elm.style.backgroundPosition = "0px -32px";
              return;
          }
          if(highlight)
              elm.style.backgroundPosition = "-16px -32px";
          else
              elm.style.backgroundPosition = "0px -32px";
          if(clicked)
              this.getPics(this.id,this.page + 1);
      },
      ShowLast : function(clicked,highlight,elm){
          if(this.page == this.totalPage){
              elm.style.backgroundPosition = "0px -48px";
              return;
          }
          if(highlight)
              elm.style.backgroundPosition = "-16px -48px";
          else
              elm.style.backgroundPosition = "0px -48px";
          if(clicked)
              this.getPics(this.id,this.totalPage);
      },
      toMax : function(elm){
          var imgDW = elm.getAttribute("_width");
          var imgDH = elm.getAttribute("_height");
          if(elm.getAttribute("_loaded") != "true" || imgDW == null || imgDH == null)
              return;
          var div = DOM.$("maxImgDiv"),oThis = this,dataID = elm.getAttribute("dataId");
          if(null == div) {
              div = DOM.$C("div",{className : "maxImgDiv",id:"maxImgDiv",innerHTML:"<div class='imgBox'><img border=0 /></div>"});
              DOM.$A(div);
          }
          div.style.display = "";

          DOM.$R(DOM.$T("img",div)[0],DOM.$T("div",div)[0]);
          var curImg = elm.cloneNode(true);
          DOM.$A(curImg,DOM.$T("div",div)[0]);
          curImg.style.width = "1px";
          curImg.style.height = "1px";

          var countW = document.documentElement.offsetWidth - 20,countH = document.documentElement.offsetHeight - 20;
          var toCH = countW * imgDH/imgDW;
          var e = new Effect(curImg);
          if(toCH > countH){
              var toCW = countH * imgDW/imgDH;
              e.resize(toCW,countH,function(){oThis.maxEnd(dataID);},true);
          }else{
              e.resize(countW,toCH,function(){oThis.maxEnd(dataID);},true);
          }

          var fE = new Effect(div);
              fE.fadeIn(function(){
          },.6);
      },
      maxEnd : function(dataID){
          var div = DOM.$("maxImgDiv"),oThis = this;
          var infoDiv = DOM.$("maxImgInfoDiv");
          if(null == infoDiv){
              infoDiv = DOM.$C("div",{id:"maxImgInfoDiv",innerHTML:"<div class='undoDiv' title='关闭'></div><div class='maxImgInfoDiv'></div>"});
              DOM.$A(infoDiv);
          }
          var text = this.slider.data.selectSingleNode(".//row[@id='"+dataID+"']").firstChild.nodeValue;
          DOM.$T("div",infoDiv)[1].innerHTML = text;
          DOM.$T("div",infoDiv)[1].setAttribute("title",text);
          var rect = new BoundingRect(DOM.$T("img",div)[0]);
          with(infoDiv.style){
              display = "";
              position = "absolute";
              left = rect.left + "px";
              top = rect.top + DOM.$T("img",div)[0].offsetHeight - 50 + "px";
              zIndex = "99999";
              width = DOM.$T("img",div)[0].offsetWidth + "px";
              height = "50px";
              filter = "Alpha(opacity=70)";
              opacity = "0.7";
              backgroundColor = "#FFFFFF";
              textAlign = "left";
          }

          DOM.$T("div",infoDiv)[0].onclick = function(){
              oThis.toMin();
          }
      },
      toMin : function(){
          var infoDiv = DOM.$("maxImgInfoDiv");
          infoDiv.style.display = "none";
          var div = DOM.$("maxImgDiv");
          var curImg = DOM.$T("img",div)[0];
          var e = new Effect(curImg);
          e.resize(1,1,function(){
          },true);

          var nE = new Effect(div);
          nE.fadeOut(function(){
              div.style.display = "none";
          },.8);
      }
  }

  window.onload = function(){PAGE.init();};