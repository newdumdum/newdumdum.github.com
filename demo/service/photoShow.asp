<!--#include file="conn.asp"-->
<%
response.ContentType = "text/xml"
Dim str,totalPage,currentPage,pageSize

str = "<?xml version=""1.0"" encoding=""utf-8""?>"
str = str + "	<Response>"
str = str + "  <SliderPic>"
str = str + "    <Data>"
str = str + "      <PicList>"

set rs = Server.CreateObject("adodb.recordset")
sql="select id,photoInfo,photoPath,type from photoInfo where type="+request("id")+" order by id desc"
rs.open sql,conn,1,1

currentPage = CInt(request("page") )
pageSize = CInt(request("pageSize"))
totalPage = CInt(Ceil((rs.recordcount)/pageSize))

Dim i
i = 0
while not rs.eof
  i = i + 1
  If(i <= pageSize * currentPage And i > pageSize * (currentPage - 1)) Then 
    str = str + "<row id="""+CStr(rs(0))+""" src=""Demo/images/photo/"+CStr(rs(2))+"""><![CDATA[" + CStr(rs(1)) + "]]></row>"
  End If 

  rs.movenext
Wend

set conn=Nothing

str = str + "      </PicList>"
str = str + "    </Data>"
str = str + "  </SliderPic>"
str = str + "    <PageInfo>"
str = str + "       <info totalPage="""+CStr(totalPage)+""" currentPage="""+CStr(currentPage)+""" pageSize="""+CStr(pageSize)+""" />"
str = str + "    </PageInfo>"
str = str + "</Response>"

response.write(str)

Function Ceil(n)
  Ceil = Int(n)
  If Ceil < n Then
    Ceil = Ceil + 1
  End If
End Function
%>