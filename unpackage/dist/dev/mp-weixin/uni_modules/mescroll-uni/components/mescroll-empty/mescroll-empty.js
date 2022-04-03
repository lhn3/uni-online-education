"use strict";
var uni_modules_mescrollUni_components_mescrollUni_mescrollUniOption = require("../mescroll-uni/mescroll-uni-option.js");
var uni_modules_mescrollUni_components_mescrollUni_mescrollI18n = require("../mescroll-uni/mescroll-i18n.js");
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  props: {
    option: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    icon() {
      if (this.option.icon != null) {
        return this.option.icon;
      } else {
        let i18nType = uni_modules_mescrollUni_components_mescrollUni_mescrollI18n.mescrollI18n.getType();
        if (this.option.i18n) {
          return this.option.i18n[i18nType].icon;
        } else {
          return uni_modules_mescrollUni_components_mescrollUni_mescrollUniOption.GlobalOption.i18n[i18nType].up.empty.icon || uni_modules_mescrollUni_components_mescrollUni_mescrollUniOption.GlobalOption.up.empty.icon;
        }
      }
    },
    tip() {
      if (this.option.tip != null) {
        return this.option.tip;
      } else {
        let i18nType = uni_modules_mescrollUni_components_mescrollUni_mescrollI18n.mescrollI18n.getType();
        if (this.option.i18n) {
          return this.option.i18n[i18nType].tip;
        } else {
          return uni_modules_mescrollUni_components_mescrollUni_mescrollUniOption.GlobalOption.i18n[i18nType].up.empty.tip || uni_modules_mescrollUni_components_mescrollUni_mescrollUniOption.GlobalOption.up.empty.tip;
        }
      }
    },
    btnText() {
      if (this.option.i18n) {
        let i18nType = uni_modules_mescrollUni_components_mescrollUni_mescrollI18n.mescrollI18n.getType();
        return this.option.i18n[i18nType].btnText;
      } else {
        return this.option.btnText;
      }
    }
  },
  methods: {
    emptyClick() {
      this.$emit("emptyclick");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $options.icon
  }, $options.icon ? {
    b: $options.icon
  } : {}, {
    c: $options.tip
  }, $options.tip ? {
    d: common_vendor.t($options.tip)
  } : {}, {
    e: $options.btnText
  }, $options.btnText ? {
    f: common_vendor.t($options.btnText),
    g: common_vendor.o((...args) => $options.emptyClick && $options.emptyClick(...args))
  } : {}, {
    h: $props.option.fixed ? 1 : "",
    i: $props.option.zIndex,
    j: $props.option.top
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
