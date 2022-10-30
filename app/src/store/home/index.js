import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api";
// home模块的小仓库
// state:仓库存储数据的地方
const state = {
  // state中的数据默认初始值别瞎写，服务器返回的是对象，起始值就是对象，服务器返回的是数组，起始值就是数组【根据接口返回的值进行初始化】
  // 商品分类列表的数据
  categoryList: [],
  // 轮播图的数据
  bannerList: [],
  // floor的数据
  floorList: [],
};
// actions：处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
  // 通过API里面的接口函数，向服务器发送请求，获取服务器的数据
  async categoryList({ commit }) {
    let result = await reqCategoryList();
    if (result.code === 200) {
      commit("CATEGORYLIST", result.data);
    }
  },
  async getBannerList({ commit }) {
    let result = await reqGetBannerList();
    // console.log(result);
    if (result.code === 200) {
      commit("GETBANNERLIST", result.data);
    }
  },

  async floorList({ commit }) {
    let result = await reqFloorList();
    if (result.code === 200) {
      // console.log(result.data);
      commit("FLOORLIST", result.data);
    }
  },
};
// mutations：修改state的唯一手段
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  FLOORLIST(state, floorList) {
    state.floorList = floorList;
  },
};
// getters：理解为计算属性，用于简化仓库数据，让组件获取仓库数据更加方便
const getters = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
