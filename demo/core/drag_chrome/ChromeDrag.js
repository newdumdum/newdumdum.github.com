function ChromeDrag(){
    this.render = null;
	this.width = null;
	this.height = null;
	this.margin = null;
	this.attribute = 'data_drag';
    
    this._status = {
        isDrag: false,
		moveEnd: true,
		swapEnd: true
    };
    
    this._event = {
        mousedown: 'mousedown',
        mousemove: 'mousemove',
        mouseup: 'mouseup'
    };
    
    this._layers = {
		target : null
    };
    
    this._config = {
		tagName: '',
        absolute: 'absolute',
        relative: 'relative',
        px: 'px',
		ie: /msie/i.test(navigator.userAgent),
		moveStep: this.ie ? 3 : 5,
		swapStep: this.ie ? 1.5 : 2.5,
		renderPos : '',
		renderRect: null
    }
	
    this._temp = {
		moveIntervals : {}
	}
}

ChromeDrag.prototype = {
	/**
	 * 实例化 对外接口
	 * @param {Object} params
	 */
    init: function(params){
		this._init(params);
    },
	/**
	 * 实例化 私有方法
	 * @param {Object} params
	 */
	_init: function(params){
    	this.render = params.render;
		this.attribute = params.attribute ? params.attribute : this.attribute;
    	this.width = params.width;
    	this.height = params.height;
    	this.margin = params.margin;
		
		if(!this.render || !this.width || !this.height || !this.margin){
			alert('ChomeDrag init with wrong params !');
			return;
		}
		
		if(this.render.style.position != this._config.absolute || this.render.style.position != this._config.relative){
			this._config.renderPos = this.render.style.position;
			this.render.style.position = this._config.relative;
		}
		
		this._getTagName();
		this._initBlock();
		this._addEvent();
		
	},
	/**
	 * 获取可移动区块TAG名称 
	 */
	_getTagName: function(){
		var nodes = this.render.getElementsByTagName('*');
		for(var i = 0 ; i < nodes.length ; i ++){
			if(nodes[i].getAttribute(this.attribute) != null){
				this._config.tagName = nodes[i].tagName;
				break;			
			}			
		}
	},
	/**
	 * 对外接口
	 * 初始化render内部元素, 并指定render高度
	 */
	initBlock: function(){
		this._initBlock();
	},
	/**
	 * 私有方法
	 * 初始化render内部元素, 并指定render高度
	 */
	_initBlock: function(){
		this._clearTemp();		
		this._config.renderRect = this.getPosition(this.render);
		
		var nodes = this._getChildNodes(), 
			conWidth = this.render.clientWidth,
			lineCount = Math.floor(conWidth / (this.width + this.margin)),
			curTop = this.margin, 
			curLeft = this.margin, 
			count = 0, 
			lineNum = Math.ceil(nodes.length / lineCount);
			
		while(nodes.length){
			var curNode = nodes.shift();
			curNode.style.position = this._config.absolute;
			curNode.style.width = this.width + this._config.px;
			curNode.style.height = this.height + this._config.px;
			curNode.style.left = curLeft + this._config.px;
			curNode.style.top = curTop + this._config.px;
			curNode.style.zIndex = 1;
			
			count ++;
			if(count % lineCount == 0){
				curLeft = this.margin;
				curTop = curTop + this.height + this.margin;
			}else{
				curLeft = curLeft + this.width + this.margin;
			}
		}
		
		this.render.style.height = lineNum * this.height + (lineNum + 1) * this.margin + this._config.px;
		
		// 取作用区域内元素位置信息
		this._getChildPostions();
	},
	/**
	 * 注册事件
	 */
    _addEvent: function(){
        var addEvt = function(elm, type, handler){
            if (window.attachEvent) {
                elm.attachEvent('on' + type, handler);
            }else if (window.addEventListener) {
                elm.addEventListener(type, handler, false);
            }else {
                elm['on' + type] = handler;
            }
        }		
		
        var oThis = this;
        addEvt(document, this._event.mousedown, function(e){oThis._mousedown(e);});
        addEvt(document, this._event.mousemove, function(e){oThis._mousemove(e);});
        addEvt(document, this._event.mouseup, function(e){oThis._mouseup(e);});
    },
	/**
	 * 鼠标按下触发
	 * @param {Object} e
	 */
	_mousedown: function(e){
		if(!this._isBlock(e) || !this._status.moveEnd || !this._status.swapEnd) return;
		
		this._status.isDrag = true;
		this._layers.target = this._getTarget(e);
		this._layers.target.style.zIndex = 3;
		
		this.beforedrag(this._layers.target);

		var rect = this.getPosition(this._layers.target);
		this._temp.marginLeft = e.clientX - rect.left;
        this._temp.marginTop = e.clientY - rect.top;
		
		// 取被拖拽对象中心点, 以做向心运动用
		this._temp.inclineX = Math.floor(rect.left - this._config.renderRect.left + this.width / 2);
		this._temp.inclineY = Math.floor(rect.top - this._config.renderRect.top + this.height / 2);
		
		// 记录被拖拽对象原有坐标
		this._temp.selfX = rect.left - this._config.renderRect.left;
		this._temp.selfY = rect.top - this._config.renderRect.top;

		this._config.ie ? this._layers.target.setCapture() : e.preventDefault();
		
		this._temp.mouseX = e.clientX;
		this._temp.mouseY = e.clientY;
		this._moveListener();
		
	},
	/**
	 * 鼠标移动触发
	 * @param {Object} e
	 */
	_mousemove: function(e){
		if(!this._status.isDrag) return;

		this._temp.mouseX = e.clientX;
		this._temp.mouseY = e.clientY;
	},
	/**
	 * 鼠标抬起触发
	 * @param {Object} e
	 */
	_mouseup: function(e){
		if(!this._status.isDrag) return;
			
		this._status.isDrag = false;
		//this._status.moveEnd = true;
		
		if(this._config.ie)
			this._layers.target.releaseCapture();

			
		if (this._temp.mouseInterval) {
			clearInterval(this._temp.mouseInterval);
			this._temp.mouseInterval = null;
		}
		
		this._temp.mouseX = e.clientX;
		this._temp.mouseY = e.clientY;
		
		this._swapNode();
		
	},
	/**
	 * 监听鼠标移动
	 */
	_moveListener : function(){
		var oThis = this,
			w = this.width, 
			h = this.height, 
			minLeft = - this._config.renderRect.left, 
			minTop = - this._config.renderRect.top, 
			maxLeft = document.documentElement.clientWidth + document.documentElement.scrollLeft - this._config.renderRect.left - this.margin, 
			maxHeight = document.documentElement.clientHeight + document.documentElement.scrollTop - this._config.renderRect.top - this.margin;
			
		this._temp.mouseInterval = setInterval(function(){	
			var toLeft = oThis._temp.mouseX - oThis._config.renderRect.left - oThis._temp.marginLeft, 
				toTop = oThis._temp.mouseY - oThis._config.renderRect.top - oThis._temp.marginTop;
			
			toLeft = toLeft < minLeft ? minLeft : (toLeft > maxLeft - w ? maxLeft - w : toLeft);
			toTop = toTop < minTop ? minTop : (toTop > maxHeight - h ? maxHeight - h : toTop);
						
			oThis._layers.target.style.left = toLeft + oThis._config.px;
			oThis._layers.target.style.top = toTop + oThis._config.px;
			
			oThis._checkNeedMove();

		}, 16);
	},
	/**
	 * 判断点击对象是否为可移动的区块对象
	 * @param {Object} e
	 */
	_isBlock: function(e){
		try {
			var tar = this._getTarget(e);
			return tar && tar.getAttribute && tar.getAttribute(this.attribute) != null;
		}catch(ex){
			return false;
		}
	},
	/**
	 * 获取可移动区块对象
	 * @param {Object} e
	 */
	_getTarget: function(e){
		var tar = e.srcElement || e.target;
		while(tar){
			if(tar && tar.getAttribute && tar.getAttribute(this.attribute) != null){
				return tar;
			}else{
				tar = tar.parentNode;
			}
		}
		return tar;
	},
	/**
	 * 验证否需要让位移动
	 */
	_checkNeedMove: function(){
		var needMove = false,
			eX = this._temp.mouseX - this._temp.marginLeft - this._config.renderRect.left + Math.floor(this.width / 2),
			eY = this._temp.mouseY - this._temp.marginTop - this._config.renderRect.top + Math.floor(this.height / 2);
				
		for(var i = 0, iLen = this._temp.childPositions.length ; i < iLen ; i ++){			
			var curInfo = this._temp.childPositions[i];
			var isSute = curInfo.elm != this._layers.target &&
				eX > curInfo.x  - this._config.renderRect.left&&
				eX < curInfo.x - this._config.renderRect.left + this.width &&
				eY > curInfo.y - this._config.renderRect.top &&
				eY < curInfo.y - this._config.renderRect.top + this.height;
				
			if(isSute){
				this._temp.targetX = curInfo.x;
				this._temp.targetY = curInfo.y;
				this._temp.order = i;
				this._inclineCenter(curInfo, i);
			}else if(curInfo.elm != this._layers.target){
				this._declineCenter(curInfo, i);
			}
		}
	},
	
	/**
	 * 向被拖拽对象原始位置中心点倾斜
	 */
	_inclineCenter: function(nodeInfo, order){
		if(this._temp.moveIntervals['run_'+order]) return;
		
		this._temp.moveIntervals['run_'+order] = true;
		nodeInfo.elm.style.zIndex = 2;
		
		var oThis = this, runOrder = order, tempInfo = nodeInfo;			
		var inclineParam = this._getInclineOffset(tempInfo.x - oThis._config.renderRect.left, tempInfo.y - oThis._config.renderRect.top);		
		var toX = inclineParam.x,
			toY = inclineParam.y;
			
		this._moveToEffect(tempInfo.elm, toX, toY, this._config.moveStep, function(){			
			clearInterval(oThis._temp.moveIntervals['incline_'+runOrder]);
			oThis._temp.moveIntervals['run_'+runOrder] = false;
			
			var cX = oThis._temp.mouseX - oThis._temp.marginLeft - oThis._config.renderRect.left + Math.floor(oThis.width / 2),
				cY = oThis._temp.mouseY - oThis._temp.marginTop - oThis._config.renderRect.top + Math.floor(oThis.height / 2);
				
			var isIn = cX > tempInfo.x - oThis._config.renderRect.left &&
				cX < tempInfo.x - oThis._config.renderRect.left + oThis.width &&
				cY > tempInfo.y - oThis._config.renderRect.top &&
				cY < tempInfo.y - oThis._config.renderRect.top + oThis.height;
			
			if(!isIn){
				oThis._declineCenter(tempInfo, runOrder);
			}
		}, 'incline_'+runOrder);
	},
	/**
	 * 回归到图标本身位置(远离拖拽对象)
	 */
	_declineCenter: function(nodeInfo, order){
		if(parseInt(nodeInfo.elm.style.left) == nodeInfo.x && parseInt(nodeInfo.elm.style.top) == nodeInfo.y) return;
		if(this._temp.moveIntervals['run_'+order]) return;
		
		this._temp.moveIntervals['run_'+order] = true;
		
		var oThis = this, runOrder = order, tempInfo = nodeInfo;
		
		this._moveToEffect(tempInfo.elm, tempInfo.x - oThis._config.renderRect.left, tempInfo.y - oThis._config.renderRect.top, this._config.moveStep, function(){
			clearInterval(oThis._temp.moveIntervals['decline_'+runOrder]);

			tempInfo.elm.style.zIndex = 1;
			oThis._temp.moveIntervals['run_'+runOrder] = false;
		}, 'decline_'+runOrder);
	},
	
	/**
	 * 取得向心坐标
	 * @param {Object} curX
	 * @param {Object} curY
	 */
	_getInclineOffset: function(curX, curY){
		var radian = Math.atan((this._temp.inclineY - curY - this.height / 2 )/(this._temp.inclineX - curX - this.width / 2)),		
			radios = Math.floor((this.width + this.height)/2),
			merX = Math.abs(Math.floor(radios * Math.cos(radian))),
			merY = Math.abs(Math.floor(radios * Math.sin(radian)));
		
		return {
			x : curX < this._temp.inclineX ? curX + merX : curX - merX,
			y : curY < this._temp.inclineY ? curY + merY : curY - merY
		}
	},
	
	/**
	 * 移动动画
	 * @param {Object} moveObj 要移动对象
	 * @param {Object} toX 目标X坐标
	 * @param {Object} toY 目标Y坐标
	 * @param {Object} step 移动步伐
	 * @param {Object} endCallBack 移动完成回调方法
	 */
	_moveToEffect : function(moveObj, toX, toY, step, endCallBack, intervalName){
		this._status.moveEnd = false;
		var oThis = this, xEnd = false, yEnd = false;
		this._temp.moveIntervals[intervalName] = setInterval(function(){
			var curLeft = parseInt(moveObj.style.left);
			var curTop = parseInt(moveObj.style.top);
			if(curLeft < toX){
				moveObj.style.left = curLeft + oThis._getMovieMerge(curLeft, toX, step) + oThis._config.px;
			}else if(curLeft > toX){
				moveObj.style.left = curLeft - oThis._getMovieMerge(curLeft, toX, step) + oThis._config.px;
			}else {
				xEnd = true;
			}
			
			
			if(curTop < toY){
				moveObj.style.top = curTop + oThis._getMovieMerge(curTop, toY, step) + oThis._config.px;
			}else if(curTop > toY){
				moveObj.style.top = curTop - oThis._getMovieMerge(curTop, toY, step) + oThis._config.px;
			}else {
				yEnd = true;
			}
			
			if(xEnd && yEnd){
				endCallBack();
			}
		},16);
	},
	/**
	 * 获取作用区域内可拖动元素
	 */
	_getChildNodes: function(){
		var arr = [];
		var elms = this.render.getElementsByTagName(this._config.tagName);
		for(var i = 0 ; i < elms.length ; i ++){
			if(elms[i].getAttribute(this.attribute) != null)
				arr.push(elms[i]);
		}
		return arr;
	},
	/**
	 * 取作用区域内元素位置信息
	 */
	_getChildPostions : function(){
		this._temp.childPositions = [];
		var elms = this._getChildNodes();
		for(var i = 0 ; i < elms.length ; i ++){
			var rect = this.getPosition(elms[i]);
			this._temp.childPositions.push({
				elm: elms[i],
				x: rect.left,
				y: rect.top
			});
			this._temp.moveIntervals['run_'+i] = false;
		}
	},
	/**
	 * 获取动画当前值
	 * @param {Object} curValue
	 * @param {Object} toValue
	 * @param {Object} step
	 */
	_getMovieMerge: function(curValue, toValue, step){
		var merge = Math.ceil(Math.abs(curValue - toValue) / step);
		return merge < 1 ? 1 : merge;
	},
	
	_swapNode: function(){
		var oThis = this,
			eX = this._temp.mouseX - this._config.renderRect.left - this._temp.marginLeft + Math.floor(this.width / 2),
			eY = this._temp.mouseY - this._config.renderRect.top - this._temp.marginTop + Math.floor(this.height / 2);

		var isIn = eX > this._temp.targetX - this._config.renderRect.left &&
			eX < this._temp.targetX - this._config.renderRect.left + this.width &&
			eY > this._temp.targetY - this._config.renderRect.top &&
			eY < this._temp.targetY - this._config.renderRect.top + this.height;
			
		this._status.swapEnd = false;
		if(isIn){
			var order = this._temp.order;			
			if (this._temp.moveIntervals['incline_' + order]) {
				clearInterval(this._temp.moveIntervals['incline_' + order]);
				this._temp.moveIntervals['run_'+order] = false;
			}
			if(this._temp.moveIntervals['decline_'+order]){
				clearInterval(this._temp.moveIntervals['decline_'+order]);
				this._temp.moveIntervals['run_'+order] = false;
			} 
			
			this._temp.swapFromEnd = false;
			this._temp.swapToEnd = false;
			
			var nodeInfo = this._temp.childPositions[order];
			this._moveToEffect(this._layers.target, nodeInfo.x - this._config.renderRect.left, nodeInfo.y - this._config.renderRect.top, this._config.swapStep, function(){
				clearInterval(oThis._temp.moveIntervals['swapTo']);
				oThis._layers.target.style.zIndex = 1;
				oThis._temp.swapToEnd = true;
				
				oThis._checkSwapEnd(nodeInfo.elm);
			}, 'swapTo');
				
			var tempInfo = nodeInfo;
			this._moveToEffect(nodeInfo.elm, this._temp.selfX, this._temp.selfY, this._config.swapStep, function(){
				clearInterval(oThis._temp.moveIntervals['swapFrom']);
				oThis._temp.swapFromEnd = true;
				
				oThis._checkSwapEnd(tempInfo.elm);
			}, 'swapFrom');
		}else{
			if (parseInt(this._layers.target.style.left) == this._temp.selfX 
			&& parseInt(this._layers.target.style.top) == this._temp.selfY) {
				this._layers.target.style.zIndex = 1;
				this._status.swapEnd = true;
				
				
				this._checkAllMovingEnd(function(){
					// 通知外部接口
					oThis.dragend(oThis._layers.target);
				});	
				
				return;
			}
			this._moveToEffect(this._layers.target, this._temp.selfX, this._temp.selfY, this._config.swapStep, function(){
				clearInterval(oThis._temp.moveIntervals['back']);
				oThis._layers.target.style.zIndex = 1;
				oThis._status.swapEnd = true;
				
				oThis._checkAllMovingEnd(function(){
					// 通知外部接口
					oThis.dragend(oThis._layers.target);
				});	
				
			}, 'back');
		}
	},
	/**
	 * 验证是否交换动画执行完成
	 * @param {Object} toNode
	 */
	_checkSwapEnd: function(toNode){
		if(this._temp.swapFromEnd && this._temp.swapToEnd){
			this._status.swapEnd = true;
			var oThis = this;
			this._checkAllMovingEnd(function(){
				oThis.swapNode(oThis._layers.target, toNode);			
				// 通知外部接口
				oThis.dragend(oThis._layers.target);			
				// 重新组织内部可拖拽元素位置
				oThis._initBlock();
			});				
		}else{
			this._status.swapEnd = false;
		}				
	},
	/**
	 * 验证是否所有元素都已经移动完成
	 * @param {Object} cb
	 */
	_checkAllMovingEnd: function(cb){
		var oThis = this;
		this._temp.checkAllEndInterval = setInterval(function(){			
			var isEnd = true;
			for(var i = 0, iLen = oThis._temp.childPositions.length ; i < iLen ; i ++){
				if(oThis._temp.moveIntervals['run_'+i]){
					isEnd = false;
					break;
				}
			}
		
			if(isEnd){
				clearInterval(oThis._temp.checkAllEndInterval);
				oThis._status.moveEnd = true;
				cb();
			}
		},16);
	},
	
	/**
	 * 交换两个DOM元素
	 * @param {Object} nodeA
	 * @param {Object} nodeB
	 */
	swapNode: function(nodeA, nodeB){
		var nodeA_nextNode = nodeA.nextSibling,
			nodeB_nextNode = nodeB.nextSibling,
			pNodeA = nodeA.parentNode,
			pNodeB = nodeB.parentNode;
		
		nodeA_nextNode ? pNodeA.insertBefore(nodeB, nodeA_nextNode) : pNodeA.appendChild(nodeB);
		nodeB_nextNode ? pNodeB.insertBefore(nodeA, nodeB_nextNode) : pNodeB.appendChild(nodeA);
	},
	
	/**
	 * 清除缓存数据
	 */
	_clearTemp : function(){		
	    this._temp = {
			moveIntervals : {}
		}
	},
	
	
	
	
	
	/**
	 * 获取对象坐标
	 * @param {Object} el 需要取得绝对位置的元素
	 */
	getPosition: function(el){
		var ua = navigator.userAgent.toLowerCase();
		var parent = null;
		var pos = [];
		var box;
		if (el.getBoundingClientRect){ //ie
			box = el.getBoundingClientRect();
			var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
			var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
			return {
				left: box.left + scrollLeft,
				top: box.top + scrollTop
			};
		}else if (document.getBoxObjectFor){ // gecko
			box = document.getBoxObjectFor(el);
			var borderLeft = (el.style.borderLeftWidth) ? parseInt(el.style.borderLeftWidth) : 0;
			var borderTop = (el.style.borderTopWidth) ? parseInt(el.style.borderTopWidth) : 0;
			pos = [box.x - borderLeft, box.y - borderTop];
		}else{ // safari & opera    
			pos = [el.offsetLeft, el.offsetTop];
			parent = el.offsetParent;
			if (parent != el) {
				while (parent) {
					pos[0] += parent.offsetLeft;
					pos[1] += parent.offsetTop;
					parent = parent.offsetParent;
				}
			}
			if (/opera/.test(ua) || (/safari/.test(ua) && el.style.position == 'absolute')) {
				pos[0] -= document.body.offsetLeft;
				pos[1] -= document.body.offsetTop;
			}
		}

		el.parentNode ? parent = el.parentNode : parent = null;

		while (parent && parent.tagName.toUpperCase() != 'BODY' && parent.tagName.toUpperCase() != 'HTML') { // account for any scrolled ancestors   
			pos[0] -= parent.scrollLeft;
			pos[1] -= parent.scrollTop;
			parent.parentNode ? parent = parent.parentNode : parent = null;
		}
		return {
			left: pos[0],
			top: pos[1]
		}		
	},
	
	/**
	 * 对外接口 - 拖动前触发
	 */
	beforedrag: function(){
		
	},
	/**
	 * 对外接口 - 拖动结束后触发
	 * @param {Object} elm  被拖拽对象
	 */
	dragend: function(elm){
		
	}
}
