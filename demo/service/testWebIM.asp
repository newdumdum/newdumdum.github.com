<%
Option Explicit
response.ContentType = "text/html"
Dim str
Dim cb

cb = Request("callback")
str = "[{group_name:' A\u6211\u7684\u6d4b\u8bd5\u7fa4',group_id:'1356469',block:'0',bulletin:'asdasd\r\nasdsad12\r\n\r\n\r\nhttp:\/\/fe.baidu.com\/~shichunhua\/\r\n1231232131',owner:'newdumdum'},{group_name:' NND',group_id:'1347079',block:'0',bulletin:'asdasd\r\nasdsad12\r\n\r\n\r\nhttp:\/\/fe.baidu.com\/~shichunhua\/\r\n1231232131',owner:'dumdum2'}]"

response.write(cb + "(" + str + ")")
%>