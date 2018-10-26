import { constantRouterMap, asyncRouterMap, wildrouter } from '@/router'
const route = {
  state: {
    addRouters: [],
    routers: []
  },

  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },

  actions: {
    GenerateRoutes({ commit, getters }, data) {
      return new Promise(resolve => {
        const routers = filterAsyncRouter(getters.nodeInfo.routers)
        commit('SET_ROUTERS', routers)
        resolve()
      })
    }
  }
}

/**
 * 递过滤异步路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes) {
  let res = []
  routes.forEach(route => {
    const tmp = { ...route }
    const froute = asyncRouterMap.filter(x => x.name === tmp.route)
    if (froute.length > 0) {
      res.push(froute[0])
    }
  })
  res = res.concat(wildrouter)
  return res
}

export default route
