/**
 * @author ShiCH
 */

// SchAIM类的使用方法
var Tween = SchAIM.Tween, Easing = SchAIM.Easing;
var HTMLElement = document.getElementById('test'),
CssPrototye = 'width',
StartValue = '100',
EndValue = '400',
EasingMethod = Easing.Bounce.easeInOut,
Duration = .3,
Callback = function(){
	alert('run end');
};

/**
 * 实例Tween类, 并生成Tween动画效果
 * @param {HTMLElement} HTMLElement  
 * @param {String} CssPrototye          动画要改变的的样式属性, 当前支持的属性如下:
 *                                      [
 *                                        'width', 'height', 'left', 'top', 'right', 'bottom', 
 *                                        'padding', 'padding-left', 'padding-top', 'padding-bottom', 'padding-right', 
 *                                        'margin', 'margin-left', 'margin-top', 'margin-bottom', 'margin-right', 
 *                                        'font-size', 
 *                                        'background-position', 
 *                                        'background-color',
 *                                        'line-height', 
 *                                        'border-width', 
 *                                        'border-left-width', 'border-top-width', 'border-right-width', 'border-bottom-width', 'border-color' 
 *                                        'color',
 *                                        'opacity',
 *                                        '其它一些你能想到的并且可以线性赋值的样式'
 *                                      ]
 *                                      注: 其中'opacity'指透明度, 已做了兼容, 取值范围为:0~1
 *                                          与color相关的属性中,如'color', 'background-color', 'border-color', 
 *                                          可使用的颜色属性值为rgb或16进制的颜色值(如: 'rgb(222,202,54)或'#DECA36'), 
 *                                          但不支持英文简称的颜色值(如:'red', 'pink')
 *                                      
 * @param {Number / String} StartValue  动画执行的起始值(当改变样式属性中包涵'color'的时候, EndValue为String型, 否则为Number型)
 * @param {Number / String} EndValue    动画执行的目标值(当改变样式属性中包涵'color'的时候, EndValue为String型, 否则为Number型)
 * @param {Object} EasingMethod         要使用的动画算法, 默认为Easing.Expo.easeInOut
 * @param {Number} Duration             动画要执行的时长, 单位秒(s)
 * @param {Function} Callback           动画执行完成后的回调方法, 默认为null
 */
var t = new Tween(HTMLElement, CssPrototye, StartValue, EndValue, EasingMethod, Duration, Callback);

/**
 * 被实例Tween对象可以使用的方法:
 * stop() 停止当前动画(此时会把Tween类中的'_node'属性置空, 以防止IE6下内存泄漏)
 * 
 * Easing类可使用算法有:
 * 1. Easing.Linear
 * 
 * 2. Easing.Quad.easeIn
 * 3. Easing.Quad.easeOut
 * 4. Easing.Quad.easeInOut
 * 
 * 5. Easing.Cubic.easeIn
 * 6. Easing.Cubic.easeOut
 * 7. Easing.Cubic.easeInOut
 * 
 * 8. Easing.Quart.easeIn
 * 9. Easing.Quart.easeOut
 * 10. Easing.Quart.easeInOut
 * 
 * 11. Easing.Quint.easeIn
 * 12. Easing.Quint.easeOut
 * 13. Easing.Quint.easeInOut
 * 
 * 14. Easing.Sine.easeIn
 * 15. Easing.Sine.easeOut
 * 16. Easing.Sine.easeInOut
 * 
 * 17. Easing.Expo.easeIn
 * 18. Easing.Expo.easeOut
 * 19. Easing.Expo.easeInOut
 * 
 * 20. Easing.Circ.easeIn
 * 21. Easing.Circ.easeOut
 * 22. Easing.Circ.easeInOut
 * 
 * 23. Easing.Elastic.easeIn
 * 24. Easing.Elastic.easeOut
 * 25. Easing.Elastic.easeInOut
 * 
 * 26. Easing.Back.easeIn
 * 27. Easing.Back.easeOut
 * 28. Easing.Back.easeInOut
 * 
 * 29. Easing.Bounce.easeIn
 * 30. Easing.Bounce.easeOut
 * 31. Easing.Bounce.easeInOut
 * 
 * 具体算法对应的动画效果请自行尝试
 */ 

