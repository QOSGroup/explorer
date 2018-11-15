import request from '@/utils/request'

export function getDetail(height, index) {
  return request({
    url: '/tx?height=' + height + '&index=' + index,
    method: 'get'
  })
}
