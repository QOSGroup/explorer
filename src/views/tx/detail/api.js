import request from '@/utils/request'

export function getDetail(hash) {
  return request({
    url: '/txs/' + hash,
    method: 'get'
  })
}
