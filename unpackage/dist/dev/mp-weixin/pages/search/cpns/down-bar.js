"use strict";
var common_vendor = require("../../../common/vendor.js");
const category = () => "../../tab-category/category2.js";
const _sfc_main = {
  components: { category },
  props: {
    downCategoty: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit }) {
    let tabName = common_vendor.ref();
    let infos = common_vendor.ref();
    common_vendor.onMounted(() => {
      infos.value = JSON.parse(JSON.stringify(props.downCategoty));
      tabName.value = infos.value[0].name;
    });
    let changeTab = (item) => {
      tabName.value = item.name;
      let act = item.active;
      infos.value.forEach((i) => {
        i.active = false;
      });
      item.active = !act;
    };
    let changeCild = (item, itemChild) => {
      item.active = false;
      if (tabName.value == itemChild.name)
        return;
      tabName.value = itemChild.name;
      item.name = itemChild.name;
      emit("changeCategory", { [item.type]: itemChild.id });
    };
    let closeCategory = () => {
      infos.value.forEach((i) => {
        i.active = false;
      });
    };
    return {
      infos,
      tabName,
      changeTab,
      changeCild,
      closeCategory
    };
  }
};
if (!Array) {
  const _component_category = common_vendor.resolveComponent("category");
  _component_category();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($setup.infos, (item, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.name),
        b: item.active
      }, item.active ? {} : {}, {
        c: !item.active
      }, !item.active ? {} : {}, {
        d: common_vendor.o(($event) => $setup.changeTab(item)),
        e: item.name == $setup.tabName ? 1 : "",
        f: item.active
      }, item.active ? common_vendor.e({
        g: item.isAllCategory
      }, item.isAllCategory ? {
        h: "561051e5-0-" + i0
      } : {
        i: common_vendor.f(item.list, (i, k1, i1) => {
          return {
            a: common_vendor.t(i.name),
            b: i.name == $setup.tabName ? 1 : "",
            c: i.id,
            d: common_vendor.o(($event) => $setup.changeCild(item, i), i.id)
          };
        })
      }) : {}, {
        j: item.active
      }, item.active ? {
        k: common_vendor.o((...args) => $setup.closeCategory && $setup.closeCategory(...args))
      } : {}, {
        l: item.type
      });
    }),
    b: common_vendor.o(() => {
    })
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
