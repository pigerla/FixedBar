/**
 * Created by spy on 15-3-2.
 */
/**
 * 构造固定的容器
 * @param element
 * @constructor
 */
;( function () {
  window.FixedBox  = function (element) {
    this.element = element;
    this.boxY = getXY(this.element).y;
  };

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
  window.AddEvent = function (element, eventType, fn, useCapture) {
    if (element.addEventListener) {
      element.addEventListener(eventType, fn, useCapture);
      return true;
    } else if (element.attachEvent) {
      return element.attachEvent('on' + eventType, fn);
    } else {
      element['on' + eventType] = fn;
    }
  };


  /**
   * 获取待固定元素的x,y坐标
   * @param element
   * @returns {Function}
   */
  function getXY(element) {
    return document.documentElement.getBoundingClientRect && (function () {
      //取元素坐标，如元素或其上层元素设置position relative
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
})();