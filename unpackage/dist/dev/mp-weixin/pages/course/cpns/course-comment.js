"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  props: {
    commentList: {
      type: Array,
      default: () => []
    }
  }
};
if (!Array) {
  const _easycom_no_data2 = common_vendor.resolveComponent("no-data");
  _easycom_no_data2();
}
const _easycom_no_data = () => "../../../components/no-data/no-data.js";
if (!Math) {
  _easycom_no_data();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$props.commentList || $props.commentList.length <= 0
  }, !$props.commentList || $props.commentList.length <= 0 ? {
    b: common_vendor.p({
      desc: "\u6682\u65E0\u8BC4\u8BBA"
    })
  } : {
    c: common_vendor.f($props.commentList, (item, index, i0) => {
      return common_vendor.e({
        a: item.userImage || "/static/tab/my.png",
        b: common_vendor.t(item.nickName),
        c: common_vendor.t(_ctx.$utils.dateFormat(item.createDate)),
        d: !item.isGood ? 1 : "",
        e: common_vendor.t(item.content),
        f: item.children && item.children.content
      }, item.children && item.children.content ? {
        g: common_vendor.t(item.children.content)
      } : {}, {
        h: index
      });
    })
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
