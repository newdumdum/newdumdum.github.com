<% function unHtml(article_info)
unHtml=article_info
if article_info <> "" then
unHtml=replace(unHtml,"<","&lt;")
unHtml=replace(unHtml,">","&gt;")
unHtml=replace(unHtml,chr(34),"&quot;")
unHtml=replace(unHtml,chr(13),"<br>")
unHtml=replace(unHtml,chr(32),"&nbsp;") 
   unhtmlgl=split(webgl,"|")
   if IsArray(unhtmlgl) then
   for i=0 to UBound(unhtmlgl)
   unhtml=replace(unhtml,unhtmlgl(i),"***")
   next
   end if
end if
end function %>