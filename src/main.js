// Import Vue
import Vue from 'vue';

// Import F7
import Framework7 from 'framework7/framework7.esm.bundle.js';

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Import F7 Styles
import 'framework7/css/framework7.bundle.css';

// Import Icons and App Custom Styles
import IconsStyles from './style/css/icons.css';
import AppStyles from './style/css/app.css';

import '@/lib/iconfont/iconfont.css'
import './style/public.less'
import './style/theme.less'

import mixins from '@/common/mixins'
import core from "@/core";

import  Native from '@/core/native_plugin.js'
window.NativeApi = Native

// Import App Component
import App from './App.vue';

// Init F7 Vue Plugin
Framework7.use(Framework7Vue)

// 引入vux组件库
// import { TransferDom } from 'vux'
// Vue.directive('transfer-dom', TransferDom)



// 注册全局方法
Vue.mixin(mixins)

Vue.prototype.$core = core
// Init App
let globalVueObject = new Vue({
  el: '#app',
  template: '<app/>',

  // Register App Component
  components: {
    app: App
  }
});

window.GlobalVueObject = globalVueObject
