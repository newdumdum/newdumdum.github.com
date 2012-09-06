<!--#include file="conn.asp"-->
<%
response.ContentType = "text/xml"
Dim str

str = "<?xml version=""1.0"" encoding=""utf-8""?>"
str = str + "	<Response>"
str = str + "  <photos>"

set rs = Server.CreateObject("adodb.recordset")
sql="select id,photoInfo,photoPath,type from photoInfo order by id desc"
rs.open sql,conn,1,1

while not rs.eof
  str = str + "<row id="""+CStr(rs(0))+""" zoomImg=""demo/images/photo/zoom/"+CStr(rs(2))+""" img=""demo/images/photo/"+CStr(rs(2))+"""><![CDATA[" + CStr(rs(1)) + "]]></row>"
  rs.movenext
Wend

set conn=Nothing

str = str + "  </photos>"
str = str + "</Response>"

response.write(str)

Function Ceil(n)
  Ceil = Int(n)
  If Ceil < n Then
    Ceil = Ceil + 1
  End If
End Function
%>