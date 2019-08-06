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

/**
 * 
 * @param {格式化json} msg json字符串
 */
export const formatJson = msg => {
  const rep = "~";
  let jsonStr = JSON.stringify(msg, null, rep), str = "";
  for (let i = 0; i < jsonStr.length; i++) {
      let text2 = jsonStr.charAt(i)
      if (i > 1) {
          let text = jsonStr.charAt(i - 1)
          if (rep != text && rep == text2) {
              str += "<br/>"
          }
      }
      str += text2;
  }
  jsonStr = "";
  for (let i = 0; i < str.length; i++) {
      let text = str.charAt(i);
      if (rep == text)
          jsonStr += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
      else {
          jsonStr += text;
      }
      if (i == str.length - 2)
          jsonStr += "<br/>"
  }
  return jsonStr;
}