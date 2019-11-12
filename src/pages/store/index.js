import actions from "./actions";
import * as getters from "./getters";
import mutations from "./mutations";
import state from "./state";

const store = {
  state,
  getters,
  actions,
  mutations
};

export default store;