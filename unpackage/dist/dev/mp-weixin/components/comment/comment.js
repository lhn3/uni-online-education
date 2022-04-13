"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    comment: {
      type: Object,
      default: () => ({})
    },
    descArr: {
      type: Array,
      default: () => [
        "\u6781\u5DEE,\u8BFE\u7A0B\u5F88\u7CDF\u7CD5\uFF0C\u6211\u8981\u5410\u69FD\u3002",
        "\u5DEE,\u6211\u5BF9\u8BFE\u7A0B\u4E0D\u6EE1\u610F\u3002",
        "\u4E2D\u8BC4,\u8BFE\u7A0B\u4E00\u822C\u3002",
        "\u826F\u597D,\u8BFE\u7A0B\u8FD8\u53EF\u4EE5\u3002",
        "\u63A8\u8350,\u8BFE\u7A0B\u975E\u5E38\u68D2\u3002"
      ]
    }
  },
  setup(props, { emit }) {
    let { proxy } = common_vendor.getCurrentInstance();
    let isShow = common_vendor.ref(false);
    let state = common_vendor.ref({
      userId: null,
      nickName: "",
      userImage: "",
      content: "",
      score: 5
    });
    common_vendor.onMounted(() => {
      state.value = __spreadValues({}, props.comment);
    });
    const show = () => {
      isShow.value = false;
    };
    let changeRate = (value) => {
      state.value.score = value.value;
    };
    let submitComment = () => {
      console.log(state.value);
      emit("submit", state.value);
      proxy.$message.toast("\u53D1\u8868\u6210\u529F", "success");
      isShow.value = false;
      state.score = 5;
      state.content = "";
    };
    return {
      isShow,
      state,
      show,
      changeRate,
      submitComment
    };
  }
};
if (!Array) {
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  _easycom_uni_rate2();
}
const _easycom_uni_rate = () => "../uni-rate/uni-rate.js";
if (!Math) {
  _easycom_uni_rate();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $setup.isShow
  }, $setup.isShow ? {
    b: common_vendor.o((...args) => $setup.show && $setup.show(...args)),
    c: common_vendor.o(() => {
    })
  } : {}, {
    d: $setup.isShow
  }, $setup.isShow ? {
    e: common_vendor.o($setup.changeRate),
    f: common_vendor.p({
      size: 22,
      value: $setup.state.score
    }),
    g: common_vendor.t($props.descArr[$setup.state.score - 1]),
    h: $setup.state.content,
    i: common_vendor.o(($event) => $setup.state.content = $event.detail.value),
    j: common_vendor.o((...args) => $setup.submitComment && $setup.submitComment(...args))
  } : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
