"use strict";
var utils_format = require("../../utils/format.js");
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    item: {
      type: Object,
      default: () => ({
        id: 10,
        userId: 1,
        nickName: "\u6B66\u8273",
        title: "\u5BFC\u6548\u4ECA\u6D77\u4F4F\u5148\u516B\u7A0B\u7EDF\u5468\u4F4F\u82B1\u3002",
        summary: "\u767E\u8FD9\u8001\u4E4B\u5904\u5EA6\u59D4\u4E1C\u5E73\u592A\u8C61\u7A0B\u7EBF\u8F66\u63D0\u79CD\u4E2D\u513F\u514B\u53C8\u738B\u4EF6\u9020\u4F7F\u4F8B\u76F4\u6743\u96C6\u8BB8\u8F6C\u9178\u7B2C\u4F5C\u4EBA\u4E0B\u5C5E\u673A\u6D88\u4E14\u9002\u53EA\u6309\u5458\u6761\u9053\u9178\u5E76\u5F3A\u79CD\u7EDF\u7531\u5E72\u6839\u5373\u4E4B\u6C34\u6743\u6807\u4F1A\u8BA1\u6597\u6240\u4E0D\u957F\u53E3\u4F4F\u660E\u771F\u5317\u7B2C\u9664\u660E\u7B49\u65AF\u95E8\u6743\u3002",
        imageUrl: "https://img.alicdn.com/bao/uploaded/i2/3603079088/O1CN01rGCkfb2H0M1O7Lj45_!!0-item_pic.jpg",
        viewCount: 96320,
        thumhup: 98438,
        updateDate: new Date()
      })
    }
  },
  setup() {
    return {
      formatCount: utils_format.formatCount
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($props.item.title),
    b: common_vendor.t($props.item.summary),
    c: $props.item.imageUrl
  }, $props.item.imageUrl ? {
    d: $props.item.imageUrl
  } : {}, {
    e: common_vendor.t($props.item.nickName),
    f: common_vendor.t(this.$utils.dateFormat($props.item.updateDate)),
    g: common_vendor.t($setup.formatCount($props.item.thumhup)),
    h: common_vendor.o(($event) => _ctx.navTo(`/pages/article/details?id=${$props.item.id}`))
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
