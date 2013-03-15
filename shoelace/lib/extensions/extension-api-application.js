/**
 * @author lixuejian
 */
application.Core.registerExtension("ExApplicationAPI", function(sandbox) {
	return {
		/**
		 * 添加一个应用
		 * @param {ApplicationItem} details
		 * @param {Function} callback
		 * http://fe.baidu.com/doc/a/boss/api/application.text#Create
		 */
		create: function(details, callback) {
			bdbrowser.application.create(details, callback);
		},
		/**
		 * 更新一个应用
		 * @param {ApplicationItem} details
		 * @param {Function} callback
		 * http://fe.baidu.com/doc/a/boss/api/application.text#update
		 */
		update: function(details, callback) {
			bdbrowser.application.update(details, callback);
		},
		/**
		 * 移除一个应用
		 * @param {Object} details
		 * @param {Object} callback
		 * http:http://fe.baidu.com/doc/a/boss/api/application.text#Remove
		 */
		remove: function(details, callback) {
			bdbrowser.application.remove(details, callback);
		},
		/**
		 * 搜索安装的应用
		 * @param {Object} details
		 * @param {Object} callback
		 * http://fe.baidu.com/doc/a/boss/api/application.text#Search
		 */
		search: function(details, callback) {
			bdbrowser.application.search(details, callback);
		},
		/**
		 * 调用添加收藏的对话框
		 * @param {Object} details
		 * @param {Object} callback
		 * http://fe.baidu.com/doc/a/boss/api/application.text#search
		 */
		checkInstalled: function(details, callback) {
			bdbrowser.application.checkInstalled(details, callback);
		},
		/**
		 * 添加应用和删除应用时触发事件
		 */
		addListener: function(event, callback) {
			switch (String(event).toLocaleLowerCase()) {
				case "created":
					bdbrowser.application.onCreated.addListener(callback);
					break;
				case "removed":
					bdbrowser.application.onRemoved.addListener(callback);
					break;
				case "opened":
					bdbrowser.application.onOpen.addListener(callback);
					break;
				case "closed":
					bdbrowser.application.onClose.addListener(callback);
					break;
				case "sync":
					bdbrowser.application.onSync.addListener(callback);
					break;
				case "flushapp":
					bdbrowser.application.onFlushApp.addListener(callback);
					break;
			}
		},
		/**
		 * 在新TAB或新窗口中打开页面
		 * @param {Object} info
		 * @param {Function} callback
		 */
		openPage: function(info, callback) {
			bdbrowser.global.openPage(info, callback);
		},
		/**
		 * 打开应用
		 * @param {Object} info
		 * @param {Function} callback
		 * http://fe.baidu.com/doc/a/boss/api/application.text#openApp
		 */
		openApp: function(info, callback) {
			bdbrowser.application.openApp(info, callback);
		},
		/**
		 * 关闭应用
		 * @param {Object} info
		 * @param {Function} callback
		 * http://fe.baidu.com/doc/a/boss/api/application.text#closeApp
		 */
		closeApp: function(info, callback) {
			bdbrowser.application.closeApp(info, callback);
		},
		/**
		 * logo闪烁 
		 * @param {Object} params
		 * @param {Object} callback
		 */
		alert: function(params, callback) {
			bdbrowser.application.alert(params, callback);
		},
		
		/**
		 * 聚焦桌面选项卡(tab)
		 */
		openAppPage: function(callback){
			bdbrowser.global.openAppPage(callback);
		},
		
		/**
		 * 数据统计 
		 * @param {Object} params
		 * @param {Object} callback
		 */
		report: function(params, callback) {
			bdbrowser.global.report(params, callback);
		},
		
		/**
		 * 获取同步状态信息
		 * @param {Object} params
		 * @param {Object} callback
		 */
		getSyncInfo: function(params, callback){
			bdbrowser.application.getSyncInfo(params, callback);	
		},
		
		/**
		 * 获取单一id对应的app信息
		 * @param {Object} params
		 * @param {Object} callback
		 */
		getAppById: function(params, callback){
			bdbrowser.application.getAppById(params, callback);	
		},
	};
});