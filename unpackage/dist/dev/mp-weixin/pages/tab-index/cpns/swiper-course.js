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
    column: {
      type: Number,
      default: 2
    },
    row: {
      type: Number,
      default: 4
    },
    courseData: {
      type: Array,
      default: () => []
    },
    params: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    let { proxy } = common_vendor.getCurrentInstance();
    let clickAll = () => {
      let params = JSON.stringify(props.params);
      proxy.navTo("/pages/search/search?data=" + params);
    };
    return {
      clickAll
    };
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
    a: common_vendor.f($props.column, (col, index, i0) => {
      return {
        a: common_vendor.f($props.courseData.slice(index * $props.row, (index + 1) * $props.row), (item, k1, i1) => {
          return {
            a: item.id,
            b: "67a96d22-1-" + i0 + "-" + i1 + ",67a96d22-0",
            c: common_vendor.p({
              item
            })
          };
        }),
        b: col
      };
    }),
    b: `${200 * $props.row}rpx`,
    c: common_vendor.o($setup.clickAll),
    d: common_vendor.p({
      title: $props.title,
      word: $props.word,
      all: $props.all
    })
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
