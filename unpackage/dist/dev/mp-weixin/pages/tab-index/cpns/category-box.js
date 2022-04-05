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
    let { proxy } = common_vendor.getCurrentInstance();
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
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.categoryList.slice(0, 7), (item, k0, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: item.id,
        c: common_vendor.o(($event) => $setup.toSearch(item.id, item.name), item.id)
      };
    }),
    b: common_vendor.o((...args) => $setup.toAllCategory && $setup.toAllCategory(...args))
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
