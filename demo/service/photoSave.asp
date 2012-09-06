<%
dim strSaveFileName
dim strNow
strnow =replace(replace(replace(now(), ":", ""), "-", ""), " ", "")
if request.servervariables("REQUEST_METHOD")="POST" then '当前为post
FormSize=Request.TotalBytes 
FormData=Request.BinaryRead(FormSize) '接收数据到FormData
strSaveFileName =strNow &".jpg"
set dr=CreateObject("Adodb.Stream")
dr.Mode=3
dr.Type=1
dr.Open
dr.Write(FormData)
dr.SaveToFile Server.MapPath(strSaveFileName),2
dr.Close
set dr=nothing
response.Write(strSaveFileName)
end if
%>