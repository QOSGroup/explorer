import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/tendermint/validators',
    method: 'get',
    params
  })
}
