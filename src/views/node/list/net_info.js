import request from '@/utils/request'

export function getNetInfo(params) {
  return request({
    url: '/peers',
    method: 'get',
    params
  })
}

