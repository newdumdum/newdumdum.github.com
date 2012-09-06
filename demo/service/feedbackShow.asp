<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<!--#include file="conn.asp"-->
<!--#include file="unhtml.asp"-->
<html>
<head>
<title>留言内容</title>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta name="generator" content="editplus">
<meta name="author" content="">
<meta name="keywords" content="">
<meta name="description" content="">
<!-- button control begin -->
<script language="javascript" src="../core/button/button/btn.js"></script>
<link href="../core/button/button/btn.css" type="text/css" rel="stylesheet">
<!-- button control end -->
<script language="javascript" src="../core/ajax.js"></script>
<style type="text/css">
body {
    margin:10px;
    background:#2F2F2F;
    overflow:hidden;
}
.boxDiv {
    border:1px solid #3B3B3B;
    background:#000;
    padding:5px;
}
* {
    font:normal 12px Verdana,宋体;
}
.main {
    overflow:auto;
    *overflow-x:hidden;
}
.titleDiv {
    border-bottom:1px #3B3B3B solid;
}
.dateDiv {
    float:right;
    padding:3px 5px 3px 0px;
    font:normal 12px Verdana;
    color:#00CC00;
}
.delDiv {
    float:right;
    margin:2px 5px 0 10px ;
}
.nickDiv {
    display:inline-block;
    *display:inline;
    width:200px;
    padding:3px 0px 3px 3px;
    color:#00CC00;
}
.contentDiv {
    padding:5px;
    word-break:break-all;
    color:#666;
    background:#2F2F2F;
}

#userConfirmDiv {
    width:200px;
    background:#FFF;
    border:1px solid #FFF;
    filter:Alpha(opacity=90);
    opacity:0.9;
    position:absolute;
}
#userConfirmDiv .t {
    height:20px;
    border-bottom:1px solid #000;
    font:normal 12px Arial,宋体;
    padding:2px 0 0 5px;
}
#userConfirmDiv .u {
    margin-left:5px;
    margin-top:5px;
    font:normal 12px Arial,宋体;
}
#userConfirmDiv .p {
    margin-left:5px;
    margin-top:5px;
    font:normal 12px Arial,宋体;
}
#userConfirmDiv .b {
    margin-top:5px;
    text-align:center;
}

#userConfirmDiv input {
    border:1px solid #666;
    font:normal 12px Arial,宋体;
    width:100px;
}
</style>
<SCRIPT LANGUAGE="JavaScript">
__WAITING_IMG_PATH = "../core/SimpleTree/images/";

window.onload = function(){
    resize();
    window.onresize = resize;
}

var validated = false, userName = '', passWord = '',delID = null;

function resize(){
    var div = document.getElementById("mainDiv");
    div.style.width = document.documentElement.clientWidth - 28 + "px";
    div.style.height = document.documentElement.clientHeight - 30 + "px";
}

function delRecord(id){
    delID = id;
    if(!validated){
        var d = document.getElementById('userConfirmDiv');
        d.style.display = "";
        d.style.left = (document.body.offsetWidth - d.offsetWidth)/2 + "px";
        d.style.top = (document.body.offsetHeight - d.offsetHeight)/2 + "px";
    }else{
        del();
    }
}

function ok() {
    userName = document.getElementById('userName').value;
    passWord = document.getElementById('userPwd').value;
    var url = "validate.asp?username="+userName+"&userpsw="+passWord;
    var p = new ajax();
    p.url = url;
    p.onresult = function(){
        var t = this.text;

        if(t == 1){
            no();
            validated = true;
            del();
        }else{
            alert("用户认证失败");
        }
    }
    p.send();
}

function no(){
    var d = document.getElementById('userConfirmDiv');
    d.style.display = "none";
}

function del(){
    if(confirm("确认删除记录?")){
        var url = "del.asp?username="+userName+"&userpsw="+passWord+"&id="+delID;
        var p = new ajax();
        p.url = url;
        p.onresult = function(){
        }
        p.send();
        var n = document.getElementById('recordD_'+delID);
        $R(n,n.parentNode);
        alert("删除成功");
    }
}

$R = function(curNode, parentNode){
    return parentNode ? parentNode.removeChild(curNode) : document.body.removeChild(curNode);
}
</SCRIPT>
</head>
<body>
<div class="boxDiv">
  <div class="main"  id="mainDiv">
    <%
    set rs=Server.CreateObject("adodb.recordset")
    sql="select * from backInfoTable order by id desc"
    rs.open sql,conn,1,1  
    while not rs.eof
    %>
    <div id="recordD_<%=trim(rs("id"))%>">
      <div class="titleDiv">
        <div class="delDiv"><img title="删除" style="cursor:pointer" onclick="delRecord('<%=trim(rs("id"))%>');" src="../images/del.gif"/></div>
        <div class="dateDiv">日期：<%=trim(rs("backTime"))%></div>
        <div class="nickDiv">昵称：<%=unhtml(trim(rs("nickName")))%> </div>
      </div>
      <div class="contentDiv"><%=unhtml(rs("backInfo"))%></div>
    </div>
    <%
    rs.movenext
    Wend
    %>
    <div>
</div>

<div id="userConfirmDiv" style="display:none;">
  <div class="t">用户认证</div>
  <div class="u">用户名：<input type=text id='userName'></div>
  <div class="p">密&nbsp;&nbsp;&nbsp;&nbsp;码：<input type=password id='userPwd'></div>
  <div class="b">
    <table align=center>
      <tr>
        <td>
          <div type="btn" img="../core/button/button/icon/accept.gif" onclick="ok();" value="确定"></div>
        </td>
        <td>
          <div type="btn" img="../core/button/button/icon/cancel.gif" onclick="no();" value="取消"></div>
        </td>
      </tr>
    </table>
  </div>
</div>
</body>
</html>
