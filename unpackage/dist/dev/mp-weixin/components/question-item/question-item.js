"use strict";
var utils_format = require("../../utils/format.js");
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    item: {
      type: Object,
      default: () => ({
        id: 1,
        title: "\u68A6\u8001\u5E08\u60A8\u597D\uFF0C\u6D4B\u8BD5\u5237\u65B0\u4EE4\u724C\uFF0C\u70B9\u51FB\u6D4F\u89C8\u5668\u5237\u65B0\u6309\u94AE\u65E0\u6CD5\u89E6\u53D1axios\u7684\u54CD\u5E94\u62E6\u622A",
        reply: 199,
        viewCount: 1e3,
        nickName: "\u68A6\u5C0F\u4E8C",
        updateDate: new Date()
      })
    }
  },
  setup() {
    return {
      formatCount: utils_format.formatCount
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($props.item.title),
    b: common_vendor.t($setup.formatCount($props.item.reply)),
    c: common_vendor.t($setup.formatCount($props.item.viewCount)),
    d: common_vendor.t($props.item.nickName),
    e: common_vendor.t(_ctx.$utils.dateFormat($props.item.updateDate)),
    f: common_vendor.o(($event) => _ctx.navTo(`/pages/tab-question/question-details?id=${$props.item.id}`))
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
