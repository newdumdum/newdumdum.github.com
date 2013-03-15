/**
 * @author ShiChunhua
 */
application.Core.addConfig("HomeBox", {
	mainBoxId: 'mainBox'
	,searchBoxId: 'searchBox'
	,searchTextId: 'searchText'
	,defaultValue: '搜索'
	,clearButtonId: 'searchClearButton'
	,blockBoxId: 'blockBox'
	
	,widgetInfo: [
		/*{
			image: {'background-position':'0px -166px'}
			,className: 'activity'
			,title: '提醒'
			,id: 'activity'
			,command: 'ActivityBox-ShowList'
		},*/
		{
			image: {'background-position':'-140px -96px'}
			,className: 'label'
			,title: '分类'
			,id: 'label'
			,command: 'LabelBox-ShowList'
		},
		{
			image: {'background-position':'-70px -166px'}
			,className: 'queue'
			,title: '收藏'
			,id: 'favorate'
			,command: 'FavorateBox-ShowList'
		},
		{
			image: {'background-position':'0px -96px'}
			,className: 'now'
			,title: '当前'
			,text: new Date().getUTCDate()
			,id: 'now'
			,command: 'NowBox-ShowList'
		},
		{
			image: {'background-position':'-70px -96px'}
			,className: 'shows'
			,title: '频道'
			,id: 'channel'
			,command: 'ChannelBox-ShowList'
		},
		{
			image: {'background-position':'-140px -96px'}
			,className: 'news'
			,title: '推荐'
			,id: 'news'
			,command: 'NewsBox-ShowList'
		}
	]
});
