/**
 * @author ShiChunhua
 */
application.Core.registerExtension("ExApplicationAPI", function(sandbox) {
	var uid = 0, lib = sandbox.getLib();

	return {
		/**
		 * 搜索安装的应用
		 * @param {Object} details
		 * @param {Object} callback
		 * http://fe.baidu.com/doc/a/boss/api/application.text#Search
		 */
		search : function(query, callback) {
			//bdbrowser.application.search(query, callback);
			var list = [{
				"id" : "1",
				"name" : "百度一下",
				"digest" : "百度是全球最大的中文搜索引擎。百度一下，你就知道",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/9718ed79b77e569fd5066013adb983ca.png",
				"type" : "web",
				"message" : 0,
				"href" : "http://www.baidu.com"
			}, {
				"id" : "2",
				"name" : "我的上网主页",
				"digest" : "hao123网址之家——最专业权威的上网导航。及时收录包括音乐、视频、小说、游戏等热门分类的优秀网站，与搜索完美结合，提供最简单便捷的网上导航服务，是数千万网民的上网主页。精彩网络生活，从hao123开始。",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/ee901031539644c59cfd5eb3f6467ff6.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://hao123.com"
			}, {
				"id" : "8",
				"name" : "百度文库",
				"digest" : "在线互动式文档分享平台，在这里，您可以和千万网友分享自己手中的文档，全文阅读其他用户的文档，同时，也可以利用分享文档获取的积分下载文档",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/201108181355320664.png",
				"type" : "web",
				"message" : 0,
				"href" : "http://wenku.baidu.com"
			}, {
				"id" : "100050",
				"name" : "PPTV直播",
				"digest" : "PPTV网络电视是PPLive旗下媒体，一款全球安装量最大的网络电视，支持对海量高清影视内容的“直播+点播”功能。",
				"image" : "http://apps.bdimg.com/store/static/kvt/66ba4e39ccda5d26955e627f9e3ca802.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://xapp.baidu.com/bapps/sandbox/app.html?appid=100050"
			}, {
				"id" : "100996",
				"name" : "黄金矿工",
				"digest" : "经典的黄金矿工小游戏。",
				"image" : "http://apps.bdimg.com/store/static/kvt/0ac85eca2ab05a65952e7a13062b643e.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://xapp.baidu.com/bapps/sandbox/app.html?appid=100996"
			}, {
				"id" : "100998",
				"name" : "合金弹头无敌版",
				"digest" : "精彩的合金弹头游戏，让我们继续战斗！",
				"image" : "http://apps.bdimg.com/store/static/kvt/5bc91cb5ad2729e5cd2b8c05ea2724e1.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://xapp.baidu.com/bapps/sandbox/app.html?appid=100998"
			}, {
				"id" : "101016",
				"name" : "魂斗罗双打",
				"digest" : "经典的魂斗罗游戏",
				"image" : "http://apps.bdimg.com/store/static/kvt/4a5bd6644fb76418439118d4fe9e575b.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://xapp.baidu.com/bapps/sandbox/app.html?appid=101016"
			}, {
				"id" : "101138",
				"name" : "姓名测试打分",
				"digest" : "全面测试分析名字得出文化印象、五行、生肖、五格评分",
				"image" : "http://apps.bdimg.com/store/static/kvt/c13580e8d9d9d9f590cc636e95fd94af.gif",
				"type" : "web",
				"message" : 0,
				"href" : "http://xapp.baidu.com/bapps/sandbox/app.html?appid=101138"
			}, {
				"id" : "101283",
				"name" : "身份证号码查询",
				"digest" : "根据身份证号码查询所属的地区、出生日期、性别等资料",
				"image" : "http://apps.bdimg.com/store/static/kvt/da21da795b6cd07ca9b63d96a4bf3706.gif",
				"type" : "web",
				"message" : 0,
				"href" : "http://xapp.baidu.com/bapps/sandbox/app.html?appid=101283"
			}, {
				"id" : "101371",
				"name" : "中国象棋",
				"digest" : "中国象棋 小游戏，棋力不错哦，来挑战电脑吧",
				"image" : "http://apps.bdimg.com/store/static/kvt/659bb56f3b719de7a47dd523941644e6.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://xapp.baidu.com/bapps/sandbox/app.html?appid=101371"
			}, {
				"id" : "101447",
				"name" : "Fiano在线钢琴",
				"digest" : "和idreampiano3.0兼容的在线钢琴",
				"image" : "http://apps.bdimg.com/store/static/kvt/49ecfda8dd0433acb3625b5870886a96.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://xapp.baidu.com/bapps/sandbox/app.html?appid=101447"
			}, {
				"id" : "101689",
				"name" : "QQ空间",
				"digest" : "QQ空间（Qzone）是腾讯公司于2005年开发出来的一个个性空间，具有博客(blog)的功能，自问世以来受到众多人的喜爱。",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/e28c9d7a38d9b795841e8e81b6bb93a8.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://qzone.qq.com"
			}, {
				"id" : "101690",
				"name" : "hao123电视导航",
				"digest" : "最新，最好看的高清电视剧排行榜。韩剧、偶像剧、香港TVB电视剧、日剧高清在线观看，尽在hao123电视剧排行榜。",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/aa44298c172b2919a0131a63569a81a9.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://tv.hao123.com"
			}, {
				"id" : "101691",
				"name" : "东方财富网",
				"digest" : "东方财富网，中国最具影响力的互联网财经媒体，提供全方位的综合财经新闻和金融市场资讯，覆盖股票、财经、证券、金融、港股、行情、基金、债券、期货、外汇、保险、银行、博客、股吧、论坛",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/4c27660c7a49ac070107b21959aa1daf.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://eastmoney.com"
			}, {
				"id" : "101692",
				"name" : "起点中文小说网",
				"digest" : "小说阅读,精彩小说尽在起点小说。起点小说提供玄幻小说,武侠小说,原创小说,穿越小说,网游小说,都市小说,言情小说,历史小说,军事小说,网游小说,科幻小说,恐怖小说,首发小说最新章节免费小说阅读,精彩尽在起点小说！热门小说:斗破苍穹,天珠变,吞噬星空,异世药神,凡人修仙传。",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/565fb30ffb26e7c6614009409bae0824.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://qidian.com"
			}, {
				"id" : "101693",
				"name" : "人人网",
				"digest" : "人人网校内是一个真实的社交网络，联络你和你周围的朋友。加入人人网校内你可以:联络朋友，了解他们的最新动态；和朋友分享相片、音乐和电影；找到老同学，结识新朋友；用照片和日志记录生活,展示自我。",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/01d07f401ed956522198c9d9de32dec2.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://renren.com"
			}, {
				"id" : "101695",
				"name" : "淘宝网",
				"digest" : "淘宝网-亚洲最大、最安全的网上交易平台，提供各类服饰、美容、家居、数码、话费/点卡充值…8亿优质特价商品，同时提供担保交易(先收货后付款)、先行赔付、假一赔三、七天无理由退换货、数码免费维修等安全交易保障服务，让你全面安心享受网上购物乐趣！",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/b634a5fb6b3629f601fb9372b8fe486e.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://taobao.com"
			}, {
				"id" : "101696",
				"name" : "天涯社区",
				"digest" : "天涯社区，以“全球最具影响力的论坛”闻名于世，并提供博客、相册、个人空间等服务。",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/07188f39930311386cedd16dad5ac9b0.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://tianya.cn"
			}, {
				"id" : "101697",
				"name" : "4399小游戏",
				"digest" : "4399是中国最大的小游戏专业网站,免费为你提供各种小游戏,包括双人小游戏,最新小游戏,动作小游戏,小游戏大全,冒险小游戏,过关游戏,赛尔号小游戏,地下城DNF游戏,赛车游戏,拳皇游戏,战斗机游戏等等。",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/d1d5ed731f12d22cb9bf297b22ac86d4.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://4399.com"
			}, {
				"id" : "101699",
				"name" : "一听音乐网",
				"digest" : "一听音乐网是中国最大的在线音乐网站，提供免费歌曲在线试听、下载。一听音乐网拥有庞大、完整的曲库，歌曲更新迅速，试听流畅，口碑极佳。",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/96ec5c60a01099a2d5ea4739ebca7f65.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://1ting.com"
			}, {
				"id" : "101700",
				"name" : "优酷",
				"digest" : "优酷-中国第一视频网站,提供视频播放,视频发布,视频搜索-视频服务平台,提供视频播放,视频发布,视频搜索,视频分享-优酷视频。",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/8a9446f8dd0934f7aa3195444d065812.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://www.youku.com"
			}, {
				"id" : "101701",
				"name" : "新浪微博",
				"digest" : "新浪微博是一个由新浪网推出，提供微型博客服务的类Twitter网站。",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/8fbd3faf3d7cc79adccf266502819263.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://weibo.com"
			}, {
				"id" : "101705",
				"name" : "奇艺高清影视",
				"digest" : "“奇艺高清影视”是百度旗下视频网站“奇艺”（www.qiyi.com） 提供的一款免费高清视频在线观看应用。内容丰富多元，节目持续更新，内容播放清晰流畅，操作界面简单友好，真正为用户带来“悦享品质”的观映体验。",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/201108121634430428.png",
				"type" : "web",
				"message" : 0,
				"href" : "http://www.qiyi.com/mini/baidu.html"
			}, {
				"id" : "101707",
				"name" : "58同城",
				"digest" : "58同城北京分类信息网，为你提供房产、车辆、招工、兼职、黄页等海量北京分类信息，满足您不同的北京免费发布信息需求。北京58同城，最好的北京分类信息网。",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/218b0f755b7dc3170198f21a5ece0866.png",
				"type" : "web",
				"message" : 0,
				"href" : "http://58.com"
			}, {
				"id" : "101710",
				"name" : "新华网",
				"digest" : "新华网由中华人民共和国官方通讯社新华社主办，为中国最重要的官方网站之一。",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/3458fa0cd2f16d8842b4258cd91b00b1.png",
				"type" : "web",
				"message" : 0,
				"href" : "http://xinhuanet.com"
			}, {
				"id" : "101718",
				"name" : "联合早报网",
				"digest" : "联合早报网是海外最重要的权威新闻网站，以第三只眼看大中华，客观新闻和深度评析是众多亚太区读者的最爱。",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/default_app_icon.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://zaobao.com"
			}, {
				"id" : "101734",
				"name" : "网易新闻",
				"digest" : "新闻,新闻中心,包含有时政新闻,国内新闻,国际新闻,社会新闻,时事评论,新闻图片,新闻专题,新闻论坛,军事,历史,的专业时事报道门户网站。",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/c217f285eb067061e31b6769db7672f4.png",
				"type" : "web",
				"message" : 0,
				"href" : "http://news.163.com"
			}, {
				"id" : "101735",
				"name" : "凤凰资讯",
				"digest" : "凤凰网资讯、凤凰网新闻24小时提供大陆、台湾、香港、国际重大新闻资讯，每天发布财经、房产、汽车、军事、历史、文化、教育、娱乐、时尚、亲子等数万条新闻。",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/c23cb91e28540bf120c96780829055cc.png",
				"type" : "web",
				"message" : 0,
				"href" : "http://news.ifeng.com"
			}, {
				"id" : "101736",
				"name" : "新浪新闻",
				"digest" : "新浪网新闻中心是新浪网最重要的频道之一，24小时滚动报道国内、国际及社会新闻。",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/xinlangxinwen.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://news.sina.com.cn"
			}, {
				"id" : "101737",
				"name" : "搜狐新闻",
				"digest" : "搜狐,中国最大的门户网站,是中国一家领先的门户网站，搜狐新闻已成为主流人群获取资讯的最大的平台。",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/201108091046200135.png",
				"type" : "web",
				"message" : 0,
				"href" : "http://news.sohu.com"
			}, {
				"id" : "101755",
				"name" : "开心网",
				"digest" : "开心网是一个在线社区,通过它您可以与朋友、同学、同事、家人保持更紧密的联系,及时了解他们的动态;与他们分享你的照片、心情、快乐。",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/9d4d7b96c5e975714bd57f88712f8883.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://kaixin001.com"
			}, {
				"id" : "101762",
				"name" : "腾讯微博",
				"digest" : "腾讯微博是一个由腾讯推出，提供微型博客服务的类Twitter网站。",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/d755e8b0877e9426e7a1d6f4b2ce38d8.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://t.qq.com"
			}, {
				"id" : "101773",
				"name" : "西祠胡同",
				"digest" : "西祠胡同始建于1998年，是华语地区第一个大型综合社区网站，经多年积累和发展，西祠已成为最重要的华人社区门户网站。",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/201108221711300585.png",
				"type" : "web",
				"message" : 0,
				"href" : "http://xici.net"
			}, {
				"id" : "101779",
				"name" : "豆瓣",
				"digest" : "提供图书、电影、音乐唱片的推荐、评论和价格比较，以及城市独特的文化生活。",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/201108181703330811.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://douban.com"
			}, {
				"id" : "101791",
				"name" : "百度MP3",
				"digest" : "在百度MP3，您可以便捷地找到最新、最热的歌曲，更有丰富、权威的音乐排行榜，指引华语音乐的流行方向。音乐掌门人是强大的音乐分享平台，用户可以发布个性专辑，分享音乐体验。",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/201107191701090058.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://mp3.baidu.com"
			}, {
				"id" : "101798",
				"name" : "音悦台",
				"digest" : "音悦台是国内最大的高清MV音乐分享平台，也是国内最大的音乐MV视频媒体平台；提供最新、最快、最高清的MV视频资讯，并提供不同格式的高清MV下载，只为让好歌与你随身而行。",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/c88c00b289ff14ebbaa8ee3baf84c3b3.png",
				"type" : "web",
				"message" : 0,
				"href" : "http://yinyuetai.com"
			}, {
				"id" : "101808",
				"name" : "土豆网",
				"digest" : "土豆网是你会喜欢的个人视频网站，免费无限空间，上传你的视频，观看和搜索海量视频节目，收藏你喜欢的视频，订阅你关注的播客，简单方便地分享给你的朋友们。",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/59fe03504516bcc90ed2ca5106dc2375.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://tudou.com"
			}, {
				"id" : "101809",
				"name" : "酷6网",
				"digest" : "酷6网是国内最大的视频分享网站，也是中国最大的视频媒体平台，免费提供视频播客、视频分享、视频搜索等服务，可在线观看最新、最热的视频，凭借内容最全、速度最快、视觉最好三大特色，在国内网络视频领域独树一帜。",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/03f06bdedeb28fa4701c31411e1ed99d.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://ku6.com"
			}, {
				"id" : "101810",
				"name" : "迅雷看看",
				"digest" : "中国第一高清影视视频门户，提供电影、电视剧、综艺、动漫、新片、大片免费超清在线点播、下载，中国最大最全的正版影视发行平台。",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/ff80e56e5eaf564ee089d2e53b1d1830.png",
				"type" : "web",
				"message" : 0,
				"href" : "http://xunlei.com"
			}, {
				"id" : "101811",
				"name" : "56我乐",
				"digest" : "56.com拥有数量巨大的原创视频库、及完整影视库，从观看视频、上传视频、到分享视频都拥有极佳的用户体验。",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/ac631771572fb418312ba7a0e5aa9d4a.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://56.com"
			}, {
				"id" : "101812",
				"name" : "中国网络电视台",
				"digest" : "中国网络电视台（英文简称CNTV），是中国国家网络电视播出机构，是以视听互动为核心、融网络特色与电视特色于一体的全球化、多语种、多终端的公共服务平台。",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/9b3635fab755eb914a7b70659d1b61f8.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://cntv.cn"
			}, {
				"id" : "101859",
				"name" : "携程旅行网",
				"digest" : "携程旅行网是中国领先的在线旅行服务公司，向超过1400万会员提供集酒店预订、机票预订、度假预订、商旅管理、特惠商户及旅游资讯在内的全方位旅行服务。",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/5546f56f131e75da4469b4038f4db9c3.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://ctrip.com"
			}, {
				"id" : "101860",
				"name" : "去哪儿旅游搜索",
				"digest" : "去哪儿(Qunar.com)提供机票,特价机票,打折机票的购买全攻略，99元春秋航空特惠折扣机票，百元南航、海航惊喜特价机票任您挑选,国航、深航1折特价机票和折扣机票一网打尽，更多打折机票尽在Qunar.com。同时搜索携程,艺龙等上百家旅游预订网站机票报价和航空公司直销机票价格，为您找到最实惠的特价机票信息,是你找到特价机票和机票预定的最佳途径，45天机票价格趋势图和特价机票邮件预约是您出行好助手",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/d94083f7ee28e50a074fdbc45bd5fc7c.png",
				"type" : "web",
				"message" : 0,
				"href" : "http://qunar.com"
			}, {
				"id" : "101870",
				"name" : "搜房房地产",
				"digest" : "搜房房地产网是中国最大的房地产家居网络平台，提供全面及时的房地产新闻资讯内容，为所有楼盘提供网上浏览、业主论坛和社区网站，房地产精英人物个人主页，是国内房地产媒体及业内外网友公认的全球最大的房地产网络平台，搜房引擎给网友提供房地产网站中速度快捷内容全面的智能搜索。",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/7a29bf4dd3545ee9d76e54acd7f79b55.png",
				"type" : "web",
				"message" : 0,
				"href" : "http://soufun.com"
			}, {
				"id" : "101872",
				"name" : "赶集网",
				"digest" : "赶集网是中国最大最全的分类信息网站，提供免费发布信息，查阅信息服务。寻找最新最全的房屋出租、二手房、二手车、二手物品交易、求职招聘等生活信息，请到赶集网ganji.com",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/default_app_icon.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://ganji.com"
			}, {
				"id" : "101877",
				"name" : "汽车之家",
				"digest" : "汽车之家为您提供最新汽车报价，汽车图片，汽车价格大全，最精彩的汽车新闻、行情、评测、导购内容，是提供信息最快最全的中国汽车网站。",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/6fa6c81295937f7a7078ddeee4bd5c2a.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://autohome.com.cn"
			}, {
				"id" : "101885",
				"name" : "驾校一点通",
				"digest" : "驾校一点通官方网站：全国驾校查询，直观对比驾校的服务、学车价格，位置等。驾校一点通还提供汽车陪练、驾校一点通模拟考试，驾驶员模拟考试，学车视频等。",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/fbc83679ce2795293a7efd6665ad60a8.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://jxedt.com"
			}, {
				"id" : "101919",
				"name" : "美食天下",
				"digest" : "美食天下，美食中国，中国美食门户,家常菜谱美食博客最具人气美食网站",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/4e7e751a0dde56df939349793d38546f.png",
				"type" : "web",
				"message" : 0,
				"href" : "http://meishichina.com"
			}, {
				"id" : "101924",
				"name" : "大众点评网",
				"digest" : "中国城市消费指南餐馆美食、购物、休闲娱乐、生活服务、活动优惠打折信息。大众点评网是中国第一家也是领先的web2.0式的本地搜索门户。商户的信息和评价全部由会员共同管理和维护。",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/2dfce9cd191df068348fadb2e72b4943.png",
				"type" : "web",
				"message" : 0,
				"href" : "http://dianping.com"
			}, {
				"id" : "101972",
				"name" : "当当网",
				"digest" : "全球领先的综合性网上购物中心。超过100万种商品在线热销！图书、音像、母婴、美妆、家居、数码3C、服装、鞋包等几十大类，正品行货",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/79d8b66ef52446f2337e97c2d15873e9.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://dangdang.com"
			}, {
				"id" : "101973",
				"name" : "京东网上商城",
				"digest" : "京东商城-专业的数码网上购物商城,产品包括数码、家电、手机、电脑配件、网络产品等数万种商品直销,便捷，诚信的服务,为您提供愉悦的网上商城购物体验!",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/dc33eb3e23ea3ab9a78818e9aa2b146e.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://360buy.com"
			}, {
				"id" : "101974",
				"name" : "卓越亚马逊",
				"digest" : "中国最大最全的网上综合商城,卓越亚马逊,天天低价,正品保证,货到付款,免运费.销售150多万种图书,音像产品,以及28大类超过100万种百货类商品，包括IT数码、手机、家电、鞋靴服装、个护化妆、玩具、钟表首饰、家居、母婴、食品、办公用品等。",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/e50f77c343f8672db0dcff3e3f2052f8.png",
				"type" : "web",
				"message" : 0,
				"href" : "http://amazon.cn"
			}, {
				"id" : "101976",
				"name" : "VANCL凡客诚品",
				"digest" : "VANCL凡客诚品，互联网快时尚品牌。根植互联网，全球时尚潮流，国际一线品质，平民价位。在线销售男装、女装、童装、鞋、家居、配饰等。送货上门、货到付款，无条件退换货。",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/201108181702210540.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://vancl.com"
			}, {
				"id" : "101977",
				"name" : "乐淘网上鞋城",
				"digest" : "乐淘是中国最大的网上正品鞋城，目前鞋子有超过105个著名品牌，10171多款运动鞋、皮鞋。天天有特价，全场免运费，退换货免运费，24小时在线客服，让您放心买到便宜鞋子！",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/201108111445020003.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://letao.com"
			}, {
				"id" : "101978",
				"name" : "1号店",
				"digest" : "1号店网上超市（yihaodian.com）：用鼠标逛超市，不用排队，方便实惠送上门，网上购物新生活。www.yihaodian.com",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/default_app_icon.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://yihaodian.com"
			}, {
				"id" : "101983",
				"name" : "拉手网",
				"digest" : "拉手网北京站-北京超人气团购网站。北京团购北京团购北京团购网，为您精选北京的餐厅、酒吧、KTV、SPA、美发店、摄影、瑜伽馆等特色商家，享受超低折扣，比优惠更优惠。",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/d385454a56a61818d1bdc47296b9d868.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://lashou.com"
			}, {
				"id" : "101993",
				"name" : "聚美优品",
				"digest" : "聚美优品（原团美网）是中国最大的女性团购网站，也是最专业的化妆品团购和护肤品团购网站。聚美优品给您每天带来超值的化妆品和护肤品，并且保证正品、假一赔三、三十天无条件退货。",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/default_app_icon.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://jumei.com"
			}, {
				"id" : "102005",
				"name" : "55BBS",
				"digest" : "55BBS--生活消费门户我爱打折55bbs，最具人气的生活消费信息分享社区，拥有购物、美食、女人、婚嫁等一切与生活消费相关的优惠折扣资讯及详尽即时的消费体验",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/eef80d0b8042da1747ceadd9ef9e50ef.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://55bbs.com"
			}, {
				"id" : "102016",
				"name" : "小说阅读网",
				"digest" : "《小说阅读网》提供原创穿越小说、言情小说、青春校园小说、玄幻武侠、灵异推理、历史军事、游戏竞技等小说在线阅读和小说下载。页面简洁，无眩杂广告。",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/666821e4659814f8cd2ead910eb762b4.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://readnovel.com"
			}, {
				"id" : "102019",
				"name" : "纵横中文网",
				"digest" : "纵横中文网是北京完美时空旗下文学网站，拥有纵横中文、纵横动漫等优质品牌资源。纵横中文网提供玄幻奇幻小说,武侠小说,网游小说,都市言情小说,历史军事小说在线阅读,首发最新章节。我们坚决抵制成人小说、情色小说、黄色小说等成人文学和色情小说。纵横动漫是中国最好的原创漫画平台，致力于激励中国原创漫画，为中国漫画读者、作者提供优质的漫画内容、和更广阔的机遇及展现空间，我们坚决抵制色情动漫，黄色动漫",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/default_app_icon.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://zongheng.com"
			}, {
				"id" : "102110",
				"name" : "世纪佳缘交友",
				"digest" : "爱情不能靠等待，婚姻不能靠凑合！上世纪佳缘交友网邂逅只属于您的那份爱！现在搜索会员让您轻松找到满意的婚恋对象",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/2260a8d79dbfe3179cf8e350b5546852.png",
				"type" : "web",
				"message" : 0,
				"href" : "http://jiayuan.com"
			}, {
				"id" : "102138",
				"name" : "hao123电影导航",
				"digest" : "最新,最好看的高清电影排行榜,高清电影在线观看，尽在hao123电影排行榜。",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/039ac0b98040c88183e86ee628596f55.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://movie.hao123.com/"
			}, {
				"id" : "102141",
				"name" : "百度团购",
				"digest" : "全国团购网址导航大全，汇聚北京、上海、广州、天津、杭州等各地城市的精品团购，包括拉手、美团、糯米、QQ团购等多个大型知名团购网站。每天关注一下，惊喜不断，实惠连连。",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/0b01758cfeff122796901cb35a9c96be.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://tuan.baidu.com"
			}, {
				"id" : "102143",
				"name" : "豆瓣FM",
				"digest" : "豆瓣FM是你专属的个性化音乐收听工具。 它简单方便，打开就能收听。在收听过程中，你可以用“红心”、“垃圾桶”或者“跳过” 告诉豆瓣FM你的喜好。豆瓣FM将根据你的操作和反馈，从海量曲库中自动发现并播出符合你音乐口味的歌曲。 豆瓣FM，让你和喜欢的音乐不期而遇。",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/e89b0d8205b7f6f2e1092ca094dc6e3f.png",
				"type" : "web",
				"message" : 0,
				"href" : "http://douban.fm"
			}, {
				"id" : "102150",
				"name" : "经典超级玛丽",
				"digest" : "经典超级玛丽！不用多说了，快來回味经典吧！",
				"image" : "http://apps.bdimg.com/store/static/kvt/5ee1a2e79752daeb15822368a08bc038.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://xapp.baidu.com/bapps/sandbox/app.html?appid=104316"
			}, {
				"id" : "102153",
				"name" : "飞天忍者猫",
				"digest" : "联众flash小游戏",
				"image" : "http://apps.bdimg.com/store/static/kvt/4da8a25a448b8a7d518613168f1d057e.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://xapp.baidu.com/bapps/sandbox/app.html?appid=104217"
			}, {
				"id" : "102157",
				"name" : "水果连连看",
				"digest" : "连连看系列中的精品，一起来玩4399水果连连看吧",
				"image" : "http://apps.bdimg.com/store/static/kvt/6256d93ba248e77a50a90b1ac2faf487.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://xapp.baidu.com/bapps/sandbox/app.html?appid=100909"
			}, {
				"id" : "102252",
				"name" : "大鱼吃小鱼2中文版",
				"digest" : "大鱼吃小鱼2中文版一款经典的小游戏",
				"image" : "http://apps.bdimg.com/store/static/kvt/8cec6a2dcfc78d843237a92dd9de97ee.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://xapp.baidu.com/bapps/sandbox/app.html?appid=113108"
			}, {
				"id" : "102356",
				"name" : "海绵宝宝赛车",
				"digest" : "海绵宝宝赛车小游戏",
				"image" : "http://apps.bdimg.com/store/static/kvt/62ff4c3e13d50ddddc5fa430af2a2242.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://xapp.baidu.com/bapps/sandbox/app.html?appid=103587"
			}, {
				"id" : "106886",
				"name" : "JJ斗地主",
				"digest" : "JJ斗地主-最专业的棋牌比赛平台-超快赛体验",
				"image" : "http://apps.bdimg.com/store/static/kvt/0fe569e2e2a26b3bb7f1973499f1202b.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://xapp.baidu.com/bapps/sandbox/app.html?appid=101612"
			}, {
				"id" : "106887",
				"name" : "弹弹堂",
				"digest" : "一款无需下载的Q版射击类竞技网页游戏",
				"image" : "http://apps.bdimg.com/store/static/kvt/7f097ff684c3db471ccdc808590f0b5b.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://xapp.baidu.com/bapps/sandbox/app.html?appid=100007"
			}, {
				"id" : "106892",
				"name" : "联众麻将",
				"digest" : "联众世界，网络棋牌文化发源地",
				"image" : "http://apps.bdimg.com/store/static/kvt/9a29ca865ee8f31f9079265e3f739267.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://xapp.baidu.com/bapps/sandbox/app.html?appid=104307"
			}, {
				"id" : "107388",
				"name" : "酷我电台",
				"digest" : "还在为找歌烦恼？想听好歌？打开酷我电台，立即拥有。",
				"image" : "http://apps.bdimg.com/store/static/kvt/ec5b2e0d3710b1415645cd0d0ffb9a21.gif",
				"type" : "web",
				"message" : 0,
				"href" : "http://xapp.baidu.com/bapps/sandbox/app.html?appid=105493"
			}, {
				"id" : "107397",
				"name" : "经典老歌",
				"digest" : "经典老歌电台",
				"image" : "http://apps.bdimg.com/store/static/kvt/a0940fd93f3528e01162c568167c7694.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://xapp.baidu.com/bapps/sandbox/app.html?appid=127680"
			}, {
				"id" : "107400",
				"name" : "dj舞曲",
				"digest" : "dj舞曲电台",
				"image" : "http://apps.bdimg.com/store/static/kvt/5ea4edc1c9c4350ea8441999391e445e.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://xapp.baidu.com/bapps/sandbox/app.html?appid=127672"
			}, {
				"id" : "107581",
				"name" : "微软必应词典",
				"digest" : "具备词条对比、长句翻译、视频朗读、智能建议等功能。",
				"image" : "http://apps.bdimg.com/store/static/kvt/fdcd91159ce71f5cbbddaa14d1e85d1e.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://xapp.baidu.com/bapps/sandbox/app.html?appid=108646"
			}, {
				"id" : "107582",
				"name" : "礼拜六万年历",
				"digest" : "提供阴阳历、节日节气、黄道吉日、放假安排等信息。",
				"image" : "http://apps.bdimg.com/store/static/kvt/d5af27925aa84c113aff2ecf553098d1.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://xapp.baidu.com/bapps/sandbox/app.html?appid=104736"
			}, {
				"id" : "107583",
				"name" : "快递查询",
				"digest" : "提供一站式的快递查询，和免费快递查询接口(API)",
				"image" : "http://apps.bdimg.com/store/static/kvt/6fa4c5027ce68db227e960a2ea73d427.gif",
				"type" : "web",
				"message" : 0,
				"href" : "http://xapp.baidu.com/bapps/sandbox/app.html?appid=101074"
			}, {
				"id" : "107584",
				"name" : "微博在线群发",
				"digest" : "这是一个由百度官方提供的方便实用的群发微博应用",
				"image" : "http://apps.bdimg.com/store/static/kvt/e853f38855d5b3acab9043869bcd7602.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://xapp.baidu.com/bapps/sandbox/app.html?appid=109681"
			}, {
				"id" : "107585",
				"name" : "科学计算器",
				"digest" : "操作便捷，运算准确的科学计算器，满足不同的计算需求",
				"image" : "http://apps.bdimg.com/store/static/kvt/cc8da1caf6a986125bae44613bfb2d2d.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://xapp.baidu.com/bapps/sandbox/app.html?appid=116526"
			}, {
				"id" : "107872",
				"name" : "qq个性网名",
				"digest" : "精彩个性的网名，展现个性的你！欢迎投稿",
				"image" : "http://apps.bdimg.com/store/static/kvt/0d3835f755cc3263d6c8b7bcc1f7aa85.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://xapp.baidu.com/bapps/sandbox/app.html?appid=116325"
			}, {
				"id" : "107874",
				"name" : "火星文输入法",
				"digest" : "火星文转换器提供火星文、繁体字等即时转换。",
				"image" : "http://apps.bdimg.com/store/static/kvt/4daff405b61b6b33215285f2c76173c2.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://xapp.baidu.com/bapps/sandbox/app.html?appid=105535"
			}, {
				"id" : "107981",
				"name" : "个性签名",
				"digest" : "最给力最流行的QQ个性签名以及情侣、伤感等各类签名",
				"image" : "http://apps.bdimg.com/store/static/kvt/79097c762db2c5eb03866e4798e02d9d.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://xapp.baidu.com/bapps/sandbox/app.html?appid=111575"
			}, {
				"id" : "108540",
				"name" : "永生",
				"digest" : "梦入神机继《阳神》之后，又一震撼力作。",
				"image" : "http://apps.bdimg.com/store/static/kvt/eddf33eb5b5a1188406ab8a576bcf808.gif",
				"type" : "web",
				"message" : 0,
				"href" : "http://xapp.baidu.com/bapps/sandbox/app.html?appid=101893"
			}, {
				"id" : "108542",
				"name" : "天才医生",
				"digest" : "纵横中文网都市娱乐小说",
				"image" : "http://apps.bdimg.com/store/static/kvt/1954ac6a5d39a03793ee7f7a974c3086.gif",
				"type" : "web",
				"message" : 0,
				"href" : "http://xapp.baidu.com/bapps/sandbox/app.html?appid=105329"
			}, {
				"id" : "109193",
				"name" : "创业邦",
				"digest" : "创业邦",
				"image" : "http://apps.bdimg.com/store/static/kvt/72874d54b1541905dfdc5c33f2b57955.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://xapp.baidu.com/bapps/sandbox/app.html?appid=109379"
			}, {
				"id" : "109209",
				"name" : "家饰",
				"digest" : "点击“全屏阅读原版杂志”后，即可全屏浏览杂志",
				"image" : "http://apps.bdimg.com/store/static/kvt/61f02b0c91194ab57c7e3b15bc7012db.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://xapp.baidu.com/bapps/sandbox/app.html?appid=105371"
			}, {
				"id" : "114755",
				"name" : "百度有啊票务",
				"digest" : "全国最大票务平台！提供众多大型独家活动演出门票！",
				"image" : "http://apps.bdimg.com/store/static/kvt/c022d9ced6e392e14fc744c49b6cb078.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://xapp.baidu.com/bapps/sandbox/app.html?appid=104548"
			}, {
				"id" : "121590",
				"name" : "太平洋电脑网",
				"digest" : "国内首家以专业电脑市场联盟为基础的大型IT资讯网站，为国内IT企业与终端用户提供全面、权威、专业的IT资讯服务",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/201109080959410879.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://www.pconline.com.cn/"
			}, {
				"id" : "121591",
				"name" : "猫扑",
				"digest" : "猫扑网是中国互联网流行文化发源地,以猫扑大杂烩、猫扑贴贴等互动产品为核心",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/201109081001090065.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://www.mop.com/"
			}, {
				"id" : "121592",
				"name" : "ting！",
				"digest" : "全正版音乐资源、简单流畅的听歌体验、懂你的音乐推荐、炙手可热的音乐人、志同道合的音乐知己，尽在全新的社交音乐媒体ting!",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/201109081002500340.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://ting.baidu.com/"
			}, {
				"id" : "121593",
				"name" : "中国广播网在线收听",
				"digest" : "一网听天下，全国电台在线收听",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/201109081004030512.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://live.cnr.cn/"
			}, {
				"id" : "121594",
				"name" : "金鹰网",
				"digest" : "湖南卫视新媒体金鹰网作为湖南卫视官方网站,向网民提供独家的湖南卫视视频点播(电视剧、栏目视频),湖南卫视频道直播,栏目资讯,娱乐资讯,明星访谈等服务",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/201109081005230691.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://www.hunantv.com/"
			}, {
				"id" : "121595",
				"name" : "米尔军情网",
				"digest" : "米尔网是中国军事、军事新闻、军事图片门户网站,关注军事、中国航母、歼20,提供军事信息、军事论坛、军事模型服务",
				"image" : "http://xapp.baidu.com/browsericon/xstart_browser/upload/img_new/201109081007390439.jpg",
				"type" : "web",
				"message" : 0,
				"href" : "http://www.junshijia.com/"
			}, {
				"id" : "-1000",
				"name" : "浏览器宝库",
				"digest" : "百度浏览器应用商店。",
				"image" : "http://liulanqi.baidu.com/wallpaperM1/icon/llqbk.png",
				"type" : "web",
				"message" : 0,
				"href" : "bdbrowser://store",
				"ext" : {
					"manifest" : {
						"removable" : false
					}
				}
			}, {
				"id" : "-1002",
				"name" : "应用快递",
				"digest" : "百度浏览器精选应用。",
				"image" : "http://liulanqi.baidu.com/wallpaperM1/icon/competitiveAppIcon.png",
				"type" : "web",
				"message" : 0,
				"href" : "",
				"ext" : {
					"manifest" : {
						"removable" : false,
						"onlyDock" : true,
						"sendHandler" : "openCompetitive",
						"contextMenu" : false,
						"draggable" : false
					}
				}
			}];
			callback && callback(list);
		},
		/**
		 * 通过一个id获得一个应用信息
		 * @param {Object} details
		 * @param {Object} callback
		 */
		getAppById: function() {
			return {};
		},
		/**
		 * 添加一个应用
		 * @param {ApplicationItem} details
		 * @param {Function} callback
		 * http://fe.baidu.com/doc/a/boss/api/application.text#Create
		 */
		create : function(details, callback) {
			//bdbrowser.application.create(details, callback);
		},
		/**
		 * 更新一个应用
		 * @param {ApplicationItem} details
		 * @param {Function} callback
		 * http://fe.baidu.com/doc/a/boss/api/application.text#Create
		 */
		update : function(details, callback) {
			//bdbrowser.application.create(details, callback);
		},
		/**
		 * 移除一个应用
		 * @param {Object} details
		 * @param {Object} callback
		 * http:http://fe.baidu.com/doc/a/boss/api/application.text#Remove
		 */
		remove : function(details, callback) {
			//bdbrowser.application.remove(details, callback);
		},
		/**
		 * 调用添加收藏的对话框
		 * @param {Object} details
		 * @param {Object} callback
		 * http://fe.baidu.com/doc/a/boss/api/application.text#search
		 */
		checkInstalled : function(details, callback) {
			//bdbrowser.application.checkInstalled(details, callback);
			callback && callback();
		},
		/**
		 * 添加应用和删除应用时触发事件
		 */
		addListener : function(event, callback) {
			switch (String(event).toLocaleLowerCase()) {
				case "created":
					//bdbrowser.application.onCreated.addListener(callback);
					break;
				case "removed":
					//bdbrowser.application.onRemoved.addListener(callback);
					break;
				case "opened":
					//bdbrowser.application.onOpen.addListener(callback);
					break;
				case "closed":
					//bdbrowser.application.onClose.addListener(callback);
					break;
				case "sync":
					//bdbrowser.application.onSync.addListener(callback);
					break;
				case "flushapp":
					//bdbrowser.application.onFlushApp.addListener(callback);
					break;
			}
		},
		/**
		 * 在新TAB或新窗口中打开页面
		 * @param {Object} info
		 * @param {Function} callback
		 */
		openPage : function(info, callback) {
			//bdbrowser.global.openPage(info, callback);
			window.open(info.url);
		},
		/**
		 * 打开应用
		 * @param {Object} info
		 * @param {Function} callback
		 * http://fe.baidu.com/doc/a/boss/api/application.text#openApp
		 */
		openApp : function(info, callback) {
			//bdbrowser.application.openApp(info, callback);
			window.open(info.appInfo.href);
		},
		/**
		 * 关闭应用
		 * @param {Object} info
		 * @param {Function} callback
		 * http://fe.baidu.com/doc/a/boss/api/application.text#closeApp
		 */
		closeApp : function(info, callback) {
			//bdbrowser.application.closeApp(info, callback);
		},
		/**
		 * 聚焦桌面选项卡(tab)
		 */
		openAppPage : function(callback) {
			//bdbrowser.global.openAppPage(callback);
			callback && callback();
		},
		/**
		 * 数据统计
		 * @param {Object} params
		 * @param {Object} callback
		 */
		report : function(params, callback) {
			//bdbrowser.global.report(params, callback);
			callback && callback();
		},
		
		getSyncInfo: function(params, callback){
			callback && callback();
		}
	}
});
