var ace = (function(){
	
	var baidu=baidu||{version:"1-3-2"};baidu.guid="$BAIDU$";window[baidu.guid]=window[baidu.guid]||{};baidu.browser=baidu.browser||{};baidu.browser.isGecko=/gecko/i.test(navigator.userAgent)&&!/like gecko/i.test(navigator.userAgent);baidu.browser.isStrict=document.compatMode=="CSS1Compat";if((/(\d+\.\d)(\.\d)?\s+safari/i.test(navigator.userAgent)&&!/chrome/i.test(navigator.userAgent))){baidu.browser.safari=parseFloat(RegExp["\x241"])}if(/opera\/(\d+\.\d)/i.test(navigator.userAgent)){baidu.browser.opera=parseFloat(RegExp["\x241"])}if(/chrome\/(\d+\.\d)/i.test(navigator.userAgent)){baidu.browser.chrome=parseFloat(RegExp["\x241"])}if(/msie (\d+\.\d)/i.test(navigator.userAgent)){baidu.ie=baidu.browser.ie=document.documentMode||parseFloat(RegExp["\x241"])}try{if(/(\d+\.\d)/.test(external.max_version)){baidu.browser.maxthon=parseFloat(RegExp["\x241"])}}catch(e){}baidu.browser.isWebkit=/webkit/i.test(navigator.userAgent);if(/firefox\/(\d+\.\d)/i.test(navigator.userAgent)){baidu.browser.firefox=parseFloat(RegExp["\x241"])}baidu.number=baidu.number||{};baidu.number.pad=function(D,C){var E="",B=(D<0),A=String(Math.abs(D));if(A.length<C){E=(new Array(C-A.length+1)).join("0")}return(B?"-":"")+E+A};baidu.number.comma=function(B,A){if(!A||A<1){A=3}B=String(B).split(".");B[0]=B[0].replace(new RegExp("(\\d)(?=(\\d{"+A+"})+$)","ig"),"$1,");return B.join(".")};baidu.url=baidu.url||{};baidu.url.escapeSymbol=function(A){return String(A).replace(/\%/g,"%25").replace(/&/g,"%26").replace(/\+/g,"%2B").replace(/\ /g,"%20").replace(/\//g,"%2F").replace(/\#/g,"%23").replace(/\=/g,"%3D")};baidu.string=baidu.string||{};baidu.string.escapeReg=function(A){return String(A).replace(new RegExp("([.*+?^=!:\x24{}()|[\\]/\\\\])","g"),"\\\x241")};baidu.url.getQueryValue=function(B,C){var D=new RegExp("(^|&|\\?|#)"+baidu.string.escapeReg(C)+"=([^&]*)(&|\x24)","");var A=B.match(D);if(A){return A[2]}return null};baidu.url.jsonToQuery=function(E,D){var B=[],A=0,C,G,F;D=D||function(H){return baidu.url.escapeSymbol(H)};for(C in E){if(E.hasOwnProperty(C)){G=E[C];if(Object.prototype.toString.call(G)=="[object Array]"){F=G.length;while(F--){B[A++]=C+"="+D(G[F],C)}}else{B[A++]=C+"="+D(G,C)}}}return B.join("&")};baidu.url.queryToJson=function(A){var F=A.substr(A.indexOf("?")+1),C=F.split("&"),E=C.length,J={},D=0,H,G,I,B;for(;D<E;D++){B=C[D].split("=");H=B[0];G=B[1];I=J[H];if("undefined"==typeof I){J[H]=G}else{if(Object.prototype.toString.call(I)=="[object Array]"){I.push(G)}else{J[H]=[I,G]}}}return J};baidu.cookie=baidu.cookie||{};baidu.cookie._isValidKey=function(A){return(new RegExp('^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+\x24')).test(A)};baidu.cookie.setRaw=function(C,D,B){if(!baidu.cookie._isValidKey(C)){return }B=B||{};var A=B.expires;if("number"==typeof B.expires){A=new Date();A.setTime(A.getTime()+B.expires)}document.cookie=C+"="+D+(B.path?"; path="+B.path:"")+(A?"; expires="+A.toGMTString():"")+(B.domain?"; domain="+B.domain:"")+(B.secure?"; secure":"")};baidu.cookie.getRaw=function(B){if(baidu.cookie._isValidKey(B)){var C=new RegExp("(^| )"+B+"=([^;]*)(;|\x24)"),A=C.exec(document.cookie);if(A){return A[2]||null}}return null};baidu.cookie.get=function(A){var B=baidu.cookie.getRaw(A);if("string"==typeof B){B=decodeURIComponent(B);return B}return null};baidu.cookie.set=function(B,C,A){baidu.cookie.setRaw(B,encodeURIComponent(C),A)};baidu.cookie.remove=function(B,A){A=A||{};A.expires=new Date(0);baidu.cookie.setRaw(B,"",A)};baidu.json=baidu.json||{};baidu.json.parse=window.JSON&&window.JSON.parse?window.JSON.parse:function(A){if(!/^[\],:{}\s]*$/.test(A.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){return null}return(new Function("return "+A))()};baidu.json.stringify=(function(){var B={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};function A(F){if(/["\\\x00-\x1f]/.test(F)){F=F.replace(/["\\\x00-\x1f]/g,function(G){var H=B[G];if(H){return H}H=G.charCodeAt();return"\\u00"+Math.floor(H/16).toString(16)+(H%16).toString(16)})}return'"'+F+'"'}function D(K){var G=["["],H=K.length,F,I,J;for(I=0;I<H;I++){J=K[I];switch(typeof J){case"undefined":case"function":case"unknown":break;default:if(F){G.push(",")}G.push(baidu.json.stringify(J));F=1}}G.push("]");return G.join("")}function C(F){return F<10?"0"+F:F}function E(F){return'"'+F.getFullYear()+"-"+C(F.getMonth()+1)+"-"+C(F.getDate())+"T"+C(F.getHours())+":"+C(F.getMinutes())+":"+C(F.getSeconds())+'"'}return function(J){switch(typeof J){case"undefined":return"undefined";case"number":return isFinite(J)?String(J):"null";case"string":return A(J);case"boolean":return String(J);default:if(J===null){return"null"}else{if(J instanceof Array){return D(J)}else{if(J instanceof Date){return E(J)}else{var G=["{"],I=baidu.json.stringify,F,H;for(key in J){if(J.hasOwnProperty(key)){H=J[key];switch(typeof H){case"undefined":case"unknown":case"function":break;default:if(F){G.push(",")}F=1;G.push(I(key)+":"+I(H))}}}G.push("}");return G.join("")}}}}}})();baidu.json.encode=function(A){return baidu.json.stringify(A)};baidu.json.decode=function(A){return baidu.json.parse(A)};baidu.date=baidu.date||{};baidu.date.format=function(A,F){if("string"!=typeof F){return A.toString()}function D(L,K){F=F.replace(L,K)}var B=baidu.number.pad,G=A.getFullYear(),E=A.getMonth()+1,J=A.getDate(),H=A.getHours(),C=A.getMinutes(),I=A.getSeconds();D(/yyyy/g,B(G,4));D(/yy/g,B(G.toString().slice(2),2));D(/MM/g,B(E,2));D(/M/g,E);D(/dd/g,B(J,2));D(/d/g,J);D(/HH/g,B(H,2));D(/H/g,H);D(/hh/g,B(H%12,2));D(/h/g,H%12);D(/mm/g,B(C,2));D(/m/g,C);D(/ss/g,B(I,2));D(/s/g,I);return F};baidu.date.parse=function(C){var A=new RegExp("^\\d+(\\-|\\/)\\d+(\\-|\\/)\\d+\x24");if("string"==typeof C){if(A.test(C)||isNaN(Date.parse(C))){var E=C.split(/ |T/),B=E.length>1?E[1].split(/[^\d]/):[0,0,0],D=E[0].split(/[^\d]/);return new Date(D[0]-0,D[1]-1,D[2]-0,B[0]-0,B[1]-0,B[2]-0)}else{return new Date(C)}}return new Date()};baidu.dom=baidu.dom||{};baidu.dom._styleFilter=baidu.dom._styleFilter||[];baidu.dom._styleFilter[baidu.dom._styleFilter.length]={get:function(C,D){if(/color/i.test(C)&&D.indexOf("rgb(")!=-1){var E=D.split(",");D="#";for(var B=0,A;A=E[B];B++){A=parseInt(A.replace(/[^\d]/gi,""),10).toString(16);D+=A.length==1?"0"+A:A}D=D.toUpperCase()}return D}};baidu.dom._styleFilter.filter=function(B,E,F){for(var A=0,D=baidu.dom._styleFilter,C;C=D[A];A++){if(C=C[F]){E=C(B,E)}}return E};baidu.dom._styleFilter[baidu.dom._styleFilter.length]={set:function(A,B){if(B.constructor==Number&&!/zIndex|fontWeight|opacity|zoom|lineHeight/i.test(A)){B=B+"px"}return B}};baidu.dom._styleFixer=baidu.dom._styleFixer||{};baidu.dom._styleFixer.display=baidu.browser.ie&&baidu.browser.ie<8?{set:function(A,B){A=A.style;if(B=="inline-block"){A.display="inline";A.zoom=1}else{A.display=B}}}:baidu.browser.firefox&&baidu.browser.firefox<3?{set:function(A,B){A.style.display=B=="inline-block"?"-moz-inline-box":B}}:null;baidu.dom._styleFixer["float"]=baidu.browser.ie?"styleFloat":"cssFloat";baidu.dom._styleFixer.opacity=baidu.browser.ie?{get:function(A){var B=A.style.filter;return B&&B.indexOf("opacity=")>=0?(parseFloat(B.match(/opacity=([^)]*)/)[1])/100)+"":"1"},set:function(A,C){var B=A.style;B.filter=(B.filter||"").replace(/alpha\([^\)]*\)/gi,"")+(C==1?"":"alpha(opacity="+C*100+")");B.zoom=1}}:null;baidu.dom._styleFixer.textOverflow=(function(){var B={};function A(E){var F=E.length;if(F>0){F=E[F-1];E.length--}else{F=null}return F}function C(E,F){E[baidu.browser.firefox?"textContent":"innerText"]=F}function D(L,H,Q){var J=baidu.browser.ie?L.currentStyle||L.style:getComputedStyle(L,null),P=J.fontWeight,O="font-family:"+J.fontFamily+";font-size:"+J.fontSize+";word-spacing:"+J.wordSpacing+";font-weight:"+((parseInt(P)||0)==401?700:P)+";font-style:"+J.fontStyle+";font-variant:"+J.fontVariant,E=B[O];if(!E){J=L.appendChild(document.createElement("div"));J.style.cssText="float:left;"+O;E=B[O]=[];for(var M=0;M<256;M++){M==32?(J.innerHTML="&nbsp;"):C(J,String.fromCharCode(M));E[M]=J.offsetWidth}C(J,"\u4e00");E[256]=J.offsetWidth;C(J,"\u4e00\u4e00");E[257]=J.offsetWidth-E[256]*2;E[258]=E[".".charCodeAt(0)]*3+E[257]*3;L.removeChild(J)}for(var K=L.firstChild,N=E[256],G=E[257],F=E[258],S=[],Q=Q?F:0;K;K=K.nextSibling){if(H<Q){L.removeChild(K)}else{if(K.nodeType==3){for(var M=0,R=K.nodeValue,I=R.length;M<I;M++){J=R.charCodeAt(M);S[S.length]=[H,K,M];H-=(M?G:0)+(J<256?E[J]:N);if(H<Q){break}}}else{J=K.tagName;if(J=="IMG"||J=="TABLE"){J=K;K=K.previousSibling;L.removeChild(J)}else{S[S.length]=[H,K];H-=K.offsetWidth}}}}if(H<Q){while(J=A(S)){H=J[0];K=J[1];J=J[2];if(K.nodeType==3){if(H>=F){K.nodeValue=K.nodeValue.substring(0,J)+"...";return true}else{if(!J){L.removeChild(K)}}}else{if(D(K,H,true)){return true}else{L.removeChild(K)}}}L.innerHTML=""}}return{get:function(F,G){var E=baidu.browser;return(E.opera?G.OTextOverflow:E.firefox?F._baiduOverflow:G.textOverflow)||"clip"},set:function(F,H){var E=baidu.browser;if(F.tagName=="TD"||F.tagName=="TH"||E.firefox){F._baiduHTML&&(F.innerHTML=F._baiduHTML);if(H=="ellipsis"){F._baiduHTML=F.innerHTML;var I=document.createElement("div"),G=F.appendChild(I).offsetWidth;F.removeChild(I);D(F,G)}else{F._baiduHTML=""}}I=F.style;E.opera?(I.OTextOverflow=H):E.firefox?(F._baiduOverflow=H):(I.textOverflow=H)}}})();baidu.dom.g=function(A){if("string"==typeof A||A instanceof String){return document.getElementById(A)}else{if(A&&A.nodeName&&(A.nodeType==1||A.nodeType==9)){return A}}return null};baidu.g=baidu.G=baidu.dom.g;baidu.dom._NAME_ATTRS=(function(){var A={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",rowspan:"rowSpan",valign:"vAlign",usemap:"useMap",frameborder:"frameBorder"};if(baidu.browser.ie<8){A["for"]="htmlFor";A["class"]="className"}else{A.htmlFor="for";A.className="class"}return A})();baidu.dom.setAttr=function(B,A,C){B=baidu.dom.g(B);if("style"==A){B.style.cssText=C}else{A=baidu.dom._NAME_ATTRS[A]||A;B.setAttribute(A,C)}return B};baidu.setAttr=baidu.dom.setAttr;baidu.dom.setAttrs=function(C,A){C=baidu.dom.g(C);for(var B in A){baidu.dom.setAttr(C,B,A[B])}return C};baidu.setAttrs=baidu.dom.setAttrs;baidu.dom.getAttr=function(B,A){B=baidu.dom.g(B);if("style"==A){return B.style.cssText}A=baidu.dom._NAME_ATTRS[A]||A;return B.getAttribute(A)};baidu.getAttr=baidu.dom.getAttr;baidu.dom._matchNode=function(A,C,D){A=baidu.dom.g(A);for(var B=A[D];B;B=B[C]){if(B.nodeType==1){return B}}return null};baidu.dom.prev=function(A){return baidu.dom._matchNode(A,"previousSibling","previousSibling")};(function(){var A=new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)","g");baidu.string.trim=function(B){return String(B).replace(A,"")}})();baidu.trim=baidu.string.trim;baidu.dom.addClass=function(A,B){A=baidu.dom.g(A);A.className+=" "+B;return A};baidu.addClass=baidu.dom.addClass;baidu.dom.hasClass=function(C,D){C=baidu.dom.g(C);var B=baidu.string.trim(D).split(/\s+/),A=B.length;D=C.className.split(/\s+/).join(" ");while(A--){if(!(new RegExp("(^| )"+B[A]+"( |\x24)")).test(D)){return false}}return true};baidu.dom.contains=function(A,B){var C=baidu.dom.g;A=C(A);B=C(B);return A.contains?A!=B&&A.contains(B):!!(A.compareDocumentPosition(B)&16)};baidu.dom.getDocument=function(A){A=baidu.dom.g(A);return A.nodeType==9?A:A.ownerDocument||A.document};baidu.dom.removeClass=function(D,E){D=baidu.dom.g(D);var B=D.className.split(/\s+/).sort(),F=E.split(/\s+/).sort(),C=B.length,A=F.length;for(;C&&A;){if(B[C-1]==F[A-1]){B.splice(--C,1)}else{if(B[C-1]<F[A-1]){A--}else{C--}}}D.className=B.join(" ");return D};baidu.removeClass=baidu.dom.removeClass;baidu.dom.children=function(B){B=baidu.dom.g(B);for(var A=[],C=B.firstChild;C;C=C.nextSibling){if(C.nodeType==1){A.push(C)}}return A};baidu.string.toCamelCase=function(A){if(A.indexOf("-")<0&&A.indexOf("_")<0){return A}return A.replace(/[-_][^-_]/g,function(B){return B.charAt(1).toUpperCase()})};baidu.dom.setStyle=function(C,B,D){var E=baidu.dom,A;C=E.g(C);B=baidu.string.toCamelCase(B);if(A=E._styleFilter){D=A.filter(B,D,"set")}A=E._styleFixer[B];(A&&A.set)?A.set(C,D):(C.style[A||B]=D);return C};baidu.setStyle=baidu.dom.setStyle;baidu.dom.setStyles=function(B,C){B=baidu.dom.g(B);for(var A in C){baidu.dom.setStyle(B,A,C[A])}return B};baidu.setStyles=baidu.dom.setStyles;baidu.dom.q=function(H,E,B){var I=[],D=baidu.string.trim,G,F,A,C;if(!(H=D(H))){return null}if("undefined"==typeof E){E=document}else{E=baidu.dom.g(E);if(!E){return I}}B&&(B=D(B).toUpperCase());if(E.getElementsByClassName){A=E.getElementsByClassName(H);G=A.length;for(F=0;F<G;F++){C=A[F];if(B&&C.tagName!=B){continue}I[I.length]=C}}else{H=new RegExp("(^|\\s)"+baidu.string.escapeReg(H)+"(\\s|\x24)");A=B?E.getElementsByTagName(B):(E.all||E.getElementsByTagName("*"));G=A.length;for(F=0;F<G;F++){C=A[F];H.test(C.className)&&(I[I.length]=C)}}return I};baidu.q=baidu.Q=baidu.dom.q;baidu.dom.getStyle=function(C,B){var F=baidu.dom;C=F.g(C);B=baidu.string.toCamelCase(B);var E=C.style[B];if(!E){var A=F._styleFixer[B],D=C.currentStyle||(baidu.browser.ie?C.style:getComputedStyle(C,null));if("string"==typeof A){E=D[A]}else{if(A&&A.get){E=A.get(C,D)}else{E=D[B]}}}if(A=F._styleFilter){E=A.filter(B,E,"get")}return E};baidu.getStyle=baidu.dom.getStyle;baidu.dom.getPosition=function(C){var K=baidu.dom.getDocument(C),F=baidu.browser,H=baidu.dom.getStyle;C=baidu.dom.g(C);var E=F.isGecko>0&&K.getBoxObjectFor&&H(C,"position")=="absolute"&&(C.style.top===""||C.style.left==="");var I={left:0,top:0};var G=(F.ie&&!F.isStrict)?K.body:K.documentElement;if(C==G){return I}var L=null;var D,J,B,M;if(C.getBoundingClientRect){D=C.getBoundingClientRect();I.left=Math.floor(D.left)+Math.max(K.documentElement.scrollLeft,K.body.scrollLeft);I.top=Math.floor(D.top)+Math.max(K.documentElement.scrollTop,K.body.scrollTop);I.left-=K.documentElement.clientLeft;I.top-=K.documentElement.clientTop;J=K.body;B=parseInt(H(J,"borderLeftWidth"));M=parseInt(H(J,"borderTopWidth"));if(F.ie&&!F.isStrict){I.left-=isNaN(B)?2:B;I.top-=isNaN(M)?2:M}}else{if(K.getBoxObjectFor&&!E){D=K.getBoxObjectFor(C);var A=K.getBoxObjectFor(G);I.left=D.screenX-A.screenX;I.top=D.screenY-A.screenY}else{L=C;do{I.left+=L.offsetLeft;I.top+=L.offsetTop;if(F.isWebkit>0&&H(L,"position")=="fixed"){I.left+=K.body.scrollLeft;I.top+=K.body.scrollTop;break}L=L.offsetParent}while(L&&L!=C);if(F.opera>0||(F.isWebkit>0&&H(C,"position")=="absolute")){I.top-=K.body.offsetTop}L=C.offsetParent;while(L&&L!=K.body){I.left-=L.scrollLeft;if(!b.opera||L.tagName!="TR"){I.top-=L.scrollTop}L=L.offsetParent}}}return I};baidu.dom.intersect=function(H,G){var F=baidu.dom.g,E=baidu.dom.getPosition,A=Math.max,C=Math.min;H=F(H);G=F(G);var D=E(H),B=E(G);return A(D.left,B.left)<=C(D.left+H.offsetWidth,B.left+G.offsetWidth)&&A(D.top,B.top)<=C(D.top+H.offsetHeight,B.top+G.offsetHeight)};baidu.dom.last=function(A){return baidu.dom._matchNode(A,"previousSibling","lastChild")};baidu.dom.ready=function(){var C=false,E=false,D=[];function A(){if(!C){C=true;for(var G=0,F=D.length;G<F;G++){D[G]()}}}function B(){if(E){return }E=true;var I=document,G=window,F=baidu.browser.opera;if(I.addEventListener&&!F){I.addEventListener("DOMContentLoaded",F?function(){if(C){return }for(var J=0;J<I.styleSheets.length;J++){if(I.styleSheets[J].disabled){setTimeout(arguments.callee,0);return }}A()}:A,false)}else{if(baidu.browser.ie&&G==top){(function(){if(C){return }try{I.documentElement.doScroll("left")}catch(J){setTimeout(arguments.callee,0);return }A()})()}else{if(baidu.browser.safari){var H;(function(){if(C){return }if(I.readyState!="loaded"&&I.readyState!="complete"){setTimeout(arguments.callee,0);return }if(H===undefined){H=0;var M=I.getElementsByTagName("style");var K=I.getElementsByTagName("link");if(M){H+=M.length}if(K){for(var L=0,J=K.length;L<J;L++){if(K[L].getAttribute("rel")=="stylesheet"){H++}}}}if(I.styleSheets.length!=H){setTimeout(arguments.callee,0);return }A()})()}}}G.attachEvent?G.attachEvent("onload",A):G.addEventListener("load",A,false)}return function(F){B();C?F():(D[D.length]=F)}}();baidu.dom.getAncestorByTag=function(B,A){B=baidu.dom.g(B);A=A.toUpperCase();while((B=B.parentNode)&&B.nodeType==1){if(B.tagName==A){return B}}return null};baidu.dom.getWindow=function(A){A=baidu.dom.g(A);var B=baidu.dom.getDocument(A);return B.parentWindow||B.defaultView||null};baidu.dom.getAncestorBy=function(A,B){A=baidu.dom.g(A);while((A=A.parentNode)&&A.nodeType==1){if(B(A)){return A}}return null};baidu.dom.hide=function(A){A=baidu.dom.g(A);A.style.display="none";return A};baidu.hide=baidu.dom.hide;baidu.dom.next=function(A){return baidu.dom._matchNode(A,"nextSibling","nextSibling")};baidu.dom.show=function(A){A=baidu.dom.g(A);A.style.display="";return A};baidu.show=baidu.dom.show;baidu.dom.toggle=function(A){A=baidu.dom.g(A);A.style.display=A.style.display=="none"?"":"none";return A};baidu.dom._g=function(A){if("string"==typeof A||A instanceof String){return document.getElementById(A)}return A};baidu._g=baidu.dom._g;baidu.dom.insertAfter=function(D,C){var B,A;B=baidu.dom._g;D=B(D);C=B(C);A=C.parentNode;if(A){A.insertBefore(D,C.nextSibling)}return D};baidu.dom.first=function(A){return baidu.dom._matchNode(A,"nextSibling","firstChild")};baidu.dom.insertBefore=function(D,C){var B,A;B=baidu.dom._g;D=B(D);C=B(C);A=C.parentNode;if(A){A.insertBefore(D,C)}return D};baidu.dom.insertHTML=function(E,A,D){E=baidu.dom.g(E);if(E.insertAdjacentHTML){E.insertAdjacentHTML(A,D)}else{var B=E.ownerDocument.createRange();B.setStartBefore(E);var C=B.createContextualFragment(D),G=E.parentNode,F;switch(A.toUpperCase()){case"BEFOREBEGIN":G.insertBefore(C,E);break;case"AFTERBEGIN":E.insertBefore(C,E.firstChild);break;case"BEFOREEND":E.appendChild(C);break;case"AFTEREND":(F=E.nextSibling)?G.insertBefore(C,F):G.appendChild(C)}}return E};baidu.insertHTML=baidu.dom.insertHTML;baidu.dom.remove=function(A){A=baidu.dom._g(A);var B=A.parentNode;B&&B.removeChild(A)};baidu.dom.getAncestorByClass=function(A,B){A=baidu.dom.g(A);B=new RegExp("(^|\\s)"+baidu.string.trim(B)+"(\\s|\x24)");while((A=A.parentNode)&&A.nodeType==1){if(B.test(A.className)){return A}}return null};baidu.lang=baidu.lang||{};window[baidu.guid]._instances=window[baidu.guid]._instances||{};baidu.lang.instance=function(A){return window[baidu.guid]._instances[A]||null};baidu.lang.isNumber=function(A){return"[object Number]"==Object.prototype.toString.call(A)};baidu.lang.guid=function(){return"TANGRAM__"+(window[baidu.guid]._counter++).toString(36)};window[baidu.guid]._counter=window[baidu.guid]._counter||1;baidu.lang.Class=function(A){this.guid=A||baidu.lang.guid();window[baidu.guid]._instances[this.guid]=this};window[baidu.guid]._instances=window[baidu.guid]._instances||{};baidu.lang.Class.prototype.dispose=function(){delete window[baidu.guid]._instances[this.guid];for(var A in this){if(typeof this[A]!="function"){delete this[A]}}this.disposed=true};baidu.lang.Class.prototype.toString=function(){return"[object "+(this._className||"Object")+"]"};baidu.lang.inherits=function(G,E,D){var C,F,A=G.prototype,B=new Function();B.prototype=E.prototype;F=G.prototype=new B();for(C in A){F[C]=A[C]}G.prototype.constructor=G;G.superClass=E.prototype;if("string"==typeof D){F._className=D}};baidu.inherits=baidu.lang.inherits;baidu.lang.isElement=function(A){return !!(A&&A.nodeName&&A.nodeType==1)};baidu.lang.module=function(name,module,owner){var packages=name.split("."),len=packages.length-1,packageName,i=0;if(!owner){try{if(!(new RegExp("^[a-zA-Z_\x24][a-zA-Z0-9_\x24]*\x24")).test(packages[0])){throw""}owner=eval(packages[0]);i=1}catch(e){owner=window}}for(;i<len;i++){packageName=packages[i];if(!owner[packageName]){owner[packageName]={}}owner=owner[packageName]}if(!owner[packages[len]]){owner[packages[len]]=module}};baidu.lang.decontrol=function(B){var A=window[baidu.guid];A._instances&&(delete A._instances[B])};baidu.lang.isArray=function(A){return"[object Array]"==Object.prototype.toString.call(A)};baidu.lang.Event=function(A,B){this.type=A;this.returnValue=true;this.target=B||null;this.currentTarget=null};baidu.lang.Class.prototype.addEventListener=function(D,C,B){if(typeof C!="function"){return }!this.__listeners&&(this.__listeners={});var A=this.__listeners,E;if(typeof B=="string"&&B){if(/[^\w\-]/.test(B)){throw ("nonstandard key:"+B)}else{C.hashCode=B;E=B}}D.indexOf("on")!=0&&(D="on"+D);typeof A[D]!="object"&&(A[D]={});E=E||baidu.lang.guid();C.hashCode=E;A[D][E]=C};baidu.lang.Class.prototype.removeEventListener=function(C,B){if(typeof B=="function"){B=B.hashCode}else{if(typeof B!="string"){return }}!this.__listeners&&(this.__listeners={});C.indexOf("on")!=0&&(C="on"+C);var A=this.__listeners;if(!A[C]){return }A[C][B]&&delete A[C][B]};baidu.lang.Class.prototype.dispatchEvent=function(D,A){if("string"==typeof D){D=new baidu.lang.Event(D)}!this.__listeners&&(this.__listeners={});A=A||{};for(var C in A){D[C]=A[C]}var C,B=this.__listeners,E=D.type;D.target=D.target||this;D.currentTarget=this;E.indexOf("on")!=0&&(E="on"+E);typeof this[E]=="function"&&this[E].apply(this,arguments);if(typeof B[E]=="object"){for(C in B[E]){B[E][C].apply(this,arguments)}}return D.returnValue};baidu.lang.isObject=function(A){return"function"==typeof A||!!(A&&"object"==typeof A)};baidu.isObject=baidu.lang.isObject;baidu.lang.isString=function(A){return"[object String]"==Object.prototype.toString.call(A)};baidu.isString=baidu.lang.isString;baidu.event=baidu.event||{};baidu.event.getPageX=function(B){var A=B.pageX,C=document;if(!A&&A!==0){A=(B.clientX||0)+(C.documentElement.scrollLeft||C.body.scrollLeft)}return A};baidu.event.getPageY=function(B){var A=B.pageY,C=document;if(!A&&A!==0){A=(B.clientY||0)+(C.documentElement.scrollTop||C.body.scrollTop)}return A};baidu.event.stopPropagation=function(A){if(A.stopPropagation){A.stopPropagation()}else{A.cancelBubble=true}};baidu.event.preventDefault=function(A){if(A.preventDefault){A.preventDefault()}else{A.returnValue=false}};baidu.event.stop=function(A){var B=baidu.event;B.stopPropagation(A);B.preventDefault(A)};baidu.event.getTarget=function(A){return A.target||A.srcElement};baidu.event.EventArg=function(C,E){E=E||window;C=C||E.event;var D=E.document;this.target=C.target||C.srcElement;this.keyCode=C.which||C.keyCode;for(var A in C){var B=C[A];if("function"!=typeof B){this[A]=B}}if(!this.pageX&&this.pageX!==0){this.pageX=(C.clientX||0)+(D.documentElement.scrollLeft||D.body.scrollLeft);this.pageY=(C.clientY||0)+(D.documentElement.scrollTop||D.body.scrollTop)}this._event=C};baidu.event.EventArg.prototype.preventDefault=function(){if(this._event.preventDefault){this._event.preventDefault()}else{this._event.returnValue=false}return this};baidu.event.EventArg.prototype.stopPropagation=function(){if(this._event.stopPropagation){this._event.stopPropagation()}else{this._event.cancelBubble=true}return this};baidu.event.EventArg.prototype.stop=function(){return this.stopPropagation().preventDefault()};baidu.event._unload=function(){var C=baidu.event._listeners,A=C.length,B=!!window.removeEventListener,E,D;while(A--){E=C[A];if(E[1]=="unload"){continue}D=E[0];if(D.removeEventListener){D.removeEventListener(E[1],E[3],false)}else{if(D.detachEvent){D.detachEvent("on"+E[1],E[3])}}}if(B){window.removeEventListener("unload",baidu.event._unload,false)}else{window.detachEvent("onunload",baidu.event._unload)}};if(window.attachEvent){window.attachEvent("onunload",baidu.event._unload)}else{window.addEventListener("unload",baidu.event._unload,false)}baidu.event._listeners=baidu.event._listeners||[];baidu.event.on=function(B,E,G){E=E.replace(/^on/i,"").toLowerCase();B=baidu.dom._g(B);var F=function(I){G.call(B,I)},A=baidu.event._listeners,D=baidu.event._eventFilter,H,C=E;if(D&&D[E]){H=D[E](B,E,F);C=H.type;F=H.listener}if(B.addEventListener){B.addEventListener(C,F,false)}else{if(B.attachEvent){B.attachEvent("on"+C,F)}}A[A.length]=[B,E,G,F,C];return B};baidu.on=baidu.event.on;baidu.event.get=function(A,B){return new baidu.event.EventArg(A,B)};baidu.event.un=function(C,F,B){C=baidu.dom._g(C);F=F.replace(/^on/i,"");var I=baidu.event._listeners,D=I.length,E=!B,H,G,A;while(D--){H=I[D];if(H[1]===F&&H[0]===C&&(E||H[2]===B)){G=H[4];A=H[3];if(C.removeEventListener){C.removeEventListener(G,A,false)}else{if(C.detachEvent){C.detachEvent("on"+G,A)}}I.splice(D,1)}}return C};baidu.un=baidu.event.un;baidu.event.getKeyCode=function(A){return A.which||A.keyCode};baidu.ajax=baidu.ajax||{};baidu.ajax.request=function(D,O){function J(){if(N.readyState==4){try{var Q=N.status}catch(P){E("failure");return }E(Q);if((Q>=200&&Q<300)||Q==304||Q==1223){E("success")}else{E("failure")}window.setTimeout(function(){N.onreadystatechange=new Function();if(G){N=null}},0)}}function C(){if(window.ActiveXObject){try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(P){try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(P){}}}if(window.XMLHttpRequest){return new XMLHttpRequest()}}function E(Q){Q="on"+Q;var P=B[Q],R=baidu.ajax[Q];if(P){if(Q!="onsuccess"){P(N)}else{P(N,N.responseText)}}else{if(R){if(Q=="onsuccess"){return }R(N)}}}O=O||{};var I=O.data||"",G=!(O.async===false),H=O.username||"",M=O.password||"",A=(O.method||"GET").toUpperCase(),F=O.headers||{},B={},L,N;for(L in O){B[L]=O[L]}F["X-Request-By"]="baidu.ajax";try{N=C();if(A=="GET"){D+=(D.indexOf("?")>=0?"&":"?");if(I){D+=I+"&";I=null}if(O.noCache){D+="b"+(new Date()).getTime()+"=1"}}if(H){N.open(A,D,G,H,M)}else{N.open(A,D,G)}if(G){N.onreadystatechange=J}if(A=="POST"){N.setRequestHeader("Content-Type","application/x-www-form-urlencoded")}for(L in F){if(F.hasOwnProperty(L)){N.setRequestHeader(L,F[L])}}E("beforerequest");N.send(I);if(!G){J()}}catch(K){E("failure")}return N};baidu.ajax.post=function(B,C,A){return baidu.ajax.request(B,{onsuccess:A,method:"POST",data:C})};baidu.ajax.get=function(B,A){return baidu.ajax.request(B,{onsuccess:A})};baidu.ajax.form=function(A,C){C=C||{};var F=A.elements,M=F.length,B=A.getAttribute("method"),E=A.getAttribute("action"),S=C.replacer||function(U,T){return U},P={},R=[],K,O,Q,L,D,G,H,J,I;function N(T,U){R.push(T+"="+U)}for(K in C){if(C.hasOwnProperty(K)){P[K]=C[K]}}for(K=0;K<M;K++){O=F[K];L=O.name;if(!O.disabled&&L){Q=O.type;D=O.value;switch(Q){case"radio":case"checkbox":if(!O.checked){break}case"textarea":case"text":case"password":case"hidden":case"select-one":N(L,S(D,L));break;case"select-multiple":G=O.options;J=G.length;for(H=0;H<J;H++){I=G[H];if(I.selected){N(L,S(I.value,L))}}break}}}P.data=R.join("&");P.method=A.getAttribute("method")||"POST";return baidu.ajax.request(E,P)};baidu.sio=baidu.sio||{};baidu.sio._removeScriptTag=function(B){if(B.clearAttributes){B.clearAttributes()}else{for(var A in B){if(B.hasOwnProperty(A)){delete B[A]}}}if(B&&B.parentNode){B.parentNode.removeChild(B)}B=null};baidu.sio.callByBrowser=function(D,G,C){C=C||{};var E=document.createElement("SCRIPT"),B=0,A,F=C.charset;E.onload=E.onreadystatechange=function(){if(B){return }var H=E.readyState;if("undefined"==typeof H||H=="loaded"||H=="complete"){B=1;try{("function"==typeof G)&&G()}finally{baidu.sio._removeScriptTag(E)}}};E.setAttribute("type","text/javascript");F&&E.setAttribute("charset",F);E.setAttribute("src",D);document.getElementsByTagName("head")[0].appendChild(E)};baidu.sio.callByServer=function(A,I,J){J=J||{};var F=document.createElement("SCRIPT"),E="bd__cbs__",D=typeof I,H,G,B=J.charset,C=J.queryField||"callback";if("string"==D){H=I}else{if("function"==D){while(1){H=E+Math.floor(Math.random()*2147483648).toString(36);if(!window[H]){window[H]=function(){try{I.apply(window,arguments)}finally{baidu.sio._removeScriptTag(F);window[H]=null}};break}}}}if("string"==typeof H){A=A.replace((new RegExp("(\\?|&)callback=[^&]*")),"\x241"+C+"="+H);if(A.search(new RegExp("(\\?|&)"+C+"=/"))<0){A+=(A.indexOf("?")<0?"?":"&")+C+"="+H}}F.setAttribute("type","text/javascript");B&&F.setAttribute("charset",B);F.setAttribute("src",A);document.getElementsByTagName("head")[0].appendChild(F)};baidu.swf=baidu.swf||{};baidu.swf.version=(function(){var F=navigator;if(F.plugins&&F.mimeTypes.length){var C=F.plugins["Shockwave Flash"];if(C&&C.description){return C.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s)+r/,".")+".0"}}else{if(window.ActiveXObject&&!window.opera){for(var B=10;B>=2;B--){try{var E=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+B);if(E){var A=E.GetVariable("$version");return A.replace(/WIN/g,"").replace(/,/g,".")}}catch(D){}}}}})();baidu.swf.createHTML=function(P){P=P||{};var I=baidu.swf.version,G=P.ver||"6.0.0",F,D,E,C,H,O,A={};for(C in P){A[C]=P[C]}P=A;if(I){I=I.split(".");G=G.split(".");for(E=0;E<3;E++){F=parseInt(I[E],10);D=parseInt(G[E],10);if(D<F){break}else{if(D>F){return""}}}}else{return""}var K=P.vars,J=["classid","codebase","id","width","height","align"];P.align=P.align||"middle";P.classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000";P.codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0";P.movie=P.url||"";delete P.vars;delete P.url;if("string"==typeof K){P.flashvars=K}else{var M=[];for(C in K){O=K[C];if(O){M.push(C+"="+encodeURIComponent(O))}}P.flashvars=M.join("&")}var L=["<object "];for(E=0,H=J.length;E<H;E++){O=J[E];L.push(" ",O,'="',P[O],'"')}L.push(">");var B={wmode:1,scale:1,quality:1,play:1,loop:1,menu:1,salign:1,bgcolor:1,base:1,allowscriptaccess:1,allownetworking:1,allowfullscreen:1,seamlesstabbing:1,devicefont:1,swliveconnect:1,flashvars:1,movie:1};for(C in P){O=P[C];C=C.toLowerCase();if(B[C]&&O){L.push('<param name="'+C+'" value="'+O+'" />')}}P.src=P.movie;P.name=P.id;delete P.id;delete P.movie;delete P.classid;delete P.codebase;P.type="application/x-shockwave-flash";P.pluginspage="http://www.macromedia.com/go/getflashplayer";L.push("<embed");var N;for(C in P){O=P[C];if(O){if((new RegExp("^salign\x24","i")).test(C)){N=O;continue}L.push(" ",C,'="',O,'"')}}if(N){L.push(' salign="',N,'"')}L.push("></embed></object>");return L.join("")};baidu.array=baidu.array||{};baidu.array.remove=function(C,D){var A=C.length,B=D;if("function"!=typeof D){B=function(E){return D===E}}while(A--){if(true===B.call(C,C[A],A)){C.splice(A,1)}}return C};baidu.lang.isFunction=function(A){return"[object Function]"==Object.prototype.toString.call(A)};baidu.lang.toArray=function(B){if(B===null||B===undefined){return[]}if(baidu.lang.isArray(B)){return B}if(typeof B.length!=="number"||typeof B==="string"||baidu.lang.isFunction(B)){return[B]}if(B.item){var A=B.length,C=new Array(A);while(A--){C[A]=B[A]}return C}return[].slice.call(B)};baidu.swf.getMovie=function(C){var A=document[C],B;return baidu.browser.ie==9?A&&A.length?(B=baidu.array.remove(baidu.lang.toArray(A),function(D){return D.tagName.toLowerCase()!="embed"})).length==1?B[0]:B:A:A||window[C]};baidu.swf.create=function(A,C){A=A||{};var B=baidu.swf.createHTML(A)||A.errorMessage||"";if(C&&"string"==typeof C){C=document.getElementById(C)}if(C){C.innerHTML=B}else{document.write(B)}};baidu.object=baidu.object||{};baidu.object.extend=function(C,A){for(var B in A){if(A.hasOwnProperty(B)){C[B]=A[B]}}return C};baidu.extend=baidu.object.extend;baidu.object.each=function(E,C){var B,A,D;if("function"==typeof C){for(A in E){if(E.hasOwnProperty(A)){D=E[A];B=C.call(E,D,A);if(B===false){break}}}}return E};baidu.object.keys=function(D){var A=[],C=0,B;for(B in D){if(D.hasOwnProperty(B)){A[C++]=B}}return A};baidu.object.values=function(D){var A=[],C=0,B;for(B in D){if(D.hasOwnProperty(B)){A[C++]=D[B]}}return A};baidu.object.clone=(function(A){return function(F){var C=F,D,B;if(!F||F instanceof Number||F instanceof String||F instanceof Boolean){return C}else{if(F instanceof Array){C=[];var E=0;for(D=0,B=F.length;D<B;D++){C[E++]=baidu.object.clone(F[D])}}else{if("object"==typeof F){if(A[Object.prototype.toString.call(F)]){return C}C={};for(D in F){if(F.hasOwnProperty(D)){C[D]=baidu.object.clone(F[D])}}}}}return C}})({"[object Function]":1,"[object RegExp]":1,"[object Date]":1,"[object Error]":1});baidu.string.getByteLength=function(A){return String(A).replace(/[^\x00-\xff]/g,"ci").length};baidu.string.decodeHTML=function(A){var B=String(A).replace(/&quot;/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");return B.replace(/&#([\d]+);/g,function(D,C){return String.fromCharCode(parseInt(C,10))})};baidu.decodeHTML=baidu.string.decodeHTML;baidu.string.format=function(C,A){C=String(C);var B=Array.prototype.slice.call(arguments,1),D=Object.prototype.toString;if(B.length){B=B.length==1?(A!==null&&(/\[object Array\]|\[object Object\]/.test(D.call(A)))?A:B):B;return C.replace(/#\{(.+?)\}/g,function(E,G){var F=B[G];if("[object Function]"==D.call(F)){F=F(G)}return("undefined"==typeof F?"":F)})}return C};baidu.format=baidu.string.format;baidu.string.wbr=function(A){return String(A).replace(/(?:<[^>]+>)|(?:&#?[0-9a-z]{2,6};)|(.{1})/gi,"$&<wbr>").replace(/><wbr>/g,">")};baidu.string.subByte=function(B,A){B=String(B);if(A<0||baidu.string.getByteLength(B)<=A){return B}B=B.substr(0,A).replace(/([^\x00-\xff])/g,"\x241 ").substr(0,A).replace(/[^\x00-\xff]$/,"").replace(/([^\x00-\xff]) /g,"\x241");return B};baidu.string.toHalfWidth=function(A){return String(A).replace(/[\uFF01-\uFF5E]/g,function(B){return String.fromCharCode(B.charCodeAt(0)-65248)}).replace(/\u3000/g," ")};baidu.string.encodeHTML=function(A){return String(A).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")};baidu.encodeHTML=baidu.string.encodeHTML;baidu.page=baidu.page||{};baidu.page.getHeight=function(){var D=document,A=D.body,C=D.documentElement,B=D.compatMode=="BackCompat"?A:D.documentElement;return Math.max(C.scrollHeight,A.scrollHeight,B.clientHeight)};baidu.page.loadCssFile=function(B){var A=document.createElement("link");A.setAttribute("rel","stylesheet");A.setAttribute("type","text/css");A.setAttribute("href",B);document.getElementsByTagName("head")[0].appendChild(A)};baidu.page.getScrollLeft=function(){var A=document;return window.pageXOffset||A.documentElement.scrollLeft||A.body.scrollLeft};baidu.page.getViewWidth=function(){var B=document,A=B.compatMode=="BackCompat"?B.body:B.documentElement;return A.clientWidth};baidu.page.loadJsFile=function(B){var A=document.createElement("script");A.setAttribute("type","text/javascript");A.setAttribute("src",B);A.setAttribute("defer","defer");document.getElementsByTagName("head")[0].appendChild(A)};baidu.page.getWidth=function(){var D=document,A=D.body,C=D.documentElement,B=D.compatMode=="BackCompat"?A:D.documentElement;return Math.max(C.scrollWidth,A.scrollWidth,B.clientWidth)};baidu.page.getScrollTop=function(){var A=document;return window.pageYOffset||A.documentElement.scrollTop||A.body.scrollTop};baidu.page.getViewHeight=function(){var B=document,A=B.compatMode=="BackCompat"?B.body:B.documentElement;return A.clientHeight};baidu.array.filter=function(G,E){var C=[],B=0,A=G.length,F,D;if("function"==typeof E){for(D=0;D<A;D++){F=G[D];if(true===E.call(G,F,D)){C[B++]=F}}}return C};baidu.array.unique=function(E,F){var B=E.length,A=E.slice(0),D,C;if("function"!=typeof F){F=function(H,G){return H===G}}while(--B>0){C=A[B];D=B;while(D--){if(F(C,A[D])){A.splice(B,1);break}}}return A};baidu.array.indexOf=function(D,E,B){var A=D.length,C=E;B=Number(B)||0;B=B<0?Math.ceil(B):Math.floor(B);B=Math.min(Math.max(B,0),A);if("function"!=typeof E){C=function(F){return E===F}}for(;B<A;B++){if(true===C.call(D,D[B],B)){return B}}return -1};baidu.array.each=function(F,D){var C,E,B,A=F.length;if("function"==typeof D){for(B=0;B<A;B++){E=F[B];C=D.call(F,E,B);if(C===false){break}}}return F};baidu.each=baidu.array.each;baidu.array.find=function(E,C){var D,B,A=E.length;if("function"==typeof C){for(B=0;B<A;B++){D=E[B];if(true===C.call(E,D,B)){return D}}}return null};baidu.array.lastIndexOf=function(C,D){var A=C.length,B=D;if("function"!=typeof D){B=function(E){return D===E}}while(A--){if(true===B.call(C,C[A],A)){return A}}return -1};baidu.array.removeAt=function(B,A){return B.splice(A,1)[0]};baidu.lang.createClass=function(G,B){B=B||{};var F=B.superClass||baidu.lang.Class;var E=function(){if(F!=baidu.lang.Class){F.apply(this,arguments)}else{F.call(this)}G.apply(this,arguments)};E.options=B.options||{};var I=function(){},H=G.prototype;I.prototype=F.prototype;var A=E.prototype=new I();for(var D in H){A[D]=H[D]}typeof B.className=="string"&&(A._className=B.className);A.constructor=H.constructor;E.extend=function(J){for(var C in J){E.prototype[C]=J[C]}return E};return E};baidu.lang.createSingle=function(B){var C=new baidu.lang.Class();for(var A in B){C[A]=B[A]}return C};baidu.string.filterFormat=function(C,A){var B=Array.prototype.slice.call(arguments,1),D=Object.prototype.toString;if(B.length){B=B.length==1?(A!==null&&(/\[object Array\]|\[object Object\]/.test(D.call(A)))?A:B):B;return C.replace(/#\{(.+?)\}/g,function(F,I){var K,H,G,E,J;if(!B){return""}K=I.split("|");H=B[K[0]];if("[object Function]"==D.call(H)){H=H(K[0])}for(G=1,E=K.length;G<E;++G){J=baidu.string.filterFormat[K[G]];if("[object Function]"==D.call(J)){H=J(H)}}return(("undefined"==typeof H||H===null)?"":H)})}return C};baidu.string.filterFormat.escapeJs=function(E){if(!E||"string"!=typeof E){return E}var D,A,B,C=[];for(D=0,A=E.length;D<A;++D){B=E.charCodeAt(D);if(B>255){C.push(E.charAt(D))}else{C.push("\\x"+B.toString(16))}}return C.join("")};baidu.string.filterFormat.js=baidu.string.filterFormat.escapeJs;baidu.string.filterFormat.escapeString=function(A){if(!A||"string"!=typeof A){return A}return A.replace(/"/g,"&#34;").replace(/'/g,"&#39;").replace(/</g,"&#60;").replace(/>/g,"&#62;").replace(/\\/g,"&#92;").replace(/\//g,"&#47;").replace(/`/g,"&#96;")};baidu.string.filterFormat.e=baidu.string.filterFormat.escapeString;baidu.string.filterFormat.toInt=function(A){return parseInt(A,10)||0};baidu.string.filterFormat.i=baidu.string.filterFormat.toInt;(function(){baidu.page.getMousePosition=function(){return{x:baidu.page.getScrollLeft()+A.x,y:baidu.page.getScrollTop()+A.y}};var A={x:0,y:0};baidu.event.on(document,"onmousemove",function(B){B=window.event||B;A.x=B.clientX;A.y=B.clientY})})();(function(){var I,H,D,C,B,K,E,L;baidu.dom.drag=function(N,M){if(!(I=baidu.dom.g(N))){return false}H=baidu.object.extend({autoStop:true,capture:false,interval:20},M);K=parseInt(baidu.dom.getStyle(I,"top"))||0;E=parseInt(baidu.dom.getStyle(I,"left"))||0;setTimeout(function(){var O=baidu.page.getMousePosition();D=O.x;C=O.y;clearTimeout(B);B=setInterval(A,H.interval)},1);H.autoStop&&baidu.event.on(document,"mouseup",J);baidu.event.on(document.body,"selectstart",F);if(H.capture&&I.setCapture){I.setCapture()}else{if(H.capture&&window.captureEvents){window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP)}}L=document.body.style.MozUserSelect;document.body.style.MozUserSelect="none";typeof H.ondragstart=="function"&&H.ondragstart(I,H);return{stop:J,dispose:J,update:G}};function G(M){baidu.extend(H,M)}function J(){clearTimeout(B);if(H.capture&&I.releaseCapture){I.releaseCapture()}else{if(H.capture&&window.releaseEvents){window.releaseEvents(Event.MOUSEMOVE|Event.MOUSEUP)}}document.body.style.MozUserSelect=L;baidu.event.un(document.body,"selectstart",F);baidu.event.un(document,"mouseup",J);typeof H.ondragend=="function"&&H.ondragend(I,H)}function A(Q){var M=H.range,P=baidu.page.getMousePosition(),N=E+P.x-D,O=K+P.y-C;if(typeof M=="object"&&M&&M.length==4){N=Math.max(M[3],N);N=Math.min(M[1]-I.offsetWidth,N);O=Math.max(M[0],O);O=Math.min(M[2]-I.offsetHeight,O)}I.style.top=O+"px";I.style.left=N+"px";typeof H.ondrag=="function"&&H.ondrag(I,H)}function F(M){return baidu.event.preventDefault(M,false)}})();baidu.dom.draggable=function(B,J){J=baidu.object.extend({toggle:function(){return true}},J||{});J.autoStop=true;B=baidu.dom.g(B);J.handler=J.handler||B;var A,H=["ondragstart","ondrag","ondragend"],C=H.length-1,D,I,F={dispose:function(){I&&I.dispose();baidu.event.un(J.handler,"onmousedown",G);baidu.lang.Class.prototype.dispose.call(F)}},E=this;if(A=baidu.dom.ddManager){for(;C>=0;C--){D=H[C];J[D]=(function(K){var L=J[K];return function(){baidu.lang.isFunction(L)&&L.apply(E,arguments);A.dispatchEvent(K,{DOM:B})}})(D)}}if(B&&baidu.dom.getStyle(B,"position")!="static"){function G(){if(typeof J.toggle=="function"&&!J.toggle()){return }I=baidu.dom.drag(B,J);F.stop=I.stop;F.update=I.update}baidu.event.on(J.handler,"onmousedown",G)}return{cancel:function(){F.dispose()}}};(function(){var O=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,I=0,D=Object.prototype.toString,N=false,H=true;[0,0].sort(function(){H=false;return 0});var B=function(V,Q,Y,Z){Y=Y||[];Q=Q||document;var c=Q;if(Q.nodeType!==1&&Q.nodeType!==9){return[]}if(!V||typeof V!=="string"){return Y}var W=[],S,f,j,R,U=true,T=B.isXML(Q),a=V,d,h,g,X;do{O.exec("");S=O.exec(a);if(S){a=S[3];W.push(S[1]);if(S[2]){R=S[3];break}}}while(S);if(W.length>1&&J.exec(V)){if(W.length===2&&E.relative[W[0]]){f=G(W[0]+W[1],Q)}else{f=E.relative[W[0]]?[Q]:B(W.shift(),Q);while(W.length){V=W.shift();if(E.relative[V]){V+=W.shift()}f=G(V,f)}}}else{if(!Z&&W.length>1&&Q.nodeType===9&&!T&&E.match.ID.test(W[0])&&!E.match.ID.test(W[W.length-1])){d=B.find(W.shift(),Q,T);Q=d.expr?B.filter(d.expr,d.set)[0]:d.set[0]}if(Q){d=Z?{expr:W.pop(),set:A(Z)}:B.find(W.pop(),W.length===1&&(W[0]==="~"||W[0]==="+")&&Q.parentNode?Q.parentNode:Q,T);f=d.expr?B.filter(d.expr,d.set):d.set;if(W.length>0){j=A(f)}else{U=false}while(W.length){h=W.pop();g=h;if(!E.relative[h]){h=""}else{g=W.pop()}if(g==null){g=Q}E.relative[h](j,g,T)}}else{j=W=[]}}if(!j){j=f}if(!j){B.error(h||V)}if(D.call(j)==="[object Array]"){if(!U){Y.push.apply(Y,j)}else{if(Q&&Q.nodeType===1){for(X=0;j[X]!=null;X++){if(j[X]&&(j[X]===true||j[X].nodeType===1&&B.contains(Q,j[X]))){Y.push(f[X])}}}else{for(X=0;j[X]!=null;X++){if(j[X]&&j[X].nodeType===1){Y.push(f[X])}}}}}else{A(j,Y)}if(R){B(R,c,Y,Z);B.uniqueSort(Y)}return Y};B.uniqueSort=function(R){if(C){N=H;R.sort(C);if(N){for(var Q=1;Q<R.length;Q++){if(R[Q]===R[Q-1]){R.splice(Q--,1)}}}}return R};B.matches=function(Q,R){return B(Q,null,null,R)};B.find=function(X,Q,Y){var W;if(!X){return[]}for(var T=0,S=E.order.length;T<S;T++){var V=E.order[T],U;if((U=E.leftMatch[V].exec(X))){var R=U[1];U.splice(1,1);if(R.substr(R.length-1)!=="\\"){U[1]=(U[1]||"").replace(/\\/g,"");W=E.find[V](U,Q,Y);if(W!=null){X=X.replace(E.match[V],"");break}}}}if(!W){W=Q.getElementsByTagName("*")}return{set:W,expr:X}};B.filter=function(c,a,g,U){var S=c,j=[],Y=a,W,Q,X=a&&a[0]&&B.isXML(a[0]);while(c&&a.length){for(var Z in E.filter){if((W=E.leftMatch[Z].exec(c))!=null&&W[2]){var R=E.filter[Z],h,f,T=W[1];Q=false;W.splice(1,1);if(T.substr(T.length-1)==="\\"){continue}if(Y===j){j=[]}if(E.preFilter[Z]){W=E.preFilter[Z](W,Y,g,j,U,X);if(!W){Q=h=true}else{if(W===true){continue}}}if(W){for(var V=0;(f=Y[V])!=null;V++){if(f){h=R(f,W,V,Y);var d=U^!!h;if(g&&h!=null){if(d){Q=true}else{Y[V]=false}}else{if(d){j.push(f);Q=true}}}}}if(h!==undefined){if(!g){Y=j}c=c.replace(E.match[Z],"");if(!Q){return[]}break}}}if(c===S){if(Q==null){B.error(c)}else{break}}S=c}return Y};B.error=function(Q){throw"Syntax error, unrecognized expression: "+Q};var E=B.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+\-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(Q){return Q.getAttribute("href")}},relative:{"+":function(W,R){var T=typeof R==="string",V=T&&!/\W/.test(R),X=T&&!V;if(V){R=R.toLowerCase()}for(var S=0,Q=W.length,U;S<Q;S++){if((U=W[S])){while((U=U.previousSibling)&&U.nodeType!==1){}W[S]=X||U&&U.nodeName.toLowerCase()===R?U||false:U===R}}if(X){B.filter(R,W,true)}},">":function(W,R){var U=typeof R==="string",V,S=0,Q=W.length;if(U&&!/\W/.test(R)){R=R.toLowerCase();for(;S<Q;S++){V=W[S];if(V){var T=V.parentNode;W[S]=T.nodeName.toLowerCase()===R?T:false}}}else{for(;S<Q;S++){V=W[S];if(V){W[S]=U?V.parentNode:V.parentNode===R}}if(U){B.filter(R,W,true)}}},"":function(T,R,V){var S=I++,Q=P,U;if(typeof R==="string"&&!/\W/.test(R)){R=R.toLowerCase();U=R;Q=M}Q("parentNode",R,S,T,U,V)},"~":function(T,R,V){var S=I++,Q=P,U;if(typeof R==="string"&&!/\W/.test(R)){R=R.toLowerCase();U=R;Q=M}Q("previousSibling",R,S,T,U,V)}},find:{ID:function(R,S,T){if(typeof S.getElementById!=="undefined"&&!T){var Q=S.getElementById(R[1]);return Q?[Q]:[]}},NAME:function(S,V){if(typeof V.getElementsByName!=="undefined"){var R=[],U=V.getElementsByName(S[1]);for(var T=0,Q=U.length;T<Q;T++){if(U[T].getAttribute("name")===S[1]){R.push(U[T])}}return R.length===0?null:R}},TAG:function(Q,R){return R.getElementsByTagName(Q[1])}},preFilter:{CLASS:function(T,R,S,Q,W,X){T=" "+T[1].replace(/\\/g,"")+" ";if(X){return T}for(var U=0,V;(V=R[U])!=null;U++){if(V){if(W^(V.className&&(" "+V.className+" ").replace(/[\t\n]/g," ").indexOf(T)>=0)){if(!S){Q.push(V)}}else{if(S){R[U]=false}}}}return false},ID:function(Q){return Q[1].replace(/\\/g,"")},TAG:function(R,Q){return R[1].toLowerCase()},CHILD:function(Q){if(Q[1]==="nth"){var R=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(Q[2]==="even"&&"2n"||Q[2]==="odd"&&"2n+1"||!/\D/.test(Q[2])&&"0n+"+Q[2]||Q[2]);Q[2]=(R[1]+(R[2]||1))-0;Q[3]=R[3]-0}Q[0]=I++;return Q},ATTR:function(U,R,S,Q,V,W){var T=U[1].replace(/\\/g,"");if(!W&&E.attrMap[T]){U[1]=E.attrMap[T]}if(U[2]==="~="){U[4]=" "+U[4]+" "}return U},PSEUDO:function(U,R,S,Q,V){if(U[1]==="not"){if((O.exec(U[3])||"").length>1||/^\w/.test(U[3])){U[3]=B(U[3],null,null,R)}else{var T=B.filter(U[3],R,S,true^V);if(!S){Q.push.apply(Q,T)}return false}}else{if(E.match.POS.test(U[0])||E.match.CHILD.test(U[0])){return true}}return U},POS:function(Q){Q.unshift(true);return Q}},filters:{enabled:function(Q){return Q.disabled===false&&Q.type!=="hidden"},disabled:function(Q){return Q.disabled===true},checked:function(Q){return Q.checked===true},selected:function(Q){Q.parentNode.selectedIndex;return Q.selected===true},parent:function(Q){return !!Q.firstChild},empty:function(Q){return !Q.firstChild},has:function(S,R,Q){return !!B(Q[3],S).length},header:function(Q){return(/h\d/i).test(Q.nodeName)},text:function(Q){return"text"===Q.type},radio:function(Q){return"radio"===Q.type},checkbox:function(Q){return"checkbox"===Q.type},file:function(Q){return"file"===Q.type},password:function(Q){return"password"===Q.type},submit:function(Q){return"submit"===Q.type},image:function(Q){return"image"===Q.type},reset:function(Q){return"reset"===Q.type},button:function(Q){return"button"===Q.type||Q.nodeName.toLowerCase()==="button"},input:function(Q){return(/input|select|textarea|button/i).test(Q.nodeName)}},setFilters:{first:function(R,Q){return Q===0},last:function(S,R,Q,T){return R===T.length-1},even:function(R,Q){return Q%2===0},odd:function(R,Q){return Q%2===1},lt:function(S,R,Q){return R<Q[3]-0},gt:function(S,R,Q){return R>Q[3]-0},nth:function(S,R,Q){return Q[3]-0===R},eq:function(S,R,Q){return Q[3]-0===R}},filter:{PSEUDO:function(S,X,W,Y){var Q=X[1],R=E.filters[Q];if(R){return R(S,W,X,Y)}else{if(Q==="contains"){return(S.textContent||S.innerText||B.getText([S])||"").indexOf(X[3])>=0}else{if(Q==="not"){var T=X[3];for(var V=0,U=T.length;V<U;V++){if(T[V]===S){return false}}return true}else{B.error("Syntax error, unrecognized expression: "+Q)}}}},CHILD:function(Q,T){var W=T[1],R=Q;switch(W){case"only":case"first":while((R=R.previousSibling)){if(R.nodeType===1){return false}}if(W==="first"){return true}R=Q;case"last":while((R=R.nextSibling)){if(R.nodeType===1){return false}}return true;case"nth":var S=T[2],Z=T[3];if(S===1&&Z===0){return true}var V=T[0],Y=Q.parentNode;if(Y&&(Y.sizcache!==V||!Q.nodeIndex)){var U=0;for(R=Y.firstChild;R;R=R.nextSibling){if(R.nodeType===1){R.nodeIndex=++U}}Y.sizcache=V}var X=Q.nodeIndex-Z;if(S===0){return X===0}else{return(X%S===0&&X/S>=0)}}},ID:function(R,Q){return R.nodeType===1&&R.getAttribute("id")===Q},TAG:function(R,Q){return(Q==="*"&&R.nodeType===1)||R.nodeName.toLowerCase()===Q},CLASS:function(R,Q){return(" "+(R.className||R.getAttribute("class"))+" ").indexOf(Q)>-1},ATTR:function(V,T){var S=T[1],Q=E.attrHandle[S]?E.attrHandle[S](V):V[S]!=null?V[S]:V.getAttribute(S),W=Q+"",U=T[2],R=T[4];return Q==null?U==="!=":U==="="?W===R:U==="*="?W.indexOf(R)>=0:U==="~="?(" "+W+" ").indexOf(R)>=0:!R?W&&Q!==false:U==="!="?W!==R:U==="^="?W.indexOf(R)===0:U==="$="?W.substr(W.length-R.length)===R:U==="|="?W===R||W.substr(0,R.length+1)===R+"-":false},POS:function(U,R,S,V){var Q=R[2],T=E.setFilters[Q];if(T){return T(U,S,R,V)}}}};var J=E.match.POS,F=function(R,Q){return"\\"+(Q-0+1)};for(var L in E.match){E.match[L]=new RegExp(E.match[L].source+(/(?![^\[]*\])(?![^\(]*\))/.source));E.leftMatch[L]=new RegExp(/(^(?:.|\r|\n)*?)/.source+E.match[L].source.replace(/\\(\d+)/g,F))}var A=function(R,Q){R=Array.prototype.slice.call(R,0);if(Q){Q.push.apply(Q,R);return Q}return R};try{Array.prototype.slice.call(document.documentElement.childNodes,0)[0].nodeType}catch(K){A=function(U,T){var R=T||[],S=0;if(D.call(U)==="[object Array]"){Array.prototype.push.apply(R,U)}else{if(typeof U.length==="number"){for(var Q=U.length;S<Q;S++){R.push(U[S])}}else{for(;U[S];S++){R.push(U[S])}}}return R}}var C;if(document.documentElement.compareDocumentPosition){C=function(R,Q){if(!R.compareDocumentPosition||!Q.compareDocumentPosition){if(R==Q){N=true}return R.compareDocumentPosition?-1:1}var S=R.compareDocumentPosition(Q)&4?-1:R===Q?0:1;if(S===0){N=true}return S}}else{if("sourceIndex" in document.documentElement){C=function(R,Q){if(!R.sourceIndex||!Q.sourceIndex){if(R==Q){N=true}return R.sourceIndex?-1:1}var S=R.sourceIndex-Q.sourceIndex;if(S===0){N=true}return S}}else{if(document.createRange){C=function(T,R){if(!T.ownerDocument||!R.ownerDocument){if(T==R){N=true}return T.ownerDocument?-1:1}var S=T.ownerDocument.createRange(),Q=R.ownerDocument.createRange();S.setStart(T,0);S.setEnd(T,0);Q.setStart(R,0);Q.setEnd(R,0);var U=S.compareBoundaryPoints(Range.START_TO_END,Q);if(U===0){N=true}return U}}}}B.getText=function(Q){var R="",T;for(var S=0;Q[S];S++){T=Q[S];if(T.nodeType===3||T.nodeType===4){R+=T.nodeValue}else{if(T.nodeType!==8){R+=B.getText(T.childNodes)}}}return R};(function(){var R=document.createElement("div"),S="script"+(new Date()).getTime();R.innerHTML="<a name='"+S+"'/>";var Q=document.documentElement;Q.insertBefore(R,Q.firstChild);if(document.getElementById(S)){E.find.ID=function(U,V,W){if(typeof V.getElementById!=="undefined"&&!W){var T=V.getElementById(U[1]);return T?T.id===U[1]||typeof T.getAttributeNode!=="undefined"&&T.getAttributeNode("id").nodeValue===U[1]?[T]:undefined:[]}};E.filter.ID=function(V,T){var U=typeof V.getAttributeNode!=="undefined"&&V.getAttributeNode("id");return V.nodeType===1&&U&&U.nodeValue===T}}Q.removeChild(R);Q=R=null})();(function(){var Q=document.createElement("div");Q.appendChild(document.createComment(""));if(Q.getElementsByTagName("*").length>0){E.find.TAG=function(R,V){var U=V.getElementsByTagName(R[1]);if(R[1]==="*"){var T=[];for(var S=0;U[S];S++){if(U[S].nodeType===1){T.push(U[S])}}U=T}return U}}Q.innerHTML="<a href='#'></a>";if(Q.firstChild&&typeof Q.firstChild.getAttribute!=="undefined"&&Q.firstChild.getAttribute("href")!=="#"){E.attrHandle.href=function(R){return R.getAttribute("href",2)}}Q=null})();if(document.querySelectorAll){(function(){var Q=B,S=document.createElement("div");S.innerHTML="<p class='TEST'></p>";if(S.querySelectorAll&&S.querySelectorAll(".TEST").length===0){return }B=function(W,V,T,U){V=V||document;if(!U&&V.nodeType===9&&!B.isXML(V)){try{return A(V.querySelectorAll(W),T)}catch(X){}}return Q(W,V,T,U)};for(var R in Q){B[R]=Q[R]}S=null})()}(function(){var Q=document.createElement("div");Q.innerHTML="<div class='test e'></div><div class='test'></div>";if(!Q.getElementsByClassName||Q.getElementsByClassName("e").length===0){return }Q.lastChild.className="e";if(Q.getElementsByClassName("e").length===1){return }E.order.splice(1,0,"CLASS");E.find.CLASS=function(R,S,T){if(typeof S.getElementsByClassName!=="undefined"&&!T){return S.getElementsByClassName(R[1])}};Q=null})();function M(R,W,V,Z,X,Y){for(var T=0,S=Z.length;T<S;T++){var Q=Z[T];if(Q){Q=Q[R];var U=false;while(Q){if(Q.sizcache===V){U=Z[Q.sizset];break}if(Q.nodeType===1&&!Y){Q.sizcache=V;Q.sizset=T}if(Q.nodeName.toLowerCase()===W){U=Q;break}Q=Q[R]}Z[T]=U}}}function P(R,W,V,Z,X,Y){for(var T=0,S=Z.length;T<S;T++){var Q=Z[T];if(Q){Q=Q[R];var U=false;while(Q){if(Q.sizcache===V){U=Z[Q.sizset];break}if(Q.nodeType===1){if(!Y){Q.sizcache=V;Q.sizset=T}if(typeof W!=="string"){if(Q===W){U=true;break}}else{if(B.filter(W,[Q]).length>0){U=Q;break}}}Q=Q[R]}Z[T]=U}}}B.contains=document.compareDocumentPosition?function(R,Q){return !!(R.compareDocumentPosition(Q)&16)}:function(R,Q){return R!==Q&&(R.contains?R.contains(Q):true)};B.isXML=function(Q){var R=(Q?Q.ownerDocument||Q:0).documentElement;return R?R.nodeName!=="HTML":false};var G=function(Q,X){var T=[],U="",V,S=X.nodeType?[X]:X;while((V=E.match.PSEUDO.exec(Q))){U+=V[0];Q=Q.replace(E.match.PSEUDO,"")}Q=E.relative[Q]?Q+"*":Q;for(var W=0,R=S.length;W<R;W++){B(Q,S[W],T)}return B.filter(U,T)};baidu.dom.query=B})();baidu.page.createStyleSheet=function(A){var F=A||{},D=F.document||document,C;if(baidu.browser.ie){if(!F.url){F.url=""}return D.createStyleSheet(F.url,F.index)}else{C="<style type='text/css'></style>";F.url&&(C="<link type='text/css' rel='stylesheet' href='"+F.url+"'/>");baidu.dom.insertHTML(D.getElementsByTagName("HEAD")[0],"beforeEnd",C);if(F.url){return null}var B=D.styleSheets[D.styleSheets.length-1],E=B.rules||B.cssRules;return{self:B,rules:B.rules||B.cssRules,addRule:function(G,I,H){if(B.addRule){return B.addRule(G,I,H)}else{if(B.insertRule){isNaN(H)&&(H=E.length);return B.insertRule(G+"{"+I+"}",H)}}},removeRule:function(G){if(B.removeRule){B.removeRule(G)}else{if(B.deleteRule){isNaN(G)&&(G=0);B.deleteRule(G)}}}}}};baidu.dom.create=function(B,A){A=A||{};var C=document.createElement(B);return baidu.dom.setAttrs(C,A)};baidu.dom.empty=function(A){A=baidu.dom.g(A);while(A.firstChild){A.removeChild(A.firstChild)}return A};baidu.dom.getText=function(D){var B="",E,C=0,A;D=baidu._g(D);if(D.nodeType===3||D.nodeType===4){B+=D.nodeValue}else{if(D.nodeType!==8){E=D.childNodes;for(A=E.length;C<A;C++){B+=baidu.dom.getText(E[C])}}}return B};baidu.dom.hasAttr=function(C,B){C=baidu.g(C);var A=C.attributes.getNamedItem(B);return !!(A&&A.specified)};baidu.dom.toggleClass=function(A,B){if(baidu.dom.hasClass(A,B)){baidu.dom.removeClass(A,B)}else{baidu.dom.addClass(A,B)}};baidu.fn=baidu.fn||{};baidu.fn.multize=function(C,A){var B=function(){var J=arguments[0],G=A?B:C,E=[],I=[].slice.call(arguments,0),F=0,D,H;if(J instanceof Array){for(D=J.length;F<D;F++){I[0]=J[F];H=G.apply(this,I);E.push(H)}return E}else{return C.apply(this,arguments)}};return B};baidu.fn.methodize=function(B,A){if(A){return function(){return B.apply(null,[this[A]].concat([].slice.call(arguments)))}}return function(){return B.apply(null,[this].concat([].slice.call(arguments)))}};(function(){var B=baidu.lang.isArray,F=baidu.lang.isElement,C=function(H){var G=this;G._dom=[];if(B(H)){baidu.each(H,function(J,I){G._dom[I]=J})}else{G._dom[0]=H}},E=C.prototype={};E.each=function(G){baidu.object.each(this._dom,function(H){G.call(this,(new C(H)))})};baidu.each(("addClass draggable empty hide show insertAfter insertBefore insertHTML removeClass setAttr setAttrs setStyle setStyles show toggleClass toggle children next first getAncestorByClass getAncestorBy getAncestorByTag getDocument getParent getWindow last next prev contains getAttr getPosition getStyle g q query hasClass intersect remove droppable removeStyle getText hasAttr").split(" "),function(G){E[G]=E[G.replace(/^get[A-Z]/g,D)]=A(baidu.dom[G])});baidu.each(("on un").split(" "),function(G){E[G]=A(baidu.event[G])});baidu.each(("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error").split(" "),function(G){E[G]=function(H){return this.on(G,H)}});baidu.e=baidu.element=function(G){return new C(baidu._g(G))};baidu.element.extend=function(G){baidu.object.each(G,function(I,H){E[H]=A(I)})};function A(G){return function(){var H=baidu.fn.methodize(baidu.fn.multize(G),"_dom").apply(this,arguments);return(F(H)||(B(H)&&F(H[0])))?new C(H):H}}function D(G){return G.charAt(3).toLowerCase()}})();baidu.dom.ddManager=baidu.lang.createSingle({_targetsDroppingOver:{}});baidu.dom.droppable=function(D,B){B=B||{};var C=baidu.dom.ddManager,F=baidu.dom.g(D),E=function(H){var G=C._targetsDroppingOver;if(baidu.dom.intersect(F,H.DOM)){if(!G[F]){(typeof B.ondropover=="function")&&B.ondropover.call(F,H.DOM);C.dispatchEvent("ondropover",{trigger:H.DOM,reciever:F});G[F]=true}}else{if(G[F]){(typeof B.ondropout=="function")&&B.ondropout.call(F,H.DOM);C.dispatchEvent("ondropout",{trigger:H.DOM,reciever:F})}delete G[F]}},A=function(G){if(baidu.dom.intersect(F,G.DOM)){typeof B.ondrop=="function"&&B.ondrop.call(F,G.DOM);C.dispatchEvent("ondrop",{trigger:G.DOM,reciever:F})}delete C._targetsDroppingOver[F]};C.addEventListener("ondrag",E);C.addEventListener("ondragend",A);return{cancel:function(){C.removeEventListener("ondrag",E);C.removeEventListener("ondragend",A)}}};baidu.dom.removeStyle=function(){var B=document.createElement("DIV"),A,C=baidu.dom._g;if(B.style.removeProperty){A=function(E,D){return C(E).style.removeProperty(D)}}else{if(B.style.removeAttribute){A=function(E,D){return C(E).style.removeAttribute(baidu.string.toCamelCase(D))}}}B=null;return A}();baidu.lang.Class.prototype.addEventListeners=function(C,D){if(typeof D=="undefined"){for(var B in C){this.addEventListener(B,C[B])}}else{C=C.split(",");var B=0,A=C.length,E;for(;B<A;B++){this.addEventListener(baidu.trim(C[B]),D)}}};baidu.array.hash=function(E,B){var F={},D=B&&B.length,C=0,A=E.length;for(;C<A;C++){F[E[C]]=(D&&D>C)?B[C]:true}return F};baidu.fn.bind=function(A,C){var B=arguments.length>2?[].slice.call(arguments,2):null;return function(){var E=baidu.lang.isString(A)?C[A]:A,D=(B)?B.concat([].slice.call(arguments,0)):arguments;return E.apply(C||E,D)}};baidu.lang.isBoolean=function(A){return typeof A==="boolean"};baidu.lang.isDate=function(A){return{}.toString.call(A)==="[object Date]"&&A.toString()!=="Invalid Date"&&!isNaN(A)};baidu.event._eventFilter=baidu.event._eventFilter||{};baidu.event._eventFilter.mouseenter=window.attachEvent?null:function(B,C,D){function A(G){var E=G.relatedTarget,F=G.currentTarget;if(E.prefix=="xul"){return }while(E&&E!==F){E=E.parentNode}if(E!==F){return D.call(F,G)}}return{type:"mouseover",listener:A}};baidu.event._eventFilter.mouseleave=window.attachEvent?null:function(A,B,D){function C(G){var E=G.relatedTarget,F=G.currentTarget;if(E.prefix=="xul"){return }while(E&&E!==F){E=E.parentNode}if(E!==F){return D.call(F,G)}}return{type:"mouseout",listener:C}};(function(){var J={keydown:1,keyup:1,keypress:1},A={click:1,dblclick:1,mousedown:1,mousemove:1,mouseup:1,mouseover:1,mouseout:1},G={abort:1,blur:1,change:1,error:1,focus:1,load:1,reset:1,resize:1,scroll:1,select:1,submit:1,unload:1},E={scroll:1,resize:1,reset:1,submit:1,change:1,select:1,error:1,abort:1},I={KeyEvents:["bubbles","cancelable","view","ctrlKey","altKey","shiftKey","metaKey","keyCode","charCode"],MouseEvents:["bubbles","cancelable","view","detail","screenX","screenY","clientX","clientY","ctrlKey","altKey","shiftKey","metaKey","button","relatedTarget"],HTMLEvents:["bubbles","cancelable"],UIEvents:["bubbles","cancelable","view","detail"],Events:["bubbles","cancelable"]};baidu.object.extend(E,J);baidu.object.extend(E,A);function C(P,N){var M=0,L=P.length,O={};for(;M<L;M++){O[P[M]]=N[P[M]];delete N[P[M]]}return O}function D(N,M,L){L=baidu.object.extend({},L);var O=baidu.object.values(C(I[M],L)),P=document.createEvent(M);O.unshift(N);if("KeyEvents"==M){P.initKeyEvent.apply(P,O)}else{if("MouseEvents"==M){P.initMouseEvent.apply(P,O)}else{if("UIEvents"==M){P.initUIEvent.apply(P,O)}else{P.initEvent.apply(P,O)}}}baidu.object.extend(P,L);return P}function B(L){var M;if(document.createEventObject){M=document.createEventObject();baidu.object.extend(M,L)}return M}function F(O,L){L=C(I.KeyEvents,L);var P;if(document.createEvent){try{P=D(O,"KeyEvents",L)}catch(N){try{P=D(O,"Events",L)}catch(M){P=D(O,"UIEvents",L)}}}else{L.keyCode=L.charCode>0?L.charCode:L.keyCode;P=B(L)}return P}function K(M,L){L=C(I.MouseEvents,L);var N;if(document.createEvent){N=D(M,"MouseEvents",L);if(L.relatedTarget&&!N.relatedTarget){if("mouseout"==M.toLowerCase()){N.toElement=L.relatedTarget}else{if("mouseover"==M.toLowerCase()){N.fromElement=L.relatedTarget}}}}else{L.button=L.button==0?1:L.button==1?4:baidu.lang.isNumber(L.button)?L.button:0;N=B(L)}return N}function H(N,L){L.bubbles=E.hasOwnProperty(N);L=C(I.HTMLEvents,L);var P;if(document.createEvent){try{P=D(N,"HTMLEvents",L)}catch(O){try{P=D(N,"UIEvents",L)}catch(M){P=D(N,"Events",L)}}}else{P=B(L)}return P}baidu.event.fire=function(M,N,L){var O;N=N.replace(/^on/i,"");M=baidu.dom._g(M);L=baidu.object.extend({bubbles:true,cancelable:true,view:window,detail:1,screenX:0,screenY:0,clientX:0,clientY:0,ctrlKey:false,altKey:false,shiftKey:false,metaKey:false,keyCode:0,charCode:0,button:0,relatedTarget:null},L);if(J.hasOwnProperty(N)){O=F(N,L)}else{if(A.hasOwnProperty(N)){O=K(N,L)}else{if(G.hasOwnProperty(N)){O=H(N,L)}}}if(O){if(M.dispatchEvent){M.dispatchEvent(O)}else{if(M.fireEvent){M.fireEvent("on"+N,O)}}}}})();baidu.event.once=function(A,B,C){A=baidu.dom._g(A);function D(E){C.call(A,E);baidu.event.un(A,B,D)}baidu.event.on(A,B,D);return A};(function(){var C=/^\#[\da-f]{6}$/i,B=/^rgb\((\d+), (\d+), (\d+)\)$/,A={black:"#000000",silver:"#c0c0c0",gray:"#808080",white:"#ffffff",maroon:"#800000",red:"#ff0000",purple:"#800080",fuchsia:"#ff00ff",green:"#008000",lime:"#00ff00",olive:"#808000",yellow:"#ffff0",navy:"#000080",blue:"#0000ff",teal:"#008080",aqua:"#00ffff"};baidu.string.formatColor=function(E){if(C.test(E)){return E}else{if(B.test(E)){for(var I,H=1,E="#";H<4;H++){I=parseInt(RegExp["\x24"+H]).toString(16);E+=("00"+I).substr(I.length)}return E}else{if(/^\#[\da-f]{3}$/.test(E)){var G=E.charAt(1),F=E.charAt(2),D=E.charAt(3);return"#"+G+G+F+F+D+D}else{if(A[E]){return A[E]}}}}return""}})();

	
	/*
 * Tangram UI
 * Copyright 2009 Baidu Inc. All rights reserved.
 *
 * path: baidu/ui/createUI.js
 * author: berg
 * version: 1.1.0
 * date: 2010/12/02
 */

///import baidu.ui;
///import baidu.ui.Base;
///import baidu.object.extend;

baidu.ui = baidu.ui || {};

/**
 * UI\u57fa\u7c7b\uff0c\u6240\u6709\u7684UI\u90fd\u5e94\u8be5\u4ece\u8fd9\u4e2a\u7c7b\u4e2d\u6d3e\u751f\u51fa\u53bb
 *
 * property:
 * 
 * mainId
 */
baidu.ui.Base = {

    id : "",

    /**
     * \u83b7\u5f97\u5f53\u524d\u63a7\u4ef6\u7684id
     * @param {string} optional key 
     * @return {string} id
     */
    getId : function(key){
        var ui = this, idPrefix;
        //\u901a\u8fc7guid\u533a\u522b\u591a\u5b9e\u4f8b
        idPrefix = "tangram-" + ui.uiType + '--' + (ui.id ? ui.id : ui.guid);
        return key ? idPrefix + "-" + key : idPrefix;
    },

    /**
     * \u83b7\u5f97class\uff0c\u652f\u6301skin
     *
     * @param {string} optional key
     *
     * @return {string} className
     */
    getClass : function(key){
        var me = this,
            className = me.classPrefix,
            skinName = me.skin;
         if (key) {
             className += '-' + key;
             skinName += '-' + key;
         }
         if (me.skin) {
             className += ' ' + skinName;
         }
         return className;
    },

    getMain : function(){
        return baidu.g(this.mainId);
    },

    getBody : function(){
        return baidu.g(this.getId());
    },

    
    /**
     * \u63a7\u4ef6\u7c7b\u578b\uff1a\u5982dialog
     */
    uiType : "",
    
    /**
     * \u653e\u7f6e\u63d2\u4ef6\u65b9\u6cd5
     */
    addons : [],

    /**
     * \u83b7\u53d6\u8c03\u7528\u7684\u5b57\u7b26\u4e32\u7684\u5f15\u7528\u524d\u7f00
     */
    getCallRef : function(){
        return "window['$BAIDU$']._instances['" + this.guid + "']";
    },

    /**
     * \u83b7\u53d6\u8c03\u7528\u7684\u5b57\u7b26\u4e32
     */
    getCallString : function(fn){
        var i = 0,
            arg = Array.prototype.slice.call(arguments, 1),
            len = arg.length;
        for (; i < len; i++) {
            if (typeof arg[i] == 'string') {
                arg[i] = "'" + arg[i] +"'";
            }
        }
        //\u5982\u679c\u88ab\u95ed\u5305\u5305\u8d77\u6765\u4e86\uff0c\u7528baidu.lang.instance\u4f1a\u627e\u5230\u6700\u5916\u9762\u7684baidu\u51fd\u6570\uff0c\u53ef\u80fd\u51fa\u9519
        return this.getCallRef() 
                + '.' + fn + '('
                + arg.join(',') 
                + ');'; 
    },

    /**
     * \u6e32\u67d3\u63a7\u4ef6\u5230\u6307\u5b9a\u7684\u5143\u7d20
     * @param {HTMLElement} main optional   \u8981\u6e32\u67d3\u5230\u7684\u5143\u7d20\uff0c\u53ef\u9009\u3002
     *                                      \u5982\u679c\u4e0d\u4f20\u6b64\u53c2\u6570\uff0c\u5219\u4f1a\u5728body\u4e0b\u521b\u5efa\u4e00\u4e2a\u7edd\u5bf9\u5b9a\u4f4d\u7684div\u505a\u4e3amain
     * @return  {HTMLElement} main \u6e32\u67d3\u5230\u7684\u5143\u7d20
     */
    renderMain : function(main){
        var ui = this,
            i = 0,
            len;
        //\u5982\u679c\u88ab\u6e32\u67d3\u8fc7\u5c31\u4e0d\u91cd\u590d\u6e32\u67d3
        if (ui.getMain()) {
            return ;
        }
        main = baidu.g(main);
        //\u5982\u679c\u6ca1\u6709main\u5143\u7d20\uff0c\u521b\u5efa\u4e00\u4e2a\u5728body\u4e0b\u9762\u7684div\u5f53\u4f5cmain
        if(!main){
            main = document.createElement('div');
            document.body.appendChild(main);
            main.style.position = "absolute";
            //\u7ed9\u8fd9\u4e2a\u5143\u7d20\u521b\u5efa\u4e00\u4e2aclass\uff0c\u65b9\u4fbf\u7528\u6237\u63a7\u5236
            main.className = ui.getClass("main");
        }
        if(!main.id){
            main.id = ui.getId("main");
        }
        ui.mainId = main.id;
        main.setAttribute('data-guid', ui.guid);

        return main;
    },

    /**
     * \u9500\u6bc1\u5f53\u524d\u5b9e\u4f8b
     */
    dispose : function(){
        this.dispatchEvent("dispose");
        baidu.lang.Class.prototype.dispose.call(this);
    }
};

/**
 * \u83b7\u53d6UI\u63a7\u4ef6\u7684\u7236\u63a7\u4ef6
 *
 * @return {UI} \u7236\u63a7\u4ef6
 */
baidu.ui.Base.getParent = function(){
    return this._parent || null;
};


/**
 * \u8bbe\u7f6eUI\u63a7\u4ef6\u7684\u7236\u63a7\u4ef6
 *
 * @param {UI} \u7236\u63a7\u4ef6
 */
baidu.ui.Base.setParent = function(parent){
    var me = this,
        oldParent = me._parent;
    oldParent && oldParent.dispatchEvent("removechild");
    if(parent.dispatchEvent("appendchild", { child : me })){
        me._parent = parent;

        /* 
         * childName\u540d\u5b57\u6ca1\u6709\u786e\u5b9a\uff0c\u6682\u65f6\u5148\u4e0d\u52a0\u8fd9\u6bb5\u4ee3\u7801
         * //\u5982\u679c\u6709childName\uff0cskin\u548cclassPrefix\u4ee5\u7236\u5143\u7d20\u4e3a\u51c6
         *if(me.childName){
         *    if(parent.skin){
         *        me.skin = parent.skin + '-' + me.childName;
         *    }
         *    if(parent.classPrefix){
         *        me.classPrefix = parent.classPrefix + '-' + me.childName;
         *    }
         *}
         */
    }
};


/**
 * \u521b\u5efa\u4e00\u4e2aui\u63a7\u4ef6
 *
 * @param {object} UI\u63a7\u4ef6\u7c7b
 * @param {object} options optional \u63a7\u4ef6\u7684\u521d\u59cb\u5316\u5c5e\u6027
 *
 * autoRender : \u662f\u5426\u81ea\u52a8render\uff0c\u9ed8\u8ba4true
 * element : render\u5230\u7684\u5143\u7d20
 * parent : \u7236\u63a7\u4ef6
 *
 * @return {object} \u521b\u5efa\u597d\u7684\u63a7\u4ef6\u5b9e\u4f8b
 */
baidu.ui.create = function(UI, options){
    /*
     * \u5982\u679c\u52a0\u4e0aautoRender = true\uff0c\u73b0\u5728\u4ee3\u7801\u6539\u52a8\u6bd4\u8f83\u5927\uff0c\u7b49\u5230\u4e00\u4e2a\u5927\u7684\u7248\u672c\u518d\u6539\u52a8\u6bd4\u8f83\u5b89\u5168
     *options = baidu.extend({
     *    autoRender : true
     *}, options);
     */
    var parent = options.parent,
        element = options.element,
        autoRender = options.autoRender;

    options.autoRender = options.parent = options.element = null;

    var ui = new UI(options);

    if(parent && ui.setParent){
        ui.setParent(parent);
    }
    if(autoRender && ui.render){ 
        ui.render(element);
    }
    return ui;
};


/**
 * \u521b\u5efa\u4e00\u4e2aUI\u63a7\u4ef6\u7c7b
 *
 * @param {function} constructor ui\u63a7\u4ef6\u6784\u9020\u5668
 * @param {object} options \u9009\u9879
 *
 * @return {object} ui\u63a7\u4ef6
 */
baidu.ui.createUI = function(constructor, options) {
    options = options || {};
    var superClass = options.superClass || baidu.lang.Class,
        lastStep = superClass == baidu.lang.Class ? 1 : 0,
        i,
        n,
        ui = function(opt){// \u521b\u5efa\u65b0\u7c7b\u7684\u771f\u6784\u9020\u5668\u51fd\u6570
            var me = this;
            opt = opt || {};
            // \u7ee7\u627f\u7236\u7c7b\u7684\u6784\u9020\u5668
            superClass.call(me, !lastStep ? opt : (opt.guid || ""));

            //\u6269\u5c55\u9759\u6001\u914d\u7f6e\u5230this\u4e0a
            baidu.object.extend(me, ui.options);
            //\u6269\u5c55\u5f53\u524doptions\u4e2d\u7684\u9879\u5230this\u4e0a
            baidu.object.extend(me, opt);


            me.classPrefix = me.classPrefix || "tangram-" + me.uiType.toLowerCase();

            //\u521d\u59cb\u5316\u884c\u4e3a
            //\u884c\u4e3a\u5c31\u662f\u5728\u63a7\u4ef6\u5b9e\u4f8b\u4e0a\u9644\u52a0\u4e00\u4e9b\u5c5e\u6027\u548c\u65b9\u6cd5
            for(i in baidu.ui.behavior){
                //\u6dfb\u52a0\u884c\u4e3a\u5230\u63a7\u4ef6\u4e0a
                if(typeof me[i] != 'undefined'){
                    baidu.object.extend(me, baidu.ui.behavior[i]);
                    baidu.ui.behavior[i].call(me);
                }
            }

            //\u6267\u884c\u63a7\u4ef6\u81ea\u5df1\u7684\u6784\u9020\u5668
            constructor.apply(me, arguments);

            //\u6267\u884c\u6240\u6709addons\u4e2d\u7684\u65b9\u6cd5
            for (i=0, n=ui.addons.length; i<n; i++) {
                ui.addons[i](me);
            }
        },
        C = function(){};

    C.prototype = superClass.prototype;

    // \u7ee7\u627f\u7236\u7c7b\u7684\u539f\u578b\uff08prototype)\u94fe
    var fp = ui.prototype = new C();

    //\u7ee7\u627fBase\u4e2d\u7684\u65b9\u6cd5\u5230prototype\u4e2d
    for (i in baidu.ui.Base) {
        fp[i] = baidu.ui.Base[i];
    }

    //\u7ed9\u7c7b\u6269\u5c55\u51fa\u4e00\u4e2a\u9759\u6001\u65b9\u6cd5\uff0c\u4ee5\u4ee3\u66ff baidu.object.extend()
    ui.extend = function(json){
        for (i in json) {
            ui.prototype[i] = json[i];
        }
        //\u5c06create\u65b9\u6cd5\u6269\u5c55\u5230\u9759\u6001\u65b9\u6cd5\u4e2d
        var uiType = json.uiType,
            uiNS = uiType ? baidu.ui[uiType] : "";

        if(uiNS){
            uiNS.create = function(options){
                return baidu.ui.create(uiNS[uiType.charAt(0).toUpperCase() + uiType.slice(1)], options);
            };
        }
        return ui;  // \u8fd9\u4e2a\u9759\u6001\u65b9\u6cd5\u4e5f\u8fd4\u56de\u7c7b\u5bf9\u8c61\u672c\u8eab
    };

    //\u63d2\u4ef6\u652f\u6301
    ui.addons = [];
    ui.register = function(f){
        if (typeof f == "function")
            ui.addons.push(f);
    };
    
    //\u9759\u6001\u914d\u7f6e\u652f\u6301
    ui.options = {};

    return ui;
};

  /**
 * Tangram UI
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: ui/behavior/draggable.js
 * author: berg
 * version: 1.0.0
 * date: 2010/09/16
 */


///import baidu.ui.behavior;

///import baidu.dom.drag;
///import baidu.dom.getStyle;

baidu.ui.behavior = baidu.ui.behavior || {};

/**
 * \u4e3aui\u63a7\u4ef6\u6dfb\u52a0\u62d6\u62fd\u884c\u4e3a
 */
(function(){
    var Draggable = baidu.ui.behavior.draggable = function(){
        this.addEventListener("onload", function(){
            var me = this;
            me.dragUpdate();
        });
        this.addEventListener("ondispose", function(){
            var me  = this;
            baidu.un(me.dragHandler, "mousedown", me._dragFn);
            me.dragHandler = me._lastDragHandler = null;
        });
    };
    /**
     * \u66f4\u65b0\u62d6\u62fd\u884c\u4e3a
     * @param {object} options \u62d6\u62fd\u884c\u4e3a\u7684\u9009\u9879\uff0c\u652f\u6301:
     * dragRange : \u62d6\u62fd\u7684\u8303\u56f4
     * dragHandler : \u62d6\u62fd\u624b\u67c4
     */
    Draggable.dragUpdate = function(options){
        var me = this;
        options = options || {};
        if(!me.draggable){
            return ;
        }
        if(me.dragHandler != me._lastDragHandler && me._dragFn){
            baidu.event.un(me._lastDragHandler, "onmousedown", me._dragFn); //\u628a\u4e0a\u6b21\u7684\u62d6\u62fd\u4e8b\u4ef6\u53d6\u6d88\u6389
        }
        baidu.object.extend(me, options);
        me._dragOption = {
            ondragstart : function(){
                me.dispatchEvent("ondragstart");
            },  
            ondrag : function(){
                me.dispatchEvent("ondrag");
            },
            ondragend : function(){
                me.dispatchEvent("ondragend");
            },
            autoStop : true
        };

        me._dragOption.range = me.dragRange || [];
        me._dragOption.handler = me._lastDragHandler = me.dragHandler || me.getMain();

        if (me.dragHandler) {
            baidu.event.on(me.dragHandler, "onmousedown", me._dragFn = function() {
                baidu.dom.drag(me.dragTarget || me.getMain(), me._dragOption);
            });
        }
    };
})();

	
	/**
 * @author poppy
 */
var ace = baidu;


ace.VERSION = "%#VERSION#%";

	
	ace.aceVersion = "%#VERSION#%";

  
  //UI menu
  /**
 * @author \u53f2\u7eaf\u534e(shichunhua)
 * @fileoverview \u83dc\u5355\u76d2\u5b50 \u8d1f\u8d23\u663e\u793a\u4efb\u4f55\u65b9\u5f0f\u5524\u51fa\u7684\u83dc\u5355
 * 				\u6269\u5c55\u5230ace.ui.Menu
 * 				ace.ui.Menu \u63d0\u4f9b\u63a5\u53e3(\u65b9\u6cd5) \u5177\u4f53\u53c2\u6570\u89c1\u5bf9\u5e94\u65b9\u6cd5\u6ce8\u91ca:
 * 					show: \u5c55\u793a\u83dc\u5355
 * 					hide: \u9690\u85cf\u83dc\u5355
 * 					destroy: \u9500\u6bc1\u83dc\u5355
 * 					onclick: \u901a\u77e5\u5916\u90e8\u83dc\u5355\u88ab\u70b9\u51fb,\u5e76\u4f20\u9012\u51fa\u88ab\u70b9\u51fbitem\u7684json\u6570\u636e
 * @version 1.0.0.0
 */
(function(){
    if (!ace || !ace.ui || ace.ui.Menu) {
        return;
    }
    /**
     * \u83dc\u5355\u6784\u9020\u51fd\u6570
     */
    var Menu = ace.lang.createClass(function(dataProvider){
        if (!dataProvider || !dataProvider.items instanceof Array) {
            alert('\u83dc\u5355\u6570\u636e\u9519\u8bef');
            return;
        }
        this._data = dataProvider;
        this._box = null;
        this._boxClass = 'ace_menu';
        this._itemClass = 'item';
        this._leftArrowClass = 'leftArrow';
        this._rightArrowClass = 'rightArrow';
        this._splitLineClass = 'menuSplit';
        
        this._init();
    }).extend({
        _init: function(){
            this._box = document.createElement('div');
            this._box.className = this._boxClass;
            document.body.appendChild(this._box);
            if (this._data.width) {
                ace.setStyles(this._box, {'width': this._data.width + 'px'});
            }
            ace.hide(this._box);
            
            this._getNodes(this._data.items, this._box);
        },
		/**
		 * \u6839\u636e\u6570\u636e \u6784\u5efaDOM\u7ed3\u6784
		 * @param {Object} items
		 * @param {HTMLElement} node
		 */
        _getNodes: function(items, node){
            if (node.tagName.toUpperCase() != 'UL') {
                var ul = document.createElement('ul');
                node.appendChild(ul);
                node = ul;
            }
            
            for (var i = 0; i < items.length; i++) {
                var curItem = items[i], splitLine = curItem.splitLine;
                if (splitLine != null) {
                    var li = document.createElement('li');
                    li.className = this._splitLineClass;
					li.innerHTML = '<em></em>';
                    node.appendChild(li);
                    continue;
                }
                
                var li = document.createElement('li'), a = this._buildItem(curItem);
                node.appendChild(li);
                li.appendChild(a);
                
                if (curItem.items) {
                    var div = document.createElement('div');
                    ace.hide(div);
                    li.appendChild(div);
                    div.className = this._boxClass;
                    if (curItem.width) {
                        ace.setStyles(div, {'width': curItem.width + 'px'});
                    }
                    this._addMoreEvent(a, div, curItem.disabled == '1');
                    this._getNodes(curItem.items, div);
                } else {
					this._addSingleEvent(a, node, curItem);
                }
            }
        },
		/**
		 * \u521b\u5efaA\u6807\u7b7e
		 * @param {Object} item
		 * @returns {HTMLElement} a
		 */
        _buildItem: function(item){
            var self = this,
			ie6 = ace.browser.ie == 6,
			handler = item.handler, 
			subItems = item.items, 
			text = this._format(item.text || ''), 
			attrs = item.attrs, href = item.href || '###',
			disabled = item.disabled == '1',
			disStyle = disabled ? 'disabled' : '',
			fixStyle = ie6 ? 'fixed' : '',
			shadowStyle = ie6 ? 'shadowFixed' : 'shadow',
			iconStyle = item.icon != null ? 'style="background-image:url('+item.icon+')"' : '',
			rightArrow = item.items ? 'rightArrow' : '';
            
            var a = document.createElement('a'),
			str = [];
			
			str[str.length] = '<span class="icon '+disStyle+'" '+iconStyle+'></span>';
			str[str.length] = '<span class="showText '+disStyle+' '+fixStyle+'">'+text+'</span>';
			if (disStyle) {
				/* \u8003\u8651\u5230ie\u4e0bfilter\u6027\u80fd\u95ee\u9898,\u6545\u4f7f\u7528\u53ccDOM\u53e0\u5b57\u6548\u679c */
				str[str.length] = '<span class="showText '+shadowStyle+'">'+text+'</span>';
			}
			str[str.length] = '<b class="'+rightArrow+'"></b>';
			
            a.innerHTML = str.join('');
			str = null;
            //a.title = text;
            a.href = href;
			a.hideFocus = true;
            a.className = this._itemClass;
			
			if(disStyle){
				ace.addClass(a, 'disabled');
			}
            
            return a;
        },
		/**
		 * \u6dfb\u52a0\u6709\u5b50\u9879\u83dc\u5355\u4e8b\u4ef6
		 * @param {HTMLElement} a
		 * @param {HTMLElement} d
		 * @param {Boolean} disabled
		 */
        _addMoreEvent: function(a, div, disabled){
            var oThis = this;
            a.onmouseover = function(){
				if(disabled){return false;}
                oThis._hide(this.parentNode.parentNode, true);
				var dNode = this.parentNode.getElementsByTagName('div')[0];
                ace.show(dNode);
                ace.addClass(this, 'mover');
                this.setAttribute('_isshow', '1');
				ace.setStyles(this.parentNode, {'z-index': '2'});
				oThis._checkChildPosition(dNode);
				ace.setStyles(dNode, {'visibility': 'visible'});
            }
            a.onmouseout = function(){
				if(disabled){ return false;}
                this.setAttribute('_isshow', '0');
				
                var self = this, 
				dNode = this.parentNode.getElementsByTagName('div')[0];
                window.setTimeout(function(){
                    if (self.getAttribute('_isshow') == '0') {
                        ace.removeClass(self, 'mover');
                        oThis._hide(dNode);						
						ace.setStyles(self.parentNode, {'z-index': '1'});
						ace.setStyles(dNode, {'visibility': 'hidden'});
                    }
                }, 20);
            }
            a.onclick = function(e){
				e = e || window.event;
				ace.event.stop(e);
                return false;
            }
            div.onmouseover = function(){
                var aTag = this.parentNode.getElementsByTagName('a')[0];
                aTag.setAttribute('_isshow', '1');
            }
        },
		/**
		 * \u6dfb\u52a0\u65e0\u5b50\u9879\u7684\u5355\u4e2a\u83dc\u5355\u4e8b\u4ef6
		 * @param {HTMLElement} a
		 * @param {HTMLElement} node
		 * @param {Object} item
		 */
		_addSingleEvent: function(a, node, item){
			var self = this, handler = item.handler;
			if(item.disabled == '1'){
				a.onclick = function(e){					
					e = e || window.event;
					ace.event.stop(e);
	                return false;
				}
			} else {
                a.onclick = function(e){
					self._hide();
					self._tellOut({source:item});
					handler && handler();
					ace.event.stop(e || window.event);
	                return false;
				}
            }
			
            a.onmouseover = function(){
                self._hide(node, true);
            }
		},
		/**
		 * \u683c\u5f0f\u5316\u5b57\u7b26
		 * @param {String} str
		 */
        _format: function(str){
            return str.replace(/\&/g, '&#38;').replace(/\>/g, '&#62;').replace(/\</g, '&#60;').replace(/\"/g, '&#34;').replace(/\'/g, '&#39;');
        },
		/**
		 * \u663e\u793a\u4e3b\u83dc\u5355
		 * @param {Object} event
		 */
        _show: function(event){
            ace.show(this._box);
            
            var left = event.clientX, 
			top = event.clientY, 
			width = Math.max(this._box.clientWidth, this._box.offsetWidth), 
			height = Math.max(this._box.clientHeight, this._box.offsetHeight), 
			bodyWidth = ace.page.getViewWidth(), 
			bodyHeight = ace.page.getViewHeight(), 
			scrollLeft = ace.page.getScrollLeft(), 
			scrollTop = ace.page.getScrollTop(), 
			x = left + scrollLeft, 
			y = top + scrollTop;
            
            if (x + width > bodyWidth + scrollLeft) { x = x - width; }			
            if (y + height > bodyHeight + scrollTop ) { y = y - height; }
            
            ace.setStyles(this._box, {'left': x + 'px','top': y + 'px'});
        },
		/**
		 * \u9690\u85cf\u83dc\u5355(\u4e5f\u53ef\u9690\u85cf\u76f8\u5e94\u5b50\u9879\u83dc\u5355)
		 * @param {HTMLElement} elm
		 * @param {Boolean} except
		 */
        _hide: function(elm, except){
            elm = elm || this._box;
            if (!except) { ace.hide(elm); }
            
            var cNodes = elm.getElementsByTagName('div');
            for (var i = 0; i < cNodes.length; i++) {
				var curDiv = cNodes[i];
                ace.hide(curDiv);
                var aTag = curDiv.parentNode.getElementsByTagName('a')[0];
                aTag.setAttribute('_isshow', '0');
                ace.removeClass(aTag, 'mover');
				ace.setStyles(aTag.parentNode, {'z-index': '1'});
				ace.setStyles(curDiv, {'visibility': 'hidden'});
            }
        },
		/**
		 * \u9a8c\u8bc1\u5b50\u83dc\u5355\u663e\u793a\u4f4d\u7f6e
		 * @param {HTMLElement} node
		 */
		_checkChildPosition: function(node){
			ace.setStyles(node, {'left': '100%','right': 'auto'});
            ace.setStyles(node, {'top': '0'});
			var pos = ace.dom.getPosition(node),
			left = pos.left, 
			top = pos.top, 
			width = Math.max(node.clientWidth, node.offsetWidth), 
			height = Math.max(node.clientHeight, node.offsetHeight), 
			bodyWidth = ace.page.getViewWidth(), 
			bodyHeight = ace.page.getViewHeight(), 
			scrollLeft = ace.page.getScrollLeft(), 
			scrollTop = ace.page.getScrollTop();
            
            if (left + width > bodyWidth + scrollLeft) {
                ace.setStyles(node, {'left': 'auto','right': '100%'});
            }
            if (top + height > bodyHeight + scrollTop ) {
                ace.setStyles(node, {'top': - height + 24 + 'px'});
            }
		},
		/**
		 * \u9500\u6bc1\u83dc\u5355
		 */
		_destroy: function(){
			try{
				ace.dom.remove(this._box);
				for(var item in this){ this[item] = null; }
			}catch(ex){}
		},
		_tellOut: function(data){
			this.onclick(data);
		},
		/**
		 * \u5bf9\u5916\u63a5\u53e3 \u663e\u793a\u4e3b\u83dc\u5355
		 * @param {Object} event
		 */
        show: function(event){
            this._hide();
            this._show(event);
        },
		/**
		 * \u5bf9\u5916\u63a5\u53e3  \u9690\u85cf\u4e3b\u83dc\u5355
		 */
        hide: function(){
            this._hide();
        },
		
		/**
		 * \u5bf9\u5916\u63a5\u53e3 \u6269\u5c55\u70b9\u51fb\u4e8b\u4ef6
		 * @param {Object} data
		 */
		onclick: function(data){
			
		},
		
		/**
		 * \u5bf9\u5916\u63a5\u53e3 \u9500\u6bc1\u83dc\u5355
		 */
		destroy: function(){
			this._destroy();
		}
    })
    // \u6269\u5c55\u81f3ace.ui.Menu
    ace.ui.Menu = Menu;
})();


  //UI tree
  /*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: ui/tree.js
 * author: fx
 * version: 1.0.0
 * date: 2010/09/02
 */

///import baidu.ui;

/**
 * \u5b9a\u4e49\u540d\u5b57\u7a7a\u95f4
 */
/* Copyright (c) 2010 Baidu */
/*
* Tangram UI
* Copyright 2009 Baidu Inc. All rights reserved.
* 
* path: baidu/ui/UIBase.js
* author: berg
* version: 1.0.0
* date: 2010-05-20
*/
/*
* Tangram
* Copyright 2009 Baidu Inc. All rights reserved.
* 
* path: baidu.js
* author: allstar, erik
* version: 1.1.0
* date: 2009/12/2
*/


baidu.ui.tree = baidu.ui.tree || {};

  /*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: ui/tree/create.js
 * author: fx
 * version: 1.0.0
 * date: 2010-06-24
 */


///import baidu.ui.tree;
///import baidu.ui.tree.TreeNode;

///import baidu.dom.g;
///import baidu.array.each;
///import baidu.event.on;
/**
 * \u521b\u5efa\u4e00\u4e2a\u57fa\u672ctree
 * @param {HTMLElement} element
 * @param {Object} options
 * @return {baidu.ui.tree.Tree
 */
baidu.ui.tree.create = function(options){
    var tree = new baidu.ui.tree.Tree(options);
    return tree;
};
/**
 * \u521b\u5efa\u4e00\u4e2a\u57fa\u672ctreeNode
 * @param {HTMLElement} element
 * @param {Object} options
 * @return {baidu.ui.tree.TreeNode
 */
baidu.ui.tree.createTreeNode = function( options){
    var treeNode = new baidu.ui.tree.TreeNode(options);
    return treeNode;
};

  /**
 * Tangram
 * Copyright 2010 Baidu Inc. All rights reserved.
 * path: ui/tree/TreeNode.js
 * author: fx
 * version: 1.0.0
 * date: 2010-10-27
 */

///import baidu.ui.createUI;
///import baidu.ui.create;
///import baidu.string.format;
/**
*options\u8bf4\u660e
*    _hoverNode : hover\u65f6\u5019\u8fd4\u56de\u7684\u8282\u70b9,\u9ed8\u8ba4\u503c\u4e3anull
*    _rootNode : \u6839\u8282\u70b9,\u9ed8\u8ba4\u503c\u4e3anull,
*    parentNode : \u7236\u8282\u70b9,\u9ed8\u8ba4\u503c\u4e3anull,
*    hasCheckbox  : \u662f\u5426\u6709\u590d\u9009\u6846,\u9ed8\u8ba4\u503c\u4e3afalse
*    _currentNode : \u5f53\u524d\u8282\u70b9\uff0c\u9ed8\u8ba4\u503c\u4e3anull
*    isChangeTrunk : \u662f\u5426\u6539\u53d8trunk\u7684\u72b6\u6001\u5230leaf
*/

baidu.ui.tree.Tree = baidu.ui.createUI(function(options){
        //\u6811\u7684\u6240\u6709\u8282\u70b9\u7684\u96c6\u5408 \u6811\u7684ID\u4e0e\u5b9e\u4f8b\u7684\u952e\u503c\u5bf9
        this._treeNodes = {};
    }).extend({
    
    uiType : "tree",
    tplDom : "<div class='#{class}'>#{body}</div>",
    /**
    *\u53d6\u5f97html string
    *@return tree\u7684htmlstring,
    */
    getString : function() {
        var me = this;
        return  baidu.format(me.tplDom,{
            "class" : me.getClass(),
            body : me._getBodyString()
        });
    },
    /**
    *\u6e32\u67d3\u6811
    */
    render : function(main){
        var me = this;
        baidu.dom.insertHTML(me.renderMain(main), "beforeEnd",me.getString());
        me.dispatchEvent("onload");
    },
    /**
    *\u5185\u90e8\u65b9\u6cd5,\u53d6\u5f97\u6811\u7684HTML\u7684\u5185\u5bb9
    */
    _getBodyString : function() {
        var str = "",
            me = this;
        if(me.json){
            me._rootNode = baidu.ui.tree.createTreeNode(me.json);
            me._rootNode.isRoot = true;
            me._rootNode.hasChild = true;
            me._rootNode.type = "root";
            me._rootNode._level = 0;
            me.getTreeNodes()[me._rootNode.id] = me._rootNode;
            me._rootNode.setTree(me);
            //\u521d\u59cb\u5316\u6811\u5f62\u7ed3\u6784
            str = me._rootNode.getString();
        }
        return str;
    },
    
    getTreeNodes : function(){
        return this._treeNodes;
    },
    /**
    *\u53d6\u5f97\u6811\u7684\u6700\u6839\u8282\u70b9
    *@return {TreeNode} treeNode
    */
    getRootNode : function(){
        return this._rootNode;
    },
    /**
    *\u901a\u8fc7id\u5c5e\u6027\u6765\u53d6\u5f97treeNode
    *@param {String} id
    *@return {TreeNode} treeNode
    */
    getTreeNodeById : function(id){
        return this.getTreeNodes()[id];
    },
    /**
    *\u53d6\u5f97\u6811\u7684\u5f53\u524d\u8282\u70b9
    *@return {TreeNode} treeNode
    */
    getCurrentNode: function(){
        return this._currentNode;
    },
    /**
    *\u8bbe\u7f6e\u8282\u70b9\u4e3a\u6811\u7684\u5f53\u524d\u8282\u70b9
    *@return {TreeNode} treeNode
    */
    setCurrentNode: function(treeNode){
        this._currentNode = treeNode;
    }

});

  /**
 * Tangram
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * path: ui/tree/TreeNode.js
 * author: fx
 * version: 1.0.0
 * date: 2010-10-27
 */

///import baidu.ui.createUI;
///import baidu.ui.create;
///import baidu.array.each;
///import baidu.array.remove;
///import baidu.string.format;
///import baidu.dom.remove;
///import baidu.dom.g;
///import baidu.dom.children;
///import baidu.dom.addClass;
///import baidu.dom.removeClass;
///import baidu.dom.insertHTML;
///import baidu.object.extend;
///import baidu.event.stopPropagation;
///import baidu.string.encodeHTML;
///import baidu.object.extend;
///import baidu.dom.insertBefore;
///import baidu.dom.insertAfter;

//TreeNode\u7c7b
/**
*options\u8bf4\u660e
*    isExpand : \u662f\u5426\u662f\u5c55\u5f00, \u9ed8\u8ba4\u503c\u4e3afalse
*    isOpen : trunk\u662f\u5426open,\u9ed8\u8ba4\u503c\u4e3afalse,
*    isRoot : \u662f\u5426\u662f\u6839\u8282\u70b9,\u9ed8\u8ba4\u503c\u4e3afalse,
*    parentNode : \u7236\u8282\u70b9,\u9ed8\u8ba4\u503c\u4e3anull,
*    _isLast :\u662f\u5426\u662f\u6700\u540e\u4e00\u4e2a\u5b50\u8282\u70b9\uff08\u76f8\u5bf9\u4e8e\u672c\u8282\u70b9\u7684\u7236\u8282\u70b9\u6765\u8bf4\uff09\u9ed8\u8ba4\u503c\u4e3afalse,
*    hasChild : \u662f\u5426\u6709\u5b50\u8282\u70b9\uff0c\u9ed8\u8ba4\u503c\u4e3afalse,
*    _level : \u8282\u70b9\u7684\u7ea7\u522b\uff0c\u9ed8\u8ba4\u4e3anull
*/
baidu.ui.tree.TreeNode = baidu.ui.createUI(function (options){
        var me = this;
        me.id = me.id || me.getId();
        me.childNodes=[];
        me.json = options;
    }).extend({
    //className
    //ui\u63a7\u4ef6\u7684\u7c7b\u578b **\u5fc5\u987b**
    uiType          : "tree-node",
    //\u8282\u70b9\u7684\u6587\u672c\u5c5e\u6027
    text            : "" ,
    //\u8282\u70b9\u6240\u5bf9\u5e94\u7684\u7236\u63a7\u4ef6\u6811
    _tree           : {},
    //\u8282\u70b9\u7c7b\u578b\uff1aroot trunk leaf
    type            : "leaf",
    //\u662f\u5426\u652f\u6301toggle
    isToggle        : true,
    /*\u6a21\u677f\u7ed3\u6784
        [tplDom]\u6811\u8282\u70b9\u4e3b\u4f53
            [dl][dt]
                #{span}#{checkbox}#{icon}#{text}
            [subNodes]
    */
    tplDom          : '<dl id=#{id}>#{dt}<dd id="#{subnodeid}"  #{style}>#{subNodes}</dd></dl>',
    tplBody          : '<dt  id="#{id}"  oncontextmenu="#{oncontextmenu}"  onmousedown="#{onmousedown}" onclick="#{onclick}" onmouseover="#{onmouseover}" onmouseout="#{onmouseout}" ondblclick="#{ondblclick}" style="#{style};" class="#{nodelevel} #{nodeType} #{class}" >#{span}#{icon}#{text}<b class="#{bclass}"></b></dt>',
    tplSpan         : '<span  id="#{id}" >#{images}</span>',
    tplImage        : '<span  border="0"  align="absmiddle" class="#{class} #{nodelevel} #{other}" ></span>',
    tplImageToggle   : '<span align="absmiddle" onclick="#{onclick}" border="0"  class="#{class} #{nodelevel}" id="#{id}" src="#{src}"></span>',
    tplIcon         : '<span   align="absmiddle"  class="#{class} #{nodelevel}" style="#{style}" id="#{id}" ></span>',
    tplText         : '<div class="#{class}" title="#{title}" id="#{id}" ><span id="#{textid}">#{href}</span></div>',
    tplHref         : '<a  id="#{id}" hidefocus="on"  href="#{href}" #{target}>#{text}</a>',
    /**
    * \u83b7\u5f97TreeNode dom\u7684html string
    * @return {String} htmlstring
    */
    getString : function() {
        var me = this;
        return baidu.format(me.tplDom,{
            id : me.getId(),
            subnodeid : me.getId("subnodes"),
            style : me.isExpand ? "style='display:block'": "style='display:none'",
            dt : me._getBodyString(),
            subNodes : me._getSubNodeString()
        });
    },
    /**
    *\u53d6\u5f97\u8282\u70b9\u7684\u7236\u8282\u70b9
    *@return {TreeNode} treeNode
    */
    getParentNode : function() {
        return this.parentNode;
    },
    /**
    *\u53d6\u5f97\u8282\u70b9\u7684\u5b50\u8282\u70b9\u6570\u7ec4
    *@return {Array} treeNodes
    */
    getChildNodes : function() {
        return this.childNodes;
    },
    /**
    *\u8bbe\u7f6e\u8282\u70b9\u7684\u5bf9\u5e94\u7684Tree
    *@param {Tree} tree
    */
    setTree : function(tree) {
        this._tree = tree;
    },
    /**
    *\u53d6\u5f97\u8282\u70b9\u7684\u5bf9\u5e94\u7684Tree
    *@return {Tree} tree
    */
    getTree : function() {
        return this._tree;
    },
    /**
    *\u589e\u52a0\u6570\u636e\u3002\u6570\u636e\u683c\u5f0f:[{text:"",href:"",children:[{text:"",href:""}
    *,{text:"",href:""}]},{text:""},{text:""}]
    *\u53ef\u4ee5\u6570\u7ec4\u91cc\u9762\u5d4c\u5957\u6570\u7ec4
    *@param {Array} array
    */
    appendData : function(array){
        var me = this,
            cls = me.getChildNodes();
        baidu.dom.insertHTML(me.getSubNodesContainer(),"beforeEnd",me._getSubNodeString(array));
        me._update();
    },
    /**
    *\u9012\u5f52\u53d6\u5f97\u6240\u6709\u5b50\u8282\u70b9\u8fd4\u56de\u7684HTMLString
    *@param {Array }array
    */
    _getSubNodeString : function(array){
        var me = this,
            tree = me.getTree(),
            ary = [];
        if(array)
            me.children = array;
        function _getString(node){
            if(node.children){
                for(var j = 0 ; j < node.children.length ; j ++){
                    var treeNode = baidu.ui.tree.createTreeNode(node.children[j]);
                    node._appendChild(treeNode,null,true);
                    if(node.children[j].children){
                        treeNode.type = "trunk";
                        treeNode.hasChild = true;                        
                    }
                    ary.push(treeNode.getString());
                }
            }
        }
        _getString(me);
        return ary.join("");
    },
    /**
    *\u9012\u5f52\u5224\u65ad\u6b64\u8282\u70b9\u662f\u5426\u662f\u7236\u8282\u70b9
    *@param {TreeNode} treeNode \u8282\u70b9
    */
    isParent : function(treeNode){
        var me = this,
            par = treeNode.getParentNode();
        while(par){
            if(par == me)
                return true;
            par = par.getParentNode();
        }
        return false;
    },
    /**
    *\u5c06\u8282\u70b9\u62d6\u653e\u5230\u53e6\u4e00\u4e2a\u8282\u70b9\u4e2d\u3002
    *\u5148appendChild
    *\u518dremoveChild
    *@param : parentNode
    */
    appendTo : function(parentNode) {
        var me = this;
        parentNode.appendChild(me);
        me.dispatchEvent("appendto");
    },
    
    /**
    *\u5c06\u6b64\u8282\u70b9\u79fb\u52a8\u81f3\u4e00\u4e2a\u76ee\u6807\u8282\u70b9
    *@Param {TreeNode} \u79fb\u52a8\u81f3\u76ee\u6807\u8282\u70b9
    */
    moveTo : function(treeNode){
        var me = this,
            oldPar = me.getParentNode(),
            newPar = treeNode.getParentNode() ||treeNode,
            newNodes = newPar.getChildNodes(),
            par,index ;
        //\u5982\u679ctreeNode\u662f\u5c55\u5f00\u7684trunk\u8282\u70b9
        if( treeNode.isExpand && treeNode.childNodes.length > 0){
            par = treeNode;
            index = -1;
            par._removeChild(me,true);
        }
        else{
            if(oldPar == newPar){
                par = oldPar;
                par._removeChild(me,true);
                index  = treeNode.getIndex();
            }
            else{
                par = newPar;
                index  = treeNode.getIndex();
                par._removeChild(me,true);
            }

        }
        par.appendChild(me,index+1,true);
    },
    /**
    *\u65b0\u589e\u4e00\u4e2a\u5b50\u8282\u70b9 \u53ea\u662f\u5355\u4e00\u7684\u7ba1\u7406\u6570\u636e\u7ed3\u6784\uff0c\u6ca1\u6709\u6e32\u67d3\u5143\u7d20\u7684\u804c\u8d23\u3002
    *@param {TreeNode} treeNode \u9700\u8981\u52a0\u5165\u7684\u8282\u70b9
    *@param {TreeNode} index \u7d22\u5f15\uff0c\u7528\u6765\u5b9a\u4f4d\u5c06\u8282\u70b9\u52a0\u5230\u7d22\u5f15\u5bf9\u5e94\u7684\u8282\u70b9\u4e0b
    *@param {Boolean} hasChildren
    */
    _appendChild : function(treeNode,index,hasChildren){
        var me = this,
            oldNode,
            temp,
            nodes = me.getChildNodes(),
            part1,
            part2;
        treeNode.parentNode = me;
        treeNode._level = me._level + 1;
        treeNode.setTree(me.getTree());
        me.getTree().getTreeNodes()[treeNode.id] = treeNode;
        if(!hasChildren){
            me.children  = me.children || [];
            me.children.push(treeNode.json);
        }
        if(index!=null){
            function insertAt(ary,obj,index){
                var part1,part2;
                part1 = nodes.slice(0,index);
                part2 = nodes.slice(index);
                part1.push(obj);
                return part1.concat(part2);
            }
            me.childNodes = insertAt(nodes,treeNode,index);
            me.children = insertAt(me.children,treeNode.json,index);
        }
        else{
            nodes.push(treeNode);
        }
    },
    
    
   
    
    /**
    *\u65b0\u589e\u4e00\u4e2a\u5b50\u8282\u70b9
    *1.\u5148\u5224\u65ad\u5b50\u8282\u70b9\u662f\u5426\u88ab\u6e32\u67d3\u8fc7\uff0c\u5982\u679c\u6e32\u67d3\u8fc7\uff0c\u5c31\u5c06\u5b50\u8282\u70b9append\u5230\u81ea\u5df1subNodes\u5bb9\u5668\u91cc
    *   \u5426\u5219\u5c31inertHTML\u7684\u5b50\u8282\u70b9\u7684getString
    *2.\u5bf9parentNode\u4e0echildNodes\u8fdb\u884c\u53d8\u66f4\u3002
    *3.\u66f4\u65b0treeNode\u4e0etree\u7684update
    *@param {TreeNode} \u9700\u8981\u52a0\u5165\u7684\u8282\u70b9(\u5206\u4e3a\u5df2\u7ecf\u6e32\u67d3\u7684\u8282\u70b9\u548c\u4e3a\u88ab\u6e32\u67d3\u7684\u8282\u70b9)
    *                  \u901a\u8fc7treeNode._getContainer()\u8fd4\u56de\u503c\u6765\u5224\u65ad\u662f\u5426\u88ab\u6e32\u67d3
    *@param {index}
    *treeNode
    */
    appendChild : function(treeNode,index){
        var me = this,
            node,
            firstChild = me.getFirstChild(),
            oldPar = treeNode.getParentNode(),
            subNodeContainer = me.getSubNodesContainer();
        node = me.childNodes[index-1];
        //\u5982\u679c\u662f\u5df2\u7ecf\u88ab\u6e32\u67d3\u8fc7\u7684\u8282\u70b9
        if(treeNode._getContainer()){
            if(index == null){
                subNodeContainer.appendChild(treeNode._getContainer());
            }
            else{
                if(index == 0){
                    baidu.dom.insertBefore(treeNode._getContainer(),me.getFirstChild()._getContainer());
                }
                else{
                    baidu.dom.insertAfter(treeNode._getContainer(),node._getContainer());
                }
            }
            me._appendChild(treeNode,index);
        }
        //\u5982\u679c\u662f\u6ca1\u88ab\u6e32\u67d3\u7684\u8282\u70b9
        else{
            me._appendChild(treeNode,index);
            if(index == null){
                baidu.dom.insertHTML(subNodeContainer,"beforeEnd",treeNode.getString());
            }
            else{
                if(index == 0){
                    baidu.dom.insertHTML(firstChild._getContainer(),"beforeBegin",treeNode.getString());
                }
                else{
                    baidu.dom.insertHTML(node._getContainer(),"afterEnd",treeNode.getString());
                }
            }
        }
        treeNode._update();
        if(treeNode.getPrevious()){
            treeNode.getPrevious()._update();
        }
        treeNode._updateOldParent(oldPar);
        if(me.type == "leaf"){
            me.type = "trunk";
            me._getIconElement().className = me.getClass("trunk");
        }
        me._getSpanElement().innerHTML = me._getImagesString();
    },
    /**
    *\u4fee\u6539\u8282\u70b9\u539f\u6765\u7236\u8282\u70b9\u7684\u72b6\u6001
    */
    _updateOldParent : function(oldParentNode){
        var me = this,
            oldPar = oldParentNode;
        if(oldPar){
            oldPar._removeChild(me,true);
            if(oldPar.getLastChild()){
                oldPar.getLastChild()._update();
            }
            else{
                if(me.getTree().isChangeTrunk){
                    oldPar._getIconElement().className = me.getClass("leaf");
                    oldPar.type = "leaf";
                }
                oldPar._update(); 
            }
        }
    
    },
    /**
    *\u5185\u90e8\u65b9\u6cd5
    *\u53ea\u5220\u9664\u6b64\u8282\u70b9\u7684\u6570\u636e\u7ed3\u6784\u5173\u7cfb\uff0c\u800c\u4e0d\u5220\u9664dom\u5143\u7d20\u5bf9\u8c61\u3002\u8fd9\u4e2a\u65b9\u6cd5\u88ab\u7528\u4e8eappendTo
    *@param {TreeNode} treeNode
    *@param {Boolean} flag  \u5982\u679cflag\u4e3atrue,\u90a3\u4e48\u5c31\u4e0d\u9012\u5f52\u5220\u9664\u5b50\u8282\u70b9\uff0c\u5426\u5219\u4f1a\u9012\u5f52\u5220\u9664\u5b50\u8282\u70b9\u3002
    */
    _removeChild : function(treeNode,flag){
        var me = this;
        baidu.array.remove(me.children,treeNode.json);
        baidu.array.remove(me.childNodes,treeNode);
        delete me.getTree().getTreeNodes()[treeNode.id];
        if(!flag){
            while(treeNode.childNodes[0])
                treeNode._removeChild(treeNode.childNodes[0]);
        }
    },
    /**
    *\u6279\u91cf\u5220\u9664\u4e00\u4e2a\u8282\u70b9\u4e0b\u7684\u6240\u6709\u5b50\u8282\u70b9
    *@param {TreeNode} treeNode flag  \u5982\u679cflag\u4e3atrue,\u90a3\u4e48\u5c31\u4e0d\u9012\u5f52\u5220\u9664\u5b50\u8282\u70b9\uff0c\u5426\u5219\u4f1a\u9012\u5f52\u5220\u9664\u5b50\u8282\u70b9\u3002
    */
    removeChildren : function(flag){
        var me = this,
            childNodes = me.getChildNodes();
        while(childNodes[0])
            me.removeChild(childNodes[0],flag);
    },
    /**
    *\u5220\u9664\u4e00\u4e2a\u5b50\u8282\u70b9
    *1.\u5220\u9664\u6b64\u8282\u70b9\u5bf9\u8c61\u7684\u6570\u636e\u7ed3\u6784
    *2.\u5220\u9664\u6b64\u8282\u70b9\u6240\u5bf9\u5e94\u7684dom\u5143\u7d20\u5bf9\u8c61
    *@param {TreeNode} treeNode
    */
    removeChild : function(treeNode){
        if(treeNode.getParentNode() == null)
            return false;
        var me = this,
            cls = me.getChildNodes();
            prevNode = treeNode.getPrevious();
        me._removeChild(treeNode);
        delete me.getTree().getTreeNodes()[treeNode.id];
        prevNode._update();
        baidu.dom.remove(treeNode._getContainer());
        me.getTree().setCurrentNode(null);
        if(cls.length <= 0 && !me.isRoot){
            me.getSubNodesContainer().style.display = "none";
            if(me.getTree().isChangeTrunk){
                me._getIconElement().className = me.getClass("leaf");
                me.type = "leaf";
            }
            me._update();
        }
    },
    /**
    *\u66f4\u65b0\u8282\u70b9\u7684\u7f29\u8fdb\uff0c\u4ee5\u53ca\u56fe\u6807\u72b6\u6001
    */
    _update : function(){
        var me = this;
        me._getSpanElement().innerHTML = me._getImagesString();
        baidu.array.each(me.childNodes,function(item){
            item._update();
        });
    },
    /**
    *\u66f4\u65b0\u8282\u70b9\u7684\u4e00\u7cfb\u5217\u5c5e\u6027
    *1.\u5982\u6709text,\u5c31\u66f4\u65b0text.
    *2.\u5982\u6709icon
    */
    update : function(obj){
        var me = this,
            hrefElement =me._getHrefElement(),
            textElement = me._getTextElement();
        baidu.extend(me,obj);
        (hrefElement ? hrefElement : textElement).innerHTML = me.text;
    },
    /**
    *\u5207\u6362toggle\u72b6\u6001
    *@param {String | display} "block" or "none"
    *@param {String | lastClassName} "Lminus" or "Lplus"
    *@param {String | className} "Tminus" or "Tplus"
    *@param {Boolean | flag} true or false
    */
    _switchToggleState : function(display,lastClassName,className,flag){
        var me  = this;
        if(me.type == "leaf")
            return false;
        me.isExpand = flag;
        if(me.getToggleElement())
            me.getToggleElement().className = me.getClass(me._isLast() ? lastClassName : className);
        if(me.getChildNodes() && me.getChildNodes().length > 0)
            me.getSubNodesContainer().style.display = display;
    },
    /**
    *\u5c55\u5f00\u8282\u70b9
    */
    expand : function() {
        var me = this;
        me._switchToggleState("block","Lminus","Tminus",true);
        if(me.getParentNode()){
            me.getParentNode().expand();
        }
    },
    /**
    *\u6536\u8d77\u8282\u70b9
    */
    collapse : function() {
        this._switchToggleState("none","Lplus","Tplus",false);
    },
    /**
    *\u5207\u6362\uff0c\u6536\u8d77\u6216\u8005\u5c55\u5f00
    */
    toggle : function(){
        var me = this;
        if(me.type == "leaf")
            return false;
        me.isExpand ? me.collapse() : me.expand();
    },
    
    /**
    *\u5207\u6362focus\u7684\u72b6\u6001
    *@param {String className} className
    *@param {Bollean flag} flag
    *@param {String methodName} \u65b9\u6cd5\u540d
    */
    _switchFocusState : function(className,flag,methodName){
        var me = this;
        baidu.dom[methodName](me._getNodeElement(),me.getClass("current"));
        if(me.type!="leaf"){
            me._getIconElement().className = me.getClass(className);
            me.isOpen = flag;
        }
    },
    /**
    *\u5931\u53bb\u7126\u70b9,\u8ba9\u5f53\u524d\u8282\u70b9\u53d6\u6d88\u9ad8\u4eae\u3002
    */
    blur : function(){
        var me = this;
        me._switchFocusState("trunk",false,"removeClass");
        me.getTree().setCurrentNode(null);
    },
    /**
    *\u53d6\u5f97\u7126\u70b9,\u5e76\u4e14\u8ba9\u5f53\u524d\u8282\u70b9\u9ad8\u4eae\uff0c\u8ba9\u4e0a\u4e00\u8282\u70b9\u53d6\u6d88\u9ad8\u4eae\u3002
    */
    focus : function(){
        var me = this,
            oldNode = me.getTree().getCurrentNode();
        if(oldNode != null){ 
            oldNode.blur();
        }
        me._switchFocusState("open-trunk",true,"addClass");
        me.getTree().setCurrentNode(me);
        baidu.dom.removeClass(me._getNodeElement(),me.getClass("over"));
    },
    /**
    *hover,\u9f20\u6807\u653e\u4e0a\u53bb\u7684\u6548\u679c
    */
    _hover : function(){
        var me = this;
        if(me._getNodeElement().className.indexOf(me.getClass("current"))==-1){
            baidu.dom.addClass(me._getNodeElement(),me.getClass("over"));
        }
        me.dispatchEvent("draghover");
        me.dispatchEvent("sorthover");
    },
    /**
    *out,\u9f20\u6807\u79bb\u5f00\u7684\u6548\u679c
    */
    _out : function(){
        var me = this;
        baidu.dom.removeClass(me._getNodeElement(),me.getClass("over"));
        me.dispatchEvent("out");
    },
    /**
    *\u70b9\u51fb\u8282\u70b9\u65f6\u5019\u7684\u6548\u679c
    */
    _onClick : function(eve){
        var me = this;
        me.focus();
        me.getTree().dispatchEvent("click", {
            treeNode : me
        });
    },
    /**
    *mousedown\u8282\u70b9\u65f6\u5019\u7684\u6548\u679c
    */
    _onMouseDown : function(eve){
        var me = this;
        me.dispatchEvent("dragdown",{event:eve});
    },
    /**
    *\u5f53\u9f20\u6807\u53cc\u51fb\u8282\u70b9\u65f6\u7684\u6548\u679c
    */
    _onDbliClick : function(eve){
        var me = this;
        me.focus();
        if(me.isToggle)
            me.toggle();
        me.getTree().dispatchEvent("dblclick", {
            treeNode : me
        });
    },
    /**
    *\u5f53\u9f20\u6807\u53f3\u51fb\u8282\u70b9\u65f6\u7684\u6548\u679c
    */
   _onContextmenu : function(eve){
        var me = this;
        return me.getTree().dispatchEvent("contextmenu", {
            treeNode : me,
            eve : eve
        });
   
   },
    /**
    *\u70b9\u51fbtoggle\u56fe\u6807\u65f6\u5019\u7684\u6548\u679c
    */
    _onToggleClick : function(eve){
        var me = this;
        if(me.isToggle)
            me.toggle();
        me.getTree().dispatchEvent("toggle",{treeNode:me});
        baidu.event.stopPropagation(eve);
    },
    /**
    * \u83b7\u5f97TreeNode  body\u7684html string
    * @return {String} htmlstring
    */
    _getBodyString : function() {
        var me = this;
        return baidu.format(me.tplBody, {
            id : me.getId("node"),
            classb : me.getClass("b"),
            "class" : me.getClass("node"),
            onclick : me.getCallRef() + ("._onClick(event)"),
            onmouseover : me.getCallRef() + ("._hover()"),
            oncontextmenu : me.getCallRef() + ("._onContextmenu(event)"),
            onmousedown : me.getCallRef() + ("._onMouseDown(event)"),
            onmouseout : me.getCallRef() + ("._out()"),
            ondblclick : me.getCallRef() + ("._onDbliClick(event)"),
            style : me.style,
            span   : me._getSpanString(),
            icon   : me._getIconString(),
            text   : me._getTextString(),
            nodetype : me.type,
            nodelevel : me.getClass("level"+me._level)
       });
    },
    /**
    * \u83b7\u5f97TreeNode  Images\u7684html string
    * @return {String} htmlstring
    */ 
    _getImagesString : function() {
        var me = this,
            str =  me._getIdentString();
        if(me.type == "leaf"){
            str +=  me._getTLString();
        }
        else if(me.type == "trunk"){
           (me.children && me.children.length>0) ? str += me._getToggleString() : str +=  me._getTLString();
        }
        return str;
    },

    _getSpanString : function(){
         var me = this;
         return baidu.format(me.tplSpan,{
            id : me.getId("span"),
            "images" : me._getImagesString()
        });
    },
    /**
    *\u83b7\u5f97TreeNode \u7f29\u8fdb\u7ebf\u6761\u7684String
    *@return {string} htmlstring
    */
    _getIdentString : function(){
        var me = this, 
            i  = 0,
            str = "";
        function getIdent(className,other){
            return baidu.format(me.tplImage,{
                    "class" : me.getClass(className),
                    nodelevel : me.getClass(className+"-level"+me._level),
                    other : me.getClass(other)
                 })
        }
        while(me.getParentNode() && me.getParentNode().type!="root"){
            i ++;
            me = me.getParentNode();
            str = (me._isLast() ? getIdent("blank","blank-"+i) :getIdent("I","I-"+i))+str;
        }
        return str;
    },
    /**
    *\u83b7\u5f97TreeNode T\u7ebf\u6761\u6216\u8005L\u7ebf\u6761\u7684String
    *@return {string} htmlstring
    */
    _getTLString : function(){
        var me = this,
            clasName = me._isLast() ? "L" : "T";
        return baidu.format(me.tplImage,{
            "class": me.getClass(clasName),
             nodelevel : me.getClass(clasName+"-level"+me._level)
        })
            
    },
    
    /**
    * \u83b7\u5f97TreeNode  Toggle string
    * @return {String} htmlstring
    */ 
    _getToggleString : function(){
        var me = this,
            className = "";
        if(me.isExpand ){
            className = "Tminus";
            if(me._isLast())
                className = "Lminus";
        }
        else{
            className = "Tplus";
            if(me._isLast()){
                className = "Lplus";
            }
        }
        return baidu.format(me.tplImageToggle,{
            "class" :  me.getClass(className),
            onclick : me.getCallRef() + ("._onToggleClick(event)"),
            nodelevel : me.getClass(className+"-level"+me._level),
            id  : me.getId("toggle")
        })

    },
    /**
    * \u83b7\u5f97TreeNode  Toggle string
    * @return {String} htmlstring
    */ 
    _getIconString : function(){
        var me = this,
            className = (me.type == "leaf" ? "leaf" :"trunk"),
            src = "";
        if(me.type == "leaf"){
            cp = "leaf";
            if(me.icon)
                src = "src = '"+me.icon+"'";
        }
        else{
            className = "trunk";
            if( me.isOpen) {
                className = "open-trunk";
            }
        }
        return baidu.format(me.tplIcon,{
            "class" : me.getClass(className),
            src : me.bImageSrc,
            style : me.icon ? "background-image:'url("+me.icon+")'" : "",
            nodelevel : me.getClass(className+"-level"+me._level),
            id : me.getId("icon")
        })
    },
    /**
    * \u83b7\u5f97TreeNode  text string
    * @return {String} htmlstring
    */ 
    _getTextString : function() {
        var me = this,
            text = (me.href ? me._getHrefString() : baidu.string.encodeHTML(me.text));
        return baidu.format(me.tplText,{
            "class" : me.getClass("text"),
            id  : me.getId("textContainer"),
            textid : me.getId("text"),
            href : text,
            title : me.title || me.text
        });

    },
    /**
    * \u83b7\u5f97TreeNode  href string
    * @return {String} htmlstring
    */
    _getHrefString : function() {
        var me = this;
        return baidu.format(me.tplHref,{
            "class" : me.getClass("link"),
            id  : me.getId("link"),
            text : baidu.string.encodeHTML(me.text),
            href : me.href,
            target : (me.target ? "target='"+me.target+"'" : "")
        });

    },
    /**
    *\u53d6\u5f97\u56fe\u6807(\u7ebf\u6216\u8005blank)\u7684\u5bb9\u5668
    * @return {HTMLObject} span
    */
    _getSpanElement : function(){
        return baidu.g(this.getId("span"));
    },
    /**
    *\u53d6\u5f97\u8282\u70b9\u56fe\u6807\u7684HTMLObject
    * @return {HTMLObject}
    */
    _getIconElement : function(){
        return baidu.g(this.getId("icon"));
    },
    /**
    *\u53d6\u5f97\u6587\u672c\u7236\u5bb9\u5668\u7684HTMLObject
    * @return {HTMLObject}
    */
    _getTextContainer : function(){
        return baidu.g(this.getId("textContainer"));
    },
    /**
    *\u53d6\u5f97\u6587\u672c\u5bb9\u5668\u7684HTMLObject
    * @return {HTMLObject}
    */
    _getTextElement : function(){
        return baidu.g(this.getId("text"));
    },
    /**
    *\u53d6\u5f97\u5207\u6362\u5c55\u5f00\u6216\u6536\u8d77\u7684image HTMLObject
    *@return {HTMLObject}
    */
    getToggleElement : function(){
        return baidu.g(this.getId("toggle"));
    },
    /**
    *\u53d6\u5f97\u88c5\u5b50\u8282\u70b9\u7684\u7236\u5bb9\u5668 HTMLObject
    *@return {HTMLObject}
    */
    getSubNodesContainer : function(){
        return baidu.g(this.getId("subnodes"));
    },
    /**
    *\u53d6\u5f97href\u7684\u5bb9\u5668 HTMLObject
    *@return {HTMLObject}
    */
    _getHrefElement : function (){
        return baidu.g(this.getId("link"));
    },
    /**
    *\u53d6\u5f97node(\u4e0d\u5305\u62ec\u5b50\u8282\u70b9)\u7684 HTMLObject
    *@return {HTMLObject}
    */
    _getNodeElement : function() {
        return baidu.g(this.getId("node"));
    },
    /**
    *\u53d6\u5f97node(\u5305\u62ec\u5b50\u8282\u70b9\u7684dom)\u7684\u5bb9\u5668 HTMLObject
    *@return {HTMLObject}
    */
    _getContainer : function() {
        return baidu.g(this.getId());
    },
    /**
    *\u5207\u6362\u8282\u70b9\u7684\u9690\u85cf\u6216\u663e\u793a
    */
    _switchHide : function(display){
        var me = this;
        me._getNodeElement().style.display = display;
    },
    /**
    *\u9690\u85cf\u8282\u70b9\uff0c\u4f46\u4e0d\u5305\u62ec\u5b83\u7684\u5b50\u8282\u70b9\u3002
    */
    hide : function(){
        this._switchHide("none");
    },
    /**
    *\u663e\u793a\u8282\u70b9\u3002
    */
    show : function(){
        this._switchHide("block");
    },
    /**
    *\u9012\u5f52\u5c55\u5f00\u6240\u6709\u5b50\u8282\u70b9
    */
    expandAll:function(){
        var me = this;
        if(me.getChildNodes().length>0)
            me.expand();
        baidu.array.each(me.getChildNodes(),function(item){
            item.expandAll();
        });
      
    },
    /**
    *\u9012\u5f52\u6536\u8d77\u6240\u6709\u5b50\u8282\u70b9
    */
    collapseAll:function(){
        var me = this;
        if(me.getChildNodes().length>0)
            me.collapse();
        baidu.array.each(me.getChildNodes(),function(item){
            item.collapseAll();
        });
    },
    /**
    *\u53d6\u5f97\u672c\u8282\u70b9\u6240\u5bf9\u5e94\u7236\u8282\u70b9\u7684\u7d22\u5f15
    *@return {int} index
    */
    getIndex : function(){
        var me = this,
            nodes,
            index = -1;
        if(me.getParentNode())
            nodes = me.getParentNode().getChildNodes();
        else
            return index;
        for(var i = 0 ; i < nodes.length ; i ++){
            if( nodes[i] == me)
                index = i;
        }
        return index;
    },
    /**
    *\u53d6\u5f97\u672c\u8282\u70b9\u7684\u4e0b\u4e00\u4e2a\u8282\u70b9
    *\u5982\u679c\u6ca1\u6709\u5c31\u8fd4\u56de\u81ea\u5df1
    *@return {TreeNode} next
    */
    getNext : function(){
        var me = this,index = me.getIndex(),
            nodes = me.getParentNode().getChildNodes();
        return (index +1>=nodes.length) ? me : nodes[index+1];
    },
    /**
    *\u53d6\u5f97\u672c\u8282\u70b9\u7684\u4e0a\u4e00\u4e2a\u8282\u70b9
    *\u5982\u679c\u6ca1\u6709\u5c31\u8fd4\u56de\u81ea\u5df1
    *@return {TreeNode} previous
    */
    getPrevious : function(){
        var me = this,index = me.getIndex(),
            nodes = me.getParentNode().getChildNodes();
        return (index - 1 < 0) ? me : nodes[index-1];
    },
    /**
    *\u53d6\u5f97\u672c\u8282\u70b9\u7684\u7b2c\u4e00\u4e2a\u5b50\u8282\u70b9
    *\u5982\u679c\u6ca1\u6709\u5c31\u8fd4\u56denull
    *@return {TreeNode} previous
    */
    getFirstChild : function() {
        var me = this,
            nodes = me.getChildNodes();
        return (nodes.length <= 0) ? null : nodes[0]; 
    },
    /**
    *\u53d6\u5f97\u672c\u8282\u70b9\u7684\u6700\u540e\u4e00\u4e2a\u5b50\u8282\u70b9
    *\u5982\u679c\u6ca1\u6709\u5c31\u8fd4\u56denull
    *@return {TreeNode} previous
    */
    getLastChild : function() {
        var me = this,
            nodes = me.getChildNodes();
        return nodes.length<=0 ? null : nodes[nodes.length-1];
    },
    /**
    *\u662f\u5426\u662f\u6700\u540e\u4e00\u4e2a\u8282\u70b9
    *@return {Boolean} true | false
    */
    _isLast : function(){
        var me = this;
        return me.getIndex() == me.parentNode.children.length - 1;
    }
});

  /*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: ui/tree/TreeNode.js
 * author: fx
 * version: 1.0.0
 * date: 2010-11-4
 */


///import baidu.ui.tree.TreeNode;
/**
 * addon
 *
 * draggable
 */
///import baidu.dom.draggable;
///import baidu.event.on;
///import baidu.event.un;
///import baidu.event.getPageX;
///import baidu.event.getPageY;
///import baidu.event.getTarget;
///import baidu.dom.getPosition;
///import baidu.ui.behavior.draggable;

/**
*\u5f53\u524d\u8282\u70b9\u7684onmousedown\u4e8b\u4ef6,\u5728\u62d6\u62fd\u8282\u70b9\u7684\u65f6\u5019\u7528\u3002
*/
baidu.ui.tree.TreeNode.extend({
    /**
    *\u5b9e\u73b0mousedown\u5206\u53d1\u51fa\u6765\u7684ondragdown\u4e8b\u4ef6
    */
    ondragdown : function(obj){
        var me = this,
            tree  = me.getTree(),
            eve = obj.event;
        if(tree.draggable){
            tree._proxy.style.left = (baidu.event.getPageX(eve)+10)+"px";
            tree._proxy.style.top =(baidu.event.getPageY(eve)+10)+"px";
            tree._dragNode = me;
        }
    },
    /**
    *\u5b9e\u73b0hover\u5206\u53d1\u51fa\u6765\u7684ondraghover\u4e8b\u4ef6
    */
    ondraghover : function(){
        var me = this,
            tree = me.getTree();
        if(tree.draggable){
            tree.setHoverNode(me);
            tree.isInRange = true;
        }
     },
    /**
    *\u5b9e\u73b0out\u5206\u53d1\u51fa\u6765\u7684onout\u4e8b\u4ef6
    */
     onout : function(){
        var me = this,
            tree = me.getTree();
        if(tree.draggable){
            tree.isInRange = false;
            tree.setHoverNode(null);
        }
     }
});




/**
*_dragNode:\u62d6\u62fd\u7684\u6811\u8282\u70b9
*_proxy : \u62d6\u62fd\u7684\u6811\u8282\u70b9\u7684\u4ee3\u7406\u8282\u70b9
*/
baidu.ui.tree.Tree.extend({
    draggable : true,
    /**
    *\u521b\u5efa\u62d6\u62fd\u4ee3\u7406
    */
    createProxy : function(){
        var me = this;
        me._proxy = document.createElement("div");
        document.body.appendChild(me._proxy);
        me._proxy.style.display="none";
        me._proxy.className = me.getClass("proxy");
        return me._proxy;
    },
    /**
    *\u53d6\u5f97\u9f20\u6807hover\u5b9a\u4f4d\u7684\u8282\u70b9\uff08\u5728\u62d6\u62fd\u7684\u65f6\u5019\u6709\u7528\uff09
    *@return {TreeNode} treeNode
    */
    getHoverNode : function(){
        return this._hoverNode;
    },
    /**
    *\u8bbe\u7f6ehover\u5b9a\u4f4d\u7684\u8282\u70b9\uff08\u5728\u62d6\u62fd\u7684\u65f6\u5019\u6709\u7528\uff09
    *@param {TreeNode} treeNode
    */
    setHoverNode : function(hoverNode){
        this._hoverNode = hoverNode;
    },
    setDragNode : function(node){
        this._dragNode = node;
    },
    getDragNode : function(){
        return this._dragNode;
    },
    ondragstart : function(){
        var me = this;
        me.isDrag = true;
        me._proxy.style.display = "block";  
    },
    ondragend  : function(){      
        var me = this;
        me.dispatchEvent("beforedragend");
        me._proxy.style.display = "none";
        if(me.isInRange){
            var treeNode = me.getHoverNode();
            //\u62d6\u5230\u7236\u8282\u70b9
            if(!me._dragNode.isParent(treeNode) && !me._dragNode.isRoot && me._dragNode.parentNode != treeNode && me._dragNode != treeNode){
                me.dispatchEvent("afterdragend",{sourceNode:me._dragNode,objectNode:treeNode});
            }
        }
        me.dispatchEvent("sortend");
        me.isDrag = false;
    }
})


baidu.ui.tree.Tree.register(function(me){
    if(me.draggable){
        me.addEventListener("onload", function(){
            var me = this,
                proxy = me._proxy || me.createProxy();
            me.dragHandler = me.dragHandler || me.getMain();
            me.dragTarget = proxy; 
            if(!me.dragRange){ //\u9ed8\u8ba4\u7684\u62d6\u62fd\u8303\u56f4\u662f\u5728\u7a97\u53e3\u5185
                me.dragRange = [0,baidu.page.getWidth(),baidu.page.getHeight(),0];
            }
            me.dragUpdate();
        })
    }
});

  /*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: ui/tree/TreeNode.js
 * author: fx
 * version: 1.0.0
 * date: 2010-12-13
 */


///import baidu.ui.tree.TreeNode;
/**
 * addon
 *
 */
///import baidu.event.getKeyCode;
///import baidu.event.stopPropagation;

/**
*edit tree
*/
baidu.ui.tree.TreeNode.extend({
    tplInput     : '<input  type="text" style="overflow:visible" id="#{id}" onkeyup="#{onkeydown}" onblur="#{onblur}" value="#{value}" class="#{class}"/>',
    /**
    *\u8ba9\u6811\u8282\u70b9\u5904\u4e8e\u7f16\u8f91\u72b6\u6001
    */
    edit : function(){
        var me = this,
            textContainer = me._getTextContainer(),
            textElement = me._getTextElement(),
            inputElement = me._getInputElement(),
            width = textElement.offsetWidth;
        if(inputElement) {
            inputElement.style.display = "inline";
        }
        else {
            baidu.dom.insertHTML(textContainer,"beforeEnd",me._getInputString());
            inputElement = me._getInputElement();
        }
        textElement.style.display = "none";
        inputElement.style.width = width;
        inputElement.focus();
    },
    /**
    *\u8ba9\u6811\u8282\u70b9\u64a4\u9500\u7f16\u8f91\u72b6\u6001
    */
    unEdit : function(){
        var me = this;
        me._getTextElement().style.display = "inline";
        me._getInputElement().style.display = "none"; 
        me.text = me._getInputElement().value;
        me.update();
    },
    /**
    *\u7126\u70b9\u79bb\u5f00\u65f6\u7684\u4e8b\u4ef6
    */
    _onInputBlur : function(eve){
        var me = this,
            input = me._getInputElement();
        me.getTree().dispatchEvent("editblur",{treeNode:me,inputElement:input});
        _count = 0;
    },
    /**
    *onkeydown\u7684\u4e8b\u4ef6
    */
    _onInputKeydown : function(eve){
        var me = this,
            keycode = baidu.event.getKeyCode(eve);
        if(keycode == 13)
            me._onInputBlur();
           
    },
    /**
    *\u53d6\u5f97input\u7684\u5143\u7d20
    */
    _getInputElement : function(){
        return baidu.g(this.getId("input"));
    },
    /**
    *\u53d6\u5f97input\u7684HTML\u5b57\u7b26\u4e32
    *@return {String} string
    */
    _getInputString : function(){
        var me = this;
        return baidu.format(me.tplInput,{
            id : me.getId("input"),
            "class" : me.getClass("input"),
            value : me.text,
            onkeydown : me.getCallRef() + ("._onInputKeydown(event)"),
            onblur : me.getCallRef() + ("._onInputBlur(event)")
        });
    }
});

  /*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: ui/tree/TreeNode.js
 * author: fx
 * version: 1.0.0
 * date: 2010-11-4
 */


///import baidu.ui.tree.TreeNode;
/**
 * addon
 *
 * draggable
 */
///import baidu.dom.draggable;
///import baidu.page.getWidth;
///import baidu.page.getHeight;
///import baidu.event.on;
///import baidu.event.un;
///import baidu.event.getPageX;
///import baidu.event.getPageY;
///import baidu.event.getTarget;

///import baidu.dom.getPosition;
///import baidu.ui.behavior.draggable;

/**
*\u5f53\u524d\u8282\u70b9\u7684onmousedown\u4e8b\u4ef6,\u5728\u62d6\u62fd\u8282\u70b9\u7684\u65f6\u5019\u7528\u3002
*/
var n = 0
baidu.ui.tree.TreeNode.extend({
    /**
    *\u5b9e\u73b0dispatch\u4e0b\u6765\u7684sorthover
    */
    onsorthover : function(){
        var me = this,
            tree = me.getTree(),
            ele = null,
            position;
        if(tree.isDrag == true && tree.sortable){
            tree._setSortHoverNode(me);
            ele = tree._getSortElement() || tree._createSortLine();
            ele.style.display = "block";
            ele.style.width = me._getNodeElement().offsetWidth+"px";
            position = baidu.dom.getPosition(me._getNodeElement());
            ele.style.left = position.left+"px";
            ele.style.top = (position.top+me._getNodeElement().offsetHeight-5)+"px";
            ele.className = tree.getClass("sort-transparent");
            
            window.status = ele.style.left +"|" +ele.style.top + "|" + n;
        }
        n++;
    }
});




/**
*_sorthoverNode : 
*/
baidu.ui.tree.Tree.extend({
    //\u6392\u5e8f\u7ebf\u7684\u6a21\u677f
    tplSortLine : '<div id="#{id}" style="display:none" class="#{class}" onmouseover="#{onmouseover}" onmouseout="#{onmouseout}"></div>',
    /**
    *\u53d6\u5f97sortline\u7684HTML\u5143\u7d20
    *return {HTMLElement} sortelement
    */
    _getSortElement : function(){
    return baidu.g(this.getId("sort"));
    },

    /**
    *\u521b\u5efa\u6392\u5e8f\u7ebf\u6761
    */
    _createSortLine : function(){
        var me = this,str;
        str =  baidu.format(me.tplSortLine,{
            "class" : me.getClass("sort"),
            id  : me.getId("sort"),
            onmouseover : me.getCallRef() + ("._onSortMouseOver(event)"),
            onmouseout : me.getCallRef() + ("._onSortMouseOut(event)")
        });
        me.getMain().innerHTML += str;
        return me._getSortElement();
    },
    /**
    *\u8bbe\u7f6esortHoverNode
    *@param {TreeNode} sortHoverNode
    */
    _setSortHoverNode : function(sortHoverNode){
        this._sorthoverNode = sortHoverNode;
    },
    /**
    *\u8bbe\u7f6e\u53d6\u5f97sortHoverNode
    *@return {TreeNode} sortHoverNode
    */
    _getSortHoverNode : function(){
        return this._sorthoverNode;
    },
    /**
    *\u5b9e\u73b0\u5206\u53d1\u7684sortend\u4e8b\u4ef6
    */
    onsortend  : function(){      
        var me = this;
        if(me.sortable && me.isInSortRange){
            var treeNode = me._getSortHoverNode();            
            me._getSortElement().style.display = "none";
            if(!me._dragNode.isParent(treeNode) && !me._dragNode.isRoot && me._dragNode != treeNode){
                me.dispatchEvent("aftersortend",{sourceNode:me._dragNode,objectNode:treeNode});
            }
        }
    },
    /**
    *\u9f20\u6807\u653e\u4e0asortline\u7684\u4e8b\u4ef6
    */
    _onSortMouseOver : function(eve){
    var me= this,
        ele = me._getSortElement();
        ele.className = me.getClass("sort");
        me.isInSortRange = true;

    },
    /**
    *\u9f20\u6807\u79bb\u5f00sortline\u7684\u4e8b\u4ef6
    */
    _onSortMouseOut : function(eve){
        var me = this;
        me._getSortElement().style.display = "none";
        me.isInSortRange = false;
    }
});

  
  //UI searchbox
  /**
 * @author \u53f2\u7eaf\u534e(shichunhua)
 * @fileoverview \u57fa\u7840\u67e5\u8be2\u6846 \u8d1f\u8d23\u6784\u5efa\u67e5\u8be2\u6846UI\u53ca\u4e8b\u4ef6\u901a\u77e5
 * 				\u6269\u5c55\u5230ace.ui.SearchBox
 * 				ace.ui.SearchBox \u63d0\u4f9b\u63a5\u53e3(\u65b9\u6cd5) \u5177\u4f53\u53c2\u6570\u89c1\u5bf9\u5e94\u65b9\u6cd5\u6ce8\u91ca:
 * 					onchange: \u5185\u5bb9\u53d8\u5316\u65f6\u89e6\u53d1
 *					onfocus: \u805a\u7126\u65f6\u89e6\u53d1
 					onblur: \u5931\u7126\u65f6\u89e6\u53d1
 * 					resize: \u8c03\u6574\u5bbd\u5ea6
 * 
 * @version 1.0.0.0
 */
(function(){
    if (!ace || !ace.ui || ace.ui.SearchBox) {
        return;
    }
    /**
     * \u67e5\u8be2\u6846\u6784\u9020\u51fd\u6570
     */
    var SearchBox = ace.lang.createClass(function(params){
		this._render = params.render;
		this._defaultValue = params.defaultValue || '';
		this._width = params.width || 305;
		this._showIcon = params.icon;
		
		this._box = null;
		this._inputBox = null;
		this._input = null;
		this._iconBox = null;
		this._icon = null;
		this._close = null;
		this._reg = /(^\s*)|(\s*$)/;
		this._tempValue = this._defaultValue;
		
		this._build();
		this._init();
		this._addEvent();
    }).extend({
		/**
		 * \u6784\u5efa\u67e5\u8be2\u6846DOM
		 */
		_build: function(){
			this._box = document.createElement('div');
			this._box.className = 'baseSearchBox';
			this._render.appendChild(this._box);
			
			this._iconBox = document.createElement('div');
			this._iconBox.className = 'bsb_iconBox';
			this._box.appendChild(this._iconBox);
			
			this._icon = document.createElement('div');
			if(this._showIcon != null){
				this._icon.className = 'bsb_userIcon';
				ace.setStyles(this._icon, {'background-image': 'url('+this._showIcon+')'});
			}else{
				this._icon.className = 'bsb_defaultIcon';
			}
			this._iconBox.appendChild(this._icon);			
			
			this._inputBox = document.createElement('div');
			this._inputBox.className = 'bsb_inputBox';
			this._box.appendChild(this._inputBox);
			
			this._input = document.createElement('input');
			this._input.type = 'text';
			this._input.className = 'bsb_input' + (ace.browser.ie == 6 ? ' ie6' : '');
			this._inputBox.appendChild(this._input);
			
			this._close = document.createElement('a');
			this._close.href = '###';
			this._close.hideFocus = true;
			this._close.className = 'bsb_closeIcon';
			this._inputBox.appendChild(this._close);
		},
		/**
		 * \u521d\u59cb\u5316\u67e5\u8be2\u6846\u6837\u5f0f\u53ca\u5185\u5bb9
		 */
		_init: function(){
			ace.setStyles(this._box, {'width': this._width + 'px'});
			this._input.value = this._defaultValue;
			ace.setStyles(this._input, {
				'width': this._width - this._iconBox.clientWidth - this._close.clientWidth - 10 + 'px'
			});
			ace.setStyles(this._inputBox, {
				'width': this._width - this._iconBox.clientWidth + 'px'
			});
			ace.hide(this._close);
		},
		/**
		 * \u6dfb\u52a0\u4e8b\u4ef6
		 */
		_addEvent: function(){
			var self = this;
			ace.on(this._input, 'focus', function(e){self._focusInput(e);});
			ace.on(this._input, 'click', function(e){self._focusInput(e);});			
			ace.on(this._input, 'blur', function(e){self._blurInput(e);});			
			if(ace.browser.ie){
				ace.on(this._input, 'keyup', function(e){self._change(e);});
				ace.on(this._input, 'propertychange', function(e){self._change(e);});
			}
			ace.on(this._input, 'input', function(e){self._change(e);});			
			ace.on(this._close, 'click', function(e){self._clear(e);});
		},
		/**
		 * \u805a\u7126INPUT\u4e8b\u4ef6
		 */
		_focusInput: function(e){
			if(this._input.value.replace(this._reg, '') == this._defaultValue){
				this._input.value = '';
			}
			ace.addClass(this._input, 'focus');
			
			this.onfocus(e);
		},
		/**
		 * \u5931\u7126INPUT\u4e8b\u4ef6
		 */
		_blurInput: function(e){
			if(this._input.value.replace(this._reg, '') == this._defaultValue || this._input.value.replace(this._reg, '') == ''){
				this._input.value = this._defaultValue;
				ace.hide(this._close);
			}
			ace.removeClass(this._input, 'focus');
			
			this.onblur(e);
		},
		/**
		 * INPUT\u6709\u53d8\u5316\u65f6\u89e6\u53d1\u4e8b\u4ef6
		 */
		_change: function(e){	
			if(ace.browser.ie){
				e = e || window.event;
				if (e.type == 'propertychange') {
					if (e.propertyName == 'value' && this._tempValue != this._defaultValue) {
						return;
					}
				}
			}
			
			if(this._input.value == '' || this._input.value == this._defaultValue){
				ace.hide(this._close);
			}else{
				ace.show(this._close);
			}
			
			if(this._tempValue == this._input.value || this._input.value == this._defaultValue){
				return;
			}
			this._tempValue = this._input.value;
			
			this.onchange(this._input.value);
		},
		/**
		 * \u6e05\u7a7a\u8f93\u5165\u5185\u5bb9
		 */
		_clear: function(){
			this._input.value = '';
			this._input.focus();
			ace.hide(this._close);
			
			this._change();
		},
		/**
		 * \u8c03\u6574\u8f93\u5165\u6846\u5bbd\u5ea6
		 * @param {Int} width
		 */
		_resize: function(width){
			this._width = width || this._width;
			
			ace.setStyles(this._box, {'width': this._width + 'px'});
			ace.setStyles(this._input, {
				'width': this._width - this._iconBox.clientWidth - this._close.clientWidth - 10 + 'px'
			});
			ace.setStyles(this._inputBox, {
				'width': this._width - this._iconBox.clientWidth + 'px'
			});
		},
		
		/**
		 * \u5bf9\u5916\u63a5\u53e3(\u5916\u90e8\u8986\u5199)  \u5185\u5bb9\u53d1\u751f\u53d8\u5316\u65f6\u89e6\u53d1
		 * @param {String} value
		 */
		onchange: function(value){
		},
		/**
		 * \u5bf9\u5916\u63a5\u53e3,  \u53ef\u4ee5\u7531\u5916\u90e8\u968f\u65f6\u8c03\u6574\u63a7\u4ef6\u5bbd\u5ea6
		 * @param {Int} width
		 */
		resize: function(width){
			this._resize(width);
		},
		/**
		 * \u5bf9\u5916\u63a5\u53e3
		 * @param {Object} e
		 */
		onfocus: function(e){
			
		},
		/**
		 * \u5bf9\u5916\u63a5\u53e3
		 * @param {Object} e
		 */
		onblur: function(e){
			
		}
    })
    // \u6269\u5c55\u81f3ace.ui.SearchBox
    ace.ui.SearchBox = SearchBox;
})();

  
  //UI drag
  /**
 * @author \u53f2\u7eaf\u534e(shichunhua)
 * @fileoverview \u8d1f\u8d23\u6267\u884cchrome\u62d6\u62fd\u6548\u679c
 * 				\u6269\u5c55\u5230ace.ui.ChromeDrag
 * 				ace.ui.ChromeDrag \u63d0\u4f9b\u63a5\u53e3(\u65b9\u6cd5) \u5177\u4f53\u53c2\u6570\u89c1\u5bf9\u5e94\u65b9\u6cd5\u6ce8\u91ca:
 * 					init: \u521d\u59cb\u5316, \u8981\u4f20\u76f8\u5e94\u53c2\u6570
 * 					initBlock: \u521d\u59cb\u6a21\u5757
 * 					beforedrag: \u62d6\u62fd\u5f00\u59cb\u524d\u6267\u884c\u63a5\u53e3
 * 					dragend: \u62d6\u62fd\u7ed3\u675f\u540e\u6267\u884c
 * @version 1.0.0.0
 */
(function(){
    if (!ace || !ace.ui || ace.ui.ChromeDrag) {
        return;
    }
    /**
     * \u62d6\u62fd\u6784\u9020\u51fd\u6570
     */
    var ChromeDrag = ace.lang.createClass(function(){
        this.render = null;
        this.width = null;
        this.height = null;
		this.horizonMargin = null;
		this.verticalMargin = null;
        this.attribute = 'data_drag';
        
        this._status = {
            isDrag: false,
            moveEnd: true,
            swapEnd: true,
            captured: false
        };
        
        this._event = {
            mousedown: 'mousedown',
            mousemove: 'mousemove',
            mouseup: 'mouseup'
        };
		
		this._downEvent = null;
		this._moveEvent = null;
		this._upEvent = null;
        
        this._layers = {
            target: null
        };
        
        this._config = {
            tagName: '',
            absolute: 'absolute',
            relative: 'relative',
            px: 'px',
            ie: /msie/i.test(navigator.userAgent),
            moveStep: this.ie ? 3 : 5,
            swapStep: this.ie ? 1.5 : 2.5,
            renderPos: '',
            renderRect: null
        }
        
        this._temp = {
            moveIntervals: {}
        }
        
        this._inited = false;
    }).extend({
        /**
         * \u5b9e\u4f8b\u5316 \u5bf9\u5916\u63a5\u53e3
         * @param {Object} params
         */
        init: function(params){
            this._init(params);
        },
        /**
         * \u5b9e\u4f8b\u5316 \u79c1\u6709\u65b9\u6cd5
         * @param {Object} params
         */
        _init: function(params){
            this.render = params.render;
            this.attribute = params.attribute ? params.attribute : this.attribute;
            this.width = params.width;
            this.height = params.height;
			this.horizonMargin = params.horizonMargin;
			this.verticalMargin = params.verticalMargin;
            
            if (!this.render || !this.width || !this.height || !this.horizonMargin || !this.verticalMargin) {
                alert('ChromeDrag init with wrong params !');
                return;
            }
            
            if (this.render.style.position != this._config.absolute || this.render.style.position != this._config.relative) {
                this._config.renderPos = this.render.style.position;
                this.render.style.position = this._config.relative;
            }
            
            this._getTagName();
            this.initBlock();
            
            if (!this._inited) {
                this._addEvent();
            }
            
            this._inited = true;
            
        },
        /**
         * \u83b7\u53d6\u53ef\u79fb\u52a8\u533a\u5757TAG\u540d\u79f0
         */
        _getTagName: function(){
            var nodes = this.render.getElementsByTagName('*');
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].getAttribute(this.attribute) != null) {
                    this._config.tagName = nodes[i].tagName;
                    break;
                }
            }
        },
        /**
         * \u5bf9\u5916\u63a5\u53e3
         * \u521d\u59cb\u5316render\u5185\u90e8\u5143\u7d20, \u5e76\u6307\u5b9arender\u9ad8\u5ea6
         */
        initBlock: function(){
            this._initBlock();
        },
        /**
         * \u79c1\u6709\u65b9\u6cd5
         * \u521d\u59cb\u5316render\u5185\u90e8\u5143\u7d20, \u5e76\u6307\u5b9arender\u9ad8\u5ea6
         */
        _initBlock: function(){
            this._clearTemp();
            this._config.renderRect = this.getPosition(this.render);
            
            var nodes = this._getChildNodes(), 
			conWidth = this.render.clientWidth, 
			lineCount = Math.floor(conWidth / (this.width + this.horizonMargin)), 
			curTop = this.verticalMargin, 
			curLeft = this.horizonMargin, 
			count = 0, 
			lineNum = Math.ceil(nodes.length / lineCount);
            
            while (nodes.length) {
                var curNode = nodes.shift();
                
                curNode.style.position = this._config.absolute;
                curNode.style.width = this.width + this._config.px;
                curNode.style.height = this.height + this._config.px;
                curNode.style.left = curLeft + this._config.px;
                curNode.style.top = curTop + this._config.px;
                curNode.style.zIndex = 1;
                
                count++;
                if (count % lineCount == 0) {
                    curLeft = this.horizonMargin;
                    curTop = curTop + this.height + this.verticalMargin;
                }
                else {
                    curLeft = curLeft + this.width + this.horizonMargin;
                }
            }
            
            this.render.style.height = lineNum * this.height + (lineNum + 1) * this.verticalMargin + this._config.px;
            
            // \u53d6\u4f5c\u7528\u533a\u57df\u5185\u5143\u7d20\u4f4d\u7f6e\u4fe1\u606f
            this._getChildPostions();
        },
        /**
         * \u6ce8\u518c\u4e8b\u4ef6
         */
        _addEvent: function(){
            var oThis = this;
			this._downEvent = function(e){
                oThis._mousedown(e);
            }
			this._moveEvent = function(e){
                oThis._mousemove(e);
            }
			this._upEvent = function(e){
                oThis._mouseup(e);
            }
            ace.on(document, this._event.mousedown, this._downEvent);
            ace.on(document, this._event.mousemove, this._moveEvent);
            ace.on(document, this._event.mouseup, this._upEvent);
        },
		_removeEvent: function(){
            ace.un(document, this._event.mousedown, this._downEvent);
            ace.un(document, this._event.mousemove, this._moveEvent);
            ace.un(document, this._event.mouseup, this._upEvent);
		},
        /**
         * \u9f20\u6807\u6309\u4e0b\u89e6\u53d1
         * @param {Object} e
         */
        _mousedown: function(e){
			e = e || window.event;
			if(this._config.ie && e.button != 1){
				return;
			}else if(!this._config.ie && e.button != 0){
				return;
			}
			
            if (!this._isBlock(e) || !this._status.moveEnd || !this._status.swapEnd) {
				return;
			}
            
            this._status.isDrag = true;
            this._layers.target = this._getTarget(e);
            
            this.beforedrag(this._layers.target);
            
            var rect = this.getPosition(this._layers.target), scrollLeft = ace.page.getScrollLeft(), scrollTop = ace.page.getScrollTop();
            this._temp.marginLeft = e.clientX + scrollLeft - rect.left;
            this._temp.marginTop = e.clientY + scrollTop - rect.top;
            
            // \u53d6\u88ab\u62d6\u62fd\u5bf9\u8c61\u4e2d\u5fc3\u70b9, \u4ee5\u505a\u5411\u5fc3\u8fd0\u52a8\u7528
            this._temp.inclineX = Math.floor(rect.left - this._config.renderRect.left + this.width / 2);
            this._temp.inclineY = Math.floor(rect.top - this._config.renderRect.top + this.height / 2);
            
            // \u8bb0\u5f55\u88ab\u62d6\u62fd\u5bf9\u8c61\u539f\u6709\u5750\u6807
            this._temp.selfX = rect.left - this._config.renderRect.left;
            this._temp.selfY = rect.top - this._config.renderRect.top;
            
            if (!this._config.ie) e.preventDefault();
            
            this._temp.mouseX = e.clientX + scrollLeft;
            this._temp.mouseY = e.clientY + scrollTop;
            this._moveListener();            
        },
        /**
         * \u9f20\u6807\u79fb\u52a8\u89e6\u53d1
         * @param {Object} e
         */
        _mousemove: function(e){
            if (!this._status.isDrag) 
                return;
            
            var scrollLeft = ace.page.getScrollLeft(), scrollTop = ace.page.getScrollTop();
            
            this._temp.mouseX = e.clientX + scrollLeft;
            this._temp.mouseY = e.clientY + scrollTop;
            
            
            if (this._config.ie && !this._status.captured) {
                this._layers.target.setCapture();
                this._status.captured = true;
            }
        },
        /**
         * \u9f20\u6807\u62ac\u8d77\u89e6\u53d1
         * @param {Object} e
         */
        _mouseup: function(e){
            if (!this._status.isDrag) 
                return;
            
            this._status.isDrag = false;
            //this._status.moveEnd = true;
            
            if (this._config.ie && this._status.captured) {
                this._layers.target.releaseCapture();
                this._status.captured = false;
            }
            
            
            if (this._temp.mouseInterval) {
                clearInterval(this._temp.mouseInterval);
                this._temp.mouseInterval = null;
            }
            
            var scrollLeft = ace.page.getScrollLeft(), scrollTop = ace.page.getScrollTop();
            
            this._temp.mouseX = e.clientX + scrollLeft;
            this._temp.mouseY = e.clientY + scrollTop;
            
            this._swapNode();
            
        },
        /**
         * \u76d1\u542c\u9f20\u6807\u79fb\u52a8
         */
        _moveListener: function(){
            var oThis = this;
            this._temp.mouseInterval = setInterval(function(){
                var toLeft = oThis._temp.mouseX - oThis._config.renderRect.left - oThis._temp.marginLeft, 
				toTop = oThis._temp.mouseY - oThis._config.renderRect.top - oThis._temp.marginTop;
				
				//window.setTimeout(function(){
					ace.setStyles(oThis._layers.target, {
						'left': toLeft + oThis._config.px,
						'top': toTop + oThis._config.px,
						'z-index': 3
					});
				//}, 20);
                
                oThis._checkNeedMove();                
            }, 16);
        },
        /**
         * \u5224\u65ad\u70b9\u51fb\u5bf9\u8c61\u662f\u5426\u4e3a\u53ef\u79fb\u52a8\u7684\u533a\u5757\u5bf9\u8c61
         * @param {Object} e
         */
        _isBlock: function(e){
            try {
                var tar = this._getTarget(e);
                return tar && tar.getAttribute && tar.getAttribute(this.attribute) != null;
            } 
            catch (ex) {
                return false;
            }
        },
        /**
         * \u83b7\u53d6\u53ef\u79fb\u52a8\u533a\u5757\u5bf9\u8c61
         * @param {Object} e
         */
        _getTarget: function(e){
            var tar = e.srcElement || e.target;
            while (tar) {
                if (tar && tar.getAttribute && tar.getAttribute(this.attribute) != null) {
                    return tar;
                }
                else {
                    tar = tar.parentNode;
                }
            }
            return tar;
        },
        /**
         * \u9a8c\u8bc1\u5426\u9700\u8981\u8ba9\u4f4d\u79fb\u52a8
         */
        _checkNeedMove: function(){
            var needMove = false, 
			eX = this._temp.mouseX - this._temp.marginLeft - this._config.renderRect.left + Math.floor(this.width / 2), 
			eY = this._temp.mouseY - this._temp.marginTop - this._config.renderRect.top + Math.floor(this.height / 2);
            
            for (var i = 0, iLen = this._temp.childPositions.length; i < iLen; i++) {
                var curInfo = this._temp.childPositions[i];
                var isSute = curInfo.elm != this._layers.target &&
                eX > curInfo.x - this._config.renderRect.left &&
                eX < curInfo.x - this._config.renderRect.left + this.width &&
                eY > curInfo.y - this._config.renderRect.top &&
                eY < curInfo.y - this._config.renderRect.top + this.height;
                
                if (isSute) {
                    this._temp.targetX = curInfo.x;
                    this._temp.targetY = curInfo.y;
                    this._temp.order = i;
                    this._inclineCenter(curInfo, i);
                }
                else 
                    if (curInfo.elm != this._layers.target) {
                        this._declineCenter(curInfo, i);
                    }
            }
        },
        
        /**
         * \u5411\u88ab\u62d6\u62fd\u5bf9\u8c61\u539f\u59cb\u4f4d\u7f6e\u4e2d\u5fc3\u70b9\u503e\u659c
         */
        _inclineCenter: function(nodeInfo, order){
            if (this._temp.moveIntervals['run_' + order]) 
                return;
            
            this._temp.moveIntervals['run_' + order] = true;
            nodeInfo.elm.style.zIndex = 2;
            
            var oThis = this, runOrder = order, tempInfo = nodeInfo;
            var inclineParam = this._getInclineOffset(tempInfo.x - oThis._config.renderRect.left, tempInfo.y - oThis._config.renderRect.top);
            var toX = inclineParam.x, toY = inclineParam.y;
            
            this._moveToEffect(tempInfo.elm, toX, toY, this._config.moveStep, function(){
                clearInterval(oThis._temp.moveIntervals['incline_' + runOrder]);
                oThis._temp.moveIntervals['run_' + runOrder] = false;
                
                var cX = oThis._temp.mouseX - oThis._temp.marginLeft - oThis._config.renderRect.left + Math.floor(oThis.width / 2), cY = oThis._temp.mouseY - oThis._temp.marginTop - oThis._config.renderRect.top + Math.floor(oThis.height / 2);
                
                var isIn = cX > tempInfo.x - oThis._config.renderRect.left &&
                cX < tempInfo.x - oThis._config.renderRect.left + oThis.width &&
                cY > tempInfo.y - oThis._config.renderRect.top &&
                cY < tempInfo.y - oThis._config.renderRect.top + oThis.height;
                
                if (!isIn) {
                    oThis._declineCenter(tempInfo, runOrder);
                }
            }, 'incline_' + runOrder);
        },
        /**
         * \u56de\u5f52\u5230\u56fe\u6807\u672c\u8eab\u4f4d\u7f6e(\u8fdc\u79bb\u62d6\u62fd\u5bf9\u8c61)
         */
        _declineCenter: function(nodeInfo, order){
            if (parseInt(nodeInfo.elm.style.left) == nodeInfo.x && parseInt(nodeInfo.elm.style.top) == nodeInfo.y) 
                return;
            if (this._temp.moveIntervals['run_' + order]) 
                return;
            
            this._temp.moveIntervals['run_' + order] = true;
            
            var oThis = this, runOrder = order, tempInfo = nodeInfo;
            
            this._moveToEffect(tempInfo.elm, tempInfo.x - oThis._config.renderRect.left, tempInfo.y - oThis._config.renderRect.top, this._config.moveStep, function(){
                clearInterval(oThis._temp.moveIntervals['decline_' + runOrder]);
                
                tempInfo.elm.style.zIndex = 1;
                oThis._temp.moveIntervals['run_' + runOrder] = false;
            }, 'decline_' + runOrder);
        },
        
        /**
         * \u53d6\u5f97\u5411\u5fc3\u5750\u6807
         * @param {Object} curX
         * @param {Object} curY
         */
        _getInclineOffset: function(curX, curY){
            var radian = Math.atan((this._temp.inclineY - curY - this.height / 2) / (this._temp.inclineX - curX - this.width / 2)), 
			radios = Math.floor((this.width/2 + this.height/2) / 2), 
			merX = Math.abs(Math.floor(radios * Math.cos(radian))), 
			merY = Math.abs(Math.floor(radios * Math.sin(radian)));
            
            return {
                x: curX < this._temp.inclineX ? curX + merX : curX - merX,
                y: curY < this._temp.inclineY ? curY + merY : curY - merY
            }
        },
        
        /**
         * \u79fb\u52a8\u52a8\u753b
         * @param {Object} moveObj \u8981\u79fb\u52a8\u5bf9\u8c61
         * @param {Object} toX \u76ee\u6807X\u5750\u6807
         * @param {Object} toY \u76ee\u6807Y\u5750\u6807
         * @param {Object} step \u79fb\u52a8\u6b65\u4f10
         * @param {Object} endCallBack \u79fb\u52a8\u5b8c\u6210\u56de\u8c03\u65b9\u6cd5
         */
        _moveToEffect: function(moveObj, toX, toY, step, endCallBack, intervalName){
            this._status.moveEnd = false;
            var oThis = this, xEnd = false, yEnd = false;
            this._temp.moveIntervals[intervalName] = setInterval(function(){
                var curLeft = parseInt(moveObj.style.left);
                var curTop = parseInt(moveObj.style.top);
                if (curLeft < toX) {
                    moveObj.style.left = curLeft + oThis._getMovieMerge(curLeft, toX, step) + oThis._config.px;
                }
                else 
                    if (curLeft > toX) {
                        moveObj.style.left = curLeft - oThis._getMovieMerge(curLeft, toX, step) + oThis._config.px;
                    }
                    else {
                        xEnd = true;
                    }
                
                
                if (curTop < toY) {
                    moveObj.style.top = curTop + oThis._getMovieMerge(curTop, toY, step) + oThis._config.px;
                }
                else 
                    if (curTop > toY) {
                        moveObj.style.top = curTop - oThis._getMovieMerge(curTop, toY, step) + oThis._config.px;
                    }
                    else {
                        yEnd = true;
                    }
                
                if (xEnd && yEnd) {
                    endCallBack();
                }
            }, 16);
        },
        /**
         * \u83b7\u53d6\u4f5c\u7528\u533a\u57df\u5185\u53ef\u62d6\u52a8\u5143\u7d20
         */
        _getChildNodes: function(){
            var arr = [];
            var elms = this.render.getElementsByTagName(this._config.tagName);
            for (var i = 0; i < elms.length; i++) {
                if (elms[i].getAttribute(this.attribute) != null) 
                    arr.push(elms[i]);
            }
            return arr;
        },
        /**
         * \u53d6\u4f5c\u7528\u533a\u57df\u5185\u5143\u7d20\u4f4d\u7f6e\u4fe1\u606f
         */
        _getChildPostions: function(){
            this._temp.childPositions = [];
            var elms = this._getChildNodes();
            for (var i = 0; i < elms.length; i++) {
                var rect = this.getPosition(elms[i]);
                this._temp.childPositions.push({
                    elm: elms[i],
                    x: rect.left,
                    y: rect.top
                });
                this._temp.moveIntervals['run_' + i] = false;
            }
        },
        /**
         * \u83b7\u53d6\u52a8\u753b\u5f53\u524d\u503c
         * @param {Object} curValue
         * @param {Object} toValue
         * @param {Object} step
         */
        _getMovieMerge: function(curValue, toValue, step){
            var merge = Math.ceil(Math.abs(curValue - toValue) / step);
            return merge < 1 ? 1 : merge;
        },
        
        _swapNode: function(){
            var oThis = this, 
			eX = this._temp.mouseX - this._config.renderRect.left - this._temp.marginLeft + Math.floor(this.width / 2), 
			eY = this._temp.mouseY - this._config.renderRect.top - this._temp.marginTop + Math.floor(this.height / 2);
            
            var isIn = eX > this._temp.targetX - this._config.renderRect.left &&
            eX < this._temp.targetX - this._config.renderRect.left + this.width &&
            eY > this._temp.targetY - this._config.renderRect.top &&
            eY < this._temp.targetY - this._config.renderRect.top + this.height;
            
            this._status.swapEnd = false;
            if (isIn) {
                var order = this._temp.order;
                if (this._temp.moveIntervals['incline_' + order]) {
                    clearInterval(this._temp.moveIntervals['incline_' + order]);
                    this._temp.moveIntervals['run_' + order] = false;
                }
                if (this._temp.moveIntervals['decline_' + order]) {
                    clearInterval(this._temp.moveIntervals['decline_' + order]);
                    this._temp.moveIntervals['run_' + order] = false;
                }
                
                this._temp.swapFromEnd = false;
                this._temp.swapToEnd = false;
                
                var nodeInfo = this._temp.childPositions[order];
                this._moveToEffect(this._layers.target, nodeInfo.x - this._config.renderRect.left, nodeInfo.y - this._config.renderRect.top, this._config.swapStep, function(){
                    clearInterval(oThis._temp.moveIntervals['swapTo']);
                    oThis._layers.target.style.zIndex = 1;
                    oThis._temp.swapToEnd = true;
                    
                    oThis._checkSwapEnd(nodeInfo.elm);
                }, 'swapTo');
                
                var tempInfo = nodeInfo;
                this._moveToEffect(nodeInfo.elm, this._temp.selfX, this._temp.selfY, this._config.swapStep, function(){
                    clearInterval(oThis._temp.moveIntervals['swapFrom']);
                    oThis._temp.swapFromEnd = true;
                    
                    oThis._checkSwapEnd(tempInfo.elm);
                }, 'swapFrom');
            }
            else {
                if (parseInt(this._layers.target.style.left) == this._temp.selfX &&
                parseInt(this._layers.target.style.top) == this._temp.selfY) {
                    this._layers.target.style.zIndex = 1;
                    this._status.swapEnd = true;
                    
                    
                    this._checkAllMovingEnd(function(){
                        // \u901a\u77e5\u5916\u90e8\u63a5\u53e3
                        oThis.dragend(oThis._layers.target, false);
                    });
                    
                    return;
                }
                this._moveToEffect(this._layers.target, this._temp.selfX, this._temp.selfY, this._config.swapStep, function(){
                    clearInterval(oThis._temp.moveIntervals['back']);
                    oThis._layers.target.style.zIndex = 1;
                    oThis._status.swapEnd = true;
                    
                    oThis._checkAllMovingEnd(function(){
                        // \u901a\u77e5\u5916\u90e8\u63a5\u53e3
                        oThis.dragend(oThis._layers.target, false);
                    });
                    
                }, 'back');
            }
        },
        /**
         * \u9a8c\u8bc1\u662f\u5426\u4ea4\u6362\u52a8\u753b\u6267\u884c\u5b8c\u6210
         * @param {Object} toNode
         */
        _checkSwapEnd: function(toNode){
            if (this._temp.swapFromEnd && this._temp.swapToEnd) {
                this._status.swapEnd = true;
                var oThis = this;
                this._checkAllMovingEnd(function(){
                    oThis.swapNode(oThis._layers.target, toNode);
                    // \u901a\u77e5\u5916\u90e8\u63a5\u53e3
                    oThis.dragend(oThis._layers.target, true);
                    // \u91cd\u65b0\u7ec4\u7ec7\u5185\u90e8\u53ef\u62d6\u62fd\u5143\u7d20\u4f4d\u7f6e
                    oThis._initBlock();
                });
            }
            else {
                this._status.swapEnd = false;
            }
        },
        /**
         * \u9a8c\u8bc1\u662f\u5426\u6240\u6709\u5143\u7d20\u90fd\u5df2\u7ecf\u79fb\u52a8\u5b8c\u6210
         * @param {Object} cb
         */
        _checkAllMovingEnd: function(cb){
            var oThis = this;
            this._temp.checkAllEndInterval = setInterval(function(){
                var isEnd = true;
                for (var i = 0, iLen = oThis._temp.childPositions.length; i < iLen; i++) {
                    if (oThis._temp.moveIntervals['run_' + i]) {
                        isEnd = false;
                        break;
                    }
                }
                
                if (isEnd) {
                    clearInterval(oThis._temp.checkAllEndInterval);
                    oThis._status.moveEnd = true;
                    cb();
                }
            }, 16);
        },
        
        /**
         * \u4ea4\u6362\u4e24\u4e2aDOM\u5143\u7d20
         * @param {Object} nodeA
         * @param {Object} nodeB
         */
        swapNode: function(nodeA, nodeB){
            var nodeA_nextNode = nodeA.nextSibling, nodeB_nextNode = nodeB.nextSibling, pNodeA = nodeA.parentNode, pNodeB = nodeB.parentNode;
            
            nodeA_nextNode ? pNodeA.insertBefore(nodeB, nodeA_nextNode) : pNodeA.appendChild(nodeB);
            nodeB_nextNode ? pNodeB.insertBefore(nodeA, nodeB_nextNode) : pNodeB.appendChild(nodeA);
        },
        
        /**
         * \u6e05\u9664\u7f13\u5b58\u6570\u636e
         */
        _clearTemp: function(){
            this._temp = {
                moveIntervals: {}
            }
        },
		/**
		 * \u9500\u6bc1\u5bf9\u8c61
		 */
		_destroy: function(){
			this._removeEvent();
			for (var i = 0, iLen = this._temp.childPositions.length; i < iLen; i++) {
                if (this._temp.moveIntervals['run_' + i]) {
                    window.clearInterval(this._temp.moveIntervals['run_' + i]);
					this._temp.moveIntervals['run_' + i] = null;
                }
            }
			if(this._temp.checkAllEndInterval){
				window.clearInterval(this._temp.checkAllEndInterval);
			}
			for(var item in this){
				try {
					this[item] = null;
				}catch(ex){}
			}
		},
        
        
        
        
        
        /**
         * \u83b7\u53d6\u5bf9\u8c61\u5750\u6807
         * @param {Object} el \u9700\u8981\u53d6\u5f97\u7edd\u5bf9\u4f4d\u7f6e\u7684\u5143\u7d20
         */
        getPosition: function(el){
            return ace.dom.getPosition(el);
        },
        
        /**
         * \u5bf9\u5916\u63a5\u53e3 - \u62d6\u52a8\u524d\u89e6\u53d1
         */
        beforedrag: function(elem){
        
        },
        /**
         * \u5bf9\u5916\u63a5\u53e3 - \u62d6\u52a8\u7ed3\u675f\u540e\u89e6\u53d1
         * @param {Object} elm  \u88ab\u62d6\u62fd\u5bf9\u8c61
         * @param {boolean} isSwaped \u662f\u6709\u505a\u4e86\u4ea4\u6362
         */
        dragend: function(elem, isSwaped){
        
        },
		
		/**
		 * \u5bf9\u5916\u63a5\u53e3 - \u9500\u6bc1\u5bf9\u8c61
		 */
		destroy: function(){
			this._destroy();
		}
    })
    // \u6269\u5c55\u81f3ace.ui.ChromeDrag
    ace.ui.ChromeDrag = ChromeDrag;
})();

  
  //UI easing
  /**
 * @author \u53f2\u7eaf\u534e(shichunhua)
 * @fileoverview \u6548\u679c\u7f13\u52a8\u7b97\u6cd5\u7c7b
 * 				\u6269\u5c55\u5230ace.ui.Easing
 * @version 1.0.0.0
 */
(function(){
    if (!ace || !ace.ui || ace.ui.Easing) {
        return;
    }
	
	var Easing = {
		Linear: function(t, b, c, d) {
			return c * t / d + b
		},
		Quad: {
			easeIn: function(t, b, c, d) {
				return c * (t /= d) * t + b
			},
			easeOut: function(t, b, c, d) {
				return - c * (t /= d) * (t - 2) + b
			},
			easeInOut: function(t, b, c, d) {
				if ((t /= d / 2) < 1) return c / 2 * t * t + b;
				return - c / 2 * ((--t) * (t - 2) - 1) + b
			}
		},
		Cubic: {
			easeIn: function(t, b, c, d) {
				return c * (t /= d) * t * t + b
			},
			easeOut: function(t, b, c, d) {
				return c * ((t = t / d - 1) * t * t + 1) + b
			},
			easeInOut: function(t, b, c, d) {
				if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
				return c / 2 * ((t -= 2) * t * t + 2) + b
			}
		},
		Quart: {
			easeIn: function(t, b, c, d) {
				return c * (t /= d) * t * t * t + b
			},
			easeOut: function(t, b, c, d) {
				return - c * ((t = t / d - 1) * t * t * t - 1) + b
			},
			easeInOut: function(t, b, c, d) {
				if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
				return - c / 2 * ((t -= 2) * t * t * t - 2) + b
			}
		},
		Quint: {
			easeIn: function(t, b, c, d) {
				return c * (t /= d) * t * t * t * t + b
			},
			easeOut: function(t, b, c, d) {
				return c * ((t = t / d - 1) * t * t * t * t + 1) + b
			},
			easeInOut: function(t, b, c, d) {
				if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
				return c / 2 * ((t -= 2) * t * t * t * t + 2) + b
			}
		},
		Sine: {
			easeIn: function(t, b, c, d) {
				return - c * Math.cos(t / d * (Math.PI / 2)) + c + b
			},
			easeOut: function(t, b, c, d) {
				return c * Math.sin(t / d * (Math.PI / 2)) + b
			},
			easeInOut: function(t, b, c, d) {
				return - c / 2 * (Math.cos(Math.PI * t / d) - 1) + b
			}
		},
		Expo: {
			easeIn: function(t, b, c, d) {
				return (t == 0) ? b: c * Math.pow(2, 10 * (t / d - 1)) + b
			},
			easeOut: function(t, b, c, d) {
				return (t == d) ? b + c: c * ( - Math.pow(2, -10 * t / d) + 1) + b
			},
			easeInOut: function(t, b, c, d) {
				if (t == 0) return b;
				if (t == d) return b + c;
				if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
				return c / 2 * ( - Math.pow(2, -10 * --t) + 2) + b
			}
		},
		Circ: {
			easeIn: function(t, b, c, d) {
				return - c * (Math.sqrt(1 - (t /= d) * t) - 1) + b
			},
			easeOut: function(t, b, c, d) {
				return c * Math.sqrt(1 - (t = t / d - 1) * t) + b
			},
			easeInOut: function(t, b, c, d) {
				if ((t /= d / 2) < 1) return - c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
				return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b
			}
		},
		Elastic: {
			easeIn: function(t, b, c, d, a, p) {
				if (t == 0) return b;
				if ((t /= d) == 1) return b + c;
				if (!p) p = d * .3;
				if (!a || a < Math.abs(c)) {
					a = c;
					var s = p / 4
				} else var s = p / (2 * Math.PI) * Math.asin(c / a);
				return - (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b
			},
			easeOut: function(t, b, c, d, a, p) {
				if (t == 0) return b;
				if ((t /= d) == 1) return b + c;
				if (!p) p = d * .3;
				if (!a || a < Math.abs(c)) {
					a = c;
					var s = p / 4
				} else var s = p / (2 * Math.PI) * Math.asin(c / a);
				return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b)
			},
			easeInOut: function(t, b, c, d, a, p) {
				if (t == 0) return b;
				if ((t /= d / 2) == 2) return b + c;
				if (!p) p = d * (.3 * 1.5);
				if (!a || a < Math.abs(c)) {
					a = c;
					var s = p / 4
				} else var s = p / (2 * Math.PI) * Math.asin(c / a);
				if (t < 1) return - .5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
				return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b
			}
		},
		Back: {
			easeIn: function(t, b, c, d, s) {
				if (s == undefined) s = 1.70158;
				return c * (t /= d) * t * ((s + 1) * t - s) + b
			},
			easeOut: function(t, b, c, d, s) {
				if (s == undefined) s = 1.70158;
				return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
			},
			easeInOut: function(t, b, c, d, s) {
				if (s == undefined) s = 1.70158;
				if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
				return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b
			}
		},
		Bounce: {
			easeIn: function(t, b, c, d) {
				return c - Easing.Bounce.easeOut(d - t, 0, c, d) + b
			},
			easeOut: function(t, b, c, d) {
				if ((t /= d) < (1 / 2.75)) {
					return c * (7.5625 * t * t) + b
				} else if (t < (2 / 2.75)) {
					return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b
				} else if (t < (2.5 / 2.75)) {
					return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b
				} else {
					return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b
				}
			},
			easeInOut: function(t, b, c, d) {
				if (t < d / 2) return Easing.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
				else return Easing.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b
			}
		}
	}
	
    // \u6269\u5c55\u81f3ace.ui.Easing
    ace.ui.Easing = Easing;
})();

  
  //UI scrollpane
  /**
 * @author \u53f2\u7eaf\u534e(shichunhua)
 * @fileoverview \u6a21\u62df\u6eda\u52a8\u6761
 * 				\u6269\u5c55\u5230ace.ui.ScrollPane
 * 				ace.ui.ScrollPane \u63d0\u4f9b\u63a5\u53e3(\u65b9\u6cd5) \u5177\u4f53\u53c2\u6570\u89c1\u5bf9\u5e94\u65b9\u6cd5\u6ce8\u91ca:
 * 					showScroll: \u663e\u793a\u6eda\u52a8\u6761
 *					hideScroll: \u9690\u85cf\u6eda\u52a8\u6761
 *					dispose: \u9500\u6bc1\u5b9e\u4f8b\u5bf9\u8c61
 *					onresize: \u8c03\u6574\u7a97\u53e3\u5927\u5c0f\u53ca\u6eda\u52a8\u6761\u4f4d\u7f6e 
 *					scrollToTop: \u6eda\u52a8\u81f3\u9876
 *					scrollToBottom: \u6eda\u52a8\u81f3\u5e95
 * @version 1.0.0.0
 */
(function(){
    if (!ace || !ace.ui || ace.ui.ScrollPane) {
        return;
    }
	
	/**
	 * ScrollPane\u6784\u9020\u51fd\u6570
	 * @param {HTMLElement} render \u53ef\u6eda\u52a8\u5bb9\u5668
	 * @param {HTMLElement} container \u7236\u4eb2\u5bb9\u5668
	 * @param {Function} needEffect \u6eda\u52a8\u6761\u6548\u679c
	 * @param {Int} wheelSpeed \u6eda\u8f6e\u6362\u884c\u9891\u7387(\u9ed8\u8ba4\u503c50)
	 * @param {Boolean} needBarface \u662f\u5426\u9700\u8981\u6eda\u52a8\u6761\u4e0a\u7684\u5c0ficon
	 */
    var ScrollPane = ace.lang.createClass(function(render, container, needEffect, wheelSpeed, needBarface){
		this.render = render;
		this.container = container;
		this.wheelSpeed = wheelSpeed || 50;
		this.needEffect = needEffect;
		this.needBarface = needBarface;
		this.barfaceHeight = 0;
		
		this._tagName = 'div';
		this._overflow = false;
		this._upInterval = null;
		this._downInterval = null;
		this._trackBlockDrag = false;
		this._ie = ace.browser.ie;
		this._changeListener = null;
		this._listenHeight = null;
		this._tween = null;
		this._wheelTween = null;
		this._toTempValue = null;
		
		this._downFun = null;
		this._moveFun = null;
		this._upFun = null;
		this._wheelFun = null;
		this._needShow = true;
		
		this._init();
    }).extend({		
		/**
		 * \u521d\u59cb\u5316
		 */
		_init: function(){
			this._buildDom();
			this._addEvent();
		},
		/**
		 * \u521b\u5efaDOM\u5bf9\u8c61
		 * @param {Object} tagName
		 * @param {Object} params
		 */
		$C: function(tagName, params){
			var elm = document.createElement(tagName);
			for(var item in params){
				if(item == 'className'){
					elm.className = params[item];
				}else if(item == 'innerHTML'){
					elm.innerHTML = params[item];
				}else{
					elm.setAttribute(item, params[item]);
				}
			}
			return elm;
		},
		/**
		 * \u6dfb\u52a0DOM\u5bf9\u8c61
		 * @param {Object} cNode
		 * @param {Object} pNode
		 */
		$A: function(cNode, pNode){
			return pNode != null ? pNode.appendChild(cNode) : document.body.appendChild(cNode);
		},
		/**
		 * \u79fb\u9664DOM\u5bf9\u8c61
		 * @param {Object} cNode
		 */
		$R: function(cNode){
			return cNode.parentNode.removeChild(cNode);
		},
		/**
		 * \u6784\u5efa\u6eda\u52a8\u6761DOM\u7ed3\u6784
		 */
		_buildDom: function(){
			// \u6eda\u52a8\u6761\u5bb9\u5668
			this._box = this.$C(this._tagName, {className: 'box'});
			// \u5411\u4e0a\u6eda\u52a8\u6309\u94ae
			this._upArrow = this.$C(this._tagName, {className: 'upArrow'});
			// \u5411\u4e0b\u6eda\u52a8\u6309\u94ae
			this._downArrow = this.$C(this._tagName, {className: 'downArrow'});
			// \u6eda\u52a8\u6761\u8f68\u9053
			this._track = this.$C(this._tagName, {className: 'track'});
			// \u6ed1\u5757
			this._trackBlock = this.$C(this._tagName, {
				className: 'trackBlock',
				innerHTML: '<div class="trackBlockTop"></div><div class="trackBlockBody"></div><div class="trackBlockBottom"></div>'
			});
			
			this.$A(this._box, this.container);
			this.$A(this._upArrow, this._box);
			this.$A(this._track, this._box);
			this.$A(this._downArrow, this._box);
			this.$A(this._trackBlock, this._track);
			
			if(this.needBarface){
				this._barFace = this.$C(this._tagName, {
					className: 'trackBarface'
				});
				this.$A(this._barFace, this._trackBlock);
			}
			
			this._checkShow();
		},
		_checkShow: function(){
			if(this.container.clientHeight < this.render.scrollHeight){
				this._overflow = true;
				this._box.style.display = '';
				this._box.style.height = this.container.clientHeight + 'px';
				this._track.style.height = this.container.clientHeight - this._upArrow.clientHeight - this._downArrow.clientHeight + 'px';
				if(this.container.clientHeight + this.render.scrollTop > this.render.scrollHeight){
					this.render.scrollTop = this.render.scrollHeight - this.container.clientHeight;
				}
				//this.render.style.width = this.container.clientWidth - this._box.clientWidth + 'px';
				this.render.style.width = this.container.clientWidth + 'px';
				this.render.style.height = this.container.clientHeight + 'px';
				this._checkTrackBlock();
			}else{
				this._overflow = false;
				this._box.style.display = 'none';
				this.render.scrollTop = 0;
				this.render.style.width = this.container.clientWidth + 'px';
				this.render.style.height = this.container.clientHeight + 'px';
			}
			
			if(!this._needShow){
				this._box.style.visibility = 'hidden';
			}
		},
		_addEvent: function(){
			var me = this;
			// \u6dfb\u52a0\u5411\u4e0a\u7bad\u5934\u70b9\u51fb\u53ca\u6837\u5f0f\u4e8b\u4ef6
			ace.on(this._upArrow, 'mouseover', function(){if (!me._trackBlockDrag) me._upArrow.className = 'upArrowOver';});
			ace.on(this._upArrow, 'mouseout', function(){if (!me._trackBlockDrag) me._upArrow.className = 'upArrow';me._clearMove();});
			ace.on(this._upArrow, 'mousedown', function(e){
				var evt = e || window.event, needReturn = me._ie ? evt.button != 1 : evt.button != 0;
				if(needReturn){return;}
				me._ie ? me._upArrow.setCapture() : evt.preventDefault();
				me._upArrow.className = 'upArrowDown';
				me._moveUp();
				me._upInterval = window.setInterval(function(){me._moveUp();},16);
			});
			ace.on(this._upArrow, 'mouseup', function(){me._upArrow.className = 'upArrowUp';me._clearMove();});
			
			// \u6dfb\u52a0\u5411\u4e0b\u7bad\u5934\u70b9\u51fb\u53ca\u6837\u5f0f\u4e8b\u4ef6
			ace.on(this._downArrow, 'mouseover', function(){if (!me._trackBlockDrag) me._downArrow.className = 'downArrowOver';});
			ace.on(this._downArrow, 'mouseout', function(){if (!me._trackBlockDrag) me._downArrow.className = 'downArrow';me._clearMove();});
			ace.on(this._downArrow, 'mousedown', function(e){
				var evt = e || window.event, needReturn = me._ie ? evt.button != 1 : evt.button != 0;
				if(needReturn){return;}
				me._ie ? me._downArrow.setCapture() : evt.preventDefault();
				me._downArrow.className = 'downArrowDown';
				me._moveDown();
				me._downInterval = window.setInterval(function(){ me._moveDown();},16);
			});
			ace.on(this._downArrow, 'mouseup', function(){me._downArrow.className = 'downArrowUp';me._clearMove();});
			
			// \u6dfb\u52a0\u6ed1\u5757\u6837\u5f0f\u4e8b\u4ef6
			ace.on(this._trackBlock, 'mouseover', function(){if (!me._trackBlockDrag) me._trackBlock.className = 'trackBlockOver';});
			ace.on(this._trackBlock, 'mouseout', function(){if (!me._trackBlockDrag) me._trackBlock.className = 'trackBlock';});
			ace.on(this._trackBlock, 'mousedown', function(){if (!me._trackBlockDrag) me._trackBlock.className = 'trackBlockDown';});
			ace.on(this._trackBlock, 'mouseup', function(){if (!me._trackBlockDrag) me._trackBlock.className = 'trackBlockUp';});
			
			// \u6dfb\u52a0\u6ed1\u5757\u62d6\u62fd\u4e8b\u4ef6
			this._downFun = function(e){me._blockDown(e);};
			this._moveFun = function(e){me._blockMove(e);};
			this._upFun = function(e){me._blockUp(e);};
			ace.on(document, 'mousedown', this._downFun);
			ace.on(document, 'mousemove', this._moveFun);
			ace.on(document, 'mouseup', this._upFun);
			
			// \u6dfb\u52a0\u8f68\u9053\u70b9\u51fb\u4e8b\u4ef6
			ace.on(this._track, 'mousedown', function(e){me._clickTrack(e);});
			
			// \u6dfb\u52a0\u6eda\u8f6e\u4e8b\u4ef6
			this._wheelFun = function(e){me._mouseWheel(e);};
			ace.on(this.render, 'mousewheel', this._wheelFun);
			ace.on(this._box, 'mousewheel', this._wheelFun);
			ace.on(this.render, 'DOMMouseScroll', this._wheelFun);
			ace.on(this._box, 'DOMMouseScroll', this._wheelFun);
			
			// \u6dfb\u52a0\u5185\u5bb9\u53d8\u5316\u76d1\u542c
			this._changeListener = window.setInterval(function(){me._contentListener && me._contentListener();},32);
		},
		/**
		 * \u8c03\u6574\u6ed1\u5757\u4f4d\u7f6e
		 */
		_checkTrackBlock: function(){
			var self = this,
			cH = this.container.clientHeight, 
			rS = this.render.scrollHeight, 
			sT = this.render.scrollTop, 
			rH = this.render.clientHeight,
			tH = this._track.clientHeight;
			
			
			var curH = Math.ceil(tH * cH / rS), bHeight = curH < 6 ? 6 : curH;
			this._trackBlock.style.height = bHeight + 'px';
			this._trackBlock.getElementsByTagName('div')[1].style.height = bHeight - 4 + 'px';
			var t = Math.ceil(tH * sT / rS);
			
			if(this.needBarface){
				if(bHeight - 4 <= this.barfaceHeight){
					this._barFace.style.display = 'none';
				} else {
					this._barFace.style.display = '';
					this.barfaceHeight = this._barFace.clientHeight;
					var top = Math.ceil(bHeight/2 - this.barfaceHeight/2);
					this._barFace.style.top = top + 'px'
				}
			}
	
			if(t + bHeight > tH){
				t = tH - bHeight;
			}
			
			if (!this.needEffect) {
				window.setTimeout(function(){
					self._trackBlock.style.top = t + 'px';
				}, 20);
			} else {
				if (this._tween) {
					this._tween.stop();
				}
				this._tween = new ace.ui.Tween(this._trackBlock, 'top', parseInt(this._trackBlock.style.top) || 0, t, this.needEffect, .3);
			}
		},
		/**
		 * \u5411\u4e0b\u6eda\u52a8\u6309\u94ae\u4e8b\u4ef6
		 */
		_moveDown: function(){
			var sH = this.render.scrollHeight, bH = this.container.clientHeight, sT = this.render.scrollTop;
			if(sT + bH == sH){ return; }
			this.render.scrollTop += 10;
			this._checkTrackBlock();
		},
		/**
		 * \u5411\u4e0a\u6eda\u52a8\u6309\u94ae\u4e8b\u4ef6
		 */
		_moveUp: function(){
			var sH = this.render.scrollHeight, bH = this.container.clientHeight, sT = this.render.scrollTop;
			if(sT == 0){ return; }
			this.render.scrollTop -= 10;
			this._checkTrackBlock();
		},
		/**
		 * \u6eda\u8f6e\u4e8b\u4ef6
		 * @param {Object} e
		 */
		_mouseWheel: function(e){
			var evt = e || window.event, me = this;
			evt.stopPropagation && (evt.preventDefault(), evt.stopPropagation()) || (evt.cancelBubble = true, evt.returnValue = false);
			
			var scroll = (evt.wheelDelta/120 * -1 || evt.detail / 3) * this.wheelSpeed;
			if(!this._toTempValue){
				this._toTempValue = this.render.scrollTop;
			}
			this._toTempValue += scroll;
			if(this._toTempValue > this.render.scrollHeight - this.render.clientHeight){
				this._toTempValue = this.render.scrollHeight - this.render.clientHeight;
			}
			if(this._toTempValue < 0){
				this._toTempValue = 0;
			}
			
			if(!this.needEffect){
				this.render.scrollTop += scroll;			
				this._checkTrackBlock();
			}else{	
				if(this._wheelTween){
					this._wheelTween.stop();
				}
				this._wheelTween = new ace.ui.Tween(this.render, 'scrollTop', this.render.scrollTop, this._toTempValue, ace.ui.Easing.Expo.easeInOut, .5, function(){
					me._checkTrackBlock();
				});
			}
		},
		/**
		 * \u6e05\u9664\u957f\u6309\u6eda\u52a8\u6309\u94ae\u81ea\u52a8\u6eda\u52a8\u4e8b\u4ef6
		 */
		_clearMove: function(){
			if(this._upInterval){
				window.clearInterval(this._upInterval);
				this._upInterval = null;
				if(this._ie){this._upArrow.releaseCapture();}
			}
			if(this._downInterval){
				window.clearInterval(this._downInterval);
				this._downInterval = null;
				if(this._ie){this._downArrow.releaseCapture();}
			}
		},
		/**
		 * \u70b9\u51fb\u8f68\u9053\u4e8b\u4ef6
		 * @param {Object} e
		 */
		_clickTrack: function(e){
			var evt = e || window.event,
			elm = evt.srcElement || evt.target, 
			needReturn = this._ie ? evt.button != 1 : evt.button != 0;
			
			if(needReturn || elm.parentNode == this._trackBlock){return;}
			var tPos = this.getPosition(this._track).top,
			bPos = this.getPosition(this._trackBlock).top,
			trackPoint = evt.clientY - tPos,
			blockPoint = bPos - tPos,
			blockHeight = this._trackBlock.clientHeight;
	
			if(trackPoint < blockPoint){
				this._trackBlock.style.top = trackPoint + 'px';
				this.render.scrollTop = parseInt(trackPoint / this._track.clientHeight * this.render.scrollHeight);
			}else if(trackPoint > blockHeight + blockPoint){
				this._trackBlock.style.top = trackPoint - blockHeight + 'px';	
				this.render.scrollTop = parseInt((trackPoint - blockHeight) / this._track.clientHeight * this.render.scrollHeight);			
			}
		},
		/**
		 * \u62d6\u62fd\u6ed1\u5757\u7684mousedown\u4e8b\u4ef6
		 * @param {Object} e
		 */
		_blockDown: function(e){
			var evt = e || window.event, elm = evt.srcElement || evt.target,
			needReturn = this._ie ? evt.button != 1 : evt.button != 0;
			if(needReturn || elm.parentNode != this._trackBlock){return;}
			if(this._ie){
				this._trackBlock.setCapture();
			}else{
				evt.preventDefault();
			}
			var tbPos = this.getPosition(this._trackBlock), tPos = this.getPosition(this._track);
			this._dragMerge = tPos.top;// - parseInt(this._trackBlock.style.top || 0);
			this._dragMergeY = evt.clientY - tbPos.top;
			this._trackHeight = this._track.clientHeight;
			this._blockHeight = this._trackBlock.clientHeight;
			this._trackBlockDrag = true;
			
		},
		/**
		 * \u62d6\u62fd\u6ed1\u5757\u7684mousemove\u4e8b\u4ef6
		 * @param {Object} e
		 */
		_blockMove: function(e){
			if(!this._trackBlockDrag){return;}
			var evt = e || window.event, me = this;
			
			var t = evt.clientY - this._dragMerge - this._dragMergeY, s = 0;
			if(t < 0){
				t = 0;
			}else if(t > this._trackHeight - this._blockHeight){
				t = this._trackHeight - this._blockHeight;
				s = this.render.scrollHeight - this.container.clientHeight;
			}else{
				s = parseInt(t / this._trackHeight * this.render.scrollHeight);
			}
			this._trackBlock.style.top = t + 'px';
			this.render.scrollTop = s;
		},
		/**
		 * \u62d6\u62fd\u6ed1\u5757\u7684mouseup\u4e8b\u4ef6
		 * @param {Object} e
		 */
		_blockUp: function(e){
			var evt = e || window.event;
			if(!this._trackBlockDrag){return;}
			if(this._ie){
				this._trackBlock.releaseCapture();
			}
			this._trackBlockDrag = false;
			this._trackBlock.className = 'trackBlockUp';
		},
		/**
		 * \u76d1\u542crender\u4e2d\u5185\u5bb9\u53d8\u5316,\u8c03\u6574\u76f8\u5e94\u6eda\u52a8\u6761
		 */
		_contentListener: function(){		
			if(this._listenHeight == this.render.scrollHeight){return;}
			this._listenHeight = this.render.scrollHeight;
			if(this._trackBlockDrag){
				this._blockHeight = this._trackBlock.clientHeight;
			}
			this._checkShow();
		},
		/**
		 * \u663e\u793a\u6eda\u52a8\u6761
		 */
		_showScroll: function(){
			this._needShow = true;
			this._box.style.visibility = 'visible';
		},
		/**
		 * \u9690\u85cf\u6eda\u52a8\u6761
		 */
		_hideScroll: function(){
			this._needShow = false;
			this._box.style.visibility = 'hidden';
		},
		
		
		
		/**
		 * \u83b7\u53d6\u5bf9\u8c61\u7edd\u5bf9\u4f4d\u7f6e
		 * @param {Object} el
		 */
		getPosition: function(el){
			return ace.dom.getPosition(el);
		},
		/**
		 * \u9500\u6bc1
		 */
		dispose: function(){
			if(this._tween){
				this._tween.stop();
			}
			window.clearInterval(this._changeListener);
			if(this._overflow){
				this.render.style.width = this.container.clientWidth + 'px';
			}
			
			ace.un(document, 'mousedown', this._downFun);
			ace.un(document, 'mousemove', this._moveFun);
			ace.un(document, 'mouseup', this._upFun);		
			
			ace.un(this.render, 'mousewheel', this._wheelFun);
			ace.un(this._box, 'mousewheel', this._wheelFun);
			ace.un(this.render, 'DOMMouseScroll', this._wheelFun);
			ace.un(this._box, 'DOMMouseScroll', this._wheelFun);
			
			this.$R(this._box);
			for(var item in this){
				this[item] = null;
			}
		},
		/**
		 * \u5bb9\u5668\u5927\u5c0f\u6709\u53d8\u5316\u65f6\u8c03\u6574
		 */
		onresze: function(){
			this._checkShow();
			this.render.style.height = this.container.clientHeight + 'px';
		},
		/**
		 * \u6eda\u52a8\u5230\u5177\u4f53\u4f4d\u7f6e
		 * @param {Int} value
		 */
		scrollTo: function(value){
			this.render.scrollTop = value;
			this._checkTrackBlock();
		},
		/**
		 * \u6eda\u52a8\u5230\u6700\u9876\u7aef
		 */
		scrollToTop: function(){
			this.render.scrollTop = 0;
			this._checkTrackBlock();
		},
		/**
		 * \u6eda\u52a8\u5230\u6700\u5e95\u7aef
		 */
		scrollToBottom: function(){
			this.render.scrollTop = this.render.scrollHeight - this.container.clientHeight;
			this._checkTrackBlock();
		},
		
		/**
		 * \u663e\u793a\u6eda\u52a8\u6761
		 */
		showScroll: function(){
			this._showScroll();
		},
		/**
		 * \u9690\u85cf\u6eda\u52a8\u6761
		 */
		hideScroll: function(){
			this._hideScroll();			
		}
    });
	
    // \u6269\u5c55\u81f3ace.ui.ScrollPane
    ace.ui.ScrollPane = ScrollPane;
})();

  
  //UI tween
  /**
 * @author \u53f2\u7eaf\u534e(shichunhua)
 * @fileoverview \u8d1f\u8d23\u6267\u884cDOM\u7684\u5404\u79cd\u6548\u679c
 * 				\u6269\u5c55\u5230ace.ui.Tween
 * 				ace.ui.Tween \u63d0\u4f9b\u63a5\u53e3(\u65b9\u6cd5) \u5177\u4f53\u53c2\u6570\u89c1\u5bf9\u5e94\u65b9\u6cd5\u6ce8\u91ca:
 * 					stop: \u505c\u6b62\u52a8\u753b
 * @version 1.0.0.0
 */
(function(){
    if (!ace || !ace.ui || ace.ui.Tween) {
        return;
    }
	
	/**
	 * Tween\u6784\u9020\u51fd\u6570
	 * @param {HTMLElement} node \u8981\u6267\u884c\u52a8\u753b\u7684DOM\u8282\u70b9
	 * @param {String} propertyname \u8981\u6267\u884c\u7684DOM\u7684\u76f8\u5e94\u6837\u5f0f\u540d\u79f0 \u5982:height
	 * @param {Number} startvalue  \u521d\u59cb\u503c
	 * @param {Number} endvalue \u7ed3\u675f\u503c
	 * @param {Object} easing \u8981\u4f7f\u7528\u7684\u7f13\u52a8\u7c7b\u7684\u65b9\u6cd5, \u5982\u679c\u672a\u6307\u5b9a, \u5219\u9ed8\u8ba4\u4f7f\u7528ace.ui.Easing.Linear
	 * @param {Number} duration  \u6548\u679c\u6267\u884c\u65f6\u95f4 \u5355\u4f4d\u4e3a:\u79d2
	 * @param {Function} callback  \u6548\u679c\u6267\u884c\u5b8c\u6210\u540e\u7684\u56de\u8c03\u65b9\u6cd5
	 */
    var Tween = ace.lang.createClass(function(node, propertyname, startvalue, endvalue, easing, duration, callback){
		this._node = node;
		this._propertyName = propertyname;
		this._startValue = startvalue;
		this._endValue = endvalue;
		this._easing = easing || ace.ui.Easing.Linear;
		this._duration = duration < 0.01 ? 0.01 : duration;
		this._callback = callback;
		this._pixelDictionary = ['width', 'height', 'left', 'top', 'right', 'bottom', 'padding', 'padding-left', 'padding-top', 'padding-bottom', 'padding-right', 'margin', 'margin-left', 'margin-top', 'margin-bottom', 'margin-right', 'font-size', 'background-position', 'line-height', 'border-width', 'border-left-width', 'border-top-width', 'border-right-width', 'border-bottom-width'];
		this._runInterval = null;
		this._timeLine = 10;
		this._needPixel = false;
		this._isIE = ace.browser.ie;
		
		if(this._checkParams()){
			this._needPixel = this._getIndex(this._pixelDictionary, this._propertyName) != -1;
			this._run();
		}
    }).extend({
		/**
		 * \u9a8c\u8bc1\u53c2\u6570\u662f\u5426\u5408\u6cd5
		 */
		_checkParams: function(){
			var canPass = this._node != null
			&& this._node.getAttribute != null
			&& this._propertyName != null
			&& !isNaN(this._startValue)
			&& !isNaN(this._endValue)
			&& !isNaN(this._duration);
			
			return canPass;
		},
		
		/**
		 * \u83b7\u53d6\u6570\u7ec4\u7d22\u5f15\u503c
		 * @param {Array} arr
		 * @param {Object} value
		 */
		_getIndex: function(arr, value){
			for(var i = 0 ; i < arr.length ; i ++){
				if(arr[i] == value){
					return i;
				}
			}
			return -1;
		},
		/**
		 * \u53d6\u503c, \u7ed9\u51fa\u662f\u5426\u52a0\u4e0a'px'
		 * @param {Object} value
		 */
		_getValue: function(value){
			return this._needPixel ? value + 'px' : value;
		},
		
		_run: function(){
			var self = this, curTime = 0;
			this._runInterval = window.setInterval(function(){
				var curValue = Math.ceil(self._easing(curTime, self._startValue, self._endValue - self._startValue, self._duration * 1000));
				if(self._propertyName == 'opacity'){
					curValue = curValue / 100;
				}
				
				if(self._propertyName == 'scrollLeft' || self._propertyName == 'scrollTop'){
					self._node[self._propertyName] = self._getValue(curValue);
				}else{
					var obj = {};
					obj[self._propertyName] = self._getValue(curValue);				
					ace.setStyles(self._node, obj);
					if(self._isIE && self._propertyName == 'opacity'){
						self._node.style.filter = 'Alpha(opacity='+curValue * 100+')';
					}
				}
				
				if(curTime >= self._duration * 1000){
					window.clearInterval(self._runInterval);
					self._runInterval = null;
					
					if(self._propertyName == 'scrollLeft' || self._propertyName == 'scrollTop'){
						self._node[self._propertyName] = self._getValue(self._endValue);
					}else{
						var endObj = {};
						endObj[self._propertyName] = self._getValue(self._propertyName == 'opacity' ? self._endValue/100 : self._endValue);				
						ace.setStyles(self._node, endObj);
						if(self._isIE && self._propertyName == 'opacity'){
							self._node.style.filter = 'Alpha(opacity='+self._endValue+')';
						}
					}
					
					self._callback && self._callback();
				}
				
				curTime += self._timeLine;
			}, this._timeLine);
		},
		
		_stop: function(){
			if(this._runInterval){
				window.clearInterval(this._runInterval);
				this._runInterval = null;
			}
			/*
			var obj = {};
			obj[this._propertyName] = this._getValue(this._endValue);
			ace.setStyles(this._node, obj);
			*/
		},
		
		stop: function(){
			this._stop();
		}
    });
	
    // \u6269\u5c55\u81f3ace.ui.Tween
    ace.ui.Tween = Tween;
})();

  
	return ace;
	
})();
