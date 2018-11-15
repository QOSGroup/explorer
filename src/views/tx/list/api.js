import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/txs',
    method: 'get',
    params
  })
}
