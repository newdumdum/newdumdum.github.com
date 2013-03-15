(function () {
	var console = {
		log: function (info) {
			WScript.StdOut.WriteLine(info);
		}
	};

	var fso = new ActiveXObject("Scripting.FileSystemObject");

	function readFileText(filename) {
		if (!fso.FileExists(filename)) return "";
		var adostream = new ActiveXObject("ADODB.Stream");
		adostream.Type = 2; //TextStreamType;
		adostream.Charset = "utf-8";
		adostream.Open();
		adostream.LoadFromFile(filename);
		var contents = adostream.ReadText();
		adostream.Close();
		adostream = null;
		return contents;
	}

	function writeFileText(filename, text) {
		console.log(["writeFileText:", filename].join(" "));
		var adostream = new ActiveXObject("ADODB.Stream");
		adostream.Type = 2; // TextStreamType;
		adostream.Charset = "utf-8";
		adostream.Open();
		adostream.WriteText(text);
		var adostream2 = new ActiveXObject("ADODB.Stream");
		adostream2.Type = 1;
		adostream2.Open();
		adostream.Position = 3; // Remove BOM
		adostream.CopyTo(adostream2);
		adostream2.Position = 0;
		adostream2.SaveToFile(filename, 2);
		adostream2.Close();
		adostream2 = null;

		adostream.Close();
		adostream = null;
	}
	
	/**
	 * 模板转换
	 * @param {String} content
	 */
	function tpl(content){			
		var reg = /<tpl([\s\S]*?)>([\s\S]*?)<\/tpl>/ig;
		var srcreg = /src *= *"([\s\S]*?)"/i;
		var idreg = /id *= *"([\s\S]*?)"/i;
		var array = content.match(reg);
		var scripttext = '<script type="text/template" id="#{id}">#{template}</script>';
		return content.replace(reg,function(a,b,template){
		    var srcarray = b.match(srcreg);
		    var src;
		    if (srcarray){
		        src = srcarray[1];
				var filename = "src\\"+src.replace(/\//g,"\\");
				template = readFileText(filename);
		    }
		    var idarray = b.match(idreg);
		    var id="";
		    if (idarray ){
		        id = idarray[1];
		    }
		    return scripttext.replace("#{id}",id).replace("#{template}",template);
		});
	}
	
	
	function process(sourceFile, destFile, jsFile, cssFile) {
		if (!sourceFile || !destFile || !jsFile || !cssFile) return;
		console.log(["Processing:", sourceFile, destFile, jsFile, cssFile].join(" "));
		var content = readFileText(sourceFile);
		if (!content) return;
		var sourceDir = sourceFile.match(/^(.*\\)[^\\]*$/)[1] || "";
		var styleContent = [];
		var jsContent = [];
		content = content.replace(/[ \f\t\v]*<!--\s*debug\s+start\s*-->[\s\S]*?<!--\s*debug\s+end\s*-->[ \f\t\v]*/ig, "")
			.replace(/-test(?=\.js)/g, "")
			.replace(/([(\uff08][^(\uff08]*?[)\uff09])(?=<\/title>)/, "")
			.replace(/[ \f\t\v]*<link\s+[^>]*?href="(?!https?:)(?!components)(?!.*_ie6\.css)([^"]+\.css)"[^>]*?>[ \f\t\v]*/ig, function(all, value) {
				var filename = sourceDir + value.replace(/\//g, "\\");
				styleContent.push(readFileText(filename));
				return styleContent.length == 1 ? ['\t\t<link rel="stylesheet" type="text/css" href="resources/themes/default/styles/', cssFile.replace(/^(.*?)\\(?=[^\\]+$)/, ""), '" />'].join("") : "";
			})
			.replace(/[ \f\t\v]*<script\s+[^>]*?src="(?!https?:)([^"]+\.js)"[^>]*?>[\s\S]*?<\/script>[ \f\t\v]*/ig, function(all, value) {
				var filename = sourceDir + value.replace(/\//g, "\\");
				jsContent.push(readFileText(filename));
				return jsContent.length == 1 ? ['\t\t<script src="', jsFile.replace(/^(.*?)\\(?=[^\\]+$)/, ""), '"></script>'].join("") : "";
			})
			.replace(/[ \f\t\v]*<!--\s*\w+\s+(start|end)\s*-->[ \f\t\v]*/ig, "", "")
			.replace(/\s*\n(?=\s*\n)/g, "");
		writeFileText(cssFile, styleContent.join("\n").replace(/[ \f\t\v]*\/\*\s*debug\s+start\s*\*\/[\s\S]*?\/\*\s*debug\s+end\s*\*\/[ \f\t\v]*/ig, ""));
		writeFileText(jsFile, jsContent.join("\n").replace(/[ \f\t\v]*\/\*\s*debug\s+start\s*\*\/[\s\S]*?\/\*\s*debug\s+end\s*\*\/[ \f\t\v]*/ig, ""));
		

		content = tpl(content);
	

		writeFileText(destFile, content);
	}

	process(WScript.Arguments(0), WScript.Arguments(1), WScript.Arguments(2), WScript.Arguments(3));
})();