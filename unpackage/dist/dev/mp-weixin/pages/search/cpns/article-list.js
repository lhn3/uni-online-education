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
var request_articleApi = require("../../../request/article-api.js");
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
          { id: "new", name: "\u70ED\u95E8\u6392\u5E8F" },
          { id: "hot", name: "\u6700\u65B0\u6392\u5E8F" }
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
    let articleList = common_vendor.ref([]);
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
      if (Object.keys(props.params).length > 0) {
        searchDate.labelId = props.params.labelId;
        searchDate.categoryId = props.params.parentId;
      }
    });
    let changeCategory = (data) => {
      let content = props.content;
      searchDate = __spreadProps(__spreadValues(__spreadValues({}, searchDate), data), { content });
      console.log("\u6574\u5408\u641C\u7D22\u6587\u7AE0\u5185\u5BB9-----", searchDate);
      proxy.mescroll.resetUpScroll();
    };
    let upOption = common_vendor.ref({
      auto: false,
      noMoreSize: 4
    });
    let upCallback = async (page) => {
      page.num;
      page.size;
      console.log(`\u641C\u7D22\u6587\u7AE0\u5F53\u524D\u7B2C${page.num}\u9875`, page.size);
      let res = await request_articleApi.getArticleList(searchDate, page.num, page.size);
      if (page.num == 1) {
        articleList.value = [];
        proxy.mescroll.scrollTo(0, 100);
      }
      articleList.value = [...articleList.value, ...res.records];
      proxy.mescroll.endBySize(articleList.value.length, res.total);
      proxy.mescroll.endErr();
    };
    return {
      downCategoty,
      articleList,
      upOption,
      changeCategory,
      upCallback
    };
  }
};
if (!Array) {
  const _component_down_bar = common_vendor.resolveComponent("down-bar");
  const _easycom_article_item2 = common_vendor.resolveComponent("article-item");
  const _easycom_mescroll_body2 = common_vendor.resolveComponent("mescroll-body");
  (_component_down_bar + _easycom_article_item2 + _easycom_mescroll_body2)();
}
const _easycom_article_item = () => "../../../components/article-item/article-item.js";
const _easycom_mescroll_body = () => "../../../uni_modules/mescroll-uni/components/mescroll-body/mescroll-body.js";
if (!Math) {
  (_easycom_article_item + _easycom_mescroll_body)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($setup.changeCategory),
    b: common_vendor.p({
      params: $props.params,
      downCategoty: $setup.downCategoty
    }),
    c: common_vendor.f($setup.articleList, (item, k0, i0) => {
      return {
        a: item.id,
        b: "2c42f392-2-" + i0 + ",2c42f392-1",
        c: common_vendor.p({
          item
        })
      };
    }),
    d: common_vendor.t($props.i),
    e: common_vendor.sr("mescrollRef" + $props.i, "2c42f392-1"),
    f: "mescrollRef" + $props.i,
    g: common_vendor.o(_ctx.mescrollInit),
    h: common_vendor.o(_ctx.downCallback),
    i: common_vendor.o($setup.upCallback),
    j: common_vendor.p({
      down: _ctx.downOption,
      up: $setup.upOption
    }),
    k: $props.i === $props.index
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
