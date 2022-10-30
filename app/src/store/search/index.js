import { reqGetSearchInfo } from "@/api";
// search模块的小仓库
// state:仓库存储数据的地方
const state = {
  //仓库初始状态
  searchList: {},
};
// actions：处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
  // 获取search模块数据
  async getSearchList({ commit }, params = {}) {
    // 当前这个reqGetSearchInfo函数在调用获取服务器数据的时候,至少传递一个参数(空对象)
    // params形参:是当用户派发action的时候,第二个参数传递过来的,至少是一个空对象
    let result = await reqGetSearchInfo(params);
    if (result.code === 200) {
      // console.log(result.data);
      commit("GETSEARCHLIST", result.data);
    }
  },
};
// mutations：修改state的唯一手段
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList;
  },
};
// getters：理解为计算属性，用于简化仓库数据，让组件获取仓库数据更加方便
// 计算属性,在项目当中,getters为了简化仓库中的数据而生
// 可以把我们将来在组件当中需要用的数据简化一下[将来组件在获取数据的时候就方便了]
const getters = {
  // 当前形参是当前仓库中的state,并非大仓库中的state
  goodsList(state) {
    // state.searchList.goodsList如果服务器的数据回来了,没问题是一个数组
    // 假如网络不给力,或者没有网,state.searchList.goodsList会返回undefined
    // 计算新的属性的属性值至少需要给一个默认值
    return state.searchList.goodsList || [];
  },
  trademarkList(state) {
    return state.searchList.trademarkList || [];
  },
  attrsList(state) {
    return state.searchList.attrsList || [];
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
