<!--#include file="conn.asp"-->
<%
response.ContentType = "text/xml"
Dim str,sql
str = ""
str = "<?xml version=""1.0"" encoding=""utf-8""?>"
str = str + "	<Response>"
str = str + "		<Data>"
str = str + "			<List>"

set rs = Server.CreateObject("adodb.recordset")
sql="select id,folderName,folderTime from folder order by id"
rs.open sql,conn,1,1  
while not rs.eof

str = str + "<row id="""+CStr(rs(0))+""" time="""+CStr(rs(2))+"""><![CDATA[" + CStr(rs(1)) + "]]></row>"

rs.movenext
Wend

set conn=Nothing

str = str + "			</List>"
str = str + "		</Data>"
str = str + "	</Response>"

response.write(str)
%>