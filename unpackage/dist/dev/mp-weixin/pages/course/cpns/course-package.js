"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  props: {
    groupList: {
      type: Array,
      default: () => []
    },
    showBuy: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    let { proxy } = common_vendor.getCurrentInstance();
    let buyGroupHandler = (item) => {
      proxy.navTo("/pages/order/confirm-buy?detail=" + encodeURIComponent(JSON.stringify(item)));
    };
    return {
      buyGroupHandler
    };
  }
};
if (!Array) {
  const _easycom_no_data2 = common_vendor.resolveComponent("no-data");
  const _easycom_course_item2 = common_vendor.resolveComponent("course-item");
  (_easycom_no_data2 + _easycom_course_item2)();
}
const _easycom_no_data = () => "../../../components/no-data/no-data.js";
const _easycom_course_item = () => "../../../components/course-item/course-item.js";
if (!Math) {
  (_easycom_no_data + _easycom_course_item)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$props.groupList || $props.groupList.length <= 0
  }, !$props.groupList || $props.groupList.length <= 0 ? {
    b: common_vendor.p({
      desc: "\u6682\u65E0\u5957\u9910"
    })
  } : {
    c: common_vendor.f($props.groupList, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.title),
        b: common_vendor.f(item.list, (info, i, i1) => {
          return {
            a: i,
            b: "4deeb478-1-" + i0 + "-" + i1,
            c: common_vendor.p({
              item: info
            })
          };
        })
      }, $props.showBuy ? {
        c: common_vendor.t(item.groupPrice),
        d: common_vendor.t(item.totalPrice),
        e: common_vendor.o(($event) => $setup.buyGroupHandler(item))
      } : {}, {
        f: index
      });
    }),
    d: $props.showBuy
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
