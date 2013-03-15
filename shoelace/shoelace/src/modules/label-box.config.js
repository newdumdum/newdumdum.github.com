/**
 * @author ShiChunhua
 */
application.Core.addConfig("LabelBox", {
	boxId: 'labelBox'
	,resultBoxId: 'labelListBox'
	
	,resultLabelHTML: '<div class="labelItem" data-item="table" data-boxName="分类" data-id="#{id}" data-channelName="#{name}" data-name="#{name}" data-boxId="labelBox" data-event="ProgramBox-ShowChannelProgram">#{name}</div>'
	
	,emptyResult: '无对应结果'
});
