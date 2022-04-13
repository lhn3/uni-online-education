"use strict";
var common_vendor = require("../../common/vendor.js");
const coursePackage = () => "../course/cpns/course-package.js";
const _sfc_main = {
  components: {
    "course-package": coursePackage
  },
  setup() {
    let detail = common_vendor.ref({});
    let loading = common_vendor.ref(false);
    let isIos = common_vendor.ref(false);
    let payStyle = common_vendor.ref(null);
    let radioChange = (e) => {
      payStyle.value = e.detail.value;
    };
    const iosPayHandler = () => {
      console.log("\u82F9\u679C\u652F\u4ED8");
    };
    const wxPayHandler = () => {
      console.log("\u5FAE\u4FE1\u652F\u4ED8");
    };
    const payHandler = () => {
      console.log("\u652F\u4ED8\u5B9D\u652F\u4ED8");
    };
    return {
      detail,
      loading,
      isIos,
      payStyle,
      radioChange,
      iosPayHandler,
      wxPayHandler,
      payHandler
    };
  },
  onLoad(option) {
    this.detail = JSON.parse(decodeURIComponent(option.detail));
  }
};
if (!Array) {
  const _easycom_course_item2 = common_vendor.resolveComponent("course-item");
  const _component_tempalte = common_vendor.resolveComponent("tempalte");
  (_easycom_course_item2 + _component_tempalte)();
}
const _easycom_course_item = () => "../../components/course-item/course-item.js";
if (!Math) {
  _easycom_course_item();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $setup.detail.list
  }, $setup.detail.list ? {
    b: common_vendor.f($setup.detail.list, (item, k0, i0) => {
      return {
        a: "6fdd3a21-1-" + i0 + ",6fdd3a21-0",
        b: common_vendor.p({
          item
        })
      };
    })
  } : {
    c: common_vendor.p({
      item: $setup.detail
    })
  }, {
    d: $setup.isIos
  }, $setup.isIos ? {} : {
    e: common_vendor.o((...args) => $setup.radioChange && $setup.radioChange(...args))
  }, {
    f: common_vendor.t($setup.detail.priceOriginal || $setup.detail.totalPrice),
    g: $setup.detail.priceDiscount || $setup.detail.groupPrice
  }, $setup.detail.priceDiscount || $setup.detail.groupPrice ? {
    h: common_vendor.t($setup.detail.priceDiscount || $setup.detail.groupPrice)
  } : {}, {
    i: $setup.isIos
  }, $setup.isIos ? {
    j: $setup.loading,
    k: $setup.loading,
    l: common_vendor.o((...args) => $setup.iosPayHandler && $setup.iosPayHandler(...args))
  } : common_vendor.e({
    m: $setup.payStyle == "wxpay"
  }, $setup.payStyle == "wxpay" ? {
    n: $setup.loading,
    o: $setup.loading,
    p: common_vendor.o((...args) => $setup.wxPayHandler && $setup.wxPayHandler(...args))
  } : {}, {
    q: $setup.payStyle == "alipay"
  }, $setup.payStyle == "alipay" ? {
    r: $setup.loading,
    s: $setup.loading,
    t: common_vendor.o((...args) => $setup.payHandler && $setup.payHandler(...args))
  } : {}, {
    v: $setup.payStyle == null
  }, $setup.payStyle == null ? {} : {}));
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
