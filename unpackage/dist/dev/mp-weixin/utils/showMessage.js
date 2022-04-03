"use strict";
var common_vendor = require("../common/vendor.js");
let message = {
  toast(title, type = "text") {
    if (title.length > 15) {
      console.error("toast\u957F\u5EA6\u8D85\u8FC715\u4E2A\u5B57\u7B26,\u5F53\u524D\u957F\u5EA6\u4E3A" + title.length);
      return;
    }
    var icon = "none";
    if (type) {
      switch (type) {
        case "text":
          icon = "none";
          break;
        case "success":
          icon = "success";
          break;
        case "error":
          icon = "error";
          break;
      }
    }
    common_vendor.index.showToast({
      title,
      icon
    });
  },
  confirm(title) {
    return new Promise((res, rej) => {
      common_vendor.index.showModal({
        title,
        cancelColor: "#b6b6b6",
        confirmColor: "#363636",
        success: (result) => {
          if (result.cancel) {
            rej(result);
          } else if (result.confirm) {
            res(result);
          }
        }
      });
    });
  }
};
exports.message = message;
