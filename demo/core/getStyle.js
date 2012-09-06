
        /**
         * 获取指定元素的对应的样式值
         * @param {HTMLElement} elem DOM节点
         * @param {String} name 要取的样式属性
         */
        getStyle: function(elem, name){
            var getComputedStyle = document.defaultView && document.defaultView.getComputedStyle;
            if (getComputedStyle) {
                var ret, defaultView, computedStyle, undefined;
                name = name.replace(/([A-Z])/g, "-$1").toLowerCase();
                if (!(defaultView = elem.ownerDocument.defaultView)) {
                    return undefined;
                }
                
                if ((computedStyle = defaultView.getComputedStyle(elem, null))) {
                    ret = computedStyle.getPropertyValue(name);
                }
                return ret;
            }
            else 
                if (document.documentElement.currentStyle) {
                    var rnumpx = /^-?\d+(?:px)?$/i, rnum = /^-?\d/, left, rsLeft, ret = elem.currentStyle && elem.currentStyle[name], style = elem.style;
                    
                    if (!rnumpx.test(ret) && rnum.test(ret)) {
                        left = style.left;
                        rsLeft = elem.runtimeStyle.left;
                        
                        elem.runtimeStyle.left = elem.currentStyle.left;
                        style.left = name === "fontSize" ? "1em" : (ret || 0);
                        ret = style.pixelLeft + "px";
                        
                        style.left = left;
                        elem.runtimeStyle.left = rsLeft;
                    }
                    return ret;
                }
            return null;
        },