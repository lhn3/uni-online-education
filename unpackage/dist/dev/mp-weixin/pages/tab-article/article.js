"use strict";
var common_vendor = require("../../common/vendor.js");
var request_courseApi = require("../../request/course-api.js");
require("../../request/request.js");
require("../../utils/showMessage.js");
const articleSwiper = () => "./cpns/article-swiper.js";
const _sfc_main = {
  components: {
    "article-swiper": articleSwiper
  },
  setup() {
    let { proxy } = common_vendor.getCurrentInstance();
    let tabRef = common_vendor.ref(null);
    let articleRef = common_vendor.ref(null);
    let tabs = common_vendor.ref([]);
    let current = common_vendor.ref(0);
    let swiperHeight = common_vendor.ref(500);
    common_vendor.onMounted(async () => {
      swiperHeight.value = common_vendor.index.getSystemInfoSync().windowHeight - 40;
      let res = await request_courseApi.getCategory();
      res.unshift({ id: 0, name: "\u5168\u90E8" });
      tabs.value = res;
    });
    common_vendor.onNavigationBarSearchInputClicked(() => {
      proxy.navTo("/pages/search/search");
    });
    const changeTab = (id) => {
      current.value = id;
    };
    const swiperChange = (e) => {
      current.value = e.detail.current;
      tabRef.value.tabId = e.detail.current;
      tabRef.value.tabPosition(e.detail.current);
    };
    return {
      tabRef,
      articleRef,
      tabs,
      current,
      swiperHeight,
      changeTab,
      swiperChange
    };
  }
};
if (!Array) {
  const _easycom_tab_bar2 = common_vendor.resolveComponent("tab-bar");
  const _component_article_swiper = common_vendor.resolveComponent("article-swiper");
  (_easycom_tab_bar2 + _component_article_swiper)();
}
const _easycom_tab_bar = () => "../../components/tab-bar/tab-bar.js";
if (!Math) {
  _easycom_tab_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.sr("tabRef", "fb9aad64-0"),
    b: common_vendor.o($setup.changeTab),
    c: common_vendor.p({
      tabs: $setup.tabs
    }),
    d: common_vendor.f($setup.tabs, (item, index, i0) => {
      return {
        a: common_vendor.sr("articleRef", "fb9aad64-1-" + i0, {
          "f": 1
        }),
        b: "fb9aad64-1-" + i0,
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
