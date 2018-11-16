import request from '@/utils/request'

export function reqStatus() {
  return request({
    url: '/status',
    method: 'get'
  })
}

export function reqSequences() {
  return request({
    url: `/sequence`,
    method: 'get'
  })
}
