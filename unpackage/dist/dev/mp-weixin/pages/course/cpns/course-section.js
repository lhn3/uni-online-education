"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  props: {
    chapterList: {
      type: Array,
      default: () => []
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.chapterList, (chapter, index, i0) => {
      return {
        a: common_vendor.t(index + 1),
        b: common_vendor.t(chapter.name),
        c: common_vendor.f(chapter.sectionList, (section, index2, i1) => {
          return common_vendor.e({
            a: common_vendor.t(index2 + 1),
            b: common_vendor.t(section.name),
            c: section.isFree
          }, section.isFree ? {} : {}, {
            d: index2
          });
        }),
        d: common_vendor.t(index + 1),
        e: index
      };
    })
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
