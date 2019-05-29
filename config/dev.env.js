'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL: '"http://kmsbak.chamc.com.cn/meetingapi/doc/Meeting"',
  STATISTICS_URL: '""', // 暂时没有仿真统计地址 statistics
  
  // 生产
  PREVIEW_FILE_URL: '"http://kms.chamc.com.cn/meetingapi/doc/Meeting/DownloadFile?DocumentID="',
  PREVIEW_FILE_URL_SERVER: '"http://imapp.chamc.com.cn:1443/api/v2/hr/preview?url="',

  // 仿真
  // PREVIEW_FILE_URL: '"http://kmsbak.chamc.com.cn/meetingapi/doc/Meeting/DownloadFile?DocumentID="',
  // PREVIEW_FILE_URL_SERVER: '"http://bak-sys-mobserver.chamc.com.cn/api/v2/hr/preview?url="'
})