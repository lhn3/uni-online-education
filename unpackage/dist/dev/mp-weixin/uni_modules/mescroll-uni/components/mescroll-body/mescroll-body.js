"use strict";
var common_vendor = require("../../../../common/vendor.js");
var wxs_wxs_vue_type_wxs_index_0_src_name_wxsBiz_lang = require("../../../../wxs.wxs_vue_type_wxs_index_0_src_name_wxsBiz_lang.js");
var uni_modules_mescrollUni_components_mescrollUni_mescrollUniOption = require("../mescroll-uni/mescroll-uni-option.js");
var uni_modules_mescrollUni_components_mescrollUni_mescrollI18n = require("../mescroll-uni/mescroll-i18n.js");
var uni_modules_mescrollUni_components_mescrollUni_wxs_mixins = require("../mescroll-uni/wxs/mixins.js");
const MescrollTop = () => "../mescroll-uni/components/mescroll-top.js";
const _sfc_main = {
  name: "mescroll-body",
  mixins: [uni_modules_mescrollUni_components_mescrollUni_wxs_mixins.WxsMixin],
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
      return num ? common_vendor.index.upx2px(Number(num)) : 0;
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
    let i18nType = uni_modules_mescrollUni_components_mescrollUni_mescrollI18n.mescrollI18n.getType();
    let i18nOption = { type: i18nType };
    wxs_wxs_vue_type_wxs_index_0_src_name_wxsBiz_lang.MeScroll.extend(i18nOption, vm.i18n);
    wxs_wxs_vue_type_wxs_index_0_src_name_wxsBiz_lang.MeScroll.extend(i18nOption, uni_modules_mescrollUni_components_mescrollUni_mescrollUniOption.GlobalOption.i18n);
    wxs_wxs_vue_type_wxs_index_0_src_name_wxsBiz_lang.MeScroll.extend(diyOption, i18nOption[i18nType]);
    wxs_wxs_vue_type_wxs_index_0_src_name_wxsBiz_lang.MeScroll.extend(diyOption, { down: uni_modules_mescrollUni_components_mescrollUni_mescrollUniOption.GlobalOption.down, up: uni_modules_mescrollUni_components_mescrollUni_mescrollUniOption.GlobalOption.up });
    let myOption = JSON.parse(JSON.stringify({ down: vm.down, up: vm.up }));
    wxs_wxs_vue_type_wxs_index_0_src_name_wxsBiz_lang.MeScroll.extend(myOption, diyOption);
    vm.mescroll = new wxs_wxs_vue_type_wxs_index_0_src_name_wxsBiz_lang.MeScroll(myOption, true);
    vm.mescroll.i18n = i18nOption;
    vm.$emit("init", vm.mescroll);
    const sys = common_vendor.index.getSystemInfoSync();
    if (sys.windowHeight)
      vm.windowHeight = sys.windowHeight;
    if (sys.windowBottom)
      vm.windowBottom = sys.windowBottom;
    if (sys.statusBarHeight)
      vm.statusBarHeight = sys.statusBarHeight;
    vm.mescroll.setBodyHeight(sys.windowHeight);
    vm.mescroll.resetScrollTo((y, t) => {
      if (typeof y === "string") {
        setTimeout(() => {
          let selector;
          if (y.indexOf("#") == -1 && y.indexOf(".") == -1) {
            selector = "#" + y;
          } else {
            selector = y;
          }
          common_vendor.index.createSelectorQuery().select(selector).boundingClientRect(function(rect) {
            if (rect) {
              let top = rect.top;
              top += vm.mescroll.getScrollTop();
              common_vendor.index.pageScrollTo({
                scrollTop: top,
                duration: t
              });
            } else {
              console.error(selector + " does not exist");
            }
          }).exec();
        }, 30);
      } else {
        common_vendor.index.pageScrollTo({
          scrollTop: y,
          duration: t
        });
      }
    });
    if (vm.up && vm.up.toTop && vm.up.toTop.safearea != null)
      ;
    else {
      vm.mescroll.optUp.toTop.safearea = vm.safearea;
    }
    common_vendor.index.$on("setMescrollGlobalOption", (options) => {
      if (!options)
        return;
      let i18nType2 = options.i18n ? options.i18n.type : null;
      if (i18nType2 && vm.mescroll.i18n.type != i18nType2) {
        vm.mescroll.i18n.type = i18nType2;
        uni_modules_mescrollUni_components_mescrollUni_mescrollI18n.mescrollI18n.setType(i18nType2);
        wxs_wxs_vue_type_wxs_index_0_src_name_wxsBiz_lang.MeScroll.extend(options, vm.mescroll.i18n[i18nType2]);
      }
      if (options.down) {
        let down = wxs_wxs_vue_type_wxs_index_0_src_name_wxsBiz_lang.MeScroll.extend({}, options.down);
        vm.mescroll.optDown = wxs_wxs_vue_type_wxs_index_0_src_name_wxsBiz_lang.MeScroll.extend(down, vm.mescroll.optDown);
      }
      if (options.up) {
        let up = wxs_wxs_vue_type_wxs_index_0_src_name_wxsBiz_lang.MeScroll.extend({}, options.up);
        vm.mescroll.optUp = wxs_wxs_vue_type_wxs_index_0_src_name_wxsBiz_lang.MeScroll.extend(up, vm.mescroll.optUp);
      }
    });
  },
  destroyed() {
    common_vendor.index.$off("setMescrollGlobalOption");
  }
};
if (!Array) {
  const _easycom_mescroll_empty2 = common_vendor.resolveComponent("mescroll-empty");
  const _component_mescroll_top = common_vendor.resolveComponent("mescroll-top");
  (_easycom_mescroll_empty2 + _component_mescroll_top)();
}
const _easycom_mescroll_empty = () => "../mescroll-empty/mescroll-empty.js";
if (!Math) {
  _easycom_mescroll_empty();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.topbar && $data.statusBarHeight
  }, $props.topbar && $data.statusBarHeight ? {
    b: $data.statusBarHeight + "px",
    c: $props.topbar
  } : {}, {
    d: $data.mescroll.optDown.use
  }, $data.mescroll.optDown.use ? {
    e: $options.isDownLoading ? 1 : "",
    f: $data.mescroll.optDown.textColor,
    g: $options.downRotate,
    h: common_vendor.t($options.downText),
    i: $data.mescroll.optDown.bgColor,
    j: $data.mescroll.optDown.textColor
  } : {}, {
    k: $data.isShowEmpty
  }, $data.isShowEmpty ? {
    l: common_vendor.o($options.emptyClick),
    m: common_vendor.p({
      option: $data.mescroll.optUp.empty
    })
  } : {}, {
    n: $data.mescroll.optUp.use && !$options.isDownLoading && $data.upLoadType !== 3
  }, $data.mescroll.optUp.use && !$options.isDownLoading && $data.upLoadType !== 3 ? common_vendor.e({
    o: $data.mescroll.optUp.textColor,
    p: common_vendor.t($data.mescroll.optUp.textLoading),
    q: $data.upLoadType === 1,
    r: $data.upLoadType === 2
  }, $data.upLoadType === 2 ? {
    s: common_vendor.t($data.mescroll.optUp.textNoMore)
  } : {}, {
    t: $data.mescroll.optUp.bgColor,
    v: $data.mescroll.optUp.textColor
  }) : {}, {
    w: $options.translateY,
    x: $options.transition,
    y: _ctx.callProp,
    z: $props.safearea
  }, $props.safearea ? {} : {}, {
    A: common_vendor.o($options.toTopClick),
    B: common_vendor.o(($event) => $data.isShowToTop = $event),
    C: common_vendor.p({
      option: $data.mescroll.optUp.toTop,
      modelValue: $data.isShowToTop
    }),
    D: _ctx.renderBiz.propObserver,
    E: _ctx.wxsProp,
    F: $props.sticky ? 1 : "",
    G: $options.minHeight,
    H: $options.padTop,
    I: $options.padBottom,
    J: _ctx.wxsProp
  });
}
if (typeof wxs_wxs_vue_type_wxs_index_0_src_name_wxsBiz_lang.block0 === "function")
  wxs_wxs_vue_type_wxs_index_0_src_name_wxsBiz_lang.block0(_sfc_main);
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
