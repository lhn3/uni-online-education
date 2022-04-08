var __wxsModules={};

__wxsModules["3169f6de"] = (() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // <stdin>
  var require_stdin = __commonJS({
    "<stdin>"(exports, module) {
      var me = {};
      me.onMoving = function(ins, rate, downHight) {
        ins.requestAnimationFrame(function() {
          ins.selectComponent(".mescroll-wxs-content").setStyle({
            "will-change": "transform",
            "transform": "translateY(" + downHight + "px)",
            "transition": ""
          });
          var progress = ins.selectComponent(".mescroll-wxs-progress");
          progress && progress.setStyle({ transform: "rotate(" + 360 * rate + "deg)" });
        });
      };
      me.showLoading = function(ins) {
        me.downHight = me.optDown.offset;
        ins.requestAnimationFrame(function() {
          ins.selectComponent(".mescroll-wxs-content").setStyle({
            "will-change": "auto",
            "transform": "translateY(" + me.downHight + "px)",
            "transition": "transform 300ms"
          });
        });
      };
      me.endDownScroll = function(ins) {
        me.downHight = 0;
        me.isDownScrolling = false;
        ins.requestAnimationFrame(function() {
          ins.selectComponent(".mescroll-wxs-content").setStyle({
            "will-change": "auto",
            "transform": "translateY(0)",
            "transition": "transform 300ms"
          });
        });
      };
      me.clearTransform = function(ins) {
        ins.requestAnimationFrame(function() {
          ins.selectComponent(".mescroll-wxs-content").setStyle({
            "will-change": "",
            "transform": "",
            "transition": ""
          });
        });
      };
      function propObserver(wxsProp) {
        me.optDown = wxsProp.optDown;
        me.scrollTop = wxsProp.scrollTop;
        me.bodyHeight = wxsProp.bodyHeight;
        me.isDownScrolling = wxsProp.isDownScrolling;
        me.isUpScrolling = wxsProp.isUpScrolling;
        me.isUpBoth = wxsProp.isUpBoth;
        me.isScrollBody = wxsProp.isScrollBody;
        me.startTop = wxsProp.scrollTop;
      }
      function callObserver(callProp, oldValue, ins) {
        if (me.disabled())
          return;
        if (callProp.callType) {
          if (callProp.callType === "showLoading") {
            me.showLoading(ins);
          } else if (callProp.callType === "endDownScroll") {
            me.endDownScroll(ins);
          } else if (callProp.callType === "clearTransform") {
            me.clearTransform(ins);
          }
        }
      }
      function touchstartEvent(e, ins) {
        me.downHight = 0;
        me.startPoint = me.getPoint(e);
        me.startTop = me.getScrollTop();
        me.startAngle = 0;
        me.lastPoint = me.startPoint;
        me.maxTouchmoveY = me.getBodyHeight() - me.optDown.bottomOffset;
        me.inTouchend = false;
        me.callMethod(ins, { type: "setWxsProp" });
      }
      function touchmoveEvent(e, ins) {
        var isPrevent = true;
        if (me.disabled())
          return isPrevent;
        var scrollTop = me.getScrollTop();
        var curPoint = me.getPoint(e);
        var moveY = curPoint.y - me.startPoint.y;
        if (moveY > 0 && (me.isScrollBody && scrollTop <= 0 || !me.isScrollBody && (scrollTop <= 0 || scrollTop <= me.optDown.startTop && scrollTop === me.startTop))) {
          if (!me.inTouchend && !me.isDownScrolling && !me.optDown.isLock && (!me.isUpScrolling || me.isUpScrolling && me.isUpBoth)) {
            if (!me.startAngle)
              me.startAngle = me.getAngle(me.lastPoint, curPoint);
            if (me.startAngle < me.optDown.minAngle)
              return isPrevent;
            if (me.maxTouchmoveY > 0 && curPoint.y >= me.maxTouchmoveY) {
              me.inTouchend = true;
              touchendEvent(e, ins);
              return isPrevent;
            }
            isPrevent = false;
            var diff = curPoint.y - me.lastPoint.y;
            if (me.downHight < me.optDown.offset) {
              if (me.movetype !== 1) {
                me.movetype = 1;
                me.callMethod(ins, { type: "setLoadType", downLoadType: 1 });
                me.isMoveDown = true;
              }
              me.downHight += diff * me.optDown.inOffsetRate;
            } else {
              if (me.movetype !== 2) {
                me.movetype = 2;
                me.callMethod(ins, { type: "setLoadType", downLoadType: 2 });
                me.isMoveDown = true;
              }
              if (diff > 0) {
                me.downHight += diff * me.optDown.outOffsetRate;
              } else {
                me.downHight += diff;
              }
            }
            me.downHight = Math.round(me.downHight);
            var rate = me.downHight / me.optDown.offset;
            me.onMoving(ins, rate, me.downHight);
          }
        }
        me.lastPoint = curPoint;
        return isPrevent;
      }
      function touchendEvent(e, ins) {
        if (me.isMoveDown) {
          if (me.downHight >= me.optDown.offset) {
            me.downHight = me.optDown.offset;
            me.callMethod(ins, { type: "triggerDownScroll" });
          } else {
            me.downHight = 0;
            me.callMethod(ins, { type: "endDownScroll" });
          }
          me.movetype = 0;
          me.isMoveDown = false;
        } else if (!me.isScrollBody && me.getScrollTop() === me.startTop) {
          var isScrollUp = me.getPoint(e).y - me.startPoint.y < 0;
          if (isScrollUp) {
            var angle = me.getAngle(me.getPoint(e), me.startPoint);
            if (angle > 80) {
              me.callMethod(ins, { type: "triggerUpScroll" });
            }
          }
        }
        me.callMethod(ins, { type: "setWxsProp" });
      }
      me.disabled = function() {
        return !me.optDown || !me.optDown.use || me.optDown.native;
      };
      me.getPoint = function(e) {
        if (!e) {
          return { x: 0, y: 0 };
        }
        if (e.touches && e.touches[0]) {
          return { x: e.touches[0].pageX, y: e.touches[0].pageY };
        } else if (e.changedTouches && e.changedTouches[0]) {
          return { x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY };
        } else {
          return { x: e.clientX, y: e.clientY };
        }
      };
      me.getAngle = function(p1, p2) {
        var x = Math.abs(p1.x - p2.x);
        var y = Math.abs(p1.y - p2.y);
        var z = Math.sqrt(x * x + y * y);
        var angle = 0;
        if (z !== 0) {
          angle = Math.asin(y / z) / Math.PI * 180;
        }
        return angle;
      };
      me.getScrollTop = function() {
        return me.scrollTop || 0;
      };
      me.getBodyHeight = function() {
        return me.bodyHeight || 0;
      };
      me.callMethod = function(ins, param) {
        if (ins)
          ins.callMethod("wxsCall", param);
      };
      module.exports = {
        propObserver,
        callObserver,
        touchstartEvent,
        touchmoveEvent,
        touchendEvent
      };
    }
  });
  return require_stdin();
})();
