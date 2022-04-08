"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  setup(props, { emit }) {
    let handelClick = () => {
      emit("toSearch");
    };
    return {
      handelClick
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $setup.handelClick && $setup.handelClick(...args))
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
