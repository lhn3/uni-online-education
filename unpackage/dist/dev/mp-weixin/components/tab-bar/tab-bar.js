"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    tabs: {
      type: Array,
      default: () => []
    },
    itemWidth: {
      type: Number,
      default: 100
    }
  },
  emits: ["changeTab"],
  setup(props, { emit }) {
    let tabId = common_vendor.ref();
    common_vendor.onMounted(() => {
      tabId.value = props.tabs[0].id;
    });
    let changeTabs = (id) => {
      if (tabId.value != id) {
        tabId.value = id;
        emit("changeTab", id);
      }
    };
    return {
      tabId,
      changeTabs
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.tabs, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: item.id == $setup.tabId ? 1 : "",
        c: item.id,
        d: common_vendor.o(($event) => $setup.changeTabs(item.id), item.id)
      };
    }),
    b: `${$props.itemWidth}px`,
    c: common_vendor.o(() => {
    })
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
