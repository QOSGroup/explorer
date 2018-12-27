import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const DeveloperKey = 'Developer-Info'
const CurrentNodeInfo = 'CurrentNodeInfo'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

/**
 * 记录当前选中节点信息
 * @param {object} nodeInfo 节点信息
 */
export function setCurrentNodeInfo(nodeInfo) {
  return Cookies.set(CurrentNodeInfo, nodeInfo)
}

export function removeCurrentNodeInfo() {
  return Cookies.remove(CurrentNodeInfo)
}

/**
 * 获取当前选中节点信息
 */
export function getCurrentNodeInfo() {
  return Cookies.getJSON(CurrentNodeInfo)
}

/**
 * 记录开发者账号信息
 * @param {object} oMsg 开发者账号信息
 */
export function setDeveloperInfo(oMsg) {
  return Cookies.set(DeveloperKey, oMsg)
}

/**
 * 获取开发者信息
 */
export function getDeveloperInfo() {
  return Cookies.getJSON(DeveloperKey)
}

export function removeAllCookie() {
  Cookies.remove(TokenKey)
  Cookies.remove(DeveloperKey)
}
