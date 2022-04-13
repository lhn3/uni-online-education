"use strict";
var common_vendor = require("../../common/vendor.js");
var request_courseApi = require("../../request/course-api.js");
require("../../request/request.js");
require("../../utils/showMessage.js");
const coursePackage = () => "../course/cpns/course-package.js";
const _sfc_main = {
  components: {
    "course-package": coursePackage
  },
  setup() {
    let { proxy } = common_vendor.getCurrentInstance();
    let detail = common_vendor.ref({});
    let loading = common_vendor.ref(false);
    let isIos = common_vendor.ref(false);
    let payStyle = common_vendor.ref(null);
    let balance = common_vendor.ref();
    let price = common_vendor.computed$1(() => detail.value.priceDiscount || detail.value.groupPrice || detail.value.priceOriginal || detail.value.totalPrice);
    let canPay = common_vendor.computed$1(() => parseFloat(balance.value) >= parseFloat(price.value));
    let courseIds = common_vendor.computed$1(() => {
      let courseIdList = [];
      if (detail.value.list) {
        detail.value.list.forEach((item) => {
          courseIdList.push(item.id);
        });
      } else {
        courseIdList.push(detail.value.id);
      }
      return courseIdList;
    });
    common_vendor.onMounted(() => {
    });
    let radioChange = (e) => {
      payStyle.value = e.detail.value;
    };
    const iosPayHandler = async () => {
      console.log("\u82F9\u679C\u652F\u4ED8");
      let data = { price: price.value, courseIds: courseIds.value };
      if (canPay.value) {
        loading.value = true;
        common_vendor.index.showLoading({
          title: "\u652F\u4ED8\u4E2D...",
          mask: true
        });
        let res = await request_courseApi.orderPay(data);
        setTimeout(() => {
          common_vendor.index.hideLoading();
          loading.value = false;
          if (res.code == 200) {
            common_vendor.index.showModal({
              content: "\u652F\u4ED8\u6210\u529F\uFF0C\u7ACB\u5373\u5B66\u4E60",
              showCancel: true,
              success: (e) => {
                if (e.confirm) {
                  common_vendor.index.redirectTo({ url: "/pages/course/course-details?id=" + detail.value.id });
                } else {
                  console.log("\u8BA2\u5355\u9875");
                }
              }
            });
          } else {
            proxy.$message.toast("\u652F\u4ED8\u5931\u8D25", "error");
          }
        }, 2e3);
      } else {
        proxy.navTo(`/pages/order/my-balance?params=${JSON.stringify(data)}`);
      }
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
      price,
      balance,
      canPay,
      radioChange,
      iosPayHandler,
      wxPayHandler,
      payHandler
    };
  },
  async onLoad(option) {
    this.detail = JSON.parse(decodeURIComponent(option.detail));
    this.balance = await request_courseApi.getBalance();
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
  }, $setup.isIos ? {
    e: common_vendor.t($setup.balance),
    f: common_vendor.t($setup.canPay ? "" : "(\u4F59\u989D\u4E0D\u8DB3)")
  } : {
    g: common_vendor.o((...args) => $setup.radioChange && $setup.radioChange(...args))
  }, {
    h: common_vendor.t($setup.detail.priceOriginal || $setup.detail.totalPrice),
    i: $setup.detail.priceDiscount || $setup.detail.groupPrice
  }, $setup.detail.priceDiscount || $setup.detail.groupPrice ? {
    j: common_vendor.t($setup.detail.priceDiscount || $setup.detail.groupPrice)
  } : {}, {
    k: common_vendor.t($setup.price),
    l: $setup.isIos
  }, $setup.isIos ? {
    m: common_vendor.t($setup.canPay ? "\u7ACB\u5373\u652F\u4ED8" : "\u5145\u503C\u5E76\u652F\u4ED8"),
    n: $setup.loading,
    o: $setup.loading,
    p: common_vendor.o((...args) => $setup.iosPayHandler && $setup.iosPayHandler(...args))
  } : common_vendor.e({
    q: $setup.payStyle == "wxpay"
  }, $setup.payStyle == "wxpay" ? {
    r: $setup.loading,
    s: $setup.loading,
    t: common_vendor.o((...args) => $setup.wxPayHandler && $setup.wxPayHandler(...args))
  } : {}, {
    v: $setup.payStyle == "alipay"
  }, $setup.payStyle == "alipay" ? {
    w: $setup.loading,
    x: $setup.loading,
    y: common_vendor.o((...args) => $setup.payHandler && $setup.payHandler(...args))
  } : {}, {
    z: $setup.payStyle == null
  }, $setup.payStyle == null ? {} : {}));
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
