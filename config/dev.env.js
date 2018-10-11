'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
  // BASE_API: '"https://easy-mock.com/mock/5ba36527a1924362236a3d8d"',
  BASE_API: '"http://192.168.168.183:8081"',
})
