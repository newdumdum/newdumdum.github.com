/**
 * @author shichunhua
 */
var UiEffect = (function(){
	var _glass = function(){
		
	}
	
	var _resize = function(){
		
	}
	
	var _bling = function(elm, isHide, cb){
		var alpArr = [0, 25, 50, 75, 100],tempArr = [], count = 0, times = 5;
		if(isHide){
			alpArr = alpArr.reverse();
		}
		var bInt = window.setInterval(function(){
			var curAlp = alpArr.shift();
			elm.style.filter = 'Alpha(opacity=' + curAlp + ')';
			elm.style.opacity = curAlp/100;
			
			tempArr.push(curAlp);
			if(alpArr.length == 0){
				alpArr = tempArr.reverse();
				tempArr = [];
				count ++;
			}
			if(count == times){
				window.clearInterval(bInt);
				cb && cb();
			}
		}, 30);
	}
	
	var _damp = function(){
		
	}
	
	var _flip = function(){
		
	}
	
	var _3d = function(){
		
	}
	
	var _bubble = function(){
		
	}
	
	var _move = function(elm, option, cb){
		var t = 0, d = 50, pos = getPosition(elm);
		var intv = window.setInterval(function(){
			var curX = Math.floor(Tween.Bounce.easeOut(t, pos.left, option.x - pos.left, d));
			var curY = Math.floor(Tween.Bounce.easeOut(t, pos.top, option.y - pos.top, d));
			if(curX == option.x && curY == option.y){
				window.clearInterval(intv);
				cb && cb();
				return;
			}
			elm.style.left = curX + 'px';
			elm.style.top = curY + 'px';
			t ++;
		}, 16);
	}
	
	/**
	 * tween类
	 * @param {int} t 当前时间
	 * @param {int} b 初始值
	 * @param {int} c 变化量
	 * @param {int} d 持续时间
	 */
	var Tween = {
	    Linear: function(t, b, c, d) {
	        return c * t / d + b
	    },
	    Quad: {
	        easeIn: function(t, b, c, d) {
	            return c * (t /= d) * t + b
	        },
	        easeOut: function(t, b, c, d) {
	            return - c * (t /= d) * (t - 2) + b
	        },
	        easeInOut: function(t, b, c, d) {
	            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
	            return - c / 2 * ((--t) * (t - 2) - 1) + b
	        }
	    },
	    Cubic: {
	        easeIn: function(t, b, c, d) {
	            return c * (t /= d) * t * t + b
	        },
	        easeOut: function(t, b, c, d) {
	            return c * ((t = t / d - 1) * t * t + 1) + b
	        },
	        easeInOut: function(t, b, c, d) {
	            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
	            return c / 2 * ((t -= 2) * t * t + 2) + b
	        }
	    },
	    Quart: {
	        easeIn: function(t, b, c, d) {
	            return c * (t /= d) * t * t * t + b
	        },
	        easeOut: function(t, b, c, d) {
	            return - c * ((t = t / d - 1) * t * t * t - 1) + b
	        },
	        easeInOut: function(t, b, c, d) {
	            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
	            return - c / 2 * ((t -= 2) * t * t * t - 2) + b
	        }
	    },
	    Quint: {
	        easeIn: function(t, b, c, d) {
	            return c * (t /= d) * t * t * t * t + b
	        },
	        easeOut: function(t, b, c, d) {
	            return c * ((t = t / d - 1) * t * t * t * t + 1) + b
	        },
	        easeInOut: function(t, b, c, d) {
	            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
	            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b
	        }
	    },
	    Sine: {
	        easeIn: function(t, b, c, d) {
	            return - c * Math.cos(t / d * (Math.PI / 2)) + c + b
	        },
	        easeOut: function(t, b, c, d) {
	            return c * Math.sin(t / d * (Math.PI / 2)) + b
	        },
	        easeInOut: function(t, b, c, d) {
	            return - c / 2 * (Math.cos(Math.PI * t / d) - 1) + b
	        }
	    },
	    Expo: {
	        easeIn: function(t, b, c, d) {
	            return (t == 0) ? b: c * Math.pow(2, 10 * (t / d - 1)) + b
	        },
	        easeOut: function(t, b, c, d) {
	            return (t == d) ? b + c: c * ( - Math.pow(2, -10 * t / d) + 1) + b
	        },
	        easeInOut: function(t, b, c, d) {
	            if (t == 0) return b;
	            if (t == d) return b + c;
	            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
	            return c / 2 * ( - Math.pow(2, -10 * --t) + 2) + b
	        }
	    },
	    Circ: {
	        easeIn: function(t, b, c, d) {
	            return - c * (Math.sqrt(1 - (t /= d) * t) - 1) + b
	        },
	        easeOut: function(t, b, c, d) {
	            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b
	        },
	        easeInOut: function(t, b, c, d) {
	            if ((t /= d / 2) < 1) return - c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
	            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b
	        }
	    },
	    Elastic: {
	        easeIn: function(t, b, c, d, a, p) {
	            if (t == 0) return b;
	            if ((t /= d) == 1) return b + c;
	            if (!p) p = d * .3;
	            if (!a || a < Math.abs(c)) {
	                a = c;
	                var s = p / 4
	            } else var s = p / (2 * Math.PI) * Math.asin(c / a);
	            return - (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b
	        },
	        easeOut: function(t, b, c, d, a, p) {
	            if (t == 0) return b;
	            if ((t /= d) == 1) return b + c;
	            if (!p) p = d * .3;
	            if (!a || a < Math.abs(c)) {
	                a = c;
	                var s = p / 4
	            } else var s = p / (2 * Math.PI) * Math.asin(c / a);
	            return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b)
	        },
	        easeInOut: function(t, b, c, d, a, p) {
	            if (t == 0) return b;
	            if ((t /= d / 2) == 2) return b + c;
	            if (!p) p = d * (.3 * 1.5);
	            if (!a || a < Math.abs(c)) {
	                a = c;
	                var s = p / 4
	            } else var s = p / (2 * Math.PI) * Math.asin(c / a);
	            if (t < 1) return - .5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b
	        }
	    },
	    Back: {
	        easeIn: function(t, b, c, d, s) {
	            if (s == undefined) s = 1.70158;
	            return c * (t /= d) * t * ((s + 1) * t - s) + b
	        },
	        easeOut: function(t, b, c, d, s) {
	            if (s == undefined) s = 1.70158;
	            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
	        },
	        easeInOut: function(t, b, c, d, s) {
	            if (s == undefined) s = 1.70158;
	            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
	            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b
	        }
	    },
	    Bounce: {
	        easeIn: function(t, b, c, d) {
	            return c - Tween.Bounce.easeOut(d - t, 0, c, d) + b
	        },
	        easeOut: function(t, b, c, d) {
	            if ((t /= d) < (1 / 2.75)) {
	                return c * (7.5625 * t * t) + b
	            } else if (t < (2 / 2.75)) {
	                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b
	            } else if (t < (2.5 / 2.75)) {
	                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b
	            } else {
	                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b
	            }
	        },
	        easeInOut: function(t, b, c, d) {
	            if (t < d / 2) return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
	            else return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b
	        }
	    }
	}
	
	/**
	 * Dom 操作
	 */
	var _$ = {
        F : function(id){
            if ('string' == typeof id || id instanceof String) {
                return document.getElementById(id);
            } else if (id && id.nodeName && (id.nodeType == 1 || id.nodeType == 9)) {
                return id;
            }
            return null;
        },
		C : function(tagName, params){
			var elm = document.createElement(tagName);
			for(var _ in params){
				elm[_] = params[_];
			}
			return elm;
		},
		A : function(cNode, pNode){
			return pNode ? pNode.appendChild(cNode) : document.body.appendChild(cNode);
		}
    }
	
	/**
	 * 获取元素绝对定位
	 * @param {Object} el 元素对象
	 */
	var getPosition = function(el){
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
	}
	
	
	
	
	
	return {
		getPosition : getPosition,
		glass : _glass,
		resize : _resize,
		bling : _bling,
		damp : _damp,
		flip : _flip,
		threeD : _3d,
		bubble : _bubble,
		move : _move
	}
})();
