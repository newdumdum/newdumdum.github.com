  /*
  * 功 能 : ajax简单封装
  * 作 者 : 史纯华
  * 日 期 : 2009-7-20
  */

  function ajax(){
      this.url = null;
      this.keys = [];
      this.params = [];
      this.http = null;
      this.data = null;
      this.isIE = true;
  }
  ajax.prototype.CheckBrowser = function(){
      var ua = navigator.userAgent;
      return /msie/.test(ua.toLowerCase());
  }

  ajax.prototype.setContent = function(key,value){
      if(this.keys.IndexOf(key) != -1){
          this.params[this.keys.indexOf(key)] = value;
      }else{
          this.keys.push(key);
          this.params.push(value);
      }
  }

  ajax.prototype.send = function(){
      this.showWatingLayer(true);
      var params = "<Request>";
      for(var i=0,iLen=this.keys.length;i<iLen;i++){
          params += "<Name><![CDATA["+this.keys[i]+"]]></Name>";
          params += "<Value><![CDATA["+this.params[i]+"]]></Value>";
      }
      params += "</Request>";

      this.isIE = this.CheckBrowser();
      this.http = this.Http();

      var oThis = this;

      this.http.onreadystatechange = function(){
          if(4 == oThis.http.readyState){
              if(oThis.http.status == 0 || oThis.http.status == 200){
                  oThis.xmlText = oThis.http.responseText;
              }
              oThis.GetXml();
          }
      }

      this.http.open("POST", this.url, true);
      this.http.setRequestHeader("REQUEST-TYPE","xmlhttp");
      //this.http.setRequestHeader("REFERER", this.url);
      this.http.setRequestHeader("CONTENT-TYPE","text/xml");
      this.http.setRequestHeader("CONTENT-TYPE","application/octet-stream");   
      //this.http.setRequestHeader("CONTENT-LENGTH",params.length);
      this.http.send(params);
  }

  ajax.prototype.Http = function(){  
      if(window.ActiveXObject){
          var service = ["MSXML2.XMLHTTP", "Microsoft.XMLHTTP", "MSXML.XMLHTTP", "MSXML3.XMLHTTP"];
          for(var i = 0 , iLen = service.length ; i < iLen ; i ++){
              try{
                  return new ActiveXObject(service[i]);
              }catch(ex){
              }
          }
          alert("您的浏览器不支持XMLHTTP");
      }else if(window.XMLHttpRequest){
          return new XMLHttpRequest();
      }else{
          alert("您的浏览器不支持XMLHTTP");
          return null;
      }
  }

  ajax.prototype.GetXml = function(){
      var xmlstr = this.xmlText;
      this.xmldom = null;
      this.parser = null;
      if(window.ActiveXObject){
          var service = ["MSXML2.DOMDOCUMENT", "Microsoft.DOMDOCUMENT", "MSXML.DOMDOCUMENT", "MSXML3.DOMDOCUMENT"];
          for(var i = 0 , iLen = service.length ; i < iLen ; i ++){
              try{
                  this.xmldom = new ActiveXObject(service[i]);
              }catch(ex){
              }
          }
          if(null == this.xmldom){
              alert("您浏览器未安装任何XML解析器");
          }
      }else if(window.DOMParser){
          this.parser = new DOMParser();
      }
      if(xmlstr!=null){
          this.text = xmlstr;
          this.loadXML(xmlstr);
      }
  }  
  ajax.prototype.loadXML = function(xmlstr){
      if(window.ActiveXObject){
          this.xmldom.async = false;
          this.xmldom.loadXML(xmlstr);
      }else if(window.DOMParser){
          this.xmldom = this.parser.parseFromString(xmlstr, "text/xml");
          this.addProperty();
      }
      this.data = this.xmldom.documentElement;
      this.onresult();
      this.showWatingLayer(false);
  }

  // 为FF添加selectNodes
  ajax.prototype.addProperty = function(){
      if( document.implementation.hasFeature("XPath", "3.0") ){
          XMLDocument.prototype.selectNodes = function(cXPathString, xNode){
              if( !xNode ){ 
                  xNode = this; 
              } 
              var oNSResolver = this.createNSResolver(this.documentElement);
              var aItems = this.evaluate(cXPathString, xNode, oNSResolver, 
              XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
              var aResult = [];
              for( var i = 0; i < aItems.snapshotLength; i++){
                  aResult[i] = aItems.snapshotItem(i);
              }
              return aResult;
          }

          Element.prototype.selectNodes = function(cXPathString){
              if(this.ownerDocument.selectNodes){
                  return this.ownerDocument.selectNodes(cXPathString, this);
              }else{
                  throw "For XML Elements Only";
              }
          }
      }

      if( document.implementation.hasFeature("XPath", "3.0") ){
          XMLDocument.prototype.selectSingleNode = function(cXPathString, xNode){
              if( !xNode ){
                  xNode = this; 
              } 
              var xItems = this.selectNodes(cXPathString, xNode);
              if( xItems.length > 0 ){
                  return xItems[0];
              }else{
                  return null;
              }
          }

          // prototying the Element
          Element.prototype.selectSingleNode = function(cXPathString){ 
              if(this.ownerDocument.selectSingleNode){
                  return this.ownerDocument.selectSingleNode(cXPathString, this);
              }else{
                  throw "For XML Elements Only";
              }
          }
      }	
	}

  ajax.prototype.onresult = function(){
  }

  ajax.prototype.showWatingLayer = function(show){
      var layer = document.getElementById("ajaxWaitingLayer");
      if(show){
          if(null == layer){
              layer = document.createElement("div");
              layer.id = "ajaxWaitingLayer";
              layer.className = "ajaxWaitingLayer";
              layer.innerHTML = "<TABLE width=\"100%\" height=\"100%\"><TR><TD align=\"center\" valign=\"middle\"><span style=\"border:1px solid #7998B7;width:186pxpx;height:22px;background:#FFFFFF;padding:2px;display:inline-block;\"><span class='waitImg'></span><span style=\"font:normal 12px Verdana;color:#2B61BA; height:22px; padding:5px 2px 0px 5px;\">Loading...</span></span></TD></TR></TABLE><div style=\"background:transparent;filter:alpha(opacity=0);-moz-opacity:0;-khtml-opacity:0;width:100%;height:100%;position:absolute;left:0;top:0;z-index:10000;\"></div>";
              document.body.appendChild(layer);
          }
          layer.style.display = "block";
      }else{
          if(layer)
              setTimeout(function(){layer.style.display = "none";},300);
      }
  }

  
  Array.prototype.IndexOf = function(str){
      var index = -1;
      for(var i = 0 , iLen = this.length ; i < iLen ; i ++){
          if(this[i] == str){
              index = i;
              break;
          }
      }
      return index;
  }