"use strict";
var common_vendor = require("../../../common/vendor.js");
var uni_modules_mescrollUni_components_mescrollUni_mescrollMixins = require("../../../uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js");
var uni_modules_mescrollUni_components_mescrollUni_mixins_mescrollMoreItem = require("../../../uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js");
const downBar = () => "./down-bar.js";
const _sfc_main = {
  mixins: [uni_modules_mescrollUni_components_mescrollUni_mescrollMixins.MescrollMixin, uni_modules_mescrollUni_components_mescrollUni_mixins_mescrollMoreItem.MescrollMoreItemMixin],
  components: {
    "down-bar": downBar
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
    let changeCategory = (id) => {
      console.log("\u6587\u7AE0\u70B9\u51FB\u4E86\u5206\u7C7B\uFF1A", id);
      proxy.mescroll.resetUpScroll();
    };
    let upCallback = (page) => {
      console.log("\u6587\u7AE0\u4E0A\u62C9\u52A0\u8F7D", page.num, page.size, props.content);
      proxy.mescroll.endSuccess(0);
    };
    return {
      downCategoty,
      changeCategory,
      upCallback
    };
  }
};
if (!Array) {
  const _component_down_bar = common_vendor.resolveComponent("down-bar");
  const _easycom_mescroll_body2 = common_vendor.resolveComponent("mescroll-body");
  (_component_down_bar + _easycom_mescroll_body2)();
}
const _easycom_mescroll_body = () => "../../../uni_modules/mescroll-uni/components/mescroll-body/mescroll-body.js";
if (!Math) {
  _easycom_mescroll_body();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($setup.changeCategory),
    b: common_vendor.p({
      params: $props.params,
      downCategoty: $setup.downCategoty
    }),
    c: common_vendor.f(100, (i, k0, i0) => {
      return {
        a: common_vendor.t(i)
      };
    }),
    d: common_vendor.sr("mescrollRef" + $props.i, "2c42f392-1"),
    e: "mescrollRef" + $props.i,
    f: common_vendor.o(_ctx.mescrollInit),
    g: common_vendor.o(_ctx.downCallback),
    h: common_vendor.o($setup.upCallback),
    i: common_vendor.p({
      down: _ctx.downOption,
      up: _ctx.upOption
    }),
    j: $props.i === $props.index
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
