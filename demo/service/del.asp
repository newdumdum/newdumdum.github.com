<!--#include file="conn.asp"-->
<%
Dim r

r = "1"
If Request("username") = "sch119" and Request("userpsw") = "119119" Then

  set rs=Server.CreateObject("adodb.recordset")
  sql="delete from backInfoTable where id="&Request("id")
  rs.open sql,conn,1,3

  rs.update
  rs.close
  set conn=Nothing

Else
  r = "0"
End If

response.write(r)

%>