// 获取用户地址信息
import { reqAddressInfo } from "@/api";
import { reqOrderInfo } from "@/api";
const state = {
  address: [],
  orderInfo: {},
};
const actions = {
  // 获取用户地址信息
  async getUserAddress({ commit }) {
    let result = await reqAddressInfo();
    // console.log(result);
    if (result.code === 200) {
      commit("GETUSERADDERSS", result.data);
    }
  },
  // 获取商品清单数据
  async getOrderInfo({ commit }) {
    let result = await reqOrderInfo();
      // console.log(result);
    if (result.code === 200) {
      commit("GETORDERINFO", result.data);
    }
  },
};
const mutations = {
  GETUSERADDERSS(state, address) {
    state.address = address;
  },
  GETORDERINFO(state, orderInfo) {
    state.orderInfo = orderInfo;
  },
};
const getters = {};
export default {
  state,
  actions,
  mutations,
  getters,
};
