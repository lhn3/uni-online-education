"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    desc: {
      type: String,
      default: "\u6682\u65E0\u6570\u636E"
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($props.desc)
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
