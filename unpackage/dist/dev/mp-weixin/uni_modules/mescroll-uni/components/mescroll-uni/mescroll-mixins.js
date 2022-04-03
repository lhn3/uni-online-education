"use strict";
const MescrollMixin = {
  data() {
    return {
      mescroll: null
    };
  },
  onPullDownRefresh() {
    this.mescroll && this.mescroll.onPullDownRefresh();
  },
  onPageScroll(e) {
    this.mescroll && this.mescroll.onPageScroll(e);
  },
  onReachBottom() {
    this.mescroll && this.mescroll.onReachBottom();
  },
  methods: {
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
      this.mescrollInitByRef();
    },
    mescrollInitByRef() {
      if (!this.mescroll || !this.mescroll.resetUpScroll) {
        let mescrollRef = this.$refs.mescrollRef;
        if (mescrollRef)
          this.mescroll = mescrollRef.mescroll;
      }
    },
    downCallback() {
      if (this.mescroll.optUp.use) {
        this.mescroll.resetUpScroll();
      } else {
        setTimeout(() => {
          this.mescroll.endSuccess();
        }, 500);
      }
    },
    upCallback() {
      setTimeout(() => {
        this.mescroll.endErr();
      }, 500);
    }
  },
  mounted() {
    this.mescrollInitByRef();
  }
};
exports.MescrollMixin = MescrollMixin;
