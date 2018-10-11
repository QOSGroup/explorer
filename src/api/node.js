import request from '@/utils/request'

export function reqNodes(params) {
  return request({
    url: process.env.BASE_API + '/nodes',
    method: 'get',
    params
  })
}
