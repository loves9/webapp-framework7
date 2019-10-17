
import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import state from './sampleState'


Vue.use(Vuex);

const store = {
    state,
    getters,
    actions,
    mutations,
}

export default store
    