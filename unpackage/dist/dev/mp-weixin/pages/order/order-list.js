"use strict";
var common_vendor = require("../../common/vendor.js");
var request_orderApi = require("../../request/order-api.js");
require("../../request/request.js");
require("../../utils/showMessage.js");
const _sfc_main = {
  setup() {
    let { proxy } = common_vendor.getCurrentInstance();
    let orderList = common_vendor.ref([]);
    let isShow = common_vendor.ref(false);
    let balance = common_vendor.ref(0);
    let clickItem = common_vendor.ref(null);
    let price = common_vendor.ref(0);
    let loading = common_vendor.ref(false);
    let isIos = common_vendor.ref(false);
    let payStyle = common_vendor.ref(null);
    common_vendor.onMounted(async () => {
      if (isIos.value) {
        payStyle.value = "iospay";
      } else {
        payStyle.value = "wxpay";
      }
      orderList.value = await request_orderApi.getOrderList();
    });
    let canPay = common_vendor.computed$1(() => parseFloat(balance.value) >= parseFloat(price.value));
    let courseIds = common_vendor.computed$1(() => {
      let courseIdList = [];
      if (clickItem.value.courseList) {
        clickItem.value.courseList.forEach((item) => {
          courseIdList.push(item.id);
        });
      }
      return courseIdList;
    });
    const orderCancel = (item) => {
      proxy.$message.confirm("\u786E\u5B9A\u53D6\u6D88\u8BA2\u5355").then(async () => {
        await request_orderApi.cancelOrder(item.id);
        item.status = 3;
        proxy.$message.toast("\u53D6\u6D88\u6210\u529F", "success");
      });
    };
    const orderDelete = (item) => {
      proxy.$message.confirm("\u786E\u5B9A\u5220\u9664\u8BA2\u5355").then(async () => {
        await request_orderApi.deleteOrder(item.id);
        orderList.value.splice(orderList.value.indexOf(item), 1);
        proxy.$message.toast("\u5220\u9664\u6210\u529F", "success");
      });
    };
    const orderPayBtn = async (item) => {
      if (isIos.value) {
        loading.value = true;
        balance.value = await request_orderApi.getBalance();
        loading.value = false;
      }
      isShow.value = true;
      clickItem.value = item;
      price.value = item.priceDiscount || item.pricePayable;
    };
    const showHidePay = () => {
      isShow.value = false;
    };
    let radioChange = (e) => {
      payStyle.value = e.detail.value;
    };
    const XuNiPay = async (data) => {
      loading.value = true;
      common_vendor.index.showLoading({
        title: "\u652F\u4ED8\u4E2D...",
        mask: true
      });
      let res = await request_orderApi.orderPay(data);
      setTimeout(() => {
        common_vendor.index.hideLoading();
        loading.value = false;
        isShow.value = false;
        if (res.code == 200) {
          clickItem.value.status = 2;
          proxy.$message.toast("\u652F\u4ED8\u6210\u529F", "success");
        } else {
          proxy.$message.toast("\u652F\u4ED8\u5931\u8D25", "error");
        }
      }, 2e3);
    };
    const iosPayHandler = () => {
      if (canPay.value) {
        XuNiPay(courseIds.value);
      } else {
        proxy.navTo("/pages/order/my-balance?params=" + JSON.stringify({ price: price.value }));
      }
    };
    const payHandler = async () => {
      loading.value = true;
      if (payStyle.value == "wxpay") {
        await request_orderApi.getWXOrderInfo(courseIds.value);
      } else if (payStyle.value == "alipay") {
        await request_orderApi.getALOrderInfo(courseIds.value);
      }
      XuNiPay(courseIds.value);
    };
    return {
      orderList,
      isShow,
      balance,
      price,
      loading,
      canPay,
      isIos,
      payStyle,
      orderCancel,
      orderDelete,
      orderPayBtn,
      showHidePay,
      radioChange,
      iosPayHandler,
      payHandler
    };
  }
};
if (!Array) {
  const _easycom_course_item2 = common_vendor.resolveComponent("course-item");
  _easycom_course_item2();
}
const _easycom_course_item = () => "../../components/course-item/course-item.js";
if (!Math) {
  _easycom_course_item();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($setup.orderList, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.updateDate),
        b: common_vendor.t(item.orderId),
        c: common_vendor.f(item.courseList, (course, index2, i1) => {
          return {
            a: index2,
            b: "abc9f876-0-" + i0 + "-" + i1,
            c: common_vendor.p({
              item: course
            })
          };
        }),
        d: common_vendor.t(item.priceDiscount || item.pricePayable),
        e: item.status === 1
      }, item.status === 1 ? {} : {}, {
        f: item.status === 3
      }, item.status === 3 ? {} : {}, {
        g: item.status === 2
      }, item.status === 2 ? {} : {}, {
        h: item.status === 1
      }, item.status === 1 ? {
        i: common_vendor.o(($event) => $setup.orderCancel(item))
      } : {}, {
        j: item.status === 1
      }, item.status === 1 ? {
        k: common_vendor.o(($event) => $setup.orderPayBtn(item))
      } : {}, {
        l: item.status === 3
      }, item.status === 3 ? {
        m: common_vendor.o(($event) => $setup.orderDelete(item))
      } : {}, {
        n: index
      });
    }),
    b: $setup.isShow
  }, $setup.isShow ? {
    c: common_vendor.o(() => {
    })
  } : {}, {
    d: $setup.isShow
  }, $setup.isShow ? common_vendor.e({
    e: common_vendor.o((...args) => $setup.showHidePay && $setup.showHidePay(...args)),
    f: common_vendor.t($setup.price),
    g: $setup.payStyle == "wxpay",
    h: common_vendor.o((...args) => $setup.radioChange && $setup.radioChange(...args)),
    i: $setup.payStyle == "iospay"
  }, $setup.payStyle == "iospay" ? {
    j: common_vendor.t($setup.canPay ? "\u7ACB\u5373\u652F\u4ED8" : "\u5145\u503C\u5E76\u652F\u4ED8"),
    k: $setup.loading,
    l: $setup.loading,
    m: common_vendor.o((...args) => $setup.iosPayHandler && $setup.iosPayHandler(...args))
  } : {}, {
    n: $setup.payStyle == "wxpay" || $setup.payStyle == "alipay"
  }, $setup.payStyle == "wxpay" || $setup.payStyle == "alipay" ? {
    o: $setup.loading,
    p: $setup.loading,
    q: common_vendor.o((...args) => $setup.payHandler && $setup.payHandler(...args))
  } : {}, {
    r: $setup.payStyle == null
  }, $setup.payStyle == null ? {} : {}, {
    s: common_vendor.o(() => {
    })
  }) : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
