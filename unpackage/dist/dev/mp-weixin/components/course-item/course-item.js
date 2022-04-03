"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    isColumn: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: () => ({
        id: 1,
        title: "\u9ED8\u8BA4\u6807\u9898",
        mainImage: "../../static/images/banner1.jpg",
        totalTime: 123456,
        nickName: "\u82CD\u8001\u5E08",
        isFree: 0,
        priceDiscount: 99,
        priceOriginal: 198,
        studyTotal: 100
      })
    }
  },
  setup() {
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.item.mainImage,
    b: common_vendor.t($props.item.totalTime),
    c: common_vendor.t($props.item.title),
    d: common_vendor.t($props.item.nickName),
    e: $props.item.isFree
  }, $props.item.isFree ? {} : {
    f: common_vendor.t($props.item.priceDiscount || $props.item.priceOriginal)
  }, {
    g: common_vendor.t($props.item.studyTotal),
    h: $props.isColumn ? 1 : ""
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
