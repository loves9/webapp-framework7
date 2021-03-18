/*{
	"result": [{
		"contactCode": "chenlixxxx@chamc.com.cn@2xxx",
		"contactName": "陈xx",
		"dept_type_id": "kms-ChamcDepWorkGroup",
		"pk_dept": "ORG199999056",
		"dept_name": "协同管xxx",
		"levels": "491",
		"orgName": "总部-综合计划与协xxxx"
	 }]
  }
 */
var selectUserCallback;
var atmost;

var callbackProcessFunc = function(user_result) {
  user_result = user_result.map(function(r) {
    var infos = r.user_show;
    var data = {
      contactCode: infos.filter(function(item) {
        return item.column === "ext1";
      })[0].value,
      contactName: r.name,
      dept_type_id: infos.filter(function(item) {
        return item.column === "ext2";
      })[0].value,
      pk_dept: infos.filter(function(item) {
        return item.column === "ext3";
      })[0].value,
      dept_name: infos.filter(function(item) {
        return item.column === "ext4";
      })[0].value,
      levels: infos.filter(function(item) {
        return item.column === "ext5";
      })[0].value,
      orgName: r.user_info.department.replace(/\//g, "-")
      // 'dept_name': r.dept_short_name,
      // 'levels': r.dept_code
    };
    return data;
  });

  // 调用回调函数
  selectUserCallback({
    result: user_result
  });
};

// 敏行选人接口封装
var selectMXUserExt = function(ids, sucessCallback) {
  window.MXCommon &&
    window.MXCommon.api &&
    window.MXCommon.api({
      type: "GET",
      url: "/api/v1/users/attributes_of_users",
      dataType: "text",
      data: {
        user_ids: ids.toString()
      },
      async: true,
      success: function(result) {
        sucessCallback(
          typeof result === "string" ? JSON.parse(result) : result
        );
      },
      error: function(error) {
        console.error(error);
        alert("获取用户信息失败,请重试!");
      }
    });
};

const selectUserFromMXInterface = function(param, callBack) {
  selectUserCallback = callBack;


  if (param.isSingleSelect) {
    selectMXUserExt(param.ids, callbackProcessFunc);

    // selectMXUser();
  } else {
    // selectMXUsers();
  }
};

export default selectUserFromMXInterface;
