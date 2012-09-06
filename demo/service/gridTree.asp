<%@LANGUAGE="VBSCRIPT" CODEPAGE="65001"%>
<%
Option Explicit
response.ContentType = "text/xml"
Dim str
str = "<?xml version=""1.0"" encoding=""utf-8""?>"
str = str + "	<Response>"
str = str + "		<GridTree>"
str = str + "		    <data>"
str = str + "		      <columns>"
str = str + "		        <column name=""指标"" col=""name"" align=""left"" empty=""false"" />"
str = str + "		        <column name=""值"" col=""inctValue"" align=""right"" />"
str = str + "		        <column name=""日期"" col=""idctDate"" align=""center"" />"
str = str + "		      </columns>"
str = str + "		      <rows>"
str = str + "		        <row name=""行内流动性风险状况"" inctValue=""67.44%"" idctDate=""2009-07-23"">"
str = str + "		            <row name=""核心负债依存度"" inctValue=""59.12%"" idctDate=""2009-07-23"">"
str = str + "		               <row name=""定期存款(总计)"" inctValue=""3399809.31"" idctDate=""2009-07-23"" />"
str = str + "		               <row name=""定期存款(次日)"" inctValue=""0"" idctDate=""2009-07-23"" />"
str = str + "		               <row name=""活期存款(剩余期限1年以上)"" inctValue=""7198927.31"" idctDate=""2009-07-23"" />"
str = str + "		               <row name=""发行债券(总计)"" inctValue=""71952.33"" idctDate=""2009-07-23"" />"
str = str + "		            </row>"
str = str + "		            <row name=""流动性缺口率"" inctValue=""8.32%"" idctDate=""2009-07-23"" >"
str = str + "		               <row name=""流动性缺口"" inctValue=""7198927.31"" idctDate=""2009-07-23"" >"
str = str + "		                  <row name=""累计到期期限缺口(31日~90日)"" inctValue=""232723.11"" idctDate=""2009-07-23"" />"
str = str + "		                  <row name=""活期存款(次日)"" inctValue=""31544.00"" idctDate=""2009-07-23"" />"
str = str + "		                  <row name=""附注活期存款(2日~7日)"" inctValue=""12594.00"" idctDate=""2009-07-23"" />"
str = str + "		                  <row name=""附注活期存款(8日~30日)"" inctValue=""41765.00"" idctDate=""2009-07-23"" />"
str = str + "		                  <row name=""附注活期存款(31日~90日)"" inctValue=""41765.00"" idctDate=""2009-07-23"" />"
str = str + "		                  <row name=""发行债券"" inctValue=""71952.33"" idctDate=""2009-07-23"" />"
str = str + "		               </row>"
str = str + "		               <row name=""90日内到期表内外资产"" inctValue=""4078716"" idctDate=""2009-07-23"" />"
str = str + "		            </row>"
str = str + "		        </row>"
str = str + "		      </rows>"
str = str + "		    </data>"
str = str + "		</GridTree>"
str = str + "	</Response>"


response.write(str)
%>