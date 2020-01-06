import BusinessRequest from '@/core/http'

const HttpBusinessRequest = {

  /**
	 * Get请求示例
	 *
	 */
  queryMockServer () {
    var args = {
      method: 'get',
      mask: false,
      url: 'api://user' // 带api://会自动拼接baseurl
    }

    return new BusinessRequest().baseRequest(args)
  },

  /**
	 * Post请求示例
	 *
	 * @params 参数
	 * return object
	 */
  queryFeeCategory (params) {
    var args = {
      maskMsg: false,
      method: 'post',
      url: 'api://flow_info_app',
      parameter: {
        action: 'loadbasedata'
      }
    }

    return new BusinessRequest().baseRequest(args)
  },
}

export default HttpBusinessRequest
