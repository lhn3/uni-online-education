"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  setup(props, { emit }) {
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: _ctx.scrollLeft
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
