import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/validators',
    method: 'get',
    params
  })
}
