<template>
  <div>
    <div
      v-if="dataSource.length > 0"
      class="data-table"
      style="background-color: #fff"
    >
      <table>
        <thead>
          <tr>
            <th class="label-cell" v-for="header in tableName" :key="header">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in dataSource" :key="index">
            <td class="label-cell">{{ index + 1 }}</td>
            <td class="label-cell file-cls" @click="previewFile(item, 0)">
              {{ item.schemeFileName }}
            </td>
            <td class="label-cell file-cls" @click="previewFile(item, 1)">
              {{ item.approvalFileName }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- <f7-list media-list no-hairlines>
      <f7-list-item
        v-for="(item, index) in dataSource.uploadedFiles"
        :key="index"
        link="#"
        :title="item.name"
        :subtitle="item.gmtCreate"
        @click="previewFile(item)"
      >
        <i slot="media" class="material-icons" style="">attach_file</i>
      </f7-list-item>
    </f7-list> -->
  </div>
</template>

<script>
// import HList from "hrkj-vux-components/src/components/h-list/index.vue";
// import HttpBusinessRequest from "@/pages/api/api";
// import NoData from "@/pages/component/NoData";
import HttpBusinessRequest from "@/pages/api/api.js";

export default {
  props: {
    dataSource: {
      type: Array,
      default: () => {
        return [];
      },
    },
    tableName: {
      type: Array,
      default: () => {
        return ["序号", "投放日期", "eeee"];
      },
    },
  },
  data() {
    return {
      isLoading: false,
      attachmentInfoList: [],
    };
  },
  mounted() {},
  destroyed() {},
  methods: {
    resovleOrgName(text) {
      if (text && text.length > 16) {
        return "..." + text.substring(text.length - 14, text.length);
      }
      return text;
    },
    previewFile(item, index) {
      console.log("previewFile", JSON.stringify(item));
      var filePath = "";
      var name = "";
      var preUrl = "";
      if (index == 0) {
        if (item.schemeSign == "self") {
          // this.queryRecconfirmPreViewUrl({
          //   filePath: item.schemeArchFilePath,
          //   name: item.schemeFileName,
          // });
        } else {
          this.HRToast("暂不支持移动端预览");
        }
      } else {
        if (item.approvalSign == "gongwen") {
          if (this.$f7.device.ios) {
            window.open(item.approvalUrl, "_blank");
          } else {
            MXCommon.openUrlPage(item.approvalUrl, (jsSuccessCallBack) => {});
          }
        } else if (item.approvalSign == "self") {
          // this.queryRecconfirmPreViewUrl({
          //   filePath: item.approvalArchFilePath,
          //   name: item.approvalFileName,
          // });
        } else {
          this.HRToast("暂不支持移动端预览");
        }
      }
    },
    // queryRecconfirmPreViewUrl(params) {
    //   let request = HttpBusinessRequest.queryRecconfirmPreViewUrl(params);
    //   request.complete = () => {};
    //   request.success = (data, status, xhr) => {
    //     this.HRLog("queryRecconfirmPreViewUrl-success:", JSON.stringify(data));

    //     if (data.code == 0) {
    //       let preUrl = data.message + "&enableZoom=true";
    //       if (this.$f7.device.ios) {
    //         window.open(preUrl, "_blank");
    //       } else {
    //         MXCommon.openUrlPage(
    //           preUrl + "&method=200",
    //           (jsSuccessCallBack) => {}
    //         );
    //       }
    //     } else {
    //       this.HRToast("暂不支持手机端预览");
    //     }
    //   };
    //   request.error = (data, status, xhr) => {
    //     this.HRToast("暂不支持手机端预览");
    //     this.HRLog("queryRecconfirmPreViewUrl-error:", JSON.stringify(data));
    //   };
    //   // 发送请求
    //   request.send();
    // },
  },
  computed: {
    noData() {
      if (this.listData.length === 0) {
        return true;
      }

      return false;
    },
  },
  components: {},
};
</script>

<style lang="less" scoped>
@import "../../style/public.less";
.content {
  min-height: 50px;
  max-height: 400px;
  color: #666666;
  font-size: 14px;
  overflow-y: scroll;
}

.file-cls {
  .hr-color-blue;
  // color: #298ccf;

  &:active {
    background-color: #eee;
  }
}
</style>
