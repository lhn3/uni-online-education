"use strict";
var common_vendor = require("../../common/vendor.js");
const __default__ = {
  props: {
    banners: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    let background = common_vendor.ref("#254284");
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
  common_vendor.useCssVars((_ctx) => ({
    "3f833c78-background": _ctx.background
  }));
};
const __setup__ = __default__.setup;
__default__.setup = __setup__ ? (props, ctx) => {
  __injectCSSVars__();
  return __setup__(props, ctx);
} : __injectCSSVars__;
const _sfc_main = __default__;
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.banners, (item, k0, i0) => {
      return {
        a: item.imageUrl,
        b: item.id,
        c: common_vendor.o(($event) => _ctx.navTo(item.advertUrl), item.id)
      };
    }),
    b: common_vendor.o((...args) => $setup.change && $setup.change(...args))
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3f833c78"]]);
wx.createComponent(Component);
