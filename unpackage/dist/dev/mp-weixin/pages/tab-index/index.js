"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var common_vendor = require("../../common/vendor.js");
var mock_courseData = require("../../mock/courseData.js");
var request_courseApi = require("../../request/course-api.js");
var uni_modules_mescrollUni_components_mescrollUni_mescrollMixins = require("../../uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js");
require("../../request/request.js");
require("../../utils/showMessage.js");
const categoryBox = () => "./cpns/category-box.js";
const swiperCourse = () => "./cpns/swiper-course.js";
const scrollCourse = () => "./cpns/scroll-course.js";
const payCourse = () => "./cpns/pay-course.js";
const mescrollBody = () => "../../uni_modules/mescroll-uni/components/mescroll-body/mescroll-body.js";
const _sfc_main = {
  mixins: [uni_modules_mescrollUni_components_mescrollUni_mescrollMixins.MescrollMixin],
  components: {
    "category-box": categoryBox,
    "swiper-course": swiperCourse,
    "scroll-course": scrollCourse,
    "pay-course": payCourse,
    "mescroll-body": mescrollBody
  },
  setup() {
    const { proxy } = common_vendor.getCurrentInstance();
    common_vendor.onNavigationBarSearchInputClicked(() => {
      proxy.navTo("/pages/search/search");
    });
    const state = common_vendor.reactive({
      banners: [],
      category: [],
      hotCourse: [],
      newCourse: [],
      freeCourse: [],
      payCourse: []
    });
    const getPageInfo = async () => {
      let banners = await request_courseApi.getBanners();
      let category = await request_courseApi.getCategory();
      let hotCourse = await request_courseApi.getCourseList({ sort: "hot" });
      let newCourse = await request_courseApi.getCourseList({ sort: "new" });
      let freeCourse = await request_courseApi.getCourseList({ isFree: 1 });
      let payCourse2 = await request_courseApi.getCourseList({ isFree: 0 });
      state.banners = banners;
      state.category = category;
      state.hotCourse = hotCourse.records;
      state.newCourse = newCourse.records;
      state.freeCourse = freeCourse.records;
      state.payCourse = payCourse2.records;
    };
    let downOption = common_vendor.reactive({
      offset: 60
    });
    let upOption = common_vendor.reactive({
      page: {
        num: 0,
        size: 10
      }
    });
    const upCallback = async (page) => {
      page.num;
      page.size;
      console.log(`\u5F53\u524D\u7B2C${page.num}\u9875`);
      if (page.num == 1) {
        await getPageInfo();
      } else {
        let res = await request_courseApi.getCourseList({ isFree: 0 }, page.num, page.size);
        state.payCourse = [...state.payCourse, ...res.records];
        proxy.mescroll.endBySize(state.payCourse.length, res.total);
      }
      proxy.mescroll.endErr();
    };
    const toSearch = () => {
      proxy.navTo("/pages/search/search");
    };
    return __spreadProps(__spreadValues({
      courseData: mock_courseData.courseData,
      getPageInfo
    }, common_vendor.toRefs(state)), {
      downOption,
      upCallback,
      upOption,
      toSearch
    });
  },
  onLoad() {
  }
};
if (!Array) {
  const _easycom_search_input2 = common_vendor.resolveComponent("search-input");
  const _easycom_my_swiper2 = common_vendor.resolveComponent("my-swiper");
  const _component_category_box = common_vendor.resolveComponent("category-box");
  const _component_swiper_course = common_vendor.resolveComponent("swiper-course");
  const _component_scroll_course = common_vendor.resolveComponent("scroll-course");
  const _component_pay_course = common_vendor.resolveComponent("pay-course");
  const _easycom_mescroll_body2 = common_vendor.resolveComponent("mescroll-body");
  (_easycom_search_input2 + _easycom_my_swiper2 + _component_category_box + _component_swiper_course + _component_scroll_course + _component_pay_course + _easycom_mescroll_body2)();
}
const _easycom_search_input = () => "../../components/search-input/search-input.js";
const _easycom_my_swiper = () => "../../components/my-swiper/my-swiper.js";
const _easycom_mescroll_body = () => "../../uni_modules/mescroll-uni/components/mescroll-body/mescroll-body.js";
if (!Math) {
  (_easycom_search_input + _easycom_my_swiper + _easycom_mescroll_body)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($setup.toSearch),
    b: common_vendor.p({
      banners: _ctx.banners
    }),
    c: common_vendor.p({
      categoryList: _ctx.category
    }),
    d: common_vendor.p({
      title: "\u70ED\u95E8\u63A8\u8350",
      word: "HOT",
      all: true,
      courseData: _ctx.hotCourse,
      params: {
        sort: "hot"
      }
    }),
    e: common_vendor.p({
      title: "\u8FD1\u671F\u4E0A\u65B0",
      word: "NEW",
      all: true,
      courseData: _ctx.newCourse,
      params: {
        sort: "new"
      }
    }),
    f: common_vendor.p({
      title: "\u514D\u8D39\u7CBE\u9009",
      word: "FREE",
      all: true,
      courseData: _ctx.freeCourse,
      params: {
        isFree: 1
      }
    }),
    g: common_vendor.p({
      title: "\u4ED8\u8D39\u7CBE\u54C1",
      word: "NICE",
      all: true,
      courseData: _ctx.payCourse,
      params: {
        isFree: 0
      }
    }),
    h: common_vendor.sr("mescrollRef", "f5bdc598-2"),
    i: common_vendor.o(_ctx.mescrollInit),
    j: common_vendor.o(_ctx.downCallback),
    k: common_vendor.o($setup.upCallback),
    l: common_vendor.p({
      down: $setup.downOption,
      up: $setup.upOption
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f5bdc598"]]);
wx.createPage(MiniProgramPage);
