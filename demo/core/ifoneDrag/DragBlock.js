function DragBlock(){
    this.render = null;
	this.attribute = 'data_drag',
    
    this._status = {
        isDrag: false,
		dragEnd : true,
		doMini: false,
		miniEnd: true,
		moveEnd: true,
		insertEnd: true
    };
    
    this._event = {
        mousedown: 'mousedown',
        mousemove: 'mousemove',
        mouseup: 'mouseup'
    };
    
    this._layers = {
		target : null,
        oldLayer: null,
        newLayer: null,
		insertLayer: null
    };
    
    this._config = {
        absolute: 'absolute',
        relative: 'relative',
        px: 'px',
		ie: /msie/i.test(navigator.userAgent),
		miniStep: this.ie ? 2 : 4,
		moveStep: this.ie ? 3 : 5,
		resizeStep: this.ie ? 2 : 7,
		renderRect: null,
		transparent: 'transparent',
		border : 'px solid transparent',
		borderWidth: '0'
    }
    
    this._temp = {
		marginLeft: 0,
		marginTop: 0,
		marLeft: 0,
		marTop: 0,
		marRight: 0,
		marBottom: 0,
		renderPos: '',
		blockPos: '',
		blockLeft: 0,
		blockTop: 0,
		oldSibling: null,
		newSibling: null,
		mouseInterval: null,
		miniInterval: null,
		maxInterval: null,
		mouseX: 0,
		mouseY: 0,
		toX: 0,
		toY: 0,
		childPos: [],
		insertInterval:null,
		insertX: 0,
		insertY : 0,
		isAfterNode: false
	}
}

DragBlock.prototype = {
    init: function(params){
		if(!params.render){
			alert('未指定拖拽作用区域');
			return;
		}
    	this.render = params.render;
		this.attribute = params.attribute ? params.attribute : this.attribute;
		
		if(this.render.style.position != this._config.absolute || this.render.style.position != this._config.relative){
			this._temp.renderPos = this.render.style.position;
			this.render.style.position = this._config.relative;
		}
		
		this._config.renderRect = this.getPosition(this.render);
		
		this._addEvent();
    },
    _addEvent: function(){
        addEvt = function(elm, type, handler){
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
	_mousedown: function(e){
		if(!this._isBlock(e) || !this._status.miniEnd || !this._status.moveEnd || !this._status.dragEnd) return;
		
		this.beforedrag();
		
		this._status.isDrag = true;
		this._status.dragEnd = false;
		this._layers.target = this._getTarget(e);
		
		var rect = this.getPosition(this._layers.target);
		this._temp.marginLeft = e.clientX - rect.left;
        this._temp.marginTop = e.clientY - rect.top;
		this._temp.marLeft = this._layers.target.style.marginLeft;
		this._temp.marTop = this._layers.target.style.marginTop;
		this._temp.marRight = this._layers.target.style.marginRight;
		this._temp.marBottom = this._layers.target.style.marginBottom;
		
		this._config.ie ? this._layers.target.setCapture() : e.preventDefault();
		
		this._temp.mouseX = e.clientX;
		this._temp.mouseY = e.clientY;
		this._moveListener();
		
		this._holdBlock();
		this._getChildPostions();
		
	},
	_mousemove: function(e){
		if(!this._status.isDrag) return;
		
		if(!this._status.doMini){
			this._miniEffect();
		}
		this._temp.mouseX = e.clientX;
		this._temp.mouseY = e.clientY;
	},
	_mouseup: function(e){
		if(!this._status.isDrag) return;
		
		this._status.isDrag = false;
		this._status.moveEnd = true;
	
		this._clearMiniEffect();			
		
		if(this._config.ie)
			this._layers.target.releaseCapture();
			
		if (this._temp.mouseInterval) {
			clearInterval(this._temp.mouseInterval);
			this._temp.mouseInterval = null;
		}
		
		if(!this._temp.newSibling){
			this._moveBack();
		}else{
			this._swapNode();
		}
		
		this._temp.childPositions = [];
		
	},
	_moveListener : function(){
		var oThis = this;
		this._temp.mouseInterval = setInterval(function(){	
			var toLeft = oThis._temp.mouseX - oThis._temp.marginLeft, 
				toTop = oThis._temp.mouseY - oThis._temp.marginTop, 
				lWidth = oThis._layers.target.clientWidth, 
				lHeight = oThis._layers.target.clientHeight, 
				minLeft = 0, 
				minTop = 0, 
				maxLeft = oThis.render.clientWidth, 
				maxHeight = oThis.render.clientHeight;
				
			if (toLeft < minLeft) 
				toLeft = minLeft;
			if (toLeft > maxLeft - lWidth) 
				toLeft = maxLeft - lWidth;
			if (toTop < minTop) 
				toTop = minTop;
			if (toTop > maxHeight - lHeight) 
				toTop = maxHeight - lHeight;
						
			oThis._layers.target.style.left = toLeft + oThis._config.px;
			oThis._layers.target.style.top = toTop + oThis._config.px;
			
			oThis._checkInsertPosition();
		},16);
	},
	_isBlock: function(e){
		var tar = this._getTarget(e);
		return tar && tar.getAttribute && tar.getAttribute(this.attribute) != null;
	},
	_getTarget: function(e){
		var tar = e.srcElement || e.target;
		while(tar){
			if(tar && tar.getAttribute && tar.getAttribute(this.attribute) != null){
				break;
			}else{
				tar = tar.parentNode;
			}
		}
		return tar;
	},
	
	
	
	
	
	_resetTarget: function(){
		this._layers.target.style.position = this._temp.blockPos;	
		this._layers.target.style.marginLeft = this._temp.marLeft;
		this._layers.target.style.marginTop = this._temp.marTop;	
		this._layers.target.style.marginRight = this._temp.marRight;
		this._layers.target.style.marginBottom = this._temp.marBottom;
		
		this._status.dragEnd = true;
		
		this.dragend();
	},
	
	_holdBlock: function(){
		this._temp.blockPos = this._layers.target.style.position;
		
		if(!this._layers.oldLayer){
			this._layers.oldLayer = document.createElement(this._layers.target.tagName);
			if(this._layers.target.nextSibling){
				this._temp.oldSibling = this._layers.target.nextSibling;
				this._layers.target.parentNode.insertBefore(this._layers.oldLayer, this._temp.oldSibling);
			}else{
				this._layers.target.parentNode.appendChild(this._layers.oldLayer);
				this._temp.oldSibling = null;
			}
		}
		
		var rt = this.getPosition(this._layers.target);
		
		this._temp.blockLeft = rt.left;
		this._temp.blockTop = rt.top;
		
		with(this._layers.target.style){
			position = this._config.absolute;
			left = rt.left - this._config.renderRect.left + this._config.px;
			top = rt.top - this._config.renderRect.top + this._config.px;
			marginLeft = 0 + this._config.px;
			marginTop = 0 + this._config.px;
			marginRight = 0 + this._config.px;
			marginBottom = 0 + this._config.px;
		}
		
		with(this._layers.oldLayer.style){
			width = this._layers.target.clientWidth + this._config.px;
			background = this._config.transparent;
			//border = this._config.borderWidth + this._config.border;
		}
		
		this._status.doMini = false;
		this._status.miniEnd = true;
	},
	
	_miniEffect: function(){
		this._status.doMini = true;
		this._status.miniEnd = false;
		var oThis = this, tarW = this._layers.target.clientWidth;
		this._temp.miniInterval = setInterval(function(){
			if(oThis._layers.oldLayer.clientWidth > 1){
				var ttW = oThis._layers.oldLayer.clientWidth - oThis._getMovieMerge(tarW, oThis._layers.oldLayer.clientWidth, oThis._config.resizeStep);
				ttW = ttW < 1 ? 1 : ttW;
                oThis._layers.oldLayer.style.width = ttW + oThis._config.px;
            }else{
                oThis._clearMiniEffect();
            }
		},16);
	},
	_clearMiniEffect: function(){
		if (this._layers.oldLayer) {
			this._layers.oldLayer.parentNode.removeChild(this._layers.oldLayer);
			this._layers.oldLayer = null;
		}
		if (this._temp.miniInterval) {
			clearInterval(this._temp.miniInterval);
			this._temp.miniInterval = null;
		}
		this._status.miniEnd = true;
	},
	
	_moveBack: function(){
		if(!this._layers.newLayer){
			this._layers.newLayer = document.createElement(this._layers.target.tagName);
			if(this._temp.oldSibling){
				this._layers.target.parentNode.insertBefore(this._layers.newLayer, this._temp.oldSibling);
			}else{
				this._layers.target.parentNode.appendChild(this._layers.newLayer);
			}
		}
		with(this._layers.newLayer.style){
			width = 0 + this._config.px;
			background = this._config.transparent;
			//marginLeft = 0 + this._config.px;
			//marginRight = 0 + this._config.px;
			//border = this._config.borderWidth + this._config.border;
		}
		
		var rect = this.getPosition(this._layers.newLayer);
		this._temp.toX = rect.left - this._config.renderRect.left;
		this._temp.toY = rect.top - this._config.renderRect.top;
		
		var oThis = this;
		this._moveToEffect(this._layers.target, this._temp.toX, this._temp.toY, this._config.moveStep, function(){
			clearInterval(oThis._temp.moveToInterval);
			oThis._temp.moveToInterval = null;
			if (oThis._status.doMini) {
				//oThis._layers.newLayer.style.marginLeft = oThis._temp.marLeft + oThis._config.px;
				//oThis._layers.newLayer.style.marginRight = oThis._temp.marRight + oThis._config.px;
				oThis._maxEffect();
			}else{
				oThis._clearMaxEffect();
			}
		});
	},
	_moveToEffect : function(moveObj, toX, toY, step, endCallBack){
		var oThis = this, xEnd = false, yEnd = false;
		this._temp.moveToInterval = setInterval(function(){
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
	_maxEffect: function(){
		var oThis = this, tarW = this._layers.target.clientWidth;
		this._temp.maxInterval = setInterval(function(){
			if(oThis._layers.newLayer.clientWidth < tarW){
                oThis._layers.newLayer.style.width = oThis._layers.newLayer.clientWidth + oThis._getMovieMerge(tarW, oThis._layers.newLayer.clientWidth, oThis._config.resizeStep)+ oThis._config.px;
            }else{
                oThis._clearMaxEffect();
            }
		},16);
	},
	_clearMaxEffect : function(){
		if (this._layers.newLayer) {
			this._layers.newLayer.parentNode.removeChild(this._layers.newLayer);
			this._layers.newLayer = null;
		}
		if (this._temp.maxInterval) {
			clearInterval(this._temp.maxInterval);
			this._temp.maxInterval = null;
		}
		
		this._resetTarget();
		this._status.moveEnd = true;	
	},
	
	_getChildPostions : function(){
		this._temp.childPositions = [];
		var elms = this.render.getElementsByTagName(this._layers.target.tagName);
		for(var i = 0 ; i < elms.length ; i ++){
			if(elms[i].getAttribute(this.attribute) != null){
				var rect = this.getPosition(elms[i]);
				this._temp.childPositions.push({
					elm: elms[i],
					x: rect.left,
					y: rect.top
				});
			}
		}
	},
	_checkInsertPosition : function(){
		this._temp.newSibling = null;
		var tW = this._layers.target.clientWidth,
			tH = this._layers.target.clientHeight,
			iLen = this._temp.childPositions.length,
			eX = this._temp.mouseX - this._temp.marginLeft + Math.floor(tW / 2),// - Math.max(document.body.scrollLeft, document.documentElement.scrollLeft),
			eY = this._temp.mouseY - this._temp.marginTop + Math.floor(tH / 2);// - Math.max(document.body.scrollTop, document.documentElement.scrollTop);

		this._temp.isAfterNode = eX >= this._temp.blockLeft && eY >= this._temp.blockTop;

		for(var i = 0 ; i < iLen ; i ++){
			var curInfo = this._temp.childPositions[i];
			var isSute = curInfo.elm != this._layers.target &&
				eX > curInfo.x - tW / 2 &&
				eX < curInfo.x + tW / 2 &&
				eY > curInfo.y &&
				eY < curInfo.y + tH;
				
			if(isSute){					
				this._temp.newSibling = curInfo.elm;
				break;
			}
		}
		
		if (this._temp.newSibling) {
			if(!this._layers.insertLayer)
				this._findNewPostion();
		}else {
			this._removeInsertLayer();
		}
	},
	_findNewPostion: function(){
		if(!this._status.insertEnd) return;
		if (!this._temp.newSibling) {
			if (this._layers.insertLayer) {
				this._layers.insertLayer.parentNode.removeChild(this._layers.insertLayer);
				this._layers.insertLayer = null;
			}
			return;
		}
		
		if(!this._layers.insertLayer){
			this._layers.insertLayer = document.createElement(this._layers.target.tagName);
			if (this._temp.isAfterNode && this._temp.newSibling.nextSibling) 
				this._layers.target.parentNode.insertBefore(this._layers.insertLayer, this._temp.newSibling.nextSibling);
			else 
				this._layers.target.parentNode.insertBefore(this._layers.insertLayer, this._temp.newSibling);
		}
		with(this._layers.insertLayer.style){
			width = 0 + this._config.px;
			background = this._config.transparent;
			//border = this._config.borderWidth + this._config.border;
		}
		
		this._insertEffect();
	},
	_insertEffect: function(){
		this._status.insertEnd = false;
		var oThis = this, tarW = this._layers.target.clientWidth;
		this._temp.insertInterval = setInterval(function(){
			if(!oThis._layers.insertLayer){
				clearInterval(oThis._temp.insertInterval);
				oThis._temp.insertInterval = null;
				return;
			}
			var curW = oThis._layers.insertLayer.clientWidth;
			if(curW < tarW){
				oThis._layers.insertLayer.style.width = curW + oThis._getMovieMerge(tarW, curW, oThis._config.resizeStep) + oThis._config.px;
			}else{
				oThis._status.insertEnd = true;				
		
				var rect = oThis.getPosition(oThis._layers.insertLayer);
				oThis._temp.insertX = rect.left;
				oThis._temp.insertY = rect.top;
		
				clearInterval(oThis._temp.insertInterval);
				oThis._temp.insertInterval = null;
			}
		},16);
	},
	_removeInsertLayer : function(immediately){
		if(this._temp.insertInterval){
			clearInterval(this._temp.insertInterval);
			this._temp.insertInterval = null;
		}
		if(immediately){
			if(this._layers.insertLayer){                
				this._layers.insertLayer.parentNode.removeChild(this._layers.insertLayer);
				this._layers.insertLayer = null;
			}
			this._status.insertEnd = true;
			this._temp.newSibling = null;
		}else{
			if(this._layers.insertLayer){
				var oThis = this,tarW = this._layers.target.clientWidth;;			
				this._temp.insertInterval = setInterval(function(){
					if(oThis._layers.insertLayer.clientWidth > 1){
						var ttW = oThis._layers.insertLayer.clientWidth - oThis._getMovieMerge(tarW, oThis._layers.insertLayer.clientWidth, oThis._config.miniStep);
						ttW = ttW < 1 ? 1 : ttW;
		                oThis._layers.insertLayer.style.width = ttW + oThis._config.px;
		            }else{  
						oThis._layers.insertLayer.parentNode.removeChild(oThis._layers.insertLayer);
						clearInterval(oThis._temp.insertInterval);
						oThis._layers.insertLayer = null;
						oThis._status.insertEnd = true;
						oThis._temp.newSibling = null;
		            }
				},16);
			}
		}
		
	},
	
	_swapNode: function(){
		var oThis = this;
		if(this._temp.insertInterval){		
			clearInterval(this._temp.insertInterval);
			this._temp.insertInterval = null;		
			this._status.insertEnd = true;				
			this._layers.insertLayer.style.width = this._layers.target.clientWidth + this._config.px;				
			this._layers.insertLayer.style.height = this._layers.target.clientHeight + this._config.px;
			var rect = this.getPosition(this._layers.insertLayer);
			this._temp.insertX = rect.left;
			this._temp.insertY = rect.top;
		}
		
		this._moveToEffect(this._layers.target, this._temp.insertX, this._temp.insertY, this._config.moveStep, function(){
			clearInterval(oThis._temp.moveToInterval);
			oThis._temp.moveToInterval = null;
			
			if (oThis._temp.isAfterNode && oThis._temp.newSibling.nextSibling) 
				oThis._layers.target.parentNode.insertBefore(oThis._layers.target, oThis._temp.newSibling.nextSibling);
			else
				oThis._layers.target.parentNode.insertBefore(oThis._layers.target, oThis._temp.newSibling);
			
		
			oThis._resetTarget();
			oThis._removeInsertLayer(true);
		});
	},
	/**
	 * 获取动画当前值
	 * @param {Object} curValue
	 * @param {Object} toValue
	 * @param {Object} step
	 */
	_getMovieMerge: function(curValue, toValue, step){
		var merge = Math.ceil(Math.abs(curValue - toValue) / step);
		merge = merge < 1 ? 1 : merge;
		return merge;
	},
	
	
	
	
	
	/**
	 * 获取对象坐标
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
	 */
	dragend: function(){
		
	}
}
