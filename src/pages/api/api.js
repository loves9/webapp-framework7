import BusinessRequest from '@/core/http'

const HttpBusinessRequest = {

	/**
	 * mock请求示例
	 * 
	 */
	queryMockServer(){
		var args = {
			method: "get",
			url: 'api://user', // 带api://会自动拼接baseurl
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
			url: 'api://flow_info_app',
			parameter: {
				action: "loadbasedata"
			}
		};

		return new BusinessRequest().baseRequest(args);
	},

	/**
	 * 获取会议类型/会议状态
	 * 
	 */
	GetDdlData(params){
		var args = {
			method: "get",
			url: 'api://GetDdlData',
			parameter: params
		};

		return new BusinessRequest().baseRequest(args);
	},

	/**
	 * 获取会议列表
	 * 
	 * @param {*} params 
	 */
	GetMeetingList(params){
		var args = {
			method: "post",
			url: 'api://GetMeetingList',
			parameter: params
		};

		return new BusinessRequest().baseRequest(args);
	},


	/**
	 * 会议审议-会议详细信息
	 *
	 */
	GetMeetingDetail(params){
		var args = {
			method: "get",
			url: 'api://GetMeetingDetail',
			parameter: params
		};

		return new BusinessRequest().baseRequest(args);
	},

	/**
	 * 会议审议-会议议案列表
	 *
	 */
	GetDmpList(params){
		var args = {
			method: "get",
			url: 'api://GetDmpList',
			parameter: params
		};
		return new BusinessRequest().baseRequest(args);
	},

	/**
	 * 会议审议-获取表决审议意见
	 *
	 */
	GetVoteResult(params){
		var args = {
			method: "get",
			url: 'api://GetVoteResult',
			parameter: params
		};
		return new BusinessRequest().baseRequest(args);
	},

	/**
	 * 会议审议-提交表决审议意见
	 *
	 */
	UserVote(params){
		var args = {
			method: "post",
			url: 'api://UserVote',
			parameter: params
		};
		return new BusinessRequest().baseRequest(args);
	},

	/**
	 * 会议审议-获取材料列表
	 *
	 */
	GetDocumentList(params){
		var args = {
			method: "get",
			url: 'api://GetDocumentList',
			parameter: params
		};
		return new BusinessRequest().baseRequest(args);
	},

	/**
	 * 会议审议-签到
	 *
	 */
	UserSign(params){
		var args = {
			method: "get",
			url: 'api://UserSign',
			parameter: params
		};
		return new BusinessRequest().baseRequest(args);
	}
}

export default HttpBusinessRequest;

