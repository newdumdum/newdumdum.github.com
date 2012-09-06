  /*
  * 功 能 : 模仿按钮
  * 作 者 : 史纯华
  * 日 期 : 2009-7-30
  */
  var BTN = {
      $G : function(id){
          return document.getElementById(id);
      },
      $C : function(tagName,attrObject){
          var elm = window.document.createElement(tagName);
          var spArr = ["innerHTML","className","cellSpacing","cellPadding","id","colSpan","rowSpan"];
          if(null != attrObject && typeof(attrObject) == "object"){
              for(var item in attrObject){
                  if(spArr.indexOf(item) != -1)
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
      $I : function(elm,oElm,pElm){
          return pElm ? pElm.insertBefore(elm,oElm) : document.body.insertBefore(elm,oElm);
      },
      $R : function(elm,pElm){
          return pElm ? pElm.removeChild(elm) : document.body.removeChild(elm);
      },
      $T : function(tagName,pElm){
          return pElm ? pElm.getElementsByTagName(tagName) : document.getElementsByTagName(tagName);
      },
      $M : function(att){
          if(att && typeof(att) == "string"){
              var reg = /(^\s*)|(\s*$)/g;
              var a = att.split("=")[0].replace(reg,"");
              var v = att.split("=")[1].replace(reg,"");
          }else{
              return [];
          }
          var arr = [];
          var elms = this.$T("*");
          for(var i=0,iLen=elms.length;i<iLen;i++){
              if(elms[i].getAttribute(a) == v){
                  arr.push(elms[i]);
              }
          }
          return arr;
      },
      addEvent : function(elm,type,handler,useCapture){
          try{
              elm.attachEvent("on"+type,function(){handler();});
          }catch(e){
              try{
                  if(null == useCapture) useCapture = false;
                  elm.addEventListener(type,handler,useCapture);
              }catch(e1){
                  elm["on"+type] = function(){
                      handler;
                  }
              }
          }
      },
      initBtns : function(){
          var btns = this.$M("type=btn");
          for(var i=0,iLen=btns.length;i<iLen;i++){
              var btn = btns[i];
              var e = btn.getAttribute("onclick");
              var v = btn.getAttribute("value");
              var img = btn.getAttribute("img");
              btn.className = "BTN";
              var m = this.$C("div",{className:"main"});
              var l = this.$C("div",{className:"left"});
              var c = this.$C("div",{className:"center"});
              var s = this.$C("span",{className:"text",innerHTML:v});
              var r = this.$C("div",{className:"right"});
              this.$A(m,btn),this.$A(l,m),this.$A(c,m),this.$A(r,m),this.$A(s,c);
              if(img && img != ""){
                  var g = this.$C("img",{src:img,border:0});
                  this.$I(g,s,c);
              }
              
              this.addEvent(m,"mouseover",function(event){
                  var evt = event ? event : window.event;
                  var elm = evt.srcElement || evt.target;
                  var pNode = elm.parentNode;
                  while(pNode != null && pNode.className != "main"){
                      pNode = pNode.parentNode;
                  }
                  if(pNode.className == "main")
                      pNode.className = "mainOver";
              });
              this.addEvent(m,"mouseout",function(event){
                  var evt = event ? event : window.event;
                  var elm = evt.srcElement || evt.target;
                  var pNode = elm.parentNode;
                  while(pNode != null && pNode.className != "mainOver"){
                      pNode = pNode.parentNode;
                  }
                  if(pNode.className == "mainOver")
                      pNode.className = "main";
              });
          }
      }
  }
  if(![].indexOf){
      Array.prototype.indexOf = function(key){
          var index = -1;
          for(var i=0,iLen=this.length;i<iLen;i++){
              if(this[i] == key){
                  index = i;
                  break;
              }
          }
          return index;
      }
  }
  BTN.addEvent(window,"load",function(){BTN.initBtns();});