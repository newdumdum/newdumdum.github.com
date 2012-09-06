<%
If Request("username") = "sch119" and Request("userpsw") = "119119" Then
  response.write("1")
Else
  response.write("0")
End If

%>