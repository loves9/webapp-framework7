'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL: '"http://localhost:3030"',
  STATISTICS_URL: '""' // 暂时没有仿真统计地址 statistics
})