'use strict'
/**
 * 仿真 webpack配置文件
 * 与生产区别在于 仿真走 beta.env.js 生产走 prod.env.js
 * 
 */
module.exports = {
  NODE_ENV: '"production"',
  BASE_URL: '"http://10.65.55.224:3030"',
  STATISTICS_URL: '""'
}