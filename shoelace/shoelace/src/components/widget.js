/**
 * @author ShiChunhua
 * @fileoverview 挂件.
 */
function Widget(params){
	this._params = params;
	this._box = null;
	this._img = null;
	this._title = null;
	this._message = null;
	this._text = null;
	
	this._build();
	this._addEvent();
}

Widget.prototype = {
	_build: function(){
		this._box = ace.dom.create('div', {'class': 'widget'});
		this._container = ace.dom.create('div', {'class': 'widgetBox'});
		this._img = ace.dom.create('div', {'class': 'image'});
		this._title = ace.dom.create('div', {'class': 'title'});
		this._message = ace.dom.create('div', {'class': 'message'});
		this._text = ace.dom.create('div', {'class': 'text'});
		
		
		this._box.appendChild(this._container);
		this._container.appendChild(this._img);
		this._container.appendChild(this._text);
		this._box.appendChild(this._title);
		this._box.appendChild(this._message);
		
		this._update();
	},
	
	_update: function(){
		this._title.innerHTML = ace.string.encodeHTML(this._params.title || '');
		if(this._params.message && this._params.message != '0'){
			this._message.innerHTML = ace.string.encodeHTML(this._params.message);
			ace.show(this._message);
		}else{
			ace.hide(this._message);
		}
		
		if(this._params.text){
			this._text.innerHTML = ace.string.encodeHTML(this._params.text);
			ace.show(this._text);
		}else{
			ace.hide(this._text);
		}
		
		//ace.setStyles(this._img, this._params.image || {});
		this._img.className = 'image';
		ace.addClass(this._img, this._params.className || '');
	},
	
	_addEvent: function(){
		var me = this;
		ace.on(this._box, 'click', function(){
			me.onClick();
		});
	},
	
	getNode: function(){
		return this._box;
	},
	getParams: function(){
		return this._params;
	},
	getId: function(){
		return this._params.id;
	},
	onClick: function(){
		
	},
	
	update: function(params){
		this._params = ace.object.extend(this._params, params);
		this._update();
	}
	
}