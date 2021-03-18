// Import Vue
import Vue from "vue";
import store from "./store";

// Import F7 Bundle
// import Framework7 from 'framework7/lite-bundle'
// import Framework7 from 'framework7/lite';

// Import F7-Vue Plugin Bundle (with all F7 components registered)
// import Framework7Vue, { registerComponents } from 'framework7-vue/bundle'
// import Framework7Vue from 'framework7-vue';

import Framework7Vue from "framework7-vue";

import Framework7, {
  Device,
  Request,
  Utils,
} from "framework7/framework7-lite.esm";

import Preloader from "framework7/components/preloader/preloader";
import Toast from "framework7/components/toast/toast";
import Dialog from "framework7/components/dialog/dialog";

// Init F7-Vue Plugin
Framework7.use([Framework7Vue, Preloader, Toast, Dialog]);

import {
  f7App,
  f7View,
  f7Preloader,
  f7Navbar,
  f7Page,
  f7Button,
  f7List,
  f7Block,
  f7Link,
  f7ListItem,
  f7BlockTitle,
} from "framework7-vue";
Vue.component("f7-app", f7App);
Vue.component("f7-view", f7View);
Vue.component("f7-preloader", f7Preloader);
Vue.component("f7-navbar", f7Navbar);
Vue.component("f7-page", f7Page);
Vue.component("f7-view", f7View);
Vue.component("f7-button", f7Button);
Vue.component("f7-list", f7List);
Vue.component("f7-list-item", f7ListItem);
Vue.component("f7-block-title", f7BlockTitle);
Vue.component("f7-block", f7Block);
Vue.component("f7-link", f7Link);

// Import F7 Styles
import "framework7/css/framework7.bundle.css";

// Import Icons and App Custom Styles
// import "./style/css/icons.css";
import "./style/css/app.css";

import { Tab, TabItem, TransferDom } from "vux";
Vue.component("tab", Tab);
Vue.component("tab-item", TabItem);
Vue.directive("transfer-dom", TransferDom);

// import "@/lib/iconfont/iconfont.css";
import "./style/public.less";
import "./style/theme.less";
// import './style/weui.min.css'

import mixins from "@/common/mixins";
import core from "@/core";

import Native from "@/core/native_plugin.js";

// Import App Component
import App from "./App.vue";
window.NativeApi = Native;

// 注册全局方法
Vue.mixin(mixins);

Vue.prototype.$core = core;
// Init App
// let globalVueObject = new Vue({
//   el: '#app',
//   template: '<app/>',

//   // Register App Component
//   components: {
//     app: App
//   }
// })

let globalVueObject = new Vue({
  // router,
  store,
  render: (h) => h(App),
}).$mount("#app");

window.GlobalVueObject = globalVueObject;
