/**
 * @author ShiCH
 */

// SchAIM���ʹ�÷���
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
 * ʵ��Tween��, ������Tween����Ч��
 * @param {HTMLElement} HTMLElement  
 * @param {String} CssPrototye          ����Ҫ�ı�ĵ���ʽ����, ��ǰ֧�ֵ���������:
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
 *                                        '����һЩ�����뵽�Ĳ��ҿ������Ը�ֵ����ʽ'
 *                                      ]
 *                                      ע: ����'opacity'ָ͸����, �����˼���, ȡֵ��ΧΪ:0~1
 *                                          ��color��ص�������,��'color', 'background-color', 'border-color', 
 *                                          ��ʹ�õ���ɫ����ֵΪrgb��16���Ƶ���ɫֵ(��: 'rgb(222,202,54)��'#DECA36'), 
 *                                          ����֧��Ӣ�ļ�Ƶ���ɫֵ(��:'red', 'pink')
 *                                      
 * @param {Number / String} StartValue  ����ִ�е���ʼֵ(���ı���ʽ�����а���'color'��ʱ��, EndValueΪString��, ����ΪNumber��)
 * @param {Number / String} EndValue    ����ִ�е�Ŀ��ֵ(���ı���ʽ�����а���'color'��ʱ��, EndValueΪString��, ����ΪNumber��)
 * @param {Object} EasingMethod         Ҫʹ�õĶ����㷨, Ĭ��ΪEasing.Expo.easeInOut
 * @param {Number} Duration             ����Ҫִ�е�ʱ��, ��λ��(s)
 * @param {Function} Callback           ����ִ����ɺ�Ļص�����, Ĭ��Ϊnull
 */
var t = new Tween(HTMLElement, CssPrototye, StartValue, EndValue, EasingMethod, Duration, Callback);

/**
 * ��ʵ��Tween�������ʹ�õķ���:
 * stop() ֹͣ��ǰ����(��ʱ���Tween���е�'_node'�����ÿ�, �Է�ֹIE6���ڴ�й©)
 * 
 * Easing���ʹ���㷨��:
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
 * �����㷨��Ӧ�Ķ���Ч�������г���
 */ 

