"use strict";
var common_vendor = require("../../common/vendor.js");
const uniSearchBar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const keywords = () => "./cpns/keywords.js";
const downBar = () => "./cpns/down-bar.js";
const _sfc_main = {
  components: {
    "uni-search-bar": uniSearchBar,
    "keywords": keywords,
    "down-bar": downBar
  },
  setup() {
    const { proxy } = common_vendor.getCurrentInstance();
    let params = common_vendor.ref({});
    let content = common_vendor.ref("");
    let focuse = common_vendor.ref(false);
    let historyWord = common_vendor.ref();
    let showWords = common_vendor.ref(false);
    let tabs = common_vendor.ref([
      { id: 1, name: "\u8BFE\u7A0B" },
      { id: 2, name: "\u6587\u7AE0" },
      { id: 3, name: "\u95EE\u7B54" }
    ]);
    const doSearch = () => {
      if (content.value == "") {
        proxy.$message.toast("\u8BF7\u8F93\u5165\u641C\u7D22\u5185\u5BB9");
      } else {
        console.log("\u641C\u7D22\u5185\u5BB9:" + content.value);
        common_vendor.index.showLoading();
        historyWord.value = content.value;
        showWords.value = false;
        setTimeout(() => {
          common_vendor.index.hideLoading();
        }, 1e3);
      }
    };
    common_vendor.onNavigationBarButtonTap((e) => {
      doSearch();
    });
    common_vendor.onNavigationBarSearchInputChanged((e) => {
      content.value = e.text;
    });
    const inputChange = (e) => {
      console.log("\u76D1\u542C\u8F93\u5165\u6846\u6539\u53D8", e);
    };
    const changeContent = (value) => {
      content.value = value;
      doSearch();
    };
    let changeTab = (id) => {
      console.log("\u70B9\u51FB\u4E86" + id);
    };
    return {
      params,
      content,
      focuse,
      historyWord,
      showWords,
      tabs,
      doSearch,
      inputChange,
      changeContent,
      changeTab
    };
  },
  onLoad(option) {
    if (option.data) {
      let data = JSON.parse(option.data);
      this.content = data.name;
      this.focuse = false;
      this.doSearch();
    } else {
      this.focuse = true;
    }
  }
};
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _component_keywords = common_vendor.resolveComponent("keywords");
  const _easycom_tab_bar2 = common_vendor.resolveComponent("tab-bar");
  const _component_down_bar = common_vendor.resolveComponent("down-bar");
  (_easycom_uni_search_bar2 + _component_keywords + _easycom_tab_bar2 + _component_down_bar)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_tab_bar = () => "../../components/tab-bar/tab-bar.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_tab_bar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($setup.doSearch),
    b: common_vendor.o($setup.inputChange),
    c: common_vendor.o(($event) => $setup.content = $event),
    d: common_vendor.p({
      focus: $setup.focuse,
      radius: 100,
      placeholder: "\u8BF7\u8F93\u5165\u641C\u7D22\u5185\u5BB9",
      modelValue: $setup.content
    }),
    e: common_vendor.o($setup.changeContent),
    f: $setup.showWords,
    g: common_vendor.p({
      historyWord: $setup.historyWord
    }),
    h: !$setup.showWords
  }, !$setup.showWords ? {
    i: common_vendor.o($setup.changeTab),
    j: common_vendor.p({
      tabs: $setup.tabs
    }),
    k: common_vendor.f(100, (i, k0, i0) => {
      return {
        a: common_vendor.t(i)
      };
    })
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
