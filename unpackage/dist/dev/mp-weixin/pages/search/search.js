"use strict";
var common_vendor = require("../../common/vendor.js");
const uniSearchBar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _sfc_main = {
  components: {
    "uni-search-bar": uniSearchBar
  },
  setup() {
    const { proxy } = common_vendor.getCurrentInstance();
    let params = common_vendor.ref({});
    let content = common_vendor.ref("");
    let focuse = common_vendor.ref(false);
    const doSearh = () => {
      common_vendor.index.showLoading();
      setTimeout(() => {
        common_vendor.index.hideLoading();
      }, 1e3);
    };
    common_vendor.onNavigationBarButtonTap((e) => {
      if (content.value == "") {
        proxy.$message.toast("\u8BF7\u8F93\u5165\u641C\u7D22\u5185\u5BB9");
      } else {
        doSearh();
      }
    });
    common_vendor.onNavigationBarSearchInputChanged((e) => {
      content.value = e.text;
    });
    const inputChange = (e) => {
      console.log("\u76D1\u542C\u8F93\u5165\u6846\u6539\u53D8", e);
    };
    return {
      params,
      content,
      doSearh,
      inputChange,
      focuse
    };
  },
  onLoad(option) {
    if (option.data) {
      let data = JSON.parse(option.data);
      this.params = data;
      this.focuse = false;
      this.doSearh();
    } else {
      this.focuse = true;
    }
  }
};
if (!Array) {
  const _component_uni_search_bar = common_vendor.resolveComponent("uni-search-bar");
  _component_uni_search_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($setup.doSearh),
    b: common_vendor.o($setup.inputChange),
    c: common_vendor.o(($event) => $setup.content = $event),
    d: common_vendor.p({
      focus: $setup.focuse,
      radius: 100,
      placeholder: "\u8BF7\u8F93\u5165\u641C\u7D22\u5185\u5BB9",
      modelValue: $setup.content
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
