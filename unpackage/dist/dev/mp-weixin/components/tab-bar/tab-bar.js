"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    tabs: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit }) {
    let tabId = common_vendor.ref();
    let itemWidth = common_vendor.ref(100);
    let move = common_vendor.ref(0);
    common_vendor.watch(() => props.tabs, (newValue) => {
      if (newValue.length == 0)
        return;
      tabId.value = newValue[0].id;
      if (newValue.length < 5) {
        itemWidth.value = common_vendor.index.upx2px(750 / newValue.length);
      } else {
        itemWidth.value = common_vendor.index.upx2px(750 / 5);
      }
    }, {
      deep: true,
      immediate: true
    });
    let tabPosition = (index) => {
      if (index > 2) {
        move.value = (index - 2) * itemWidth.value;
      } else {
        move.value = 0;
      }
    };
    let changeTabs = (id, index) => {
      if (tabId.value == id)
        return;
      tabPosition();
      if (tabId.value != id) {
        tabId.value = id;
        emit("changeTab", id);
      }
    };
    return {
      tabId,
      itemWidth,
      move,
      tabPosition,
      changeTabs
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.tabs, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: item.id == $setup.tabId ? 1 : "",
        c: item.id,
        d: common_vendor.o(($event) => $setup.changeTabs(item.id, index), item.id)
      };
    }),
    b: `${$setup.itemWidth}px`,
    c: $setup.move,
    d: common_vendor.o(() => {
    })
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
