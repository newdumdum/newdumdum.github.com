/**
 * @author ShiChunhua
 */
application.Core.addConfig("SearchBox", {
	boxId: 'searchContentBox'
	,tabId: 'searchType'
	,resultBoxId: 'searchResult'
	,typeInfo: {
		'channel': '频道'
		,'program': '节目'
	}
	,resultTitleHTML: '<div class="tablelist"><div class="title">#{title}</div>'
	,resultItemHTML: '<div class="item" data-item="table" data-searchbox="searchBox" data-channelId="#{channelId}"  data-channelName="#{channel}" data-boxId="searchContentBox" data-boxName="搜索" data-event="ProgramBox-ShowChannelProgram">#{text} <span class="arrow"></span></div>'
	,resultProgramItemHTML: '<div class="item" data-item="table" data-channelId="#{channelId}"  data-channelName="#{channel}" data-searchbox="searchBox" data-programName="#{programName}" data-programTime="#{time}" data-boxId="searchContentBox" data-programId="#{programId}" data-event="ProgramDetailBox-ShowProgram"><span class="rowA">#{text}</span><span class="rowB">#{time}</span><span class="arrow"></span><span class="button" data-channelId="#{channelId}"  data-channelName="#{channel}" data-boxId="searchContentBox" data-boxName="搜索" data-searchbox="searchBox" data-event="ProgramBox-ShowChannelProgram">#{channel}</span></div>'
	
	,emptyResult: '无对应结果'
});
