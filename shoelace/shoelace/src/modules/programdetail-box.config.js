/**
 * @author ShiChunhua
 */
application.Core.addConfig("ProgramDetailBox", {
	boxId: 'programDetailBox'
	,infoBoxId: 'programDetailInfo'
	,addButtonId: 'addButton'
	,shareButtonId: 'shareButton'
	,commendBoxId: 'commentListBox'
	
	,infoHTML: '<div class="infoChannel">#{channel}</div><div class="infoProgram">#{program}</div><div class="infoTime">#{time}</div>'
	
	,noCommentHTML: '<div class="item">此节目还没有人参与评论</div>'
	,resultTitleHTML: '<div class="title">#{title}</div>'
	,resultItemHTML: '<div class="item"><div class="nickname">#{nickname}</div><div class="nicktime">#{time}</div><div class="commentText">#{text}</div></div>'
});
