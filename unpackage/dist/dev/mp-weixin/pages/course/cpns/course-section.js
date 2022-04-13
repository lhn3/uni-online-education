"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  props: {
    isBuy: Boolean,
    isFree: Number,
    chapterList: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit }) {
    let actSect = common_vendor.ref("");
    common_vendor.reactive({
      parentIndex: 0,
      childIndex: 0
    });
    let handleClick = (section, parentIndex, childIndex) => {
      if ((section.isFree || props.isFree) && !props.isBuy) {
        actSect.value = section.name;
      }
      emit("openVideo", { section, parentIndex, childIndex });
    };
    return {
      actSect,
      handleClick
    };
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
            c: (section.isFree || $props.isFree) && !$props.isBuy
          }, (section.isFree || $props.isFree) && !$props.isBuy ? {} : $props.isBuy ? {} : {}, {
            d: $setup.actSect == section.name ? 1 : "",
            e: index2,
            f: common_vendor.o(($event) => $setup.handleClick(section, index, index2))
          });
        }),
        d: common_vendor.t(index + 1),
        e: index
      };
    }),
    b: $props.isBuy
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
