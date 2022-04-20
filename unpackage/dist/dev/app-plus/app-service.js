var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
(function(vue) {
  "use strict";
  function _interopNamespace(e) {
    if (e && e.__esModule)
      return e;
    var n = { __proto__: null, [Symbol.toStringTag]: "Module" };
    if (e) {
      Object.keys(e).forEach(function(k) {
        if (k !== "default") {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function() {
              return e[k];
            }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }
  var vue__namespace = /* @__PURE__ */ _interopNamespace(vue);
  Object.freeze({});
  Object.freeze([]);
  const isString = (val) => typeof val === "string";
  const objectToString = Object.prototype.toString;
  const toTypeString = (value) => objectToString.call(value);
  const toRawType = (value) => {
    return toTypeString(value).slice(8, -1);
  };
  const ON_PAGE_SCROLL = "onPageScroll";
  const ON_REACH_BOTTOM = "onReachBottom";
  const ON_NAVIGATION_BAR_BUTTON_TAP = "onNavigationBarButtonTap";
  const ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED = "onNavigationBarSearchInputClicked";
  const ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED = "onNavigationBarSearchInputChanged";
  const ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED = "onNavigationBarSearchInputConfirmed";
  function isDebugMode() {
    return typeof __channelId__ === "string" && __channelId__;
  }
  function jsonStringifyReplacer(k, p) {
    switch (toRawType(p)) {
      case "Function":
        return "function() { [native code] }";
      default:
        return p;
    }
  }
  function normalizeLog(type, filename, args) {
    if (isDebugMode()) {
      args.push(filename.replace("at ", "uni-app:///"));
      return console[type].apply(console, args);
    }
    const msgs = args.map(function(v) {
      const type2 = toTypeString(v).toLowerCase();
      if (type2 === "[object object]" || type2 === "[object array]") {
        try {
          v = "---BEGIN:JSON---" + JSON.stringify(v, jsonStringifyReplacer) + "---END:JSON---";
        } catch (e) {
          v = type2;
        }
      } else {
        if (v === null) {
          v = "---NULL---";
        } else if (v === void 0) {
          v = "---UNDEFINED---";
        } else {
          const vType = toRawType(v).toUpperCase();
          if (vType === "NUMBER" || vType === "BOOLEAN") {
            v = "---BEGIN:" + vType + "---" + v + "---END:" + vType + "---";
          } else {
            v = String(v);
          }
        }
      }
      return v;
    });
    return msgs.join("---COMMA---") + " " + filename;
  }
  function formatAppLog(type, filename, ...args) {
    const res = normalizeLog(type, filename, args);
    res && console[type](res);
  }
  var _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const __default__ = {
    props: {
      banners: {
        type: Array,
        default: () => []
      }
    },
    setup(props) {
      let background = vue.ref("#254284");
      const change = (e) => {
        background.value = props.banners[e.detail.current].background;
      };
      return {
        change,
        background
      };
    }
  };
  const __injectCSSVars__ = () => {
    vue.useCssVars((_ctx) => ({
      "3f833c78-background": _ctx.background
    }));
  };
  const __setup__ = __default__.setup;
  __default__.setup = __setup__ ? (props, ctx) => {
    __injectCSSVars__();
    return __setup__(props, ctx);
  } : __injectCSSVars__;
  const _sfc_main$S = __default__;
  function _sfc_render$R(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "main" }, [
      vue.createElementVNode("view", { class: "sw-background" }),
      vue.createElementVNode("swiper", {
        "indicator-dots": true,
        circular: true,
        autoplay: true,
        interval: 3e3,
        duration: 1e3,
        class: "swiper",
        onChange: _cache[0] || (_cache[0] = (...args) => $setup.change && $setup.change(...args))
      }, [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.banners, (item) => {
          return vue.openBlock(), vue.createElementBlock("swiper-item", {
            class: "swiper-item",
            key: item.id,
            onClick: ($event) => _ctx.navTo(item.advertUrl)
          }, [
            vue.createElementVNode("image", {
              src: item.imageUrl,
              class: "swiper-img"
            }, null, 8, ["src"])
          ], 8, ["onClick"]);
        }), 128))
      ], 32)
    ]);
  }
  var __easycom_0$a = /* @__PURE__ */ _export_sfc(_sfc_main$S, [["render", _sfc_render$R], ["__scopeId", "data-v-3f833c78"]]);
  function resolveEasycom(component, easycom) {
    return isString(component) ? easycom : component;
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  const onPageScroll = /* @__PURE__ */ createHook(ON_PAGE_SCROLL);
  const onReachBottom = /* @__PURE__ */ createHook(ON_REACH_BOTTOM);
  const onNavigationBarButtonTap = /* @__PURE__ */ createHook(ON_NAVIGATION_BAR_BUTTON_TAP);
  const onNavigationBarSearchInputChanged = /* @__PURE__ */ createHook(ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED);
  const onNavigationBarSearchInputClicked = /* @__PURE__ */ createHook(ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED);
  const onNavigationBarSearchInputConfirmed = /* @__PURE__ */ createHook(ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED);
  const GlobalOption = {
    down: {
      offset: 80,
      native: false
    },
    up: {
      offset: 150,
      toTop: {
        src: "https://www.mescroll.com/img/mescroll-totop.png",
        offset: 1e3,
        right: 20,
        bottom: 120,
        width: 72
      },
      empty: {
        use: true,
        icon: "https://www.mescroll.com/img/mescroll-empty.png"
      }
    },
    i18n: {
      zh: {
        down: {
          textInOffset: "\u4E0B\u62C9\u5237\u65B0",
          textOutOffset: "\u91CA\u653E\u66F4\u65B0",
          textLoading: "\u52A0\u8F7D\u4E2D ...",
          textSuccess: "\u52A0\u8F7D\u6210\u529F",
          textErr: "\u52A0\u8F7D\u5931\u8D25"
        },
        up: {
          textLoading: "\u52A0\u8F7D\u4E2D ...",
          textNoMore: "-- END --",
          empty: {
            tip: "~ \u7A7A\u7A7A\u5982\u4E5F ~"
          }
        }
      },
      en: {
        down: {
          textInOffset: "drop down refresh",
          textOutOffset: "release updates",
          textLoading: "loading ...",
          textSuccess: "loaded successfully",
          textErr: "loading failed"
        },
        up: {
          textLoading: "loading ...",
          textNoMore: "-- END --",
          empty: {
            tip: "~ absolutely empty ~"
          }
        }
      }
    }
  };
  const mescrollI18n = {
    def: "zh",
    getType() {
      return uni.getStorageSync("mescroll-i18n") || this.def;
    },
    setType(type) {
      uni.setStorageSync("mescroll-i18n", type);
    }
  };
  const _sfc_main$R = {
    props: {
      option: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    computed: {
      icon() {
        if (this.option.icon != null) {
          return this.option.icon;
        } else {
          let i18nType = mescrollI18n.getType();
          if (this.option.i18n) {
            return this.option.i18n[i18nType].icon;
          } else {
            return GlobalOption.i18n[i18nType].up.empty.icon || GlobalOption.up.empty.icon;
          }
        }
      },
      tip() {
        if (this.option.tip != null) {
          return this.option.tip;
        } else {
          let i18nType = mescrollI18n.getType();
          if (this.option.i18n) {
            return this.option.i18n[i18nType].tip;
          } else {
            return GlobalOption.i18n[i18nType].up.empty.tip || GlobalOption.up.empty.tip;
          }
        }
      },
      btnText() {
        if (this.option.i18n) {
          let i18nType = mescrollI18n.getType();
          return this.option.i18n[i18nType].btnText;
        } else {
          return this.option.btnText;
        }
      }
    },
    methods: {
      emptyClick() {
        this.$emit("emptyclick");
      }
    }
  };
  function _sfc_render$Q(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["mescroll-empty", { "empty-fixed": $props.option.fixed }]),
      style: vue.normalizeStyle({ "z-index": $props.option.zIndex, top: $props.option.top })
    }, [
      vue.createElementVNode("view", null, [
        $options.icon ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 0,
          class: "empty-icon",
          src: $options.icon,
          mode: "widthFix"
        }, null, 8, ["src"])) : vue.createCommentVNode("v-if", true)
      ]),
      $options.tip ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "empty-tip"
      }, vue.toDisplayString($options.tip), 1)) : vue.createCommentVNode("v-if", true),
      $options.btnText ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "empty-btn",
        onClick: _cache[0] || (_cache[0] = (...args) => $options.emptyClick && $options.emptyClick(...args))
      }, vue.toDisplayString($options.btnText), 1)) : vue.createCommentVNode("v-if", true)
    ], 6);
  }
  var __easycom_0$9 = /* @__PURE__ */ _export_sfc(_sfc_main$R, [["render", _sfc_render$Q], ["__scopeId", "data-v-79c5cef0"]]);
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
      uni.startPullDownRefresh();
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
      uni.stopPullDownRefresh();
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
  MeScroll.prototype.scrollTo = function(y, t2) {
    this.myScrollTo && this.myScrollTo(y, t2);
  };
  MeScroll.prototype.resetScrollTo = function(myScrollTo) {
    this.myScrollTo = myScrollTo;
  };
  MeScroll.prototype.getScrollBottom = function() {
    return this.getScrollHeight() - this.getClientHeight() - this.getScrollTop();
  };
  MeScroll.prototype.getStep = function(star, end, callback, t2, rate) {
    let diff = end - star;
    if (t2 === 0 || diff === 0) {
      callback && callback(end);
      return;
    }
    t2 = t2 || 300;
    rate = rate || 30;
    let count = t2 / rate;
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
  const _sfc_main$Q = {
    props: {
      option: Object,
      value: false
    },
    computed: {
      mOption() {
        return this.option || {};
      },
      left() {
        return this.mOption.left ? this.addUnit(this.mOption.left) : "auto";
      },
      right() {
        return this.mOption.left ? "auto" : this.addUnit(this.mOption.right);
      }
    },
    methods: {
      addUnit(num) {
        if (!num)
          return 0;
        if (typeof num === "number")
          return num + "rpx";
        return num;
      },
      toTopClick() {
        this.$emit("input", false);
        this.$emit("click");
      }
    }
  };
  function _sfc_render$P(_ctx, _cache, $props, $setup, $data, $options) {
    return $options.mOption.src ? (vue.openBlock(), vue.createElementBlock("image", {
      key: 0,
      class: vue.normalizeClass(["mescroll-totop", [$props.value ? "mescroll-totop-in" : "mescroll-totop-out", { "mescroll-totop-safearea": $options.mOption.safearea }]]),
      style: vue.normalizeStyle({ "z-index": $options.mOption.zIndex, "left": $options.left, "right": $options.right, "bottom": $options.addUnit($options.mOption.bottom), "width": $options.addUnit($options.mOption.width), "border-radius": $options.addUnit($options.mOption.radius) }),
      src: $options.mOption.src,
      mode: "widthFix",
      onClick: _cache[0] || (_cache[0] = (...args) => $options.toTopClick && $options.toTopClick(...args))
    }, null, 14, ["src"])) : vue.createCommentVNode("v-if", true);
  }
  var MescrollTop = /* @__PURE__ */ _export_sfc(_sfc_main$Q, [["render", _sfc_render$P], ["__scopeId", "data-v-49b47e96"]]);
  const WxsMixin = {
    data() {
      return {
        wxsProp: {
          optDown: {},
          scrollTop: 0,
          bodyHeight: 0,
          isDownScrolling: false,
          isUpScrolling: false,
          isScrollBody: true,
          isUpBoth: true,
          t: 0
        },
        callProp: {
          callType: "",
          t: 0
        }
      };
    },
    methods: {
      wxsCall(msg2) {
        if (msg2.type === "setWxsProp") {
          this.wxsProp = {
            optDown: this.mescroll.optDown,
            scrollTop: this.mescroll.getScrollTop(),
            bodyHeight: this.mescroll.getBodyHeight(),
            isDownScrolling: this.mescroll.isDownScrolling,
            isUpScrolling: this.mescroll.isUpScrolling,
            isUpBoth: this.mescroll.optUp.isBoth,
            isScrollBody: this.mescroll.isScrollBody,
            t: Date.now()
          };
        } else if (msg2.type === "setLoadType") {
          this.downLoadType = msg2.downLoadType;
          this.$set(this.mescroll, "downLoadType", this.downLoadType);
          this.$set(this.mescroll, "isDownEndSuccess", null);
        } else if (msg2.type === "triggerDownScroll") {
          this.mescroll.triggerDownScroll();
        } else if (msg2.type === "endDownScroll") {
          this.mescroll.endDownScroll();
        } else if (msg2.type === "triggerUpScroll") {
          this.mescroll.triggerUpScroll(true);
        }
      }
    },
    mounted() {
      this.mescroll.optDown.afterLoading = () => {
        this.callProp = { callType: "showLoading", t: Date.now() };
      };
      this.mescroll.optDown.afterEndDownScroll = () => {
        this.callProp = { callType: "endDownScroll", t: Date.now() };
        let delay = 300 + (this.mescroll.optDown.beforeEndDelay || 0);
        setTimeout(() => {
          if (this.downLoadType === 4 || this.downLoadType === 0) {
            this.callProp = { callType: "clearTransform", t: Date.now() };
          }
          this.$set(this.mescroll, "downLoadType", this.downLoadType);
        }, delay);
      };
      this.wxsCall({ type: "setWxsProp" });
    }
  };
  var block0 = (Comp) => {
    (Comp.$wxs || (Comp.$wxs = [])).push("wxsBiz");
    (Comp.$wxsModules || (Comp.$wxsModules = {}))["wxsBiz"] = "3169f6de";
  };
  var block1$1 = (Comp) => {
    (Comp.$renderjs || (Comp.$renderjs = [])).push("renderBiz");
    (Comp.$renderjsModules || (Comp.$renderjsModules = {}))["renderBiz"] = "1ca30ca9";
  };
  const _sfc_main$P = {
    name: "mescroll-body",
    mixins: [WxsMixin],
    components: {
      MescrollTop
    },
    props: {
      down: Object,
      up: Object,
      i18n: Object,
      top: [String, Number],
      topbar: [Boolean, String],
      bottom: [String, Number],
      safearea: Boolean,
      height: [String, Number],
      bottombar: {
        type: Boolean,
        default: true
      },
      sticky: Boolean
    },
    data() {
      return {
        mescroll: { optDown: {}, optUp: {} },
        downHight: 0,
        downRate: 0,
        downLoadType: 0,
        upLoadType: 0,
        isShowEmpty: false,
        isShowToTop: false,
        windowHeight: 0,
        windowBottom: 0,
        statusBarHeight: 0
      };
    },
    computed: {
      minHeight() {
        return this.toPx(this.height || "100%") + "px";
      },
      numTop() {
        return this.toPx(this.top);
      },
      padTop() {
        return this.numTop + "px";
      },
      numBottom() {
        return this.toPx(this.bottom);
      },
      padBottom() {
        return this.numBottom + "px";
      },
      isDownReset() {
        return this.downLoadType === 3 || this.downLoadType === 4;
      },
      transition() {
        return this.isDownReset ? "transform 300ms" : "";
      },
      translateY() {
        return this.downHight > 0 ? "translateY(" + this.downHight + "px)" : "";
      },
      isDownLoading() {
        return this.downLoadType === 3;
      },
      downRotate() {
        return "rotate(" + 360 * this.downRate + "deg)";
      },
      downText() {
        if (!this.mescroll)
          return "";
        switch (this.downLoadType) {
          case 1:
            return this.mescroll.optDown.textInOffset;
          case 2:
            return this.mescroll.optDown.textOutOffset;
          case 3:
            return this.mescroll.optDown.textLoading;
          case 4:
            return this.mescroll.isDownEndSuccess ? this.mescroll.optDown.textSuccess : this.mescroll.isDownEndSuccess == false ? this.mescroll.optDown.textErr : this.mescroll.optDown.textInOffset;
          default:
            return this.mescroll.optDown.textInOffset;
        }
      }
    },
    methods: {
      toPx(num) {
        if (typeof num === "string") {
          if (num.indexOf("px") !== -1) {
            if (num.indexOf("rpx") !== -1) {
              num = num.replace("rpx", "");
            } else if (num.indexOf("upx") !== -1) {
              num = num.replace("upx", "");
            } else {
              return Number(num.replace("px", ""));
            }
          } else if (num.indexOf("%") !== -1) {
            let rate = Number(num.replace("%", "")) / 100;
            return this.windowHeight * rate;
          }
        }
        return num ? uni.upx2px(Number(num)) : 0;
      },
      emptyClick() {
        this.$emit("emptyclick", this.mescroll);
      },
      toTopClick() {
        this.mescroll.scrollTo(0, this.mescroll.optUp.toTop.duration);
        this.$emit("topclick", this.mescroll);
      }
    },
    created() {
      let vm = this;
      let diyOption = {
        down: {
          inOffset() {
            vm.downLoadType = 1;
          },
          outOffset() {
            vm.downLoadType = 2;
          },
          onMoving(mescroll, rate, downHight) {
            vm.downHight = downHight;
            vm.downRate = rate;
          },
          showLoading(mescroll, downHight) {
            vm.downLoadType = 3;
            vm.downHight = downHight;
          },
          beforeEndDownScroll(mescroll) {
            vm.downLoadType = 4;
            return mescroll.optDown.beforeEndDelay;
          },
          endDownScroll() {
            vm.downLoadType = 4;
            vm.downHight = 0;
            if (vm.downResetTimer) {
              clearTimeout(vm.downResetTimer);
              vm.downResetTimer = null;
            }
            vm.downResetTimer = setTimeout(() => {
              if (vm.downLoadType === 4)
                vm.downLoadType = 0;
            }, 300);
          },
          callback: function(mescroll) {
            vm.$emit("down", mescroll);
          }
        },
        up: {
          showLoading() {
            vm.upLoadType = 1;
          },
          showNoMore() {
            vm.upLoadType = 2;
          },
          hideUpScroll(mescroll) {
            vm.upLoadType = mescroll.optUp.hasNext ? 0 : 3;
          },
          empty: {
            onShow(isShow) {
              vm.isShowEmpty = isShow;
            }
          },
          toTop: {
            onShow(isShow) {
              vm.isShowToTop = isShow;
            }
          },
          callback: function(mescroll) {
            vm.$emit("up", mescroll);
          }
        }
      };
      let i18nType = mescrollI18n.getType();
      let i18nOption = { type: i18nType };
      MeScroll.extend(i18nOption, vm.i18n);
      MeScroll.extend(i18nOption, GlobalOption.i18n);
      MeScroll.extend(diyOption, i18nOption[i18nType]);
      MeScroll.extend(diyOption, { down: GlobalOption.down, up: GlobalOption.up });
      let myOption = JSON.parse(JSON.stringify({ down: vm.down, up: vm.up }));
      MeScroll.extend(myOption, diyOption);
      vm.mescroll = new MeScroll(myOption, true);
      vm.mescroll.i18n = i18nOption;
      vm.$emit("init", vm.mescroll);
      const sys = uni.getSystemInfoSync();
      if (sys.windowHeight)
        vm.windowHeight = sys.windowHeight;
      if (sys.windowBottom)
        vm.windowBottom = sys.windowBottom;
      if (sys.statusBarHeight)
        vm.statusBarHeight = sys.statusBarHeight;
      vm.mescroll.setBodyHeight(sys.windowHeight);
      vm.mescroll.resetScrollTo((y, t2) => {
        if (typeof y === "string") {
          setTimeout(() => {
            let selector;
            if (y.indexOf("#") == -1 && y.indexOf(".") == -1) {
              selector = "#" + y;
            } else {
              selector = y;
              if (y.indexOf(">>>") != -1) {
                selector = y.split(">>>")[1].trim();
              }
            }
            uni.createSelectorQuery().select(selector).boundingClientRect(function(rect) {
              if (rect) {
                let top = rect.top;
                top += vm.mescroll.getScrollTop();
                uni.pageScrollTo({
                  scrollTop: top,
                  duration: t2
                });
              } else {
                formatAppLog("error", "at uni_modules/mescroll-uni/components/mescroll-body/mescroll-body.vue:352", selector + " does not exist");
              }
            }).exec();
          }, 30);
        } else {
          uni.pageScrollTo({
            scrollTop: y,
            duration: t2
          });
        }
      });
      if (vm.up && vm.up.toTop && vm.up.toTop.safearea != null)
        ;
      else {
        vm.mescroll.optUp.toTop.safearea = vm.safearea;
      }
      uni.$on("setMescrollGlobalOption", (options) => {
        if (!options)
          return;
        let i18nType2 = options.i18n ? options.i18n.type : null;
        if (i18nType2 && vm.mescroll.i18n.type != i18nType2) {
          vm.mescroll.i18n.type = i18nType2;
          mescrollI18n.setType(i18nType2);
          MeScroll.extend(options, vm.mescroll.i18n[i18nType2]);
        }
        if (options.down) {
          let down = MeScroll.extend({}, options.down);
          vm.mescroll.optDown = MeScroll.extend(down, vm.mescroll.optDown);
        }
        if (options.up) {
          let up = MeScroll.extend({}, options.up);
          vm.mescroll.optUp = MeScroll.extend(up, vm.mescroll.optUp);
        }
      });
    },
    destroyed() {
      uni.$off("setMescrollGlobalOption");
    }
  };
  function _sfc_render$O(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_mescroll_empty = resolveEasycom(vue.resolveDynamicComponent("mescroll-empty"), __easycom_0$9);
    const _component_mescroll_top = vue.resolveComponent("mescroll-top");
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["mescroll-body mescroll-render-touch", { "mescorll-sticky": $props.sticky }]),
      style: vue.normalizeStyle({ "minHeight": $options.minHeight, "padding-top": $options.padTop, "padding-bottom": $options.padBottom }),
      onTouchstart: _cache[1] || (_cache[1] = (...args) => _ctx.wxsBiz.touchstartEvent && _ctx.wxsBiz.touchstartEvent(...args)),
      onTouchmove: _cache[2] || (_cache[2] = (...args) => _ctx.wxsBiz.touchmoveEvent && _ctx.wxsBiz.touchmoveEvent(...args)),
      onTouchend: _cache[3] || (_cache[3] = (...args) => _ctx.wxsBiz.touchendEvent && _ctx.wxsBiz.touchendEvent(...args)),
      onTouchcancel: _cache[4] || (_cache[4] = (...args) => _ctx.wxsBiz.touchendEvent && _ctx.wxsBiz.touchendEvent(...args)),
      "change:prop": _ctx.wxsBiz.propObserver,
      prop: _ctx.wxsProp
    }, [
      vue.createCommentVNode(" \u72B6\u6001\u680F "),
      $props.topbar && $data.statusBarHeight ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "mescroll-topbar",
        style: vue.normalizeStyle({ height: $data.statusBarHeight + "px", background: $props.topbar })
      }, null, 4)) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("view", {
        class: "mescroll-body-content mescroll-wxs-content",
        style: vue.normalizeStyle({ transform: $options.translateY, transition: $options.transition }),
        "change:prop": _ctx.wxsBiz.callObserver,
        prop: _ctx.callProp
      }, [
        vue.createCommentVNode(" \u4E0B\u62C9\u52A0\u8F7D\u533A\u57DF (\u652F\u4ED8\u5B9D\u5C0F\u7A0B\u5E8F\u5B50\u7EC4\u4EF6\u4F20\u53C2\u7ED9\u5B50\u5B50\u7EC4\u4EF6\u4ECD\u62A5\u5355\u9879\u6570\u636E\u6D41\u7684\u5F02\u5E38,\u6682\u65F6\u4E0D\u901A\u8FC7mescroll-down\u7EC4\u4EF6\u5B9E\u73B0)"),
        vue.createCommentVNode(' <mescroll-down :option="mescroll.optDown" :type="downLoadType" :rate="downRate"></mescroll-down> '),
        $data.mescroll.optDown.use ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "mescroll-downwarp",
          style: vue.normalizeStyle({ "background": $data.mescroll.optDown.bgColor, "color": $data.mescroll.optDown.textColor })
        }, [
          vue.createElementVNode("view", { class: "downwarp-content" }, [
            vue.createElementVNode("view", {
              class: vue.normalizeClass(["downwarp-progress mescroll-wxs-progress", { "mescroll-rotate": $options.isDownLoading }]),
              style: vue.normalizeStyle({ "border-color": $data.mescroll.optDown.textColor, "transform": $options.downRotate })
            }, null, 6),
            vue.createElementVNode("view", { class: "downwarp-tip" }, vue.toDisplayString($options.downText), 1)
          ])
        ], 4)) : vue.createCommentVNode("v-if", true),
        vue.createCommentVNode(" \u5217\u8868\u5185\u5BB9 "),
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
        vue.createCommentVNode(" \u7A7A\u5E03\u5C40 "),
        $data.isShowEmpty ? (vue.openBlock(), vue.createBlock(_component_mescroll_empty, {
          key: 1,
          option: $data.mescroll.optUp.empty,
          onEmptyclick: $options.emptyClick
        }, null, 8, ["option", "onEmptyclick"])) : vue.createCommentVNode("v-if", true),
        vue.createCommentVNode(" \u4E0A\u62C9\u52A0\u8F7D\u533A\u57DF (\u4E0B\u62C9\u5237\u65B0\u65F6\u4E0D\u663E\u793A, \u652F\u4ED8\u5B9D\u5C0F\u7A0B\u5E8F\u5B50\u7EC4\u4EF6\u4F20\u53C2\u7ED9\u5B50\u5B50\u7EC4\u4EF6\u4ECD\u62A5\u5355\u9879\u6570\u636E\u6D41\u7684\u5F02\u5E38,\u6682\u65F6\u4E0D\u901A\u8FC7mescroll-up\u7EC4\u4EF6\u5B9E\u73B0)"),
        vue.createCommentVNode(' <mescroll-up v-if="mescroll.optUp.use && !isDownLoading && upLoadType!==3" :option="mescroll.optUp" :type="upLoadType"></mescroll-up> '),
        $data.mescroll.optUp.use && !$options.isDownLoading && $data.upLoadType !== 3 ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 2,
          class: "mescroll-upwarp",
          style: vue.normalizeStyle({ "background": $data.mescroll.optUp.bgColor, "color": $data.mescroll.optUp.textColor })
        }, [
          vue.createCommentVNode(" \u52A0\u8F7D\u4E2D (\u6B64\u5904\u4E0D\u80FD\u7528v-if,\u5426\u5219android\u5C0F\u7A0B\u5E8F\u5FEB\u901F\u4E0A\u62C9\u53EF\u80FD\u4F1A\u4E0D\u65AD\u89E6\u53D1\u4E0A\u62C9\u56DE\u8C03) "),
          vue.withDirectives(vue.createElementVNode("view", null, [
            vue.createElementVNode("view", {
              class: "upwarp-progress mescroll-rotate",
              style: vue.normalizeStyle({ "border-color": $data.mescroll.optUp.textColor })
            }, null, 4),
            vue.createElementVNode("view", { class: "upwarp-tip" }, vue.toDisplayString($data.mescroll.optUp.textLoading), 1)
          ], 512), [
            [vue.vShow, $data.upLoadType === 1]
          ]),
          vue.createCommentVNode(" \u65E0\u6570\u636E "),
          $data.upLoadType === 2 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "upwarp-nodata"
          }, vue.toDisplayString($data.mescroll.optUp.textNoMore), 1)) : vue.createCommentVNode("v-if", true)
        ], 4)) : vue.createCommentVNode("v-if", true)
      ], 12, ["change:prop", "prop"]),
      vue.createCommentVNode(" \u5E95\u90E8\u662F\u5426\u504F\u79FBTabBar\u7684\u9AD8\u5EA6(\u9ED8\u8BA4\u4EC5\u5728H5\u7AEF\u7684tab\u9875\u751F\u6548) "),
      vue.createCommentVNode(" \u9002\u914DiPhoneX "),
      $props.safearea ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "mescroll-safearea"
      })) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" \u56DE\u5230\u9876\u90E8\u6309\u94AE (fixed\u5143\u7D20\u9700\u5199\u5728transform\u5916\u9762,\u9632\u6B62\u964D\u7EA7\u4E3Aabsolute)"),
      vue.createVNode(_component_mescroll_top, {
        modelValue: $data.isShowToTop,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.isShowToTop = $event),
        option: $data.mescroll.optUp.toTop,
        onClick: $options.toTopClick
      }, null, 8, ["modelValue", "option", "onClick"]),
      vue.createCommentVNode(" renderjs\u7684\u6570\u636E\u8F7D\u4F53,\u4E0D\u53EF\u5199\u5728mescroll-downwarp\u5185\u90E8,\u907F\u514Duse\u4E3Afalse\u65F6,\u8F7D\u4F53\u4E22\u5931,\u65E0\u6CD5\u66F4\u65B0\u6570\u636E "),
      vue.createElementVNode("view", {
        "change:prop": _ctx.renderBiz.propObserver,
        prop: _ctx.wxsProp
      }, null, 8, ["change:prop", "prop"])
    ], 46, ["change:prop", "prop"]);
  }
  if (typeof block0 === "function")
    block0(_sfc_main$P);
  if (typeof block1$1 === "function")
    block1$1(_sfc_main$P);
  var __easycom_1$4 = /* @__PURE__ */ _export_sfc(_sfc_main$P, [["render", _sfc_render$O], ["__scopeId", "data-v-07e5713e"]]);
  const _sfc_main$O = {
    props: {
      categoryList: {
        type: Array,
        default: () => []
      }
    },
    setup() {
      let { proxy } = vue.getCurrentInstance();
      let toSearch = (id, name) => {
        let params = JSON.stringify({ labelId: null, name, categoryId: id });
        proxy.navTo("/pages/search/search?data=" + params);
      };
      let toAllCategory = () => {
        let params = JSON.stringify({ labelId: null, name: "\u5168\u90E8\u5206\u7C7B", categoryId: null });
        proxy.navTo("/pages/search/search?data=" + params);
      };
      return {
        toSearch,
        toAllCategory
      };
    }
  };
  function _sfc_render$N(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "category-box" }, [
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.categoryList.slice(0, 7), (item) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          key: item.id,
          onClick: ($event) => $setup.toSearch(item.id, item.name)
        }, vue.toDisplayString(item.name), 9, ["onClick"]);
      }), 128)),
      vue.createElementVNode("view", {
        onClick: _cache[0] || (_cache[0] = (...args) => $setup.toAllCategory && $setup.toAllCategory(...args))
      }, "\u5168\u90E8\u5206\u7C7B")
    ]);
  }
  var categoryBox = /* @__PURE__ */ _export_sfc(_sfc_main$O, [["render", _sfc_render$N], ["__scopeId", "data-v-a0997b4a"]]);
  const _sfc_main$N = {
    props: {
      isColumn: {
        type: Boolean,
        default: false
      },
      item: {
        type: Object,
        default: () => ({
          id: 1,
          title: "\u9ED8\u8BA4\u6807\u9898",
          mainImage: "../../static/images/banner1.jpg",
          totalTime: 123456,
          nickName: "\u82CD\u8001\u5E08",
          isFree: 0,
          priceDiscount: 99,
          priceOriginal: 198,
          studyTotal: 100
        })
      }
    },
    setup() {
    }
  };
  function _sfc_render$M(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["course-item", { "column": $props.isColumn }]),
      onClick: _cache[0] || (_cache[0] = ($event) => _ctx.navTo(`/pages/course/course-details?id=${$props.item.id}`))
    }, [
      vue.createElementVNode("view", { class: "item-left" }, [
        vue.createElementVNode("image", {
          class: "course-img",
          src: $props.item.mainImage
        }, null, 8, ["src"]),
        vue.createElementVNode("view", { class: "course-time" }, vue.toDisplayString($props.item.totalTime), 1)
      ]),
      vue.createElementVNode("view", { class: "item-right" }, [
        vue.createElementVNode("view", { class: "title" }, vue.toDisplayString($props.item.title), 1),
        vue.createElementVNode("view", { class: "info" }, [
          vue.createElementVNode("view", { class: "nickname iconfont icon-laoshi2" }, vue.toDisplayString($props.item.nickName), 1),
          vue.createElementVNode("view", { class: "count" }, [
            $props.item.isFree ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "money"
            }, "\u514D\u8D39")) : (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "money iconfont icon-moneybag"
            }, vue.toDisplayString($props.item.priceDiscount || $props.item.priceOriginal), 1)),
            vue.createElementVNode("view", { class: "iconfont icon-video" }, vue.toDisplayString($props.item.studyTotal) + " \u4EBA\u5728\u5B66", 1)
          ])
        ])
      ])
    ], 2);
  }
  var __easycom_0$8 = /* @__PURE__ */ _export_sfc(_sfc_main$N, [["render", _sfc_render$M], ["__scopeId", "data-v-1990ede0"]]);
  const _sfc_main$M = {
    props: {
      title: {
        type: String,
        default: "\u9ED8\u8BA4\u6807\u9898"
      },
      word: {
        type: String,
        default: ""
      },
      all: {
        type: Boolean,
        default: false
      }
    },
    setup(props, { emit }) {
      let handleClick = () => {
        emit("clickAll");
      };
      return {
        handleClick
      };
    }
  };
  function _sfc_render$L(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "list-box" }, [
      vue.createElementVNode("view", { class: "title space-between center" }, [
        vue.createElementVNode("view", { class: "center" }, [
          vue.createElementVNode("text", { class: "name" }, vue.toDisplayString($props.title), 1),
          $props.word ? (vue.openBlock(), vue.createElementBlock("text", {
            key: 0,
            class: "word"
          }, vue.toDisplayString($props.word), 1)) : vue.createCommentVNode("v-if", true)
        ]),
        $props.all ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "all",
          onClick: _cache[0] || (_cache[0] = (...args) => $setup.handleClick && $setup.handleClick(...args))
        }, [
          vue.createElementVNode("text", null, "\u5168\u90E8"),
          vue.createElementVNode("text", { class: "iconfont icon-right" })
        ])) : vue.createCommentVNode("v-if", true)
      ]),
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ]);
  }
  var __easycom_1$3 = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["render", _sfc_render$L], ["__scopeId", "data-v-0993e984"]]);
  const _sfc_main$L = {
    props: {
      title: {
        type: String,
        default: "\u9ED8\u8BA4\u6807\u9898"
      },
      word: {
        type: String,
        default: ""
      },
      all: {
        type: Boolean,
        default: false
      },
      column: {
        type: Number,
        default: 2
      },
      row: {
        type: Number,
        default: 4
      },
      courseData: {
        type: Array,
        default: () => []
      },
      params: {
        type: Object,
        default: () => ({})
      }
    },
    setup(props) {
      let { proxy } = vue.getCurrentInstance();
      let clickAll = () => {
        let params = JSON.stringify(props.params);
        proxy.navTo("/pages/search/search?data=" + params);
      };
      return {
        clickAll
      };
    }
  };
  function _sfc_render$K(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_course_item = resolveEasycom(vue.resolveDynamicComponent("course-item"), __easycom_0$8);
    const _component_list_box = resolveEasycom(vue.resolveDynamicComponent("list-box"), __easycom_1$3);
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
      vue.createCommentVNode(" \u5E26\u5934\u90E8\u7684\u63D2\u69FD\u7EC4\u4EF6 "),
      vue.createVNode(_component_list_box, {
        title: $props.title,
        word: $props.word,
        all: $props.all,
        onClickAll: $setup.clickAll
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("swiper", {
            "next-margin": "20rpx",
            style: vue.normalizeStyle({ "height": `${200 * $props.row}rpx` })
          }, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.column, (col, index) => {
              return vue.openBlock(), vue.createElementBlock("swiper-item", { key: col }, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.courseData.slice(index * $props.row, (index + 1) * $props.row), (item) => {
                  return vue.openBlock(), vue.createBlock(_component_course_item, {
                    item,
                    key: item.id
                  }, null, 8, ["item"]);
                }), 128))
              ]);
            }), 128))
          ], 4)
        ]),
        _: 1
      }, 8, ["title", "word", "all", "onClickAll"])
    ], 2112);
  }
  var swiperCourse = /* @__PURE__ */ _export_sfc(_sfc_main$L, [["render", _sfc_render$K]]);
  const _sfc_main$K = {
    props: {
      title: {
        type: String,
        default: "\u9ED8\u8BA4\u6807\u9898"
      },
      word: {
        type: String,
        default: ""
      },
      all: {
        type: Boolean,
        default: false
      },
      courseData: {
        type: Array,
        default: () => []
      },
      params: {
        type: Object,
        default: () => ({})
      }
    },
    setup(props) {
      let { proxy } = vue.getCurrentInstance();
      let clickAll = () => {
        let params = JSON.stringify(props.params);
        proxy.navTo("/pages/search/search?data=" + params);
      };
      return {
        clickAll
      };
    }
  };
  function _sfc_render$J(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_course_item = resolveEasycom(vue.resolveDynamicComponent("course-item"), __easycom_0$8);
    const _component_list_box = resolveEasycom(vue.resolveDynamicComponent("list-box"), __easycom_1$3);
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
      vue.createCommentVNode(" \u5E26\u5934\u90E8\u7684\u63D2\u69FD\u7EC4\u4EF6 "),
      vue.createVNode(_component_list_box, {
        title: $props.title,
        word: $props.word,
        all: $props.all,
        onClickAll: $setup.clickAll
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("scroll-view", {
            "scroll-x": "",
            class: "list-scroll noScorll"
          }, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.courseData.slice(0, 6), (item) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "list-scroll-view",
                key: item.id
              }, [
                vue.createVNode(_component_course_item, {
                  isColumn: true,
                  item
                }, null, 8, ["item"])
              ]);
            }), 128))
          ])
        ]),
        _: 1
      }, 8, ["title", "word", "all", "onClickAll"])
    ], 2112);
  }
  var scrollCourse = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["render", _sfc_render$J], ["__scopeId", "data-v-2d5bbbcc"]]);
  const _sfc_main$J = {
    props: {
      title: {
        type: String,
        default: "\u9ED8\u8BA4\u6807\u9898"
      },
      word: {
        type: String,
        default: ""
      },
      all: {
        type: Boolean,
        default: false
      },
      courseData: {
        type: Array,
        default: () => []
      },
      params: {
        type: Object,
        default: () => ({})
      }
    },
    setup(props) {
      let { proxy } = vue.getCurrentInstance();
      let clickAll = () => {
        let params = JSON.stringify(props.params);
        proxy.navTo("/pages/search/search?data=" + params);
      };
      return {
        clickAll
      };
    }
  };
  function _sfc_render$I(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_course_item = resolveEasycom(vue.resolveDynamicComponent("course-item"), __easycom_0$8);
    const _component_list_box = resolveEasycom(vue.resolveDynamicComponent("list-box"), __easycom_1$3);
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
      vue.createCommentVNode(" \u5E26\u5934\u90E8\u7684\u63D2\u69FD\u7EC4\u4EF6 "),
      vue.createCommentVNode(" \u89E6\u5E95\u52A0\u8F7D\u66F4\u591A "),
      vue.createVNode(_component_list_box, {
        title: $props.title,
        word: $props.word,
        all: $props.all,
        onClickAll: $setup.clickAll
      }, {
        default: vue.withCtx(() => [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.courseData, (item) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "list-view",
              key: item.id
            }, [
              vue.createVNode(_component_course_item, { item }, null, 8, ["item"])
            ]);
          }), 128))
        ]),
        _: 1
      }, 8, ["title", "word", "all", "onClickAll"])
    ], 2112);
  }
  var payCourse = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["render", _sfc_render$I], ["__scopeId", "data-v-534bbb02"]]);
  var courseData = [
    {
      id: 1,
      mainImage: "http://10.idqqimg.com/qqcourse_logo_ng/ajNVdqHZLLAWb3qFGBhykjmcTvz9CWmwib2Qj7c3Vxjia4y5fgSoNdrMYIdH11Dl1OCraibA7u0mts/600",
      totalTime: "00:59:08",
      title: "SpringBoot\u9879\u76EE\u5B9E\u6218",
      nickName: "\u5C0F\u8C37\u8001\u5E08",
      isFree: 0,
      priceOriginal: 999,
      priceDiscount: 699.9,
      studyTotal: 899
    },
    {
      id: 2,
      mainImage: "http://10.idqqimg.com/qqcourse_logo_ng/ajNVdqHZLLBdGM96Wcfsn2QlzFiafnHDemtCOy4m6U4yicNvXMg8YfVYzf4ZMxXMPZqq24AibBQt20/600",
      totalTime: "12:09:18",
      title: "Spring Security\u6559\u7A0BSSO\u5355\u70B9\u767B\u5F55OAuth2\u6743\u9650\u7BA1\u7406JWT\u5FAE\u670D\u52A1\u8BA4\u8BC1",
      nickName: "\u68A6\u8001\u5E08",
      isFree: 1,
      priceOriginal: 999,
      priceDiscount: 699.9,
      studyTotal: 199
    },
    {
      id: 3,
      mainImage: "/static/images/banner1.jpg",
      totalTime: "12:09:18",
      title: "uni-app\u4ECE\u5165\u95E8\u5230\u9879\u76EE\u5B9E\u6218\u6559\u7A0B-\u68A6\u5B66\u8C37\u535A\u5BA2\u793E\u533AAPP\u79FB\u52A8\u7AEF\u5F00\u53D1",
      nickName: "\u68A6\u8001\u5E08",
      isFree: 0,
      priceOriginal: 399,
      priceDiscount: 299.9,
      studyTotal: 3999
    },
    {
      id: 4,
      mainImage: "/static/images/banner2.jpg",
      totalTime: "00:59:08",
      title: "SpringBoot\u9879\u76EE\u5B9E\u6218\u6559\u7A0BSpringCloud OAuth2 Vue\u5206\u5E03\u5F0F\u5FAE\u670D\u52A1\u67B6\u6784",
      nickName: "\u68A6\u8001\u5E08",
      isFree: 0,
      priceOriginal: 299,
      priceDiscount: 199.9,
      studyTotal: 699
    },
    {
      id: 5,
      mainImage: "http://10.idqqimg.com/qqcourse_logo_ng/ajNVdqHZLLBdGM96Wcfsn2QlzFiafnHDemtCOy4m6U4yicNvXMg8YfVYzf4ZMxXMPZqq24AibBQt20/600",
      totalTime: "132:09:18",
      title: "Spring Security\u6559\u7A0BSSO\u5355\u70B9\u767B\u5F55OAuth2\u6743\u9650\u7BA1\u7406JWT\u5FAE\u670D\u52A1\u8BA4\u8BC1",
      nickName: "\u68A6\u8001\u5E08",
      isFree: 0,
      priceOriginal: 399,
      priceDiscount: 299.9,
      studyTotal: 2888
    },
    {
      id: 6,
      mainImage: "/static/images/banner2.jpg",
      totalTime: "112:09:18",
      title: "uni-app\u4ECE\u5165\u95E8\u5230\u9879\u76EE\u5B9E\u6218\u6559\u7A0B-\u68A6\u5B66\u8C37\u535A\u5BA2\u793E\u533AAPP\u79FB\u52A8\u7AEF\u5F00\u53D1",
      nickName: "\u68A6\u8001\u5E08",
      isFree: 0,
      priceOriginal: 1299,
      priceDiscount: 1199.9,
      studyTotal: 3999
    },
    {
      id: 7,
      mainImage: "http://10.idqqimg.com/qqcourse_logo_ng/ajNVdqHZLLAWb3qFGBhykjmcTvz9CWmwib2Qj7c3Vxjia4y5fgSoNdrMYIdH11Dl1OCraibA7u0mts/600",
      totalTime: "00:59:08",
      title: "SpringBoot\u9879\u76EE\u5B9E\u6218\u6559\u7A0BSpringCloud OAuth2 Vue\u5206\u5E03\u5F0F\u5FAE\u670D\u52A1\u67B6\u6784",
      nickName: "\u68A6\u8001\u5E08",
      isFree: 1,
      priceOriginal: 299,
      priceDiscount: 199.9,
      studyTotal: 999
    },
    {
      id: 8,
      mainImage: "/static/images/banner1.jpg",
      totalTime: "12:09:18",
      title: "Spring Security\u6559\u7A0BSSO\u5355\u70B9\u767B\u5F55OAuth2\u6743\u9650\u7BA1\u7406JWT\u5FAE\u670D\u52A1\u8BA4\u8BC1",
      nickName: "\u68A6\u8001\u5E08",
      isFree: 0,
      priceOriginal: 799,
      priceDiscount: 599.9,
      studyTotal: 2888
    },
    {
      id: 9,
      mainImage: "/static/images/banner2.jpg",
      totalTime: "12:09:18",
      title: "uni-app\u4ECE\u5165\u95E8\u5230\u9879\u76EE\u5B9E\u6218\u6559\u7A0B-\u68A6\u5B66\u8C37\u535A\u5BA2\u793E\u533AAPP\u79FB\u52A8\u7AEF\u5F00\u53D1",
      nickName: "\u68A6\u8001\u5E08",
      isFree: 0,
      priceOriginal: 299,
      priceDiscount: 199.9,
      studyTotal: 3999
    },
    {
      id: 10,
      mainImage: "http://10.idqqimg.com/qqcourse_logo_ng/ajNVdqHZLLBdGM96Wcfsn2QlzFiafnHDemtCOy4m6U4yicNvXMg8YfVYzf4ZMxXMPZqq24AibBQt20/600",
      totalTime: "12:09:18",
      title: "Spring Security\u6559\u7A0BSSO\u5355\u70B9\u767B\u5F55OAuth2\u6743\u9650\u7BA1\u7406JWT\u5FAE\u670D\u52A1\u8BA4\u8BC1",
      nickName: "\u68A6\u8001\u5E08",
      isFree: 0,
      priceOriginal: 199,
      priceDiscount: 99.9,
      studyTotal: 2888
    },
    {
      id: 11,
      mainImage: "/static/images/banner1.jpg",
      totalTime: "12:09:18",
      title: "uni-app\u4ECE\u5165\u95E8\u5230\u9879\u76EE\u5B9E\u6218\u6559\u7A0B-\u68A6\u5B66\u8C37\u535A\u5BA2\u793E\u533AAPP\u79FB\u52A8\u7AEF\u5F00\u53D1",
      nickName: "\u68A6\u8001\u5E08",
      isFree: 0,
      priceOriginal: 699,
      priceDiscount: 599.9,
      studyTotal: 3999
    },
    {
      id: 12,
      mainImage: "http://10.idqqimg.com/qqcourse_logo_ng/ajNVdqHZLLAWb3qFGBhykjmcTvz9CWmwib2Qj7c3Vxjia4y5fgSoNdrMYIdH11Dl1OCraibA7u0mts/600",
      totalTime: "00:59:08",
      title: "SpringBoot\u9879\u76EE\u5B9E\u6218\u6559\u7A0BSpringCloud OAuth2 Vue\u5206\u5E03\u5F0F\u5FAE\u670D\u52A1\u67B6\u6784",
      nickName: "\u68A6\u8001\u5E08",
      isFree: 0,
      priceOriginal: 99,
      priceDiscount: 89.9,
      studyTotal: 999
    },
    {
      id: 13,
      mainImage: "http://10.idqqimg.com/qqcourse_logo_ng/ajNVdqHZLLBdGM96Wcfsn2QlzFiafnHDemtCOy4m6U4yicNvXMg8YfVYzf4ZMxXMPZqq24AibBQt20/600",
      totalTime: "12:09:18",
      title: "Spring Security\u6559\u7A0BSSO\u5355\u70B9\u767B\u5F55OAuth2\u6743\u9650\u7BA1\u7406JWT\u5FAE\u670D\u52A1\u8BA4\u8BC1",
      nickName: "\u68A6\u8001\u5E08",
      isFree: 0,
      priceOriginal: 199,
      priceDiscount: 99.9,
      studyTotal: 2888
    },
    {
      id: 16,
      mainImage: "/static/images/banner3.jpg",
      totalTime: "12:09:18",
      title: "uni-app\u4ECE\u5165\u95E8\u5230\u9879\u76EE\u5B9E\u6218\u6559\u7A0B-\u68A6\u5B66\u8C37\u535A\u5BA2\u793E\u533AAPP\u79FB\u52A8\u7AEF\u5F00\u53D1",
      nickName: "\u68A6\u8001\u5E08",
      isFree: 0,
      priceOriginal: 199,
      priceDiscount: 119.9,
      studyTotal: 3999
    }
  ];
  let message = {
    toast(title, type = "text") {
      if (title.length > 15) {
        formatAppLog("error", "at utils/showMessage.js:5", "toast\u957F\u5EA6\u8D85\u8FC715\u4E2A\u5B57\u7B26,\u5F53\u524D\u957F\u5EA6\u4E3A" + title.length);
        return;
      }
      var icon = "none";
      if (type) {
        switch (type) {
          case "text":
            icon = "none";
            break;
          case "success":
            icon = "success";
            break;
          case "error":
            icon = "error";
            break;
        }
      }
      uni.showToast({
        title,
        icon
      });
    },
    confirm(title) {
      return new Promise((res, rej) => {
        uni.showModal({
          title,
          cancelColor: "#b6b6b6",
          confirmColor: "#363636",
          success: (result) => {
            if (result.cancel) {
              rej(result);
            } else if (result.confirm) {
              res(result);
            }
          }
        });
      });
    }
  };
  let BASE_URL = "https://mock.mengxuegu.com/mock/6246a1929a111d2ee2cb4f92/education";
  const request = (options = {}) => {
    return new Promise((resolve, reject) => {
      uni.request({
        url: BASE_URL + options.url,
        method: options.method || "GET",
        data: options.data || {},
        timeout: 6e3,
        success: (res) => {
          if (res.data.code == 200) {
            resolve(res.data.data);
          } else {
            message.toast("\u8BF7\u6C42\u63A5\u53E3\u5931\u8D25", "error");
          }
        },
        fail: (err) => {
          message.toast("\u8BF7\u6C42\u63A5\u53E3\u5931\u8D25", "error");
          reject(err);
        }
      });
    });
  };
  const getBanners = (position = 1) => {
    return request({
      url: "/article/api/advert/show/" + position
    });
  };
  const getCategory = () => {
    return request({
      url: "/article/api/category/label/list"
    });
  };
  const getCourseList = (query, current = 1, size = 10) => {
    return request({
      method: "POST",
      url: "/course/api/course/search",
      data: __spreadProps(__spreadValues({}, query), { current, size })
    });
  };
  const getCourseDetail = (id) => {
    return request({
      url: "/course/api/course/" + id
    });
  };
  const getCourseSection = (id) => {
    return request({
      url: "/course/api/chapter/section/list/" + id
    });
  };
  const getCourseComment = (id) => {
    return request({
      url: "/course/api/commont/ist/" + id
    });
  };
  const getCoursePackage = (id) => {
    return request({
      url: "/course/api/group/list/" + id
    });
  };
  const getCourseIsBuy = (id) => {
    return request({
      method: "POST",
      url: "/course/course/is-buy/" + id
    });
  };
  const getBuyCourseSection = (id) => {
    return request({
      url: "/course/course/buy/list/" + id
    });
  };
  const updateComment = (data2) => {
    return request({
      url: "/course/comment",
      method: "POST",
      data: data2
    });
  };
  const MescrollMixin = {
    data() {
      return {
        mescroll: null
      };
    },
    onPullDownRefresh() {
      this.mescroll && this.mescroll.onPullDownRefresh();
    },
    onPageScroll(e) {
      this.mescroll && this.mescroll.onPageScroll(e);
    },
    onReachBottom() {
      this.mescroll && this.mescroll.onReachBottom();
    },
    methods: {
      mescrollInit(mescroll) {
        this.mescroll = mescroll;
        this.mescrollInitByRef();
      },
      mescrollInitByRef() {
        if (!this.mescroll || !this.mescroll.resetUpScroll) {
          let mescrollRef = this.$refs.mescrollRef;
          if (mescrollRef)
            this.mescroll = mescrollRef.mescroll;
        }
      },
      downCallback() {
        if (this.mescroll.optUp.use) {
          this.mescroll.resetUpScroll();
        } else {
          setTimeout(() => {
            this.mescroll.endSuccess();
          }, 500);
        }
      },
      upCallback() {
        setTimeout(() => {
          this.mescroll.endErr();
        }, 500);
      }
    },
    mounted() {
      this.mescrollInitByRef();
    }
  };
  const _sfc_main$I = {
    mixins: [MescrollMixin],
    components: {
      "category-box": categoryBox,
      "swiper-course": swiperCourse,
      "scroll-course": scrollCourse,
      "pay-course": payCourse,
      "mescroll-body": __easycom_1$4
    },
    setup() {
      const { proxy } = vue.getCurrentInstance();
      let arr = ["APP \xB7 \u5FAE\u4FE1\u5C0F\u7A0B\u5E8F", "Java \xB7 SpringBoot ", "springCloud \xB7 SpringSecurity", "Vue \xB7 React"];
      let i = 0;
      let resetSearchInfo = () => {
        let webView2 = proxy.$scope.$getAppWebview();
        setInterval(() => {
          i > arr.length - 1 ? i = 0 : "";
          webView2.setStyle({ "titleNView": { "searchInput": { "placeholder": arr[i++] } } });
        }, 3e3);
      };
      resetSearchInfo();
      onNavigationBarButtonTap((event) => {
        if (event.index === 0) {
          uni.scanCode({
            success: (res) => {
              proxy.$message.toast("\u626B\u63CF\u6210\u529F", "success");
              uni.navigateTo({
                url: `/pages/public/public?url=${res.result}`
              });
            },
            fail: () => {
              proxy.$message.toast("\u626B\u63CF\u5931\u8D25", "error");
            }
          });
        }
      });
      onNavigationBarSearchInputClicked(() => {
        proxy.navTo("/pages/search/search");
      });
      const state = vue.reactive({
        banners: [],
        category: [],
        hotCourse: [],
        newCourse: [],
        freeCourse: [],
        payCourse: []
      });
      const getPageInfo = async () => {
        let banners = await getBanners();
        let category = await getCategory();
        let hotCourse = await getCourseList({ sort: "hot" });
        let newCourse = await getCourseList({ sort: "new" });
        let freeCourse = await getCourseList({ isFree: 1 });
        let payCourse2 = await getCourseList({ isFree: 0 });
        state.banners = banners;
        state.category = category;
        state.hotCourse = hotCourse.records;
        state.newCourse = newCourse.records;
        state.freeCourse = freeCourse.records;
        state.payCourse = payCourse2.records;
      };
      let downOption = vue.reactive({
        offset: 60
      });
      let upOption = vue.reactive({
        page: {
          num: 0,
          size: 10
        }
      });
      const upCallback = async (page) => {
        page.num;
        page.size;
        formatAppLog("log", "at pages/tab-index/index.vue:135", `\u5F53\u524D\u7B2C${page.num}\u9875`);
        if (page.num == 1) {
          await getPageInfo();
        } else {
          let res = await getCourseList({ isFree: 0 }, page.num, page.size);
          state.payCourse = [...state.payCourse, ...res.records];
          proxy.mescroll.endBySize(state.payCourse.length, res.total);
        }
        proxy.mescroll.endErr();
      };
      const toSearch = () => {
        proxy.navTo("/pages/search/search");
      };
      return __spreadProps(__spreadValues({
        courseData,
        getPageInfo
      }, vue.toRefs(state)), {
        downOption,
        upCallback,
        upOption,
        toSearch
      });
    }
  };
  function _sfc_render$H(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_my_swiper = resolveEasycom(vue.resolveDynamicComponent("my-swiper"), __easycom_0$a);
    const _component_category_box = vue.resolveComponent("category-box");
    const _component_swiper_course = vue.resolveComponent("swiper-course");
    const _component_scroll_course = vue.resolveComponent("scroll-course");
    const _component_pay_course = vue.resolveComponent("pay-course");
    const _component_mescroll_body = resolveEasycom(vue.resolveDynamicComponent("mescroll-body"), __easycom_1$4);
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createCommentVNode(" \u5C0F\u7A0B\u5E8F\u624D\u663E\u793A\u7684\u641C\u7D22\u6846 "),
      vue.createCommentVNode(" \u8F6E\u64AD\u56FE "),
      vue.createVNode(_component_my_swiper, { banners: _ctx.banners }, null, 8, ["banners"]),
      vue.createCommentVNode(" \u4E0B\u62C9\u5237\u65B0 "),
      vue.createVNode(_component_mescroll_body, {
        ref: "mescrollRef",
        onInit: _ctx.mescrollInit,
        onDown: _ctx.downCallback,
        onUp: $setup.upCallback,
        down: $setup.downOption,
        up: $setup.upOption
      }, {
        default: vue.withCtx(() => [
          vue.createCommentVNode(" \u5206\u7C7B "),
          vue.createVNode(_component_category_box, { categoryList: _ctx.category }, null, 8, ["categoryList"]),
          vue.createElementVNode("view", { class: "main-list" }, [
            vue.createCommentVNode(" \u70ED\u95E8\u63A8\u8350 "),
            vue.createVNode(_component_swiper_course, {
              title: "\u70ED\u95E8\u63A8\u8350",
              word: "HOT",
              all: true,
              courseData: _ctx.hotCourse,
              params: { sort: "hot" }
            }, null, 8, ["courseData"]),
            vue.createVNode(_component_scroll_course, {
              title: "\u8FD1\u671F\u4E0A\u65B0",
              word: "NEW",
              all: true,
              courseData: _ctx.newCourse,
              params: { sort: "new" }
            }, null, 8, ["courseData"]),
            vue.createVNode(_component_swiper_course, {
              title: "\u514D\u8D39\u7CBE\u9009",
              word: "FREE",
              all: true,
              courseData: _ctx.freeCourse,
              params: { isFree: 1 }
            }, null, 8, ["courseData"]),
            vue.createVNode(_component_pay_course, {
              title: "\u4ED8\u8D39\u7CBE\u54C1",
              word: "NICE",
              all: true,
              courseData: _ctx.payCourse,
              params: { isFree: 0 }
            }, null, 8, ["courseData"])
          ])
        ]),
        _: 1
      }, 8, ["onInit", "onDown", "onUp", "down", "up"])
    ]);
  }
  var PagesTabIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["render", _sfc_render$H], ["__scopeId", "data-v-f5bdc598"]]);
  const _sfc_main$H = {
    props: {
      value: {
        type: Object,
        default: () => null
      }
    },
    setup(props, { emit }) {
      const { proxy } = vue.getCurrentInstance();
      const state = vue.ref([]);
      let activeTitle = vue.ref();
      let labelList = vue.ref([]);
      let activeLabel = vue.ref();
      vue.onMounted(async () => {
        let res = await getCategory();
        state.value = res;
        if (props.value != null) {
          state.value.forEach((item) => {
            item.labelList.unshift({ id: 0, name: "\u4E0D\u9650", cName: item.name, cId: item.id });
          });
          if (Object.keys(props.value).length > 0) {
            res.forEach((item) => {
              if (item.id == props.value.categoryId) {
                activeTitle.value = item.id;
                labelList.value = item.labelList;
              }
            });
          } else {
            activeTitle.value = res[0].id;
            labelList.value = res[0].labelList;
          }
        } else {
          activeTitle.value = res[0].id;
          labelList.value = res[0].labelList;
        }
      });
      const selectTitle = (id, List) => {
        activeTitle.value = id;
        labelList.value = List;
      };
      const selectLabel = (item) => {
        if (activeLabel.value == item.id)
          return;
        activeLabel.value = item.id;
        if (props.value != null) {
          item.categoryId = activeTitle.value;
          emit("searchCate", item);
        } else {
          let params = JSON.stringify({ labelId: item.id, name: item.name, categoryId: activeTitle.value });
          proxy.navTo("/pages/search/search?data=" + params);
        }
      };
      onNavigationBarButtonTap(() => {
        proxy.navTo("/pages/search/search");
      });
      return {
        state,
        activeTitle,
        labelList,
        activeLabel,
        selectTitle,
        selectLabel
      };
    }
  };
  function _sfc_render$G(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "category" }, [
      vue.createElementVNode("scroll-view", {
        class: "left noScorll",
        "scroll-y": ""
      }, [
        vue.createElementVNode("view", { class: "title" }, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($setup.state, (item) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: vue.normalizeClass({ "activeTitle": $setup.activeTitle == item.id }),
              key: item.id,
              onClick: ($event) => $setup.selectTitle(item.id, item.labelList)
            }, vue.toDisplayString(item.name), 11, ["onClick"]);
          }), 128))
        ])
      ]),
      vue.createElementVNode("scroll-view", {
        class: "right",
        "scroll-y": ""
      }, [
        vue.createElementVNode("view", { class: "tag" }, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($setup.labelList, (item) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: vue.normalizeClass({ "activeLabel": $setup.activeLabel == item.id }),
              key: item.id,
              onClick: ($event) => $setup.selectLabel(item)
            }, vue.toDisplayString(item.name), 11, ["onClick"]);
          }), 128))
        ])
      ])
    ]);
  }
  var PagesTabCategoryCategory = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["render", _sfc_render$G]]);
  const _sfc_main$G = {
    props: {
      tabs: {
        type: Array,
        default: () => []
      }
    },
    setup(props, { emit }) {
      let tabId = vue.ref();
      let itemWidth = vue.ref(100);
      let move = vue.ref(0);
      vue.watch(() => props.tabs, (newValue) => {
        if (newValue.length == 0)
          return;
        tabId.value = newValue[0].id;
        if (newValue.length < 5) {
          itemWidth.value = uni.upx2px(750 / newValue.length);
        } else {
          itemWidth.value = uni.upx2px(750 / 5);
        }
      }, {
        deep: true,
        immediate: true
      });
      let tabPosition = (index) => {
        if (index > 2) {
          move.value = (index - 2) * itemWidth.value;
        } else {
          move.value = 0;
        }
      };
      let changeTabs = (id, index) => {
        if (tabId.value == id)
          return;
        tabPosition();
        if (tabId.value != id) {
          tabId.value = id;
          emit("changeTab", id);
        }
      };
      return {
        tabId,
        itemWidth,
        move,
        tabPosition,
        changeTabs
      };
    }
  };
  function _sfc_render$F(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "tab-bar",
      onTouchmove: _cache[0] || (_cache[0] = vue.withModifiers(() => {
      }, ["stop", "prevent"]))
    }, [
      vue.createElementVNode("scroll-view", {
        class: "noScorll bar-view",
        "scroll-x": "",
        "scroll-with-animation": "",
        "scroll-left": $setup.move
      }, [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.tabs, (item, index) => {
          return vue.openBlock(), vue.createElementBlock("view", {
            class: vue.normalizeClass(["bar-item", { current: item.id == $setup.tabId }]),
            style: vue.normalizeStyle({ width: `${$setup.itemWidth}px` }),
            key: item.id,
            onClick: ($event) => $setup.changeTabs(item.id, index)
          }, vue.toDisplayString(item.name), 15, ["onClick"]);
        }), 128))
      ], 8, ["scroll-left"])
    ], 32);
  }
  var __easycom_0$7 = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["render", _sfc_render$F], ["__scopeId", "data-v-6dc8a5bc"]]);
  function formatCount(count) {
    if (count == null)
      return "";
    var count = parseInt(count);
    if (count >= 1e8) {
      return (count / 1e8).toFixed(1) + " \u4EBF";
    } else if (count >= 1e4) {
      return (count / 1e4).toFixed(1) + " \u4E07";
    } else {
      return count;
    }
  }
  const _sfc_main$F = {
    props: {
      item: {
        type: Object,
        default: () => ({
          id: 10,
          userId: 1,
          nickName: "\u6B66\u8273",
          title: "\u5BFC\u6548\u4ECA\u6D77\u4F4F\u5148\u516B\u7A0B\u7EDF\u5468\u4F4F\u82B1\u3002",
          summary: "\u767E\u8FD9\u8001\u4E4B\u5904\u5EA6\u59D4\u4E1C\u5E73\u592A\u8C61\u7A0B\u7EBF\u8F66\u63D0\u79CD\u4E2D\u513F\u514B\u53C8\u738B\u4EF6\u9020\u4F7F\u4F8B\u76F4\u6743\u96C6\u8BB8\u8F6C\u9178\u7B2C\u4F5C\u4EBA\u4E0B\u5C5E\u673A\u6D88\u4E14\u9002\u53EA\u6309\u5458\u6761\u9053\u9178\u5E76\u5F3A\u79CD\u7EDF\u7531\u5E72\u6839\u5373\u4E4B\u6C34\u6743\u6807\u4F1A\u8BA1\u6597\u6240\u4E0D\u957F\u53E3\u4F4F\u660E\u771F\u5317\u7B2C\u9664\u660E\u7B49\u65AF\u95E8\u6743\u3002",
          imageUrl: "https://img.alicdn.com/bao/uploaded/i2/3603079088/O1CN01rGCkfb2H0M1O7Lj45_!!0-item_pic.jpg",
          viewCount: 96320,
          thumhup: 98438,
          updateDate: new Date()
        })
      }
    },
    setup() {
      return {
        formatCount
      };
    }
  };
  function _sfc_render$E(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "article-item",
      onClick: _cache[0] || (_cache[0] = ($event) => _ctx.navTo(`/pages/tab-article/article-details?id=${$props.item.id}`))
    }, [
      vue.createElementVNode("view", { class: "article-content row" }, [
        vue.createElementVNode("view", { class: "left-text column" }, [
          vue.createElementVNode("text", { class: "title text-ellipsis" }, vue.toDisplayString($props.item.title), 1),
          vue.createElementVNode("text", { class: "summary text-ellipsis" }, vue.toDisplayString($props.item.summary), 1)
        ]),
        $props.item.imageUrl ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "right-image"
        }, [
          vue.createElementVNode("image", {
            src: $props.item.imageUrl,
            "lazy-load": ""
          }, null, 8, ["src"])
        ])) : vue.createCommentVNode("v-if", true)
      ]),
      vue.createElementVNode("view", { class: "article-info" }, [
        vue.createElementVNode("text", null, vue.toDisplayString($props.item.nickName), 1),
        vue.createElementVNode("text", null, " \xB7 " + vue.toDisplayString(this.$utils.dateFormat($props.item.updateDate)), 1),
        vue.createElementVNode("text", null, " \xB7 " + vue.toDisplayString($setup.formatCount($props.item.thumhup)) + " \u8D5E", 1)
      ])
    ]);
  }
  var __easycom_0$6 = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["render", _sfc_render$E], ["__scopeId", "data-v-f7ab0478"]]);
  var block1 = (Comp) => {
    (Comp.$renderjs || (Comp.$renderjs = [])).push("renderBiz");
    (Comp.$renderjsModules || (Comp.$renderjsModules = {}))["renderBiz"] = "5a9dc23f";
  };
  const _sfc_main$E = {
    name: "mescroll-uni",
    mixins: [WxsMixin],
    components: {
      MescrollTop
    },
    props: {
      down: Object,
      up: Object,
      i18n: Object,
      top: [String, Number],
      topbar: [Boolean, String],
      bottom: [String, Number],
      safearea: Boolean,
      fixed: {
        type: Boolean,
        default: true
      },
      height: [String, Number],
      bottombar: {
        type: Boolean,
        default: true
      },
      disableScroll: Boolean
    },
    data() {
      return {
        mescroll: { optDown: {}, optUp: {} },
        viewId: "id_" + Math.random().toString(36).substr(2, 16),
        downHight: 0,
        downRate: 0,
        downLoadType: 0,
        upLoadType: 0,
        isShowEmpty: false,
        isShowToTop: false,
        scrollTop: 0,
        scrollAnim: false,
        windowTop: 0,
        windowBottom: 0,
        windowHeight: 0,
        statusBarHeight: 0
      };
    },
    computed: {
      isFixed() {
        return !this.height && this.fixed;
      },
      scrollHeight() {
        if (this.isFixed) {
          return "auto";
        } else if (this.height) {
          return this.toPx(this.height) + "px";
        } else {
          return "100%";
        }
      },
      numTop() {
        return this.toPx(this.top);
      },
      fixedTop() {
        return this.isFixed ? this.numTop + this.windowTop + "px" : 0;
      },
      padTop() {
        return !this.isFixed ? this.numTop + "px" : 0;
      },
      numBottom() {
        return this.toPx(this.bottom);
      },
      fixedBottom() {
        return this.isFixed ? this.numBottom + this.windowBottom + "px" : 0;
      },
      padBottom() {
        return !this.isFixed ? this.numBottom + "px" : 0;
      },
      isDownReset() {
        return this.downLoadType === 3 || this.downLoadType === 4;
      },
      transition() {
        return this.isDownReset ? "transform 300ms" : "";
      },
      translateY() {
        return this.downHight > 0 ? "translateY(" + this.downHight + "px)" : "";
      },
      scrollable() {
        if (this.disableScroll)
          return false;
        return this.downLoadType === 0 || this.isDownReset;
      },
      isDownLoading() {
        return this.downLoadType === 3;
      },
      downRotate() {
        return "rotate(" + 360 * this.downRate + "deg)";
      },
      downText() {
        if (!this.mescroll)
          return "";
        switch (this.downLoadType) {
          case 1:
            return this.mescroll.optDown.textInOffset;
          case 2:
            return this.mescroll.optDown.textOutOffset;
          case 3:
            return this.mescroll.optDown.textLoading;
          case 4:
            return this.mescroll.isDownEndSuccess ? this.mescroll.optDown.textSuccess : this.mescroll.isDownEndSuccess == false ? this.mescroll.optDown.textErr : this.mescroll.optDown.textInOffset;
          default:
            return this.mescroll.optDown.textInOffset;
        }
      }
    },
    methods: {
      toPx(num) {
        if (typeof num === "string") {
          if (num.indexOf("px") !== -1) {
            if (num.indexOf("rpx") !== -1) {
              num = num.replace("rpx", "");
            } else if (num.indexOf("upx") !== -1) {
              num = num.replace("upx", "");
            } else {
              return Number(num.replace("px", ""));
            }
          } else if (num.indexOf("%") !== -1) {
            let rate = Number(num.replace("%", "")) / 100;
            return this.windowHeight * rate;
          }
        }
        return num ? uni.upx2px(Number(num)) : 0;
      },
      scroll(e) {
        this.mescroll.scroll(e.detail, () => {
          this.$emit("scroll", this.mescroll);
        });
      },
      emptyClick() {
        this.$emit("emptyclick", this.mescroll);
      },
      toTopClick() {
        this.mescroll.scrollTo(0, this.mescroll.optUp.toTop.duration);
        this.$emit("topclick", this.mescroll);
      },
      setClientHeight() {
        if (this.mescroll.getClientHeight(true) === 0 && !this.isExec) {
          this.isExec = true;
          this.$nextTick(() => {
            this.getClientInfo((data2) => {
              this.isExec = false;
              if (data2) {
                this.mescroll.setClientHeight(data2.height);
              } else if (this.clientNum != 3) {
                this.clientNum = this.clientNum == null ? 1 : this.clientNum + 1;
                setTimeout(() => {
                  this.setClientHeight();
                }, this.clientNum * 100);
              }
            });
          });
        }
      },
      getClientInfo(success) {
        let query = uni.createSelectorQuery();
        query = query.in(this);
        let view = query.select("#" + this.viewId);
        view.boundingClientRect((data2) => {
          success(data2);
        }).exec();
      }
    },
    created() {
      let vm = this;
      let diyOption = {
        down: {
          inOffset() {
            vm.downLoadType = 1;
          },
          outOffset() {
            vm.downLoadType = 2;
          },
          onMoving(mescroll, rate, downHight) {
            vm.downHight = downHight;
            vm.downRate = rate;
          },
          showLoading(mescroll, downHight) {
            vm.downLoadType = 3;
            vm.downHight = downHight;
          },
          beforeEndDownScroll(mescroll) {
            vm.downLoadType = 4;
            return mescroll.optDown.beforeEndDelay;
          },
          endDownScroll() {
            vm.downLoadType = 4;
            vm.downHight = 0;
            vm.downResetTimer && clearTimeout(vm.downResetTimer);
            vm.downResetTimer = setTimeout(() => {
              if (vm.downLoadType === 4)
                vm.downLoadType = 0;
            }, 300);
          },
          callback: function(mescroll) {
            vm.$emit("down", mescroll);
          }
        },
        up: {
          showLoading() {
            vm.upLoadType = 1;
          },
          showNoMore() {
            vm.upLoadType = 2;
          },
          hideUpScroll(mescroll) {
            vm.upLoadType = mescroll.optUp.hasNext ? 0 : 3;
          },
          empty: {
            onShow(isShow) {
              vm.isShowEmpty = isShow;
            }
          },
          toTop: {
            onShow(isShow) {
              vm.isShowToTop = isShow;
            }
          },
          callback: function(mescroll) {
            vm.$emit("up", mescroll);
            vm.setClientHeight();
          }
        }
      };
      let i18nType = mescrollI18n.getType();
      let i18nOption = { type: i18nType };
      MeScroll.extend(i18nOption, vm.i18n);
      MeScroll.extend(i18nOption, GlobalOption.i18n);
      MeScroll.extend(diyOption, i18nOption[i18nType]);
      MeScroll.extend(diyOption, { down: GlobalOption.down, up: GlobalOption.up });
      let myOption = JSON.parse(JSON.stringify({ "down": vm.down, "up": vm.up }));
      MeScroll.extend(myOption, diyOption);
      vm.mescroll = new MeScroll(myOption);
      vm.mescroll.viewId = vm.viewId;
      vm.mescroll.i18n = i18nOption;
      vm.$emit("init", vm.mescroll);
      const sys = uni.getSystemInfoSync();
      if (sys.windowTop)
        vm.windowTop = sys.windowTop;
      if (sys.windowBottom)
        vm.windowBottom = sys.windowBottom;
      if (sys.windowHeight)
        vm.windowHeight = sys.windowHeight;
      if (sys.statusBarHeight)
        vm.statusBarHeight = sys.statusBarHeight;
      vm.mescroll.setBodyHeight(sys.windowHeight);
      vm.mescroll.resetScrollTo((y, t2) => {
        vm.scrollAnim = t2 !== 0;
        if (typeof y === "string") {
          vm.getClientInfo(function(rect) {
            let mescrollTop = rect.top;
            let selector;
            if (y.indexOf("#") == -1 && y.indexOf(".") == -1) {
              selector = "#" + y;
            } else {
              selector = y;
              if (y.indexOf(">>>") != -1) {
                selector = y.split(">>>")[1].trim();
              }
            }
            uni.createSelectorQuery().select(selector).boundingClientRect(function(rect2) {
              if (rect2) {
                let curY2 = vm.mescroll.getScrollTop();
                let top = rect2.top - mescrollTop;
                top += curY2;
                if (!vm.isFixed)
                  top -= vm.numTop;
                vm.scrollTop = curY2;
                vm.$nextTick(function() {
                  vm.scrollTop = top;
                });
              } else {
                formatAppLog("error", "at uni_modules/mescroll-uni/components/mescroll-uni/mescroll-uni.vue:419", selector + " does not exist");
              }
            }).exec();
          });
          return;
        }
        let curY = vm.mescroll.getScrollTop();
        if (t2 === 0 || t2 === 300) {
          vm.scrollTop = curY;
          vm.$nextTick(function() {
            vm.scrollTop = y;
          });
        } else {
          vm.mescroll.getStep(curY, y, (step) => {
            vm.scrollTop = step;
          }, t2);
        }
      });
      if (vm.up && vm.up.toTop && vm.up.toTop.safearea != null)
        ;
      else {
        vm.mescroll.optUp.toTop.safearea = vm.safearea;
      }
      uni.$on("setMescrollGlobalOption", (options) => {
        if (!options)
          return;
        let i18nType2 = options.i18n ? options.i18n.type : null;
        if (i18nType2 && vm.mescroll.i18n.type != i18nType2) {
          vm.mescroll.i18n.type = i18nType2;
          mescrollI18n.setType(i18nType2);
          MeScroll.extend(options, vm.mescroll.i18n[i18nType2]);
        }
        if (options.down) {
          let down = MeScroll.extend({}, options.down);
          vm.mescroll.optDown = MeScroll.extend(down, vm.mescroll.optDown);
        }
        if (options.up) {
          let up = MeScroll.extend({}, options.up);
          vm.mescroll.optUp = MeScroll.extend(up, vm.mescroll.optUp);
        }
      });
    },
    mounted() {
      this.setClientHeight();
    },
    destroyed() {
      uni.$off("setMescrollGlobalOption");
    }
  };
  function _sfc_render$D(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_mescroll_empty = resolveEasycom(vue.resolveDynamicComponent("mescroll-empty"), __easycom_0$9);
    const _component_mescroll_top = vue.resolveComponent("mescroll-top");
    return vue.openBlock(), vue.createElementBlock("view", { class: "mescroll-uni-warp" }, [
      vue.createElementVNode("scroll-view", {
        id: $data.viewId,
        class: vue.normalizeClass(["mescroll-uni", { "mescroll-uni-fixed": $options.isFixed }]),
        style: vue.normalizeStyle({ "height": $options.scrollHeight, "padding-top": $options.padTop, "padding-bottom": $options.padBottom, "top": $options.fixedTop, "bottom": $options.fixedBottom }),
        "scroll-top": $data.scrollTop,
        "scroll-with-animation": $data.scrollAnim,
        onScroll: _cache[4] || (_cache[4] = (...args) => $options.scroll && $options.scroll(...args)),
        "scroll-y": $options.scrollable,
        "enable-back-to-top": true,
        throttle: false
      }, [
        vue.createElementVNode("view", {
          class: "mescroll-uni-content mescroll-render-touch",
          onTouchstart: _cache[0] || (_cache[0] = (...args) => _ctx.wxsBiz.touchstartEvent && _ctx.wxsBiz.touchstartEvent(...args)),
          onTouchmove: _cache[1] || (_cache[1] = (...args) => _ctx.wxsBiz.touchmoveEvent && _ctx.wxsBiz.touchmoveEvent(...args)),
          onTouchend: _cache[2] || (_cache[2] = (...args) => _ctx.wxsBiz.touchendEvent && _ctx.wxsBiz.touchendEvent(...args)),
          onTouchcancel: _cache[3] || (_cache[3] = (...args) => _ctx.wxsBiz.touchendEvent && _ctx.wxsBiz.touchendEvent(...args)),
          "change:prop": _ctx.wxsBiz.propObserver,
          prop: _ctx.wxsProp
        }, [
          vue.createCommentVNode(" \u72B6\u6001\u680F "),
          $props.topbar && $data.statusBarHeight ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "mescroll-topbar",
            style: vue.normalizeStyle({ height: $data.statusBarHeight + "px", background: $props.topbar })
          }, null, 4)) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("view", {
            class: "mescroll-wxs-content",
            style: vue.normalizeStyle({ "transform": $options.translateY, "transition": $options.transition }),
            "change:prop": _ctx.wxsBiz.callObserver,
            prop: _ctx.callProp
          }, [
            vue.createCommentVNode(" \u4E0B\u62C9\u52A0\u8F7D\u533A\u57DF (\u652F\u4ED8\u5B9D\u5C0F\u7A0B\u5E8F\u5B50\u7EC4\u4EF6\u4F20\u53C2\u7ED9\u5B50\u5B50\u7EC4\u4EF6\u4ECD\u62A5\u5355\u9879\u6570\u636E\u6D41\u7684\u5F02\u5E38,\u6682\u65F6\u4E0D\u901A\u8FC7mescroll-down\u7EC4\u4EF6\u5B9E\u73B0)"),
            vue.createCommentVNode(' <mescroll-down :option="mescroll.optDown" :type="downLoadType" :rate="downRate"></mescroll-down> '),
            $data.mescroll.optDown.use ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "mescroll-downwarp",
              style: vue.normalizeStyle({ "background": $data.mescroll.optDown.bgColor, "color": $data.mescroll.optDown.textColor })
            }, [
              vue.createElementVNode("view", { class: "downwarp-content" }, [
                vue.createElementVNode("view", {
                  class: vue.normalizeClass(["downwarp-progress mescroll-wxs-progress", { "mescroll-rotate": $options.isDownLoading }]),
                  style: vue.normalizeStyle({ "border-color": $data.mescroll.optDown.textColor, "transform": $options.downRotate })
                }, null, 6),
                vue.createElementVNode("view", { class: "downwarp-tip" }, vue.toDisplayString($options.downText), 1)
              ])
            ], 4)) : vue.createCommentVNode("v-if", true),
            vue.createCommentVNode(" \u5217\u8868\u5185\u5BB9 "),
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
            vue.createCommentVNode(" \u7A7A\u5E03\u5C40 "),
            $data.isShowEmpty ? (vue.openBlock(), vue.createBlock(_component_mescroll_empty, {
              key: 1,
              option: $data.mescroll.optUp.empty,
              onEmptyclick: $options.emptyClick
            }, null, 8, ["option", "onEmptyclick"])) : vue.createCommentVNode("v-if", true),
            vue.createCommentVNode(" \u4E0A\u62C9\u52A0\u8F7D\u533A\u57DF (\u4E0B\u62C9\u5237\u65B0\u65F6\u4E0D\u663E\u793A, \u652F\u4ED8\u5B9D\u5C0F\u7A0B\u5E8F\u5B50\u7EC4\u4EF6\u4F20\u53C2\u7ED9\u5B50\u5B50\u7EC4\u4EF6\u4ECD\u62A5\u5355\u9879\u6570\u636E\u6D41\u7684\u5F02\u5E38,\u6682\u65F6\u4E0D\u901A\u8FC7mescroll-up\u7EC4\u4EF6\u5B9E\u73B0)"),
            vue.createCommentVNode(' <mescroll-up v-if="mescroll.optUp.use && !isDownLoading && upLoadType!==3" :option="mescroll.optUp" :type="upLoadType"></mescroll-up> '),
            $data.mescroll.optUp.use && !$options.isDownLoading && $data.upLoadType !== 3 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 2,
              class: "mescroll-upwarp",
              style: vue.normalizeStyle({ "background": $data.mescroll.optUp.bgColor, "color": $data.mescroll.optUp.textColor })
            }, [
              vue.createCommentVNode(" \u52A0\u8F7D\u4E2D (\u6B64\u5904\u4E0D\u80FD\u7528v-if,\u5426\u5219android\u5C0F\u7A0B\u5E8F\u5FEB\u901F\u4E0A\u62C9\u53EF\u80FD\u4F1A\u4E0D\u65AD\u89E6\u53D1\u4E0A\u62C9\u56DE\u8C03) "),
              vue.withDirectives(vue.createElementVNode("view", null, [
                vue.createElementVNode("view", {
                  class: "upwarp-progress mescroll-rotate",
                  style: vue.normalizeStyle({ "border-color": $data.mescroll.optUp.textColor })
                }, null, 4),
                vue.createElementVNode("view", { class: "upwarp-tip" }, vue.toDisplayString($data.mescroll.optUp.textLoading), 1)
              ], 512), [
                [vue.vShow, $data.upLoadType === 1]
              ]),
              vue.createCommentVNode(" \u65E0\u6570\u636E "),
              $data.upLoadType === 2 ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "upwarp-nodata"
              }, vue.toDisplayString($data.mescroll.optUp.textNoMore), 1)) : vue.createCommentVNode("v-if", true)
            ], 4)) : vue.createCommentVNode("v-if", true)
          ], 12, ["change:prop", "prop"]),
          vue.createCommentVNode(" \u5E95\u90E8\u662F\u5426\u504F\u79FBTabBar\u7684\u9AD8\u5EA6(\u9ED8\u8BA4\u4EC5\u5728H5\u7AEF\u7684tab\u9875\u751F\u6548) "),
          vue.createCommentVNode(" \u9002\u914DiPhoneX "),
          $props.safearea ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "mescroll-safearea"
          })) : vue.createCommentVNode("v-if", true)
        ], 40, ["change:prop", "prop"])
      ], 46, ["id", "scroll-top", "scroll-with-animation", "scroll-y"]),
      vue.createCommentVNode(" \u56DE\u5230\u9876\u90E8\u6309\u94AE (fixed\u5143\u7D20,\u9700\u5199\u5728scroll-view\u5916\u9762,\u9632\u6B62\u6EDA\u52A8\u7684\u65F6\u5019\u6296\u52A8)"),
      vue.createVNode(_component_mescroll_top, {
        modelValue: $data.isShowToTop,
        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.isShowToTop = $event),
        option: $data.mescroll.optUp.toTop,
        onClick: $options.toTopClick
      }, null, 8, ["modelValue", "option", "onClick"]),
      vue.createCommentVNode(" renderjs\u7684\u6570\u636E\u8F7D\u4F53,\u4E0D\u53EF\u5199\u5728mescroll-downwarp\u5185\u90E8,\u907F\u514Duse\u4E3Afalse\u65F6,\u8F7D\u4F53\u4E22\u5931,\u65E0\u6CD5\u66F4\u65B0\u6570\u636E "),
      vue.createElementVNode("view", {
        "change:prop": _ctx.renderBiz.propObserver,
        prop: _ctx.wxsProp
      }, null, 8, ["change:prop", "prop"])
    ]);
  }
  if (typeof block0 === "function")
    block0(_sfc_main$E);
  if (typeof block1 === "function")
    block1(_sfc_main$E);
  var __easycom_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["render", _sfc_render$D], ["__scopeId", "data-v-6f5cf468"]]);
  const MescrollMoreItemMixin = {
    props: {
      i: Number,
      index: {
        type: Number,
        default() {
          return 0;
        }
      }
    },
    data() {
      return {
        downOption: {
          auto: false
        },
        upOption: {
          auto: false
        },
        isInit: false
      };
    },
    watch: {
      index(val) {
        if (this.i === val && !this.isInit)
          this.mescrollTrigger();
      }
    },
    methods: {
      mescrollInitByRef() {
        if (!this.mescroll || !this.mescroll.resetUpScroll) {
          let mescrollRef = this.$refs.mescrollRef || this.$refs["mescrollRef" + this.i];
          if (mescrollRef)
            this.mescroll = mescrollRef.mescroll;
        }
      },
      mescrollInit(mescroll) {
        this.mescroll = mescroll;
        this.mescrollInitByRef && this.mescrollInitByRef();
        if (this.i === this.index) {
          this.mescrollTrigger();
        }
      },
      mescrollTrigger() {
        this.isInit = true;
        if (this.mescroll) {
          if (this.mescroll.optDown.use) {
            this.mescroll.triggerDownScroll();
          } else {
            this.mescroll.triggerUpScroll();
          }
        }
      }
    }
  };
  const getArticleList = (query, current = 1, size = 10) => {
    return request({
      method: "POST",
      url: "/article/api/article/search",
      data: __spreadProps(__spreadValues({}, query), { current, size })
    });
  };
  const getArticleDetail = (id) => {
    return request({
      url: "/article/api/article/" + id
    });
  };
  const getArticleComment = (id) => {
    return request({
      url: "/article/api/comment/list/" + id
    });
  };
  const addArticleComment = (data2) => {
    return request({
      method: "POST",
      url: "/article/comment/",
      data: data2
    });
  };
  const _sfc_main$D = {
    components: {
      "mescroll-uni": __easycom_1$2
    },
    mixins: [MescrollMixin, MescrollMoreItemMixin],
    props: {
      i: Number,
      index: {
        type: Number,
        default() {
          return 0;
        }
      },
      tabs: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    setup(props) {
      let { proxy } = vue.getCurrentInstance();
      let downOption = vue.ref({ auto: false });
      let upOption = vue.ref({
        auto: false,
        noMoreSize: 4,
        empty: {
          tip: "~ \u7A7A\u7A7A\u5982\u4E5F ~"
        }
      });
      let articleList2 = vue.ref([]);
      let upCallback = async (page) => {
        let keyword = props.tabs[props.i].name;
        formatAppLog("log", "at pages/tab-article/cpns/article-swiper.vue:66", keyword, page.num, page.size);
        let res = await getArticleList({ content: keyword }, page.num, page.size);
        if (page.num == 1) {
          articleList2.value = [];
          proxy.mescroll.scrollTo(0, 100);
        }
        articleList2.value = [...articleList2.value, ...res.records];
        proxy.mescroll.endBySize(articleList2.value.length, res.total);
        proxy.mescroll.endErr();
      };
      return {
        downOption,
        upOption,
        articleList: articleList2,
        upCallback
      };
    }
  };
  function _sfc_render$C(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_article_item = resolveEasycom(vue.resolveDynamicComponent("article-item"), __easycom_0$6);
    const _component_mescroll_uni = resolveEasycom(vue.resolveDynamicComponent("mescroll-uni"), __easycom_1$2);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createCommentVNode(' top="xxx"\u4E0B\u62C9\u5E03\u5C40\u5F80\u4E0B\u504F\u79FB,\u9632\u6B62\u88AB\u60AC\u6D6E\u83DC\u5355\u906E\u4F4F '),
      vue.createVNode(_component_mescroll_uni, {
        ref: "mescrollRef" + $props.i,
        onInit: _ctx.mescrollInit,
        height: "100%",
        bottom: "80",
        down: $setup.downOption,
        onDown: _ctx.downCallback,
        up: $setup.upOption,
        onUp: $setup.upCallback
      }, {
        default: vue.withCtx(() => [
          vue.createCommentVNode(" \u6570\u636E\u5217\u8868 "),
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($setup.articleList, (item) => {
            return vue.openBlock(), vue.createBlock(_component_article_item, {
              key: item.id,
              item
            }, null, 8, ["item"]);
          }), 128))
        ]),
        _: 1
      }, 8, ["onInit", "down", "onDown", "up", "onUp"])
    ]);
  }
  var articleSwiper = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["render", _sfc_render$C]]);
  const _sfc_main$C = {
    components: {
      "article-swiper": articleSwiper
    },
    setup() {
      let { proxy } = vue.getCurrentInstance();
      let tabRef = vue.ref(null);
      let articleRef = vue.ref(null);
      let tabs = vue.ref([]);
      let current = vue.ref(0);
      let swiperHeight = vue.ref(500);
      let arr = ["APP \xB7 \u5FAE\u4FE1\u5C0F\u7A0B\u5E8F", "Java \xB7 SpringBoot ", "springCloud \xB7 SpringSecurity", "Vue \xB7 React"];
      let i = 0;
      let resetSearchInfo = () => {
        let webView2 = proxy.$scope.$getAppWebview();
        setInterval(() => {
          i > arr.length - 1 ? i = 0 : "";
          webView2.setStyle({ "titleNView": { "searchInput": { "placeholder": arr[i++] } } });
        }, 3e3);
      };
      resetSearchInfo();
      vue.onMounted(async () => {
        swiperHeight.value = uni.getSystemInfoSync().windowHeight - 40;
        let res = await getCategory();
        res.unshift({ id: 0, name: "\u5168\u90E8" });
        tabs.value = res;
      });
      onNavigationBarSearchInputClicked(() => {
        proxy.navTo("/pages/search/search");
      });
      const changeTab = (id) => {
        current.value = id;
      };
      const swiperChange = (e) => {
        current.value = e.detail.current;
        tabRef.value.tabId = e.detail.current;
        tabRef.value.tabPosition(e.detail.current);
      };
      return {
        tabRef,
        articleRef,
        tabs,
        current,
        swiperHeight,
        changeTab,
        swiperChange
      };
    }
  };
  function _sfc_render$B(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_tab_bar = resolveEasycom(vue.resolveDynamicComponent("tab-bar"), __easycom_0$7);
    const _component_article_swiper = vue.resolveComponent("article-swiper");
    return vue.openBlock(), vue.createElementBlock("view", { class: "cantainer" }, [
      vue.createElementVNode("view", { class: "tab" }, [
        vue.createVNode(_component_tab_bar, {
          ref: "tabRef",
          tabs: $setup.tabs,
          onChangeTab: $setup.changeTab
        }, null, 8, ["tabs", "onChangeTab"])
      ]),
      vue.createCommentVNode(" \u5DE6\u53F3\u6ED1\u52A8\u5207\u6362\u5207\u6362(swiper)+\u4E0A\u62C9\u52A0\u8F7D\u4E0B\u62C9\u5237\u65B0(mescroll) "),
      vue.createElementVNode("swiper", {
        duration: 1e3,
        style: vue.normalizeStyle({ "height": $setup.swiperHeight + "px" }),
        current: $setup.current,
        onChange: _cache[0] || (_cache[0] = (...args) => $setup.swiperChange && $setup.swiperChange(...args))
      }, [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($setup.tabs, (item, index) => {
          return vue.openBlock(), vue.createElementBlock("swiper-item", {
            key: item.id
          }, [
            vue.createCommentVNode(" \u6BCF\u4E2A\u7EC4\u4EF6\u4E00\u4E2Aindex\uFF0C\u6570\u636E\u53EA\u52A0\u8F7D\u5F53\u524Dcurrent\u7684 "),
            vue.createVNode(_component_article_swiper, {
              ref_for: true,
              ref: "articleRef",
              i: index,
              index: $setup.current,
              tabs: $setup.tabs
            }, null, 8, ["i", "index", "tabs"])
          ]);
        }), 128))
      ], 44, ["current"])
    ]);
  }
  var PagesTabArticleArticle = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["render", _sfc_render$B]]);
  const _sfc_main$B = {
    props: {
      item: {
        type: Object,
        default: () => ({
          id: 1,
          title: "\u68A6\u8001\u5E08\u60A8\u597D\uFF0C\u6D4B\u8BD5\u5237\u65B0\u4EE4\u724C\uFF0C\u70B9\u51FB\u6D4F\u89C8\u5668\u5237\u65B0\u6309\u94AE\u65E0\u6CD5\u89E6\u53D1axios\u7684\u54CD\u5E94\u62E6\u622A",
          reply: 199,
          viewCount: 1e3,
          nickName: "\u68A6\u5C0F\u4E8C",
          updateDate: new Date()
        })
      }
    },
    setup() {
      return {
        formatCount
      };
    }
  };
  function _sfc_render$A(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "question-item",
      onClick: _cache[0] || (_cache[0] = ($event) => _ctx.navTo(`/pages/tab-question/question-details?id=${$props.item.id}`))
    }, [
      vue.createElementVNode("text", { class: "title text-ellipsis" }, vue.toDisplayString($props.item.title), 1),
      vue.createElementVNode("view", { class: "foot space-between" }, [
        vue.createElementVNode("view", { class: "info-left" }, [
          vue.createElementVNode("text", null, vue.toDisplayString($setup.formatCount($props.item.reply)) + " \u56DE\u7B54 \xB7 ", 1),
          vue.createElementVNode("text", null, vue.toDisplayString($setup.formatCount($props.item.viewCount)) + " \u6D4F\u89C8 ", 1)
        ]),
        vue.createElementVNode("view", { class: "info-right" }, [
          vue.createElementVNode("text", null, vue.toDisplayString($props.item.nickName) + " \xB7 ", 1),
          vue.createElementVNode("text", null, vue.toDisplayString(_ctx.$utils.dateFormat($props.item.updateDate)), 1)
        ])
      ])
    ]);
  }
  var __easycom_0$5 = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["render", _sfc_render$A], ["__scopeId", "data-v-71a9857a"]]);
  const getQuestionList = (query, current = 1, size = 10) => {
    return request({
      method: "POST",
      url: "/question/api/question/search",
      data: __spreadProps(__spreadValues({}, query), { current, size })
    });
  };
  const getHotQuestionList = (current = 1, size = 10) => {
    return request({
      method: "POST",
      url: "/question/api/question/hot",
      data: { current, size }
    });
  };
  const getNewQuestionList = (current = 1, size = 10) => {
    return request({
      method: "POST",
      url: "/question/api/question/new",
      data: { current, size }
    });
  };
  const getWaitQuestionList = (current = 1, size = 10) => {
    return request({
      method: "POST",
      url: "/question/api/question/wait",
      data: { current, size }
    });
  };
  const getQuestionDetail = (id) => {
    return request({
      url: "/question/api/question/" + id
    });
  };
  const getQuestionAnswerList = (id) => {
    return request({
      url: "/question/api/reply/list/" + id
    });
  };
  const addQuestionAnswer = (data2) => {
    return request({
      method: "POST",
      url: "/question/reply",
      data: data2
    });
  };
  const focusQuestion = (id) => {
    return request({
      method: "PUT",
      url: "/question/question/star/" + id
    });
  };
  const _sfc_main$A = {
    components: {
      "mescroll-uni": __easycom_1$2
    },
    mixins: [MescrollMixin, MescrollMoreItemMixin],
    props: {
      i: Number,
      index: {
        type: Number,
        default() {
          return 0;
        }
      },
      tabs: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    setup(props) {
      let { proxy } = vue.getCurrentInstance();
      let downOption = vue.ref({ auto: false });
      let upOption = vue.ref({
        auto: false,
        noMoreSize: 4,
        empty: {
          tip: "~ \u7A7A\u7A7A\u5982\u4E5F ~"
        }
      });
      let questionList2 = vue.ref([]);
      let upCallback = async (page) => {
        let keyword = props.tabs[props.i].name;
        formatAppLog("log", "at pages/tab-question/cpns/question-swiper.vue:66", keyword, page.num, page.size);
        let res = null;
        if (keyword == "\u70ED\u95E8\u56DE\u7B54") {
          res = await getHotQuestionList(page.num, page.size);
        } else if (keyword == "\u6700\u65B0\u56DE\u7B54") {
          res = await getNewQuestionList(page.num, page.size);
        } else if (keyword == "\u7B49\u5F85\u56DE\u7B54") {
          res = await getWaitQuestionList(page.num, page.size);
        }
        if (page.num == 1) {
          questionList2.value = [];
          proxy.mescroll.scrollTo(0, 100);
        }
        questionList2.value = [...questionList2.value, ...res.records];
        proxy.mescroll.endBySize(questionList2.value.length, res.total);
        proxy.mescroll.endErr();
      };
      return {
        downOption,
        upOption,
        questionList: questionList2,
        upCallback
      };
    }
  };
  function _sfc_render$z(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_question_item = resolveEasycom(vue.resolveDynamicComponent("question-item"), __easycom_0$5);
    const _component_mescroll_uni = resolveEasycom(vue.resolveDynamicComponent("mescroll-uni"), __easycom_1$2);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createCommentVNode(' top="xxx"\u4E0B\u62C9\u5E03\u5C40\u5F80\u4E0B\u504F\u79FB,\u9632\u6B62\u88AB\u60AC\u6D6E\u83DC\u5355\u906E\u4F4F '),
      vue.createVNode(_component_mescroll_uni, {
        ref: "mescrollRef" + $props.i,
        onInit: _ctx.mescrollInit,
        height: "100%",
        bottom: "80",
        down: $setup.downOption,
        onDown: _ctx.downCallback,
        up: $setup.upOption,
        onUp: $setup.upCallback
      }, {
        default: vue.withCtx(() => [
          vue.createCommentVNode(" \u6570\u636E\u5217\u8868 "),
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($setup.questionList, (item) => {
            return vue.openBlock(), vue.createBlock(_component_question_item, {
              key: item.id,
              item
            }, null, 8, ["item"]);
          }), 128))
        ]),
        _: 1
      }, 8, ["onInit", "down", "onDown", "up", "onUp"])
    ]);
  }
  var questionSwiper = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["render", _sfc_render$z]]);
  const _sfc_main$z = {
    components: {
      "question-swiper": questionSwiper
    },
    setup() {
      let { proxy } = vue.getCurrentInstance();
      let swiperHeight = vue.ref(0);
      let tabs = vue.ref([
        { id: 1, name: "\u70ED\u95E8\u56DE\u7B54" },
        { id: 2, name: "\u6700\u65B0\u56DE\u7B54" },
        { id: 3, name: "\u7B49\u5F85\u56DE\u7B54" }
      ]);
      let tabRef = vue.ref(null);
      let current = vue.ref(0);
      let arr = ["APP \xB7 \u5FAE\u4FE1\u5C0F\u7A0B\u5E8F", "Java \xB7 SpringBoot ", "springCloud \xB7 SpringSecurity", "Vue \xB7 React"];
      let i = 0;
      let resetSearchInfo = () => {
        let webView2 = proxy.$scope.$getAppWebview();
        setInterval(() => {
          i > arr.length - 1 ? i = 0 : "";
          webView2.setStyle({ "titleNView": { "searchInput": { "placeholder": arr[i++] } } });
        }, 3e3);
      };
      resetSearchInfo();
      vue.onMounted(() => {
        swiperHeight.value = uni.getSystemInfoSync().windowHeight - 40;
      });
      onNavigationBarSearchInputClicked(() => {
        proxy.navTo("/pages/search/search");
      });
      let changeTab = (id) => {
        current.value = id - 1;
      };
      const swiperChange = (e) => {
        current.value = e.detail.current;
        tabRef.value.tabId = e.detail.current + 1;
      };
      return {
        swiperHeight,
        tabs,
        tabRef,
        current,
        changeTab,
        swiperChange
      };
    }
  };
  function _sfc_render$y(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_tab_bar = resolveEasycom(vue.resolveDynamicComponent("tab-bar"), __easycom_0$7);
    const _component_question_swiper = vue.resolveComponent("question-swiper");
    return vue.openBlock(), vue.createElementBlock("view", { class: "cantainer" }, [
      vue.createElementVNode("view", { class: "tab" }, [
        vue.createVNode(_component_tab_bar, {
          ref: "tabRef",
          tabs: $setup.tabs,
          onChangeTab: $setup.changeTab
        }, null, 8, ["tabs", "onChangeTab"])
      ]),
      vue.createCommentVNode(" \u5DE6\u53F3\u6ED1\u52A8\u5207\u6362\u5207\u6362(swiper)+\u4E0A\u62C9\u52A0\u8F7D\u4E0B\u62C9\u5237\u65B0(mescroll) "),
      vue.createElementVNode("swiper", {
        duration: 1e3,
        style: vue.normalizeStyle({ "height": $setup.swiperHeight + "px" }),
        current: $setup.current,
        onChange: _cache[0] || (_cache[0] = (...args) => $setup.swiperChange && $setup.swiperChange(...args))
      }, [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($setup.tabs, (item, index) => {
          return vue.openBlock(), vue.createElementBlock("swiper-item", {
            key: item.id
          }, [
            vue.createCommentVNode(" \u6BCF\u4E2A\u7EC4\u4EF6\u4E00\u4E2Aindex\uFF0C\u6570\u636E\u53EA\u52A0\u8F7D\u5F53\u524Dcurrent\u7684 "),
            vue.createVNode(_component_question_swiper, {
              ref_for: true,
              ref: "articleRef",
              i: index,
              index: $setup.current,
              tabs: $setup.tabs
            }, null, 8, ["i", "index", "tabs"])
          ]);
        }), 128))
      ], 44, ["current"])
    ]);
  }
  var PagesTabQuestionQuestion = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["render", _sfc_render$y]]);
  const _sfc_main$y = {
    props: {
      list: Array
    },
    methods: {
      clickHandler(obj) {
        if (obj.page) {
          this.navTo(obj.page);
          return;
        }
        if (obj.event) {
          this.$emit(obj.event, obj);
        }
      }
    }
  };
  function _sfc_render$x(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "list-box" }, [
      vue.createCommentVNode(" \u4E00\u5927\u7C7B\u5217\u8868 "),
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.list, (item, index) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          class: "list",
          key: index
        }, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item, (nav, i) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: i,
              onClick: ($event) => nav.checked || nav.checked == false ? "" : $options.clickHandler(nav),
              class: "list-item space-between center",
              "hover-class": nav.checked || nav.checked == false ? "" : "active",
              "hover-start-time": 50
            }, [
              vue.createElementVNode("view", { class: "left center" }, [
                nav.icon ? (vue.openBlock(), vue.createElementBlock("text", {
                  key: 0,
                  class: vue.normalizeClass(nav.icon)
                }, null, 2)) : vue.createCommentVNode("v-if", true),
                vue.createElementVNode("text", null, vue.toDisplayString(nav.title), 1)
              ]),
              vue.createElementVNode("view", { class: "right center" }, [
                nav.text ? (vue.openBlock(), vue.createElementBlock("text", { key: 0 }, vue.toDisplayString(nav.text), 1)) : vue.createCommentVNode("v-if", true),
                vue.createCommentVNode(" \u963B\u6B62\u8C03\u7528\u7236\u7EC4\u4EF6\u7684click\u4E8B\u4EF6 "),
                nav.checked || nav.checked == false ? (vue.openBlock(), vue.createElementBlock("switch", {
                  key: 1,
                  onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {
                  }, ["stop"])),
                  onChange: ($event) => $options.clickHandler(nav),
                  checked: nav.checked,
                  color: "#A2CD5A"
                }, null, 40, ["onChange", "checked"])) : vue.createCommentVNode("v-if", true),
                nav.src ? (vue.openBlock(), vue.createElementBlock("image", {
                  key: 2,
                  src: nav.src
                }, null, 8, ["src"])) : vue.createCommentVNode("v-if", true),
                nav.rightIcon ? (vue.openBlock(), vue.createElementBlock("text", {
                  key: 3,
                  class: vue.normalizeClass(nav.rightIcon)
                }, null, 2)) : vue.createCommentVNode("v-if", true)
              ])
            ], 8, ["onClick", "hover-class"]);
          }), 128))
        ]);
      }), 128))
    ]);
  }
  var __easycom_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["render", _sfc_render$x], ["__scopeId", "data-v-f9b47b78"]]);
  const rightIcon = "iconfont icon-right";
  var data$1 = [
    [
      {
        icon: "mxg-icon mxg-icon-host-color",
        title: "\u6211\u7684\u8BA2\u5355",
        rightIcon,
        page: "/pages/order/order-list",
        login: true
      },
      {
        icon: "mxg-icon mxg-icon-lock-color",
        title: "\u6211\u7684\u4F59\u989D",
        rightIcon,
        page: "/pages/order/my-balance",
        login: true
      },
      {
        icon: "mxg-icon mxg-icon-warn",
        title: "\u6211\u7684\u5B66\u4E60",
        rightIcon,
        page: "/pages/tab-my/study",
        login: true
      }
    ],
    [
      {
        icon: "mxg-icon mxg-icon-set-color",
        title: "\u8BBE\u7F6E",
        rightIcon,
        page: "/pages/tab-my/setting"
      },
      {
        icon: "mxg-icon mxg-icon-notice-color",
        title: "\u610F\u89C1\u53CD\u9988",
        rightIcon,
        page: "/pages/tab-my/feedback"
      }
    ],
    [
      {
        icon: "mxg-icon mxg-icon-model-color",
        title: "\u5173\u4E8E\u6211\u4EEC",
        rightIcon,
        page: "/pages/tab-my/about"
      }
    ]
  ];
  const _sfc_main$x = {
    setup() {
      vue.getCurrentInstance();
      let list = vue.ref(data$1);
      return {
        list
      };
    }
  };
  function _sfc_render$w(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_my_list = resolveEasycom(vue.resolveDynamicComponent("my-list"), __easycom_0$4);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createCommentVNode(" \u5934\u90E8\u7A7A\u51FA\u7684\u8DDD\u79BB "),
      vue.createElementVNode("view", { class: "status_bar" }),
      vue.createCommentVNode(" \u5934\u90E8\u7528\u6237\u4FE1\u606F "),
      vue.createElementVNode("view", { class: "my-header" }, [
        vue.createElementVNode("view", {
          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.navTo("/pages/auth/login")),
          class: "header-content space-between center"
        }, [
          vue.createElementVNode("view", { class: "left center" }, [
            vue.createElementVNode("image", {
              class: "header-image",
              src: "/static/logo.png"
            }),
            (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "header-info"
            }, [
              vue.createElementVNode("text", { class: "nickname" }, "\u8BF7\u767B\u5F55")
            ]))
          ]),
          vue.createElementVNode("text", { class: "iconfont icon-right" })
        ])
      ]),
      vue.createCommentVNode(" \u529F\u80FD\u5217\u8868 "),
      vue.createVNode(_component_my_list, { list: $setup.list }, null, 8, ["list"])
    ]);
  }
  var PagesTabMyMy = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["render", _sfc_render$w]]);
  const _sfc_main$w = {
    setup() {
      let url = vue.ref("");
      const open = (url2) => {
        if (url2.indexOf("mengxuegu") == -1) {
          return false;
        } else {
          return true;
        }
      };
      return {
        url,
        open
      };
    },
    onLoad(option) {
      this.url = option.url;
    }
  };
  function _sfc_render$v(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      $setup.open($setup.url) ? (vue.openBlock(), vue.createElementBlock("web-view", {
        key: 0,
        src: $setup.url
      }, null, 8, ["src"])) : (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "tip column"
      }, [
        vue.createElementVNode("text", null, "\u8BF7\u590D\u5236\u94FE\u63A5\u5E76\u6253\u5F00\u6D4F\u89C8\u5668\u8BBF\u95EE"),
        vue.createElementVNode("text", { selectable: "" }, vue.toDisplayString($setup.url), 1)
      ]))
    ]);
  }
  var PagesPublicPublic = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["render", _sfc_render$v]]);
  var icons = {
    "id": "2852637",
    "name": "uniui\u56FE\u6807\u5E93",
    "font_family": "uniicons",
    "css_prefix_text": "uniui-",
    "description": "",
    "glyphs": [
      {
        "icon_id": "25027049",
        "name": "yanse",
        "font_class": "color",
        "unicode": "e6cf",
        "unicode_decimal": 59087
      },
      {
        "icon_id": "25027048",
        "name": "wallet",
        "font_class": "wallet",
        "unicode": "e6b1",
        "unicode_decimal": 59057
      },
      {
        "icon_id": "25015720",
        "name": "settings-filled",
        "font_class": "settings-filled",
        "unicode": "e6ce",
        "unicode_decimal": 59086
      },
      {
        "icon_id": "25015434",
        "name": "shimingrenzheng-filled",
        "font_class": "auth-filled",
        "unicode": "e6cc",
        "unicode_decimal": 59084
      },
      {
        "icon_id": "24934246",
        "name": "shop-filled",
        "font_class": "shop-filled",
        "unicode": "e6cd",
        "unicode_decimal": 59085
      },
      {
        "icon_id": "24934159",
        "name": "staff-filled-01",
        "font_class": "staff-filled",
        "unicode": "e6cb",
        "unicode_decimal": 59083
      },
      {
        "icon_id": "24932461",
        "name": "VIP-filled",
        "font_class": "vip-filled",
        "unicode": "e6c6",
        "unicode_decimal": 59078
      },
      {
        "icon_id": "24932462",
        "name": "plus_circle_fill",
        "font_class": "plus-filled",
        "unicode": "e6c7",
        "unicode_decimal": 59079
      },
      {
        "icon_id": "24932463",
        "name": "folder_add-filled",
        "font_class": "folder-add-filled",
        "unicode": "e6c8",
        "unicode_decimal": 59080
      },
      {
        "icon_id": "24932464",
        "name": "yanse-filled",
        "font_class": "color-filled",
        "unicode": "e6c9",
        "unicode_decimal": 59081
      },
      {
        "icon_id": "24932465",
        "name": "tune-filled",
        "font_class": "tune-filled",
        "unicode": "e6ca",
        "unicode_decimal": 59082
      },
      {
        "icon_id": "24932455",
        "name": "a-rilidaka-filled",
        "font_class": "calendar-filled",
        "unicode": "e6c0",
        "unicode_decimal": 59072
      },
      {
        "icon_id": "24932456",
        "name": "notification-filled",
        "font_class": "notification-filled",
        "unicode": "e6c1",
        "unicode_decimal": 59073
      },
      {
        "icon_id": "24932457",
        "name": "wallet-filled",
        "font_class": "wallet-filled",
        "unicode": "e6c2",
        "unicode_decimal": 59074
      },
      {
        "icon_id": "24932458",
        "name": "paihangbang-filled",
        "font_class": "medal-filled",
        "unicode": "e6c3",
        "unicode_decimal": 59075
      },
      {
        "icon_id": "24932459",
        "name": "gift-filled",
        "font_class": "gift-filled",
        "unicode": "e6c4",
        "unicode_decimal": 59076
      },
      {
        "icon_id": "24932460",
        "name": "fire-filled",
        "font_class": "fire-filled",
        "unicode": "e6c5",
        "unicode_decimal": 59077
      },
      {
        "icon_id": "24928001",
        "name": "refreshempty",
        "font_class": "refreshempty",
        "unicode": "e6bf",
        "unicode_decimal": 59071
      },
      {
        "icon_id": "24926853",
        "name": "location-ellipse",
        "font_class": "location-filled",
        "unicode": "e6af",
        "unicode_decimal": 59055
      },
      {
        "icon_id": "24926735",
        "name": "person-filled",
        "font_class": "person-filled",
        "unicode": "e69d",
        "unicode_decimal": 59037
      },
      {
        "icon_id": "24926703",
        "name": "personadd-filled",
        "font_class": "personadd-filled",
        "unicode": "e698",
        "unicode_decimal": 59032
      },
      {
        "icon_id": "24923351",
        "name": "back",
        "font_class": "back",
        "unicode": "e6b9",
        "unicode_decimal": 59065
      },
      {
        "icon_id": "24923352",
        "name": "forward",
        "font_class": "forward",
        "unicode": "e6ba",
        "unicode_decimal": 59066
      },
      {
        "icon_id": "24923353",
        "name": "arrowthinright",
        "font_class": "arrow-right",
        "unicode": "e6bb",
        "unicode_decimal": 59067
      },
      {
        "icon_id": "24923353",
        "name": "arrowthinright",
        "font_class": "arrowthinright",
        "unicode": "e6bb",
        "unicode_decimal": 59067
      },
      {
        "icon_id": "24923354",
        "name": "arrowthinleft",
        "font_class": "arrow-left",
        "unicode": "e6bc",
        "unicode_decimal": 59068
      },
      {
        "icon_id": "24923354",
        "name": "arrowthinleft",
        "font_class": "arrowthinleft",
        "unicode": "e6bc",
        "unicode_decimal": 59068
      },
      {
        "icon_id": "24923355",
        "name": "arrowthinup",
        "font_class": "arrow-up",
        "unicode": "e6bd",
        "unicode_decimal": 59069
      },
      {
        "icon_id": "24923355",
        "name": "arrowthinup",
        "font_class": "arrowthinup",
        "unicode": "e6bd",
        "unicode_decimal": 59069
      },
      {
        "icon_id": "24923356",
        "name": "arrowthindown",
        "font_class": "arrow-down",
        "unicode": "e6be",
        "unicode_decimal": 59070
      },
      {
        "icon_id": "24923356",
        "name": "arrowthindown",
        "font_class": "arrowthindown",
        "unicode": "e6be",
        "unicode_decimal": 59070
      },
      {
        "icon_id": "24923349",
        "name": "arrowdown",
        "font_class": "bottom",
        "unicode": "e6b8",
        "unicode_decimal": 59064
      },
      {
        "icon_id": "24923349",
        "name": "arrowdown",
        "font_class": "arrowdown",
        "unicode": "e6b8",
        "unicode_decimal": 59064
      },
      {
        "icon_id": "24923346",
        "name": "arrowright",
        "font_class": "right",
        "unicode": "e6b5",
        "unicode_decimal": 59061
      },
      {
        "icon_id": "24923346",
        "name": "arrowright",
        "font_class": "arrowright",
        "unicode": "e6b5",
        "unicode_decimal": 59061
      },
      {
        "icon_id": "24923347",
        "name": "arrowup",
        "font_class": "top",
        "unicode": "e6b6",
        "unicode_decimal": 59062
      },
      {
        "icon_id": "24923347",
        "name": "arrowup",
        "font_class": "arrowup",
        "unicode": "e6b6",
        "unicode_decimal": 59062
      },
      {
        "icon_id": "24923348",
        "name": "arrowleft",
        "font_class": "left",
        "unicode": "e6b7",
        "unicode_decimal": 59063
      },
      {
        "icon_id": "24923348",
        "name": "arrowleft",
        "font_class": "arrowleft",
        "unicode": "e6b7",
        "unicode_decimal": 59063
      },
      {
        "icon_id": "24923334",
        "name": "eye",
        "font_class": "eye",
        "unicode": "e651",
        "unicode_decimal": 58961
      },
      {
        "icon_id": "24923335",
        "name": "eye-filled",
        "font_class": "eye-filled",
        "unicode": "e66a",
        "unicode_decimal": 58986
      },
      {
        "icon_id": "24923336",
        "name": "eye-slash",
        "font_class": "eye-slash",
        "unicode": "e6b3",
        "unicode_decimal": 59059
      },
      {
        "icon_id": "24923337",
        "name": "eye-slash-filled",
        "font_class": "eye-slash-filled",
        "unicode": "e6b4",
        "unicode_decimal": 59060
      },
      {
        "icon_id": "24923305",
        "name": "info-filled",
        "font_class": "info-filled",
        "unicode": "e649",
        "unicode_decimal": 58953
      },
      {
        "icon_id": "24923299",
        "name": "reload-01",
        "font_class": "reload",
        "unicode": "e6b2",
        "unicode_decimal": 59058
      },
      {
        "icon_id": "24923195",
        "name": "mic_slash_fill",
        "font_class": "micoff-filled",
        "unicode": "e6b0",
        "unicode_decimal": 59056
      },
      {
        "icon_id": "24923165",
        "name": "map-pin-ellipse",
        "font_class": "map-pin-ellipse",
        "unicode": "e6ac",
        "unicode_decimal": 59052
      },
      {
        "icon_id": "24923166",
        "name": "map-pin",
        "font_class": "map-pin",
        "unicode": "e6ad",
        "unicode_decimal": 59053
      },
      {
        "icon_id": "24923167",
        "name": "location",
        "font_class": "location",
        "unicode": "e6ae",
        "unicode_decimal": 59054
      },
      {
        "icon_id": "24923064",
        "name": "starhalf",
        "font_class": "starhalf",
        "unicode": "e683",
        "unicode_decimal": 59011
      },
      {
        "icon_id": "24923065",
        "name": "star",
        "font_class": "star",
        "unicode": "e688",
        "unicode_decimal": 59016
      },
      {
        "icon_id": "24923066",
        "name": "star-filled",
        "font_class": "star-filled",
        "unicode": "e68f",
        "unicode_decimal": 59023
      },
      {
        "icon_id": "24899646",
        "name": "a-rilidaka",
        "font_class": "calendar",
        "unicode": "e6a0",
        "unicode_decimal": 59040
      },
      {
        "icon_id": "24899647",
        "name": "fire",
        "font_class": "fire",
        "unicode": "e6a1",
        "unicode_decimal": 59041
      },
      {
        "icon_id": "24899648",
        "name": "paihangbang",
        "font_class": "medal",
        "unicode": "e6a2",
        "unicode_decimal": 59042
      },
      {
        "icon_id": "24899649",
        "name": "font",
        "font_class": "font",
        "unicode": "e6a3",
        "unicode_decimal": 59043
      },
      {
        "icon_id": "24899650",
        "name": "gift",
        "font_class": "gift",
        "unicode": "e6a4",
        "unicode_decimal": 59044
      },
      {
        "icon_id": "24899651",
        "name": "link",
        "font_class": "link",
        "unicode": "e6a5",
        "unicode_decimal": 59045
      },
      {
        "icon_id": "24899652",
        "name": "notification",
        "font_class": "notification",
        "unicode": "e6a6",
        "unicode_decimal": 59046
      },
      {
        "icon_id": "24899653",
        "name": "staff",
        "font_class": "staff",
        "unicode": "e6a7",
        "unicode_decimal": 59047
      },
      {
        "icon_id": "24899654",
        "name": "VIP",
        "font_class": "vip",
        "unicode": "e6a8",
        "unicode_decimal": 59048
      },
      {
        "icon_id": "24899655",
        "name": "folder_add",
        "font_class": "folder-add",
        "unicode": "e6a9",
        "unicode_decimal": 59049
      },
      {
        "icon_id": "24899656",
        "name": "tune",
        "font_class": "tune",
        "unicode": "e6aa",
        "unicode_decimal": 59050
      },
      {
        "icon_id": "24899657",
        "name": "shimingrenzheng",
        "font_class": "auth",
        "unicode": "e6ab",
        "unicode_decimal": 59051
      },
      {
        "icon_id": "24899565",
        "name": "person",
        "font_class": "person",
        "unicode": "e699",
        "unicode_decimal": 59033
      },
      {
        "icon_id": "24899566",
        "name": "email-filled",
        "font_class": "email-filled",
        "unicode": "e69a",
        "unicode_decimal": 59034
      },
      {
        "icon_id": "24899567",
        "name": "phone-filled",
        "font_class": "phone-filled",
        "unicode": "e69b",
        "unicode_decimal": 59035
      },
      {
        "icon_id": "24899568",
        "name": "phone",
        "font_class": "phone",
        "unicode": "e69c",
        "unicode_decimal": 59036
      },
      {
        "icon_id": "24899570",
        "name": "email",
        "font_class": "email",
        "unicode": "e69e",
        "unicode_decimal": 59038
      },
      {
        "icon_id": "24899571",
        "name": "personadd",
        "font_class": "personadd",
        "unicode": "e69f",
        "unicode_decimal": 59039
      },
      {
        "icon_id": "24899558",
        "name": "chatboxes-filled",
        "font_class": "chatboxes-filled",
        "unicode": "e692",
        "unicode_decimal": 59026
      },
      {
        "icon_id": "24899559",
        "name": "contact",
        "font_class": "contact",
        "unicode": "e693",
        "unicode_decimal": 59027
      },
      {
        "icon_id": "24899560",
        "name": "chatbubble-filled",
        "font_class": "chatbubble-filled",
        "unicode": "e694",
        "unicode_decimal": 59028
      },
      {
        "icon_id": "24899561",
        "name": "contact-filled",
        "font_class": "contact-filled",
        "unicode": "e695",
        "unicode_decimal": 59029
      },
      {
        "icon_id": "24899562",
        "name": "chatboxes",
        "font_class": "chatboxes",
        "unicode": "e696",
        "unicode_decimal": 59030
      },
      {
        "icon_id": "24899563",
        "name": "chatbubble",
        "font_class": "chatbubble",
        "unicode": "e697",
        "unicode_decimal": 59031
      },
      {
        "icon_id": "24881290",
        "name": "upload-filled",
        "font_class": "upload-filled",
        "unicode": "e68e",
        "unicode_decimal": 59022
      },
      {
        "icon_id": "24881292",
        "name": "upload",
        "font_class": "upload",
        "unicode": "e690",
        "unicode_decimal": 59024
      },
      {
        "icon_id": "24881293",
        "name": "weixin",
        "font_class": "weixin",
        "unicode": "e691",
        "unicode_decimal": 59025
      },
      {
        "icon_id": "24881274",
        "name": "compose",
        "font_class": "compose",
        "unicode": "e67f",
        "unicode_decimal": 59007
      },
      {
        "icon_id": "24881275",
        "name": "qq",
        "font_class": "qq",
        "unicode": "e680",
        "unicode_decimal": 59008
      },
      {
        "icon_id": "24881276",
        "name": "download-filled",
        "font_class": "download-filled",
        "unicode": "e681",
        "unicode_decimal": 59009
      },
      {
        "icon_id": "24881277",
        "name": "pengyouquan",
        "font_class": "pyq",
        "unicode": "e682",
        "unicode_decimal": 59010
      },
      {
        "icon_id": "24881279",
        "name": "sound",
        "font_class": "sound",
        "unicode": "e684",
        "unicode_decimal": 59012
      },
      {
        "icon_id": "24881280",
        "name": "trash-filled",
        "font_class": "trash-filled",
        "unicode": "e685",
        "unicode_decimal": 59013
      },
      {
        "icon_id": "24881281",
        "name": "sound-filled",
        "font_class": "sound-filled",
        "unicode": "e686",
        "unicode_decimal": 59014
      },
      {
        "icon_id": "24881282",
        "name": "trash",
        "font_class": "trash",
        "unicode": "e687",
        "unicode_decimal": 59015
      },
      {
        "icon_id": "24881284",
        "name": "videocam-filled",
        "font_class": "videocam-filled",
        "unicode": "e689",
        "unicode_decimal": 59017
      },
      {
        "icon_id": "24881285",
        "name": "spinner-cycle",
        "font_class": "spinner-cycle",
        "unicode": "e68a",
        "unicode_decimal": 59018
      },
      {
        "icon_id": "24881286",
        "name": "weibo",
        "font_class": "weibo",
        "unicode": "e68b",
        "unicode_decimal": 59019
      },
      {
        "icon_id": "24881288",
        "name": "videocam",
        "font_class": "videocam",
        "unicode": "e68c",
        "unicode_decimal": 59020
      },
      {
        "icon_id": "24881289",
        "name": "download",
        "font_class": "download",
        "unicode": "e68d",
        "unicode_decimal": 59021
      },
      {
        "icon_id": "24879601",
        "name": "help",
        "font_class": "help",
        "unicode": "e679",
        "unicode_decimal": 59001
      },
      {
        "icon_id": "24879602",
        "name": "navigate-filled",
        "font_class": "navigate-filled",
        "unicode": "e67a",
        "unicode_decimal": 59002
      },
      {
        "icon_id": "24879603",
        "name": "plusempty",
        "font_class": "plusempty",
        "unicode": "e67b",
        "unicode_decimal": 59003
      },
      {
        "icon_id": "24879604",
        "name": "smallcircle",
        "font_class": "smallcircle",
        "unicode": "e67c",
        "unicode_decimal": 59004
      },
      {
        "icon_id": "24879605",
        "name": "minus-filled",
        "font_class": "minus-filled",
        "unicode": "e67d",
        "unicode_decimal": 59005
      },
      {
        "icon_id": "24879606",
        "name": "micoff",
        "font_class": "micoff",
        "unicode": "e67e",
        "unicode_decimal": 59006
      },
      {
        "icon_id": "24879588",
        "name": "closeempty",
        "font_class": "closeempty",
        "unicode": "e66c",
        "unicode_decimal": 58988
      },
      {
        "icon_id": "24879589",
        "name": "clear",
        "font_class": "clear",
        "unicode": "e66d",
        "unicode_decimal": 58989
      },
      {
        "icon_id": "24879590",
        "name": "navigate",
        "font_class": "navigate",
        "unicode": "e66e",
        "unicode_decimal": 58990
      },
      {
        "icon_id": "24879591",
        "name": "minus",
        "font_class": "minus",
        "unicode": "e66f",
        "unicode_decimal": 58991
      },
      {
        "icon_id": "24879592",
        "name": "image",
        "font_class": "image",
        "unicode": "e670",
        "unicode_decimal": 58992
      },
      {
        "icon_id": "24879593",
        "name": "mic",
        "font_class": "mic",
        "unicode": "e671",
        "unicode_decimal": 58993
      },
      {
        "icon_id": "24879594",
        "name": "paperplane",
        "font_class": "paperplane",
        "unicode": "e672",
        "unicode_decimal": 58994
      },
      {
        "icon_id": "24879595",
        "name": "close",
        "font_class": "close",
        "unicode": "e673",
        "unicode_decimal": 58995
      },
      {
        "icon_id": "24879596",
        "name": "help-filled",
        "font_class": "help-filled",
        "unicode": "e674",
        "unicode_decimal": 58996
      },
      {
        "icon_id": "24879597",
        "name": "plus-filled",
        "font_class": "paperplane-filled",
        "unicode": "e675",
        "unicode_decimal": 58997
      },
      {
        "icon_id": "24879598",
        "name": "plus",
        "font_class": "plus",
        "unicode": "e676",
        "unicode_decimal": 58998
      },
      {
        "icon_id": "24879599",
        "name": "mic-filled",
        "font_class": "mic-filled",
        "unicode": "e677",
        "unicode_decimal": 58999
      },
      {
        "icon_id": "24879600",
        "name": "image-filled",
        "font_class": "image-filled",
        "unicode": "e678",
        "unicode_decimal": 59e3
      },
      {
        "icon_id": "24855900",
        "name": "locked-filled",
        "font_class": "locked-filled",
        "unicode": "e668",
        "unicode_decimal": 58984
      },
      {
        "icon_id": "24855901",
        "name": "info",
        "font_class": "info",
        "unicode": "e669",
        "unicode_decimal": 58985
      },
      {
        "icon_id": "24855903",
        "name": "locked",
        "font_class": "locked",
        "unicode": "e66b",
        "unicode_decimal": 58987
      },
      {
        "icon_id": "24855884",
        "name": "camera-filled",
        "font_class": "camera-filled",
        "unicode": "e658",
        "unicode_decimal": 58968
      },
      {
        "icon_id": "24855885",
        "name": "chat-filled",
        "font_class": "chat-filled",
        "unicode": "e659",
        "unicode_decimal": 58969
      },
      {
        "icon_id": "24855886",
        "name": "camera",
        "font_class": "camera",
        "unicode": "e65a",
        "unicode_decimal": 58970
      },
      {
        "icon_id": "24855887",
        "name": "circle",
        "font_class": "circle",
        "unicode": "e65b",
        "unicode_decimal": 58971
      },
      {
        "icon_id": "24855888",
        "name": "checkmarkempty",
        "font_class": "checkmarkempty",
        "unicode": "e65c",
        "unicode_decimal": 58972
      },
      {
        "icon_id": "24855889",
        "name": "chat",
        "font_class": "chat",
        "unicode": "e65d",
        "unicode_decimal": 58973
      },
      {
        "icon_id": "24855890",
        "name": "circle-filled",
        "font_class": "circle-filled",
        "unicode": "e65e",
        "unicode_decimal": 58974
      },
      {
        "icon_id": "24855891",
        "name": "flag",
        "font_class": "flag",
        "unicode": "e65f",
        "unicode_decimal": 58975
      },
      {
        "icon_id": "24855892",
        "name": "flag-filled",
        "font_class": "flag-filled",
        "unicode": "e660",
        "unicode_decimal": 58976
      },
      {
        "icon_id": "24855893",
        "name": "gear-filled",
        "font_class": "gear-filled",
        "unicode": "e661",
        "unicode_decimal": 58977
      },
      {
        "icon_id": "24855894",
        "name": "home",
        "font_class": "home",
        "unicode": "e662",
        "unicode_decimal": 58978
      },
      {
        "icon_id": "24855895",
        "name": "home-filled",
        "font_class": "home-filled",
        "unicode": "e663",
        "unicode_decimal": 58979
      },
      {
        "icon_id": "24855896",
        "name": "gear",
        "font_class": "gear",
        "unicode": "e664",
        "unicode_decimal": 58980
      },
      {
        "icon_id": "24855897",
        "name": "smallcircle-filled",
        "font_class": "smallcircle-filled",
        "unicode": "e665",
        "unicode_decimal": 58981
      },
      {
        "icon_id": "24855898",
        "name": "map-filled",
        "font_class": "map-filled",
        "unicode": "e666",
        "unicode_decimal": 58982
      },
      {
        "icon_id": "24855899",
        "name": "map",
        "font_class": "map",
        "unicode": "e667",
        "unicode_decimal": 58983
      },
      {
        "icon_id": "24855825",
        "name": "refresh-filled",
        "font_class": "refresh-filled",
        "unicode": "e656",
        "unicode_decimal": 58966
      },
      {
        "icon_id": "24855826",
        "name": "refresh",
        "font_class": "refresh",
        "unicode": "e657",
        "unicode_decimal": 58967
      },
      {
        "icon_id": "24855808",
        "name": "cloud-upload",
        "font_class": "cloud-upload",
        "unicode": "e645",
        "unicode_decimal": 58949
      },
      {
        "icon_id": "24855809",
        "name": "cloud-download-filled",
        "font_class": "cloud-download-filled",
        "unicode": "e646",
        "unicode_decimal": 58950
      },
      {
        "icon_id": "24855810",
        "name": "cloud-download",
        "font_class": "cloud-download",
        "unicode": "e647",
        "unicode_decimal": 58951
      },
      {
        "icon_id": "24855811",
        "name": "cloud-upload-filled",
        "font_class": "cloud-upload-filled",
        "unicode": "e648",
        "unicode_decimal": 58952
      },
      {
        "icon_id": "24855813",
        "name": "redo",
        "font_class": "redo",
        "unicode": "e64a",
        "unicode_decimal": 58954
      },
      {
        "icon_id": "24855814",
        "name": "images-filled",
        "font_class": "images-filled",
        "unicode": "e64b",
        "unicode_decimal": 58955
      },
      {
        "icon_id": "24855815",
        "name": "undo-filled",
        "font_class": "undo-filled",
        "unicode": "e64c",
        "unicode_decimal": 58956
      },
      {
        "icon_id": "24855816",
        "name": "more",
        "font_class": "more",
        "unicode": "e64d",
        "unicode_decimal": 58957
      },
      {
        "icon_id": "24855817",
        "name": "more-filled",
        "font_class": "more-filled",
        "unicode": "e64e",
        "unicode_decimal": 58958
      },
      {
        "icon_id": "24855818",
        "name": "undo",
        "font_class": "undo",
        "unicode": "e64f",
        "unicode_decimal": 58959
      },
      {
        "icon_id": "24855819",
        "name": "images",
        "font_class": "images",
        "unicode": "e650",
        "unicode_decimal": 58960
      },
      {
        "icon_id": "24855821",
        "name": "paperclip",
        "font_class": "paperclip",
        "unicode": "e652",
        "unicode_decimal": 58962
      },
      {
        "icon_id": "24855822",
        "name": "settings",
        "font_class": "settings",
        "unicode": "e653",
        "unicode_decimal": 58963
      },
      {
        "icon_id": "24855823",
        "name": "search",
        "font_class": "search",
        "unicode": "e654",
        "unicode_decimal": 58964
      },
      {
        "icon_id": "24855824",
        "name": "redo-filled",
        "font_class": "redo-filled",
        "unicode": "e655",
        "unicode_decimal": 58965
      },
      {
        "icon_id": "24841702",
        "name": "list",
        "font_class": "list",
        "unicode": "e644",
        "unicode_decimal": 58948
      },
      {
        "icon_id": "24841489",
        "name": "mail-open-filled",
        "font_class": "mail-open-filled",
        "unicode": "e63a",
        "unicode_decimal": 58938
      },
      {
        "icon_id": "24841491",
        "name": "hand-thumbsdown-filled",
        "font_class": "hand-down-filled",
        "unicode": "e63c",
        "unicode_decimal": 58940
      },
      {
        "icon_id": "24841492",
        "name": "hand-thumbsdown",
        "font_class": "hand-down",
        "unicode": "e63d",
        "unicode_decimal": 58941
      },
      {
        "icon_id": "24841493",
        "name": "hand-thumbsup-filled",
        "font_class": "hand-up-filled",
        "unicode": "e63e",
        "unicode_decimal": 58942
      },
      {
        "icon_id": "24841494",
        "name": "hand-thumbsup",
        "font_class": "hand-up",
        "unicode": "e63f",
        "unicode_decimal": 58943
      },
      {
        "icon_id": "24841496",
        "name": "heart-filled",
        "font_class": "heart-filled",
        "unicode": "e641",
        "unicode_decimal": 58945
      },
      {
        "icon_id": "24841498",
        "name": "mail-open",
        "font_class": "mail-open",
        "unicode": "e643",
        "unicode_decimal": 58947
      },
      {
        "icon_id": "24841488",
        "name": "heart",
        "font_class": "heart",
        "unicode": "e639",
        "unicode_decimal": 58937
      },
      {
        "icon_id": "24839963",
        "name": "loop",
        "font_class": "loop",
        "unicode": "e633",
        "unicode_decimal": 58931
      },
      {
        "icon_id": "24839866",
        "name": "pulldown",
        "font_class": "pulldown",
        "unicode": "e632",
        "unicode_decimal": 58930
      },
      {
        "icon_id": "24813798",
        "name": "scan",
        "font_class": "scan",
        "unicode": "e62a",
        "unicode_decimal": 58922
      },
      {
        "icon_id": "24813786",
        "name": "bars",
        "font_class": "bars",
        "unicode": "e627",
        "unicode_decimal": 58919
      },
      {
        "icon_id": "24813788",
        "name": "cart-filled",
        "font_class": "cart-filled",
        "unicode": "e629",
        "unicode_decimal": 58921
      },
      {
        "icon_id": "24813790",
        "name": "checkbox",
        "font_class": "checkbox",
        "unicode": "e62b",
        "unicode_decimal": 58923
      },
      {
        "icon_id": "24813791",
        "name": "checkbox-filled",
        "font_class": "checkbox-filled",
        "unicode": "e62c",
        "unicode_decimal": 58924
      },
      {
        "icon_id": "24813794",
        "name": "shop",
        "font_class": "shop",
        "unicode": "e62f",
        "unicode_decimal": 58927
      },
      {
        "icon_id": "24813795",
        "name": "headphones",
        "font_class": "headphones",
        "unicode": "e630",
        "unicode_decimal": 58928
      },
      {
        "icon_id": "24813796",
        "name": "cart",
        "font_class": "cart",
        "unicode": "e631",
        "unicode_decimal": 58929
      }
    ]
  };
  const getVal = (val) => {
    const reg = /^[0-9]*$/g;
    return typeof val === "number" || reg.test(val) ? val + "px" : val;
  };
  const _sfc_main$v = {
    name: "UniIcons",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "#333333"
      },
      size: {
        type: [Number, String],
        default: 16
      },
      customPrefix: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        icons: icons.glyphs
      };
    },
    computed: {
      unicode() {
        let code = this.icons.find((v) => v.font_class === this.type);
        if (code) {
          return unescape(`%u${code.unicode}`);
        }
        return "";
      },
      iconSize() {
        return getVal(this.size);
      }
    },
    methods: {
      _onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$u(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("text", {
      style: vue.normalizeStyle({ color: $props.color, "font-size": $options.iconSize }),
      class: vue.normalizeClass(["uni-icons", ["uniui-" + $props.type, $props.customPrefix, $props.customPrefix ? $props.type : ""]]),
      onClick: _cache[0] || (_cache[0] = (...args) => $options._onClick && $options._onClick(...args))
    }, null, 6);
  }
  var __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render$u], ["__scopeId", "data-v-a2e81f6e"]]);
  const isArray = Array.isArray;
  const isObject = (val) => val !== null && typeof val === "object";
  const defaultDelimiters = ["{", "}"];
  class BaseFormatter {
    constructor() {
      this._caches = /* @__PURE__ */ Object.create(null);
    }
    interpolate(message2, values, delimiters = defaultDelimiters) {
      if (!values) {
        return [message2];
      }
      let tokens = this._caches[message2];
      if (!tokens) {
        tokens = parse(message2, delimiters);
        this._caches[message2] = tokens;
      }
      return compile(tokens, values);
    }
  }
  const RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
  const RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
  function parse(format2, [startDelimiter, endDelimiter]) {
    const tokens = [];
    let position = 0;
    let text = "";
    while (position < format2.length) {
      let char = format2[position++];
      if (char === startDelimiter) {
        if (text) {
          tokens.push({ type: "text", value: text });
        }
        text = "";
        let sub = "";
        char = format2[position++];
        while (char !== void 0 && char !== endDelimiter) {
          sub += char;
          char = format2[position++];
        }
        const isClosed = char === endDelimiter;
        const type = RE_TOKEN_LIST_VALUE.test(sub) ? "list" : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? "named" : "unknown";
        tokens.push({ value: sub, type });
      } else {
        text += char;
      }
    }
    text && tokens.push({ type: "text", value: text });
    return tokens;
  }
  function compile(tokens, values) {
    const compiled = [];
    let index = 0;
    const mode = isArray(values) ? "list" : isObject(values) ? "named" : "unknown";
    if (mode === "unknown") {
      return compiled;
    }
    while (index < tokens.length) {
      const token = tokens[index];
      switch (token.type) {
        case "text":
          compiled.push(token.value);
          break;
        case "list":
          compiled.push(values[parseInt(token.value, 10)]);
          break;
        case "named":
          if (mode === "named") {
            compiled.push(values[token.value]);
          } else {
            {
              console.warn(`Type of token '${token.type}' and format of value '${mode}' don't match!`);
            }
          }
          break;
        case "unknown":
          {
            console.warn(`Detect 'unknown' type of token!`);
          }
          break;
      }
      index++;
    }
    return compiled;
  }
  const LOCALE_ZH_HANS = "zh-Hans";
  const LOCALE_ZH_HANT = "zh-Hant";
  const LOCALE_EN = "en";
  const LOCALE_FR = "fr";
  const LOCALE_ES = "es";
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  const hasOwn = (val, key) => hasOwnProperty.call(val, key);
  const defaultFormatter = new BaseFormatter();
  function include(str, parts) {
    return !!parts.find((part) => str.indexOf(part) !== -1);
  }
  function startsWith(str, parts) {
    return parts.find((part) => str.indexOf(part) === 0);
  }
  function normalizeLocale(locale, messages2) {
    if (!locale) {
      return;
    }
    locale = locale.trim().replace(/_/g, "-");
    if (messages2 && messages2[locale]) {
      return locale;
    }
    locale = locale.toLowerCase();
    if (locale === "chinese") {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("zh") === 0) {
      if (locale.indexOf("-hans") > -1) {
        return LOCALE_ZH_HANS;
      }
      if (locale.indexOf("-hant") > -1) {
        return LOCALE_ZH_HANT;
      }
      if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
        return LOCALE_ZH_HANT;
      }
      return LOCALE_ZH_HANS;
    }
    const lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
    if (lang) {
      return lang;
    }
  }
  class I18n {
    constructor({ locale, fallbackLocale, messages: messages2, watcher, formater }) {
      this.locale = LOCALE_EN;
      this.fallbackLocale = LOCALE_EN;
      this.message = {};
      this.messages = {};
      this.watchers = [];
      if (fallbackLocale) {
        this.fallbackLocale = fallbackLocale;
      }
      this.formater = formater || defaultFormatter;
      this.messages = messages2 || {};
      this.setLocale(locale || LOCALE_EN);
      if (watcher) {
        this.watchLocale(watcher);
      }
    }
    setLocale(locale) {
      const oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      if (oldLocale !== this.locale) {
        this.watchers.forEach((watcher) => {
          watcher(this.locale, oldLocale);
        });
      }
    }
    getLocale() {
      return this.locale;
    }
    watchLocale(fn) {
      const index = this.watchers.push(fn) - 1;
      return () => {
        this.watchers.splice(index, 1);
      };
    }
    add(locale, message2, override = true) {
      const curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message2);
        } else {
          Object.keys(message2).forEach((key) => {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message2[key];
            }
          });
        }
      } else {
        this.messages[locale] = message2;
      }
    }
    f(message2, values, delimiters) {
      return this.formater.interpolate(message2, values, delimiters).join("");
    }
    t(key, locale, values) {
      let message2 = this.message;
      if (typeof locale === "string") {
        locale = normalizeLocale(locale, this.messages);
        locale && (message2 = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message2, key)) {
        console.warn(`Cannot translate the value of keypath ${key}. Use the value of keypath as default.`);
        return key;
      }
      return this.formater.interpolate(message2[key], values).join("");
    }
  }
  function watchAppLocale(appVm, i18n) {
    if (appVm.$watchLocale) {
      appVm.$watchLocale((newLocale) => {
        i18n.setLocale(newLocale);
      });
    } else {
      appVm.$watch(() => appVm.$locale, (newLocale) => {
        i18n.setLocale(newLocale);
      });
    }
  }
  function getDefaultLocale() {
    if (typeof uni !== "undefined" && uni.getLocale) {
      return uni.getLocale();
    }
    if (typeof global !== "undefined" && global.getLocale) {
      return global.getLocale();
    }
    return LOCALE_EN;
  }
  function initVueI18n(locale, messages2 = {}, fallbackLocale, watcher) {
    if (typeof locale !== "string") {
      [locale, messages2] = [
        messages2,
        locale
      ];
    }
    if (typeof locale !== "string") {
      locale = getDefaultLocale();
    }
    if (typeof fallbackLocale !== "string") {
      fallbackLocale = typeof __uniConfig !== "undefined" && __uniConfig.fallbackLocale || LOCALE_EN;
    }
    const i18n = new I18n({
      locale,
      fallbackLocale,
      messages: messages2,
      watcher
    });
    let t2 = (key, values) => {
      if (typeof getApp !== "function") {
        t2 = function(key2, values2) {
          return i18n.t(key2, values2);
        };
      } else {
        let isWatchedAppLocale = false;
        t2 = function(key2, values2) {
          const appVm = getApp().$vm;
          if (appVm) {
            appVm.$locale;
            if (!isWatchedAppLocale) {
              isWatchedAppLocale = true;
              watchAppLocale(appVm, i18n);
            }
          }
          return i18n.t(key2, values2);
        };
      }
      return t2(key, values);
    };
    return {
      i18n,
      f(message2, values, delimiters) {
        return i18n.f(message2, values, delimiters);
      },
      t(key, values) {
        return t2(key, values);
      },
      add(locale2, message2, override = true) {
        return i18n.add(locale2, message2, override);
      },
      watch(fn) {
        return i18n.watchLocale(fn);
      },
      getLocale() {
        return i18n.getLocale();
      },
      setLocale(newLocale) {
        return i18n.setLocale(newLocale);
      }
    };
  }
  var en = {
    "uni-search-bar.cancel": "cancel",
    "uni-search-bar.placeholder": "Search enter content"
  };
  var zhHans = {
    "uni-search-bar.cancel": "cancel",
    "uni-search-bar.placeholder": "\u8BF7\u8F93\u5165\u641C\u7D22\u5185\u5BB9"
  };
  var zhHant = {
    "uni-search-bar.cancel": "cancel",
    "uni-search-bar.placeholder": "\u8ACB\u8F38\u5165\u641C\u7D22\u5167\u5BB9"
  };
  var messages = {
    en,
    "zh-Hans": zhHans,
    "zh-Hant": zhHant
  };
  const { t } = initVueI18n(messages);
  const _sfc_main$u = {
    name: "UniSearchBar",
    emits: ["input", "update:modelValue", "clear", "cancel", "confirm", "blur", "focus"],
    props: {
      placeholder: {
        type: String,
        default: ""
      },
      radius: {
        type: [Number, String],
        default: 5
      },
      clearButton: {
        type: String,
        default: "auto"
      },
      cancelButton: {
        type: String,
        default: "auto"
      },
      cancelText: {
        type: String,
        default: "\u53D6\u6D88"
      },
      bgColor: {
        type: String,
        default: "#F8F8F8"
      },
      maxlength: {
        type: [Number, String],
        default: 100
      },
      value: {
        type: [Number, String],
        default: ""
      },
      modelValue: {
        type: [Number, String],
        default: ""
      },
      focus: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        show: false,
        showSync: false,
        searchVal: ""
      };
    },
    computed: {
      cancelTextI18n() {
        return this.cancelText || t("uni-search-bar.cancel");
      },
      placeholderText() {
        return this.placeholder || t("uni-search-bar.placeholder");
      }
    },
    watch: {
      modelValue: {
        immediate: true,
        handler(newVal) {
          this.searchVal = newVal;
          if (newVal) {
            this.show = true;
          }
        }
      },
      focus: {
        immediate: true,
        handler(newVal) {
          if (newVal) {
            this.show = true;
            this.$nextTick(() => {
              this.showSync = true;
            });
          }
        }
      },
      searchVal(newVal, oldVal) {
        this.$emit("update:modelValue", newVal);
      }
    },
    methods: {
      searchClick() {
        if (this.show) {
          return;
        }
        this.show = true;
        this.$nextTick(() => {
          this.showSync = true;
        });
      },
      clear() {
        this.$emit("clear", {
          value: this.searchVal
        });
        this.searchVal = "";
      },
      cancel() {
        this.$emit("cancel", {
          value: this.searchVal
        });
        this.searchVal = "";
        this.show = false;
        this.showSync = false;
        plus.key.hideSoftKeybord();
      },
      confirm() {
        plus.key.hideSoftKeybord();
        this.$emit("confirm", {
          value: this.searchVal
        });
      },
      blur() {
        plus.key.hideSoftKeybord();
        this.$emit("blur", {
          value: this.searchVal
        });
      },
      emitFocus(e) {
        this.$emit("focus", e.detail);
      }
    }
  };
  function _sfc_render$t(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$3);
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-searchbar" }, [
      vue.createElementVNode("view", {
        style: vue.normalizeStyle({ borderRadius: $props.radius + "px", backgroundColor: $props.bgColor }),
        class: "uni-searchbar__box",
        onClick: _cache[5] || (_cache[5] = (...args) => $options.searchClick && $options.searchClick(...args))
      }, [
        vue.createElementVNode("view", { class: "uni-searchbar__box-icon-search" }, [
          vue.renderSlot(_ctx.$slots, "searchIcon", {}, () => [
            vue.createVNode(_component_uni_icons, {
              color: "#c0c4cc",
              size: "18",
              type: "search"
            })
          ], true)
        ]),
        $data.show || $data.searchVal ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", {
          key: 0,
          focus: $data.showSync,
          placeholder: $options.placeholderText,
          maxlength: $props.maxlength,
          class: "uni-searchbar__box-search-input",
          "confirm-type": "search",
          type: "text",
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.searchVal = $event),
          onConfirm: _cache[1] || (_cache[1] = (...args) => $options.confirm && $options.confirm(...args)),
          onBlur: _cache[2] || (_cache[2] = (...args) => $options.blur && $options.blur(...args)),
          onFocus: _cache[3] || (_cache[3] = (...args) => $options.emitFocus && $options.emitFocus(...args))
        }, null, 40, ["focus", "placeholder", "maxlength"])), [
          [vue.vModelText, $data.searchVal]
        ]) : (vue.openBlock(), vue.createElementBlock("text", {
          key: 1,
          class: "uni-searchbar__text-placeholder"
        }, vue.toDisplayString($props.placeholder), 1)),
        $data.show && ($props.clearButton === "always" || $props.clearButton === "auto" && $data.searchVal !== "") ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 2,
          class: "uni-searchbar__box-icon-clear",
          onClick: _cache[4] || (_cache[4] = (...args) => $options.clear && $options.clear(...args))
        }, [
          vue.renderSlot(_ctx.$slots, "clearIcon", {}, () => [
            vue.createVNode(_component_uni_icons, {
              color: "#c0c4cc",
              size: "20",
              type: "clear"
            })
          ], true)
        ])) : vue.createCommentVNode("v-if", true)
      ], 4),
      $props.cancelButton === "always" || $data.show && $props.cancelButton === "auto" ? (vue.openBlock(), vue.createElementBlock("text", {
        key: 0,
        onClick: _cache[6] || (_cache[6] = (...args) => $options.cancel && $options.cancel(...args)),
        class: "uni-searchbar__cancel"
      }, vue.toDisplayString($options.cancelTextI18n), 1)) : vue.createCommentVNode("v-if", true)
    ]);
  }
  var uniSearchBar = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$t], ["__scopeId", "data-v-180dbe05"]]);
  const _sfc_main$t = {
    emits: ["changeContent"],
    props: {
      historyWord: {
        type: String,
        default: ""
      }
    },
    setup(props, { emit }) {
      vue.getCurrentInstance();
      let hotWords = vue.ref(["Python", "Java", "Web\u524D\u7AEF", "\u5C0F\u7A0B\u5E8F", "uniapp", "js\u9AD8\u7EA7", "\u7B97\u6CD5"]);
      let historyWords = vue.ref([]);
      vue.onMounted(() => {
        historyWords.value = [...uni.getStorageSync("historyWords")];
      });
      vue.watch(() => props.historyWord, (newValue) => {
        if (historyWords.value.indexOf(newValue) != -1) {
          for (let i = 0; i < historyWords.value.length; i++) {
            if (historyWords.value[i] == newValue) {
              historyWords.value.splice(i, 1);
            }
          }
        }
        historyWords.value.unshift(newValue);
        uni.setStorageSync("historyWords", historyWords.value);
      });
      const clickWord = (word) => {
        emit("changeContent", word);
      };
      const clearHistory = () => {
        historyWords.value = [];
        uni.removeStorageSync("historyWords");
      };
      return {
        hotWords,
        historyWords,
        clickWord,
        clearHistory
      };
    }
  };
  function _sfc_render$s(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "keyword" }, [
      vue.createElementVNode("view", { class: "title" }, "\u70ED\u95E8\u641C\u7D22"),
      vue.createElementVNode("view", { class: "tag-list" }, [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($setup.hotWords, (item) => {
          return vue.openBlock(), vue.createElementBlock("view", {
            key: item,
            onClick: ($event) => $setup.clickWord(item)
          }, vue.toDisplayString(item), 9, ["onClick"]);
        }), 128))
      ]),
      $setup.historyWords.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "title space-between"
      }, [
        vue.createElementVNode("text", null, "\u5386\u53F2\u641C\u7D22"),
        vue.createElementVNode("text", {
          onClick: _cache[0] || (_cache[0] = (...args) => $setup.clearHistory && $setup.clearHistory(...args))
        }, "\u6E05\u7A7A")
      ])) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("view", { class: "tag-list" }, [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($setup.historyWords, (item) => {
          return vue.openBlock(), vue.createElementBlock("view", {
            key: item,
            onClick: ($event) => $setup.clickWord(item)
          }, vue.toDisplayString(item), 9, ["onClick"]);
        }), 128))
      ])
    ]);
  }
  var keywords = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$s], ["__scopeId", "data-v-064d05f9"]]);
  const _sfc_main$s = {
    components: { category: PagesTabCategoryCategory },
    props: {
      params: {
        type: Object,
        default: () => ({})
      },
      downCategoty: {
        type: Array,
        default: () => []
      }
    },
    setup(props, { emit }) {
      let tabName = vue.ref();
      let infos = vue.ref([]);
      let param = vue.ref();
      vue.onMounted(() => {
        infos.value = JSON.parse(JSON.stringify(props.downCategoty));
        tabName.value = infos.value[0].name;
      });
      let changeTab = (item) => {
        tabName.value = item.name;
        let act = item.active;
        infos.value.forEach((i) => {
          i.active = false;
        });
        item.active = !act;
      };
      let changeCild = (item, itemChild) => {
        item.active = false;
        if (tabName.value == itemChild.name)
          return;
        tabName.value = itemChild.name;
        item.name = itemChild.name;
        emit("changeCategory", { [item.type]: itemChild.id });
      };
      let closeCategory = () => {
        infos.value.forEach((i) => {
          i.active = false;
        });
      };
      let searchCate = (item) => {
        infos.value.forEach((i) => {
          i.active = false;
        });
        if (item.id == 0) {
          infos.value[infos.value.length - 1].name = item.cName;
          tabName.value = item.cName;
          emit("changeCategory", { labelId: null, categoryId: item.categoryId });
        } else {
          infos.value[infos.value.length - 1].name = item.name;
          tabName.value = item.name;
          emit("changeCategory", { labelId: item.id, categoryId: item.categoryId });
        }
        param.value = { labelId: item.id, name: item.name, categoryId: item.categoryId };
      };
      return {
        infos,
        tabName,
        param,
        changeTab,
        changeCild,
        closeCategory,
        searchCate
      };
    },
    watch: {
      params: {
        handler: function(newValue) {
          if (Object.keys(newValue).length > 0) {
            vue.nextTick(() => {
              let keys = Object.keys(newValue);
              let lis = this.infos;
              if (keys.length == 1) {
                lis.forEach((item) => {
                  if (item.type == keys[0]) {
                    item.name = item.list.find((i) => {
                      return i.id == newValue[keys[0]];
                    }).name;
                    this.tabName = item.name;
                  }
                });
              } else {
                lis[lis.length - 1].name = newValue.name;
                this.tabName = newValue.name;
                this.param = newValue;
              }
            });
          }
        },
        immediate: true,
        deep: true
      }
    }
  };
  function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_category = vue.resolveComponent("category");
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "down-bar row sticky-box",
      onTouchmove: _cache[1] || (_cache[1] = vue.withModifiers(() => {
      }, ["stop", "prevent"]))
    }, [
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($setup.infos, (item) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          class: "one",
          key: item.type
        }, [
          vue.createElementVNode("view", {
            class: vue.normalizeClass(["center", { "active": item.name == $setup.tabName }]),
            onClick: ($event) => $setup.changeTab(item)
          }, [
            vue.createElementVNode("text", null, vue.toDisplayString(item.name), 1),
            item.active ? (vue.openBlock(), vue.createElementBlock("text", {
              key: 0,
              class: "iconfont icon-down1"
            })) : vue.createCommentVNode("v-if", true),
            !item.active ? (vue.openBlock(), vue.createElementBlock("text", {
              key: 1,
              class: "iconfont icon-up"
            })) : vue.createCommentVNode("v-if", true)
          ], 10, ["onClick"]),
          item.active ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "item-list"
          }, [
            item.isAllCategory ? (vue.openBlock(), vue.createBlock(_component_category, {
              key: 0,
              class: "category",
              value: __spreadValues({}, $setup.param),
              onSearchCate: $setup.searchCate
            }, null, 8, ["value", "onSearchCate"])) : (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 1 }, vue.renderList(item.list, (i) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: vue.normalizeClass(["name", { "active": i.name == $setup.tabName }]),
                key: i.id,
                onClick: ($event) => $setup.changeCild(item, i)
              }, vue.toDisplayString(i.name), 11, ["onClick"]);
            }), 128))
          ])) : vue.createCommentVNode("v-if", true),
          vue.createCommentVNode(" \u8499\u5C42 "),
          item.active ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "cover",
            onClick: _cache[0] || (_cache[0] = (...args) => $setup.closeCategory && $setup.closeCategory(...args))
          })) : vue.createCommentVNode("v-if", true)
        ]);
      }), 128))
    ], 32);
  }
  var downBar = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$r], ["__scopeId", "data-v-66c7cbb7"]]);
  const _sfc_main$r = {
    mixins: [MescrollMixin, MescrollMoreItemMixin],
    components: {
      "down-bar": downBar,
      "mescroll-body": __easycom_1$4
    },
    props: {
      i: Number,
      index: {
        type: Number,
        default() {
          return 1;
        }
      },
      params: {
        type: Object,
        default: () => ({})
      },
      content: {
        type: String,
        default: ""
      }
    },
    setup(props) {
      const { proxy } = vue.getCurrentInstance();
      let downCategoty = vue.ref([
        {
          type: "sort",
          isAllCategory: false,
          name: "\u7EFC\u5408\u6392\u5E8F",
          active: false,
          list: [
            { id: null, name: "\u7EFC\u5408\u6392\u5E8F" },
            { id: "hot", name: "\u70ED\u95E8\u6392\u5E8F" },
            { id: "new", name: "\u6700\u65B0\u6392\u5E8F" }
          ]
        },
        {
          type: "isFree",
          isAllCategory: false,
          name: "\u5168\u90E8\u8BFE\u7A0B",
          active: false,
          list: [
            { id: null, name: "\u5168\u90E8\u8BFE\u7A0B" },
            { id: 0, name: "\u4ED8\u8D39\u8BFE\u7A0B" },
            { id: 1, name: "\u514D\u8D39\u8BFE\u7A0B" }
          ]
        },
        {
          type: "label",
          isAllCategory: true,
          name: "\u5168\u90E8\u6392\u5E8F",
          active: false,
          list: []
        }
      ]);
      let courseList2 = vue.ref([]);
      let searchDate = vue.reactive({
        content: null,
        sort: null,
        isFree: null,
        labelId: null,
        categoryId: null
      });
      vue.onMounted(() => {
        if (props.content)
          searchDate.content = props.content;
        let paramsKeys = Object.keys(props.params);
        let searchDateKeys = Object.keys(searchDate);
        if (paramsKeys.length > 0) {
          paramsKeys.forEach((item) => {
            if (searchDateKeys.indexOf(item) != -1) {
              searchDate[item] = props.params[item];
            }
          });
        }
      });
      let changeCategory = (data2) => {
        let content = props.content;
        searchDate = __spreadProps(__spreadValues(__spreadValues({}, searchDate), data2), { content });
        proxy.mescroll.resetUpScroll();
      };
      let upOption = vue.ref({
        auto: false,
        noMoreSize: 4
      });
      let upCallback = async (page) => {
        page.num;
        page.size;
        formatAppLog("log", "at pages/search/cpns/course-list.vue:129", "\u6574\u5408\u641C\u7D22\u8BFE\u7A0B\u5185\u5BB9-----", searchDate);
        formatAppLog("log", "at pages/search/cpns/course-list.vue:130", `\u641C\u7D22\u8BFE\u7A0B\u5F53\u524D\u7B2C${page.num}\u9875`, page.size);
        let res = await getCourseList(searchDate, page.num, page.size);
        if (page.num == 1) {
          courseList2.value = [];
          proxy.mescroll.scrollTo(0, 100);
        }
        courseList2.value = [...courseList2.value, ...res.records];
        proxy.mescroll.endBySize(courseList2.value.length, res.total);
        proxy.mescroll.endErr();
      };
      return {
        downCategoty,
        courseList: courseList2,
        upOption,
        changeCategory,
        upCallback
      };
    }
  };
  function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_down_bar = vue.resolveComponent("down-bar");
    const _component_course_item = resolveEasycom(vue.resolveDynamicComponent("course-item"), __easycom_0$8);
    const _component_mescroll_body = resolveEasycom(vue.resolveDynamicComponent("mescroll-body"), __easycom_1$4);
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
      vue.createCommentVNode(" \u4E0D\u80FD\u7528v-if (i: \u6BCF\u4E2Atab\u9875\u7684\u4E13\u5C5E\u4E0B\u6807;  index: \u5F53\u524Dtab\u7684\u4E0B\u6807; \u7533\u660E\u5728 MescrollMoreItemMixin )"),
      vue.withDirectives(vue.createElementVNode("view", null, [
        vue.createVNode(_component_down_bar, {
          params: $props.params,
          downCategoty: $setup.downCategoty,
          onChangeCategory: $setup.changeCategory
        }, null, 8, ["params", "downCategoty", "onChangeCategory"]),
        vue.createCommentVNode(" \u5C55\u793A\u5217\u8868\u6570\u636E "),
        vue.createCommentVNode(' ref\u52A8\u6001\u751F\u6210: \u5B57\u8282\u8DF3\u52A8\u5C0F\u7A0B\u5E8F\u7F16\u8F91\u5668\u4E0D\u652F\u6301\u4E00\u4E2A\u9875\u9762\u5B58\u5728\u76F8\u540C\u7684ref (\u5982\u4E0D\u8003\u8651\u5B57\u8282\u8DF3\u52A8\u5C0F\u7A0B\u5E8F\u53EF\u56FA\u5B9A\u503C\u4E3A ref="mescrollRef") '),
        vue.createVNode(_component_mescroll_body, {
          ref: "mescrollRef" + $props.i,
          down: _ctx.downOption,
          onDown: _ctx.downCallback,
          up: $setup.upOption,
          onUp: $setup.upCallback
        }, {
          default: vue.withCtx(() => [
            vue.createCommentVNode(" \u6570\u636E\u5217\u8868 "),
            vue.createElementVNode("view", { style: { "padding": "0 20rpx" } }, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($setup.courseList, (item, index) => {
                return vue.openBlock(), vue.createBlock(_component_course_item, {
                  item,
                  key: item.id
                }, null, 8, ["item"]);
              }), 128))
            ])
          ]),
          _: 1
        }, 8, ["down", "onDown", "up", "onUp"])
      ], 512), [
        [vue.vShow, $props.i === $props.index]
      ])
    ], 2112);
  }
  var courseList = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$q]]);
  const _sfc_main$q = {
    mixins: [MescrollMixin, MescrollMoreItemMixin],
    components: {
      "down-bar": downBar,
      "mescroll-body": __easycom_1$4
    },
    props: {
      i: Number,
      index: {
        type: Number,
        default() {
          return 1;
        }
      },
      params: {
        type: Object,
        default: () => ({})
      },
      content: {
        type: String,
        default: ""
      }
    },
    setup(props) {
      const { proxy } = vue.getCurrentInstance();
      let downCategoty = vue.ref([
        {
          type: "sort",
          isAllCategory: false,
          name: "\u7EFC\u5408\u6392\u5E8F",
          active: false,
          list: [
            { id: null, name: "\u7EFC\u5408\u6392\u5E8F" },
            { id: "new", name: "\u70ED\u95E8\u6392\u5E8F" },
            { id: "hot", name: "\u6700\u65B0\u6392\u5E8F" }
          ]
        },
        {
          type: "label",
          isAllCategory: true,
          name: "\u5168\u90E8\u6392\u5E8F",
          active: false,
          list: []
        }
      ]);
      let articleList2 = vue.ref([]);
      let searchDate = vue.reactive({
        content: null,
        sort: null,
        isFree: null,
        labelId: null,
        categoryId: null
      });
      vue.onMounted(() => {
        if (props.content)
          searchDate.content = props.content;
        if (Object.keys(props.params).length > 0) {
          searchDate.labelId = props.params.labelId;
          searchDate.categoryId = props.params.parentId;
        }
      });
      let changeCategory = (data2) => {
        let content = props.content;
        searchDate = __spreadProps(__spreadValues(__spreadValues({}, searchDate), data2), { content });
        formatAppLog("log", "at pages/search/cpns/article-list.vue:94", "\u6574\u5408\u641C\u7D22\u6587\u7AE0\u5185\u5BB9-----", searchDate);
        proxy.mescroll.resetUpScroll();
      };
      let upOption = vue.ref({
        auto: false,
        noMoreSize: 4
      });
      let upCallback = async (page) => {
        page.num;
        page.size;
        formatAppLog("log", "at pages/search/cpns/article-list.vue:110", `\u641C\u7D22\u6587\u7AE0\u5F53\u524D\u7B2C${page.num}\u9875`, page.size);
        let res = await getArticleList(searchDate, page.num, page.size);
        if (page.num == 1) {
          articleList2.value = [];
          proxy.mescroll.scrollTo(0, 100);
        }
        articleList2.value = [...articleList2.value, ...res.records];
        proxy.mescroll.endBySize(articleList2.value.length, res.total);
        proxy.mescroll.endErr();
      };
      return {
        downCategoty,
        articleList: articleList2,
        upOption,
        changeCategory,
        upCallback
      };
    }
  };
  function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_down_bar = vue.resolveComponent("down-bar");
    const _component_article_item = resolveEasycom(vue.resolveDynamicComponent("article-item"), __easycom_0$6);
    const _component_mescroll_body = resolveEasycom(vue.resolveDynamicComponent("mescroll-body"), __easycom_1$4);
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
      vue.createCommentVNode(" \u4E0D\u80FD\u7528v-if (i: \u6BCF\u4E2Atab\u9875\u7684\u4E13\u5C5E\u4E0B\u6807;  index: \u5F53\u524Dtab\u7684\u4E0B\u6807; \u7533\u660E\u5728 MescrollMoreItemMixin )"),
      vue.withDirectives(vue.createElementVNode("view", null, [
        vue.createVNode(_component_down_bar, {
          params: $props.params,
          downCategoty: $setup.downCategoty,
          onChangeCategory: $setup.changeCategory
        }, null, 8, ["params", "downCategoty", "onChangeCategory"]),
        vue.createCommentVNode(" \u5C55\u793A\u5217\u8868\u6570\u636E "),
        vue.createCommentVNode(' ref\u52A8\u6001\u751F\u6210: \u5B57\u8282\u8DF3\u52A8\u5C0F\u7A0B\u5E8F\u7F16\u8F91\u5668\u4E0D\u652F\u6301\u4E00\u4E2A\u9875\u9762\u5B58\u5728\u76F8\u540C\u7684ref (\u5982\u4E0D\u8003\u8651\u5B57\u8282\u8DF3\u52A8\u5C0F\u7A0B\u5E8F\u53EF\u56FA\u5B9A\u503C\u4E3A ref="mescrollRef") '),
        vue.createVNode(_component_mescroll_body, {
          ref: "mescrollRef" + $props.i,
          down: _ctx.downOption,
          onDown: _ctx.downCallback,
          up: $setup.upOption,
          onUp: $setup.upCallback
        }, {
          default: vue.withCtx(() => [
            vue.createCommentVNode(" \u6570\u636E\u5217\u8868 "),
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($setup.articleList, (item) => {
              return vue.openBlock(), vue.createBlock(_component_article_item, {
                key: item.id,
                item
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(vue.toDisplayString($props.i), 1)
                ]),
                _: 2
              }, 1032, ["item"]);
            }), 128))
          ]),
          _: 1
        }, 8, ["down", "onDown", "up", "onUp"])
      ], 512), [
        [vue.vShow, $props.i === $props.index]
      ])
    ], 2112);
  }
  var articleList = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$p]]);
  const _sfc_main$p = {
    mixins: [MescrollMixin, MescrollMoreItemMixin],
    components: {
      "down-bar": downBar,
      "mescroll-body": __easycom_1$4
    },
    props: {
      i: Number,
      index: {
        type: Number,
        default() {
          return 1;
        }
      },
      params: {
        type: Object,
        default: () => ({})
      },
      content: {
        type: String,
        default: ""
      }
    },
    setup(props) {
      const { proxy } = vue.getCurrentInstance();
      let downCategoty = vue.ref([
        {
          type: "sort",
          isAllCategory: false,
          name: "\u7EFC\u5408\u6392\u5E8F",
          active: false,
          list: [
            { id: null, name: "\u7EFC\u5408\u6392\u5E8F" },
            { id: "new", name: "\u70ED\u95E8\u6392\u5E8F" },
            { id: "hot", name: "\u6700\u65B0\u6392\u5E8F" }
          ]
        },
        {
          type: "label",
          isAllCategory: true,
          name: "\u5168\u90E8\u6392\u5E8F",
          active: false,
          list: []
        }
      ]);
      let questionList2 = vue.ref([]);
      let searchDate = vue.reactive({
        content: null,
        sort: null,
        isFree: null,
        labelId: null,
        categoryId: null
      });
      vue.onMounted(() => {
        if (props.content)
          searchDate.content = props.content;
        if (Object.keys(props.params).length > 0) {
          searchDate.labelId = props.params.labelId;
          searchDate.categoryId = props.params.parentId;
        }
      });
      let changeCategory = (data2) => {
        let content = props.content;
        searchDate = __spreadProps(__spreadValues(__spreadValues({}, searchDate), data2), { content });
        formatAppLog("log", "at pages/search/cpns/question-list.vue:94", "\u6574\u5408\u641C\u7D22\u95EE\u7B54\u5185\u5BB9-----", searchDate);
        proxy.mescroll.resetUpScroll();
      };
      let upOption = vue.ref({
        auto: false,
        noMoreSize: 4
      });
      let upCallback = async (page) => {
        page.num;
        page.size;
        formatAppLog("log", "at pages/search/cpns/question-list.vue:110", `\u641C\u7D22\u95EE\u7B54\u5F53\u524D\u7B2C${page.num}\u9875`, page.size);
        let res = await getQuestionList(searchDate, page.num, page.size);
        if (page.num == 1) {
          questionList2.value = [];
          proxy.mescroll.scrollTo(0, 100);
        }
        questionList2.value = [...questionList2.value, ...res.records];
        proxy.mescroll.endBySize(questionList2.value.length, res.total);
        proxy.mescroll.endErr();
      };
      return {
        downCategoty,
        questionList: questionList2,
        upOption,
        changeCategory,
        upCallback
      };
    }
  };
  function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_down_bar = vue.resolveComponent("down-bar");
    const _component_question_item = resolveEasycom(vue.resolveDynamicComponent("question-item"), __easycom_0$5);
    const _component_mescroll_body = resolveEasycom(vue.resolveDynamicComponent("mescroll-body"), __easycom_1$4);
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
      vue.createCommentVNode(" \u4E0D\u80FD\u7528v-if (i: \u6BCF\u4E2Atab\u9875\u7684\u4E13\u5C5E\u4E0B\u6807;  index: \u5F53\u524Dtab\u7684\u4E0B\u6807; \u7533\u660E\u5728 MescrollMoreItemMixin )"),
      vue.withDirectives(vue.createElementVNode("view", null, [
        vue.createVNode(_component_down_bar, {
          params: $props.params,
          downCategoty: $setup.downCategoty,
          onChangeCategory: $setup.changeCategory
        }, null, 8, ["params", "downCategoty", "onChangeCategory"]),
        vue.createCommentVNode(" \u5C55\u793A\u5217\u8868\u6570\u636E "),
        vue.createCommentVNode(' ref\u52A8\u6001\u751F\u6210: \u5B57\u8282\u8DF3\u52A8\u5C0F\u7A0B\u5E8F\u7F16\u8F91\u5668\u4E0D\u652F\u6301\u4E00\u4E2A\u9875\u9762\u5B58\u5728\u76F8\u540C\u7684ref (\u5982\u4E0D\u8003\u8651\u5B57\u8282\u8DF3\u52A8\u5C0F\u7A0B\u5E8F\u53EF\u56FA\u5B9A\u503C\u4E3A ref="mescrollRef") '),
        vue.createVNode(_component_mescroll_body, {
          ref: "mescrollRef" + $props.i,
          down: _ctx.downOption,
          onDown: _ctx.downCallback,
          up: $setup.upOption,
          onUp: $setup.upCallback
        }, {
          default: vue.withCtx(() => [
            vue.createCommentVNode(" \u6570\u636E\u5217\u8868 "),
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($setup.questionList, (item) => {
              return vue.openBlock(), vue.createBlock(_component_question_item, {
                key: item.id,
                item
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(vue.toDisplayString($props.i), 1)
                ]),
                _: 2
              }, 1032, ["item"]);
            }), 128))
          ]),
          _: 1
        }, 8, ["down", "onDown", "up", "onUp"])
      ], 512), [
        [vue.vShow, $props.i === $props.index]
      ])
    ], 2112);
  }
  var questionList = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$o]]);
  const MescrollMoreMixin = {
    data() {
      return {
        tabIndex: 0,
        mescroll: {
          onPageScroll: (e) => {
            this.handlePageScroll(e);
          },
          onReachBottom: () => {
            this.handleReachBottom();
          },
          onPullDownRefresh: () => {
            this.handlePullDownRefresh();
          }
        }
      };
    },
    onPageScroll(e) {
      this.handlePageScroll(e);
    },
    onReachBottom() {
      this.handleReachBottom();
    },
    onPullDownRefresh() {
      this.handlePullDownRefresh();
    },
    methods: {
      handlePageScroll(e) {
        let mescroll = this.getMescroll(this.tabIndex);
        mescroll && mescroll.onPageScroll(e);
      },
      handleReachBottom() {
        let mescroll = this.getMescroll(this.tabIndex);
        mescroll && mescroll.onReachBottom();
      },
      handlePullDownRefresh() {
        let mescroll = this.getMescroll(this.tabIndex);
        mescroll && mescroll.onPullDownRefresh();
      },
      getMescroll(i) {
        if (!this.mescrollItems)
          this.mescrollItems = [];
        if (!this.mescrollItems[i]) {
          let vForItem = this.$refs["mescrollItem"];
          if (vForItem) {
            this.mescrollItems[i] = vForItem[i];
          } else {
            this.mescrollItems[i] = this.$refs["mescrollItem" + i];
          }
        }
        let item = this.mescrollItems[i];
        return item ? item.mescroll : null;
      },
      tabChange(i) {
        let mescroll = this.getMescroll(i);
        if (mescroll) {
          setTimeout(() => {
            mescroll.scrollTo(mescroll.getScrollTop(), 0);
          }, 30);
        }
      }
    }
  };
  let webView = null;
  const _sfc_main$o = {
    mixins: [MescrollMoreMixin],
    components: {
      "uni-search-bar": uniSearchBar,
      "keywords": keywords,
      "course-list": courseList,
      "article-list": articleList,
      "question-list": questionList
    },
    setup() {
      const { proxy } = vue.getCurrentInstance();
      let params = vue.ref({});
      let content = vue.ref(null);
      let focuse = vue.ref(false);
      let historyWord = vue.ref(null);
      let showWords = vue.ref(true);
      let tabId = vue.ref(1);
      let tabs = vue.ref([
        { id: 1, name: "\u8BFE\u7A0B" },
        { id: 2, name: "\u6587\u7AE0" },
        { id: 3, name: "\u95EE\u7B54" }
      ]);
      let mescrollItem1 = vue.ref();
      let mescrollItem2 = vue.ref();
      let mescrollItem3 = vue.ref();
      const doSearch = () => {
        proxy.$utils.throttle(() => {
          if ((content.value == "" || content.value == null) && Object.keys(params.value).length == 0) {
            proxy.$message.toast("\u8BF7\u8F93\u5165\u641C\u7D22\u5185\u5BB9");
          } else {
            formatAppLog("log", "at pages/search/search.vue:73", "\u641C\u7D22\u5185\u5BB9:" + content.value);
            historyWord.value = content.value;
            showWords.value = false;
            vue.nextTick(() => {
              proxy.$refs[`mescrollItem${tabId.value}`].changeCategory();
            });
          }
        });
      };
      onNavigationBarButtonTap((e) => {
        doSearch();
      });
      onNavigationBarSearchInputChanged((e) => {
        content.value = e.text;
      });
      const inputChange = (e) => {
        formatAppLog("log", "at pages/search/search.vue:96", "\u76D1\u542C\u8F93\u5165\u6846\u6539\u53D8", e);
      };
      onNavigationBarSearchInputConfirmed((e) => {
        webView.setTitleNViewSearchInputFocus(false);
        doSearch();
      });
      const changeContent = (value) => {
        webView.setTitleNViewSearchInputText(value);
        content.value = value;
        doSearch();
      };
      let changeTab = (id) => {
        formatAppLog("log", "at pages/search/search.vue:125", "\u70B9\u51FB\u4E86\u6807\u7B7E\uFF1A" + id);
        tabId.value = id;
      };
      return {
        params,
        content,
        focuse,
        historyWord,
        showWords,
        tabs,
        tabId,
        mescrollItem1,
        mescrollItem2,
        mescrollItem3,
        doSearch,
        inputChange,
        changeContent,
        changeTab
      };
    },
    onLoad(option) {
      webView = this.$scope.$getAppWebview();
      if (option.data) {
        let data2 = JSON.parse(option.data);
        this.focuse = false;
        this.params = data2;
        this.doSearch();
      } else {
        this.focuse = true;
        webView.setTitleNViewSearchInputFocus(true);
      }
    }
  };
  function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_keywords = vue.resolveComponent("keywords");
    const _component_tab_bar = resolveEasycom(vue.resolveDynamicComponent("tab-bar"), __easycom_0$7);
    const _component_course_list = vue.resolveComponent("course-list");
    const _component_article_list = vue.resolveComponent("article-list");
    const _component_question_list = vue.resolveComponent("question-list");
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createCommentVNode(" \u5173\u952E\u5B57 "),
      vue.withDirectives(vue.createVNode(_component_keywords, {
        onChangeContent: $setup.changeContent,
        historyWord: $setup.historyWord
      }, null, 8, ["onChangeContent", "historyWord"]), [
        [vue.vShow, $setup.showWords]
      ]),
      vue.createCommentVNode(" \u641C\u7D22\u7ED3\u679C "),
      !$setup.showWords ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
        vue.createCommentVNode(" \u5206\u7C7B\u6807\u7B7E "),
        vue.createVNode(_component_tab_bar, {
          tabs: $setup.tabs,
          onChangeTab: $setup.changeTab
        }, null, 8, ["tabs", "onChangeTab"]),
        vue.createCommentVNode(" \u4E0B\u62C9\u8FC7\u6EE4 "),
        vue.createVNode(_component_course_list, {
          ref: "mescrollItem1",
          i: 1,
          index: $setup.tabId,
          params: $setup.params,
          content: $setup.content
        }, null, 8, ["index", "params", "content"]),
        vue.createVNode(_component_article_list, {
          ref: "mescrollItem2",
          i: 2,
          index: $setup.tabId,
          params: $setup.params,
          content: $setup.content
        }, null, 8, ["index", "params", "content"]),
        vue.createVNode(_component_question_list, {
          ref: "mescrollItem3",
          i: 3,
          index: $setup.tabId,
          params: $setup.params,
          content: $setup.content
        }, null, 8, ["index", "params", "content"]),
        vue.createCommentVNode(' <down-bar :params="params" :downCategoty="downCategoty" @changeCategory="changeCategory"></down-bar> ')
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  var PagesSearchSearch = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$n]]);
  const _sfc_main$n = {
    props: {
      shareDate: {
        type: Object,
        default: () => ({})
      }
    },
    setup(props) {
      let { proxy } = vue.getCurrentInstance();
      let isShow = vue.ref(false);
      let state = vue.reactive({
        title: "share",
        shareText: "\u5206\u4EAB\u7ED9\u4F60\u5C31\u7ED9\u8001\u5B50\u70B9\u5F00\u770B\uFF01",
        href: "https://www.baidu.com/",
        image: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2020-06-04%2F5ed8a4d5881c6.jpg&refer=http%3A%2F%2Fpic1.win4000.com",
        shareType: 0,
        providerList: []
      });
      vue.watch(() => props.shareDate, (newValue) => {
        if (Object.keys(newValue).length > 0) {
          if (newValue.title)
            state.title = newValue.title;
          if (newValue.mainImage)
            state.image = newValue.mainImage;
          state.href = proxy.$env.HOST_H5 + proxy.$utils.routePath();
        }
      });
      vue.onMounted(() => {
        uni.getProvider({
          service: "share",
          success: (e) => {
            let data2 = [];
            for (let i = 0; i < e.provider.length; i++) {
              switch (e.provider[i]) {
                case "weixin":
                  data2.push({ name: "\u5FAE\u4FE1\u597D\u53CB", id: "weixin", sort: 0, icon: "/static/share/weixin.png" });
                  data2.push({ name: "\u670B\u53CB\u5708", id: "weixin", type: "WXSceneTimeline", sort: 1, icon: "/static/share/pengyouquan.png" });
                  break;
                case "sinaweibo":
                  data2.push({ name: "\u65B0\u6D6A\u5FAE\u535A", id: "sinaweibo", sort: 2, icon: "/static/share/weibo.png" });
                  break;
                case "qq":
                  data2.push({ name: "QQ\u597D\u53CB", id: "qq", sort: 3, icon: "/static/share/qq.png" });
                  break;
              }
            }
            data2.push({ name: "\u590D\u5236\u94FE\u63A5", id: "copy", sort: 4, icon: "/static/share/link.png" });
            state.providerList = data2.sort((x, y) => {
              return x.sort - y.sort;
            });
          },
          fail: (e) => {
            uni.showModal({
              content: "\u83B7\u53D6\u5206\u4EAB\u901A\u9053\u5931\u8D25",
              showCancel: false
            });
          }
        });
      });
      const showHandler = () => {
        isShow.value = false;
      };
      const share = (e) => {
        formatAppLog("log", "at components/my-share/my-share.vue:103", "\u5206\u4EAB\u901A\u9053:" + e.id + "\uFF1B \u5206\u4EAB\u7C7B\u578B:" + state.shareType);
        if (e.id === "copy") {
          uni.setClipboardData({
            data: state.href,
            success: () => {
              uni.hideToast();
              proxy.$message.toast("\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F");
            }
          });
          isShow.value = false;
          return;
        }
        uni.showLoading();
        if (!state.shareText && (state.shareType === 1 || state.shareType === 0)) {
          uni.showModal({
            content: "\u5206\u4EAB\u5185\u5BB9\u4E0D\u80FD\u4E3A\u7A7A",
            showCancel: false
          });
          uni.hideLoading();
          return;
        }
        if (!state.image && (state.shareType === 2 || state.shareType === 0)) {
          uni.showModal({
            content: "\u5206\u4EAB\u56FE\u7247\u4E0D\u80FD\u4E3A\u7A7A",
            showCancel: false
          });
          uni.hideLoading();
          return;
        }
        let shareOPtions = {
          provider: e.id,
          scene: e.type && e.type === "WXSceneTimeline" ? "WXSceneTimeline" : "WXSceneSession",
          type: state.shareType,
          success: (e2) => {
            formatAppLog("log", "at components/my-share/my-share.vue:142", "success", e2);
            uni.showModal({
              content: "\u5DF2\u5206\u4EAB",
              showCancel: false
            });
          },
          fail: (e2) => {
            formatAppLog("log", "at components/my-share/my-share.vue:149", "fail", e2);
            uni.showModal({
              content: e2.errMsg,
              showCancel: false
            });
          },
          complete: () => {
            formatAppLog("log", "at components/my-share/my-share.vue:156", "\u5206\u4EAB\u64CD\u4F5C\u7ED3\u675F!");
          }
        };
        switch (state.shareType) {
          case 0:
            shareOPtions.summary = state.shareText;
            shareOPtions.imageUrl = state.image;
            shareOPtions.title = state.title;
            shareOPtions.href = state.href;
            break;
          case 1:
            shareOPtions.summary = state.shareText;
            break;
          case 2:
            shareOPtions.imageUrl = state.image;
            break;
          case 5:
            shareOPtions.imageUrl = state.image ? state.image : "https://img-cdn-qiniu.dcloud.net.cn/uniapp/app/share-logo@3.png";
            shareOPtions.title = "\u6B22\u8FCE\u4F53\u9A8Cuniapp";
            shareOPtions.miniProgram = {
              id: "gh_33446d7f7a26",
              path: "/pages/tabBar/component/component",
              webUrl: "https://uniapp.dcloud.io",
              type: 0
            };
            break;
        }
        if (shareOPtions.type === 0 && plus.os.name === "iOS")
          ;
        if (shareOPtions.type === 1 && shareOPtions.provider === "qq") {
          shareOPtions.href = state.href;
          shareOPtions.title = state.title;
        }
        uni.hideLoading();
        uni.share(shareOPtions);
      };
      return __spreadProps(__spreadValues({
        isShow
      }, vue.toRefs(state)), {
        showHandler,
        share
      });
    },
    methods: {
      compress() {
        formatAppLog("log", "at components/my-share/my-share.vue:213", "\u5F00\u59CB\u538B\u7F29");
        let img = this.image;
        return new Promise(async (res) => {
          if (img.startsWith("http")) {
            img = await this.fileDownload(img);
          }
          plus.io.resolveLocalFileSystemURL(img, (entry) => {
            entry.file((file) => {
              formatAppLog("log", "at components/my-share/my-share.vue:226", "getFile:" + JSON.stringify(file));
              if (file.size > 20480) {
                plus.zip.compressImage({
                  src: img,
                  dst: img.replace(".jpg", "2222.jpg").replace(".JPG", "2222.JPG"),
                  width: "10%",
                  height: "10%",
                  quality: 1,
                  overwrite: true
                }, (event) => {
                  let newImg = img.replace(".jpg", "2222.jpg").replace(".JPG", "2222.JPG");
                  res(newImg);
                }, function(error) {
                  uni.showModal({
                    content: "\u5206\u4EAB\u56FE\u7247\u592A\u5927,\u9700\u8981\u8BF7\u91CD\u65B0\u9009\u62E9\u56FE\u7247!",
                    showCancel: false
                  });
                });
              }
            });
          }, (e) => {
            formatAppLog("log", "at components/my-share/my-share.vue:248", "Resolve file URL failed: " + e.message);
            uni.showModal({
              content: "\u5206\u4EAB\u56FE\u7247\u592A\u5927,\u9700\u8981\u8BF7\u91CD\u65B0\u9009\u62E9\u56FE\u7247!",
              showCancel: false
            });
          });
        });
      },
      fileDownload(url) {
        return new Promise((resolve, reject) => {
          uni.downloadFile({
            url,
            success: (res) => {
              resolve(res.tempFilePath);
            },
            fail: () => {
              this.$message.toast("\u56FE\u7247\u4E0B\u8F7D\u5931\u8D25\uFF01", "error");
            }
          });
        });
      }
    }
  };
  function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.withDirectives((vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createCommentVNode(" \u906E\u7F69\u8499\u5C42 "),
      vue.createElementVNode("view", {
        onClick: _cache[0] || (_cache[0] = (...args) => $setup.showHandler && $setup.showHandler(...args)),
        class: "mask",
        onTouchmove: _cache[1] || (_cache[1] = vue.withModifiers(() => {
        }, ["stop", "prevent"]))
      }, null, 32),
      vue.createElementVNode("view", { class: "share-body" }, [
        vue.createElementVNode("scroll-view", {
          "scroll-x": "",
          class: "share-scroll noScorll"
        }, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.providerList, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "share-item",
              onClick: ($event) => $setup.share(item),
              key: index
            }, [
              vue.createElementVNode("image", {
                src: item.icon
              }, null, 8, ["src"]),
              vue.createElementVNode("view", null, vue.toDisplayString(item.name), 1)
            ], 8, ["onClick"]);
          }), 128))
        ]),
        vue.createElementVNode("view", {
          class: "share-cancel",
          onClick: _cache[2] || (_cache[2] = (...args) => $setup.showHandler && $setup.showHandler(...args))
        }, "\u53D6\u6D88")
      ])
    ], 512)), [
      [vue.vShow, $setup.isShow]
    ]);
  }
  var __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$m], ["__scopeId", "data-v-448797c4"]]);
  const _sfc_main$m = {
    props: {
      course: {
        type: Object,
        default: () => ({})
      }
    },
    setup() {
      vue.getCurrentInstance();
      return {
        formatCount
      };
    }
  };
  function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "course-header" }, [
      vue.createElementVNode("image", {
        class: "img",
        src: $props.course.mainImage,
        "lazy-load": ""
      }, null, 8, ["src"]),
      vue.createElementVNode("view", { class: "header-info" }, [
        vue.createElementVNode("view", { class: "price-info" }, [
          $props.course.isFree ? (vue.openBlock(), vue.createElementBlock("text", { key: 0 }, "\u514D\u8D39")) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
            vue.createCommentVNode(" \u4F18\u60E0\u4EF7 "),
            $props.course.priceDiscount ? (vue.openBlock(), vue.createElementBlock("text", { key: 0 }, "\uFFE5" + vue.toDisplayString($props.course.priceDiscount), 1)) : vue.createCommentVNode("v-if", true),
            vue.createCommentVNode("\u539F\u4EF7\u4E00\u76F4\u663E\u793A\uFF08\u6709\u4F18\u60E0\u4EF7\u65F6\u663E\u793Aprice\u7C7B\u540D\uFF09"),
            vue.createElementVNode("text", {
              class: vue.normalizeClass({ price: $props.course.priceDiscount })
            }, "\uFFE5" + vue.toDisplayString($props.course.priceOriginal), 3),
            $props.course.priceDiscount ? (vue.openBlock(), vue.createElementBlock("text", {
              key: 1,
              class: "youhui"
            }, "\u4F18\u60E0\u4EF7")) : vue.createCommentVNode("v-if", true)
          ], 64))
        ]),
        vue.createElementVNode("view", { class: "title" }, vue.toDisplayString($props.course.title), 1),
        vue.createElementVNode("view", { class: "count" }, [
          vue.createElementVNode("text", { class: "iconfont icon-haoping2" }, vue.toDisplayString($props.course.goodRate) + "\u597D\u8BC4", 1),
          vue.createElementVNode("text", { class: "iconfont icon-touxiang2" }, vue.toDisplayString($setup.formatCount($props.course.studyTotal)) + "\u4EBA\u5728\u5B66", 1)
        ])
      ])
    ]);
  }
  var courseDetailHeader = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$l], ["__scopeId", "data-v-21516c4e"]]);
  const _sfc_main$l = {
    props: {
      detailUrls: {
        type: Array,
        default: () => []
      }
    },
    setup(props) {
      let loading = vue.ref(true);
      let current = vue.ref(0);
      let load = () => {
        current.value += 1;
        if (current.value == props.detailUrls.length) {
          loading.value = false;
        }
      };
      return {
        loading,
        load
      };
    }
  };
  function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "center column" }, [
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.detailUrls, (url, index) => {
        return vue.openBlock(), vue.createElementBlock("image", {
          mode: "widthFix",
          onLoad: _cache[0] || (_cache[0] = (...args) => $setup.load && $setup.load(...args)),
          "lazy-load": "",
          key: index,
          src: url
        }, null, 40, ["src"]);
      }), 128)),
      $setup.loading && $props.detailUrls.length != 0 ? (vue.openBlock(), vue.createElementBlock("image", {
        key: 0,
        class: "loading",
        src: "/static/images/loading.gif"
      })) : (vue.openBlock(), vue.createElementBlock("text", {
        key: 1,
        class: "footer-text"
      }, "\u5DF2\u7ECF\u5230\u8FBE\u5E95\u90E8\uFF0C\u6CA1\u6709\u66F4\u591A\u5185\u5BB9\u4E86"))
    ]);
  }
  var courseInfo = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$k], ["__scopeId", "data-v-617cd50e"]]);
  const _sfc_main$k = {
    props: {
      isBuy: Boolean,
      isFree: Number,
      chapterList: {
        type: Array,
        default: () => []
      }
    },
    setup(props, { emit }) {
      let actSect = vue.ref("");
      vue.reactive({
        parentIndex: 0,
        childIndex: 0
      });
      let handleClick = (section, parentIndex, childIndex) => {
        if ((section.isFree || props.isFree) && !props.isBuy) {
          actSect.value = section.name;
        }
        emit("openVideo", { section, parentIndex, childIndex });
      };
      return {
        actSect,
        handleClick
      };
    }
  };
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "course-dir" }, [
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.chapterList, (chapter, index) => {
        return vue.openBlock(), vue.createElementBlock("view", { key: index }, [
          vue.createCommentVNode(" \u7B2C\u51E0\u7AE0 "),
          vue.createElementVNode("text", { class: "chapters text-ellipsis" }, "\u7B2C" + vue.toDisplayString(index + 1) + "\u7AE0 " + vue.toDisplayString(chapter.name), 1),
          vue.createCommentVNode(" \u7B2C\u51E0\u8282 "),
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(chapter.sectionList, (section, index2) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: vue.normalizeClass(["sections row", { active: $setup.actSect == section.name }]),
              key: index2,
              onClick: ($event) => $setup.handleClick(section, index, index2)
            }, [
              vue.createElementVNode("text", { class: "iconfont icon-roundrightfill" }),
              vue.createElementVNode("view", { class: "row" }, [
                vue.createElementVNode("text", null, vue.toDisplayString(index + 1) + "-" + vue.toDisplayString(index2 + 1), 1),
                vue.createElementVNode("text", { class: "title text-ellipsis" }, vue.toDisplayString(section.name), 1)
              ]),
              (section.isFree || $props.isFree) && !$props.isBuy ? (vue.openBlock(), vue.createElementBlock("text", {
                key: 0,
                class: "see"
              }, "\u8BD5\u770B")) : $props.isBuy ? (vue.openBlock(), vue.createElementBlock("text", {
                key: 1,
                class: "see iconfont icon-play"
              })) : vue.createCommentVNode("v-if", true)
            ], 10, ["onClick"]);
          }), 128))
        ]);
      }), 128))
    ]);
  }
  var courseSection = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$j], ["__scopeId", "data-v-6773dd35"]]);
  const _sfc_main$j = {
    props: {
      desc: {
        type: String,
        default: "\u6682\u65E0\u6570\u636E"
      }
    }
  };
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { class: "center column" }, [
        vue.createElementVNode("image", {
          src: "/static/images/no.png",
          "lazy-load": "",
          mode: "aspectFill"
        }),
        vue.createElementVNode("text", { class: "title" }, vue.toDisplayString($props.desc), 1)
      ])
    ]);
  }
  var __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$i], ["__scopeId", "data-v-1a4b7c72"]]);
  const _sfc_main$i = {
    props: {
      commentList: {
        type: Array,
        default: () => []
      }
    }
  };
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_no_data = resolveEasycom(vue.resolveDynamicComponent("no-data"), __easycom_0$2);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      !$props.commentList || $props.commentList.length <= 0 ? (vue.openBlock(), vue.createBlock(_component_no_data, {
        key: 0,
        desc: "\u6682\u65E0\u8BC4\u8BBA"
      })) : (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "comment"
      }, [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.commentList, (item, index) => {
          return vue.openBlock(), vue.createElementBlock("view", {
            class: "comment-item",
            key: index
          }, [
            vue.createElementVNode("view", { class: "info" }, [
              vue.createElementVNode("image", {
                mode: "aspectFill",
                src: item.userImage || "/static/tab/my.png"
              }, null, 8, ["src"]),
              vue.createElementVNode("view", { class: "user" }, [
                vue.createElementVNode("view", null, vue.toDisplayString(item.nickName), 1),
                vue.createElementVNode("view", null, vue.toDisplayString(_ctx.$utils.dateFormat(item.createDate)), 1)
              ]),
              vue.createElementVNode("text", {
                class: vue.normalizeClass([{ grey: !item.isGood }, "iconfont icon-haoping2"])
              }, null, 2)
            ]),
            vue.createElementVNode("view", { class: "content" }, vue.toDisplayString(item.content), 1),
            item.children && item.children.content ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "replay"
            }, [
              vue.createElementVNode("text", null, "\u8BB2\u5E08\u56DE\u590D\uFF1A"),
              vue.createElementVNode("text", null, vue.toDisplayString(item.children.content), 1)
            ])) : vue.createCommentVNode("v-if", true)
          ]);
        }), 128))
      ]))
    ]);
  }
  var courseComment = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$h], ["__scopeId", "data-v-7adc00a2"]]);
  const _sfc_main$h = {
    props: {
      groupList: {
        type: Array,
        default: () => []
      },
      showBuy: {
        type: Boolean,
        default: true
      }
    },
    setup() {
      let { proxy } = vue.getCurrentInstance();
      let buyGroupHandler = (item) => {
        proxy.navTo("/pages/order/confirm-buy?detail=" + encodeURIComponent(JSON.stringify(item)));
      };
      return {
        buyGroupHandler
      };
    }
  };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_no_data = resolveEasycom(vue.resolveDynamicComponent("no-data"), __easycom_0$2);
    const _component_course_item = resolveEasycom(vue.resolveDynamicComponent("course-item"), __easycom_0$8);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      !$props.groupList || $props.groupList.length <= 0 ? (vue.openBlock(), vue.createBlock(_component_no_data, {
        key: 0,
        desc: "\u6682\u65E0\u5957\u9910"
      })) : (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "group-list"
      }, [
        vue.createCommentVNode(" elevation \u4E3B\u8981\u89E3\u51B3 nvue \u6587\u4EF6\u4E2D\u7684android\u8BBE\u5907\u7684\u9634\u5F71\u95EE\u9898 "),
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.groupList, (item, index) => {
          return vue.openBlock(), vue.createElementBlock("view", {
            class: "group-item",
            elevation: "12px",
            key: index
          }, [
            vue.createElementVNode("text", { class: "title" }, vue.toDisplayString(item.title), 1),
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item.list, (info, i) => {
              return vue.openBlock(), vue.createBlock(_component_course_item, {
                key: i,
                item: info
              }, null, 8, ["item"]);
            }), 128)),
            $props.showBuy ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "price-box space-between center"
            }, [
              vue.createElementVNode("view", { class: "price" }, [
                vue.createElementVNode("text", { class: "group-price" }, "\uFFE5" + vue.toDisplayString(item.groupPrice), 1),
                vue.createElementVNode("text", { class: "total-price" }, "\uFFE5" + vue.toDisplayString(item.totalPrice), 1)
              ]),
              vue.createElementVNode("text", {
                class: "buy",
                onClick: ($event) => $setup.buyGroupHandler(item)
              }, "\u8D2D\u4E70\u5957\u9910", 8, ["onClick"])
            ])) : vue.createCommentVNode("v-if", true)
          ]);
        }), 128))
      ]))
    ]);
  }
  var coursePackage = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$g], ["__scopeId", "data-v-7b5dfa16"]]);
  const _sfc_main$g = {
    props: {
      btnText: {
        type: String,
        default: "\u9ED8\u8BA4\u6309\u94AE"
      },
      courseId: [String, Number]
    },
    setup(props, { emit }) {
      const clickHandler = () => {
        emit("clickBottom");
      };
      return {
        clickHandler
      };
    }
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "bottom center",
      onClick: _cache[0] || (_cache[0] = (...args) => $setup.clickHandler && $setup.clickHandler(...args))
    }, [
      vue.createElementVNode("text", { class: "bottom-btn" }, vue.toDisplayString($props.btnText), 1)
    ]);
  }
  var bottomBtn = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$f], ["__scopeId", "data-v-43a26188"]]);
  const _sfc_main$f = {
    components: {
      "course-detail-header": courseDetailHeader,
      "course-info": courseInfo,
      "course-section": courseSection,
      "course-comment": courseComment,
      "course-package": coursePackage,
      "bottom-btn": bottomBtn
    },
    setup() {
      let { proxy } = vue.getCurrentInstance();
      let tabs = vue.ref([
        { id: 1, name: "\u8BE6\u60C5" },
        { id: 2, name: "\u7AE0\u8282" },
        { id: 3, name: "\u8BC4\u8BBA" },
        { id: 4, name: "\u5957\u9910" }
      ]);
      let tabBar = vue.ref(null);
      let myShare = vue.ref(null);
      let sectionRef = vue.ref(null);
      let providerList = vue.ref([
        { id: "weixin", name: "\u5FAE\u4FE1\u597D\u53CB", sort: 0, icon: "/static/share/weixin.png" },
        { id: "weixin", name: "\u670B\u53CB\u5708", type: "WXSenceTimeline", sort: 1, icon: "/static/share/pengyouquan.png" },
        { id: "sinaweibo", name: "\u65B0\u6D6A\u5FAE\u535A", sort: 2, icon: "/static/share/weibo.png" },
        { id: "qq", name: "QQ\u597D\u53CB", sort: 3, icon: "/static/share/qq.png" },
        { id: "copy", name: "\u590D\u5236\u94FE\u63A5", sort: 4, icon: "/static/share/link.png" }
      ]);
      let state = vue.reactive({
        id: null,
        pageHeight: 0,
        statusNavHeight: 0,
        detailToTop: 0,
        tabId: 0,
        current: 0,
        isScroll: false,
        isBuy: false,
        freeVideo: false,
        videoUrl: null,
        videoText: "",
        videoContext: null,
        courseDetail: {},
        courseSection: [],
        courseComment: [],
        coursePackage: []
      });
      onReachBottom(() => {
        state.isScroll = true;
      });
      let toupper = () => {
        state.isScroll = false;
        uni.pageScrollTo({
          scrollTop: 0
        });
      };
      onPageScroll((event) => {
        if (event.scrollTop < state.detailToTop - state.statusNavHeight) {
          state.isScroll = false;
        } else {
          state.isScroll = true;
        }
      });
      let changeTab = (id) => {
        state.tabId = id, state.current = id - 1;
        uni.pageScrollTo({
          scrollTop: state.detailToTop
        });
      };
      let changeSwiper = (event) => {
        state.tabId = event.detail.current + 1;
        tabBar.value.tabId = event.detail.current + 1;
      };
      onNavigationBarButtonTap((e) => {
        if (e.type = "share") {
          myShare.value.isShow = !myShare.value.isShow;
        }
      });
      let clickBottom = () => {
        if (state.isBuy || state.courseDetail.isFree == 1) {
          formatAppLog("log", "at pages/course/course-details.vue:144", "\u7ACB\u5373\u89C2\u770B");
          proxy.navTo("/pages/course/course-play?id=" + state.id);
        } else {
          formatAppLog("log", "at pages/course/course-details.vue:147", "\u7ACB\u5373\u8D2D\u4E70");
          proxy.navTo("/pages/order/confirm-buy?detail=" + JSON.stringify(state.courseDetail));
        }
      };
      let openVideo = async (itemInfo) => {
        formatAppLog("log", "at pages/course/course-details.vue:155", itemInfo);
        if ((itemInfo.section.isFree || state.courseDetail.isFree) && !state.isBuy) {
          uni.request({
            url: itemInfo.section.videoUrl,
            method: "GET",
            success: (res) => {
              state.videoUrl = res.data.data.url;
            },
            complete: () => {
              state.videoText = itemInfo.section.name;
              state.freeVideo = true;
              vue.nextTick(() => {
                state.videoContext.play();
              });
            }
          });
        } else if (state.isBuy) {
          sectionRef.value.actSect = itemInfo.section.name;
          proxy.navTo("/pages/course/course-play?id=" + state.id);
        } else {
          proxy.$message.toast("\u8BFE\u7A0B\u5C1A\u672A\u8D2D\u4E70\uFF0C\u65E0\u6CD5\u89C2\u770B");
        }
      };
      let closeVideo = () => {
        state.freeVideo = false;
        state.videoContext.stop();
        state.videoUrl = "";
        state.videoText = "";
      };
      return __spreadProps(__spreadValues({
        tabs,
        tabBar,
        myShare,
        sectionRef,
        providerList
      }, vue.toRefs(state)), {
        changeTab,
        changeSwiper,
        toupper,
        clickBottom,
        openVideo,
        closeVideo
      });
    },
    methods: {
      getHeight() {
        let res = uni.getSystemInfoSync();
        let sys = res.platform;
        if (sys == "android") {
          this.statusNavHeight = res.statusBarHeight + 48;
        } else if (sys = "ios") {
          this.statusNavHeight = res.statusBarHeight + 44;
        }
        this.pageHeight = res.screenHeight - this.statusNavHeight - 40;
      },
      async getPageInfo(id) {
        this.courseDetail = await getCourseDetail(id);
        uni.setNavigationBarTitle({
          title: this.courseDetail.title
        });
        this.courseSection = await getCourseSection(id);
        this.courseComment = await getCourseComment(id);
        this.coursePackage = await getCoursePackage(id);
        if (this.$utils.isLogin(false)) {
          this.isBuy = (await getCourseIsBuy(id)).isBuy;
        }
      }
    },
    onLoad(option) {
      if (option.id) {
        this.id = option.id;
        this.getPageInfo(this.id);
      }
      this.getHeight();
      let webView2 = this.$scope.$getAppWebview();
      webView2.setStyle({ "scrollToTop": false });
    },
    onReady() {
      let view = uni.createSelectorQuery().in(this).select(".course-details");
      view.fields({
        rect: true
      }, (data2) => {
        this.detailToTop = data2.top;
      }).exec();
      this.videoContext = uni.createVideoContext("playVideo", this);
    },
    onShareAppMessage(res) {
      return {
        title: this.courseDetail.title,
        path: this.$utils.routePath()
      };
    }
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_course_detail_header = vue.resolveComponent("course-detail-header");
    const _component_tab_bar = resolveEasycom(vue.resolveDynamicComponent("tab-bar"), __easycom_0$7);
    const _component_course_info = vue.resolveComponent("course-info");
    const _component_course_section = vue.resolveComponent("course-section");
    const _component_course_comment = vue.resolveComponent("course-comment");
    const _component_course_package = vue.resolveComponent("course-package");
    const _component_bottom_btn = vue.resolveComponent("bottom-btn");
    const _component_my_share = resolveEasycom(vue.resolveDynamicComponent("my-share"), __easycom_1$1);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createVNode(_component_course_detail_header, { course: _ctx.courseDetail }, null, 8, ["course"]),
      vue.createElementVNode("view", {
        class: "course-details",
        style: vue.normalizeStyle({ "height": `${_ctx.pageHeight}px` })
      }, [
        vue.createVNode(_component_tab_bar, {
          tabs: $setup.tabs,
          itemWidth: 87.5,
          onChangeTab: $setup.changeTab,
          ref: "tabBar"
        }, null, 8, ["tabs", "itemWidth", "onChangeTab"]),
        vue.createCommentVNode(" \u5206\u7C7B\u5185\u5BB9 "),
        vue.createElementVNode("swiper", {
          duration: 500,
          circular: "",
          current: _ctx.current,
          class: "swiper-box",
          onChange: _cache[1] || (_cache[1] = (...args) => $setup.changeSwiper && $setup.changeSwiper(...args))
        }, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($setup.tabs, (item) => {
            return vue.openBlock(), vue.createElementBlock("swiper-item", {
              class: "swiper-box",
              key: item.id
            }, [
              vue.createElementVNode("scroll-view", {
                "scroll-y": _ctx.isScroll,
                class: "scroll-box",
                "upper-threshold": 0,
                onScrolltoupper: _cache[0] || (_cache[0] = (...args) => $setup.toupper && $setup.toupper(...args))
              }, [
                vue.createElementVNode("view", { class: "details-info" }, [
                  _ctx.tabId == 1 ? (vue.openBlock(), vue.createBlock(_component_course_info, {
                    key: 0,
                    detailUrls: _ctx.courseDetail.detailUrls
                  }, null, 8, ["detailUrls"])) : vue.createCommentVNode("v-if", true),
                  _ctx.tabId == 2 ? (vue.openBlock(), vue.createBlock(_component_course_section, {
                    key: 1,
                    ref_for: true,
                    ref: "sectionRef",
                    chapterList: _ctx.courseSection,
                    onOpenVideo: $setup.openVideo,
                    isBuy: _ctx.isBuy,
                    isFree: _ctx.courseDetail.isFree
                  }, null, 8, ["chapterList", "onOpenVideo", "isBuy", "isFree"])) : vue.createCommentVNode("v-if", true),
                  _ctx.tabId == 3 ? (vue.openBlock(), vue.createBlock(_component_course_comment, {
                    key: 2,
                    commentList: _ctx.courseComment
                  }, null, 8, ["commentList"])) : vue.createCommentVNode("v-if", true),
                  _ctx.tabId == 4 ? (vue.openBlock(), vue.createBlock(_component_course_package, {
                    key: 3,
                    groupList: _ctx.coursePackage
                  }, null, 8, ["groupList"])) : vue.createCommentVNode("v-if", true)
                ])
              ], 40, ["scroll-y"])
            ]);
          }), 128))
        ], 40, ["current"])
      ], 4),
      vue.createCommentVNode(" \u8D2D\u4E70/\u89C2\u770B\u6309\u94AE "),
      vue.createVNode(_component_bottom_btn, {
        btnText: _ctx.isBuy || _ctx.courseDetail.isFree == 1 ? "\u7ACB\u5373\u89C2\u770B" : "\u7ACB\u5373\u8D2D\u4E70",
        onClickBottom: $setup.clickBottom
      }, null, 8, ["btnText", "onClickBottom"]),
      vue.createCommentVNode(" \u5206\u4EAB\u7EC4\u4EF6 "),
      vue.createVNode(_component_my_share, {
        ref: "myShare",
        shareDate: _ctx.courseDetail
      }, null, 8, ["shareDate"]),
      vue.createCommentVNode(" \u8BD5\u770B\u7EC4\u4EF6 "),
      _ctx.freeVideo ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "video-box mask",
        onTouchmove: _cache[3] || (_cache[3] = vue.withModifiers(() => {
        }, ["stop", "prevent"]))
      }, [
        vue.createElementVNode("view", { class: "name" }, [
          vue.createElementVNode("text", null, vue.toDisplayString(_ctx.videoText), 1),
          vue.createElementVNode("text", {
            class: "iconfont icon-close",
            onClick: _cache[2] || (_cache[2] = (...args) => $setup.closeVideo && $setup.closeVideo(...args))
          })
        ]),
        vue.createElementVNode("video", {
          id: "playVideo",
          class: "video",
          src: _ctx.videoUrl
        }, null, 8, ["src"])
      ], 32)) : vue.createCommentVNode("v-if", true)
    ]);
  }
  var PagesCourseCourseDetails = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$e]]);
  const _sfc_main$e = {
    name: "UniRate",
    props: {
      isFill: {
        type: [Boolean, String],
        default: true
      },
      color: {
        type: String,
        default: "#ececec"
      },
      activeColor: {
        type: String,
        default: "#A2CD5A"
      },
      disabledColor: {
        type: String,
        default: "#c0c0c0"
      },
      size: {
        type: [Number, String],
        default: 24
      },
      value: {
        type: [Number, String],
        default: 1
      },
      max: {
        type: [Number, String],
        default: 5
      },
      margin: {
        type: [Number, String],
        default: 0
      },
      disabled: {
        type: [Boolean, String],
        default: false
      },
      readonly: {
        type: [Boolean, String],
        default: false
      },
      allowHalf: {
        type: [Boolean, String],
        default: false
      },
      touchable: {
        type: [Boolean, String],
        default: true
      }
    },
    data() {
      return {
        valueSync: ""
      };
    },
    watch: {
      value(newVal) {
        this.valueSync = Number(newVal);
      }
    },
    computed: {
      stars() {
        const value = this.valueSync ? this.valueSync : 0;
        const starList = [];
        const floorValue = Math.floor(value);
        const ceilValue = Math.ceil(value);
        for (let i = 0; i < this.max; i++) {
          if (floorValue > i) {
            starList.push({
              activeWitch: "100%"
            });
          } else if (ceilValue - 1 === i) {
            starList.push({
              activeWitch: (value - floorValue) * 100 + "%"
            });
          } else {
            starList.push({
              activeWitch: "0"
            });
          }
        }
        return starList;
      }
    },
    created() {
      this.valueSync = Number(this.value);
      this._rateBoxLeft = 0;
      this._oldValue = null;
    },
    mounted() {
      setTimeout(() => {
        this._getSize();
      }, 100);
    },
    methods: {
      touchstart(e) {
        if (this.readonly || this.disabled)
          return;
        const {
          clientX,
          screenX
        } = e.changedTouches[0];
        this._getRateCount(clientX || screenX);
      },
      touchmove(e) {
        if (this.readonly || this.disabled || !this.touchable)
          return;
        const {
          clientX,
          screenX
        } = e.changedTouches[0];
        this._getRateCount(clientX || screenX);
      },
      _getRateCount(clientX) {
        const rateMoveRange = clientX - this._rateBoxLeft;
        let index = parseInt(rateMoveRange / (this.size + this.margin));
        index = index < 0 ? 0 : index;
        index = index > this.max ? this.max : index;
        const range = parseInt(rateMoveRange - (this.size + this.margin) * index);
        let value = 0;
        if (this._oldValue === index)
          return;
        this._oldValue = index;
        if (this.allowHalf) {
          if (range > this.size / 2) {
            value = index + 1;
          } else {
            value = index + 0.5;
          }
        } else {
          value = index + 1;
        }
        value = Math.max(0.5, Math.min(value, this.max));
        this.valueSync = value;
        this._onChange();
      },
      _onChange() {
        this.$emit("input", this.valueSync);
        this.$emit("change", {
          value: this.valueSync
        });
      },
      _getSize() {
        uni.createSelectorQuery().in(this).select(".uni-rate").boundingClientRect().exec((ret) => {
          if (ret) {
            this._rateBoxLeft = ret[0].left;
          }
        });
      }
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", {
        ref: "uni-rate",
        class: "uni-rate"
      }, [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.stars, (star, index) => {
          return vue.openBlock(), vue.createElementBlock("view", {
            class: "uni-rate__icon",
            style: vue.normalizeStyle({ "margin-right": $props.margin + "px" }),
            key: index,
            onTouchstart: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.touchstart && $options.touchstart(...args), ["stop"])),
            onTouchmove: _cache[1] || (_cache[1] = vue.withModifiers((...args) => $options.touchmove && $options.touchmove(...args), ["stop"]))
          }, [
            vue.createElementVNode("text", {
              style: vue.normalizeStyle({ color: $props.color, fontSize: $props.size + "px" }),
              class: vue.normalizeClass($props.isFill ? "iconfont icon-star-filled" : "iconfont icon-star")
            }, null, 6),
            vue.createCommentVNode(` <uni-icons :color="color" :size="size" :type="isFill ? 'star-filled' : 'star'" /> `),
            vue.createElementVNode("view", {
              style: vue.normalizeStyle({ width: star.activeWitch }),
              class: "uni-rate__icon-on"
            }, [
              vue.createElementVNode("text", {
                style: vue.normalizeStyle({ color: $props.disabled ? $props.disabledColor : $props.activeColor, fontSize: $props.size + "px" }),
                class: "iconfont"
              }, "\uE709", 4),
              vue.createCommentVNode(' <uni-icons :color="disabled?disabledColor:activeColor" :size="size" type="star-filled" /> ')
            ], 4)
          ], 36);
        }), 128))
      ], 512)
    ]);
  }
  var __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d], ["__scopeId", "data-v-b7a28ab8"]]);
  const _sfc_main$d = {
    props: {
      comment: {
        type: Object,
        default: () => ({})
      },
      descArr: {
        type: Array,
        default: () => [
          "\u6781\u5DEE,\u8BFE\u7A0B\u5F88\u7CDF\u7CD5\uFF0C\u6211\u8981\u5410\u69FD\u3002",
          "\u5DEE,\u6211\u5BF9\u8BFE\u7A0B\u4E0D\u6EE1\u610F\u3002",
          "\u4E2D\u8BC4,\u8BFE\u7A0B\u4E00\u822C\u3002",
          "\u826F\u597D,\u8BFE\u7A0B\u8FD8\u53EF\u4EE5\u3002",
          "\u63A8\u8350,\u8BFE\u7A0B\u975E\u5E38\u68D2\u3002"
        ]
      }
    },
    setup(props, { emit }) {
      let { proxy } = vue.getCurrentInstance();
      let isShow = vue.ref(false);
      let state = vue.ref({
        userId: null,
        nickName: "",
        userImage: "",
        content: "",
        score: 5
      });
      vue.onMounted(() => {
        state.value = __spreadValues({}, props.comment);
      });
      const show = () => {
        isShow.value = false;
      };
      let changeRate = (value) => {
        state.value.score = value.value;
      };
      let submitComment = () => {
        formatAppLog("log", "at components/comment/comment.vue:71", state.value);
        emit("submit", state.value);
        proxy.$message.toast("\u53D1\u8868\u6210\u529F", "success");
        isShow.value = false;
        state.score = 5;
        state.content = "";
      };
      return {
        isShow,
        state,
        show,
        changeRate,
        submitComment
      };
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_rate = resolveEasycom(vue.resolveDynamicComponent("uni-rate"), __easycom_0$1);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createCommentVNode(" \u8499\u5C42 "),
      $setup.isShow ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        onClick: _cache[0] || (_cache[0] = (...args) => $setup.show && $setup.show(...args)),
        class: "mask",
        onTouchmove: _cache[1] || (_cache[1] = vue.withModifiers(() => {
        }, ["stop", "prevent"])),
        catchtouchmove: "true"
      }, null, 32)) : vue.createCommentVNode("v-if", true),
      $setup.isShow ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "course-comment center column"
      }, [
        vue.createCommentVNode(" v-model \u65E0\u6548 "),
        vue.createCommentVNode(' <uni-rate :size="22" v-model="state.score"></uni-rate> '),
        vue.createVNode(_component_uni_rate, {
          size: 22,
          value: $setup.state.score,
          onChange: $setup.changeRate
        }, null, 8, ["value", "onChange"]),
        vue.createElementVNode("text", { class: "desc" }, vue.toDisplayString($props.descArr[$setup.state.score - 1]), 1),
        vue.createElementVNode("view", { class: "input-box center" }, [
          vue.withDirectives(vue.createElementVNode("textarea", {
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.state.content = $event),
            class: "textarea",
            placeholder: "\u8BF7\u8F93\u5165\u8BC4\u4EF7\u5185\u5BB9\u2026\u2026"
          }, null, 512), [
            [vue.vModelText, $setup.state.content]
          ]),
          vue.createElementVNode("text", {
            class: "btn",
            onClick: _cache[3] || (_cache[3] = (...args) => $setup.submitComment && $setup.submitComment(...args))
          }, "\u63D0\u4EA4")
        ])
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  var __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c], ["__scopeId", "data-v-49203ec4"]]);
  const _sfc_main$c = {
    components: {
      "course-section": courseSection
    },
    setup() {
      let { proxy } = vue.getCurrentInstance();
      let sectionRef = vue.ref(null);
      let myShare = vue.ref(null);
      let commentRef = vue.ref(null);
      let state = vue.reactive({
        id: null,
        courseDetail: {},
        courseSection: [],
        poster: "",
        videoUrl: "",
        comment: {
          userId: 1,
          courseId: 10,
          nickName: "Liu",
          userImage: "",
          content: "",
          score: 5
        },
        activeVideo: {
          parentIndex: 0,
          childIndex: 0
        },
        providerList: [
          { id: "weixin", name: "\u5FAE\u4FE1\u597D\u53CB", sort: 0, icon: "/static/share/weixin.png" },
          { id: "weixin", name: "\u670B\u53CB\u5708", type: "WXSenceTimeline", sort: 1, icon: "/static/share/pengyouquan.png" },
          { id: "sinaweibo", name: "\u65B0\u6D6A\u5FAE\u535A", sort: 2, icon: "/static/share/weibo.png" },
          { id: "qq", name: "QQ\u597D\u53CB", sort: 3, icon: "/static/share/qq.png" },
          { id: "copy", name: "\u590D\u5236\u94FE\u63A5", sort: 4, icon: "/static/share/link.png" }
        ]
      });
      const openVideo = (itemInfo) => {
        sectionRef.value.actSect = itemInfo.section.name;
        state.activeVideo.parentIndex = itemInfo.parentIndex;
        state.activeVideo.childIndex = itemInfo.childIndex;
        uni.$emit("videoInfo", {
          type: "update",
          activeVideo: state.activeVideo,
          section: itemInfo.section
        });
      };
      const share = () => {
        myShare.value.isShow = !myShare.value.isShow;
      };
      const openComment = () => {
        commentRef.value.isShow = !commentRef.value.isShow;
      };
      const submit = async (data2) => {
        let res = await updateComment(data2);
        if (res.code == 200) {
          proxy.$message.toast("\u53D1\u8868\u6210\u529F", "success");
          commentRef.value.isShow = false;
          data2.score = 5;
          data2.content = "";
        }
      };
      return __spreadProps(__spreadValues({
        sectionRef,
        myShare,
        commentRef
      }, vue.toRefs(state)), {
        openVideo,
        share,
        openComment,
        submit
      });
    },
    async onLoad(option) {
      this.id = option.id;
      this.getPageInfo();
    },
    onReady() {
    },
    methods: {
      async getPageInfo() {
        this.courseDetail = await getCourseDetail(this.id);
        this.courseSection = await getBuyCourseSection(this.id);
        uni.$emit("videoInfo", {
          type: "init",
          courseDetail: this.courseDetail,
          courseSection: this.courseSection,
          activeVideo: this.activeVideo,
          sectionRef: this.$refs.sectionRef
        });
        this.$refs.sectionRef.actSect = this.courseSection[0].sectionList[0].name;
      }
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_course_section = vue.resolveComponent("course-section");
    const _component_my_share = resolveEasycom(vue.resolveDynamicComponent("my-share"), __easycom_1$1);
    const _component_comment = resolveEasycom(vue.resolveDynamicComponent("comment"), __easycom_1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "course-play" }, [
      vue.createCommentVNode(" \u8BE6\u60C5 "),
      vue.createElementVNode("view", { class: "course-info space-between" }, [
        vue.createElementVNode("text", { class: "title" }, vue.toDisplayString(_ctx.courseDetail.title), 1),
        vue.createElementVNode("view", {
          class: "right",
          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.navTo(`/pages/course/course-details?id=${_ctx.id}`))
        }, [
          vue.createElementVNode("text", null, "\u8BE6\u60C5"),
          vue.createElementVNode("text", { class: "iconfont icon-right" })
        ])
      ]),
      vue.createCommentVNode(" \u8BFE\u7A0B\u5217\u8868 "),
      vue.createVNode(_component_course_section, {
        ref: "sectionRef",
        isBuy: true,
        chapterList: _ctx.courseSection,
        onOpenVideo: $setup.openVideo
      }, null, 8, ["chapterList", "onOpenVideo"]),
      vue.createCommentVNode(" \u5E95\u90E8\u6309\u94AE\uFF1A\u5206\u4EAB\uFF0C\u8BC4\u8BBA "),
      vue.createElementVNode("view", { class: "bottom center" }, [
        vue.createElementVNode("view", {
          class: "btn-item one column",
          onClick: _cache[1] || (_cache[1] = (...args) => $setup.share && $setup.share(...args))
        }, [
          vue.createElementVNode("text", { class: "iconfont icon-Share-Outline" }),
          vue.createElementVNode("text", null, "\u5206\u4EAB")
        ]),
        vue.createElementVNode("view", {
          class: "btn-item one column",
          onClick: _cache[2] || (_cache[2] = (...args) => $setup.openComment && $setup.openComment(...args))
        }, [
          vue.createElementVNode("text", { class: "iconfont icon-edit" }),
          vue.createElementVNode("text", null, "\u8BC4\u4EF7")
        ])
      ]),
      vue.createCommentVNode(" \u5206\u4EAB\u7EC4\u4EF6 "),
      vue.createVNode(_component_my_share, {
        ref: "myShare",
        shareDate: _ctx.courseDetail
      }, null, 8, ["shareDate"]),
      vue.createCommentVNode(" \u8BC4\u4EF7\u7EC4\u4EF6 "),
      vue.createVNode(_component_comment, {
        ref: "commentRef",
        comment: _ctx.comment,
        onSubmit: $setup.submit
      }, null, 8, ["comment", "onSubmit"])
    ]);
  }
  var PagesCourseCoursePlay = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b]]);
  const getBalance = () => {
    return request({
      url: "/pay/user/balance"
    });
  };
  const orderPay = (data2) => {
    return request({
      url: "/pay",
      method: "POST",
      data: data2
    });
  };
  const getWXOrderInfo = (data2) => {
    return request({
      url: "/pay/orferInfo/wxpay",
      method: "POST",
      data: data2
    });
  };
  const getALOrderInfo = (data2) => {
    return request({
      url: "/pay/orderInfo/alipy",
      method: "POST",
      data: data2
    });
  };
  const getOrderList = () => {
    return request({
      url: "/pay/order/user",
      method: "POST"
    });
  };
  const cancelOrder = (orderId) => {
    return request({
      url: "/pay/order/cancel/" + orderId,
      method: "PUT"
    });
  };
  const deleteOrder = (orderId) => {
    return request({
      url: "/pay/order/delete/" + orderId,
      method: "DELETE"
    });
  };
  const _sfc_main$b = {
    components: {
      "course-package": coursePackage
    },
    setup() {
      let { proxy } = vue.getCurrentInstance();
      let detail = vue.ref({});
      let loading = vue.ref(false);
      let isIos = vue.ref(false);
      let payStyle = vue.ref(null);
      let balance = vue.ref();
      let price = vue.computed(() => detail.value.priceDiscount || detail.value.groupPrice || detail.value.priceOriginal || detail.value.totalPrice);
      let canPay = vue.computed(() => parseFloat(balance.value) >= parseFloat(price.value));
      let courseIds = vue.computed(() => {
        let courseIdList = [];
        if (detail.value.list) {
          detail.value.list.forEach((item) => {
            courseIdList.push(item.id);
          });
        } else {
          courseIdList.push(detail.value.id);
        }
        return courseIdList;
      });
      vue.onMounted(() => {
        let sys = uni.getSystemInfoSync().platform;
        if (sys == "ios") {
          isIos.value = true;
        }
        if (isIos.value) {
          payStyle.value = "iospay";
        } else {
          payStyle.value = "wxpay";
        }
      });
      const XuNiPay = async (data2) => {
        loading.value = true;
        uni.showLoading({
          title: "\u652F\u4ED8\u4E2D...",
          mask: true
        });
        let res = await orderPay(data2);
        setTimeout(() => {
          uni.hideLoading();
          loading.value = false;
          if (res.code == 200) {
            uni.showModal({
              content: "\u652F\u4ED8\u6210\u529F\uFF0C\u7ACB\u5373\u5B66\u4E60",
              showCancel: true,
              success: (e) => {
                if (e.confirm) {
                  uni.redirectTo({ url: "/pages/course/course-details?id=" + detail.value.id });
                } else {
                  uni.redirectTo({ url: "/pages/order/order-list" });
                }
              }
            });
          } else {
            proxy.$message.toast("\u652F\u4ED8\u5931\u8D25", "error");
          }
        }, 2e3);
      };
      let radioChange = (e) => {
        payStyle.value = e.detail.value;
      };
      const iosPayHandler = async () => {
        formatAppLog("log", "at pages/order/confirm-buy.vue:165", "\u82F9\u679C\u652F\u4ED8");
        let data2 = { price: price.value, courseIds: courseIds.value };
        if (canPay.value) {
          XuNiPay(data2);
        } else {
          proxy.navTo(`/pages/order/my-balance?params=${JSON.stringify(data2)}`);
        }
      };
      const payHandler = async () => {
        loading.value = true;
        let res = null;
        if (payStyle.value == "wxpay") {
          res = await getWXOrderInfo(courseIds.value);
        } else if (payStyle.value == "alipay") {
          res = await getALOrderInfo(courseIds.value);
        }
        uni.requestPayment({
          provider: payStyle.value,
          orderInfo: res,
          success: (e) => {
            uni.showModal({
              content: "\u652F\u4ED8\u6210\u529F\uFF0C\u7ACB\u5373\u5B66\u4E60",
              showCancel: true,
              success: (e2) => {
                if (e2.confirm) {
                  uni.redirectTo({ url: "/pages/course/course-details?id=" + detail.value.id });
                } else {
                  formatAppLog("log", "at pages/order/confirm-buy.vue:208", "\u8BA2\u5355\u9875");
                }
              }
            });
          },
          fail: (err) => {
            uni.showModal({
              content: "\u652F\u4ED8\u5931\u8D25",
              showCancel: false
            });
          },
          complete: () => {
            loading.value = false;
          }
        });
      };
      return {
        detail,
        loading,
        isIos,
        payStyle,
        price,
        balance,
        canPay,
        radioChange,
        iosPayHandler,
        payHandler
      };
    },
    async onLoad(option) {
      this.detail = JSON.parse(option.detail);
      this.balance = await getBalance();
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_course_item = resolveEasycom(vue.resolveDynamicComponent("course-item"), __easycom_0$8);
    const _component_tempalte = vue.resolveComponent("tempalte");
    return vue.openBlock(), vue.createElementBlock("view", { class: "confirm-order" }, [
      vue.createElementVNode("view", { class: "goods" }, [
        vue.createElementVNode("text", null, "\u5546\u54C1\u4FE1\u606F"),
        $setup.detail.list ? (vue.openBlock(), vue.createBlock(_component_tempalte, { key: 0 }, {
          default: vue.withCtx(() => [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($setup.detail.list, (item) => {
              return vue.openBlock(), vue.createBlock(_component_course_item, { item }, null, 8, ["item"]);
            }), 256))
          ]),
          _: 1
        })) : (vue.openBlock(), vue.createBlock(_component_course_item, {
          key: 1,
          item: $setup.detail
        }, null, 8, ["item"]))
      ]),
      vue.createElementVNode("view", { class: "option-pay card" }, [
        vue.createElementVNode("view", { class: "title" }, "\u652F\u4ED8\u65B9\u5F0F"),
        vue.createElementVNode("radio-group", {
          onChange: _cache[0] || (_cache[0] = (...args) => $setup.radioChange && $setup.radioChange(...args))
        }, [
          vue.createCommentVNode(" ISO\u7AEF\u663E\u793A\u4E09\u79CD\u652F\u4ED8\u65B9\u5F0F\uFF0Ch5\u663E\u793A\u4E24\u79CD\u652F\u4ED8\u65B9\u5F0F\uFF0C\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u663E\u793A\u4E00\u79CD\u652F\u4ED8\u65B9\u5F0F "),
          $setup.isIos ? (vue.openBlock(), vue.createElementBlock("label", {
            key: 0,
            class: "pay-item center space-between"
          }, [
            vue.createElementVNode("view", { class: "ios" }, [
              vue.createElementVNode("text", null, "\u4F59\u989D\uFF1A"),
              vue.createElementVNode("text", null, vue.toDisplayString($setup.balance) + "\u5E01" + vue.toDisplayString($setup.canPay ? "" : "(\u4F59\u989D\u4E0D\u8DB3)"), 1)
            ]),
            vue.createElementVNode("radio", {
              value: "iospay",
              checked: $setup.payStyle == "iospay",
              style: { "transform": "scale(0.8)" }
            }, null, 8, ["checked"])
          ])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("label", { class: "pay-item center space-between" }, [
            vue.createElementVNode("view", { class: "left center" }, [
              vue.createElementVNode("image", { src: "/static/pay/wxpay.png" }),
              vue.createElementVNode("text", null, "\u5FAE\u4FE1\u652F\u4ED8")
            ]),
            vue.createElementVNode("radio", {
              value: "wxpay",
              checked: $setup.payStyle == "wxpay",
              style: { "transform": "scale(0.8)" }
            }, null, 8, ["checked"])
          ]),
          vue.createElementVNode("label", { class: "pay-item center space-between" }, [
            vue.createElementVNode("view", { class: "left center" }, [
              vue.createElementVNode("image", { src: "/static/pay/alipay.png" }),
              vue.createElementVNode("text", null, "\u652F\u4ED8\u5B9D")
            ]),
            vue.createElementVNode("radio", {
              value: "alipay",
              checked: $setup.payStyle == "alipay",
              style: { "transform": "scale(0.8)" }
            }, null, 8, ["checked"])
          ])
        ], 32)
      ]),
      vue.createElementVNode("view", { class: "card price" }, [
        vue.createElementVNode("view", { class: "space-between" }, [
          vue.createElementVNode("text", null, "\u5546\u54C1\u91D1\u989D"),
          vue.createCommentVNode(" \u539F\u4EF7\u6216\u5957\u9910\u603B\u539F\u4EF7 "),
          vue.createElementVNode("text", null, "\uFFE5" + vue.toDisplayString($setup.detail.priceOriginal || $setup.detail.totalPrice), 1)
        ]),
        $setup.detail.priceDiscount || $setup.detail.groupPrice ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "space-between"
        }, [
          vue.createElementVNode("text", null, "\u4F18\u60E0\u4EF7"),
          vue.createCommentVNode(" \u4F18\u60E0\u4EF7\u6216\u5957\u9910\u7EC4\u5408\u4EF7 "),
          vue.createElementVNode("text", null, "\uFFE5" + vue.toDisplayString($setup.detail.priceDiscount || $setup.detail.groupPrice), 1)
        ])) : vue.createCommentVNode("v-if", true)
      ]),
      vue.createCommentVNode(" \u5360\u4F4D\u5E95\u90E8 "),
      vue.createElementVNode("view", { style: { "height": "130rpx" } }),
      vue.createElementVNode("view", { class: "pay space-between" }, [
        vue.createElementVNode("view", null, [
          vue.createElementVNode("text", { class: "grey" }, "\u5B9E\u4ED8\u91D1\u989D\uFF1A"),
          vue.createElementVNode("text", null, "\uFFE5" + vue.toDisplayString($setup.price), 1)
        ]),
        vue.createElementVNode("view", null, [
          $setup.payStyle == "iospay" ? (vue.openBlock(), vue.createElementBlock("button", {
            key: 0,
            class: "btn",
            loading: $setup.loading,
            disabled: $setup.loading,
            onClick: _cache[1] || (_cache[1] = (...args) => $setup.iosPayHandler && $setup.iosPayHandler(...args))
          }, vue.toDisplayString($setup.canPay ? "\u7ACB\u5373\u652F\u4ED8" : "\u5145\u503C\u5E76\u652F\u4ED8"), 9, ["loading", "disabled"])) : vue.createCommentVNode("v-if", true),
          $setup.payStyle == "wxpay" || $setup.payStyle == "alipay" ? (vue.openBlock(), vue.createElementBlock("button", {
            key: 1,
            class: "btn",
            loading: $setup.loading,
            disabled: $setup.loading,
            onClick: _cache[2] || (_cache[2] = (...args) => $setup.payHandler && $setup.payHandler(...args))
          }, "\u7ACB\u5373\u652F\u4ED8", 8, ["loading", "disabled"])) : vue.createCommentVNode("v-if", true),
          $setup.payStyle == null ? (vue.openBlock(), vue.createElementBlock("button", {
            key: 2,
            class: "btn",
            style: { "background-color": "#eee" },
            disabled: true
          }, "\u7ACB\u5373\u652F\u4ED8")) : vue.createCommentVNode("v-if", true)
        ])
      ])
    ]);
  }
  var PagesOrderConfirmBuy = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a]]);
  const _sfc_main$a = {
    setup() {
      let { proxy } = vue.getCurrentInstance();
      let params = vue.ref({});
      let balance = vue.ref(0);
      let loading = vue.ref(true);
      let activeIndex = vue.ref(0);
      let selectBalance = vue.ref(0);
      let moneyList = vue.ref([30, 50, 100, 200, 500]);
      let iapChannel = vue.ref(null);
      const clickItem = (index, item) => {
        activeIndex.value = index;
        selectBalance.value = item;
      };
      const iosPayHandler = () => {
        loading.value = true;
        uni.showLoading({
          title: "\u5145\u503C\u4E2D...",
          mask: true
        });
        setTimeout(() => {
          proxy.$message.toast("\u5145\u503C\u6210\u529F", "success");
          balance.value += selectBalance.value;
          loading.value = false;
          uni.hideLoading();
        }, 2e3);
      };
      return {
        params,
        balance,
        loading,
        activeIndex,
        selectBalance,
        moneyList,
        iapChannel,
        clickItem,
        iosPayHandler
      };
    },
    async onLoad(option) {
      if (option.params) {
        this.params = JSON.parse(option.params);
      }
      this.init();
      plus.payment.getChannels((channels) => {
        formatAppLog("log", "at pages/order/my-balance.vue:126", "\u83B7\u53D6\u5230channel" + JSON.stringify(channels));
        channels.push({ "id": "appleiap", "description": "\u82F9\u679C", "serviceReady": true });
        for (let i in channels) {
          let channel = channels[i];
          if (channel.id === "appleiap") {
            this.iapChannel = channel;
            this.requestOrder();
          }
        }
        if (!this.iapChannel) {
          this.errorMsg();
        }
      }, (error) => {
        this.errorMsg();
      });
    },
    methods: {
      async init() {
        this.balance = await getBalance();
        this.selectBalance = this.params.price - this.balance;
        if (this.selectBalance < 0 || isNaN(this.selectBalance)) {
          this.selectBalance = 10;
        }
        this.moneyList.unshift(this.selectBalance);
      },
      requestOrder() {
        uni.showLoading({
          title: "\u68C0\u6D4B\u652F\u4ED8\u73AF\u5883..."
        });
        setTimeout(() => {
          this.loading = false;
          uni.hideLoading();
        }, 2e3);
      },
      errorMsg() {
        uni.showModal({
          content: "\u6682\u4E0D\u652F\u6301\u82F9\u679C iap \u652F\u4ED8",
          showCancel: false
        });
      }
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { class: "money column center" }, [
        vue.createElementVNode("text", null, "\u4F59\u989D\uFF1A"),
        vue.createElementVNode("text", null, vue.toDisplayString(parseFloat($setup.balance).toFixed(2)) + "\u5E01", 1)
      ]),
      vue.createElementVNode("view", { class: "recharge" }, [
        vue.createElementVNode("view", null, "\u5145\u503C\uFF1A"),
        vue.createElementVNode("view", { class: "list" }, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($setup.moneyList, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: vue.normalizeClass({ active: index === $setup.activeIndex }),
              key: index,
              onClick: ($event) => $setup.clickItem(index, item)
            }, [
              vue.createElementVNode("view", null, vue.toDisplayString(parseFloat(item).toFixed(2)) + "\u5E01", 1),
              vue.createElementVNode("view", null, "\uFFE5" + vue.toDisplayString(parseFloat(item).toFixed(2)), 1)
            ], 10, ["onClick"]);
          }), 128))
        ])
      ]),
      vue.createElementVNode("view", { class: "desc" }, [
        vue.createElementVNode("view", null, "\u5145\u503C\u8BF4\u660E\uFF1A"),
        vue.createElementVNode("view", null, [
          vue.createTextVNode(" 1.\u5728IOS\u8BBE\u5907\u7684APP\u8981\u8FDB\u884C\u5145\u503C\u540E\uFF0C\u4F7F\u7528\u865A\u62DF\u5E01\u6D88\u8D39\u3002"),
          vue.createElementVNode("br"),
          vue.createTextVNode(" 2.\u5145\u503C\u540E\u4E0D\u80FD\u5728\u975EIOS\u8BBE\u5907\u4F7F\u7528\uFF0C\u4E0E\u5B89\u5353\u7248\u548C\u7F51\u7AD9\u4F59\u989D\u4E0D\u901A\u7528\u3002"),
          vue.createElementVNode("br"),
          vue.createTextVNode(" 3.\u5145\u503C\u540E\u6CA1\u6709\u4F7F\u7528\u671F\u9650\uFF0C\u4F46\u4E0D\u53EF\u63D0\u73B0\u3001\u9000\u6362\u3001\u8F6C\u8BA9\u548C\u7533\u8BF7\u53D1\u7968\u3002"),
          vue.createElementVNode("br"),
          vue.createTextVNode(" 4.\u5982\u9047\u65E0\u6CD5\u5145\u503C\u3001\u5145\u503C\u5931\u8D25\u7B49\u95EE\u9898\uFF0C\u53EF\u5173\u6CE8[\u68A6\u5B66\u8C37]\u516C\u4F17\u53F7\uFF0C\u8054\u7CFB\u6211\u4EEC\u89E3\u51B3\u3002"),
          vue.createElementVNode("br")
        ])
      ]),
      vue.createElementVNode("view", { class: "bottom center" }, [
        vue.createElementVNode("button", {
          class: "btn",
          loading: $setup.loading,
          disabled: $setup.loading,
          onClick: _cache[0] || (_cache[0] = (...args) => $setup.iosPayHandler && $setup.iosPayHandler(...args))
        }, "\u7ACB\u5373\u5145\u503C", 8, ["loading", "disabled"])
      ])
    ]);
  }
  var PagesOrderMyBalance = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9]]);
  const _sfc_main$9 = {
    setup() {
      let { proxy } = vue.getCurrentInstance();
      let orderList = vue.ref([]);
      let isShow = vue.ref(false);
      let balance = vue.ref(0);
      let clickItem = vue.ref(null);
      let price = vue.ref(0);
      let loading = vue.ref(false);
      let isIos = vue.ref(false);
      let payStyle = vue.ref(null);
      vue.onMounted(async () => {
        let sys = uni.getSystemInfoSync().platform;
        if (sys == "ios") {
          isIos.value = true;
        }
        if (isIos.value) {
          payStyle.value = "iospay";
        } else {
          payStyle.value = "wxpay";
        }
        orderList.value = await getOrderList();
      });
      let canPay = vue.computed(() => parseFloat(balance.value) >= parseFloat(price.value));
      let courseIds = vue.computed(() => {
        let courseIdList = [];
        if (clickItem.value.courseList) {
          clickItem.value.courseList.forEach((item) => {
            courseIdList.push(item.id);
          });
        }
        return courseIdList;
      });
      const orderCancel = (item) => {
        proxy.$message.confirm("\u786E\u5B9A\u53D6\u6D88\u8BA2\u5355").then(async () => {
          await cancelOrder(item.id);
          item.status = 3;
          proxy.$message.toast("\u53D6\u6D88\u6210\u529F", "success");
        });
      };
      const orderDelete = (item) => {
        proxy.$message.confirm("\u786E\u5B9A\u5220\u9664\u8BA2\u5355").then(async () => {
          await deleteOrder(item.id);
          orderList.value.splice(orderList.value.indexOf(item), 1);
          proxy.$message.toast("\u5220\u9664\u6210\u529F", "success");
        });
      };
      const orderPayBtn = async (item) => {
        if (isIos.value) {
          loading.value = true;
          balance.value = await getBalance();
          loading.value = false;
        }
        isShow.value = true;
        clickItem.value = item;
        price.value = item.priceDiscount || item.pricePayable;
      };
      const showHidePay = () => {
        isShow.value = false;
      };
      let radioChange = (e) => {
        payStyle.value = e.detail.value;
      };
      const XuNiPay = async (data2) => {
        loading.value = true;
        uni.showLoading({
          title: "\u652F\u4ED8\u4E2D...",
          mask: true
        });
        let res = await orderPay(data2);
        setTimeout(() => {
          uni.hideLoading();
          loading.value = false;
          isShow.value = false;
          if (res.code == 200) {
            clickItem.value.status = 2;
            proxy.$message.toast("\u652F\u4ED8\u6210\u529F", "success");
          } else {
            proxy.$message.toast("\u652F\u4ED8\u5931\u8D25", "error");
          }
        }, 2e3);
      };
      const iosPayHandler = () => {
        if (canPay.value) {
          XuNiPay(courseIds.value);
        } else {
          proxy.navTo("/pages/order/my-balance?params=" + JSON.stringify({ price: price.value }));
        }
      };
      const payHandler = async () => {
        loading.value = true;
        let res = null;
        if (payStyle.value == "wxpay") {
          res = await getWXOrderInfo(courseIds.value);
        } else if (payStyle.value == "alipay") {
          res = await getALOrderInfo(courseIds.value);
        }
        uni.requestPayment({
          provider: payStyle.value,
          orderInfo: res,
          success: (e) => {
            uni.showModal({
              content: "\u652F\u4ED8\u6210\u529F",
              showCancel: false
            });
            clickItem.value.status = 2;
          },
          fail: (err) => {
            uni.showModal({
              content: "\u652F\u4ED8\u5931\u8D25",
              showCancel: false
            });
          },
          complete: () => {
            isShow.value = false;
            loading.value = false;
          }
        });
      };
      return {
        orderList,
        isShow,
        balance,
        price,
        loading,
        canPay,
        isIos,
        payStyle,
        orderCancel,
        orderDelete,
        orderPayBtn,
        showHidePay,
        radioChange,
        iosPayHandler,
        payHandler
      };
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_course_item = resolveEasycom(vue.resolveDynamicComponent("course-item"), __easycom_0$8);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($setup.orderList, (item, index) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          class: "order-item",
          key: index
        }, [
          vue.createElementVNode("view", { class: "base-info" }, [
            vue.createElementVNode("text", null, vue.toDisplayString(item.updateDate), 1),
            vue.createElementVNode("text", null, "\u8BA2\u5355\u53F7\uFF1A" + vue.toDisplayString(item.orderId), 1)
          ]),
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item.courseList, (course, index2) => {
            return vue.openBlock(), vue.createBlock(_component_course_item, {
              key: index2,
              item: course
            }, null, 8, ["item"]);
          }), 128)),
          vue.createElementVNode("view", { class: "shifu" }, [
            vue.createElementVNode("text", null, "\u5B9E\u4ED8\uFF1A"),
            vue.createElementVNode("text", null, "\uFFE5" + vue.toDisplayString(item.priceDiscount || item.pricePayable), 1)
          ]),
          vue.createElementVNode("view", { class: "option center space-between" }, [
            vue.createCommentVNode(" \u8BA2\u5355\u72B6\u6001\uFF1A1\u5F85\u652F\u4ED8\uFF0C2\u4EA4\u6613\u6210\u529F\uFF0C3\u4EA4\u6613\u5173\u95ED "),
            item.status === 1 ? (vue.openBlock(), vue.createElementBlock("text", {
              key: 0,
              class: "red"
            }, "\u5F85\u652F\u4ED8")) : vue.createCommentVNode("v-if", true),
            item.status === 3 ? (vue.openBlock(), vue.createElementBlock("text", {
              key: 1,
              class: "grey"
            }, "\u4EA4\u6613\u5173\u95ED")) : vue.createCommentVNode("v-if", true),
            item.status === 2 ? (vue.openBlock(), vue.createElementBlock("text", {
              key: 2,
              class: "grey"
            }, "\u4EA4\u6613\u6210\u529F")) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("view", null, [
              vue.createCommentVNode(" \r\n					 1\u5F85\u652F\u4ED8: \u53D6\u6D88\u8BA2\u5355/\u7ACB\u5373\u652F\u4ED8\r\n					 2\u4EA4\u6613\u6210\u529F: \u4E0D\u663E\u4EFB\u4F55\u6309\u94AE\r\n					 3\u4EA4\u6613\u5173\u95ED:\u663E\u793A\u5220\u9664\u6309\u94AE\r\n					 "),
              item.status === 1 ? (vue.openBlock(), vue.createElementBlock("button", {
                key: 0,
                onClick: ($event) => $setup.orderCancel(item),
                type: "default",
                size: "mini"
              }, "\u53D6\u6D88\u8BA2\u5355", 8, ["onClick"])) : vue.createCommentVNode("v-if", true),
              item.status === 1 ? (vue.openBlock(), vue.createElementBlock("button", {
                key: 1,
                onClick: ($event) => $setup.orderPayBtn(item),
                style: { "background-color": "#A2CD5A", "color": "#FFFFFF" },
                size: "mini"
              }, "\u7ACB\u5373\u652F\u4ED8", 8, ["onClick"])) : vue.createCommentVNode("v-if", true),
              item.status === 3 ? (vue.openBlock(), vue.createElementBlock("button", {
                key: 2,
                onClick: ($event) => $setup.orderDelete(item),
                type: "warn",
                size: "mini"
              }, "\u5220\u9664\u8BA2\u5355", 8, ["onClick"])) : vue.createCommentVNode("v-if", true)
            ])
          ])
        ]);
      }), 128)),
      vue.createCommentVNode(" \u5E95\u90E8\u5F39\u7A97 "),
      $setup.isShow ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "mask",
        catchtouchmove: true,
        onTouchmove: _cache[0] || (_cache[0] = vue.withModifiers(() => {
        }, ["stop", "prevent"]))
      }, null, 32)) : vue.createCommentVNode("v-if", true),
      $setup.isShow ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "bottom-ios",
        catchtouchmove: true,
        onTouchmove: _cache[5] || (_cache[5] = vue.withModifiers(() => {
        }, ["stop", "prevent"]))
      }, [
        vue.createElementVNode("view", { class: "title center" }, [
          vue.createElementVNode("text", null, "\u786E\u5B9A\u652F\u4ED8"),
          vue.createElementVNode("text", {
            onClick: _cache[1] || (_cache[1] = (...args) => $setup.showHidePay && $setup.showHidePay(...args))
          }, "\u53D6\u6D88")
        ]),
        vue.createElementVNode("view", { class: "price space-between" }, [
          vue.createElementVNode("text", null, "\u652F\u4ED8\u91D1\u989D"),
          vue.createElementVNode("text", null, "\uFFE5" + vue.toDisplayString($setup.price), 1)
        ]),
        vue.createElementVNode("radio-group", {
          onChange: _cache[2] || (_cache[2] = (...args) => $setup.radioChange && $setup.radioChange(...args))
        }, [
          vue.createCommentVNode(" ISO\u7AEF\u663E\u793A\u4E09\u79CD\u652F\u4ED8\u65B9\u5F0F\uFF0Ch5\u663E\u793A\u4E24\u79CD\u652F\u4ED8\u65B9\u5F0F\uFF0C\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u663E\u793A\u4E00\u79CD\u652F\u4ED8\u65B9\u5F0F "),
          $setup.isIos ? (vue.openBlock(), vue.createElementBlock("label", {
            key: 0,
            class: "pay-item center space-between"
          }, [
            vue.createElementVNode("view", { class: "ios" }, [
              vue.createElementVNode("text", null, "\u4F59\u989D\uFF1A"),
              vue.createElementVNode("text", null, vue.toDisplayString($setup.balance) + "\u5E01" + vue.toDisplayString($setup.canPay ? "" : "(\u4F59\u989D\u4E0D\u8DB3)"), 1)
            ]),
            vue.createElementVNode("radio", {
              value: "iospay",
              checked: $setup.payStyle == "iospay",
              style: { "transform": "scale(0.8)" }
            }, null, 8, ["checked"])
          ])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("label", { class: "pay-item center space-between" }, [
            vue.createElementVNode("view", { class: "left center" }, [
              vue.createElementVNode("image", { src: "/static/pay/wxpay.png" }),
              vue.createElementVNode("text", null, "\u5FAE\u4FE1\u652F\u4ED8")
            ]),
            vue.createElementVNode("radio", {
              value: "wxpay",
              checked: $setup.payStyle == "wxpay",
              style: { "transform": "scale(0.8)" }
            }, null, 8, ["checked"])
          ]),
          vue.createElementVNode("label", { class: "pay-item center space-between" }, [
            vue.createElementVNode("view", { class: "left center" }, [
              vue.createElementVNode("image", { src: "/static/pay/alipay.png" }),
              vue.createElementVNode("text", null, "\u652F\u4ED8\u5B9D")
            ]),
            vue.createElementVNode("radio", {
              value: "alipay",
              checked: $setup.payStyle == "alipay",
              style: { "transform": "scale(0.8)" }
            }, null, 8, ["checked"])
          ])
        ], 32),
        $setup.payStyle == "iospay" ? (vue.openBlock(), vue.createElementBlock("button", {
          key: 0,
          class: "btn",
          loading: $setup.loading,
          disabled: $setup.loading,
          onClick: _cache[3] || (_cache[3] = (...args) => $setup.iosPayHandler && $setup.iosPayHandler(...args))
        }, vue.toDisplayString($setup.canPay ? "\u7ACB\u5373\u652F\u4ED8" : "\u5145\u503C\u5E76\u652F\u4ED8"), 9, ["loading", "disabled"])) : vue.createCommentVNode("v-if", true),
        $setup.payStyle == "wxpay" || $setup.payStyle == "alipay" ? (vue.openBlock(), vue.createElementBlock("button", {
          key: 1,
          class: "btn",
          loading: $setup.loading,
          disabled: $setup.loading,
          onClick: _cache[4] || (_cache[4] = (...args) => $setup.payHandler && $setup.payHandler(...args))
        }, "\u7ACB\u5373\u652F\u4ED8", 8, ["loading", "disabled"])) : vue.createCommentVNode("v-if", true),
        $setup.payStyle == null ? (vue.openBlock(), vue.createElementBlock("button", {
          key: 2,
          class: "btn",
          style: { "background-color": "#eee" },
          disabled: true
        }, "\u7ACB\u5373\u652F\u4ED8")) : vue.createCommentVNode("v-if", true)
      ], 32)) : vue.createCommentVNode("v-if", true)
    ]);
  }
  var PagesOrderOrderList = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8]]);
  const _sfc_main$8 = {
    name: "UniTag",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: "default"
      },
      size: {
        type: String,
        default: "normal"
      },
      text: {
        type: String,
        default: ""
      },
      disabled: {
        type: [Boolean, String],
        default: false
      },
      inverted: {
        type: [Boolean, String],
        default: false
      },
      circle: {
        type: [Boolean, String],
        default: false
      },
      mark: {
        type: [Boolean, String],
        default: false
      },
      customStyle: {
        type: String,
        default: ""
      }
    },
    computed: {
      classes() {
        const {
          type,
          disabled,
          inverted,
          circle,
          mark,
          size,
          isTrue
        } = this;
        const classArr = [
          "uni-tag--" + type,
          "uni-tag--" + size,
          isTrue(disabled) ? "uni-tag--disabled" : "",
          isTrue(inverted) ? "uni-tag--" + type + "--inverted" : "",
          isTrue(circle) ? "uni-tag--circle" : "",
          isTrue(mark) ? "uni-tag--mark" : "",
          isTrue(inverted) ? "uni-tag--inverted uni-tag-text--" + type : "",
          size === "small" ? "uni-tag-text--small" : ""
        ];
        return classArr.join(" ");
      }
    },
    methods: {
      isTrue(value) {
        return value === true || value === "true";
      },
      onClick() {
        if (this.isTrue(this.disabled))
          return;
        this.$emit("click");
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return $props.text ? (vue.openBlock(), vue.createElementBlock("text", {
      key: 0,
      class: vue.normalizeClass(["uni-tag", $options.classes]),
      style: vue.normalizeStyle($props.customStyle),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
    }, vue.toDisplayString($props.text), 7)) : vue.createCommentVNode("v-if", true);
  }
  var __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__scopeId", "data-v-1516016e"]]);
  const _sfc_main$7 = {
    components: {
      "uni-tag": __easycom_0
    },
    setup() {
      let { proxy } = vue.getCurrentInstance();
      let providerList = vue.ref([
        { id: "weixin", name: "\u5FAE\u4FE1\u597D\u53CB", sort: 0, icon: "/static/share/weixin.png" },
        { id: "weixin", name: "\u670B\u53CB\u5708", type: "WXSenceTimeline", sort: 1, icon: "/static/share/pengyouquan.png" },
        { id: "sinaweibo", name: "\u65B0\u6D6A\u5FAE\u535A", sort: 2, icon: "/static/share/weibo.png" },
        { id: "qq", name: "QQ\u597D\u53CB", sort: 3, icon: "/static/share/qq.png" },
        { id: "copy", name: "\u590D\u5236\u94FE\u63A5", sort: 4, icon: "/static/share/link.png" }
      ]);
      let id = vue.ref(null);
      let myShare = vue.ref(null);
      let type = ["primary", "success", "warning", "error"];
      let articleDetail = vue.ref({});
      let commentList = vue.ref([]);
      let content = vue.ref("");
      vue.onMounted(async () => {
        articleDetail.value = await getArticleDetail(id.value);
        uni.setNavigationBarTitle({
          title: articleDetail.value.title
        });
        commentList.value = await getArticleComment(id.value);
      });
      const submit = async () => {
        if (content.value.trim() == "") {
          proxy.$message.toast("\u8BC4\u8BBA\u5185\u5BB9\u4E0D\u80FD\u4E3A\u7A7A");
          return;
        }
        if (!proxy.$utils.isLogin())
          return;
        let data2 = {
          "id": 1,
          "parentId": "-1",
          "userId": 1,
          "nickName": "\u5C0F\u660E",
          "userImage": "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F6477f4d1e658b314b5e7d5db2c92306e50c711ef.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto",
          "articleId": id.value,
          "content": content.value,
          "createDate": "2019-04-13 05:54:16"
        };
        commentList.value.unshift(data2);
        await addArticleComment(data2);
        content.value = "";
        proxy.$message.toast("\u53D1\u8868\u6210\u529F", "success");
      };
      onNavigationBarButtonTap((e) => {
        if (e.type = "share") {
          myShare.value.isShow = !myShare.value.isShow;
        }
      });
      return {
        id,
        providerList,
        myShare,
        type,
        articleDetail,
        commentList,
        content,
        submit
      };
    },
    onLoad(option) {
      if (option.id) {
        this.id = option.id;
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_tag = resolveEasycom(vue.resolveDynamicComponent("uni-tag"), __easycom_0);
    const _component_my_share = resolveEasycom(vue.resolveDynamicComponent("my-share"), __easycom_1$1);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createCommentVNode(" \u6807\u7B7E "),
      vue.createElementVNode("view", { class: "example-body" }, [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($setup.articleDetail.labelList, (item, index) => {
          return vue.openBlock(), vue.createElementBlock("view", {
            class: "tag-view",
            key: item.id
          }, [
            vue.createVNode(_component_uni_tag, {
              circle: true,
              inverted: true,
              text: item.name,
              type: $setup.type[index]
            }, null, 8, ["text", "type"])
          ]);
        }), 128))
      ]),
      vue.createElementVNode("view", { class: "content-main" }, [
        vue.createElementVNode("text", { class: "title" }, vue.toDisplayString($setup.articleDetail.title), 1),
        vue.createElementVNode("view", { class: "info" }, [
          vue.createElementVNode("view", { class: "author center" }, [
            vue.createElementVNode("image", {
              src: $setup.articleDetail.userImage
            }, null, 8, ["src"]),
            vue.createElementVNode("text", null, vue.toDisplayString($setup.articleDetail.nickName), 1)
          ]),
          vue.createElementVNode("text", null, " \xB7 " + vue.toDisplayString($setup.articleDetail.updateDate), 1),
          vue.createElementVNode("text", null, " \xB7 " + vue.toDisplayString($setup.articleDetail.viewCount) + "\u4EBA\u9605\u8BFB", 1)
        ]),
        vue.createCommentVNode(" \u6587\u7AE0\u5185\u5BB9 "),
        vue.createElementVNode("text", {
          selectable: "true",
          innerHTML: $setup.articleDetail.htmlContent
        }, null, 8, ["innerHTML"])
      ]),
      vue.createCommentVNode(" \u70ED\u95E8\u8BC4\u8BBA "),
      vue.createElementVNode("view", { class: "footer" }, [
        vue.createElementVNode("view", { class: "comment" }, [
          vue.createElementVNode("view", { class: "footer-header" }, "\u70ED\u95E8\u8BC4\u8BBA"),
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($setup.commentList, (item) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "comment-item row",
              key: item.id
            }, [
              vue.createElementVNode("image", {
                src: item.userImage
              }, null, 8, ["src"]),
              vue.createElementVNode("view", { class: "comment-right" }, [
                vue.createElementVNode("view", { class: "info space-between center" }, [
                  vue.createElementVNode("text", null, vue.toDisplayString(item.nickName), 1),
                  vue.createElementVNode("text", null, vue.toDisplayString(item.createDate), 1)
                ]),
                vue.createElementVNode("text", { class: "content" }, vue.toDisplayString(item.content), 1)
              ])
            ]);
          }), 128))
        ])
      ]),
      vue.createCommentVNode(" \u8BC4\u8BBA\u533A "),
      vue.createElementVNode("view", {
        class: "bottom center",
        onTouchmove: _cache[2] || (_cache[2] = vue.withModifiers(() => {
        }, ["stop", "prevent"]))
      }, [
        vue.withDirectives(vue.createElementVNode("textarea", {
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.content = $event),
          class: "textarea",
          placeholder: "\u6709\u4F55\u9AD8\u89C1,\u5C55\u5F00\u8BB2\u8BB2\u2026\u2026"
        }, null, 512), [
          [vue.vModelText, $setup.content]
        ]),
        vue.createElementVNode("button", {
          class: "btn",
          size: "mini",
          onClick: _cache[1] || (_cache[1] = (...args) => $setup.submit && $setup.submit(...args))
        }, "\u63D0\u4EA4")
      ], 32),
      vue.createCommentVNode(" \u5206\u4EAB\u7EC4\u4EF6 "),
      vue.createVNode(_component_my_share, {
        ref: "myShare",
        shareDate: { title: $setup.articleDetail.title, mainImage: $setup.articleDetail.imageUrl }
      }, null, 8, ["shareDate"])
    ]);
  }
  var PagesTabArticleArticleDetails = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6]]);
  const _sfc_main$6 = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, " \u767B\u5F55\u9875\u9762 ");
  }
  var PagesAuthLogin = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5]]);
  const _sfc_main$5 = {
    components: {
      "uni-tag": __easycom_0
    },
    setup() {
      let { proxy } = vue.getCurrentInstance();
      let id = vue.ref(null);
      let providerList = vue.ref([
        { id: "weixin", name: "\u5FAE\u4FE1\u597D\u53CB", sort: 0, icon: "/static/share/weixin.png" },
        { id: "weixin", name: "\u670B\u53CB\u5708", type: "WXSenceTimeline", sort: 1, icon: "/static/share/pengyouquan.png" },
        { id: "sinaweibo", name: "\u65B0\u6D6A\u5FAE\u535A", sort: 2, icon: "/static/share/weibo.png" },
        { id: "qq", name: "QQ\u597D\u53CB", sort: 3, icon: "/static/share/qq.png" },
        { id: "copy", name: "\u590D\u5236\u94FE\u63A5", sort: 4, icon: "/static/share/link.png" }
      ]);
      let myShare = vue.ref(null);
      let type = ["primary", "success", "warning", "error"];
      let questionDetail = vue.ref({});
      let answerList = vue.ref([]);
      let showAnswer = vue.ref(false);
      let isFocus = vue.ref(0);
      let content = vue.ref("");
      vue.onMounted(async () => {
        questionDetail.value = await getQuestionDetail(id.value);
        uni.setNavigationBarTitle({
          title: questionDetail.value.title
        });
        isFocus.value = questionDetail.value.star;
        answerList.value = await getQuestionAnswerList(id.value);
      });
      const focusClick = async () => {
        await focusQuestion(id.value);
        if (isFocus.value) {
          isFocus.value = 0;
          proxy.$message.toast("\u5DF2\u53D6\u6D88");
        } else {
          isFocus.value = 1;
          proxy.$message.toast("\u5DF2\u5173\u6CE8");
        }
      };
      const answerClick = () => {
        showAnswer.value = true;
      };
      const close = () => {
        showAnswer.value = false;
      };
      const submit = async () => {
        if (content.value.trim() == "") {
          proxy.$message.toast("\u8BC4\u8BBA\u5185\u5BB9\u4E0D\u80FD\u4E3A\u7A7A");
          return;
        }
        if (!proxy.$utils.isLogin())
          return;
        let data2 = {
          "id": 1,
          "parentId": "-1",
          "userId": 1,
          "nickName": "\u5C0F\u660E",
          "userImage": "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F6477f4d1e658b314b5e7d5db2c92306e50c711ef.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto",
          "articleId": id.value,
          "mdContent": content.value,
          "htmlContent": content.value,
          "createDate": "2019-04-13 05:54:16"
        };
        formatAppLog("log", "at pages/tab-question/question-details.vue:170", data2);
        answerList.value.unshift(data2);
        await addQuestionAnswer(data2);
        content.value = "";
        showAnswer.value = false;
        proxy.$message.toast("\u56DE\u7B54\u6210\u529F", "success");
      };
      onNavigationBarButtonTap((e) => {
        if (e.type = "share") {
          myShare.value.isShow = !myShare.value.isShow;
        }
      });
      return {
        id,
        providerList,
        myShare,
        type,
        questionDetail,
        answerList,
        showAnswer,
        isFocus,
        content,
        focusClick,
        answerClick,
        close,
        submit
      };
    },
    onLoad(option) {
      if (option.id) {
        this.id = option.id;
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_tag = resolveEasycom(vue.resolveDynamicComponent("uni-tag"), __easycom_0);
    const _component_my_share = resolveEasycom(vue.resolveDynamicComponent("my-share"), __easycom_1$1);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createCommentVNode(" \u6240\u5C5E\u6807\u7B7E "),
      vue.createElementVNode("view", { class: "tag-list row" }, [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($setup.questionDetail.labelList, (item, index) => {
          return vue.openBlock(), vue.createBlock(_component_uni_tag, {
            key: index,
            text: item.name,
            class: "tag-view",
            type: $setup.type[index],
            size: "small",
            circle: true,
            inverted: true
          }, null, 8, ["text", "type"]);
        }), 128))
      ]),
      vue.createCommentVNode(" \u95EE\u9898\u8BE6\u60C5 "),
      vue.createElementVNode("view", { class: "content-main" }, [
        vue.createElementVNode("text", { class: "title" }, vue.toDisplayString($setup.questionDetail.title), 1),
        vue.createElementVNode("view", { class: "info" }, [
          vue.createElementVNode("view", { class: "author center" }, [
            vue.createElementVNode("image", {
              src: $setup.questionDetail.userImage
            }, null, 8, ["src"]),
            vue.createElementVNode("text", null, vue.toDisplayString($setup.questionDetail.nickName), 1)
          ]),
          vue.createElementVNode("text", null, " \xB7 " + vue.toDisplayString($setup.questionDetail.updateDate), 1)
        ]),
        vue.createCommentVNode(" \u95EE\u9898\u5185\u5BB9 "),
        vue.createElementVNode("text", {
          class: "markdown-body",
          selectable: "true",
          innerHTML: $setup.questionDetail.htmlContent
        }, null, 8, ["innerHTML"])
      ]),
      vue.createCommentVNode(" \u56DE\u7B54 "),
      vue.createElementVNode("view", { class: "footer" }, [
        vue.createElementVNode("view", { class: "comment" }, [
          vue.createElementVNode("view", { class: "footer-header" }, vue.toDisplayString($setup.answerList.length) + "\u4E2A\u56DE\u7B54", 1),
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($setup.answerList, (item) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "comment-item row",
              key: item.id
            }, [
              vue.createElementVNode("image", {
                src: item.userImage
              }, null, 8, ["src"]),
              vue.createElementVNode("view", { class: "comment-right" }, [
                vue.createElementVNode("view", { class: "info space-between center" }, [
                  vue.createElementVNode("text", null, vue.toDisplayString(item.nickName), 1),
                  vue.createElementVNode("text", null, vue.toDisplayString(item.createDate), 1)
                ]),
                vue.createElementVNode("text", {
                  class: "markdown-body content",
                  selectable: "true",
                  innerHTML: item.htmlContent
                }, null, 8, ["innerHTML"])
              ])
            ]);
          }), 128))
        ])
      ]),
      vue.createCommentVNode(" \u5E95\u90E8\u6309\u94AE\uFF1A\u5173\u6CE8\u548C\u8BC4\u8BBA\u6309\u94AE "),
      vue.createElementVNode("view", { class: "question-option row" }, [
        $setup.isFocus ? (vue.openBlock(), vue.createElementBlock("text", {
          key: 0,
          class: "one grey",
          onClick: _cache[0] || (_cache[0] = (...args) => $setup.focusClick && $setup.focusClick(...args))
        }, "\u5DF2\u5173\u6CE8")) : (vue.openBlock(), vue.createElementBlock("text", {
          key: 1,
          class: "one iconfont icon-jiaguanzhu",
          onClick: _cache[1] || (_cache[1] = (...args) => $setup.focusClick && $setup.focusClick(...args))
        }, "\u5173\u6CE8")),
        vue.createElementVNode("text", {
          class: "one iconfont icon-edit",
          onClick: _cache[2] || (_cache[2] = (...args) => $setup.answerClick && $setup.answerClick(...args))
        }, "\u56DE\u7B54\u95EE\u9898")
      ]),
      vue.createCommentVNode(" \u56DE\u7B54\u95EE\u9898\u8F93\u5165\u6846 "),
      $setup.showAnswer ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "answer-box",
        onTouchmove: _cache[7] || (_cache[7] = vue.withModifiers(() => {
        }, ["stop", "prevent"]))
      }, [
        vue.createElementVNode("view", {
          class: "title center",
          onTouchend: _cache[5] || (_cache[5] = vue.withModifiers(() => {
          }, ["prevent"]))
        }, [
          vue.createElementVNode("view", { class: "one" }, [
            vue.createElementVNode("text", {
              class: "iconfont icon-close",
              onTouchend: _cache[3] || (_cache[3] = vue.withModifiers((...args) => $setup.close && $setup.close(...args), ["prevent"]))
            }, null, 32)
          ]),
          vue.createElementVNode("text", { class: "one" }, "\u56DE\u7B54\u95EE\u9898"),
          vue.createElementVNode("button", {
            class: "btn",
            size: "mini",
            onTouchend: _cache[4] || (_cache[4] = vue.withModifiers((...args) => $setup.submit && $setup.submit(...args), ["prevent"]))
          }, "\u63D0\u4EA4", 32)
        ], 32),
        vue.withDirectives(vue.createElementVNode("textarea", {
          "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.content = $event),
          maxlength: "200",
          class: "textarea",
          placeholder: "\u6709\u4F55\u9AD8\u89C1,\u5C55\u5F00\u8BB2\u8BB2\u2026\u2026"
        }, null, 512), [
          [vue.vModelText, $setup.content]
        ])
      ], 32)) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" \u5206\u4EAB\u7EC4\u4EF6 "),
      vue.createVNode(_component_my_share, {
        ref: "myShare",
        shareDate: { title: $setup.questionDetail.title }
      }, null, 8, ["shareDate"])
    ]);
  }
  var PagesTabQuestionQuestionDetails = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4]]);
  var data = [
    [
      {
        title: "\u5141\u8BB8\u975EWIFI\u4E0B\u64AD\u653E",
        event: "setWifiPlay",
        checked: uni.getStorageSync("wifi-play") || false
      },
      {
        title: "\u5141\u8BB8\u975EWIFI\u4E0B\u7F13\u5B58",
        event: "setWifiDownload",
        checked: uni.getStorageSync("wifi-download") || false
      },
      {
        title: "\u89C6\u9891\u81EA\u52A8\u8FDE\u7EED\u64AD\u653E",
        event: "setAutoPlay",
        checked: uni.getStorageSync("auto-play") || false
      }
    ],
    [
      {
        title: "\u6E05\u9664\u5E94\u7528\u7F13\u5B58",
        event: "clearStorage",
        text: uni.getStorageInfoSync().currentSize < 1024 ? uni.getStorageInfoSync().currentSize + "KB" : (uni.getStorageInfoSync().currentSize / 1024).toFixed(2) + "MB"
      }
    ]
  ];
  const _sfc_main$4 = {
    setup() {
      let { proxy } = vue.getCurrentInstance();
      let list = vue.ref(data);
      const changeChecked = (obj, str) => {
        let checked = uni.getStorageSync(str) || false;
        obj.checked = !obj.checked;
        uni.setStorageSync(str, !checked);
      };
      const setWifiPlay = (obj) => {
        changeChecked(obj, "wifi-play");
      };
      const setWifiDownload = (obj) => {
        changeChecked(obj, "wifi-download");
      };
      const setAutoPlay = (obj) => {
        changeChecked(obj, "auto-play");
      };
      const clearStorage = async (obj) => {
        await proxy.$message.confirm("\u786E\u5B9A\u6E05\u695A\u7F13\u5B58?");
        uni.clearStorageSync();
        obj.text = "0KB";
      };
      return {
        list,
        setWifiPlay,
        setWifiDownload,
        setAutoPlay,
        clearStorage
      };
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_my_list = resolveEasycom(vue.resolveDynamicComponent("my-list"), __easycom_0$4);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createVNode(_component_my_list, {
        list: $setup.list,
        onSetWifiPlay: $setup.setWifiPlay,
        onSetWifiDownload: $setup.setWifiDownload,
        onSetAutoPlay: $setup.setAutoPlay,
        onClearStorage: $setup.clearStorage
      }, null, 8, ["list", "onSetWifiPlay", "onSetWifiDownload", "onSetAutoPlay", "onClearStorage"])
    ]);
  }
  var PagesTabMySetting = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3]]);
  const _sfc_main$3 = {
    data() {
      return {};
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, " \u610F\u89C1\u53CD\u9988 ");
  }
  var PagesTabMyFeedback = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2]]);
  const _sfc_main$2 = {
    setup() {
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, " \u5173\u4E8E\u6211\u4EEC ");
  }
  var PagesTabMyAbout = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1]]);
  const _sfc_main$1 = {
    data() {
      return {};
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, " \u6211\u7684\u5B66\u4E60 ");
  }
  var PagesTabMyStudy = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render]]);
  if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
    Promise.prototype.finally = function(callback) {
      const promise = this.constructor;
      return this.then((value) => promise.resolve(callback()).then(() => value), (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      }));
    };
  }
  if (uni && uni.base64ToArrayBuffer) {
    ArrayBuffer = uni.base64ToArrayBuffer("").constructor;
  }
  if (uni.restoreGlobal) {
    uni.restoreGlobal(vue__namespace, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
  }
  __definePage("pages/tab-index/index", PagesTabIndexIndex);
  __definePage("pages/tab-category/category", PagesTabCategoryCategory);
  __definePage("pages/tab-article/article", PagesTabArticleArticle);
  __definePage("pages/tab-question/question", PagesTabQuestionQuestion);
  __definePage("pages/tab-my/my", PagesTabMyMy);
  __definePage("pages/public/public", PagesPublicPublic);
  __definePage("pages/search/search", PagesSearchSearch);
  __definePage("pages/course/course-details", PagesCourseCourseDetails);
  __definePage("pages/course/course-play", PagesCourseCoursePlay);
  __definePage("pages/order/confirm-buy", PagesOrderConfirmBuy);
  __definePage("pages/order/my-balance", PagesOrderMyBalance);
  __definePage("pages/order/order-list", PagesOrderOrderList);
  __definePage("pages/tab-article/article-details", PagesTabArticleArticleDetails);
  __definePage("pages/auth/login", PagesAuthLogin);
  __definePage("pages/tab-question/question-details", PagesTabQuestionQuestionDetails);
  __definePage("pages/tab-my/setting", PagesTabMySetting);
  __definePage("pages/tab-my/feedback", PagesTabMyFeedback);
  __definePage("pages/tab-my/about", PagesTabMyAbout);
  __definePage("pages/tab-my/study", PagesTabMyStudy);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  var mixin = {
    data() {
      return {
        page: 2
      };
    },
    methods: {
      navTo(url, options = {}) {
        if (!url) {
          return;
        }
        if (options.login && !this.$store.getters.hasLogin) {
          url = "/pages/auth/login";
        }
        uni.navigateTo({
          url
        });
      },
      navBack(delta = 1) {
        uni.navigateBack({
          delta
        });
      }
    }
  };
  const msg = (title = "", param = {}) => {
    if (!title)
      return;
    uni.showToast({
      title,
      duration: param.duration || 1500,
      mask: param.mask || false,
      icon: param.icon || "none"
    });
  };
  const isLogin = (toast = true) => {
    const token = uni.getStorageSync("educationToken");
    if (token) {
      return true;
    }
    if (toast) {
      uni.showModal({
        content: "\u8BF7\u767B\u5F55\u540E\u518D\u64CD\u4F5C",
        showCancel: true,
        success: (e) => {
          if (e.confirm) {
            uni.navigateTo({
              url: "/pages/auth/login"
            });
          }
        }
      });
    }
    return false;
  };
  let _throttleRunning = false;
  const throttle = (fn, delay = 500) => {
    if (_throttleRunning) {
      return;
    }
    _throttleRunning = true;
    setTimeout(() => {
      fn();
      _throttleRunning = false;
    }, delay);
  };
  const routePath = () => {
    const pages = getCurrentPages();
    const page = pages[pages.length - 1];
    const query = page.$page.options || page.$route.query;
    let queryStr = "";
    query && Object.keys(query).forEach((key) => {
      queryStr += `${key}=${query[key]}`;
    });
    return queryStr ? `${page.route}?${queryStr}` : page.route;
  };
  const checkStr = (str, type) => {
    switch (type) {
      case "mobile":
        return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
      case "tel":
        return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
      case "card":
        return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
      case "mobileCode":
        return /^[0-9]{6}$/.test(str);
      case "pwd":
        return /^([a-zA-Z0-9_]){6,18}$/.test(str);
      case "payPwd":
        return /^[0-9]{6}$/.test(str);
      case "postal":
        return /[1-9]\d{5}(?!\d)/.test(str);
      case "QQ":
        return /^[1-9][0-9]{4,9}$/.test(str);
      case "weixin":
        return /^[a-zA-Z][a-zA-Z\d_-]{5,19}$/.test(str);
      case "email":
        return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
      case "money":
        return /^\d*(?:\.\d{0,2})?$/.test(str);
      case "URL":
        return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str);
      case "IP":
        return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
      case "date":
        return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str);
      case "number":
        return /^[0-9]$/.test(str);
      case "english":
        return /^[a-zA-Z]+$/.test(str);
      case "chinese":
        return /^[\\u4E00-\\u9FA5]+$/.test(str);
      case "lower":
        return /^[a-z]+$/.test(str);
      case "upper":
        return /^[A-Z]+$/.test(str);
      case "HTML":
        return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
      default:
        return true;
    }
  };
  const dateFormat = (date) => {
    if (!date)
      return "";
    let $this = new Date(date) == "Invalid Date" ? new Date(date.replace(/-/g, "/")) : new Date(date);
    var timestamp = parseInt(Date.parse($this)) / 1e3;
    function zeroize(num) {
      return (String(num).length == 1 ? "0" : "") + num;
    }
    var curTimestamp = parseInt(new Date().getTime() / 1e3);
    var timestampDiff = curTimestamp - timestamp;
    var curDate = new Date(curTimestamp * 1e3);
    var tmDate = new Date(timestamp * 1e3);
    var Y = tmDate.getFullYear(), m = tmDate.getMonth() + 1, d = tmDate.getDate();
    var H = tmDate.getHours(), i = tmDate.getMinutes(), s = tmDate.getSeconds();
    if (timestampDiff < 60) {
      return "\u521A\u521A";
    } else if (timestampDiff < 3600) {
      return Math.floor(timestampDiff / 60) + "\u5206\u949F\u524D";
    } else if (curDate.getFullYear() == Y && curDate.getMonth() + 1 == m && curDate.getDate() == d) {
      return "\u4ECA\u5929 " + zeroize(H) + ":" + zeroize(i) + ":" + zeroize(s);
    } else {
      var newDate = new Date((curTimestamp - 86400) * 1e3);
      if (newDate.getFullYear() == Y && newDate.getMonth() + 1 == m && newDate.getDate() == d) {
        return "\u6628\u5929 " + zeroize(H) + ":" + zeroize(i) + ":" + zeroize(s);
      } else if (curDate.getFullYear() == Y) {
        return zeroize(m) + "\u6708" + zeroize(d) + "\u65E5";
      } else {
        return Y + "\u5E74" + zeroize(m) + "\u6708" + zeroize(d) + "\u65E5";
      }
    }
  };
  function format(date, format2 = "yyyy-MM-dd hh:mm:ss") {
    if (!date)
      return "";
    let $this = new Date(date) == "Invalid Date" ? new Date(date.substr(0, 19)) : new Date(date);
    let o = {
      "M+": $this.getMonth() + 1,
      "d+": $this.getDate(),
      "h+": $this.getHours(),
      "m+": $this.getMinutes(),
      "s+": $this.getSeconds(),
      "q+": Math.floor(($this.getMonth() + 3) / 3),
      "S": $this.getMilliseconds()
    };
    if (/(y+)/.test(format2)) {
      format2 = format2.replace(RegExp.$1, ($this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(format2)) {
        format2 = format2.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      }
    }
    return format2;
  }
  var utils = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    [Symbol.toStringTag]: "Module",
    msg,
    isLogin,
    throttle,
    routePath,
    checkStr,
    dateFormat,
    format
  });
  let HOST_H5 = "http://localhost:3000/#/";
  {
    formatAppLog("log", "at config/env.js:6", "\u5F00\u53D1\u73AF\u5883");
  }
  var env = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    [Symbol.toStringTag]: "Module",
    HOST_H5
  });
  function createApp() {
    const app = vue.createVueApp(_sfc_main);
    app.config.globalProperties.$message = message;
    app.config.globalProperties.$request = request;
    app.config.globalProperties.$utils = utils;
    app.config.globalProperties.$env = env;
    app.mixin(mixin);
    return {
      app
    };
  }
  const __app__ = createApp().app;
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.use(uni.__vuePlugin).mount("#app");
})(Vue);
