import * as types from './types.js'
// import { LOGIN, LOGOUT } from "./types";

const ls = window.localStorage;

export default {
  login: ({ commit, state }, payload) => {
    console.log("home-vuex-commit", JSON.stringify(commit));
    console.log("home-vuex-state", JSON.stringify(state));
    console.log("home-vuex-payload", JSON.stringify(payload));
    // ls["VUE_DEMO_USER"] = JSON.stringify(user);
    commit(types.LOGIN, payload);
  },
  logout: ({ commit }) => {
    console.log("home-vuex-logout");
    // delete ls["VUE_DEMO_USER"];
    commit(types.LOGOUT);
  },
  checkout({ commit, state }, products) {
    // 把当前购物车的物品备份起来
    // const savedCartItems = [...state.cart.added];
    // 发出结账请求，然后乐观地清空购物车
    // commit(types.CHECKOUT_REQUEST);

  }
};
