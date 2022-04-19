"use strict";
var common_vendor = require("./common/vendor.js");
function MeScroll(options, isScrollBody) {
  let me = this;
  me.version = "1.3.7";
  me.options = options || {};
  me.isScrollBody = isScrollBody || false;
  me.isDownScrolling = false;
  me.isUpScrolling = false;
  let hasDownCallback = me.options.down && me.options.down.callback;
  me.initDownScroll();
  me.initUpScroll();
  setTimeout(function() {
    if ((me.optDown.use || me.optDown.native) && me.optDown.auto && hasDownCallback) {
      if (me.optDown.autoShowLoading) {
        me.triggerDownScroll();
      } else {
        me.optDown.callback && me.optDown.callback(me);
      }
    }
    if (!me.isUpAutoLoad) {
      setTimeout(function() {
        me.optUp.use && me.optUp.auto && !me.isUpAutoLoad && me.triggerUpScroll();
      }, 100);
    }
  }, 30);
}
MeScroll.prototype.extendDownScroll = function(optDown) {
  MeScroll.extend(optDown, {
    use: true,
    auto: true,
    native: false,
    autoShowLoading: false,
    isLock: false,
    offset: 80,
    startTop: 100,
    inOffsetRate: 1,
    outOffsetRate: 0.2,
    bottomOffset: 20,
    minAngle: 45,
    textInOffset: "\u4E0B\u62C9\u5237\u65B0",
    textOutOffset: "\u91CA\u653E\u66F4\u65B0",
    textLoading: "\u52A0\u8F7D\u4E2D ...",
    textSuccess: "\u52A0\u8F7D\u6210\u529F",
    textErr: "\u52A0\u8F7D\u5931\u8D25",
    beforeEndDelay: 0,
    bgColor: "transparent",
    textColor: "gray",
    inited: null,
    inOffset: null,
    outOffset: null,
    onMoving: null,
    beforeLoading: null,
    showLoading: null,
    afterLoading: null,
    beforeEndDownScroll: null,
    endDownScroll: null,
    afterEndDownScroll: null,
    callback: function(mescroll) {
      mescroll.resetUpScroll();
    }
  });
};
MeScroll.prototype.extendUpScroll = function(optUp) {
  MeScroll.extend(optUp, {
    use: true,
    auto: true,
    isLock: false,
    isBoth: true,
    callback: null,
    page: {
      num: 0,
      size: 10,
      time: null
    },
    noMoreSize: 5,
    offset: 150,
    textLoading: "\u52A0\u8F7D\u4E2D ...",
    textNoMore: "-- END --",
    bgColor: "transparent",
    textColor: "gray",
    inited: null,
    showLoading: null,
    showNoMore: null,
    hideUpScroll: null,
    errDistance: 60,
    toTop: {
      src: null,
      offset: 1e3,
      duration: 300,
      btnClick: null,
      onShow: null,
      zIndex: 9990,
      left: null,
      right: 20,
      bottom: 120,
      safearea: false,
      width: 72,
      radius: "50%"
    },
    empty: {
      use: true,
      icon: null,
      tip: "~ \u6682\u65E0\u76F8\u5173\u6570\u636E ~",
      btnText: "",
      btnClick: null,
      onShow: null,
      fixed: false,
      top: "100rpx",
      zIndex: 99
    },
    onScroll: false
  });
};
MeScroll.extend = function(userOption, defaultOption) {
  if (!userOption)
    return defaultOption;
  for (let key in defaultOption) {
    if (userOption[key] == null) {
      let def = defaultOption[key];
      if (def != null && typeof def === "object") {
        userOption[key] = MeScroll.extend({}, def);
      } else {
        userOption[key] = def;
      }
    } else if (typeof userOption[key] === "object") {
      MeScroll.extend(userOption[key], defaultOption[key]);
    }
  }
  return userOption;
};
MeScroll.prototype.hasColor = function(color) {
  if (!color)
    return false;
  let c = color.toLowerCase();
  return c != "#fff" && c != "#ffffff" && c != "transparent" && c != "white";
};
MeScroll.prototype.initDownScroll = function() {
  let me = this;
  me.optDown = me.options.down || {};
  if (!me.optDown.textColor && me.hasColor(me.optDown.bgColor))
    me.optDown.textColor = "#fff";
  me.extendDownScroll(me.optDown);
  if (me.isScrollBody && me.optDown.native) {
    me.optDown.use = false;
  } else {
    me.optDown.native = false;
  }
  me.downHight = 0;
  if (me.optDown.use && me.optDown.inited) {
    setTimeout(function() {
      me.optDown.inited(me);
    }, 0);
  }
};
MeScroll.prototype.touchstartEvent = function(e) {
  if (!this.optDown.use)
    return;
  this.startPoint = this.getPoint(e);
  this.startTop = this.getScrollTop();
  this.startAngle = 0;
  this.lastPoint = this.startPoint;
  this.maxTouchmoveY = this.getBodyHeight() - this.optDown.bottomOffset;
  this.inTouchend = false;
};
MeScroll.prototype.touchmoveEvent = function(e) {
  if (!this.optDown.use)
    return;
  let me = this;
  let scrollTop = me.getScrollTop();
  let curPoint = me.getPoint(e);
  let moveY = curPoint.y - me.startPoint.y;
  if (moveY > 0 && (me.isScrollBody && scrollTop <= 0 || !me.isScrollBody && (scrollTop <= 0 || scrollTop <= me.optDown.startTop && scrollTop === me.startTop))) {
    if (!me.inTouchend && !me.isDownScrolling && !me.optDown.isLock && (!me.isUpScrolling || me.isUpScrolling && me.optUp.isBoth)) {
      if (!me.startAngle)
        me.startAngle = me.getAngle(me.lastPoint, curPoint);
      if (me.startAngle < me.optDown.minAngle)
        return;
      if (me.maxTouchmoveY > 0 && curPoint.y >= me.maxTouchmoveY) {
        me.inTouchend = true;
        me.touchendEvent();
        return;
      }
      me.preventDefault(e);
      let diff = curPoint.y - me.lastPoint.y;
      if (me.downHight < me.optDown.offset) {
        if (me.movetype !== 1) {
          me.movetype = 1;
          me.isDownEndSuccess = null;
          me.optDown.inOffset && me.optDown.inOffset(me);
          me.isMoveDown = true;
        }
        me.downHight += diff * me.optDown.inOffsetRate;
      } else {
        if (me.movetype !== 2) {
          me.movetype = 2;
          me.optDown.outOffset && me.optDown.outOffset(me);
          me.isMoveDown = true;
        }
        if (diff > 0) {
          me.downHight += diff * me.optDown.outOffsetRate;
        } else {
          me.downHight += diff;
        }
      }
      me.downHight = Math.round(me.downHight);
      let rate = me.downHight / me.optDown.offset;
      me.optDown.onMoving && me.optDown.onMoving(me, rate, me.downHight);
    }
  }
  me.lastPoint = curPoint;
};
MeScroll.prototype.touchendEvent = function(e) {
  if (!this.optDown.use)
    return;
  if (this.isMoveDown) {
    if (this.downHight >= this.optDown.offset) {
      this.triggerDownScroll();
    } else {
      this.downHight = 0;
      this.endDownScrollCall(this);
    }
    this.movetype = 0;
    this.isMoveDown = false;
  } else if (!this.isScrollBody && this.getScrollTop() === this.startTop) {
    let isScrollUp = this.getPoint(e).y - this.startPoint.y < 0;
    if (isScrollUp) {
      let angle = this.getAngle(this.getPoint(e), this.startPoint);
      if (angle > 80) {
        this.triggerUpScroll(true);
      }
    }
  }
};
MeScroll.prototype.getPoint = function(e) {
  if (!e) {
    return {
      x: 0,
      y: 0
    };
  }
  if (e.touches && e.touches[0]) {
    return {
      x: e.touches[0].pageX,
      y: e.touches[0].pageY
    };
  } else if (e.changedTouches && e.changedTouches[0]) {
    return {
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY
    };
  } else {
    return {
      x: e.clientX,
      y: e.clientY
    };
  }
};
MeScroll.prototype.getAngle = function(p1, p2) {
  let x = Math.abs(p1.x - p2.x);
  let y = Math.abs(p1.y - p2.y);
  let z = Math.sqrt(x * x + y * y);
  let angle = 0;
  if (z !== 0) {
    angle = Math.asin(y / z) / Math.PI * 180;
  }
  return angle;
};
MeScroll.prototype.triggerDownScroll = function() {
  if (this.optDown.beforeLoading && this.optDown.beforeLoading(this))
    ;
  else {
    this.showDownScroll();
    !this.optDown.native && this.optDown.callback && this.optDown.callback(this);
  }
};
MeScroll.prototype.showDownScroll = function() {
  this.isDownScrolling = true;
  if (this.optDown.native) {
    common_vendor.index.startPullDownRefresh();
    this.showDownLoadingCall(0);
  } else {
    this.downHight = this.optDown.offset;
    this.showDownLoadingCall(this.downHight);
  }
};
MeScroll.prototype.showDownLoadingCall = function(downHight) {
  this.optDown.showLoading && this.optDown.showLoading(this, downHight);
  this.optDown.afterLoading && this.optDown.afterLoading(this, downHight);
};
MeScroll.prototype.onPullDownRefresh = function() {
  this.isDownScrolling = true;
  this.showDownLoadingCall(0);
  this.optDown.callback && this.optDown.callback(this);
};
MeScroll.prototype.endDownScroll = function() {
  if (this.optDown.native) {
    this.isDownScrolling = false;
    this.endDownScrollCall(this);
    common_vendor.index.stopPullDownRefresh();
    return;
  }
  let me = this;
  let endScroll = function() {
    me.downHight = 0;
    me.isDownScrolling = false;
    me.endDownScrollCall(me);
    if (!me.isScrollBody) {
      me.setScrollHeight(0);
      me.scrollTo(0, 0);
    }
  };
  let delay = 0;
  if (me.optDown.beforeEndDownScroll) {
    delay = me.optDown.beforeEndDownScroll(me);
    if (me.isDownEndSuccess == null)
      delay = 0;
  }
  if (typeof delay === "number" && delay > 0) {
    setTimeout(endScroll, delay);
  } else {
    endScroll();
  }
};
MeScroll.prototype.endDownScrollCall = function() {
  this.optDown.endDownScroll && this.optDown.endDownScroll(this);
  this.optDown.afterEndDownScroll && this.optDown.afterEndDownScroll(this);
};
MeScroll.prototype.lockDownScroll = function(isLock) {
  if (isLock == null)
    isLock = true;
  this.optDown.isLock = isLock;
};
MeScroll.prototype.lockUpScroll = function(isLock) {
  if (isLock == null)
    isLock = true;
  this.optUp.isLock = isLock;
};
MeScroll.prototype.initUpScroll = function() {
  let me = this;
  me.optUp = me.options.up || { use: false };
  if (!me.optUp.textColor && me.hasColor(me.optUp.bgColor))
    me.optUp.textColor = "#fff";
  me.extendUpScroll(me.optUp);
  if (me.optUp.use === false)
    return;
  me.optUp.hasNext = true;
  me.startNum = me.optUp.page.num + 1;
  if (me.optUp.inited) {
    setTimeout(function() {
      me.optUp.inited(me);
    }, 0);
  }
};
MeScroll.prototype.onReachBottom = function() {
  if (this.isScrollBody && !this.isUpScrolling) {
    if (!this.optUp.isLock && this.optUp.hasNext) {
      this.triggerUpScroll();
    }
  }
};
MeScroll.prototype.onPageScroll = function(e) {
  if (!this.isScrollBody)
    return;
  this.setScrollTop(e.scrollTop);
  if (e.scrollTop >= this.optUp.toTop.offset) {
    this.showTopBtn();
  } else {
    this.hideTopBtn();
  }
};
MeScroll.prototype.scroll = function(e, onScroll) {
  this.setScrollTop(e.scrollTop);
  this.setScrollHeight(e.scrollHeight);
  if (this.preScrollY == null)
    this.preScrollY = 0;
  this.isScrollUp = e.scrollTop - this.preScrollY > 0;
  this.preScrollY = e.scrollTop;
  this.isScrollUp && this.triggerUpScroll(true);
  if (e.scrollTop >= this.optUp.toTop.offset) {
    this.showTopBtn();
  } else {
    this.hideTopBtn();
  }
  this.optUp.onScroll && onScroll && onScroll();
};
MeScroll.prototype.triggerUpScroll = function(isCheck) {
  if (!this.isUpScrolling && this.optUp.use && this.optUp.callback) {
    if (isCheck === true) {
      let canUp = false;
      if (this.optUp.hasNext && !this.optUp.isLock && !this.isDownScrolling) {
        if (this.getScrollBottom() <= this.optUp.offset) {
          canUp = true;
        }
      }
      if (canUp === false)
        return;
    }
    this.showUpScroll();
    this.optUp.page.num++;
    this.isUpAutoLoad = true;
    this.num = this.optUp.page.num;
    this.size = this.optUp.page.size;
    this.time = this.optUp.page.time;
    this.optUp.callback(this);
  }
};
MeScroll.prototype.showUpScroll = function() {
  this.isUpScrolling = true;
  this.optUp.showLoading && this.optUp.showLoading(this);
};
MeScroll.prototype.showNoMore = function() {
  this.optUp.hasNext = false;
  this.optUp.showNoMore && this.optUp.showNoMore(this);
};
MeScroll.prototype.hideUpScroll = function() {
  this.optUp.hideUpScroll && this.optUp.hideUpScroll(this);
};
MeScroll.prototype.endUpScroll = function(isShowNoMore) {
  if (isShowNoMore != null) {
    if (isShowNoMore) {
      this.showNoMore();
    } else {
      this.hideUpScroll();
    }
  }
  this.isUpScrolling = false;
};
MeScroll.prototype.resetUpScroll = function(isShowLoading) {
  if (this.optUp && this.optUp.use) {
    let page = this.optUp.page;
    this.prePageNum = page.num;
    this.prePageTime = page.time;
    page.num = this.startNum;
    page.time = null;
    if (!this.isDownScrolling && isShowLoading !== false) {
      if (isShowLoading == null) {
        this.removeEmpty();
        this.showUpScroll();
      } else {
        this.showDownScroll();
      }
    }
    this.isUpAutoLoad = true;
    this.num = page.num;
    this.size = page.size;
    this.time = page.time;
    this.optUp.callback && this.optUp.callback(this);
  }
};
MeScroll.prototype.setPageNum = function(num) {
  this.optUp.page.num = num - 1;
};
MeScroll.prototype.setPageSize = function(size) {
  this.optUp.page.size = size;
};
MeScroll.prototype.endByPage = function(dataSize, totalPage, systime) {
  let hasNext;
  if (this.optUp.use && totalPage != null)
    hasNext = this.optUp.page.num < totalPage;
  this.endSuccess(dataSize, hasNext, systime);
};
MeScroll.prototype.endBySize = function(dataSize, totalSize, systime) {
  let hasNext;
  if (this.optUp.use && totalSize != null) {
    let loadSize = (this.optUp.page.num - 1) * this.optUp.page.size + dataSize;
    hasNext = loadSize < totalSize;
  }
  this.endSuccess(dataSize, hasNext, systime);
};
MeScroll.prototype.endSuccess = function(dataSize, hasNext, systime) {
  let me = this;
  if (me.isDownScrolling) {
    me.isDownEndSuccess = true;
    me.endDownScroll();
  }
  if (me.optUp.use) {
    let isShowNoMore;
    if (dataSize != null) {
      let pageNum = me.optUp.page.num;
      let pageSize = me.optUp.page.size;
      if (pageNum === 1) {
        if (systime)
          me.optUp.page.time = systime;
      }
      if (dataSize < pageSize || hasNext === false) {
        me.optUp.hasNext = false;
        if (dataSize === 0 && pageNum === 1) {
          isShowNoMore = false;
          me.showEmpty();
        } else {
          let allDataSize = (pageNum - 1) * pageSize + dataSize;
          if (allDataSize < me.optUp.noMoreSize) {
            isShowNoMore = false;
          } else {
            isShowNoMore = true;
          }
          me.removeEmpty();
        }
      } else {
        isShowNoMore = false;
        me.optUp.hasNext = true;
        me.removeEmpty();
      }
    }
    me.endUpScroll(isShowNoMore);
  }
};
MeScroll.prototype.endErr = function(errDistance) {
  if (this.isDownScrolling) {
    this.isDownEndSuccess = false;
    let page = this.optUp.page;
    if (page && this.prePageNum) {
      page.num = this.prePageNum;
      page.time = this.prePageTime;
    }
    this.endDownScroll();
  }
  if (this.isUpScrolling) {
    this.optUp.page.num--;
    this.endUpScroll(false);
    if (this.isScrollBody && errDistance !== 0) {
      if (!errDistance)
        errDistance = this.optUp.errDistance;
      this.scrollTo(this.getScrollTop() - errDistance, 0);
    }
  }
};
MeScroll.prototype.showEmpty = function() {
  this.optUp.empty.use && this.optUp.empty.onShow && this.optUp.empty.onShow(true);
};
MeScroll.prototype.removeEmpty = function() {
  this.optUp.empty.use && this.optUp.empty.onShow && this.optUp.empty.onShow(false);
};
MeScroll.prototype.showTopBtn = function() {
  if (!this.topBtnShow) {
    this.topBtnShow = true;
    this.optUp.toTop.onShow && this.optUp.toTop.onShow(true);
  }
};
MeScroll.prototype.hideTopBtn = function() {
  if (this.topBtnShow) {
    this.topBtnShow = false;
    this.optUp.toTop.onShow && this.optUp.toTop.onShow(false);
  }
};
MeScroll.prototype.getScrollTop = function() {
  return this.scrollTop || 0;
};
MeScroll.prototype.setScrollTop = function(y) {
  this.scrollTop = y;
};
MeScroll.prototype.scrollTo = function(y, t) {
  this.myScrollTo && this.myScrollTo(y, t);
};
MeScroll.prototype.resetScrollTo = function(myScrollTo) {
  this.myScrollTo = myScrollTo;
};
MeScroll.prototype.getScrollBottom = function() {
  return this.getScrollHeight() - this.getClientHeight() - this.getScrollTop();
};
MeScroll.prototype.getStep = function(star, end, callback, t, rate) {
  let diff = end - star;
  if (t === 0 || diff === 0) {
    callback && callback(end);
    return;
  }
  t = t || 300;
  rate = rate || 30;
  let count = t / rate;
  let step = diff / count;
  let i = 0;
  let timer = setInterval(function() {
    if (i < count - 1) {
      star += step;
      callback && callback(star, timer);
      i++;
    } else {
      callback && callback(end, timer);
      clearInterval(timer);
    }
  }, rate);
};
MeScroll.prototype.getClientHeight = function(isReal) {
  let h = this.clientHeight || 0;
  if (h === 0 && isReal !== true) {
    h = this.getBodyHeight();
  }
  return h;
};
MeScroll.prototype.setClientHeight = function(h) {
  this.clientHeight = h;
};
MeScroll.prototype.getScrollHeight = function() {
  return this.scrollHeight || 0;
};
MeScroll.prototype.setScrollHeight = function(h) {
  this.scrollHeight = h;
};
MeScroll.prototype.getBodyHeight = function() {
  return this.bodyHeight || 0;
};
MeScroll.prototype.setBodyHeight = function(h) {
  this.bodyHeight = h;
};
MeScroll.prototype.preventDefault = function(e) {
  if (e && e.cancelable && !e.defaultPrevented)
    e.preventDefault();
};
var block0 = (Component) => {
  if (!Component.wxsCallMethods) {
    Component.wxsCallMethods = [];
  }
  Component.wxsCallMethods.push("wxsCall");
};
exports.MeScroll = MeScroll;
exports.block0 = block0;
