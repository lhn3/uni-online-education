"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
var utils_showMessage = require("./utils/showMessage.js");
var request_request = require("./request/request.js");
var common_mixin_mixin = require("./common/mixin/mixin.js");
if (!Math) {
  "./pages/tab-index/index.js";
  "./pages/tab-category/category.js";
  "./pages/tab-article/article.js";
  "./pages/tab-question/question.js";
  "./pages/tab-my/my.js";
  "./pages/public/public.js";
  "./pages/search/search.js";
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
  app.mixin(common_mixin_mixin.mixin);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
