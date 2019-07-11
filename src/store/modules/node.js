// import Cookies from 'js-cookie'
import { reqNodes } from '@/api/node'
import { setCurrentNodeInfo, getCurrentNodeInfo } from '@/utils/auth'
const node = {
  state: {
    nodes: [],
    nodeInfo: {}
  },

  mutations: {
    /**
     * 设置当前链信息
     */
    SET_NODE_INFO: (state, payload) => {
      state.nodeInfo = payload
      // Cookies.set('nodeInfo', state.nodeInfo)
    },
    /**
     * 缓存链信息
     */
    SET_NODES: (state, payload) => {
      state.nodes = payload.nodes || []
    }
  },

  actions: {
    SetNodeInfo: ({ commit }, payload) => {
      return new Promise(resolve => {
        setCurrentNodeInfo(payload)
        commit('SET_NODE_INFO', payload)
        resolve()
      })
    },
    SetNodes: ({ commit, dispatch }) => {
      return reqNodes().then(res => {
        let currentNodeInfo = getCurrentNodeInfo() || ''
        let needChangeNode = []
        // if (currentNodeInfo) {
        needChangeNode = res.result.nodes.filter(x => x.name === currentNodeInfo.name)
        // }
        if (needChangeNode.length === 0) {
          currentNodeInfo = res.result.nodes[0]
        } else {
          currentNodeInfo = needChangeNode[0]
        }
        console.log(needChangeNode)
        dispatch('SetNodeInfo', currentNodeInfo).then(() => {
          commit('SET_NODES', res.result)
          window.qBus.$emit('node-changed')
        })
      })
    }
  }
}

export default node
