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
var common_vendor = require("../../../common/vendor.js");
var uni_modules_mescrollUni_components_mescrollUni_mescrollMixins = require("../../../uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js");
var uni_modules_mescrollUni_components_mescrollUni_mixins_mescrollMoreItem = require("../../../uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js");
var request_courseApi = require("../../../request/course-api.js");
require("../../../request/request.js");
require("../../../utils/showMessage.js");
const downBar = () => "./down-bar.js";
const mescrollBody = () => "../../../uni_modules/mescroll-uni/components/mescroll-body/mescroll-body.js";
const _sfc_main = {
  mixins: [uni_modules_mescrollUni_components_mescrollUni_mescrollMixins.MescrollMixin, uni_modules_mescrollUni_components_mescrollUni_mixins_mescrollMoreItem.MescrollMoreItemMixin],
  components: {
    "down-bar": downBar,
    "mescroll-body": mescrollBody
  },
  props: {
    i: Number,
    index: {
      type: Number,
      default() {
        return 1;
      }
    },
    params: {
      type: Object,
      default: () => ({})
    },
    content: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    const { proxy } = common_vendor.getCurrentInstance();
    let downCategoty = common_vendor.ref([
      {
        type: "sort",
        isAllCategory: false,
        name: "\u7EFC\u5408\u6392\u5E8F",
        active: false,
        list: [
          { id: null, name: "\u7EFC\u5408\u6392\u5E8F" },
          { id: "hot", name: "\u70ED\u95E8\u6392\u5E8F" },
          { id: "new", name: "\u6700\u65B0\u6392\u5E8F" }
        ]
      },
      {
        type: "isFree",
        isAllCategory: false,
        name: "\u5168\u90E8\u8BFE\u7A0B",
        active: false,
        list: [
          { id: null, name: "\u5168\u90E8\u8BFE\u7A0B" },
          { id: 0, name: "\u4ED8\u8D39\u8BFE\u7A0B" },
          { id: 1, name: "\u514D\u8D39\u8BFE\u7A0B" }
        ]
      },
      {
        type: "label",
        isAllCategory: true,
        name: "\u5168\u90E8\u6392\u5E8F",
        active: false,
        list: []
      }
    ]);
    let courseList = common_vendor.ref([]);
    let searchDate = common_vendor.reactive({
      content: null,
      sort: null,
      isFree: null,
      labelId: null,
      categoryId: null
    });
    common_vendor.onMounted(() => {
      if (props.content)
        searchDate.content = props.content;
      let paramsKeys = Object.keys(props.params);
      let searchDateKeys = Object.keys(searchDate);
      if (paramsKeys.length > 0) {
        paramsKeys.forEach((item) => {
          if (searchDateKeys.indexOf(item) != -1) {
            searchDate[item] = props.params[item];
          }
        });
      }
    });
    let changeCategory = (data) => {
      let content = props.content;
      searchDate = __spreadProps(__spreadValues(__spreadValues({}, searchDate), data), { content });
      proxy.mescroll.resetUpScroll();
    };
    let upOption = common_vendor.ref({
      auto: false,
      noMoreSize: 4
    });
    let upCallback = async (page) => {
      page.num;
      page.size;
      console.log("\u6574\u5408\u641C\u7D22\u8BFE\u7A0B\u5185\u5BB9-----", searchDate);
      console.log(`\u641C\u7D22\u8BFE\u7A0B\u5F53\u524D\u7B2C${page.num}\u9875`, page.size);
      let res = await request_courseApi.getCourseList(searchDate, page.num, page.size);
      if (page.num == 1) {
        courseList.value = [];
        proxy.mescroll.scrollTo(0, 100);
      }
      courseList.value = [...courseList.value, ...res.records];
      proxy.mescroll.endBySize(courseList.value.length, res.total);
      proxy.mescroll.endErr();
    };
    return {
      downCategoty,
      courseList,
      upOption,
      changeCategory,
      upCallback
    };
  }
};
if (!Array) {
  const _component_down_bar = common_vendor.resolveComponent("down-bar");
  const _easycom_course_item2 = common_vendor.resolveComponent("course-item");
  const _easycom_mescroll_body2 = common_vendor.resolveComponent("mescroll-body");
  (_component_down_bar + _easycom_course_item2 + _easycom_mescroll_body2)();
}
const _easycom_course_item = () => "../../../components/course-item/course-item.js";
const _easycom_mescroll_body = () => "../../../uni_modules/mescroll-uni/components/mescroll-body/mescroll-body.js";
if (!Math) {
  (_easycom_course_item + _easycom_mescroll_body)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($setup.changeCategory),
    b: common_vendor.p({
      params: $props.params,
      downCategoty: $setup.downCategoty
    }),
    c: common_vendor.f($setup.courseList, (item, index, i0) => {
      return {
        a: item.id,
        b: "6f12b0a3-2-" + i0 + ",6f12b0a3-1",
        c: common_vendor.p({
          item
        })
      };
    }),
    d: common_vendor.sr("mescrollRef" + $props.i, "6f12b0a3-1"),
    e: "mescrollRef" + $props.i,
    f: common_vendor.o(_ctx.mescrollInit),
    g: common_vendor.o(_ctx.downCallback),
    h: common_vendor.o($setup.upCallback),
    i: common_vendor.p({
      down: _ctx.downOption,
      up: $setup.upOption
    }),
    j: $props.i === $props.index
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
