<%@LANGUAGE="VBSCRIPT" CODEPAGE="65001"%>
<%
Option Explicit
response.ContentType = "text/xml"
Dim str
str = "<?xml version=""1.0"" encoding=""utf-8""?>"
str = str + "	<Response>"
str = str + "		<Data>"
str = str + "			<Tree>"
str = str + "				<TreeNode id=""9999"" name=""BEA (China)"">"
str = str + "            <TreeNode id=""center"" name=""Central Region"">"
str = str + "                <TreeNode id=""3100"" name=""Hangzhou Branch""></TreeNode>"
str = str + "                <TreeNode id=""1700"" name=""Shanghai Branch""></TreeNode>"
str = str + "                <TreeNode id=""3500"" name=""Qingdao Branch""></TreeNode>"
str = str + "                <TreeNode id=""4100"" name=""Wuhan Branch""></TreeNode>"
str = str + "                <TreeNode id=""4300"" name=""Nanjing Branch""></TreeNode>"
str = str + "            </TreeNode>"
str = str + "            <TreeNode id=""north"" name=""Northern Region"">				"
str = str + "                <TreeNode id=""0400"" name=""Beijing Branch""></TreeNode>"
str = str + "                <TreeNode id=""0700"" name=""Chengdu Branch""></TreeNode>"
str = str + "                <TreeNode id=""0900"" name=""Dalian Branch""></TreeNode>"
str = str + "                <TreeNode id=""2200"" name=""Xi’an Branch""></TreeNode>"
str = str + "                <TreeNode id=""3300"" name=""Chongqing Branch""></TreeNode>"
str = str + "                <TreeNode id=""3700"" name=""Tian Jin Branch""></TreeNode>"
str = str + "                <TreeNode id=""3900"" name=""Shenyang Branch""></TreeNode>"
str = str + "                <TreeNode id=""4700"" name=""Urumqi Branch""></TreeNode>"
str = str + "            </TreeNode>"
str = str + "            <TreeNode id=""south"" name=""Southern Region"">"
str = str + "                <TreeNode id=""1100"" name=""Guangzhou Branch""></TreeNode>"
str = str + "                <TreeNode id=""1400"" name=""Shenzhen Branch""></TreeNode>"
str = str + "                <TreeNode id=""2000"" name=""Xiamen Branch""></TreeNode>"
str = str + "                <TreeNode id=""2300"" name=""Zhuhai Branch""></TreeNode>"
str = str + "            </TreeNode>"
str = str + "        </TreeNode>"
str = str + "				<TreeNode id=""4500"" name=""Booking Branch""></TreeNode>"
str = str + "				<TreeNode id=""8000"" name=""Headquarter""></TreeNode>"
str = str + "			</Tree>"
str = str + "		</Data>"
str = str + "	</Response>"


response.write(str)
%>