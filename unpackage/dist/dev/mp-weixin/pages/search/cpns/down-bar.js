"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var common_vendor = require("../../../common/vendor.js");
const category = () => "../../tab-category/category2.js";
const _sfc_main = {
  components: { category },
  props: {
    params: {
      type: Object,
      default: () => ({})
    },
    downCategoty: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit }) {
    let tabName = common_vendor.ref();
    let infos = common_vendor.ref([]);
    let param = common_vendor.ref();
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
    let searchCate = (item) => {
      infos.value.forEach((i) => {
        i.active = false;
      });
      if (item.id == 0) {
        infos.value[infos.value.length - 1].name = item.cName;
        tabName.value = item.cName;
        emit("changeCategory", { labelId: null, categoryId: item.categoryId });
      } else {
        infos.value[infos.value.length - 1].name = item.name;
        tabName.value = item.name;
        emit("changeCategory", { labelId: item.id, categoryId: item.categoryId });
      }
      param.value = { labelId: item.id, name: item.name, categoryId: item.categoryId };
    };
    return {
      infos,
      tabName,
      param,
      changeTab,
      changeCild,
      closeCategory,
      searchCate
    };
  },
  watch: {
    params: {
      handler: function(newValue) {
        if (Object.keys(newValue).length > 0) {
          common_vendor.nextTick(() => {
            let keys = Object.keys(newValue);
            let lis = this.downCategoty;
            if (keys.length == 1) {
              lis.forEach((item) => {
                if (item.type == keys[0]) {
                  item.name = item.list.find((i) => {
                    return i.id == newValue[keys[0]];
                  }).name;
                  this.tabName = item.name;
                }
              });
            } else {
              lis[lis.length - 1].name = newValue.name;
              this.tabName = newValue.name;
              this.param = newValue;
            }
          });
        }
      },
      immediate: true,
      deep: true
    }
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
        h: common_vendor.o($setup.searchCate),
        i: "561051e5-0-" + i0,
        j: common_vendor.p({
          value: __spreadValues({}, $setup.param)
        })
      } : {
        k: common_vendor.f(item.list, (i, k1, i1) => {
          return {
            a: common_vendor.t(i.name),
            b: i.name == $setup.tabName ? 1 : "",
            c: i.id,
            d: common_vendor.o(($event) => $setup.changeCild(item, i), i.id)
          };
        })
      }) : {}, {
        l: item.active
      }, item.active ? {
        m: common_vendor.o((...args) => $setup.closeCategory && $setup.closeCategory(...args))
      } : {}, {
        n: item.type
      });
    }),
    b: common_vendor.o(() => {
    })
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
