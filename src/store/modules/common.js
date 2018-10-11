import { saveAllNode } from '@/utils/common'

const node = {
  state: {
    visitedViews: [],
    allNode: null
  },

  mutations: {
    SET_ALL_NODE: (state, payload) => {
      state.allNode = payload
    }
  },

  actions: {
    SaveAllNode({ commit }, payload) {
      return new Promise((resolve) => {
        saveAllNode(payload)
        commit('SET_ALL_NODE', payload)
        resolve()
      })
    }
  }
}

export default node
