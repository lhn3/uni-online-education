"use strict";
var common_vendor = require("./common/vendor.js");
var request_courseApi = require("./request/course-api.js");
const _sfc_main = {
  props: {
    value: {
      type: Object,
      default: () => null
    }
  },
  setup(props, { emit }) {
    const { proxy } = common_vendor.getCurrentInstance();
    const state = common_vendor.ref([]);
    let activeTitle = common_vendor.ref();
    let labelList = common_vendor.ref([]);
    let activeLabel = common_vendor.ref();
    common_vendor.onMounted(async () => {
      let res = await request_courseApi.getCategory();
      state.value = res;
      if (props.value != null) {
        state.value.forEach((item) => {
          item.labelList.unshift({ id: 0, name: "\u4E0D\u9650", cName: item.name, cId: item.id });
        });
        if (Object.keys(props.value).length > 0) {
          res.forEach((item) => {
            if (item.id == props.value.categoryId) {
              activeTitle.value = item.id;
              labelList.value = item.labelList;
            }
          });
        } else {
          activeTitle.value = res[0].id;
          labelList.value = res[0].labelList;
        }
      } else {
        activeTitle.value = res[0].id;
        labelList.value = res[0].labelList;
      }
    });
    const selectTitle = (id, List) => {
      activeTitle.value = id;
      labelList.value = List;
    };
    const selectLabel = (item) => {
      if (activeLabel.value == item.id)
        return;
      activeLabel.value = item.id;
      if (props.value != null) {
        item.categoryId = activeTitle.value;
        emit("searchCate", item);
      } else {
        let params = JSON.stringify({ labelId: item.id, name: item.name, categoryId: activeTitle.value });
        proxy.navTo("/pages/search/search?data=" + params);
      }
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
        d: common_vendor.o(($event) => $setup.selectLabel(item), item.id)
      };
    })
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
exports.Component = Component;
