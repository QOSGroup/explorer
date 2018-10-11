import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import node from './modules/node'
import getters from './getters'
import route from './modules/route'
import common from './modules/common'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    node,
    route,
    common
  },
  getters
})

export default store
