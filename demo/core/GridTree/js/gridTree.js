  /*
  * 功 能 : 简单的GRIDTREE
  * 作 者 : 史纯华
  * 日 期 :　2009-7-22
  */
  function GridTree(render){
      if(null == render) alert("实例化GridTree参数不正确.");
      this.render = typeof(render) == "string" ? this.$(render) : render;
      this.maxDepth = 0;
      this.column = [];
      this.render.className = "gridTree";
      this.hasCheckBox = false;
      this.editable = false;
      //this.path = this.getPath();
      //this.highlightImg = (new Image()).src = this.path + "images/lessGridRow.gif";
      this.editRow = [];
  }

  GridTree.prototype.$ = function(id){
      return document.getElementById(id);
  }
  GridTree.prototype.$C = function(tagName,attrObject){
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
  }
  GridTree.prototype.$A = function(elm,pElm){
      return pElm ? pElm.appendChild(elm) : document.body.appendChild(elm);
  }
  GridTree.prototype.$R = function(elm,pElm){
      return pElm ? pElm.removeChild(elm) : document.body.removeChild(elm);
  }
  GridTree.prototype.$T = function(tagName,pElm){
      return pElm ? pElm.getElementsByTagName(tagName) : document.getElementsByTagName(tagName);
  }
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
  GridTree.prototype.addEvent = function(elm,type,handler,useCapture){
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
  }
  GridTree.prototype.fireEvent = function(elm,type,handler,useCapture){
      try{
          elm.detachEvent("on"+type,function(){handler;});
      }catch(e){
          try{
              if(null == useCapture) useCapture = false;
              elm.removeEventListener(type,handler,useCapture);
          }catch(e1){
              elm["on"+type] = function(){handler;}
          }
      }
  }

  GridTree.prototype.load = function(data){
      this.data = data;
      var oThis = this;
      var rows = this.data.selectSingleNode(".//rows");
      this.setUUID();
      this.setDepth(rows,0);
      this.buildTitle();
      this.buildContent(rows,0);
      this.setTitleWidth();
      this.addEvent(this.table,"click",function(event){oThis.editCell(event);});
  }
  GridTree.prototype.setUUID = function(){
      var nodes = this.data.selectNodes(".//row");
      var nLen = nodes.length;
      for(var i = 0 ; i < nLen ; i++)
          nodes[i].setAttribute("_uuid",i);
  }
  GridTree.prototype.setDepth = function(curNode,depth){
      this.maxDepth = this.maxDepth > depth ? this.maxDepth : depth;
      depth = depth + 1;
      var nodes = curNode.selectNodes("./row");
      var nLen = nodes.length;
      for(var i = 0 ; i < nLen ; i++){
          var node = nodes[i];
          node.setAttribute("_depth",depth);
          this.setDepth(node,depth);
      }
  }

  GridTree.prototype.buildTitle = function(){
      var oThis = this;
      var columns = this.data.selectNodes(".//column");
      var cLen = columns.length;
      if(cLen != 0){
          this.table = this.$C("table",{className:"gridTree mainTable"});
          this.tbody = this.$C("tbody");
          this.$A(this.tbody,this.table);
          this.$A(this.table,this.render);
          var tr = this.$C("tr");
          this.$A(tr,this.tbody);
      }

      for(var i=0;i<cLen;i++){
          if(this.hasCheckBox && i == 0){
              var cbTh = this.$C("th",{className:"gridTree titleCB"});
              var cb = this.$C("input",{type:"checkBox",name:this.render.id+"_gridTree_box",className:"gridTree cb"});
              this.$A(cb,cbTh);
              this.addEvent(cb,"click",function(event){oThis.checkAll(event);});
              this.$A(cbTh,tr);
          }
          var name = columns[i].getAttribute("name");
          var col = columns[i].getAttribute("col");
          var align = columns[i].getAttribute("align");
          this.column.push({col:col,align:align});
          var th = this.$C("th",{className:"gridTree title",innerHTML:name});
          this.$A(th,tr);
      }
  }

  GridTree.prototype.buildContent = function(row,x){
      var rows = row.selectNodes("./row"),oThis = this;
      var count = x;
      for(var i=0,iLen=rows.length;i<iLen;i++){
          var curRow = rows[i];
          var uuid = curRow.getAttribute("_uuid");
          var depth = curRow.getAttribute("_depth");
          var tr = this.$C("tr",{gridRowID:uuid,id:this.render.id+"_gridTreeTR_"+uuid,className:count%2==0?"gridTreee rowA":"gridTreee rowB"});
          this.$A(tr,this.tbody);
          tr.onmouseover = function(){oThis.highlight(this,true);}
          tr.onmouseout = function(){oThis.highlight(this,false);}

          if(this.hasCheckBox){
              var cbTd = this.$C("td",{className:"gridTreee contentCB"});
              var cb = this.$C("input",{type:"checkBox",name:this.render.id+"_gridTree_box",className:"gridTree cb",_uuid:uuid});
              this.$A(cb,cbTd);
              this.$A(cbTd,tr);
              cbTd.style.backgroundPosition = "0px -200px";
              cbTd.style.backgroundRepeat = "repeat-x";
          }
          for(var j=0,jLen=this.column.length;j<jLen;j++){
              var text = curRow.getAttribute(this.column[j].col);
              var innerHTML = j == 0 ? "<table cellSpacing=0 cellPadding=0 width=100%>"
                                        + "<tr>"
                                        + "<td width=13 align=center>"
                                        + "<div _uuid='"+uuid+"' id='"+this.render.id+"_gridTreeIconDiv_"+uuid+"' class='gridTree icon'>"
                                        + "</div>"
                                        + "</td>"
                                        + "<td class='gridTreee contentTitleTD' _type='editTD' _uuid='"+uuid+"' _col='"+this.column[j].col+"'>"+text+"</td>"
                                        + "</tr>"
                                        + "</table>"
                              : text;
              var td = this.$C("td",{
                  innerHTML:innerHTML,
                  className:"gridTreee contentTD",
                  _type: j==0 ? "" : "editTD",
                  _uuid:uuid,
                  _col:this.column[j].col
              });
              if(null != this.column[j].align)
                  td.style.textAlign = this.column[j].align;
              this.$A(td,tr);

              
              td.style.backgroundPosition = "0px -200px";
              td.style.backgroundRepeat = "repeat-x";
              
              if(j == 0){
                  td.style.paddingLeft = (depth - 1) * 15 + "px";
                  td.style.textAlign = "left";
                  if(curRow.selectSingleNode(".//row") != null){
                      var div = this.$(this.render.id+"_gridTreeIconDiv_"+uuid);
                      div.className = "gridTree iconO";
                      this.addEvent(div,"click",function(event){oThis.resize(event);});
                  }
              }
          }
          count ++;
          this.buildContent(curRow,count);
      }
  }

  GridTree.prototype.resize = function(evt){
      var e = evt ? evt : window.event;
      var elm = e.srcElement || e.target;
      var uuid = elm.getAttribute("_uuid");
      if(elm.getAttribute("_closed") != "true"){
          elm.className = "gridTree iconC";
          elm.setAttribute("_closed","true");
      }else{
          elm.className = "gridTree iconO";
          elm.setAttribute("_closed","false");
      }
      var curRow = this.data.selectSingleNode(".//row[@_uuid='"+uuid+"']");
      var rows = curRow.selectNodes(".//row");
      for(var i=0,iLen=rows.length;i<iLen;i++){
          var row = rows[i];
          var curUUID = row.getAttribute("_uuid");
          var tr = this.$(this.render.id+"_gridTreeTR_"+curUUID);
          if(elm.getAttribute("_closed") != "true"){
              if(this.getParentsCloseStatus(row)){
                  tr.style.display = "";
              }else{
                  tr.style.display = "none";
              }
          }else{
              tr.style.display = "none";
          }
      }
  }
  GridTree.prototype.getParentsCloseStatus = function(row){
      var canShow = true;
      var pRow = row.parentNode;
      while(null != pRow && pRow.nodeName == "row"){
          var pUUID = pRow.getAttribute("_uuid");
          var pDiv = this.$(this.render.id+"_gridTreeIconDiv_"+pUUID);
          if(pDiv.getAttribute("_closed") != "true"){
              canShow = true;
          }else{
              canShow = false;
              break;
          }
          pRow = pRow.parentNode;
      }
      return canShow;
  }

  GridTree.prototype.getPath = function(){
      var path = "";
      var scripts = this.$T("script");
      for(var i=0,iLen=scripts.length;i<iLen;i++){
          var src = scripts[i].src;
          if(src.indexOf("gridTree.js") != -1){
              path = src.substring(0,src.indexOf("js/gridTree.js"));
          }
      }
      return path;
  }
  
  GridTree.prototype.highlight = function(elm,isHighlight){
      /*
      if(isHighlight){
          var eCls = elm.className;
          if(null != this.highlightTR)
              this.highlightTR.className = this.oldCls;
          this.highlightTR = elm;
          elm.className = "gridTree rowC";
          this.oldCls = eCls;
      }else{
          this.highlightTR.className = this.oldCls;
      }
      */
      
      var tds = elm.getElementsByTagName("td");
      for(var j=0,jLen=tds.length;j<jLen;j++){
          tds[j].style.backgroundPosition = isHighlight ? "0px 0px" : "0px -200px";
      }
  }

  GridTree.prototype.setTitleWidth = function(){
      var oThis = this;
      var ths = this.$T("th",this.$T("tr",this.table)[0]);
      for(var i=0,iLen=ths.length;i<iLen;i++){
          var w = ths[i].offsetWidth;
          ths[i].style.width = w + "px";
      }
  }

  GridTree.prototype.checkAll = function(evt){
      var e = evt ? evt : window.event;
      var elm = e.srcElement || e.target;
      var ipts = this.$T("input",this.table);
      for(var i=0,iLen=ipts.length;i<iLen;i++){
          if(ipts[i].name == this.render.id + "_gridTree_box"){
              ipts[i].checked = elm.checked;
          }
      }
  }

  GridTree.prototype.getSelectedRows = function(){
      var arr = [];
      var ipts = this.$T("input",this.table);
      for(var i=0,iLen=ipts.length;i<iLen;i++){
          if(ipts[i].name == this.render.id + "_gridTree_box" && ipts[i].checked){
              var uuid = ipts[i].getAttribute("_uuid");
              var node = this.data.selectSingleNode(".//row[@_uuid='"+uuid+"']");
              arr.push(node);
          }
      }
      return arr;
  }

  GridTree.prototype.editCell = function(evt){
      if(!this.editable){return;}
      var oThis = this;
      var e = evt ? evt : window.event;
      var elm = e.srcElement || e.target;
      if(elm.tagName.toUpperCase() == "TD" && elm.getAttribute("_type") == "editTD"){
          var uuid = elm.getAttribute("_uuid");
          var col = elm.getAttribute("_col");
          var text = elm.innerText || elm.textContent;
          elm.innerHTML = "";
          var ipt = this.$C("input",{type:"text",className:"gridTree Ipt",value:text});
          this.$A(ipt,elm);
          ipt.focus();
          ipt.select();
          ipt.onblur = function(ie){
              var ievt = ie ? ie : window.event;
              ievt.cancelBubble = true;
              var value = this.value;
              var column = oThis.data.selectSingleNode(".//column[@col='"+col+"']");
              var isNeed = column.getAttribute("empty") == "false";
              if(isNeed && value.replace(/(\s+)|(\s$)/g,"") == ""){
                  alert("此处不能为空.");
                  this.value = text;
                  this.focus();
                  this.select();
              }else{
                  elm.innerHTML = value;
                  if(value != text){
                      var row = oThis.data.selectSingleNode(".//row[@_uuid='"+uuid+"']");
                      if(null != row){
                          row.setAttribute(col,value);
                          if(oThis.editRow.indexOf(uuid) == -1)
                              oThis.editRow.push(uuid);
                      }
                  }
              }
          }
      }
  }

  GridTree.prototype.getEditRows = function(){
      var arr = [];
      for(var i=0,iLen=this.editRow.length;i<iLen;i++){
          var row = this.data.selectSingleNode(".//row[@_uuid='"+this.editRow[i]+"']");
          if(null != row)
              arr.push(row);
      }
      return arr;
  }