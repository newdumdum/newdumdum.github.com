<%@ LANGUAGE = VBScript CodePage = 65001%>

<%
Response.Buffer=True	'打开缓存
			'response.expires=0 	'强制缓存过期
Session.Timeout=30	'设置session过期时间 单位:分
Server.ScriptTimeout=30 '设置脚本超时时间 单位:秒

SelectDataBase=0     '定义数据库类别，0为Access数据库，1为SQL数据库,2为数据源连接Oracle
Select Case SelectDataBase
	Case 0
'''''''''''''''''''''''''''''' Access数据库 '''''''''''''''''''''''''''''''''''''''''''''''''''''''''
		datapath    =""      '数据库目录的相对路径
		datafile    ="feedBlock.mdb"      '数据库的文件名
		connstr="Provider=Microsoft.Jet.OLEDB.4.0;Data Source="&Server.MapPath(""&datapath&""&datafile&"")
		'Connstr="DBQ="&server.mappath(""&datapath&""&datafile&"")&";DRIVER={Microsoft Access Driver (*.mdb)};"
		SqlNowString="Now()"
		SqlChar="'"
		ver="5.16"
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
	Case 1
'''''''''''''''''''''''''''''' SQL数据库 ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
		SqlLocalName   ="10.10.109.146"     '连接IP  [ 本地用 (local) 外地用IP ]
		SqlUsername    ="sa"          '用户名
		SqlPassword    ="sa"           '用户密码
		SqlDatabaseName="bankchina_database"       '数据库名
		ConnStr = "Provider=Sqloledb;User ID=" & SqlUsername & "; Password=" & SqlPassword & "; Initial Catalog = " & SqlDatabaseName & "; Data Source=" & SqlLocalName & ";"
		SqlNowString="GetDate()"
		ver="5.16 SQL"
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
	Case 2
		DNSName="sch"			'数据源名称
		UserName="sch119"			'用户名
		Password="sch119"			'密码
		'ConnStr="DSN="&DNSName&";UID="&UserName&";PWD="&Password&";"
		ConnStr="Driver={microsoft odbc for oracle};server="&DNSName&";uid="&UserName&";pwd="&Password&";"
		Set conn=Server.CreateObject("ADODB.Connection")
		conn.open ConnStr
''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
End Select
On Error Resume Next
Set conn=Server.CreateObject("ADODB.Connection")
conn.open ConnStr
If Err Then
err.Clear
Set Conn = Nothing
Response.Write "数据库连接出错，请检查连接字串。"
Response.Write "错误号："&Err.Number&"</br>"
Response.Write "错误原因:"&Err.Description&"</br>"
Response.End
End If
On Error GoTo 0
%>