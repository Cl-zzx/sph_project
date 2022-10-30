import Vue from "vue";
import App from "./App.vue";
// 引入表单验证插件
import "@/plugins/validate";

// 引入路由
import router from "./router";
// 引入仓库
import store from "@/store";
// 引入Mock Server.js----mock数据
import mockServe from "@/mock/mockServe";
// 引入swiper样式
import "swiper/swiper-bundle.css";

import TypeNav from "@/components/TypeNav";
import Carousel from "@/components/Carousel";
import Pagination from "@/components/Pagination";

// 统一引入api文件夹里面全部请求函数
// 统一引入
import * as API from "@/api";
import { Button, MessageBox } from "element-ui";
Vue.component(Button.name, Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 将三级联动注册为全局组件
// 第一个参数：组件的名字,第二个参数：组件
Vue.component(TypeNav.name, TypeNav);
// 将轮播图注册为全局组件
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);
Vue.config.productionTip = false;

import VueLazyload from "vue-lazyload";
import atm from "@/assets/1.gif";
Vue.use(VueLazyload, {
  // 懒加载默认图片
  loading: atm,
});
new Vue({
  render: (h) => h(App),
  beforeCreate() {
    // 全局事件总线$bus的配置
    Vue.prototype.$bus = this;

    Vue.prototype.$API = API;
  },
  // 配置路由信息(router要小写)
  // 注册路由信息：当这里书写router的时候，组件身上都拥有$router和$router属性
  router, //配置项中，KV一致，V省略不写
  // 注册仓库，组件实例的身上会多一个$store属性
  store,
}).$mount("#app");
