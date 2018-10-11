import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/blockchain',
    method: 'get',
    params
  })
}

export function getDetail(height) {
  return request({
    url: '/block?height=' + height,
    method: 'get'
  })
}
