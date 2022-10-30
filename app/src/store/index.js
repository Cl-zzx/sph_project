import Vue from "vue";
import Vuex from "vuex";

// 使用插件
Vue.use(Vuex);
import home from "./home";
import search from "./search";
import Detail from "./Detail";
import shopCart from "./shopCart";
import User from "./User";
import Trade from "./Trade";
// 需要对外暴露Store对象的一个实例
export default new Vuex.Store({
  modules: {
    home,
    search,
    Detail,
    shopCart,
    User,
    Trade,
  },
});
