import Vuex from 'vuex'

import Vue from 'vue'
Vue.use(Vuex)

class HRStore extends Vuex.Store {
  constructor (options = {}) {
    super(options)
  }
}

const store = new HRStore({
  state: {
    // 页面初始化参数，一般为 module 跳转时候才会产生，如：native页面跳转
    initParams: {}
  },

  getters: {

  },

  mutations: {
    setInitParams (state, params) {
      Vue.set(state, 'initParams', params)
    }
  },

  action () {
    updateDemoPosition = ({
      commit
    }, top) => {
      commit({ type: 'updateDemoPosition', top: top })
    }
  }
})

export default store
