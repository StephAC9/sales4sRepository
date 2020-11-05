import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null
  },
  mutations: {
    SET_TOKEN: (state, token) => state.token = token
  },
  getters: {
    token: state => state.token
  },
  modules: {
    plugins: [
      createPersistedState()
    ],
    modules:{
    }
  }
})
