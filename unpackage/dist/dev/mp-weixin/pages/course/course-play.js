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
const courseSection = () => "./cpns/course-section.js";
let videoContext = null;
const _sfc_main = {
  components: {
    "course-section": courseSection
  },
  setup() {
    let { proxy } = common_vendor.getCurrentInstance();
    let sectionRef = common_vendor.ref(null);
    let myShare = common_vendor.ref(null);
    let commentRef = common_vendor.ref(null);
    let state = common_vendor.reactive({
      id: null,
      courseDetail: {},
      courseSection: [],
      poster: "",
      videoUrl: "",
      comment: {
        userId: 1,
        courseId: 10,
        nickName: "Liu",
        userImage: "",
        content: "",
        score: 5
      },
      activeVideo: {
        parentIndex: 0,
        childIndex: 0
      },
      providerList: [
        { id: "weixin", name: "\u5FAE\u4FE1\u597D\u53CB", sort: 0, icon: "/static/share/weixin.png" },
        { id: "weixin", name: "\u670B\u53CB\u5708", type: "WXSenceTimeline", sort: 1, icon: "/static/share/pengyouquan.png" },
        { id: "sinaweibo", name: "\u65B0\u6D6A\u5FAE\u535A", sort: 2, icon: "/static/share/weibo.png" },
        { id: "qq", name: "QQ\u597D\u53CB", sort: 3, icon: "/static/share/qq.png" },
        { id: "copy", name: "\u590D\u5236\u94FE\u63A5", sort: 4, icon: "/static/share/link.png" }
      ]
    });
    const openVideo = (itemInfo) => {
      sectionRef.value.actSect = itemInfo.section.name;
      common_vendor.index.request({
        url: itemInfo.section.videoUrl,
        method: "GET",
        success: (res) => {
          videoContext.pause();
          state.videoUrl = res.data.data.url;
        },
        complete: () => {
          setTimeout(() => {
            videoContext.play();
          }, 300);
        }
      });
    };
    const share = () => {
      myShare.value.isShow = !myShare.value.isShow;
    };
    const openComment = () => {
      commentRef.value.isShow = !commentRef.value.isShow;
    };
    const submit = async (data) => {
      let res = await request_courseApi.updateComment(data);
      if (res.code == 200) {
        proxy.$message.toast("\u53D1\u8868\u6210\u529F", "success");
        commentRef.value.isShow = false;
        data.score = 5;
        data.content = "";
      }
    };
    return __spreadProps(__spreadValues({
      sectionRef,
      myShare,
      commentRef
    }, common_vendor.toRefs(state)), {
      openVideo,
      share,
      openComment,
      submit
    });
  },
  async onLoad(option) {
    this.id = option.id;
    this.getPageInfo();
  },
  onReady() {
    videoContext = common_vendor.index.createVideoContext("playVideo", this);
  },
  methods: {
    async getPageInfo() {
      this.courseDetail = await request_courseApi.getCourseDetail(this.id);
      this.courseSection = await request_courseApi.getBuyCourseSection(this.id);
      this.poster = this.courseDetail.mainImage;
      common_vendor.index.request({
        url: this.courseSection[0].sectionList[0].videoUrl,
        method: "GET",
        success: (res) => {
          this.videoUrl = res.data.data.url;
        }
      });
      this.$refs.sectionRef.actSect = this.courseSection[0].sectionList[0].name;
    }
  }
};
if (!Array) {
  const _component_course_section = common_vendor.resolveComponent("course-section");
  const _easycom_my_share2 = common_vendor.resolveComponent("my-share");
  const _easycom_comment2 = common_vendor.resolveComponent("comment");
  (_component_course_section + _easycom_my_share2 + _easycom_comment2)();
}
const _easycom_my_share = () => "../../components/my-share/my-share.js";
const _easycom_comment = () => "../../components/comment/comment.js";
if (!Math) {
  (_easycom_my_share + _easycom_comment)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: _ctx.videoUrl,
    b: _ctx.poster,
    c: common_vendor.t(_ctx.courseDetail.title),
    d: common_vendor.o(($event) => _ctx.navTo(`/pages/course/course-details?id=${_ctx.id}`)),
    e: common_vendor.sr("sectionRef", "6c44aa99-0"),
    f: common_vendor.o($setup.openVideo),
    g: common_vendor.p({
      isBuy: true,
      chapterList: _ctx.courseSection
    }),
    h: common_vendor.o((...args) => $setup.share && $setup.share(...args)),
    i: common_vendor.o((...args) => $setup.openComment && $setup.openComment(...args)),
    j: common_vendor.sr("myShare", "6c44aa99-1"),
    k: common_vendor.p({
      providerList: _ctx.providerList,
      shareDate: _ctx.courseDetail
    }),
    l: common_vendor.sr("commentRef", "6c44aa99-2"),
    m: common_vendor.o($setup.submit),
    n: common_vendor.p({
      comment: _ctx.comment
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
