/**
 * @author ShiChunhua
 */
application.Core.addConfig("NowBox", {
	boxId: 'nowContentBox'
	,resultBoxId: 'nowListBox'
	,dateBoxId: 'nowDateBox'
	,tipBoxId: 'nowDateTipBox'
	,tipContentId: 'nowDateTipCotent'
	,titleName: '当前'
	,resultTitleHTML: '<div class="tablelist"><div class="title">#{title}</div>'
	,resultProgramItemHTML: '<div class="item" data-item="table" data-channelId="#{channelId}"  data-channelName="#{channel}" data-programName="#{programName}" data-programTime="#{time}" data-boxId="nowContentBox" data-programId="#{programId}" data-event="ProgramDetailBox-ShowProgram"><span class="rowA">#{text}</span><span class="rowB">#{time}</span><span class="arrow"></span><span class="button" data-channelId="#{channelId}"  data-channelName="#{channel}" data-boxId="nowContentBox" data-boxName="当前" data-event="ProgramBox-ShowChannelProgram">#{channel}</span></div>'
	
	,emptyResult: '无对应结果'
	,singleWidth: 22
	,marginLeft: 10
});
