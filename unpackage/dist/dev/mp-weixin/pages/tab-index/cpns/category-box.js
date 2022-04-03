"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  props: {
    categoryList: {
      type: Array,
      default: () => []
    }
  },
  setup() {
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.categoryList.slice(0, 7), (item, k0, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: item.id
      };
    })
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
