  /*
  * 功 能 : 决策树构建JS
  * 日 期 : 2008-7-11
  * 作 者 : IRD 史纯华
  */

  function VerticalTree(){
      // xml数据
      this.data = null;

      // 生成树的父容器
      this.container = null;

      // 节点最大深度
      this.maxDepth = 0;

      // 单个节点生成后高度
      this.nodeHeight = 55;

      // 单个节点生成后宽度
      this.nodeWidth = 190;

      // 根节点左边距
      this.paddingLeft = 15;

      // 生成HTML后 节点的宽度和高度
      this.nodeOffsetWidth = 126;
      this.nodeOffsetHeight = 43;

      // 线的颜色及样式
      this.lineColor = "#93B3D9";
      this.lineStyle = "solid";

      // 点击节点展开闭合时 滚动条微调参数
      this.adjustHeight = 20;

      // 是否给出节点名称提示
      this.showTextInfo = false;
  }

  VerticalTree.prototype.$ = function(id){
      return document.getElementById(id);
  }
  VerticalTree.prototype.$C = function(tagName,attrObject){
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
  }
  VerticalTree.prototype.$A = function(elm,pElm){
      return pElm ? pElm.appendChild(elm) : document.body.appendChild(elm);
  }
  VerticalTree.prototype.$R = function(elm,pElm){
      return pElm ? pElm.removeChild(elm) : document.body.removeChild(elm);
  }
  VerticalTree.prototype.$T = function(tagName,pElm){
      return pElm ? pElm.getElementsByTagName(tagName) : document.getElementsByTagName(tagName);
  }
  VerticalTree.prototype.$M = function(att){
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
  }
  /*
  * 功  能: Array 对象扩展
  * 作  者: IRD ShiCH
  * 参  数: 数据值
  * 返回值: true/false
  */
  Array.prototype.Contains = function(str){
      var isHas = false;
      for(var i = 0 , iLen = this.length ; i < iLen ; i ++){
          if(this[i] == str){
              isHas = true;
              break;
          }
      }
      return isHas;
  }

  /*
  * 功  能: Array 对象扩展
  * 作  者: IRD ShiCH
  * 参  数: 数据值
  * 返回值: 索引值
  */
  Array.prototype.Index = function(str){
      var curIndex = null;
      for(var i = 0 , iLen = this.length ;i < iLen ; i ++){
          if(this[i] == str){
              curIndex = i;
              break;
          }
      }
      return curIndex;
  }

  VerticalTree.prototype.init = function(){
      this.ImageURL = this.container.getAttribute("icon");
      this.containerRect = this.BoundingRect(this.container);
      this.container.className = "treeOutDiv";
      this.bakData = this.data.cloneNode(true);
      this.removeUnExpandNode();
      this.SetDepth(this.data,0);
      this.SetPosX();
      this.SetPosY();
      this.BuildTree();
      this.BuildLine();
  }

  VerticalTree.prototype.removeUnExpandNode = function(){
      var tmpArr = new Array();
      var nodes = this.data.selectNodes(".//TreeNode");
      var nLen = nodes.length;
      for(var i = 0 ; i < nLen ; i++){
          var node = nodes[i];
          if(node.getAttribute("_opened") == "false"){
              var cLen = node.selectNodes("./TreeNode").length;//alert(cLen);
              for(var k = 0 ; k < cLen ; k++){
                  var id = node.selectNodes("./TreeNode")[k].getAttribute("id");
                  tmpArr.push(id);
              }
          }
          if(node.selectNodes("./TreeNode").length != 0){
              node.setAttribute("_hasChildNodes","true");
          }
      }
      var tLen = tmpArr.length;
      for(var j = 0 ; j < tLen ; j++){
          var curNode = this.data.selectSingleNode(".//TreeNode[@id='"+tmpArr[j]+"']");
          try{
              var pNode = curNode.parentNode;
              pNode.removeChild(curNode);
          }catch(e){
          }
      }
  }

  VerticalTree.prototype.SetDepth = function(curNode,depth){
      this.maxDepth = this.maxDepth > depth ? this.maxDepth : depth;
      depth = depth + 1;
      var nodes = curNode.selectNodes("./TreeNode");
      var nLen = nodes.length;
      for(var i = 0 ; i < nLen ; i++){
          var node = nodes[i];
          node.setAttribute("_depth",depth);
          this.SetDepth(node,depth);
      }
  }

  VerticalTree.prototype.SetHeight = function(){
      for(var i = this.maxDepth; i > 0; i --){
          var nodes = this.data.selectNodes(".//TreeNode[@_depth='"+i+"']");
          var nLen = nodes.length;
          for(var j = 0; j < nLen; j ++){
              var curNode = nodes[j];
              if(curNode.selectNodes("./TreeNode").length == 0){
                  curNode.setAttribute("_height",this.nodeHeight);
              }
              var pNode = curNode.parentNode;
              if(null != pNode && pNode.nodeName != "Tree"){
                  var pHeight = pNode.getAttribute("_height");
                  var curHeight = curNode.getAttribute("_height");
                  if(null == pHeight){
                      pNode.setAttribute("_height",curHeight);
                  }else{
                      pNode.setAttribute("_height",Math.floor(pHeight) + Math.floor(curHeight));
                  }
              }
          }
      }
  }

  VerticalTree.prototype.SetPosX = function(){
      for(var i = this.maxDepth; i > 0; i --){
          var nodes = this.data.selectNodes(".//TreeNode[@_depth='"+i+"']");
          var nLen = nodes.length;
          for(var j = 0; j < nLen; j ++){
              var curNode = nodes[j];
              curNode.setAttribute("_order",j);
              var left = i == 1 ? this.paddingLeft : this.paddingLeft + this.nodeWidth * (i-1);
              curNode.setAttribute("_posX",left);
          }
      }
  }

  VerticalTree.prototype.SetPosY = function(){
      this.SetHeight();
      for(var i = 1; i <= this.maxDepth; i ++){
          var nodes = this.data.selectNodes(".//TreeNode[@_depth='"+i+"']");
          var nLen = nodes.length;
          for(var j = 0; j < nLen; j ++){
              var curNode = nodes[j];
              var height = curNode.getAttribute("_height");
              var pNode,cLen,pPosY,cOrder,preHeight;
              pNode = curNode.parentNode;
              if(pNode != null && pNode.nodeName != "Tree"){
                  cLen = pNode.selectNodes("./TreeNode").length;
                  pPosY = pNode.getAttribute("_posY");
                  cOrder = curNode.getAttribute("_order");
                  var pHeight = pNode.getAttribute("_height");
                  preHeight = this.GetPreviousNodesHeight(i,cOrder,curNode);
                  pPreHeight = this.GetPreviousNodesHeight(i-1,pNode.getAttribute("_order"),pNode);
              }
              var top;
              if(i == 1){
                  top = Number(height/2) - Number((this.nodeHeight)/2);
              }else{
                  top = Number(pPosY) - Number(pHeight/2) + Number(preHeight) + Number(height/2); 
              }
              curNode.setAttribute("_posY",Math.floor(top)+1);
          }
      }
  }

  VerticalTree.prototype.GetPreviousNodesHeight = function(layer,order,node){
      var pNode = node.parentNode;
      var pId = pNode.getAttribute("id");
      var nodes = this.data.selectNodes(".//TreeNode[@_depth='"+layer+"' and @_order<'"+order+"']");
      var height = 0;
      var nLen = nodes.length;
      for(var i = 0 ; i < nLen ; i++){
          var curNode = nodes[i];
          var curHeight = curNode.getAttribute("_height");
          var curPnode = curNode.parentNode;
          var id = curPnode.getAttribute("id");
          if(id == pId){
              height = Number(height) + Number(curHeight);
          }
      }
      return height;
  }

  VerticalTree.prototype.BuildTree = function(){
      for(var i = 1; i <= this.maxDepth; i ++){
          var nodes = this.data.selectNodes(".//TreeNode[@_depth='"+i+"']");
          var nLen = nodes.length;
          for(var j = 0; j < nLen; j ++){
              var curNode = nodes[j];
              this.GiveTreeNodeContent(curNode);
          }
      }
  }

  VerticalTree.prototype.GiveTreeNodeContent = function(curNode){
      var oThis = this;
      var posX = curNode.getAttribute("_posX");
      var posY = curNode.getAttribute("_posY");
      var id = curNode.getAttribute("id");
      var name = curNode.getAttribute("name");
      var type = curNode.getAttribute("type");
      var maxValue = curNode.getAttribute("maxValue");
      var minValue = curNode.getAttribute("minValue");
      var curValue = curNode.getAttribute("curValue");
      var colorDir = curNode.getAttribute("colorDir");
      var blockValueType = curNode.getAttribute("blockValueType");

      var treeBox = this.$C("div",{
          className:"nodeCon",
          id:"node_" + id,
          dataID:id
      });
      treeBox.style.left = posX + "px";
      treeBox.style.top = posY + "px";
      this.$A(treeBox,this.container);

      var treeNameDiv = this.$C("div",{
          className:"nodeDes",
          innerHTML:"<nobr>" + name + "</nobr>"
      });
      this.$A(treeNameDiv,treeBox);
      treeNameDiv.onclick = function(){oThis.editNodeName(this);};

      if(type != "3"){
          var valueDiv = this.$C("div",{
              className:"nodeValue",
              innerHTML:curValue
          });
          if(type == "1"){
              valueDiv.innerHTML = curValue;
              valueDiv.setAttribute("maxValue",maxValue);
              valueDiv.setAttribute("minValue",minValue);
          }else if(type == "4" && blockValueType == "1"){
              valueDiv.innerHTML = curValue;
              valueDiv.setAttribute("maxValue",maxValue);
              valueDiv.setAttribute("minValue",minValue);
          }else{
              valueDiv.innerHTML = curValue + "%";
              valueDiv.setAttribute("maxValue",maxValue + "%");
              valueDiv.setAttribute("minValue",minValue + "%");
          }
          valueDiv.setAttribute("type",type);
          valueDiv.setAttribute("blockValueType",blockValueType);
          this.$A(valueDiv,treeBox);
          
          if(type != "4"){
              var percentDiv = this.$C("div",{
                  className:type == "5" ? "" : "nodePer",
                  innerHTML:type == "5" ? "<div class='chTextDiv'><input type='text' class='chText' /></div>" : "<div class=\"nodePerValue\"></div>"
              });
              this.$A(percentDiv,treeBox);
          }else{
              var blockDiv = this.$C("div",{
                  className:"slideBarCon",
                  innerHTML:"<div class=\"moveDiv_block\"><div class=\"moveDiv_blockNode\"></div></div>"
              });
              var cDiv = blockDiv.getElementsByTagName("div")[0];
              cDiv.onmousemove = function(e){
                  oThis.judgePointerPos(this,e);
              }
              cDiv.onmousedown = function(){
                  oThis.signMoveEvent(this);
              }
              cDiv.onmouseup = function(){
                  oThis.stopPointerMove(this);
              }
              this.$A(blockDiv,treeBox);
          }
      }

      this.GiveExpandCmd(curNode,id,posX,posY);

      if(this.showTextInfo){
          oThis.GiveNodeDetailLayer(treeBox);
      }

      if(type != "3" && type != "4" && type != "5"){
          if(colorDir == "1"){
              this.RefreshNodePercentImg(treeBox);
          }else{
              this.RefreshNodePercentImgDeorder(treeBox);
          }
      }else if(type == "4"){
          this.GiveBlockDefPos(treeBox);
      }else if(type == "5"){
          this.AddTextEvent(treeBox,percentDiv);
      }
  }

  VerticalTree.prototype.GiveExpandCmd = function(curNode,id,posX,posY){
      var oThis = this;
      if(curNode.getAttribute("_hasChildNodes") == "true"){
          var imgDiv = this.$C("div",{
              className:"expandDiv",
              nodeID:id
          });
          var imgSrc = "";
          var opened = curNode.getAttribute("_opened");
          if(opened == "false"){
              imgSrc = oThis.ImageURL + "expand.gif";
          }else{
              imgSrc = oThis.ImageURL + "contract.gif";
          }
          imgDiv.innerHTML = "<img src=\""+imgSrc+"\">";
          with(imgDiv.style){
              left = Math.floor(posX) + Math.floor(this.nodeOffsetWidth) - 13 + "px";
              top = Math.floor(posY) + Math.floor(this.nodeOffsetHeight/2) - 13/2 + "px";
          }
          this.$A(imgDiv,this.container);
          imgDiv.onclick = function(e){
              oThis.showWaitingLayer();
              var tarNode = oThis.data.selectSingleNode(".//TreeNode[@id='"+this.getAttribute("nodeID")+"']");
              var isOpen = tarNode.getAttribute("_opened");
              if(isOpen == "false"){
                  tarNode.setAttribute("_opened","true");
                  this.firstChild.src = oThis.ImageURL + "contract.gif";
                  var treeNode = oThis.bakData.selectSingleNode(".//TreeNode[@id='"+this.getAttribute("nodeID")+"']").cloneNode(true);
                  oThis.AddChildNodes(tarNode,treeNode);
                  oThis.onExpand(tarNode);
              }else{
                  tarNode.setAttribute("_opened","false");
                  this.firstChild.src = oThis.ImageURL + "expand.gif";
              }
              var evt = e ? e : event;
              oThis.RebuildTree();
              oThis.AdjustScrollBar(this.getAttribute("nodeID"),evt.clientY);
              oThis.hideWaitingLayer();
          }
      }
  }

  VerticalTree.prototype.AddChildNodes = function(pNode,curNode){
      var treeNodes = curNode.selectNodes("./TreeNode");
      var tLen = treeNodes.length;
      for(var i = 0 ; i < tLen ; i++){
          pNode.appendChild(treeNodes[i]);
          this.AddChildNodes(treeNodes[i],treeNodes[i]);
      }
  }

  VerticalTree.prototype.BuildLine = function(){
      var lineDiv = this.$C("div");
      this.$A(lineDiv,this.container);
      var str = [];

      var isIE = /msie/i.test(navigator.userAgent),lineStyleStr = "1px "+this.lineStyle+" "+this.lineColor;
      
      for(var i = 1; i < this.maxDepth + 1; i ++){
          var nodes = this.data.selectNodes(".//TreeNode[@_depth='"+i+"']");
          var nLen = nodes.length;
          for(var j = 0; j < nLen; j ++){
              var curNode = nodes[j];
              var posX = Math.floor(Number(curNode.getAttribute("_posX")) + this.nodeOffsetWidth);
              var posY = Math.floor(Number(curNode.getAttribute("_posY")) + Number(this.nodeOffsetHeight/2));
              var posX_E1 = Math.floor(posX + Number((this.nodeWidth - this.nodeOffsetWidth)/2));
              var posY_E1 = Math.floor(posY);

              if(curNode.selectNodes("./TreeNode").length != 0){                  
                  var l0 = (posX < posX_E1 ? posX : posX_E1) + 1;
                  var t0 = (posY < posY_E1 ? posY : posY_E1) - (isIE ? 1 : 0);
                  var w0 = Math.abs(posX_E1-posX) == 0 ? 1 : Math.abs(posX_E1-posX);
                  var h0 = Math.abs(posY_E1-posY) == 0 ? 1 : Math.abs(posY_E1-posY);
                  str[str.length] = "<div class='treeLine' style='left:"+l0+"px;top:"+t0+"px;width:"+w0+"px;height:"+h0+"px;border-bottom:"+lineStyleStr+";'></div>";


                  var childNodes = curNode.selectNodes("./TreeNode");
                  var cLen = childNodes.length;
                  for(var k = 0 ; k < cLen ; k++){
                      var cNode = childNodes[k];
                      var cPosX = Math.floor(Number(cNode.getAttribute("_posX")) - Number((this.nodeWidth - this.nodeOffsetWidth)/2));
                      var cPosY = Math.floor(Number(cNode.getAttribute("_posY")) + Number(this.nodeOffsetHeight/2));

                      var cPosX_E = Math.floor(cPosX + Number((this.nodeWidth - this.nodeOffsetWidth)/2));
                      var cPosY_E = cPosY;

                      var l1 = posX_E1 < cPosX ? posX_E1 : cPosX;
                      var t1 = posY_E1 < cPosY ? posY_E1 : cPosY;
                      var l2 = cPosX < cPosX_E ? cPosX : cPosX_E;
                      var t2 = cPosY < cPosY_E ? cPosY : cPosY_E;
                      var w1 = Math.abs(cPosX-posX_E1) == 0 ? 1 : Math.abs(cPosX-posX_E1);
                      var h1 = Math.abs(cPosY-posY_E1) == 0 ? 1 : Math.abs(cPosY-posY_E1);
                      var w2 = Math.abs(cPosX_E-cPosX) == 0 ? 1 : Math.abs(cPosX_E-cPosX);
                      var h2 = Math.abs(cPosY_E-cPosY) == 0 ? 1 : Math.abs(cPosY_E-cPosY);
                      str[str.length] = "<div class='treeLine' style='left:"+l1+"px;top:"+t1+"px;width:"+w1+"px;height:"+h1+"px;border-left:"+lineStyleStr+";'></div>";
                      str[str.length] = "<div class='treeLine' style='left:"+l2+"px;top:"+t2+"px;width:"+w2+"px;height:"+h2+"px;border-top:"+lineStyleStr+";'></div>";
                  }
              }
          }
      }
      lineDiv.innerHTML = str.join("\r\n");
  }

  VerticalTree.prototype.RebuildTree = function(){
      this.container.innerHTML = "";
      this.removeAttributes();
      this.removeUnExpandNode();
      this.SetDepth(this.data,0);
      this.SetPosX();
      this.SetPosY();
      this.BuildTree();
      this.BuildLine();
  }

  VerticalTree.prototype.removeAttributes = function(){
      var nodes = this.data.selectNodes(".//TreeNode");
      var nLen = nodes.length;
      for(var i = 0 ; i < nLen ; i++){
          var curNode = nodes[i];
          curNode.removeAttribute("_depth");
          curNode.removeAttribute("_posX");
          curNode.removeAttribute("_posY");
          curNode.removeAttribute("_height");
          curNode.removeAttribute("_order");
      }
  }

  VerticalTree.prototype.AdjustScrollBar = function(id,Y){
      var node = this.data.selectSingleNode(".//TreeNode[@id='"+id+"']");
      var newY = Math.floor(node.getAttribute("_posY"));
      var depth = Math.floor(node.getAttribute("_depth"));
      var marge = newY - Y;
      var scrollTop = this.containerRect.top + marge + (this.maxDepth - depth) * 20;
      this.container.scrollTop = scrollTop;
  }

  VerticalTree.prototype.RefreshTreeNode = function(id,value){
      var curNode = this.data.selectSingleNode(".//TreeNode[@id='"+id+"']");
      var bakNode = this.bakData.selectSingleNode(".//TreeNode[@id='"+id+"']");
      if(null != curNode){
          curNode.setAttribute("curValue",value);
      }
      if(null != bakNode){
          bakNode.setAttribute("curValue",value);
      }
  }

  VerticalTree.prototype.GetTreeData = function(){
      return this.data;
  }

  VerticalTree.prototype.GetTreeHTML = function(){
      return this.container.innerHTML;
  }
  VerticalTree.prototype.onExpand = function(treeNode){}


  VerticalTree.prototype.editNodeName = function(obj){
      var oThis = this;
      if(obj.firstChild.nodeName.toUpperCase() != "INPUT"){
          obj.setAttribute("showText",obj.innerText || obj.textContent);
          obj.innerHTML = "<input type=\"input\" onselect=\"\" onselectstart=\"\" value=\"" + obj.getAttribute("showText") + "\" class=\"nodeDesInput\" />";
          obj.firstChild.focus();
          var ipt = obj.getElementsByTagName("input")[0];
          if(null != ipt){
              ipt.onblur = function(){
                  oThis.refreshNodeName(this);
              }
          }
      }
  }

  VerticalTree.prototype.refreshNodeName = function(obj){
      var div = obj.parentNode;
      div.setAttribute("showText",obj.value);
      div.innerHTML = "<nobr>" + obj.value + "</nobr>";
  }

  VerticalTree.prototype.GiveNodeDetailLayer = function(obj){
      var oThis = this;
      obj.onmousemove = function(e){
          var evt = e ? e : event;
          var eX = evt.clientX;
          var eY = evt.clientY;
          oThis.showDetailTextLayer(this.firstChild,eX,eY);
      }
      obj.onmouseout = function(){oThis.hideDetailTextLayer();};
  }

  VerticalTree.prototype.showDetailTextLayer = function(textObj,eX,eY){
      var layer = this.$("DetailTextLayer");
      if(null == layer){
          layer = this.$C("div",{id:"DetailTextLayer"});
          this.$A(layer);
      }
      if(textObj.firstChild.nodeName.toUpperCase() == "INPUT"){this.hideDetailTextLayer();return;}
      layer.innerHTML = textObj.nextSibling == null ? (textObj.innerText || textObj.textContent) : (textObj.innerText || textObj.textContent) + "<br><span style=\"font:normal 10px Verdana;white-space:nowrap;\"> [ " + textObj.nextSibling.innerHTML + " ]</span>";
      layer.style.display = "";
      var lW = layer.offsetWidth;
      var lH = layer.offsetHeight;
      layer.style.left = (eX + 10 + lW > this.containerRect.left + this.container.offsetWidth ? eX - 5 - lW : eX + 10) + "px";
      layer.style.top = (eY + 10 + lH > this.containerRect.top + this.container.offsetHeight ? eY - lH : eY + 10) + "px";
  }
  VerticalTree.prototype.hideDetailTextLayer = function(){
      var layer = this.$("DetailTextLayer");
      layer.style.display = "none";
  }

  VerticalTree.prototype.RefreshNodePercentImg = function(obj){
      var nodeType = obj.firstChild.nextSibling.getAttribute("type");
      var maxValue = obj.firstChild.nextSibling.getAttribute("maxValue");
      var minValue = obj.firstChild.nextSibling.getAttribute("minValue");

      var nodeValue = obj.firstChild.nextSibling.innerHTML;
      nodeValue = nodeType == 1 ? nodeValue : nodeValue.substring(0,nodeValue.indexOf("%"));
      nodeValue = nodeType == 1? Number(nodeValue/(maxValue - minValue)) : Number(Number(nodeValue)/100);
      var nodeShow = obj.lastChild.firstChild;

      var maxWidth = Number(nodeShow.offsetWidth);
      var xValue = 0 - (100 - maxWidth*nodeValue);
      xValue = xValue > 0 ? 0 : xValue;
      var posX = xValue + "px";
      var posY = this.getPosY(nodeValue);

      var posStr = String(posX) + " " + String(posY);
      nodeShow.style.backgroundPosition = posStr;
  }
  
  VerticalTree.prototype.RefreshNodePercentImgDeorder = function(obj){
      var nodeType = obj.firstChild.nextSibling.getAttribute("type");
      var maxValue = obj.firstChild.nextSibling.getAttribute("maxValue");
      var minValue = obj.firstChild.nextSibling.getAttribute("minValue");

      var nodeValue = obj.firstChild.nextSibling.innerHTML;
      nodeValue = nodeType == 1 ? nodeValue : nodeValue.substring(0,nodeValue.indexOf("%"));
      nodeValue = nodeType == 1? Number(nodeValue/(maxValue - minValue)) : Number(Number(nodeValue)/100);
      var nodeShow = obj.lastChild.firstChild;

      var maxWidth = Number(nodeShow.offsetWidth);
      var xValue = 0 - (100 - maxWidth*nodeValue);
      xValue = xValue > 0 ? 0 : xValue;
      var posX = xValue + "px";
      var posY = this.getPosYDeorder(nodeValue);

      var posStr = String(posX) + " " + String(posY);
      nodeShow.style.backgroundPosition = posStr;
  }

  VerticalTree.prototype.getPosY = function(nodeValue){
      var posY = "0px";
      if(nodeValue <= 0.25){
          posY = "0px";
      }else if(nodeValue > 0.25 && nodeValue <= 0.5){
          posY = "-7px";
      }else if(nodeValue > 0.5 && nodeValue <= 0.75){
          posY = "-14px";
      }else if(nodeValue > 0.75){
          posY = "-21px";
      }
      return posY;
  }
  
  VerticalTree.prototype.getPosYDeorder = function(nodeValue){
      var posY = "0px";
      if(nodeValue <= 0.25){
          posY = "-21px";
      }else if(nodeValue > 0.25 && nodeValue <= 0.5){
          posY = "-14px";
      }else if(nodeValue > 0.5 && nodeValue <= 0.75){
          posY = "-7px";
      }else if(nodeValue > 0.75){
          posY = "0px";
      }
      return posY;
  }

  VerticalTree.prototype.GiveBlockDefPos = function(obj){
      var infoObj = obj.firstChild.nextSibling;
      var block = infoObj.nextSibling.firstChild.firstChild;
      var maxValue = infoObj.getAttribute("maxValue");
      var minValue = infoObj.getAttribute("minValue");
      var valueType = infoObj.getAttribute("type");
      var defValue = infoObj.innerHTML;
      var posX;
      if(valueType == 1){
          posX = 100 * (defValue / (maxValue - minValue));
      }else{
          posX = 100 * (parseFloat(defValue) / (parseFloat(maxValue) - parseFloat(minValue)));
      }
      with(block.style){
          position = "relative";
          left = posX + "px";
          top = "1px";
          zIndex = "1000";
      }
  }
  VerticalTree.prototype.signMoveEvent = function(obj){
      obj.__isDrag = "true";
      var block = obj.getElementsByTagName("div")[0];
      try{block.setCapture();}catch(e){};
      obj.setAttribute("_left",this.BoundingRect(obj).left);
      this.TreeNodeMoveStartCommand();
  }

  VerticalTree.prototype.judgePointerPos = function(obj,eventObj){
      var __tmpValue = null;
      var infoDiv = obj.parentNode.parentNode.firstChild.nextSibling;
      var maxValue = infoDiv.getAttribute("maxValue");
      var minValue = infoDiv.getAttribute("minValue");
      var valueType = infoDiv.getAttribute("type");
      var valueTypeBlock = infoDiv.getAttribute("blockValueType");
      var oThis = obj.firstChild;
      if(null == eventObj){eventObj = window.event;};

      var curX = eventObj.clientX;
      var curY = eventObj.clientY;
      if(obj.__isDrag == "true"){
          var blockX = curX - obj.getAttribute("_left");
          if(blockX < 0){blockX = 0;};
          if(blockX > 100){blockX = 100;};
          with(oThis.style){
              position = "relative";
              left = blockX - 5 + "px";
              top = "1px";
              zIndex = "1000";
          }
          //__tmpValue = valueType == 1 ? Math.floor((blockX/100) * (maxValue - minValue)) : (valueTypeBlock == "1" && valueType == "4" ) ? Math.floor((blockX/100) * (maxValue - minValue)) : Math.floor((blockX/100) * (Number(maxValue) - Number(minValue))) + "%";
          var refreshValue = null;
          if(valueType == 1){
              refreshValue = Math.floor((blockX/100) * (maxValue - minValue));
              __tmpValue = refreshValue;
          }else if(valueTypeBlock == "1" && valueType == "4" ){
              refreshValue = Math.floor((blockX/100) * (maxValue - minValue));
              __tmpValue = refreshValue;
          }else{
              refreshValue = Math.floor((blockX/100) * (parseFloat(maxValue) - parseFloat(minValue)));
              __tmpValue = refreshValue + "%";
          }
          
          infoDiv.innerHTML = __tmpValue;
          obj.__tmpValue = __tmpValue;
          this.TreeNodeMoveCommand();

          var node = obj.parentNode.parentNode;
          var treeId = node.getAttribute("id");
          var id = treeId.substring(treeId.indexOf("_")+1);
          this.RefreshXMLValue(id,refreshValue);
      }
  }
  VerticalTree.prototype.stopPointerMove = function(obj){
      var oThis = this;
      if(obj.__isDrag == "true"){
          obj.__isDrag = "false";
          if(obj.__tmpValue == null){return;};
          var block = obj.getElementsByTagName("div")[0];
          try{
              oThis.hideDetailTextLayer();
              block.releaseCapture();
          }catch(e){
          }
          this.TreeNodeMoveEndCommand();
      }
  }

  VerticalTree.prototype.BoundingRect = function(elm){
      var absTop = 0;
      var absLeft = 0;
      var tempObj = elm;
      while(tempObj != document.body){
          absTop += tempObj.offsetTop - tempObj.offsetParent.scrollTop;
          absLeft += tempObj.offsetLeft - tempObj.offsetParent.scrollLeft;
          tempObj = tempObj.offsetParent;
      }
      return {top:absTop,left:absLeft};
  }
  
  VerticalTree.prototype.RefreshXMLValue = function(id,value){
      var node    = this.data.selectSingleNode(".//TreeNode[@id='"+id+"']");
      var nodeBak = this.bakData.selectSingleNode(".//TreeNode[@id='"+id+"']");
      node.setAttribute("curValue",value);
      if(null != nodeBak){
          nodeBak.setAttribute("curValue",value);
      }
  }

  VerticalTree.prototype.AddTextEvent = function(treeBox,elm){
      var ipt = this.$T("input",elm)[0],oThis = this;
      ipt.onkeyup = ipt.onpaste = function(){
          if(event.keyCode == 13 || event.keyCode == 10){
              if(!/(^\-{0,1}\d+\.{0,1}\d+$)|(^\-{0,1}\d+$)/.test(this.value)){
                  var o = this.value.match(/(\-{0,1}\d+\.{0,1}\d+)|(\-{0,1}\d+)/);
                  var lValue = o ? o[0] : "";
                  this.value = lValue;//Number(lValue);
                  return false;
              }
              if(this.value != "") oThis.updateValue(treeBox,this.value);
          }
      }
  }

  VerticalTree.prototype.updateValue = function(treeBox,v){
      var id = treeBox.getAttribute("dataID");
      this.RefreshXMLValue(id,Number(v));
      var div = this.$T("div",treeBox)[1];
      div.innerHTML = Number(v) + div.innerHTML.replace(/(\-{0,1}\d+\.{0,1}\d+)|(\-{0,1}\d+)/,"");
      this.ChangeTextBoxValue();
  }

  VerticalTree.prototype.showWaitingLayer = function(){
      var layer = this.$("vTreeWaitingLayer");
      if(null == layer){
          layer = this.$C("div",{id:"vTreeWaitingLayer",
            className:"vTreeWaitingLayer",
            innerHTML:"<TABLE width=\"100%\" height=\"100%\"><TR><TD align=\"center\" valign=\"middle\"><span style=\"border:1px solid #7998B7;width:186pxpx;height:22px;background:#FFFFFF;padding:2px;display:inline-block;\"><span class='vTreewaitImg'></span><span style=\"font:normal 12px Verdana;color:#2B61BA; height:22px; padding:5px 2px 0px 5px;\">Loading...</span></span></TD></TR></TABLE><div style=\"background:transparent;filter:alpha(opacity=0);-moz-opacity:0;-khtml-opacity:0;width:100%;height:100%;position:absolute;left:0;top:0;z-index:10000;\"></div>"});
          this.$A(layer);
      }
      layer.style.display = "block";
  }
  VerticalTree.prototype.hideWaitingLayer = function(){
          var layer = this.$("vTreeWaitingLayer");
          if(layer)
              setTimeout(function(){layer.style.display = "none";},300);
  }

  VerticalTree.prototype.ChangeTextBoxValue = function(){
  }

  
  VerticalTree.prototype.TreeNodeMoveStartCommand = VerticalTree.prototype.TreeNodeMoveCommand = VerticalTree.prototype.TreeNodeMoveEndCommand = function(){};