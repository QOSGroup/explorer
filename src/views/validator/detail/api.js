import request from '@/utils/request'

export function getDetail(address) {
  return request({
    url: '/validators/' + address,
    method: 'get'
  })
}
