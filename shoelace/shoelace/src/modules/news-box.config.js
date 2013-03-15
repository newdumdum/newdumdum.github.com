/**
 * @author ShiChunhua
 */
application.Core.addConfig("NewsBox", {
	boxId: 'newsBox'
	,resultBoxId: 'newsListBox'
	,emptyResult: '暂无推荐信息'
	
	,sectionHTML: '<div class="section"><div class="dateBox"><div class="day">#{day}</div><div class="month">#{month}月</div><div class="year">#{year}</div></div><div class="newsItemBox">#{news}</div></div>'
	,itemHTML: '<div class="newsItem" data-item="table" data-event="NewsBox-ShowNewsDetail" data-link="#{link}">#{text} <span class="arrow"></span></div>'
});
