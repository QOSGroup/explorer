import Cookies from 'js-cookie'
import { reqNodes } from '@/api/node'
const node = {
  state: {
    nodes: [],
    nodeInfo: {}
  },

  mutations: {
    SET_NODE_INFO: (state, payload) => {
      state.nodeInfo = payload
      Cookies.set('nodeInfo', state.nodeInfo)
    },
    SET_NODES: (state, payload) => {
      state.nodes = payload.nodes || []
    }
  },

  actions: {
    SetNodeInfo: ({ commit }, payload) => {
      return new Promise(resolve => {
        commit('SET_NODE_INFO', payload)
        resolve()
      })
    },
    SetNodes: ({ commit, dispatch }) => {
      return reqNodes().then(res => {
        dispatch('SetNodeInfo', res.result.nodes[0]).then(() => {
          commit('SET_NODES', res.result)
          window.qBus.$emit('node-changed')
        })
      })
    }
  }
}

export default node
