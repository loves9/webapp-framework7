import * as types from "./types.js";

export default {
  [types.LOGIN](state, payload) {
    state.user = payload;
  },
  [types.LOGOUT](state) {
    state.user = { id: "", name: "", token: "" };
  }
};