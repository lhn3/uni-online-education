"use strict";
const WxsMixin = {
  data() {
    return {
      wxsProp: {
        optDown: {},
        scrollTop: 0,
        bodyHeight: 0,
        isDownScrolling: false,
        isUpScrolling: false,
        isScrollBody: true,
        isUpBoth: true,
        t: 0
      },
      callProp: {
        callType: "",
        t: 0
      },
      renderBiz: {
        propObserver() {
        }
      }
    };
  },
  methods: {
    wxsCall(msg) {
      if (msg.type === "setWxsProp") {
        this.wxsProp = {
          optDown: this.mescroll.optDown,
          scrollTop: this.mescroll.getScrollTop(),
          bodyHeight: this.mescroll.getBodyHeight(),
          isDownScrolling: this.mescroll.isDownScrolling,
          isUpScrolling: this.mescroll.isUpScrolling,
          isUpBoth: this.mescroll.optUp.isBoth,
          isScrollBody: this.mescroll.isScrollBody,
          t: Date.now()
        };
      } else if (msg.type === "setLoadType") {
        this.downLoadType = msg.downLoadType;
        this.$set(this.mescroll, "downLoadType", this.downLoadType);
        this.$set(this.mescroll, "isDownEndSuccess", null);
      } else if (msg.type === "triggerDownScroll") {
        this.mescroll.triggerDownScroll();
      } else if (msg.type === "endDownScroll") {
        this.mescroll.endDownScroll();
      } else if (msg.type === "triggerUpScroll") {
        this.mescroll.triggerUpScroll(true);
      }
    }
  },
  mounted() {
    this.mescroll.optDown.afterLoading = () => {
      this.callProp = { callType: "showLoading", t: Date.now() };
    };
    this.mescroll.optDown.afterEndDownScroll = () => {
      this.callProp = { callType: "endDownScroll", t: Date.now() };
      let delay = 300 + (this.mescroll.optDown.beforeEndDelay || 0);
      setTimeout(() => {
        if (this.downLoadType === 4 || this.downLoadType === 0) {
          this.callProp = { callType: "clearTransform", t: Date.now() };
        }
        this.$set(this.mescroll, "downLoadType", this.downLoadType);
      }, delay);
    };
    this.wxsCall({ type: "setWxsProp" });
  }
};
exports.WxsMixin = WxsMixin;
