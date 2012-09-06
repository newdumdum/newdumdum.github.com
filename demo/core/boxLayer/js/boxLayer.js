  /*
  * 功  能: 全局图层类 
  * 作  者: IRD ShiCH
  * 日  期: 2009-2-24
  */
  function BoxLayer(){
      this.baseTarget = null;
      this.title      = null;
      this.baseID     = null;
      this.html       = null;
  }

  BoxLayer.prototype.init = function(){
      if(null == this.baseTarget && null == this.baseID){
          alert("未指定图层");
          return;
      }
      if(null != this.baseTarget){
          this.baseID = this.baseTarget.id;
      }
      this.Show();
  }

  BoxLayer.prototype.Show = function(){
      this.content = this.baseTarget == null ? this.html : this.baseTarget.innerHTML;
      //$A(this.baseTarget);
      

      var body = document.body;
      var bW = body.offsetWidth;
      var bH = body.offsetHeight;
      var sL = body.scrollLeft;
      var sT = body.scrollTop;

      if(null == this.layer){
          this.layer = $C("div");
          this.layer.className = "boxLayer";
          $A(this.layer);        

          var str = [];
          str[str.length] = "<table width=\"100%\" cellSpacing=\"0\" cellPadding=\"0\" height=\"100%\" border=\"0\">";
          str[str.length] = "   <tr>";
          str[str.length] = "     <td align=\"center\">";
          str[str.length] = "       <table class=\"boxLayerTable\" cellSpacing=\"0\" cellPadding=\"0\" border=\"0\">";
          str[str.length] = "         <tr>";
          str[str.length] = "           <td>";
          str[str.length] = "             <div class=\"left-top\"></div>";
          str[str.length] = "             <div class=\"left-center\"></div>";
          str[str.length] = "             <div class=\"left-down\"></div>";
          str[str.length] = "           </td>";
          str[str.length] = "           <td class=\"mainTD\">";
          str[str.length] = "             <table cellSpacing=\"0\" width=\"100%\" height=\"100%\" cellPadding=\"0\" border=\"0\">";
          str[str.length] = "               <tr>";
          str[str.length] = "                 <td>";
          str[str.length] = "                   <div class=\"titleLeft\">"+this.title+"</div>";
          str[str.length] = "                   <div class=\"titleRight\">";
          str[str.length] = "                     <div onmouseover=\"javascript:this.style.backgroundPosition='-15px 0px';\" onmouseout=\"javascript:this.style.backgroundPosition='0px 0px';\" id=\"boxLayer_"+this.baseID+"\"></div>";
          str[str.length] = "                   </div>";
          str[str.length] = "                 </td>";
          str[str.length] = "               </tr>";
          str[str.length] = "               <tr>";
          str[str.length] = "                 <td class=\"contentTD\">";
          str[str.length] = "                   <div class=\"content\">"+this.content+"</div>";
          str[str.length] = "                 </td>";
          str[str.length] = "               </tr>";
          str[str.length] = "             </table>";
          str[str.length] = "           </td>";
          str[str.length] = "           <td>";
          str[str.length] = "             <div class=\"right-top\"></div>";
          str[str.length] = "             <div class=\"right-center\"></div>";
          str[str.length] = "             <div class=\"right-down\"></div>";
          str[str.length] = "           </td>";
          str[str.length] = "         </tr>";
          str[str.length] = "       </table>";
          str[str.length] = "     </td>";
          str[str.length] = "   </tr>";
          str[str.length] = "<table>";

          this.layer.innerHTML = str.join("");

          this.AddCommand();
      }

      this.layer.style.width = bW;
      this.layer.style.height = bH;
      this.layer.style.left = sL;
      this.layer.style.top = sT;

      this.layer.style.display = "";

      disablePageControl(true);
      disablePageControl(false,this.layer);
      disableBody(true);
  }

  BoxLayer.prototype.close = function(){
      if(null != this.layer){
          this.layer.style.display = "none";
      }
      disablePageControl(false);
      disableBody(false);
  }

  BoxLayer.prototype.clear = function(){
      if(null != this.layer){
          $R(this.layer);
          this.layer = null;
      }
      disablePageControl(false);
      disableBody(false);
  }

  BoxLayer.prototype.AddCommand = function(){
      var oThis = this;
      var bt = $("boxLayer_"+this.baseID);
      bt.onclick = function(){
          oThis.close();
      }
  }