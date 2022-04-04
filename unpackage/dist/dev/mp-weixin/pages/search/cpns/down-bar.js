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
const category = () => "../../tab-category/category2.js";
const _sfc_main = {
  components: { category },
  props: {
    info: {
      type: Array,
      default: () => [
        {
          type: "sort",
          isAllCategory: false,
          name: "\u7EFC\u5408\u6392\u5E8F",
          active: true,
          list: [
            { id: null, name: "\u7EFC\u5408\u6392\u5E8F" },
            { id: "new", name: "\u70ED\u95E8\u6392\u5E8F" },
            { id: "hot", name: "\u6700\u65B0\u6392\u5E8F" }
          ]
        },
        {
          type: "label",
          isAllCategory: false,
          name: "\u5168\u90E8\u6392\u5E8F",
          active: false,
          list: []
        }
      ]
    }
  },
  setup(props, { emit }) {
    let state = common_vendor.reactive({
      tabId: null,
      childId: null
    });
    let changeTab = (tabId) => {
    };
    return __spreadProps(__spreadValues({}, common_vendor.toRefs(state)), {
      changeTab
    });
  }
};
if (!Array) {
  const _component_category = common_vendor.resolveComponent("category");
  _component_category();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($props.info, (item, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.name),
        b: common_vendor.o(($event) => $setup.changeTab(item.id)),
        c: item.active
      }, item.active ? common_vendor.e({
        d: _ctx.isAllCategory
      }, _ctx.isAllCategory ? {
        e: "561051e5-0-" + i0
      } : {
        f: common_vendor.f(item.list, (i, k1, i1) => {
          return {
            a: common_vendor.t(i.name),
            b: i.id,
            c: common_vendor.o(($event) => _ctx.changeCild(i), i.id)
          };
        })
      }) : {}, {
        g: item.active
      }, item.active ? {} : {}, {
        h: item.type
      });
    })
  }, {}, {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
