/**
 * @author ShiChunhua
 * @fileoverview XML处理.
 */
function XML(str) {
	var xmldom, parser;
	function GetXml(xmlstr) {
		if(window.ActiveXObject) {
			var service = ["MSXML2.DOMDOCUMENT", "Microsoft.DOMDOCUMENT", "MSXML.DOMDOCUMENT", "MSXML3.DOMDOCUMENT"];
			for(var i = 0, iLen = service.length; i < iLen; i++) {
				try {
					xmldom = new ActiveXObject(service[i]);
				} catch(ex) {
				}
			}
			if(null == xmldom) {
				alert("您浏览器未安装任何XML解析器");
			}
		} else if(window.DOMParser) {
			parser = new DOMParser();
		}
		return loadXML(xmlstr);
	}

	function loadXML(xmlstr) {
		if(window.ActiveXObject) {
			xmldom.async = false;
			xmldom.loadXML(xmlstr);
		} else if(window.DOMParser) {
			xmldom = parser.parseFromString(xmlstr, "text/xml");
			addProperty();
		}
		return xmldom.documentElement;
	}

	function addProperty() {
		if(document.implementation.hasFeature("XPath", "3.0")) {
			XMLDocument.prototype.selectNodes = function(cXPathString, xNode) {
				if(!xNode) {
					xNode = this;
				}
				var oNSResolver = this.createNSResolver(this.documentElement);
				var aItems = this.evaluate(cXPathString, xNode, oNSResolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				var aResult = [];
				for(var i = 0; i < aItems.snapshotLength; i++) {
					aResult[i] = aItems.snapshotItem(i);
				}
				return aResult;
			}

			Element.prototype.selectNodes = function(cXPathString) {
				if(this.ownerDocument.selectNodes) {
					return this.ownerDocument.selectNodes(cXPathString, this);
				} else {
					throw "For XML Elements Only";
				}
			}
		}

		if(document.implementation.hasFeature("XPath", "3.0")) {
			XMLDocument.prototype.selectSingleNode = function(cXPathString, xNode) {
				if(!xNode) {
					xNode = this;
				}
				var xItems = this.selectNodes(cXPathString, xNode);
				if(xItems.length > 0) {
					return xItems[0];
				} else {
					return null;
				}
			}
			// prototying the Element
			Element.prototype.selectSingleNode = function(cXPathString) {
				if(this.ownerDocument.selectSingleNode) {
					return this.ownerDocument.selectSingleNode(cXPathString, this);
				} else {
					throw "For XML Elements Only";
				}
			}
		}
	}
	
	return GetXml(str);
}