import request from '@/utils/request'

export function getAccount(params) {
  return request({
    url: '/accounts/' + params.address,
    method: 'get'
  })
}

export function getAccountTxs(params) {
  return request({
    url: '/accounts/' + params.address + '/txs',
    method: 'get'
  })
}
