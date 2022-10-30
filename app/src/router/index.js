// 配置路由的位置
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
// 引入store
import store from "@/store";
Vue.use(VueRouter);

//先把VueRouter原型对象的push保存一份
const originalPush = VueRouter.prototype.push;

//先把VueRouter原型对象的replace保存一份
const originalReplace = VueRouter.prototype.replace;
// 重复点击搜索路由会报 `Avoided redundant navigation to current location: "/search".`
// 可以添加下面几行代码进行解决

// 重写replace|push
// 第一个参数，告诉原来的push方法,往哪里跳转（包括传递哪些参数）
// 第二个参数：成功的回调函数
// 第三个参数：失败的回调函数
VueRouter.prototype.push = function push(location, resovle, reject) {
  if (resovle && reject) {
    // call和apply的区别
    // 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
    // 不同点：call与apply传递参数：call传递参数使用逗号隔开，apply方法执行，传递数组
    originalPush.call(this, location, resovle, reject);
  } else {
    originalPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

VueRouter.prototype.replace = function replace(location, resovle, reject) {
  if (resovle && reject) {
    originalReplace.call(this, location, resovle, reject);
  } else {
    originalReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

let router = new VueRouter({
  routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    // 返回的这个y=0,代表的滚动条在最上方
    return { y: 0 };
  },
});

// 全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to, from, next) => {
  // to:可以获取到你要跳转到的路由信息
  // from：可以获取到你从哪个路由而来的信息
  // next：放行的函数，next()放行    next(path) 放行到指定的路由  next(false)
  // next()
  // 用户登录了才会有token，未登录一定不会有token
  let token = store.state.User.token;
  let name = store.state.User.userInfo.name;
  if (token) {
    // 用户已经登录了，还想去login界面,停留在首页
    if (to.path == "/login") {
      next("/");
    } else {
      // 登陆了，但是去的不是login,可能是【home|search|shopcart】
      // 如果用户名已有，
      if (name) {
        next();
      } else {
        // 没有用户信息,派发action让仓库存储用户信息再跳转
        try {
          // 获取用户信息成功
          await store.dispatch("getUserInfo");
          next();
        } catch (error) {
          // token失效了,获取不到用户信息了，重新登录
          // 清除token
          await store.dispatch("userLogout");
          next("/login");
        }
      }
      next();
    }
  } else {
    // 未登录，暂时这样，后期再处理
    // 未登录不能去交易相关、支付相关【pay、paysucces】、个人中心【center】
    let toPath = to.path;
    if (
      toPath.indexOf("/trade") != -1 ||
      toPath.indexOf("/pay") != -1 ||
      toPath.indexOf("/center") != -1
    ) {
      next("/login?redirect=" + toPath);
    } else {
      next();
    }
  }
});

export default router;
