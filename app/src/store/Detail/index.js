import { reqGoodsInfo } from "@/api";
import { reqAddOrUpdateShopCart } from "@/api";
// 封装游客身份模块uuid--->生成一个随机字符串（一旦生成不能改变）
import { getUUID } from "@/utils/uuid_token";
const state = {
  goodInfo: {},
  uuid_token: getUUID(),
};
const actions = {
  async getGoodsInfo({ commit }, skuid) {
    let result = await reqGoodsInfo(skuid);
    if (result.code === 200) {
      commit("GETGOODSINFO", result.data);
    }
  },

  // 将产品添加到购物车中或者修改某一个产品的个数
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    // 加入购物车返回的结果
    // 加入购物车以后（发请求）：前台将参数带给服务器，服务器写入数据成功，并没有返回其他数据，只是返回code=200,代表这次操作成功
    // 因为服务器没有返回其余的数据，因此不需要三连环存储数据
    // 注意：async函数执行返回的结果一定是一个promise【要么成功，要么失败】
    let result = await reqAddOrUpdateShopCart(skuId, skuNum);
    if (result.code == 200) {
      // 代表加入购物车成功
      return "ok";
    } else {
      // 代表加入购物车失败
      return Promise.reject(new Error("Failed"));
    }
  },
};
const mutations = {
  GETGOODSINFO(state, goodInfo) {
    state.goodInfo = goodInfo;
  },
};
// 简化数据而生
const getters = {
  categoryView(state) {
    // 比如：state.goodInfo的初始状态为空对象，空对象的categoryView属性值是undefined，因此要设置为空对象
    // 当前计算出来的属性值，至少是一个空对象，假的报错就不会有了
    return state.goodInfo.categoryView || {};
  },
  skuInfo(state) {
    return state.goodInfo.skuInfo || {};
  },
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || [];
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
