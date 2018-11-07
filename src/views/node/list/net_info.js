import request from '@/utils/request'

export function getNetInfo(params) {
  return request({
    url: '/net_info',
    method: 'get',
    params
  })
}

