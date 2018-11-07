import request from '@/utils/request'

/**
 * 开发者登录
 * @param {object} oMsg 用户信息
 */
export function developerLogin(oMsg) {
  return request({
    url: process.env.BASE_API + '/admin/login',
    method: 'post',
    data: oMsg
  })
}

/**
 * 开发者注册
 * @param {object} oMsg 用户信息
 */
export function developerRegister(oMsg) {
  return request({
    url: process.env.BASE_API + '/admin/register',
    method: 'post',
    data: oMsg
  })
}

/**
 * 开发者登出
 */
export function developerLogout() {
  return request({
    url: process.env.BASE_API + '/admin/logout',
    method: 'post'
  })
}

/**
 * 查看app
 */
export function getApps() {
  return request({
    url: process.env.BASE_API + '/apps',
    method: 'get'
  })
}

/**
 * 创建app
 * @param {object} oMsg app信息
 * @property {name} app名称
 */
export function createApp(oMsg) {
  return request({
    url: process.env.BASE_API + '/apps',
    method: 'post'
  })
}
