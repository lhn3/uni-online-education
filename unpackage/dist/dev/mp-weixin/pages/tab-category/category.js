"use strict";
var common_vendor = require("../../common/vendor.js");
var request_courseApi = require("../../request/course-api.js");
require("../../request/request.js");
require("../../utils/showMessage.js");
const _sfc_main = {
  setup() {
    const { proxy } = common_vendor.getCurrentInstance();
    const state = common_vendor.ref([]);
    let activeTitle = common_vendor.ref();
    let labelList = common_vendor.ref([]);
    let activeLabel = common_vendor.ref();
    common_vendor.onMounted(async () => {
      let res = await request_courseApi.getCategory();
      state.value = res;
      activeTitle.value = res[0].id;
      labelList.value = res[0].labelList;
    });
    const selectTitle = (id, List) => {
      activeTitle.value = id;
      labelList.value = List;
    };
    const selectLabel = (id, name) => {
      activeLabel.value = id;
      let params = JSON.stringify({ labelId: id, name, activeIndex: activeTitle.value });
      proxy.navTo("/pages/search/search?data=" + params);
    };
    common_vendor.onNavigationBarButtonTap(() => {
      proxy.navTo("/pages/search/search");
    });
    return {
      state,
      activeTitle,
      labelList,
      activeLabel,
      selectTitle,
      selectLabel
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($setup.state, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: $setup.activeTitle == item.id ? 1 : "",
        c: item.id,
        d: common_vendor.o(($event) => $setup.selectTitle(item.id, item.labelList), item.id)
      };
    }),
    b: common_vendor.f($setup.labelList, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: $setup.activeLabel == item.id ? 1 : "",
        c: item.id,
        d: common_vendor.o(($event) => $setup.selectLabel(item.id, item.name), item.id)
      };
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
