import store from '@/store'
const ALL_NODE = 'ALL_NODE'

/**
 * 存储当前选中的node detail
 * @param {object} oMsg NodeDetail
 */
export const saveAllNode = (oMsg) => {
  localStorage.setItem(ALL_NODE, JSON.stringify(oMsg))
}

/**
 * 获取当前选中的node detail
 * @returns NodeDetail
 */
export const getNodeDetail = (id) => {
  let allNode = store.state.common.allNode
  if (!allNode) {
    const tmp = localStorage.getItem(ALL_NODE)
    allNode = tmp ? JSON.parse(tmp) : null
  }
  if (!allNode) {
    return null
  }
  const filterNodes = allNode.filter(x => x.node_info.id === id)
  return filterNodes.length > 0 ? filterNodes[0] : null
}
