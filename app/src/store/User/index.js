// 登录与注册的模块
import { reqUserRegister } from "@/api";
import { reqGetCode } from "@/api";
import { reqUserLogin } from "@/api";
import { reqUserInfo } from "@/api";
import { setToken, getToken, removeToken } from "@/utils/token";
import { reqLogout } from "@/api";
const state = {
  code: "",
  token: getToken(),
  userInfo: {},
};
const actions = {
  // 获取验证码
  async getCode({ commit }, phone) {
    // 获取的验证码的这个接口：把验证码返回，但是正常情况，后台应该是把验证码发送到用户手机上【这里为了省钱，直接返回到控制台】
    let result = await reqGetCode(phone);
    if (result.code === 200) {
      commit("GETCODE", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("Failed"));
    }
  },
  // 用户注册
  async userRegister({ commit }, user) {
    let result = await reqUserRegister(user);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("Failed"));
    }
  },

  // 用户登录业务【token】
  async userLogin({ commit }, data) {
    let result = await reqUserLogin(data);
    // 服务器下发的token是用户的唯一标识
    // 将来经常通过带token向服务器要用户信息进行展示
    if (result.code === 200) {
      // 用户已经登录成功，获取到了token
      commit("USERLOGIN", result.data.token);
      // 持久化存储token
      setToken(result.data.token);
      return "ok";
    } else {
      return Promise.reject(new Error("Failed"));
    }
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqUserInfo();
    if (result.code === 200) {
      commit("GETUSERINFO", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("Failed"));
    }
  },
  // 退出登录
  async userLogout({ commit }) {
    // 只是向服务器发送请求，通知服务器清除token
    let result = await reqLogout();
    // action里面不能操作state，需要提交mutations去修改state
    if (result.code === 200) {
      commit("CLEAR");
      return "ok";
    } else {
      return Promise.reject(new Error("Failed"));
    }
  },
};
const mutations = {
  GETCODE(state, code) {
    state.code = code;
  },
  USERLOGIN(state, token) {
    state.token = token;
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  // 清除本地数据
  CLEAR(state) {
    // 把仓库中相关用户信息清空
    state.token = "";
    state.userInfo = {};
    removeToken();
  },
};
const getters = {};
export default {
  state,
  actions,
  mutations,
  getters,
};
