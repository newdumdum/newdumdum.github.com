(function () {
	var console = {
		log: function (info) {
			WScript.StdOut.WriteLine(info);
		}
	};
	
	var shell = new ActiveXObject("WScript.Shell");
	var installDir = shell.RegRead("HKEY_LOCAL_MACHINE\\SOFTWARE\\Baidu\\BaiduBrowser\\installDir");
	function process(sourceDir) {
		if (!sourceDir) return;
		shell.Run(['cmd /c xcopy "', sourceDir,'\\*.*" "', installDir, '\\resource\\extension" /e/r/y/i'].join(""), 5, true); // ִ�в��ȴ�
	}

	if (installDir) process(WScript.Arguments(0)); else console.log("û�а�װ�ٶ��������");
})();