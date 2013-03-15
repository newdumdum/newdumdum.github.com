/**
 * @author ShiChunhua
 */
application.Core.addConfig("ChannelBox", {
	boxId: 'channalContentBox'
	,tabId: 'channalType'
	,resultBoxId: 'channelListBox'
	,typeInfo: {
		'all': '所有频道'
		,'center': '央视频道'
		,'local': '本地频道'
	}
	,resultTitleHTML: '<div class="tablelist"><div class="title">#{title}</div>'
	,resultItemHTML: '<div class="item" data-item="table" data-channelId="#{channelId}"  data-channelName="#{channel}" data-boxId="channalContentBox" data-boxName="频道" data-event="ProgramBox-ShowChannelProgram">#{text} <span class="arrow"></span></div>'
	
	,emptyResult: '无对应结果'
});
