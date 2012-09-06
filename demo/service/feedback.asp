<!--#include file="conn.asp"-->
<%

set rs=Server.CreateObject("adodb.recordset")
sql="select * from backInfoTable"
rs.open sql,conn,1,3

rs.addnew
rs("nickName")=Request.Form("nickName")
rs("backInfo")=Request.Form("backInfo")
rs("backTime")=now
rs.update
rs.close
set conn=Nothing
%>