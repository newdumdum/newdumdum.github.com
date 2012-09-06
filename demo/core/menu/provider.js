/**
 * @author ShiChunhua
 * @fileoverview 菜单源数据
 * 说明 :
 * 	{
 * 		'width': // 对应到同级items属性下的菜单的宽度
 * 		'items': // 菜单项
 * 				[
 * 					//  文字类菜单项
 * 					{
 * 						'text': //'显示文字'
 * 						[,'icon':] // 对应的icon 规格为16x16 的gif或浏览器可正常显示的其它格式图片
 * 						[,'disabled':] // 如果值为'1'  表示该项菜单不可用 (默认可用)
 * 						[,'handler':] // 点击时要执行的方法, 如果此项菜单可用, 则会执行handler
 * 						[,'href':] // 此项菜单对应的链接(协议)地址  默认为'###'
 * 						[,'items':] // 如果该项菜单下有子菜单, 请扩展此属性, 结构与父级items类似
 * 						[,'width':] // 如果此项菜单有items属性, 则需要加上width属性, 以确定对应子菜单宽度
 * 
 * 						[,'这里可以扩展任意多个任何你喜欢的属性':] // 在菜单项被点击的时候, 会执行menu.onclick (优先于handler执行), 并回传给你这个菜单项对应的JSON数据(当然包括此项...) 
 * 																// 注:要扩展实例后的ace.ui.Menu,  
 * 																// 如:var menu = new ace.ui.Menu(dataProv); menu.onclick = function(data){alert(JSON.stringify(data));}
 * 					},
 * 					// 间隔线
 * 					{
 * 						'splitLine': true
 * 					}
 * 				]
 * 	}
 */
var menuData = {
	'width': 150,
	'items':[
		{
			'text': '菜单长点又如何...?',
			'disabled': '1',
			'icon': 'icons/01957.gif'
		},
		{
			'text': 'alert("菜单")',
			'handler': function(){
				alert("菜单");
			},
			'href': '###',
			'attrs': [
				{
					'_moreAtt': '可加属性地菜单'
				}
			],
			'icon': 'icons/00023.gif'
		},
		{
			'splitLine': true
		},
		{
			'text': '发送邮件',
			'href': 'mailto:shichunhua@baidu.com',
			'icon': 'icons/09553.gif'
		},
		{
			'text': '发送邮件2',
			'handler': function(){
				var win = window.open('mailto:shichunhua@baidu.com');
				try {
					win.close();
				}catch(ex){}
			},
			'icon': 'icons/09553.gif'
		},
		{
			'text': '颜色',
			'width': 70,
			'items':[
				{
					'text':'黄色',
					'icon': 'icons/06854.gif'
				},
				{
					'text':'绿色',
					'icon': 'icons/06852.gif'
				},
				{
					'text':'蓝色',
					'icon': 'icons/06851.gif'
				},
				{
					'text':'粉色',
					'icon': 'icons/06850.gif'
				},
				{
					'text':'青色',
					'icon': 'icons/06858.gif'
				},
				{
					'text':'灰色',
					'icon': 'icons/06853.gif'
				},
				{
					'splitLine': true
				},
				{
					'text': '其它',
					'icon': 'icons/07879.gif',
					'width': 130,
					'items': [
						{
							'text': '你喜欢啥颜色',
							'icon': 'icons/01691.gif'
						},
						{
							'text': '自己填写么...',
							'icon': 'icons/09151.gif'
						},
						{
							'text': '不写? 算了',
							'icon': 'icons/00442.gif'
						}
					]
				}
			],
			'icon': 'icons/06862.gif'
		},
		{
			'text': '还能更多',
			'width': 140,
			'icon': 'icons/09582.gif',
			'items': [
				{
					'text': '多了还有意思么?',
					'icon': 'icons/00429.gif'
				},
				{
					'text': '你说呢',
					'width': 90,
					'icon': 'icons/01122.gif',
					'items': [
						{
							'text': '第3级?',
							'width': 175,
							'icon': 'icons/07007.gif',
							'items': [
								{
									'text': '咋地,有疑问噢?',
									'icon': 'icons/07133.gif'
								},
								{
									'text': '这都第4级了耶',
									'icon': 'icons/07176.gif'
								},
								{
									'text': '你还可以无限级别的玩...',
									'icon': 'icons/00206.gif',
									'width': 100,
									'items': [
										{
											'text': '写得太多了',
											'icon': 'icons/00003.gif'
										}
									]
								}
							]
						}
					]
				},
				{
					'text': '应该还行吧?',
					'icon': 'icons/02619.gif'
				},
				{
					'text': '我看行',
					'icon': 'icons/00178.gif'
				}
			]
		},
		{
			'text': '新建',
			'icon': 'icons/00137.gif'
		},
		{
			'text': '修改',
			'icon': 'icons/06125.gif'
		},
		{
			'text': '删除',
			'icon': 'icons/03265.gif'
		},
		{
			'text': '截屏',
			'icon': 'icons/00280.gif'
		},
		{
			'text': 'Magic?',
			'icon': 'icons/00645.gif'
		},
		{
			'text': '属性',
			'icon': 'icons/06376.gif'
		},
		{
			'text': '锺子',
			'icon': 'icons/07728.gif',
			'width': 120,
			'items': [
				{
					'text': '不可用的测试',
					'icon': 'icons/07994.gif',
					'width': 75,
					'disabled': '1',
					'items': [
						{
							'text': '白泡泡',
							'icon': 'icons/09002.gif'
						},
						{
							'text': '黄泡泡',
							'icon': 'icons/07493.gif'
						}
					]
				}
			]
		}
	]
}
