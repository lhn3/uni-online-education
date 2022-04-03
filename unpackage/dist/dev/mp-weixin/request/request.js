"use strict";
var common_vendor = require("../common/vendor.js");
var utils_showMessage = require("../utils/showMessage.js");
let BASE_URL = "https://mock.mengxuegu.com/mock/6246a1929a111d2ee2cb4f92/education";
const request = (options = {}) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: BASE_URL + options.url,
      method: options.method || "GET",
      data: options.data || {},
      timeout: 6e3,
      success: (res) => {
        if (res.data.code == 200) {
          resolve(res.data.data);
        } else {
          utils_showMessage.message.toast("\u8BF7\u6C42\u63A5\u53E3\u5931\u8D25", "error");
        }
      },
      fail: (err) => {
        utils_showMessage.message.toast("\u8BF7\u6C42\u63A5\u53E3\u5931\u8D25", "error");
        reject(err);
      }
    });
  });
};
exports.request = request;
