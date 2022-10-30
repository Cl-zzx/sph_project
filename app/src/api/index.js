// 当前的这个模块:API进行统一管理
import requests from "./request";
import mockRequests from "./mockRequest";

// 三级联动的接口
//  /api/product/getBaseCategoryList get  无参数

export const reqCategoryList = () => {
  //发请求:axios发请求返回的结果是Promise对象
  // return requests({ url: "/product/getBaseCategoryList", method: "get" });
  return requests.get("/product/getBaseCategoryList");
};

export const reqGetBannerList = () => {
  // 获取banner（Home首页轮播图的数据）
  return mockRequests.get("/banner");
};

export const reqFloorList = () => {
  // 获取Floor组件数据
  return mockRequests.get("/floor");
};

// 获取搜索模块的数据  地址:/api/list   请求方式:post  参数:需要带参数

/* 
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
*/
// 当前这个函数需要接收外部传递参数
// 且传递的参数至少得是一个空对象
export const reqGetSearchInfo = (params) => {
  return requests({
    url: "/list",
    method: "post",
    data: params,
  });
};

// 获取产品详情信息的接口 url:/api/item/{skuid} 请求方式:GET
export const reqGoodsInfo = (skuid) =>
  requests({ url: `/item/${skuid}`, method: "get" });

// 将产品添加到购物车中（或者更新某一个产品的个数）

// 请求地址：/api/cart/addToCart/{ skuId }/{ skuNum }
// 请求方式：POST
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
  return requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: "post",
  });
};

// 获取购物车列表数据的接口
// url:/api/cart/cartList
export const reqCartList = () => {
  return requests({ url: "/cart/cartList", method: "get" });
};

// 删除购物车中的某一条信息接口
// url: /api/cart/deleteCart/{skuId} method:delete
export const reqDeleteCartById = (skuId) => {
  return requests({ url: `/cart/deleteCart/${skuId}`, method: "delete" });
};

// 修改购物车商品选择状态
// url: /api/cart/checkCart/{skuId}/{isChecked}  method:get
export const reqUpdateCheckedById = (skuId, isChecked) => {
  return requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: "get",
  });
};

// 获取验证码的接口
// url:/api/user/passport/sendCode/{phone}  method:get
export const reqGetCode = (phone) => {
  return requests({ url: `/user/passport/sendCode/${phone}`, method: "get" });
};

// 注册用户的接口
// url: /api/user/passport/register method:post
export const reqUserRegister = (data) => {
  return requests({ url: "/user/passport/register", data, method: "post" });
};

// 登录的接口
// url: /api/user/passport/login method:post
export const reqUserLogin = (data) => {
  return requests({ url: "/user/passport/login", data, method: "post" });
};

// 获取用户信息的接口【需要带着用户的token向服务器要用户信息】
// url: /api/user/passport/auth/getUserInfo  method:get
export const reqUserInfo = () => {
  return requests({ url: "/user/passport/auth/getUserInfo", method: "get" });
};

// 退出登录的接口
// url: /api/user/passport/logout  get
export const reqLogout = () => {
  return requests({ url: "/user/passport/logout", method: "get" });
};

// 获取用户地址信息
export const reqAddressInfo = () => {
  // return requests({ url: '/user/userAddress/auth/findUserAddressList', method: "get" })
  // return mockRequests.get("/banner")
  return mockRequests.get("/address");
};

// 获取订单交易页信息
export const reqOrderInfo = () => {
  return requests({ url: "/order/auth/trade", method: "get" });
};

// 提交订单的接口
// url: /api/order/auth/submitOrder?tradeNo={tradeNo} method:post
export const reqSubmitOrder = (tradeNo, data) => {
  return requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: "post",
  });
};

// 获取支付信息
// url:"/api/payment/weixin/createNative/{orderId}"  method:get
export const reqPayInfo = (orderId) => {
  return requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: "get",
  });
};

// 获取支付订单状态
// url: /api/payment/weixin/queryPayStatus/{orderId} method:get
export const reqPayStatus = (orderId) => {
  return requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: "get",
  });
};

// 获取个人中心的数据
// url:/api/order/auth/{page}/{limit} method:get
export const reqMyOrderList = (page, limit) => {
  return requests({ url: `/order/auth/${page}/${limit}`, method: "get" });
};
