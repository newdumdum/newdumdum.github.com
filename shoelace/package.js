(function () {
	var console = {
		log: function (info) {
			WScript.StdOut.WriteLine(info);
		}
	};
	var ForReading = 1,
		ForWriting = 2,
		ForAppending = 3;
	var TristateUseDefault = -2,
		TristateTrue = -1,
		TristateFalse = 0;
	var fso = new ActiveXObject("Scripting.FileSystemObject");

	function readFileText(filename) {
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
		var adostream = new ActiveXObject("ADODB.Stream");
		adostream.Type = 2; //TextStreamType;
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
	
	function process(path) {
		if (fso.FolderExists(path))
			return processDirectory(path);
		return ProcessFile(path);
	}

	function processDirectory(path) {
		var folder = fso.GetFolder(path);
		if (folder.attributes & 2) return; //don't process invisible folders
		var subfolderEnumerator = new Enumerator(folder.SubFolders);
		var filesEnumerator = new Enumerator(folder.Files);

		for (; !filesEnumerator.atEnd(); filesEnumerator.moveNext()) {
			processFile(filesEnumerator.item().Path);
		}

		for (; !subfolderEnumerator.atEnd(); subfolderEnumerator.moveNext()) {
			processDirectory(subfolderEnumerator.item().Path);
		}
	}

	function processFile(path) {
		if (!/\.(html?|css|js)$/i.test(path)) return; // 非代码文件
		console.log("Processing: " + path);
		var content = readFileText(path);
		var newContent = content.replace(/\{=include\s+(.*?)\s*=\}/g, function (all, path) {
			console.log("readfile: " + path);
			return readFileText(path);
		});
		if (content !== newContent) {
			writeFileText(path, newContent);
		}
	}
	var path = WScript.Arguments(0);
	if (path) process(path);
})();