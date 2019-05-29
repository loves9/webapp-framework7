<template>
    <f7-page>
        <!-- <f7-navbar>
            <f7-nav-left back-link color="white"></f7-nav-left>
            <f7-nav-title>Home</f7-nav-title>
        </f7-navbar>-->
        <!-- <f7-navbar bg-color="blue">
            <f7-nav-left>
                <f7-link
                    class="f7-icons color-white"
                    icon-if-ios="f7:menu"
                    icon-if-md="material:menu"
                    panel-open="left"
                ></f7-link>
            </f7-nav-left>
            <f7-nav-title>Home</f7-nav-title>
        </f7-navbar> -->
        <!-- <f7-toolbar top>
            <f7-link>Left Link</f7-link>
            <f7-link>Right Link</f7-link>
        </f7-toolbar>-->

        <!-- <h-grid :dataSource="dataSource" @onPress="itemClick"></h-grid> -->

        <f7-block strong>
            <p>Here is your blank Framework7 app. Let's see what we have here.</p>
        </f7-block>
        <f7-block-title>Navigation</f7-block-title>
        <f7-list>
            <!-- <f7-list-item link="#" title="About" @click="next"></f7-list-item> -->
            <f7-list-item link="/form/" title="Form"></f7-list-item>
        </f7-list>

        <!-- <f7-list>
            <f7-list-item
                link="/dynamic-route/blog/45/post/125/?foo=bar#about"
                title="Dynamic Route"
            ></f7-list-item>
            <f7-list-item link="/load-something-that-doesnt-exist/" title="Default Route (404)"></f7-list-item>
        </f7-list>-->

        <!-- <h-search-bar
            ref="h_search"
            placeholder="请输入会议名称，多关键词用空格隔开"
            v-on:HREVENT_onFocus="onFoucus"
            v-on:HREVENT_onCancel="onCancel"
            v-on:HREVENT_submit="onSubmit"
        >
            <div class="pop_container_cls">
                <div class="popupPicker">
                    <popup-picker
                        :show.sync="typePopTag"
                        title
                        :data="sessionTypeData"
                        :columns="3"
                        v-model="typeValue"
                        @on-hide="typeOnHide"
                        @on-change="typeOnChange"
                        placeholder="选择会议类型"
                        show-name
                        value-text-align="center"
                    ></popup-picker>
                </div>

                <div style="height:10px"></div>
                <div class="popupPicker">
                    <popup-picker
                        :show.sync="statusPopTag"
                        title
                        :data="sessionStatusData"
                        :columns="3"
                        v-model="statusValue"
                        @on-hide="statusOnHide"
                        @on-change="statusOnChange"
                        placeholder="选择会议状态"
                        show-name
                        value-text-align="center"
                    ></popup-picker>
                </div>

                <div class="pop_search_text_container_cls">
                    <span class="pop_span_cls" @click="tapCancel">取消</span>
                    <span class="pop_span_submit_cls" @click="tapSearch">搜索</span>
                </div>
            </div>
        </h-search-bar>
        <x-button type="primary">ssssss</x-button> -->

        <!-- 内容 -->
        <!-- <div v-show="!isHiddenContent" class="home_main_cls">
            <tab>
                <tab-item selected @on-item-click="itemTabClick(1)">进行中</tab-item>
                <tab-item @on-item-click="itemTabClick(0)">我参与的</tab-item>

                <tab-item @on-item-click="itemTabClick(2)">全部</tab-item>
            </tab>

        </div> -->
    </f7-page>
</template>

<script>
// import {
//     PopupPicker,
//     Tab,
//     TabItem,
//     Picker,
//     XButton,
//     Scroller,
//     LoadMore
// } from "vux";

import HttpBusinessRequest from "@/pages/api/api.js";
// import { HList } from "hrkj-vux-components";

// import HSearchBar from "@/pages/component/HSearchBar.vue";
// import HRefresh from "@/pages/component/HRefresh.vue";
// import HListNew from "@/pages/component/HListNew.vue";

export default {
    // components: {
    //     PopupPicker,
    //     HSearchBar,
    //     Tab,
    //     TabItem,
    //     Picker,
    //     XButton,
    //     //HList,
    //     HRefresh,
    //     Scroller,
    //     LoadMore,
    //     HListNew,
    //     HList
    // },
    // data() {
    //     return {
    //         state: 4,
    //         noData: false,
    //         isHiddenContent: false,
    //         sessionTypeData: [],
    //         sessionStatusData: [],
    //         typeValue: [],
    //         statusValue: [],
    //         listDataSource: [],
    //         currentTab: 2,

    //         mineTabDataSource: [],
    //         processingTabDataSource: [],
    //         allTabDataSource: [],

    //         pullupConfig: {
    //             content: "",
    //             height: -5,
    //             autoRefresh: false,
    //             downContent: "",
    //             upContent: "",
    //             loadingContent: "",
    //             clsPrefix: "xs-plugin-pulldown-"
    //         },
    //         currentPage: 0, // 我参与的
    //         currentPage_ing: 0, // 进行中
    //         currentPage_all: 0, // 全部
    //         totalAmount: 0,
    //         totalPage: 0, // 我参与的
    //         totalPage_ing: 0,
    //         totalPage_all: 0,
    //         pageSize: 10,
    //         isLoading: false,
    //         noMoreDataText: "下拉加载更多",

    //         typePopTag: false,
    //         statusPopTag: false
    //     };
    // },
    // mounted() {
    //     let _this = this;
    //     document.addEventListener("deviceready", onDeviceReady, false); //等待cordova加载
    //     function onDeviceReady() {
    //         MXSetting &&
    //             typeof MXSetting.setConsoleLogEnabled === "function" &&
    //             MXSetting.setConsoleLogEnabled();
    //         //console.log("ondeviceready");

    //         _this.setTitle("会议审议");

    //         _this.GetDdlData();
    //         _this.GetDdlDataWithStatus();

    //         let params = {
    //             TabFlag: 2,
    //             pageindex: 1
    //         };
    //         _this.GetMeetingList(params);
    //     }
    // },
    // filters: {},
    // methods: {
    //     // 刷新相关
    //     infinite() {
    //         //console.log("infinite called..");

    //         if (this.isLoading) {
    //             return;
    //         }

    //         var requestParams = {};

    //         switch (this.currentTab) {
    //             case 1:
    //                 /* console.log(
    //                     "currentpage",
    //                     this.currentPage,
    //                     this.totalPage
    //                 ); */

    //                 if (this.currentPage >= this.totalPage) {
    //                     this.noMoreDataText = "没有更多数据";

    //                     return;
    //                 } else {
    //                     this.noMoreDataText = "上拉加载更多";
    //                 }

    //                 requestParams = {
    //                     TabFlag: this.currentTab,
    //                     pageindex: this.currentPage + 1
    //                 };

    //                 break;
    //             case 2:
    //                 /* console.log(
    //                     "currentpage_ing",
    //                     this.currentPage_ing,
    //                     this.totalPage_ing
    //                 ); */

    //                 if (this.currentPage_ing >= this.totalPage_ing) {
    //                     this.noMoreDataText = "没有更多数据";

    //                     return;
    //                 } else {
    //                     this.noMoreDataText = "上拉加载更多";
    //                 }

    //                 requestParams = {
    //                     TabFlag: this.currentTab,
    //                     pageindex: this.currentPage_ing + 1
    //                 };
    //                 break;
    //             case 3:
    //                 /* console.log(
    //                     "currentpage_all",
    //                     this.currentPage_all,
    //                     this.totalPage_all
    //                 ); */

    //                 if (this.currentPage_all >= this.totalPage_all) {
    //                     this.noMoreDataText = "没有更多数据";

    //                     return;
    //                 } else {
    //                     this.noMoreDataText = "上拉加载更多";
    //                 }

    //                 requestParams = {
    //                     TabFlag: this.currentTab,
    //                     pageindex: this.currentPage_all + 1
    //                 };
    //                 break;
    //         }

    //         this.GetMeetingList(requestParams);
    //     },

    //     // 搜索相关
    //     tapSearch() {
    //         //console.log(this.$refs.h_search.getSearchContent());
    //         this.easyPush("/searchResult", {
    //             content: this.$refs.h_search.getSearchContent(),
    //             type: this.typeValue[0],
    //             status: this.statusValue[0]
    //         });
    //     },
    //     tapCancel() {
    //         this.$refs.h_search.cancelPopSearch();

    //         this.typePopTag = false;
    //         this.statusPopTag = false;
    //     },
    //     typeOnHide() {},
    //     typeOnChange(value) {
    //         //console.log(value);
    //     },
    //     statusOnHide() {},
    //     statusOnChange(value) {
    //         //console.log(value);
    //     },
    //     onSubmit(text) {
    //         this.easyPush("/searchResult", {
    //             content: text,
    //             type: this.typeValue[0],
    //             status: this.statusValue[0]
    //         });
    //     },
    //     onCancel() {
    //         this.isHiddenContent = false;
    //     },
    //     onFoucus() {
    //         this.isHiddenContent = true;
    //     },
    //     itemTabClick(index) {
    //         this.$refs.scrollerEvent.reset({ top: 0 });
    //         switch (index) {
    //             case 0:
    //                 this.currentTab = 1;

    //                 if (this.mineTabDataSource.length == 0) {
    //                     let params = {
    //                         TabFlag: 1
    //                     };

    //                     this.GetMeetingList(params);
    //                 } else {
    //                     this.noData = false;
    //                     this.listDataSource = this.mineTabDataSource;
    //                 }
    //                 break;
    //             case 1:
    //                 this.currentTab = 2;

    //                 if (this.processingTabDataSource.length == 0) {
    //                     let params = {
    //                         TabFlag: 2
    //                     };

    //                     this.GetMeetingList(params);
    //                 } else {
    //                     this.noData = false;

    //                     this.listDataSource = this.processingTabDataSource;
    //                 }
    //                 break;
    //             case 2:
    //                 this.currentTab = 3;

    //                 if (this.allTabDataSource.length == 0) {
    //                     let params = {
    //                         TabFlag: 3
    //                     };

    //                     this.GetMeetingList(params);
    //                 } else {
    //                     this.noData = false;

    //                     this.listDataSource = this.allTabDataSource;
    //                 }
    //                 break;
    //         }
    //     },

    //     itemClick(item) {
    //         //console.log("========" + JSON.stringify(item));

    //         this.easyPush("/detail/", item);
    //     },

    //     /**
    //      * 获取会议类型
    //      *
    //      */
    //     GetDdlData() {
    //         let paramter = {
    //             MeetingFlag: "MeetingType"
    //         };

    //         let request = HttpBusinessRequest.GetDdlData(paramter);
    //         request.complete = () => {};
    //         request.success = (data, status, xhr) => {
    //             this.analyseDdData(data);
    //         };
    //         request.error = (data, status, xhr) => {};
    //         // 发送请求
    //         request.send();
    //     },

    //     analyseDdData(response) {
    //         let meetingTypeList =
    //             response.Data.MeetingTypeList.MeetingTypeListDetail;

    //         meetingTypeList.forEach(element => {
    //             var item = {
    //                 name: element.tvalue,
    //                 value: String(element.tkey),
    //                 parent: 0
    //             };

    //             this.sessionTypeData.push(item);
    //         });
    //     },

    //     /**
    //      * 获取会议状态
    //      *
    //      */
    //     GetDdlDataWithStatus() {
    //         let paramter = {
    //             MeetingFlag: "MeetingStatus"
    //         };

    //         let request = HttpBusinessRequest.GetDdlData(paramter);
    //         request.complete = () => {};
    //         request.success = (data, status, xhr) => {
    //             this.analyseStatusData(data);
    //         };
    //         request.error = (data, status, xhr) => {};
    //         // 发送请求
    //         request.send();
    //     },

    //     analyseStatusData(response) {
    //         let meetingTypeList =
    //             response.Data.MeetingTypeList.MeetingTypeListDetail;

    //         meetingTypeList.forEach(element => {
    //             var item = {
    //                 name: element.tvalue,
    //                 value: String(element.tkey),
    //                 parent: 0
    //             };

    //             this.sessionStatusData.push(item);
    //         });
    //     },

    //     GetMeetingList(paramter) {
    //         this.isLoading = true;

    //         let request = HttpBusinessRequest.GetMeetingList(paramter);
    //         request.complete = () => {
    //             this.isLoading = false;
    //         };
    //         request.success = (data, status, xhr) => {
    //             let meetingList = data.Data.MeetingList.MeetingListDetail;
    //             let totalAmount =
    //                 data.Data.MeetingList.MeetingListCount[0].totalnumber;

    //             if (
    //                 (meetingList.length == 0 && this.currentPage == 0) ||
    //                 (meetingList.length == 0 && this.currentPage_ing == 0) ||
    //                 (meetingList.length == 0 && this.currentPage_all == 0)
    //             ) {
    //                 this.noData = true;
    //                 return;
    //             } else {
    //                 this.noData = false;
    //             }

    //             switch (paramter.TabFlag) {
    //                 case 1:
    //                     if (totalAmount > 0) {
    //                         this.totalPage = Math.ceil(totalAmount / 10);
    //                         //console.log(this.totalPage, "toto1");
    //                     }
    //                     // 成功之后 +1
    //                     this.currentPage += 1;
    //                     this.analyseMeetingList(meetingList, 1);
    //                     break;
    //                 case 2:
    //                     if (totalAmount > 0) {
    //                         this.totalPage_ing = Math.ceil(totalAmount / 10);
    //                         //console.log(this.totalPage_ing, "toto2");
    //                     }

    //                     // 成功之后 +1
    //                     this.currentPage_ing += 1;
    //                     this.analyseMeetingList(meetingList, 2);

    //                     break;
    //                 case 3:
    //                     if (totalAmount > 0) {
    //                         this.totalPage_all = Math.ceil(totalAmount / 10);
    //                         //console.log(this.totalPage_all, "toto3");
    //                     }

    //                     // 成功之后 +1
    //                     this.currentPage_all += 1;
    //                     this.analyseMeetingList(meetingList, 3);

    //                     break;
    //             }
    //         };
    //         request.error = (data, status, xhr) => {
    //             //console.log(data);
    //         };
    //         // 发送请求
    //         request.send();
    //     },

    //     /** 
    //         MyRowNumber: 1,
    //         BM_MeetingTypeContent: "业务审查会",
    //         m_id: 23489,
    //         M_state: "结束",
    //         M_Name: "业务审查委员会2018年第15次会议",
    //         cn: "边嘉俐",
    //         m_begintime: "2018-09-06T15:13:56.75",
    //         m_endtime: "2018-09-07T10:00:00",
    //         shortname: "浙江" 
    //     */
    //     analyseMeetingList(list, tab) {
    //         list.forEach(element => {
    //             var item = element;
    //             item.title = element.M_Name;
    //             item.processName = element.BM_MeetingTypeContent;
    //             item.taskName = element.M_state;
    //             item.time = element.m_begintime;
    //             item.otherContentList = element.DmpListDetail;

    //             if (item.taskName == "进行") {
    //                 item.taskColor = "tab_red";
    //             } else if (item.taskName == "会前") {
    //                 item.taskColor = "tab_blue";
    //             } else if (item.taskName == "结束") {
    //                 item.taskColor = "tab_gray";
    //             } else if (item.taskName == "草稿") {
    //                 item.taskColor = "tab_lightblue";
    //             } else {
    //                 item.taskColor = "tab_blue";
    //             }

    //             switch (tab) {
    //                 case 1:
    //                     this.mineTabDataSource.push(item);
    //                     this.listDataSource = this.mineTabDataSource;
    //                     break;
    //                 case 2:
    //                     this.processingTabDataSource.push(item);
    //                     this.listDataSource = this.processingTabDataSource;

    //                     break;
    //                 case 3:
    //                     this.allTabDataSource.push(item);
    //                     this.listDataSource = this.allTabDataSource;

    //                     break;
    //             }
    //         });
    //         //console.log(JSON.stringify(this.listDataSource));
    //     }
    // }
};
</script>
<style lang='less' scoped>
// @import "~vux/src/styles/reset.less";
// @import "~vux/src/styles/1px.less";
// @import "~vux/src/styles/tap.less";

// body {
//     height: auto;
// }

.home_main_cls {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    height: 100%;
}

.pop_container_cls {
    padding: 10px 15px 10px 15px;
}

.pop_search_text_container_cls {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 30px;
    margin-bottom: 14px;
}

.pop_span_cls {
    font-family: PingFangSC-Medium;
    font-size: 17px;
    color: #909399;
    letter-spacing: 0;
    line-height: 12px;
}

.pop_span_submit_cls {
    font-family: PingFangSC-Medium;
    font-size: 17px;
    color: #298ccf;
    letter-spacing: 0;
    line-height: 12px;
    margin-left: 30px;
}

.popupPicker {
    height: 44px;
    background-color: #fff;
    border: 1px solid #e7e7e7;
    text-align: center;
}
</style>

<style>
.vux-popup-picker-select {
    max-width: 400px !important;

    overflow: hidden;
}

.vux-popup-picker-value .vux-cell-value {
    display: inline-block;
}
</style>

<style lang="less" scoped>
.container_layout_cls {
    display: flex;
    margin-top: -20%;
    align-items: center;
    justify-content: center;
    height: 100%;
    flex-direction: column;
}

.nodata_container_cls {
    display: flex;
    flex-direction: row;
    // justify-content: center;
    align-items: center;
}

.nodata_line_cls {
    height: 1px;
    background-color: #d5d5d5;
    width: 100vh;
}

.nodata_span_cls {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #909399;
    letter-spacing: 0;
    text-align: center;
    width: 80vh;
}

.detailList {
    font-size: 14px;
    color: #606266;
    line-height: 24px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}
</style>