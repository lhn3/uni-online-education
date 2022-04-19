"use strict";
var common_vendor = require("../../common/vendor.js");
var request_orderApi = require("../../request/order-api.js");
require("../../request/request.js");
require("../../utils/showMessage.js");
const _sfc_main = {
  setup() {
    let { proxy } = common_vendor.getCurrentInstance();
    let params = common_vendor.ref({});
    let balance = common_vendor.ref(0);
    let loading = common_vendor.ref(true);
    let activeIndex = common_vendor.ref(0);
    let selectBalance = common_vendor.ref(0);
    let moneyList = common_vendor.ref([30, 50, 100, 200, 500]);
    let iapChannel = common_vendor.ref(null);
    const clickItem = (index, item) => {
      activeIndex.value = index;
      selectBalance.value = item;
    };
    const iosPayHandler = () => {
      loading.value = true;
      common_vendor.index.showLoading({
        title: "\u5145\u503C\u4E2D...",
        mask: true
      });
      setTimeout(() => {
        proxy.$message.toast("\u5145\u503C\u6210\u529F", "success");
        balance.value += selectBalance.value;
        loading.value = false;
        common_vendor.index.hideLoading();
      }, 2e3);
    };
    return {
      params,
      balance,
      loading,
      activeIndex,
      selectBalance,
      moneyList,
      iapChannel,
      clickItem,
      iosPayHandler
    };
  },
  async onLoad(option) {
    if (option.params) {
      this.params = JSON.parse(option.params);
    }
    this.init();
    plus.payment.getChannels((channels) => {
      console.log("\u83B7\u53D6\u5230channel" + JSON.stringify(channels));
      channels.push({ "id": "appleiap", "description": "\u82F9\u679C", "serviceReady": true });
      for (let i in channels) {
        let channel = channels[i];
        if (channel.id === "appleiap") {
          this.iapChannel = channel;
          this.requestOrder();
        }
      }
      if (!this.iapChannel) {
        this.errorMsg();
      }
    }, (error) => {
      this.errorMsg();
    });
  },
  methods: {
    async init() {
      this.balance = await request_orderApi.getBalance();
      this.selectBalance = this.params.price - this.balance;
      this.moneyList.unshift(this.selectBalance);
    },
    requestOrder() {
      common_vendor.index.showLoading({
        title: "\u68C0\u6D4B\u652F\u4ED8\u73AF\u5883..."
      });
      setTimeout(() => {
        this.loading = false;
        common_vendor.index.hideLoading();
      }, 2e3);
    },
    errorMsg() {
      common_vendor.index.showModal({
        content: "\u6682\u4E0D\u652F\u6301\u82F9\u679C iap \u652F\u4ED8",
        showCancel: false
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t(parseFloat($setup.balance).toFixed(2)),
    b: common_vendor.f($setup.moneyList, (item, index, i0) => {
      return {
        a: common_vendor.t(parseFloat(item).toFixed(2)),
        b: common_vendor.t(parseFloat(item).toFixed(2)),
        c: index === $setup.activeIndex ? 1 : "",
        d: index,
        e: common_vendor.o(($event) => $setup.clickItem(index, item))
      };
    }),
    c: $setup.loading,
    d: $setup.loading,
    e: common_vendor.o((...args) => $setup.iosPayHandler && $setup.iosPayHandler(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
