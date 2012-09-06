<%@LANGUAGE="VBSCRIPT" CODEPAGE="65001"%>
<%
Option Explicit
response.ContentType = "text/xml"
Dim str
str = "<?xml version=""1.0"" encoding=""utf-8""?>"
str = str + "	<Response>"
str = str + "  <SliderPic>"
str = str + "    <Data>"
str = str + "      <PicList>"
str = str + "        <!--"
str = str + "        <row id=""2"" src=""images/16.jpg"" />"
str = str + "        <row id=""3"" src=""images/3.jpg"" />"
str = str + "        <row id=""4"" src=""images/4.jpg"" />"
str = str + "        <row id=""5"" src=""images/5.jpg"" />"
str = str + "        <row id=""11"" src=""images/11.jpg"" />"
str = str + "        <row id=""7"" src=""images/7.jpg"" />"
str = str + "        -->"
str = str + "        <row id=""8"" src=""images/8.jpg"" />"
str = str + "        <row id=""9"" src=""images/9.jpg"" />"
str = str + "        <row id=""6"" src=""images/6.jpg"" />"
str = str + "        <row id=""10"" src=""images/10.jpg"" />"
str = str + "        <row id=""14"" src=""images/14.jpg"" />"
str = str + "        <row id=""15"" src=""images/15.jpg"" />"
str = str + "        <row id=""13"" src=""images/13.jpg"" />"
str = str + "        <row id=""12"" src=""images/12.jpg"" />"
str = str + "        <row id=""16"" src=""images/2.jpg"" />"
str = str + "      </PicList>"
str = str + "    </Data>"
str = str + "  </SliderPic>"
str = str + "</Response>"

response.write(str)
%>