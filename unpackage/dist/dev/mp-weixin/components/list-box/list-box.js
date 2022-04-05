"use strict";
var common_vendor = require("../../common/vendor.js");
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
    }
  },
  setup(props, { emit }) {
    let handleClick = () => {
      emit("clickAll");
    };
    return {
      handleClick
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($props.title),
    b: $props.word
  }, $props.word ? {
    c: common_vendor.t($props.word)
  } : {}, {
    d: $props.all
  }, $props.all ? {
    e: common_vendor.o((...args) => $setup.handleClick && $setup.handleClick(...args))
  } : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
