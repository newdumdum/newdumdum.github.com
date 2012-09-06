/**
* @author 史纯华(shichunhua)
* @fileoverview Dom Effect Class
* @contact  Hi:newdumdum   QQ:38898431  Email:sch119@163.com
* @copyright
*/
var SchAIM = (function(){
	var Easing = {
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
				return c - Easing.Bounce.easeOut(d - t, 0, c, d) + b
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
				if (t < d / 2) return Easing.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
				else return Easing.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b
			}
		}
	}
	
	
	
    var requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame;
    /**
     * Tween构造函数
     * @param {HTMLElement} node 要执行动画的DOM节点
     * @param {String} propertyname 要执行的DOM的相应样式名称 如:height
     * @param {Number} startvalue  初始值
     * @param {Number} endvalue 结束值
     * @param {Object} easing 要使用的缓动类的方法, 如果未指定, 则默认使用Easing.Expo.easeInOut
     * @param {Number} duration  效果执行时间 单位为:秒
     * @param {Function} callback  效果执行完成后的回调方法
     */
    var Tween = function(node, propertyname, startvalue, endvalue, easing, duration, callback){
        this._node = node;
		this._propertyName = propertyname;
		this._startValue = startvalue;
		this._endValue = endvalue;
		this._easing = easing || Easing.Linear;
		this._duration = duration < 0.01 ? 0.01 : duration;
		this._callback = callback;
		this._pixelDictionary = ['width', 'height', 'left', 'top', 'right', 'bottom', 'padding', 'padding-left', 'padding-top', 'padding-bottom', 'padding-right', 'margin', 'margin-left', 'margin-top', 'margin-bottom', 'margin-right', 'font-size', 'background-position', 'line-height', 'border-width', 'border-left-width', 'border-top-width', 'border-right-width', 'border-bottom-width'];
		this._runInterval = null;
		this._timeLine = requestAnimationFrame ? 20 : 10;
		this._needPixel = [];
		this._isIE = /msie/i.test(navigator.userAgent);
		this._stopRequest = true;
		
		this._colorReg = /color|background-color|border-color/i;
		this._colorList = [];
		this._okList = [];
		
		if(this._checkParams()){
			this._run();
		}else{
		}
    }
    
    Tween.prototype = {
        /**
         * 验证参数是否合法
         */
        _checkParams: function(){
            var canPass = this._node != null &&
            this._node.getAttribute != null &&
            this._propertyName != null;
            
            if(!canPass){
            	return false;
            }
            
			var batchEffect = (this._propertyName instanceof Array) && (this._startValue instanceof Array) && (this._endValue instanceof Array);
			if(!batchEffect){
				this._propertyName = [this._propertyName];
				this._startValue = [this._startValue];
				this._endValue = [this._endValue];
			}
			
			var sePass = false;
			var paramsMatch = this._propertyName.length == this._startValue.length && this._startValue.length == this._endValue.length;
			if(paramsMatch){
				var unOk = false;
				for(var i = 0 , iLen = this._propertyName.length; i < iLen ; i ++){
					var pass = this._checkValueParams(this._propertyName[i], this._startValue[i], this._endValue[i]);
					if(!pass){
						unOk = true;
					}
					this._needPixel[i] = this._getIndex(this._pixelDictionary, this._propertyName[i]) != -1;
					var isColor = this._colorReg.test(this._propertyName[i]);
					this._colorList[i] = {
						isColor: isColor
						,startValue: isColor ? this._getColor(this._startValue[i]) : null
						,endValue: isColor ? this._getColor(this._endValue[i]) : null
					};
				}
				sePass = !unOk && !isNaN(this._duration);
			}else{
				sePass = false;
			}
            
            return sePass;
        },
		
		/**
		 * 验证值是否合法
		 */
		_checkValueParams: function(propertyName, startValue, endValue){
			var sePass = false;
			if(propertyName.indexOf('color') != -1){
				var reg = /(^\s*)|(\s*$)/g;			
	            sePass = !!startValue && startValue.replace(reg, '') != '' && !! endValue && endValue.replace(reg, '') != ''
			}else{
	            sePass = !isNaN(startValue) && !isNaN(endValue);
			}
			
			return sePass;
		},
        
        /**
         * 获取数组索引值
         * @param {Array} arr
         * @param {Object} value
         */
        _getIndex: function(arr, value){
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == value) {
                    return i;
                }
            }
            return -1;
        },
        /**
         * 取值, 给出是否加上'px'
         * @param {Object} value
         */
        _getValue: function(value){
            return this._needPixel ? value + 'px' : value;
        },
			
		
		_run: function(){
			requestAnimationFrame ? this._startAnimationFrame() : this._startNormalInterval();
		},
        /**
		 * 转成16进制颜色
		 * @param {Object} str
		 */
		_getColor: function(str){
			str = str.replace(/(^\s*)|(\s*$)/g, '');
			var rgbReg = /^\s*rgb\s*\(\s*\d{1,3}\s*\,\s*\d{1,3}\s*\,\s*\d{1,3}\s*\)\s*$/i;
			//var sixReg = /^\s*\#([a-zA-Z0-9]{3}|[a-zA-Z0-9]{6})\s*$/;
			var sixRegA = /^\s*\#[a-zA-Z0-9]{3}\s*$/;
			var sixRegB = /^\s*\#[a-zA-Z0-9]{6}\s*$/;
			var arr = [];
			
			if(rgbReg.test(str)){ // 以RGB形式指定的颜色
				nStr = str.split('(')[1].split(')')[0].split(',');
				for(var i = 0 ; i < nStr.length ; i ++){
					arr.push(nStr[i] / 1);
				}
				return arr;
			}
			
			if(sixRegB.test(str)) { // 以16进制指定颜色 (6位)
				var m = str.replace('#', '').match(/(\w|\d){2}/g);
				
				for(var i = 0 ; i < m.length; i ++){
					arr.push(Number('0x' + m[i]).toString(10) / 1);
				}
				return arr;
			}
			
			if(sixRegA.test(str)){ // 以16进制指定颜色(3位)
				var cArr = str.replace('#', '').split('');
				for(var i = 0 ; i < cArr.length ; i ++){
					arr.push(Number('0x' + (cArr[i] + cArr[i])).toString(10) / 1);
				}
				return arr;
			}
			
			return null;
		},
		
		_rgbToColor: function(r, g, b){
			var rr = r.toString(16);
			var gg = g.toString(16);
			var bb = g.toString(16);
			if(rr.length < 2){
				rr = '0' + rr;
			}
			if(gg.length < 2){
				gg = '0' + gg;
			}
			if(bb.length < 2){
				bb = '0' + bb;
			}
			return '#' + rr + gg + bb;
		},
		
		/**
		 * 开始正常的interval动画
		 */
		_startNormalInterval: function(){
			var self = this, curTime = 0;
			
			this._runInterval = window.setInterval(function(){
				if(!self._node){
					self._stop();
					return;
				}
				
				self._getSetValue(curTime, false);				
					
				if(curTime >= self._duration * 1000){
					window.clearInterval(self._runInterval);
					self._runInterval = null;
					
					self._getSetValue(null, true);
					
					self._callback && self._callback();
					self._clear();
				}
				curTime += self._timeLine;
			}, this._timeLine);
		},
		
		/**
		 * 使用浏览器内置计时器动画
		 */
		_startAnimationFrame: function(){
			this._stopRequest = false;
			var self = this, curTime = 0;
			
			function animate(){
				if(!self._node || self._stopRequest){
					self._stop();
					return;
				}
				
				self._getSetValue(curTime, false);
				
				if(curTime >= self._duration * 1000){
					self._getSetValue(null, true);
					
					self._callback && self._callback();
					self._clear();
					return;
				}
				
				curTime += self._timeLine;
				requestAnimationFrame(animate);
			}
			
			requestAnimationFrame(animate);
		},
		
		/**
		 * 设置为完成值
		 */
		_getSetValue: function(curTime, isEnd){
			var self = this, valueInfo = [];
			for(var i = 0 , iLen = self._propertyName.length ; i < iLen ; i ++){
				var curValue;
				if(self._colorList[i].isColor){
					var startRR = self._colorList[i].startValue[0], 
					startGG = self._colorList[i].startValue[1], 
					startBB = self._colorList[i].startValue[2], 
					
					endRR = self._colorList[i].endValue[0], 
					endGG = self._colorList[i].endValue[1], 
					endBB = self._colorList[i].endValue[2];
					
					var rr, gg, bb;
					if(isEnd){
						rr = endRR;
						gg = endGG;
						bb = endBB;
					}else{
						rr = Math.ceil(self._easing(curTime, startRR, endRR - startRR, self._duration * 1000));
						gg = Math.ceil(self._easing(curTime, startGG, endGG - startGG, self._duration * 1000));
						bb = Math.ceil(self._easing(curTime, startBB, endBB - startBB, self._duration * 1000));
					}
					curValue = 'rgb(' + rr + ', ' + gg + ', ' + bb + ')';
				}else{
					if(isEnd){
						curValue = self._endValue[i];
					}else{	
						curValue = Math.ceil(self._easing(curTime, self._startValue[i], self._endValue[i] - self._startValue[i], self._duration * 1000));
					}
				}
				valueInfo.push({
					propertyName: self._propertyName[i]
					,curValue : curValue
					,isColor: self._colorList[i].isColor
				});
			}
			self._setValue(valueInfo);
		},
		
		/**
		 * 设置对应值到DOM上
		 */
		_setValue: function(valueInfo){
			var setInfo = {}, needSet = false;
			for(var i = 0 , iLen = valueInfo.length ; i < iLen ; i ++){
				var propertyName = valueInfo[i].propertyName, curValue = valueInfo[i].curValue, isColor = valueInfo[i].isColor;
				
				if(propertyName == 'opacity'){
					curValue = curValue / 100;
				}
				
				if(propertyName == 'scrollLeft' || propertyName == 'scrollTop'){
					this._node[propertyName] = this._getValue(curValue, i);
				}else{
					setInfo[propertyName] = isColor ? curValue : this._getValue(curValue, i);				
					//ace.setStyles(this._node, obj);
					if(this._isIE && propertyName == 'opacity'){
						setInfo.filter = 'Alpha(opacity='+curValue * 100+')';
					}
					needSet = true;
				}
			}
			
			if(needSet){
				this.setStyles(this._node, setInfo);
			}
			
		},
		
		_stop: function(){
			this._stopRequest = true;
			if(this._runInterval){
				window.clearInterval(this._runInterval);
				this._runInterval = null;
			}
			this._clear();
		},
		
		/**
		 * 解决内存漏泄
		 */
		_clear: function(){
			/*
			for(var item in this){
				try{
					this[item] = null;
				}catch(ex){}
			}
			*/
			this._node = null;
		},
        
        stop: function(){
            this._stop();
        },
		
		
		setStyles: function(elm, params){
			for(var item in params){
				this.setStyle(elm, item, params[item]);
			}
		},
		
		setStyle: function(elm, key, value){
			if(!elm) return;
			elm.style[this.getCamelCase(key)] = value;
		},
		
		getCamelCase: function(str){
			if(str.indexOf('-') < 0 && str.indexOf('_') < 0 ){
				return str;
			}
		    return str.replace(/[-_][^-_]/g, function (match) {
		        return match.charAt(1).toUpperCase();
		    });
		}
    }
	
	
	return {
		Easing: Easing,
		Tween: Tween
	}
})();
