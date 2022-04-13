"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
var utils_showMessage = require("./utils/showMessage.js");
var request_request = require("./request/request.js");
var common_mixin_mixin = require("./common/mixin/mixin.js");
var utils_util = require("./utils/util.js");
var config_env = require("./config/env.js");
if (!Math) {
  "./pages/tab-index/index.js";
  "./pages/tab-category/category.js";
  "./pages/tab-article/article.js";
  "./pages/tab-question/question.js";
  "./pages/tab-my/my.js";
  "./pages/public/public.js";
  "./pages/search/search.js";
  "./pages/course/course-details.js";
  "./pages/course/course-play.js";
  "./pages/order/confirm-buy.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.config.globalProperties.$message = utils_showMessage.message;
  app.config.globalProperties.$request = request_request.request;
  app.config.globalProperties.$utils = utils_util.utils;
  app.config.globalProperties.$env = config_env.env;
  app.mixin(common_mixin_mixin.mixin);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
