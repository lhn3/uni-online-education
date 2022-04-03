"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  props: {
    title: {
      type: String,
      default: "\u9ED8\u8BA4\u6807\u9898"
    },
    word: {
      type: String,
      default: ""
    },
    all: {
      type: Boolean,
      default: false
    },
    courseData: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    return {};
  }
};
if (!Array) {
  const _easycom_course_item2 = common_vendor.resolveComponent("course-item");
  const _easycom_list_box2 = common_vendor.resolveComponent("list-box");
  (_easycom_course_item2 + _easycom_list_box2)();
}
const _easycom_course_item = () => "../../../components/course-item/course-item.js";
const _easycom_list_box = () => "../../../components/list-box/list-box.js";
if (!Math) {
  (_easycom_course_item + _easycom_list_box)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.courseData.slice(0, 6), (item, k0, i0) => {
      return {
        a: "69eb980c-1-" + i0 + ",69eb980c-0",
        b: common_vendor.p({
          isColumn: true,
          item
        }),
        c: item.id
      };
    }),
    b: common_vendor.p({
      title: $props.title,
      word: $props.word,
      all: $props.all
    })
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
