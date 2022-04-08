"use strict";
var common_vendor = require("../../../common/vendor.js");
var utils_format = require("../../../utils/format.js");
const _sfc_main = {
  props: {
    course: {
      type: Object,
      default: () => ({})
    }
  },
  setup() {
    return {
      formatCount: utils_format.formatCount
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.course.mainImage,
    b: $props.course.isFree
  }, $props.course.isFree ? {} : common_vendor.e({
    c: $props.course.priceDiscount
  }, $props.course.priceDiscount ? {
    d: common_vendor.t($props.course.priceDiscount)
  } : {}, {
    e: common_vendor.t($props.course.priceOriginal),
    f: $props.course.priceDiscount ? 1 : "",
    g: $props.course.priceDiscount
  }, $props.course.priceDiscount ? {} : {}), {
    h: common_vendor.t($props.course.title),
    i: common_vendor.t($props.course.goodRate),
    j: common_vendor.t($setup.formatCount($props.course.studyTotal))
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
