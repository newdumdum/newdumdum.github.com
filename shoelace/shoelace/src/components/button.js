/**
 * @author ShiChunhua
 * @fileoverview 挂件.
 */
function MacButton(params){
	this._params = params || {};
	this._type = this._params.type == 'image' ? 'image' : 'text';
	this._styles = this._params.styles || {};
	this._box = null;
	this._defaultWidth = 60;
	this._defaultHeight = 25;
	
	this.build();
	this.addEvent();
}

MacButton.prototype = {
	build: function(){
		this._box = ace.dom.create('div', {
			'class': 'macButton'
		});
		this._box.innerHTML = this._type == 'image' ? '<span class="' + this._params.image + '"></span>' : ace.string.encodeHTML(this._params.text);
		
		var s = ace.object.extend(this._styles, {
			width: this._params.width == 'auto' ? 'auto' : (this._params.width || this._defaultWidth) + 'px'
			,height: (this._params.height || this._defaultHeight) + 'px'
		});
		ace.setStyles(this._box, s);
	},
	addEvent: function(){
		var me = this;
		ace.on(this._box, 'click', function(){
			me.onclick();
		});
		
		ace.on(this._box, 'mousedown', function(){
			ace.addClass(me._box, 'down');
		});
		ace.on(this._box, 'mouseup', function(){
			ace.removeClass(me._box, 'down');
		});
		ace.on(this._box, 'mouseout', function(){
			ace.removeClass(me._box, 'down');
		});
		
		ace.on(this._box, 'touchstart', function(){
			ace.addClass(me._box, 'down');
		});
		ace.on(this._box, 'touchend', function(){
			ace.removeClass(me._box, 'down');
		});
		ace.on(this._box, 'touchcancel', function(){
			ace.removeClass(me._box, 'down');
		});
	},
	
	getNode: function(){
		return this._box;
	},
	onclick: function(){
		
	}
}
