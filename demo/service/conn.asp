<%@ LANGUAGE = VBScript CodePage = 65001%>

<%
Response.Buffer=True	'�򿪻���
			'response.expires=0 	'ǿ�ƻ������
Session.Timeout=30	'����session����ʱ�� ��λ:��
Server.ScriptTimeout=30 '���ýű���ʱʱ�� ��λ:��

SelectDataBase=0     '�������ݿ����0ΪAccess���ݿ⣬1ΪSQL���ݿ�,2Ϊ����Դ����Oracle
Select Case SelectDataBase
	Case 0
'''''''''''''''''''''''''''''' Access���ݿ� '''''''''''''''''''''''''''''''''''''''''''''''''''''''''
		datapath    =""      '���ݿ�Ŀ¼�����·��
		datafile    ="feedBlock.mdb"      '���ݿ���ļ���
		connstr="Provider=Microsoft.Jet.OLEDB.4.0;Data Source="&Server.MapPath(""&datapath&""&datafile&"")
		'Connstr="DBQ="&server.mappath(""&datapath&""&datafile&"")&";DRIVER={Microsoft Access Driver (*.mdb)};"
		SqlNowString="Now()"
		SqlChar="'"
		ver="5.16"
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
	Case 1
'''''''''''''''''''''''''''''' SQL���ݿ� ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
		SqlLocalName   ="10.10.109.146"     '����IP  [ ������ (local) �����IP ]
		SqlUsername    ="sa"          '�û���
		SqlPassword    ="sa"           '�û�����
		SqlDatabaseName="bankchina_database"       '���ݿ���
		ConnStr = "Provider=Sqloledb;User ID=" & SqlUsername & "; Password=" & SqlPassword & "; Initial Catalog = " & SqlDatabaseName & "; Data Source=" & SqlLocalName & ";"
		SqlNowString="GetDate()"
		ver="5.16 SQL"
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
	Case 2
		DNSName="sch"			'����Դ����
		UserName="sch119"			'�û���
		Password="sch119"			'����
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
Response.Write "���ݿ����ӳ������������ִ���"
Response.Write "����ţ�"&Err.Number&"</br>"
Response.Write "����ԭ��:"&Err.Description&"</br>"
Response.End
End If
On Error GoTo 0
%>