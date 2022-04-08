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
var request_courseApi = require("../../request/course-api.js");
require("../../request/request.js");
require("../../utils/showMessage.js");
const courseDetailHeader = () => "./cpns/course-detail-header.js";
const courseInfo = () => "./cpns/course-info.js";
const courseSection = () => "./cpns/course-section.js";
const courseComment = () => "./cpns/course-comment.js";
const coursePackage = () => "./cpns/course-package.js";
const bottomBtn = () => "./cpns/bottom-btn.js";
const _sfc_main = {
  components: {
    "course-detail-header": courseDetailHeader,
    "course-info": courseInfo,
    "course-section": courseSection,
    "course-comment": courseComment,
    "course-package": coursePackage,
    "bottom-btn": bottomBtn
  },
  setup() {
    let tabs = common_vendor.ref([
      { id: 1, name: "\u8BE6\u60C5" },
      { id: 2, name: "\u7AE0\u8282" },
      { id: 3, name: "\u8BC4\u8BBA" },
      { id: 4, name: "\u5957\u9910" }
    ]);
    let tabBar = common_vendor.ref(null);
    let myShare = common_vendor.ref(null);
    let providerList = common_vendor.ref([
      { id: "weixin", name: "\u5FAE\u4FE1\u597D\u53CB", sort: 0, icon: "/static/share/weixin.png" },
      { id: "weixin", name: "\u670B\u53CB\u5708", type: "WXSenceTimeline", sort: 1, icon: "/static/share/pengyouquan.png" },
      { id: "sinaweibo", name: "\u65B0\u6D6A\u5FAE\u535A", sort: 2, icon: "/static/share/weibo.png" },
      { id: "qq", name: "QQ\u597D\u53CB", sort: 3, icon: "/static/share/qq.png" },
      { id: "copy", name: "\u590D\u5236\u94FE\u63A5", sort: 4, icon: "/static/share/link.png" }
    ]);
    let state = common_vendor.reactive({
      id: 0,
      pageHeight: 0,
      statusNavHeight: 0,
      detailToTop: 0,
      tabId: 0,
      current: 0,
      isScroll: false,
      isBuy: false,
      freeVideo: false,
      videoUrl: null,
      videoText: "",
      courseDetail: {},
      courseSection: {},
      courseComment: {},
      coursePackage: {}
    });
    common_vendor.onReachBottom(() => {
      state.isScroll = true;
    });
    let toupper = () => {
      state.isScroll = false;
      common_vendor.index.pageScrollTo({
        scrollTop: 0
      });
    };
    common_vendor.onPageScroll((event) => {
      if (event.scrollTop < state.detailToTop - state.statusNavHeight) {
        state.isScroll = false;
      } else {
        state.isScroll = true;
      }
    });
    let changeTab = (id) => {
      state.tabId = id, state.current = id - 1;
      common_vendor.index.pageScrollTo({
        scrollTop: state.detailToTop
      });
    };
    let changeSwiper = (event) => {
      state.tabId = event.detail.current + 1;
      tabBar.value.tabId = event.detail.current + 1;
    };
    common_vendor.onNavigationBarButtonTap((e) => {
      if (e.type = "share") {
        myShare.value.isShow = !myShare.value.isShow;
      }
    });
    let clickBottom = () => {
      if (state.isBuy || state.courseDetail.isFree == 1) {
        console.log("\u7ACB\u5373\u89C2\u770B");
      } else {
        console.log("\u7ACB\u5373\u8D2D\u4E70");
      }
    };
    let openVideo = (setion) => {
      state.videoUrl = setion.videoUrl;
      state.videoText = setion.name;
      state.freeVideo = true;
    };
    let closeVideo = () => {
      state.freeVideo = false;
    };
    return __spreadProps(__spreadValues({
      tabs,
      tabBar,
      myShare,
      providerList
    }, common_vendor.toRefs(state)), {
      changeTab,
      changeSwiper,
      toupper,
      clickBottom,
      openVideo,
      closeVideo
    });
  },
  methods: {
    getHeight() {
      let res = common_vendor.index.getSystemInfoSync();
      let sys = res.platform;
      if (sys == "android") {
        this.statusNavHeight = res.statusBarHeight + 48;
      } else if (sys = "ios") {
        this.statusNavHeight = res.statusBarHeight + 44;
      }
      this.pageHeight = res.screenHeight - this.statusNavHeight;
    },
    async getPageInfo(id) {
      this.courseDetail = await request_courseApi.getCourseDetail(id);
      common_vendor.index.setNavigationBarTitle({
        title: this.courseDetail.title
      });
      this.courseSection = await request_courseApi.getCourseSection(id);
      this.courseComment = await request_courseApi.getCourseComment(id);
      this.coursePackage = await request_courseApi.getCoursePackage(id);
      if (this.$utils.isLogin({ nav: false })) {
        this.isBuy = (await request_courseApi.getCourseIsBuy(id)).isBuy;
      }
    }
  },
  onLoad(option) {
    if (option.id) {
      this.id = option.id;
      this.getPageInfo(this.id);
    }
    this.getHeight();
  },
  onReady() {
    let view = common_vendor.index.createSelectorQuery().in(this).select(".course-details");
    view.fields({
      rect: true
    }, (data) => {
      this.detailToTop = data.top;
    }).exec();
  },
  onShareAppMessage(res) {
    return {
      title: this.courseDetail.title,
      path: this.$utils.routePath()
    };
  }
};
if (!Array) {
  const _component_course_detail_header = common_vendor.resolveComponent("course-detail-header");
  const _easycom_tab_bar2 = common_vendor.resolveComponent("tab-bar");
  const _component_course_info = common_vendor.resolveComponent("course-info");
  const _component_course_section = common_vendor.resolveComponent("course-section");
  const _component_course_comment = common_vendor.resolveComponent("course-comment");
  const _component_course_package = common_vendor.resolveComponent("course-package");
  const _component_bottom_btn = common_vendor.resolveComponent("bottom-btn");
  const _easycom_my_share2 = common_vendor.resolveComponent("my-share");
  (_component_course_detail_header + _easycom_tab_bar2 + _component_course_info + _component_course_section + _component_course_comment + _component_course_package + _component_bottom_btn + _easycom_my_share2)();
}
const _easycom_tab_bar = () => "../../components/tab-bar/tab-bar.js";
const _easycom_my_share = () => "../../components/my-share/my-share.js";
if (!Math) {
  (_easycom_tab_bar + _easycom_my_share)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      course: _ctx.courseDetail
    }),
    b: common_vendor.sr("tabBar", "05d1fded-1"),
    c: common_vendor.o($setup.changeTab),
    d: common_vendor.p({
      tabs: $setup.tabs,
      itemWidth: 87.5
    }),
    e: common_vendor.f($setup.tabs, (item, k0, i0) => {
      return common_vendor.e(_ctx.tabId == 1 ? {
        a: "05d1fded-2-" + i0,
        b: common_vendor.p({
          detailUrls: _ctx.courseDetail.detailUrls
        })
      } : {}, _ctx.tabId == 2 ? {
        c: common_vendor.o($setup.openVideo),
        d: "05d1fded-3-" + i0,
        e: common_vendor.p({
          chapterList: _ctx.courseSection
        })
      } : {}, _ctx.tabId == 3 ? {
        f: "05d1fded-4-" + i0,
        g: common_vendor.p({
          commentList: _ctx.courseComment
        })
      } : {}, _ctx.tabId == 4 ? {
        h: "05d1fded-5-" + i0,
        i: common_vendor.p({
          groupList: _ctx.coursePackage
        })
      } : {}, {
        j: item.id
      });
    }),
    f: _ctx.tabId == 1,
    g: _ctx.tabId == 2,
    h: _ctx.tabId == 3,
    i: _ctx.tabId == 4,
    j: _ctx.isScroll,
    k: common_vendor.o((...args) => $setup.toupper && $setup.toupper(...args)),
    l: _ctx.current,
    m: common_vendor.o((...args) => $setup.changeSwiper && $setup.changeSwiper(...args)),
    n: `${_ctx.pageHeight}px`,
    o: common_vendor.o($setup.clickBottom),
    p: common_vendor.p({
      btnText: _ctx.isBuy || _ctx.courseDetail.isFree == 1 ? "\u7ACB\u5373\u89C2\u770B" : "\u7ACB\u5373\u8D2D\u4E70"
    }),
    q: common_vendor.sr("myShare", "05d1fded-7"),
    r: common_vendor.p({
      providerList: $setup.providerList,
      shareDate: _ctx.courseDetail
    }),
    s: _ctx.freeVideo
  }, _ctx.freeVideo ? {
    t: common_vendor.t(_ctx.videoText),
    v: common_vendor.o((...args) => $setup.closeVideo && $setup.closeVideo(...args)),
    w: _ctx.videoUrl,
    x: common_vendor.o(() => {
    })
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
_sfc_main.__runtimeHooks = 3;
wx.createPage(MiniProgramPage);
