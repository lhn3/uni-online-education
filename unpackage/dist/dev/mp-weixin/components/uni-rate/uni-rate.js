"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "UniRate",
  props: {
    isFill: {
      type: [Boolean, String],
      default: true
    },
    color: {
      type: String,
      default: "#ececec"
    },
    activeColor: {
      type: String,
      default: "#A2CD5A"
    },
    disabledColor: {
      type: String,
      default: "#c0c0c0"
    },
    size: {
      type: [Number, String],
      default: 24
    },
    value: {
      type: [Number, String],
      default: 1
    },
    max: {
      type: [Number, String],
      default: 5
    },
    margin: {
      type: [Number, String],
      default: 0
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    readonly: {
      type: [Boolean, String],
      default: false
    },
    allowHalf: {
      type: [Boolean, String],
      default: false
    },
    touchable: {
      type: [Boolean, String],
      default: true
    }
  },
  data() {
    return {
      valueSync: ""
    };
  },
  watch: {
    value(newVal) {
      this.valueSync = Number(newVal);
    }
  },
  computed: {
    stars() {
      const value = this.valueSync ? this.valueSync : 0;
      const starList = [];
      const floorValue = Math.floor(value);
      const ceilValue = Math.ceil(value);
      for (let i = 0; i < this.max; i++) {
        if (floorValue > i) {
          starList.push({
            activeWitch: "100%"
          });
        } else if (ceilValue - 1 === i) {
          starList.push({
            activeWitch: (value - floorValue) * 100 + "%"
          });
        } else {
          starList.push({
            activeWitch: "0"
          });
        }
      }
      return starList;
    }
  },
  created() {
    this.valueSync = Number(this.value);
    this._rateBoxLeft = 0;
    this._oldValue = null;
  },
  mounted() {
    setTimeout(() => {
      this._getSize();
    }, 100);
  },
  methods: {
    touchstart(e) {
      if (this.readonly || this.disabled)
        return;
      const {
        clientX,
        screenX
      } = e.changedTouches[0];
      this._getRateCount(clientX || screenX);
    },
    touchmove(e) {
      if (this.readonly || this.disabled || !this.touchable)
        return;
      const {
        clientX,
        screenX
      } = e.changedTouches[0];
      this._getRateCount(clientX || screenX);
    },
    _getRateCount(clientX) {
      const rateMoveRange = clientX - this._rateBoxLeft;
      let index = parseInt(rateMoveRange / (this.size + this.margin));
      index = index < 0 ? 0 : index;
      index = index > this.max ? this.max : index;
      const range = parseInt(rateMoveRange - (this.size + this.margin) * index);
      let value = 0;
      if (this._oldValue === index)
        return;
      this._oldValue = index;
      if (this.allowHalf) {
        if (range > this.size / 2) {
          value = index + 1;
        } else {
          value = index + 0.5;
        }
      } else {
        value = index + 1;
      }
      value = Math.max(0.5, Math.min(value, this.max));
      this.valueSync = value;
      this._onChange();
    },
    _onChange() {
      this.$emit("input", this.valueSync);
      this.$emit("change", {
        value: this.valueSync
      });
    },
    _getSize() {
      common_vendor.index.createSelectorQuery().in(this).select(".uni-rate").boundingClientRect().exec((ret) => {
        if (ret) {
          this._rateBoxLeft = ret[0].left;
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($options.stars, (star, index, i0) => {
      return {
        a: star.activeWitch,
        b: index
      };
    }),
    b: $props.color,
    c: $props.size + "px",
    d: common_vendor.n($props.isFill ? "iconfont icon-star-filled" : "iconfont icon-star"),
    e: $props.disabled ? $props.disabledColor : $props.activeColor,
    f: $props.size + "px",
    g: $props.margin + "px",
    h: common_vendor.o((...args) => $options.touchstart && $options.touchstart(...args)),
    i: common_vendor.o((...args) => $options.touchmove && $options.touchmove(...args))
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b7a28ab8"]]);
wx.createComponent(Component);
