"use strict";
var common_vendor = require("../../../common/vendor.js");
const category = () => "../../tab-category/category2.js";
const _sfc_main = {
  components: { category },
  setup() {
  }
};
if (!Array) {
  const _component_category = common_vendor.resolveComponent("category");
  _component_category();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({}, {}, {}, {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
