// 引入一级路由组件
// import Home from "@/pages/Home";
import Login from "@/pages/Login";
// import Search from "@/pages/Search";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess";
import Center from "@/pages/Center";
// 引入二级路由组件
import MyOrder from "@/pages/Center/myOrder";
import GroupOrder from "@/pages/Center/groupOrder";

/* 
  当打包构建应用时，JavaScript包会变得非常大，影响页面加载
  如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候加载对应的组件，这样就更加高效了
*/

// 路由配置信息
export default [
  {
    path: "/communication",
    component: () => import("@/pages/Communication/Communication"),
    children: [
      {
        path: "event",
        component: () => import("@/pages/Communication/EventTest/EventTest"),
        meta: {
          isHideFooter: true,
        },
      },
      {
        path: "model",
        component: () => import("@/pages/Communication/ModelTest/ModelTest"),
        meta: {
          isHideFooter: true,
        },
      },
      {
        path: "sync",
        component: () => import("@/pages/Communication/SyncTest/SyncTest"),
        meta: {
          isHideFooter: true,
        },
      },
      {
        path: "attrs-listeners",
        component: () =>
          import("@/pages/Communication/AttrsListenersTest/AttrsListenersTest"),
        meta: {
          isHideFooter: true,
        },
      },
      {
        path: "children-parent",
        component: () =>
          import("@/pages/Communication/ChildrenParentTest/ChildrenParentTest"),
        meta: {
          isHideFooter: true,
        },
      },
      {
        path: "scope-slot",
        component: () =>
          import("@/pages/Communication/ScopeSlotTest/ScopeSlotTest"),
        meta: {
          isHideFooter: true,
        },
      },
    ],
  },
  {
    path: "/Center",
    name: "Center",
    component: Center,
    meta: { isShow: true },
    // 二级路由组件
    children: [
      {
        path: "myorder",
        name: "MyOrder",
        component: MyOrder,
      },
      {
        path: "grouporder",
        name: "GroupOrder",
        component: GroupOrder,
      },
      {
        path: "/center",
        redirect: "/center/myorder",
      },
    ],
  },
  {
    path: "/PaySuccess",
    name: "PaySuccess",
    component: PaySuccess,
    meta: { isShow: true },
  },
  {
    path: "/pay",
    name: "Pay",
    component: Pay,
    meta: { isShow: true },
    beforeEnter: (to, from, next) => {
      if (from.path == "/trade") {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/trade",
    name: "Trade",
    component: Trade,
    meta: { isShow: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path == "/shopcart") {
        // 去交易页面，必须是从购物车而来
        next();
      } else {
        // 取消当前的导航。如果浏览器的 URL 改变了(可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址
        // 其他的路由组件，停留在当前组件
        next(false);
      }
    },
  },
  {
    path: "/shopcart",
    name: "shopcart",
    component: ShopCart,
    meta: { isShow: true },
  },
  {
    path: "/addcartsuccess",
    name: "addcartsuccess",
    component: AddCartSuccess,
    meta: { isShow: true },
  },
  {
    // 当点击商品图片时,跳转到详情页面,在路由跳转的时候需要带上产品的id给详情页面
    path: "/detail/:skuid",
    component: Detail,
    meta: {
      // show:用于控制在当前组件时时候显示Footer组件
      show: true,
    },
  },
  {
    path: "/home",
    component: () => import("@/pages/Home"),
    meta: {
      // show:用于控制在当前组件时时候显示Footer组件
      show: true,
    },
  },
  {
    path: "/login",
    component: Login,
    meta: {
      show: false,
    },
  },
  {
    name: "search",
    // 组件接收params参数，需要提前进行占位
    path: "/search/:keyword?",
    component: () => import("@/pages/Search"),
    meta: {
      show: true,
    },
  },
  {
    path: "/register",
    component: Register,
    meta: {
      show: false,
    },
  },
  // 重定向，在项目跑起来的时候，访问/,立马让它重定向到首页
  {
    path: "/*",
    redirect: "./home",
  },
];
