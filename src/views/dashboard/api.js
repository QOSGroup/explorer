import request from '@/utils/request'

export function reqStatus() {
  return request({
    url: '/tendermint/status',
    method: 'get'
  })
}

export function reqBlockchain() {
  return request({
    url: '/tendermint/blockchain',
    method: 'get'
  })
}

export function reqConsensusState() {
  return request({
    url: '/tendermint/consensus_state',
    method: 'get'
  })
}

export function reqAllValidators() {
  return request({
    url: `/tendermint/validators`,
    method: 'get'
  })
}

export function reqSequences() {
  return request({
    url: `/sequence`,
    method: 'get'
  })
}
