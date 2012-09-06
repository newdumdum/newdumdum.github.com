<%@LANGUAGE="VBSCRIPT" CODEPAGE="65001"%>
<%
Option Explicit
Dim ranNum,upperbound,lowerbound
upperbound = 100
lowerbound = 0
Randomize
ranNum = int((upperbound - lowerbound + 1)*rnd+lowerbound)
response.ContentType = "text/xml"
Dim str
str = "<?xml version=""1.0"" encoding=""utf-8""?>"
str = str + "<Response>"
str = str + "    <CpuInfo>"
str = str + "        <Info>"+CStr(ranNum)+"</Info>"
str = str + "        <title>模拟CPU使用率</title>"
str = str + "    </CpuInfo>"
str = str + "</Response>"


response.write(str)
%>