    //document.domain = "halloa.net";
    var t = new SimpleTree();
    __WAITING_IMG_PATH = "core/SimpleTree/images/";
    function init(){
        checkSize();
        Handler.add(window,'resize',checkSize);

        var bar = $("siderBarDiv");
        var siderBar = new SiderBar();
        siderBar.container = bar;
        siderBar.onload = function(){
            loadTree();

            checkSize();
        }
        siderBar.resizeEnd = function(){
            $('left').style.width = $("siderBarDiv").clientWidth + 'px';
            checkSize();
        }
        siderBar.init();

    }

    function loadTree(){   
        var p = new ajax();
        p.url = "data/tree.xml";
        //p.url = "service/index.asp";
        p.onresult = function(){
            var data = this.text;
            buildTree(data);
        }
        p.send();
    }
    function buildTree(data){
        var treeObj = $("tree");
        var tree = new SimpleTree();
        tree.container = treeObj;
        tree.iconPath = treeObj.getAttribute("iconPath");
        tree.dataStr = data;
        tree.init();

        tree.OnClick = function(){
            var treeNode = this.selectedNode;
            var codeID = treeNode.getAttribute("id");
            var xml = this.GetTreeXML();
            showPage(xml,codeID);
        }
    }

    function showPage(data,id){
        var node = data.selectSingleNode(".//TreeNode[@id='"+id+"']");
        var src = node.getAttribute("src");

        if(null == src || src == "")
            return;

        //var iframe = window.frames["exampleFrame"];
        //iframe.location.href = src;
        var iframe = document.getElementById("exampleFrame");
        iframe.src = src;
        return;
        iframe.onload = iframe.onreadystatechange = function() {
            if (this.readyState && this.readyState != "complete") return;
            else  setIframeDomain();
        }
    }

    function talkToMe(){
        var layer = t.$("layer");
        if(null == layer){
            var ht = [];
            ht[ht.length] = "<div id='inDiv'>";
            ht[ht.length] = "<form action='service/feedback.asp' method='post' id='backForm' target='hidden_frame'>";
            ht[ht.length] = " <table width=100% height=100% cellSpacing=0 cellPadding=0>";
            ht[ht.length] = "   <tr>";
            ht[ht.length] = "     <td class='t' colspan=2>给我留言</td>";
            ht[ht.length] = "   </tr>";
            ht[ht.length] = "   <tr>";
            ht[ht.length] = "     <td>昵称：</td>";
            ht[ht.length] = "     <td><input type='text' class='ipt' id='nickName' name='nickName' onkeypress='if(event.keyCode==13){ok(); return false;}' /></td>";
            ht[ht.length] = "   </tr>";
            ht[ht.length] = "   <tr>";
            ht[ht.length] = "     <td valign=top>内容：</td>";
            ht[ht.length] = "     <td valign=top><textArea class='are' id='backInfo' name='backInfo' /></textArea></td>";
            ht[ht.length] = "   </tr>";
            ht[ht.length] = "   <tr>";
            ht[ht.length] = "     <td colspan=2 align=center><div type=\"btn\" img=\"core/button/button/icon/accept.gif\" onclick=\"ok();\" value=\"确定\"></div>&nbsp;&nbsp;<div type=\"btn\" img=\"core/button/button/icon/cancel.gif\" onclick=\"no();\" value=\"取消\"></div></td>";
            ht[ht.length] = "   </tr>";
            ht[ht.length] = " </table>";
            ht[ht.length] = " </form>";
            ht[ht.length] = "</div>";
            layer = t.$C("div",{className:"layer",id:"layer",innerHTML:ht.join("")});
            t.$A(layer);

            BTN.initBtns();
            var ifr = t.$("hidden_frame"),e = new Effect(ifr);
            e.addEvent(ifr,"load",ifrLoaded);
        }

        var d = t.$("inDiv");
        var table = t.$T("table",d)[0];
        table.style.visibility = "hidden";
        layer.style.display = "";
        d.style.width = "1px";
        d.style.height = "1px";
        var e = new Effect(d);
        e.resize(330,200,newE,true);

        function newE(){
            setTimeout(function(){e.resize(300,170,newE2,true);},(/msie/gi.test(navigator.userAgent) ? 10 : 300));
        }
        function newE2(){
            table.style.visibility = "visible";
            t.$("nickName").value = "";
            t.$("backInfo").value = "";
            t.$("nickName").focus();
        }
    }

    function ok(){
        var nickName = t.$("nickName"),backInfo = t.$("backInfo"),reg = /(\s*)|(\s*$)/;
        if(nickName.value.replace(reg,"") == ""){
            (new MessageBox(nickName)).Show("请输入昵称");
            nickName.focus();
            return;
        }
        if(backInfo.value.replace(reg,"") == ""){
            (new MessageBox(backInfo)).Show("请输入留言内容");
            backInfo.focus();
            return;
        }
        if(nickName.value.RelLen() > 50){
            (new MessageBox(nickName)).Show("昵称名称太长了吧");
            nickName.focus();
            nickName.select();
            return;
        }
        if(backInfo.value.RelLen() > 5000){
            (new MessageBox(backInfo)).Show("留言内容长度不要大于5000字符啊... 我的虚拟主机没那么大方地...");
            backInfo.focus();
            return;
        }
        var form = t.$("backForm");
        //Public.showWaitingLayer();
        form.submit();
    }
    function no(){
        var layer = t.$("layer");
        var d = t.$("inDiv");
        var table = t.$T("table",d)[0];
        table.style.visibility = "hidden";

        var e = new Effect(d);
        e.resize(1,1,newE,true);
        function newE(){
            layer.style.display = "none";
        }
    }
    
    function ifrLoaded(){
        //Public.hideWaitingLayer();
        alert("留言成功",function(){
            var ifr = t.$("hidden_frame"),e = new Effect(ifr);
            no();        
        });
    }

    function setIframeDomain(){
        var iframe = document.getElementById("exampleFrame");
        try{
            iframe.document.domain = "halloa.net";
        }catch(e){
        }
    }

    function checkSize(){
        $('left').style.height = document.documentElement.clientHeight - 72 + 'px';
        $('right').style.height = document.documentElement.clientHeight - 72 + 'px';
        $('right').style.width = document.documentElement.clientWidth - 6 - $('left').clientWidth - 7 + 'px';
    }

    //Handler.add(window,'load',init);
	init();