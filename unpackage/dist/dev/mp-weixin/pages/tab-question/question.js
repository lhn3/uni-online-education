"use strict";
var common_vendor = require("../../common/vendor.js");
const questionSwiper = () => "./cpns/question-swiper.js";
const _sfc_main = {
  components: {
    "question-swiper": questionSwiper
  },
  setup() {
    let { proxy } = common_vendor.getCurrentInstance();
    let swiperHeight = common_vendor.ref(0);
    let tabs = common_vendor.ref([
      { id: 1, name: "\u70ED\u95E8\u56DE\u7B54" },
      { id: 2, name: "\u6700\u65B0\u56DE\u7B54" },
      { id: 3, name: "\u7B49\u5F85\u56DE\u7B54" }
    ]);
    let tabRef = common_vendor.ref(null);
    let current = common_vendor.ref(0);
    common_vendor.onMounted(() => {
      swiperHeight.value = common_vendor.index.getSystemInfoSync().windowHeight - 40;
    });
    common_vendor.onNavigationBarSearchInputClicked(() => {
      proxy.navTo("/pages/search/search");
    });
    let changeTab = (id) => {
      current.value = id - 1;
    };
    const swiperChange = (e) => {
      current.value = e.detail.current;
      tabRef.value.tabId = e.detail.current + 1;
    };
    return {
      swiperHeight,
      tabs,
      tabRef,
      current,
      changeTab,
      swiperChange
    };
  }
};
if (!Array) {
  const _easycom_tab_bar2 = common_vendor.resolveComponent("tab-bar");
  const _component_question_swiper = common_vendor.resolveComponent("question-swiper");
  (_easycom_tab_bar2 + _component_question_swiper)();
}
const _easycom_tab_bar = () => "../../components/tab-bar/tab-bar.js";
if (!Math) {
  _easycom_tab_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.sr("tabRef", "c867fdc0-0"),
    b: common_vendor.o($setup.changeTab),
    c: common_vendor.p({
      tabs: $setup.tabs
    }),
    d: common_vendor.f($setup.tabs, (item, index, i0) => {
      return {
        a: common_vendor.sr("articleRef", "c867fdc0-1-" + i0, {
          "f": 1
        }),
        b: "c867fdc0-1-" + i0,
        c: common_vendor.p({
          i: index,
          index: $setup.current,
          tabs: $setup.tabs
        }),
        d: item.id
      };
    }),
    e: $setup.swiperHeight + "px",
    f: $setup.current,
    g: common_vendor.o((...args) => $setup.swiperChange && $setup.swiperChange(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
