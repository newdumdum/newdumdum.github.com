/**
 * @author ShiChunhua
 */
application.Core.addConfig("FavorateBox", {
	boxId: 'favorateBox'
	,resultBoxId: 'favorateListBox'
	
	,resultTitleHTML: '<div class="tablelist"><div class="title">#{title}</div>'
	,resultProgramItemHTML: '<div class="item" data-item="table" data-channelId="#{channelId}"  data-channelName="#{channel}" data-programName="#{programName}" data-boxId="favorateBox" data-programId="#{programId}" data-programTime="#{time}" data-event="ProgramDetailBox-ShowProgram"><span class="rowA">#{text}</span><span class="rowB">#{time}</span><span class="arrow"></span></div>'
	
	,emptyResult: '无对应结果'
});
