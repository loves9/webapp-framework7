import BusinessRequest from '@/core/http'

const HttpBusinessRequest = {

	/**
	 * mock请求示例
	 * 
	 */
	queryMockServer(){
		var args = {
			method: "get",
			url: 'api://user',
		};

		return new BusinessRequest().baseRequest(args);
	},

	/**
	 * 请求费用类别
	 * 
	 * @params 参数
	 * return object
	 */ 
	queryFeeCategory(params) {
		var args = {
			maskMsg: false,
			method: "post",
			url: 'api://flow_info_app', // 带api://会自动拼接baseurl
			parameter: {
				action: "loadbasedata"
			}
		};

		return new BusinessRequest().baseRequest(args);
	},

	/**
	 * 工作流-待办
	 *
	 */
	workflowTodo(){
		var args = {
			method: "get",
			url: 'api://todo' 
		};

		return new BusinessRequest().baseRequest(args);
	},

	/**
	 * 工作流-待办
	 *
	 */
	workflowDone(){
		var args = {
			method: "get",
			url: 'api://done' 
		};

		return new BusinessRequest().baseRequest(args);
	},

	/**
	 * 工作流-待办详情
	 *
	 */
	workflowTodoDetail(){
		var args = {
			method: "get",
			url: 'api://todoDetail' 
		};

		return new BusinessRequest().baseRequest(args);
	},

	/**
	 * 工作流-流转明细
	 *
	 */
	workflowTransfer(){
		var args = {
			method: "get",
			url: 'api://transfer' 
		};

		return new BusinessRequest().baseRequest(args);
	}

}

export default HttpBusinessRequest;

