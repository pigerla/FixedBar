/**
 * Created by spy on 15-3-2.
 */
/**
 * 构造固定的容器
 * @param element
 * @constructor
 */
;(function (window, undefined) {
  function FixedBox(element) {
    this.element = element;
    this.boxY = getXY(this.element).y;
  }

  FixedBox.prototype = {
    setCss: function (originClass, addClass) {
      var windowST = ( document.compatMode && document.compatMode != "CSS1Compat") ? document.body.scrollTop : document.documentElement.scrollTop || window.pageYOffset;
      if (windowST > this.boxY) {
        this.element.className = originClass + ' ' + addClass;
      } else {
        this.element.className = originClass;
      }
    }
  };


  /**
   * 添加事件
   * @param element
   * @param eventType
   * @param fn
   * @param useCapture
   * @returns {*}
   */
  function AddEvent(element, eventType, fn, useCapture) {
    if (element.addEventListener) {
      element.addEventListener(eventType, fn, useCapture);
      return true;
    } else if (element.attachEvent) {
      return element.attachEvent('on' + eventType, fn);
    } else {
      element['on' + eventType] = fn;
    }
  }


  /**
   * 获取待固定元素的x,y坐标
   * @param element
   * @returns {Function}
   */
  function getXY(element) {
    return document.documentElement.getBoundingClientRect && (function () {
      //getBoundingClientRect 获取该对象具有top、left、right、bottom四个属性，分别代表该元素上、左、右、下四条边界相对于浏览器窗口左上角的偏移像素值
      var position = element.getBoundingClientRect();
      return {
        x: position.left + document.documentElement.scrollLeft,
        y: position.top + document.documentElement.scrollTop
      }
    })() || (function () {
      var _x = _y = 0;
      do {
        _x += element.offsetLeft;
        _y += element.offsetTop;
      } while (element = element.offsetParent);
      return {
        x: _x,
        y: _y
      }
    })();
  }

  window.FixedBox = window.FixedBox || FixedBox ;
  window.AddEvent = window.AddEvent || AddEvent ;
})(window);