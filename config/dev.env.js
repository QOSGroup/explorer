'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://dev-qmoonapi.qoschain.com"',
  // BASE_API: '"http://192.168.1.223:9527"',
  BASE_API: '"http://qmoonapi.qoschain.info"',
})
