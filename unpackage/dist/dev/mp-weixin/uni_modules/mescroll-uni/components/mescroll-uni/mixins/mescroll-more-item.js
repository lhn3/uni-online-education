"use strict";
const MescrollMoreItemMixin = {
  props: {
    i: Number,
    index: {
      type: Number,
      default() {
        return 0;
      }
    }
  },
  data() {
    return {
      downOption: {
        auto: false
      },
      upOption: {
        auto: false
      },
      isInit: false
    };
  },
  watch: {
    index(val) {
      if (this.i === val && !this.isInit)
        this.mescrollTrigger();
    }
  },
  methods: {
    mescrollInitByRef() {
      if (!this.mescroll || !this.mescroll.resetUpScroll) {
        let mescrollRef = this.$refs.mescrollRef || this.$refs["mescrollRef" + this.i];
        if (mescrollRef)
          this.mescroll = mescrollRef.mescroll;
      }
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
      this.mescrollInitByRef && this.mescrollInitByRef();
      if (this.i === this.index)
        ;
    },
    mescrollTrigger() {
      this.isInit = true;
      if (this.mescroll) {
        if (this.mescroll.optDown.use) {
          this.mescroll.triggerDownScroll();
        } else {
          this.mescroll.triggerUpScroll();
        }
      }
    }
  }
};
exports.MescrollMoreItemMixin = MescrollMoreItemMixin;
