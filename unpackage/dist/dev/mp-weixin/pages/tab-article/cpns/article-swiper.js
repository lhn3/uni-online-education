"use strict";
var uni_modules_mescrollUni_components_mescrollUni_mescrollMixins = require("../../../uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js");
var uni_modules_mescrollUni_components_mescrollUni_mixins_mescrollMoreItem = require("../../../uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js");
var common_vendor = require("../../../common/vendor.js");
var request_articleApi = require("../../../request/article-api.js");
require("../../../request/request.js");
require("../../../utils/showMessage.js");
const mescrollUni = () => "../../../uni_modules/mescroll-uni/components/mescroll-uni/mescroll-uni.js";
const _sfc_main = {
  components: {
    "mescroll-uni": mescrollUni
  },
  mixins: [uni_modules_mescrollUni_components_mescrollUni_mescrollMixins.MescrollMixin, uni_modules_mescrollUni_components_mescrollUni_mixins_mescrollMoreItem.MescrollMoreItemMixin],
  props: {
    i: Number,
    index: {
      type: Number,
      default() {
        return 0;
      }
    },
    tabs: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  setup(props) {
    let { proxy } = common_vendor.getCurrentInstance();
    let downOption = common_vendor.ref({ auto: false });
    let upOption = common_vendor.ref({
      auto: false,
      noMoreSize: 4,
      empty: {
        tip: "~ \u7A7A\u7A7A\u5982\u4E5F ~"
      }
    });
    let articleList = common_vendor.ref([]);
    let upCallback = async (page) => {
      let keyword = props.tabs[props.i].name;
      console.log(keyword, page.num, page.size);
      let res = await request_articleApi.getArticleList({ content: keyword }, page.num, page.size);
      if (page.num == 1) {
        articleList.value = [];
        proxy.mescroll.scrollTo(0, 100);
      }
      articleList.value = [...articleList.value, ...res.records];
      proxy.mescroll.endBySize(articleList.value.length, res.total);
      proxy.mescroll.endErr();
    };
    return {
      downOption,
      upOption,
      articleList,
      upCallback
    };
  }
};
if (!Array) {
  const _easycom_article_item2 = common_vendor.resolveComponent("article-item");
  const _easycom_mescroll_uni2 = common_vendor.resolveComponent("mescroll-uni");
  (_easycom_article_item2 + _easycom_mescroll_uni2)();
}
const _easycom_article_item = () => "../../../components/article-item/article-item.js";
const _easycom_mescroll_uni = () => "../../../uni_modules/mescroll-uni/components/mescroll-uni/mescroll-uni.js";
if (!Math) {
  (_easycom_article_item + _easycom_mescroll_uni)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($setup.articleList, (item, k0, i0) => {
      return {
        a: item.id,
        b: "2cdb8344-1-" + i0 + ",2cdb8344-0",
        c: common_vendor.p({
          item
        })
      };
    }),
    b: common_vendor.sr("mescrollRef" + $props.i, "2cdb8344-0"),
    c: "mescrollRef" + $props.i,
    d: common_vendor.o(_ctx.mescrollInit),
    e: common_vendor.o(_ctx.downCallback),
    f: common_vendor.o($setup.upCallback),
    g: common_vendor.p({
      height: "100%",
      bottom: "80",
      down: $setup.downOption,
      up: $setup.upOption
    })
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
