/**
* 工具功能服务
*/
var TOOL = (function(){
	var CATEID = 'all', ARTID = 'all';
	var PIC_MAP = {};
	var ROOM_MAP = {};
	var BORDER_MAP = {};
	var CURRENT_FRAME_ID = null;
	var IS_USE_FRAME = true;

	// 工具隐藏按钮功能
	function initBT(){
		var bt = $('#closeBT');
		var btFlag = false;
		var layer = $('#tool');
		var runOK = true;

		bt.click(function(){
			if(!runOK){
				return;
			}
			runOK = false;

			if(!btFlag){
				layer.animate({
					height: 20
					,opacity: 0.3
				}, 'fast', function(){
					layer.hide();
					runOK = true;
				});
				btFlag = true;
				bt.addClass('close');
			}else{
				layer.show();
				layer.animate({
					height: 564
					,opacity: 1
				}, 'fast', function(){
					runOK = true;
				});
				btFlag = false;
				bt.removeClass('close');
			}
		});
	}

	// 分类,作家展开标记
	var cateFlag = false;
	var artFlag = false;
	// 初始化分类列表
	function initCategory(){
		$('#categorySelect').click(function(event){
			if(cateFlag){
				$('#categoryList').hide();
			}else{
				$('#categoryList').show();
			}
			cateFlag = !cateFlag;
			$('#artistList').hide();
			artFlag = false;
			event.stopPropagation();
		});
		$(document).click(function(){
			$('#categoryList').hide();
			cateFlag = false;
		});
		getCategory(function(list){
			$.each(list, function(index, item){
				var d = document.createElement('div');
				d.className = 'selectItem';
				d.setAttribute('data-id', item.categoryId);
				d.innerHTML = item.showName;
				$('#categoryList').append(d);
				$(d).click(function(event){
					CATEID = this.getAttribute('data-id');
					getArtist(CATEID, function(list){
						fillArtist(list, true);
					});
					$('#categorySelect').html(this.innerHTML);
					$('#categorySelect').click();
					event.stopPropagation();
				});
				$(d).mouseover(function(){
					$(this).addClass('selectHover');
				}).mouseout(function(){
					$(this).removeClass('selectHover');
				});
			});
		});
	}

	function initArtist(categoryId){
		$('#artistSelect').click(function(event){
			if(artFlag){
				$('#artistList').hide();
			}else{
				$('#artistList').show();
			}
			artFlag = !artFlag;
			$('#categoryList').hide();
			cateFlag = false;
			event.stopPropagation();
		});
		$(document).click(function(){
			$('#artistList').hide();
			artFlag = false;
		});

		// getArtist(categoryId, function(list){
		// 	fillArtist(list);
		// });
	}

	function fillArtist(list, reset){
		if(reset){
			// ARTID = 'all';
			// $('#artistSelect').html(list[0].showName);
			ARTID = '';
			$('#artistSelect').html('选择画家');
		}
		$('#artistList').html('');
		$.each(list, function(index, item){
			var d = document.createElement('div');
			d.className = 'selectItem';
			d.setAttribute('data-id', item.artistId);
			d.innerHTML = item.showName;
			$('#artistList').append(d);
			$(d).click(function(event){
				ARTID = this.getAttribute('data-id');
				getPicture(CATEID, ARTID, function(list){
					fillPicture(list);
				});
				$('#artistSelect').html(this.innerHTML);
				$('#artistSelect').click();
				event.stopPropagation();
			});
			$(d).mouseover(function(){
				$(this).addClass('selectHover');
			}).mouseout(function(){
				$(this).removeClass('selectHover');
			});
		});
	}

	function initPicture(categoryId, artistId){
		categoryId = categoryId || 'all';
		artistId = artistId || 'all';
		getPicture(categoryId, artistId, function(list){
			fillPicture(list);
		});
	}

	// 获取分类列表
	function getCategory(callback){
		NET.getCategory(function(data){
			// var all = {
			// 	showName: '全部分类'
			// 	,categoryId: 'all'
			// };
			// data.list.unshift(all);
			callback && callback(data.list);
		});
	}

	// 获取作家列表
	function getArtist(categoryId, callback){
		NET.getArtist(categoryId, function(data){
			// var all = {
			// 	showName: '全部作家'
			// 	,artistId: 'all'
			// };
			// data.list.unshift(all);
			callback && callback(data.list);
		});
	}

	// 获取画
	function getPicture(categoryId, artistId, callback){
		if(!artistId || !artistId){
			return;
		}
		NET.getPicture(categoryId, artistId, function(data){
			callback && callback(data.list);
		});
	}

	function fillPicture(list){
		$('#picList').html('');
		$.each(list, function(index, item){
			var id = (+new Date()) + '_' + Math.random() + '_' + index;
			var d = document.createElement('div');
			d.className = 'picItem';
			d.setAttribute('data-id', id);
			d.innerHTML = '<span class="picNode" style="background-image:url(' + item.thumbnail + ')"></span>';
			d.title = item.showName;
			$('#picList').append(d);

			PIC_MAP[id] = {
				item: item
				,dom: d
			};

			$(d).click(function(event){
				var info = PIC_MAP[this.getAttribute('data-id')];
				updateInfo(info);
				setPicture(info);
			});
			$(d).mouseover(function(){
				$(this).addClass('picHover');
			}).mouseout(function(){
				$(this).removeClass('picHover');
			});
		});
	}

	// 更新显示信息
	function updateInfo(info){
		info = info || {};
		var text = info.item.info || '';
		$('#picInfo').html(subByte(text, 150, '...'));

		if(text != ''){
			$('#picDetail').show();
			$('#picDetail').click(function(){
				window.open(info.item.productUrl);
			});
		}else{
			$('#picDetail').hide();
		}
	}
	function subByte(str, len, tail) {
		if(len < 0 || getByteLength(str) <= len){
			return str;
		}
		//thanks 加宽提供优化方法
		var source = str.substr(0, len)
		.replace(/([^\x00-\xff])/g,"\x241 ")//双字节字符替换成两个
		.substr(0, len)//截取长度
		.replace(/[^\x00-\xff]$/,"")//去掉临界双字节字符
		.replace(/([^\x00-\xff]) /g,"\x241");//还原
		return source + (tail || "");
	}
	function getByteLength(str) {
        return str.replace(/[^\x00-\xff]/g, 'ci').length;
    }

	// 初始化场景
	function initRoom(){
		initRoomScroll();
		NET.getRoom(function(data){
			var list = data.list;
			$('#romList').css({
				'width': list.length * 73 + 'px'
			});

			var firstView = null;
			$.each(list, function(index, item){
				var id = (+new Date()) + '_' + Math.random() + '_' + index;

				var d = document.createElement('div');
				d.className = 'roomItem';
				d.setAttribute('data-id', id);
				d.innerHTML = '<span class="roomNode" style="background-image:url(' + item.thumbnail + ')"></span>';
				$('#romList').append(d);

				ROOM_MAP[id] = {
					item: item
					,dom: d
				};

				if(index == 0){
					firstView = ROOM_MAP[id];
				}

				$(d).click(function(event){
					var info = ROOM_MAP[this.getAttribute('data-id')];
					setView(info);
				});

				$(d).mouseover(function(){
					$(this).addClass('roomHover');
				}).mouseout(function(){
					$(this).removeClass('roomHover');
				});
			});

			if(firstView){
				firstView.isFirst = 1;
				setView(firstView);
			}
		});
	}

	function initRoomScroll(){
		$('#roomLeftArrow').click(function(){
			var boxWidth = $('#romListBox').outerWidth();
			var innerWidth = $('#romList').outerWidth();

			var toLeft = parseInt($('#romList').attr('left') || 0) - boxWidth;
			if(toLeft < 0){
				return;
			}
			$('#romList').attr('left', toLeft);
			if(boxWidth < innerWidth){
				$('#romList').animate({
					'left': 0 - toLeft
				}, 100);
			}
		});
		$('#roomRightArrow').click(function(){
			var boxWidth = $('#romListBox').outerWidth();
			var innerWidth = $('#romList').outerWidth();
			if(boxWidth < innerWidth){
				var toLeft = parseInt($('#romList').attr('left') || 0) + boxWidth;
				if(toLeft > innerWidth){
					return;
				}
				$('#romList').attr('left', toLeft);
				$('#romList').animate({
					'left': 0 - toLeft
				}, 100);
			}
		});
	}

	// 初始化是否使用画框的开关
	function initFrameSwitch(){
		$('#userBorder').parent().click(function(){
			if(IS_USE_FRAME){
				$('#userBorder').addClass('unuseBoder');
			}else{
				$('#userBorder').removeClass('unuseBoder');
			}
			IS_USE_FRAME = !IS_USE_FRAME;

			setFrame();
		});
	}

	// 初始画框功能
	function initPictureFrame(){
		initFrameScroll();
		NET.getPictureFrame(function(data){
			var list = data.list;
			$('#borderList').css({
				'width': list.length * 73 + 'px'
			});
			$.each(list, function(index, item){
				var id = (+new Date()) + '_' + Math.random() + '_' + index;

				var d = document.createElement('div');
				d.className = 'borderItem';
				d.setAttribute('data-id', id);
				d.style.backgroundImage = 'url(' + item.thumbnail + ')';
				d.innerHTML = '<span class="borderNode"></span>';
				$('#borderList').append(d);

				BORDER_MAP[id] = {
					item: item
					,dom: d
				};


				$(d).click(function(event){
					if(CURRENT_FRAME_ID){
						var dom = BORDER_MAP[CURRENT_FRAME_ID].dom;
						$(dom).removeClass('borderSelected');
					}
					CURRENT_FRAME_ID = this.getAttribute('data-id');
					$(this).addClass('borderSelected');

					setFrame();
				});

				// $(d).mouseover(function(){
				// 	$(this).addClass('borderHover');
				// }).mouseout(function(){
				// 	$(this).removeClass('borderHover');
				// });
			});
		});		
	}

	function initFrameScroll(){		
		$('#borderLeftArrow').click(function(){
			var boxWidth = $('#borderListBox').outerWidth();
			var innerWidth = $('#borderList').outerWidth();

			var toLeft = parseInt($('#borderList').attr('left') || 0) - boxWidth;
			if(toLeft < 0){
				return;
			}
			$('#borderList').attr('left', toLeft);
			if(boxWidth < innerWidth){
				$('#borderList').animate({
					'left': 0 - toLeft
				}, 100);
			}
		});
		$('#borderRightArrow').click(function(){
			var boxWidth = $('#borderListBox').outerWidth();
			var innerWidth = $('#borderList').outerWidth();
			if(boxWidth < innerWidth){
				var toLeft = parseInt($('#borderList').attr('left') || 0) + boxWidth;
				if(toLeft > innerWidth){
					return;
				}
				$('#borderList').attr('left', toLeft);
				$('#borderList').animate({
					'left': 0 - toLeft
				}, 100);
			}
		});
	}

	// 向场景中设置画框
	function setFrame(){
		if(IS_USE_FRAME && CURRENT_FRAME_ID){
			ROOM.fillFrame(BORDER_MAP[CURRENT_FRAME_ID]);
		}else{
			ROOM.fillFrame(null);
		}
	}

	// 设置场景
	function setView(info){
		ROOM.fillView(info);
	}

	// 设置画
	function setPicture(info){
		ROOM.fillPicture(info);
	}

	initBT();
	initCategory();
	initArtist();
	// initPicture();
	initRoom();
	initFrameSwitch();
	initPictureFrame();


	return {
		updateInfo: updateInfo
	}
})();