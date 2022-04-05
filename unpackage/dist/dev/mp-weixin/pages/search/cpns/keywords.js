"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  emits: ["changeContent"],
  props: {
    historyWord: {
      type: String,
      default: ""
    }
  },
  setup(props, { emit }) {
    let hotWords = common_vendor.ref(["Python", "Java", "Web\u524D\u7AEF", "\u5C0F\u7A0B\u5E8F", "uniapp", "js\u9AD8\u7EA7", "\u7B97\u6CD5"]);
    let historyWords = common_vendor.ref([]);
    common_vendor.onMounted(() => {
      historyWords.value = [...common_vendor.index.getStorageSync("historyWords")];
    });
    common_vendor.watch(() => props.historyWord, (newValue) => {
      if (historyWords.value.indexOf(newValue) != -1) {
        for (let i = 0; i < historyWords.value.length; i++) {
          if (historyWords.value[i] == newValue) {
            historyWords.value.splice(i, 1);
          }
        }
      }
      historyWords.value.unshift(newValue);
      common_vendor.index.setStorageSync("historyWords", historyWords.value);
    });
    const clickWord = (word) => {
      emit("changeContent", word);
    };
    const clearHistory = () => {
      historyWords.value = [];
      common_vendor.index.removeStorageSync("historyWords");
    };
    return {
      hotWords,
      historyWords,
      clickWord,
      clearHistory
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($setup.hotWords, (item, k0, i0) => {
      return {
        a: common_vendor.t(item),
        b: item,
        c: common_vendor.o(($event) => $setup.clickWord(item))
      };
    }),
    b: $setup.historyWords.length > 0
  }, $setup.historyWords.length > 0 ? {
    c: common_vendor.o((...args) => $setup.clearHistory && $setup.clearHistory(...args))
  } : {}, {
    d: common_vendor.f($setup.historyWords, (item, k0, i0) => {
      return {
        a: common_vendor.t(item),
        b: item,
        c: common_vendor.o(($event) => $setup.clickWord(item))
      };
    })
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
