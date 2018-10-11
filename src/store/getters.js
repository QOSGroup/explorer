import { getNodeDetail } from '@/utils/common'

const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  nodeInfo: state => state.node.nodeInfo,
  nodes: state => state.node.nodes,
  permission_routers: state => state.route.routers,
  addRouters: state => state.route.addRouters,
  getNodeDetail: state => id => {
    return getNodeDetail(id)
  }
}
export default getters
