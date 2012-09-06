<%@LANGUAGE="VBSCRIPT" CODEPAGE="65001"%>
<%
Option Explicit
response.ContentType = "text/xml"
Dim str
str = "<?xml version=""1.0"" encoding=""utf-8""?>"
str = str + "	<Response>"
str = str + "		<ScrollTab>"
str = str + "			<Data>"
str = str + "				<TabList>"
str = str + "            <Tab id=""4"" name=""Calendar"" />"
str = str + "            <Tab id=""6"" name=""CommonSelect"" />"
str = str + "            <Tab id=""7"" name=""DragLayer"" />"
str = str + "            <Tab id=""9"" name=""FlashLine"" />"
str = str + "            <Tab id=""10"" name=""FlashMeter"" />"
str = str + "            <Tab id=""11"" name=""ScrollTab"" />"
str = str + "            <Tab id=""12"" name=""SiderBar"" />"
str = str + "            <Tab id=""13"" name=""SimpleGrid"" />"
str = str + "            <Tab id=""14"" name=""SimpleTree"" />"
str = str + "            <Tab id=""16"" name=""VerticalTree"" />"
str = str + "            <Tab id=""15"" name=""SliderPicShow"" />"
str = str + "            <Tab id=""8"" name=""ImitateFlashMenu"" />"
str = str + "            <Tab id=""5"" name=""Clock"" />"
str = str + "        </TabList>"
str = str + "			</Data>"
str = str + "		</ScrollTab>"
str = str + "	</Response>"

response.write(str)
%>