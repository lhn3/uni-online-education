"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  props: {
    btnText: {
      type: String,
      default: "\u9ED8\u8BA4\u6309\u94AE"
    },
    courseId: [String, Number]
  },
  setup(props, { emit }) {
    const clickHandler = () => {
      emit("clickBottom");
    };
    return {
      clickHandler
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($props.btnText),
    b: common_vendor.o((...args) => $setup.clickHandler && $setup.clickHandler(...args))
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
