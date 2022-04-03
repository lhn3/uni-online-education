"use strict";
var common_vendor = require("../../../../common/vendor.js");
const mescrollI18n = {
  def: "zh",
  getType() {
    return common_vendor.index.getStorageSync("mescroll-i18n") || this.def;
  },
  setType(type) {
    common_vendor.index.setStorageSync("mescroll-i18n", type);
  }
};
exports.mescrollI18n = mescrollI18n;
