"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  props: {
    detailUrls: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    let loading = common_vendor.ref(true);
    let current = common_vendor.ref(0);
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
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($props.detailUrls, (url, index, i0) => {
      return {
        a: index,
        b: url
      };
    }),
    b: common_vendor.o((...args) => $setup.load && $setup.load(...args)),
    c: $setup.loading && $props.detailUrls.length != 0
  }, $setup.loading && $props.detailUrls.length != 0 ? {} : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
