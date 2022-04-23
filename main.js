import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import message from './utils/showMessage.js'
import request from './request/request.js'
import mixin from '@/common/mixin/mixin.js'
import * as utils from '@/utils/util.js'
import * as env from '@/config/env.js'
import {store,keepVuex} from '@/store/index.js'

keepVuex()
export function createApp() {
  const app = createSSRApp(App)
  app.config.globalProperties.$message = message;
  app.config.globalProperties.$request = request;
  app.config.globalProperties.$utils = utils;
  app.config.globalProperties.$env = env;
  app.mixin(mixin)
  app.use(store)
  return {
    app
  }
}

// #endif