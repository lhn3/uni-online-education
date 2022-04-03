"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  setup() {
    let url = common_vendor.ref("");
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
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $setup.open($setup.url)
  }, $setup.open($setup.url) ? {
    b: $setup.url
  } : {
    c: common_vendor.t($setup.url)
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
