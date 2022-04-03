"use strict";
var common_vendor = require("../vendor.js");
var mixin = {
  data() {
    return {
      page: 2
    };
  },
  methods: {
    navTo(url, options = {}) {
      if (!url) {
        return;
      }
      if (options.login && !this.$store.getters.hasLogin) {
        url = "/pages/auth/login";
      }
      common_vendor.index.navigateTo({
        url
      });
    },
    navBack(delta = 1) {
      common_vendor.index.navigateBack({
        delta
      });
    }
  }
};
exports.mixin = mixin;
