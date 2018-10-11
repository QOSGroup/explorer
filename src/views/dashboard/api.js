import request from '@/utils/request'

export function reqStatus() {
  return request({
    url: '/status',
    method: 'get'
  })
}

export function reqBlockchain() {
  return request({
    url: '/blockchain',
    method: 'get'
  })
}

export function reqConsensusState() {
  return request({
    url: '/consensus_state',
    method: 'get'
  })
}

export function reqAllValidators(oMsg) {
  return request({
    url: `/${oMsg.network}/validators`,
    method: 'get'
  })
}
