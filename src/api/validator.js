import request from '@/utils/request'

export function getValidators(params) {
  return request({
    url: '/validators',
    method: 'get',
    params
  })
}

export function getValidatorDetail(address) {
  return request({
    url: '/validators/' + address,
    method: 'get'
  })
}

export function getVotingPowerPercents(params) {
  return request({
    url: '/votingPowerPercent',
    method: 'get',
    params
  })
}

export function getUptimes(params) {
  return request({
    url: '/uptime',
    method: 'get',
    params
  })
}

export function getValidatorVotingPowerPercents(validator, params) {
  return request({
    url: '/validators/' + validator + '/votingPowerPercent',
    method: 'get',
    params
  })
}

export function getValidatorUptimes(validator, params) {
  return request({
    url: '/validators/' + validator + '/uptime',
    method: 'get',
    params
  })
}
