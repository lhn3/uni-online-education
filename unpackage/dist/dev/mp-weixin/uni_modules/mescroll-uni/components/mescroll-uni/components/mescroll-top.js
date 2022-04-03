"use strict";
var common_vendor = require("../../../../../common/vendor.js");
const _sfc_main = {
  props: {
    option: Object,
    value: false
  },
  computed: {
    mOption() {
      return this.option || {};
    },
    left() {
      return this.mOption.left ? this.addUnit(this.mOption.left) : "auto";
    },
    right() {
      return this.mOption.left ? "auto" : this.addUnit(this.mOption.right);
    }
  },
  methods: {
    addUnit(num) {
      if (!num)
        return 0;
      if (typeof num === "number")
        return num + "rpx";
      return num;
    },
    toTopClick() {
      this.$emit("input", false);
      this.$emit("click");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $options.mOption.src
  }, $options.mOption.src ? {
    b: common_vendor.n($props.value ? "mescroll-totop-in" : "mescroll-totop-out"),
    c: common_vendor.n({
      "mescroll-totop-safearea": $options.mOption.safearea
    }),
    d: $options.mOption.zIndex,
    e: $options.left,
    f: $options.right,
    g: $options.addUnit($options.mOption.bottom),
    h: $options.addUnit($options.mOption.width),
    i: $options.addUnit($options.mOption.radius),
    j: $options.mOption.src,
    k: common_vendor.o((...args) => $options.toTopClick && $options.toTopClick(...args))
  } : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
