<template>
    <f7-page>
        <!-- <f7-navbar>
            <f7-nav-left back-link color="white"></f7-nav-left>
            <f7-nav-title>Home</f7-nav-title>
        </f7-navbar>-->

        <tab>
            <tab-item selected @on-item-click="tabClick(1)">进行中</tab-item>
            <tab-item @on-item-click="tabClick(0)">我参与的</tab-item>
            <tab-item @on-item-click="tabClick(2)">全部</tab-item>
        </tab>

        <h-list
            ref="list"
            :headHeight="48"
            :pullUpRefresh="true"
            @onPress="itemClick"
            @pullUpRefresh="infinite"
        >
            <div>
                <h-list-new v-show="!noData" :dataSource="listDataSource" @cellClick="itemClick">
                    <div slot="otherContent" slot-scope="props">
                        <div class="detailList" v-for="(item,index) in props.otherContentList" :key="index">
                            <div v-if="index <2">
                            <strong>议案</strong>{{index+1}}： {{item.Dmpname}}

                            </div>
                        </div>
                        <div class="detailList" v-if="props.otherContentList.length>2">
                            其它{{props.otherContentList.length - 2}}个议案&gt;&gt;
                        </div>
                    </div>
                </h-list-new>
            </div>
        </h-list>

        <!-- <f7-block strong>
            <p>Here is your blank Framework7 app. Let's see what we have here.</p>
        </f7-block>
        <f7-block-title>Navigation</f7-block-title>
        <f7-list>
            <f7-list-item link="#" title="About" @click="next"></f7-list-item>
            <f7-list-item link="/form/" title="Form"></f7-list-item>
        </f7-list>-->

        <!-- <f7-list>
            <f7-list-item
                link="/dynamic-route/blog/45/post/125/?foo=bar#about"
                title="Dynamic Route"
            ></f7-list-item>
            <f7-list-item link="/load-something-that-doesnt-exist/" title="Default Route (404)"></f7-list-item>
        </f7-list>-->

        <!-- <f7-button fill raised>确定</f7-button> -->
    </f7-page>
</template>

<script>
import Group from "vux/src/components/group/index";
import { Tab, TabItem } from "vux/src/components/tab/index";
// import PopupPicker from 'vux/src/components/popup-picker/index'

import HttpBusinessRequest from "@/pages/api/api.js";
import { HList } from "hrkj-vux-components";

// import HSearchBar from "@/pages/component/HSearchBar.vue";
// import HRefresh from "@/pages/component/HRefresh.vue";
import HListNew from "@/pages/component/HListNew.vue";

export default {
    data() {
        return {
            state: 4,
            noData: false,
            isHiddenContent: false,
            sessionTypeData: [],
            sessionStatusData: [],
            typeValue: [],
            statusValue: [],
            listDataSource: [],
            currentTab: 2,

            mineTabDataSource: [],
            processingTabDataSource: [],
            allTabDataSource: [],

            currentPage: 0, // 我参与的
            currentPage_ing: 0, // 进行中
            currentPage_all: 0, // 全部
            totalAmount: 0,
            totalPage: 0, // 我参与的
            totalPage_ing: 0,
            totalPage_all: 0,
            pageSize: 10,
            isLoading: false,
            noMoreDataText: "下拉加载更多",

            typePopTag: false,
            statusPopTag: false
        };
    },
    mounted() {
        console.log('0000000000000')
        this.setDeviceReady(() => {
            this.setTitle("会议审议");

            this.GetDdlData();
            this.GetDdlDataWithStatus();

            let params = {
                TabFlag: 2,
                pageindex: 1
            };
            this.GetMeetingList(params);
        });
    },
    methods: {
        // 刷新相关
        infinite() {
            //console.log("infinite called..");

            if (this.isLoading) {
                return;
            }

            var requestParams = {};

            switch (this.currentTab) {
                case 1:
                    /* console.log(
                        "currentpage",
                        this.currentPage,
                        this.totalPage
                    ); */

                    if (this.currentPage >= this.totalPage) {
                        this.noMoreDataText = "没有更多数据";

                        return;
                    } else {
                        this.noMoreDataText = "上拉加载更多";
                    }

                    requestParams = {
                        TabFlag: this.currentTab,
                        pageindex: this.currentPage + 1
                    };

                    break;
                case 2:
                    /* console.log(
                        "currentpage_ing",
                        this.currentPage_ing,
                        this.totalPage_ing
                    ); */

                    if (this.currentPage_ing >= this.totalPage_ing) {
                        this.noMoreDataText = "没有更多数据";

                        return;
                    } else {
                        this.noMoreDataText = "上拉加载更多";
                    }

                    requestParams = {
                        TabFlag: this.currentTab,
                        pageindex: this.currentPage_ing + 1
                    };
                    break;
                case 3:
                    /* console.log(
                        "currentpage_all",
                        this.currentPage_all,
                        this.totalPage_all
                    ); */

                    if (this.currentPage_all >= this.totalPage_all) {
                        this.noMoreDataText = "没有更多数据";

                        return;
                    } else {
                        this.noMoreDataText = "上拉加载更多";
                    }

                    requestParams = {
                        TabFlag: this.currentTab,
                        pageindex: this.currentPage_all + 1
                    };
                    break;
            }

            this.GetMeetingList(requestParams);
        },

        // 搜索相关
        tapSearch() {
            //console.log(this.$refs.h_search.getSearchContent());
            this.easyPush("/searchResult", {
                content: this.$refs.h_search.getSearchContent(),
                type: this.typeValue[0],
                status: this.statusValue[0]
            });
        },
        tapCancel() {
            this.$refs.h_search.cancelPopSearch();

            this.typePopTag = false;
            this.statusPopTag = false;
        },
        typeOnHide() {},
        typeOnChange(value) {
            //console.log(value);
        },
        statusOnHide() {},
        statusOnChange(value) {
            //console.log(value);
        },
        onSubmit(text) {
            this.easyPush("/searchResult", {
                content: text,
                type: this.typeValue[0],
                status: this.statusValue[0]
            });
        },
        onCancel() {
            this.isHiddenContent = false;
        },
        onFoucus() {
            this.isHiddenContent = true;
        },
        tabClick(index) {
            // this.$refs.scrollerEvent.reset({ top: 0 });
            switch (index) {
                case 0:
                    this.currentTab = 1;
                    if (this.mineTabDataSource.length == 0) {
                        let params = {
                            TabFlag: 1
                        };
                        this.GetMeetingList(params);
                    } else {
                        this.noData = false;
                        this.listDataSource = this.mineTabDataSource;
                    }
                    break;
                case 1:
                    this.currentTab = 2;
                    if (this.processingTabDataSource.length == 0) {
                        let params = {
                            TabFlag: 2
                        };
                        this.GetMeetingList(params);
                    } else {
                        this.noData = false;
                        this.listDataSource = this.processingTabDataSource;
                    }
                    break;
                case 2:
                    this.currentTab = 3;
                    if (this.allTabDataSource.length == 0) {
                        let params = {
                            TabFlag: 3
                        };
                        this.GetMeetingList(params);
                    } else {
                        this.noData = false;
                        this.listDataSource = this.allTabDataSource;
                    }
                    break;
            }
        },

        itemClick(item) {
            this.easyPush("/detail/", item);

            // this.easyPush('/about/', {})
        },

        /**
         * 获取会议类型
         *
         */
        GetDdlData() {
            let paramter = {
                MeetingFlag: "MeetingType"
            };

            let request = HttpBusinessRequest.GetDdlData(paramter);
            request.complete = () => {};
            request.success = (data, status, xhr) => {
                this.analyseDdData(data);
            };
            request.error = (data, status, xhr) => {};
            // 发送请求
            request.send();
        },

        analyseDdData(response) {
            let meetingTypeList =
                response.Data.MeetingTypeList.MeetingTypeListDetail;

            meetingTypeList.forEach(element => {
                var item = {
                    name: element.tvalue,
                    value: String(element.tkey),
                    parent: 0
                };

                this.sessionTypeData.push(item);
            });
        },

        /**
         * 获取会议状态
         *
         */
        GetDdlDataWithStatus() {
            let paramter = {
                MeetingFlag: "MeetingStatus"
            };

            let request = HttpBusinessRequest.GetDdlData(paramter);
            request.complete = () => {};
            request.success = (data, status, xhr) => {
                this.analyseStatusData(data);
            };
            request.error = (data, status, xhr) => {};
            // 发送请求
            request.send();
        },

        analyseStatusData(response) {
            let meetingTypeList =
                response.Data.MeetingTypeList.MeetingTypeListDetail;

            meetingTypeList.forEach(element => {
                var item = {
                    name: element.tvalue,
                    value: String(element.tkey),
                    parent: 0
                };

                this.sessionStatusData.push(item);
            });
        },

        GetMeetingList(paramter) {
            this.isLoading = true;

            let request = HttpBusinessRequest.GetMeetingList(paramter);
            request.complete = () => {
                this.isLoading = false;
            };
            request.success = (data, status, xhr) => {
                let meetingList = data.Data.MeetingList.MeetingListDetail;
                let totalAmount =
                    data.Data.MeetingList.MeetingListCount[0].totalnumber;

                if (
                    (meetingList.length == 0 && this.currentPage == 0) ||
                    (meetingList.length == 0 && this.currentPage_ing == 0) ||
                    (meetingList.length == 0 && this.currentPage_all == 0)
                ) {
                    this.noData = true;
                    return;
                } else {
                    this.noData = false;
                }

                switch (paramter.TabFlag) {
                    case 1:
                        if (totalAmount > 0) {
                            this.totalPage = Math.ceil(totalAmount / 10);
                            //console.log(this.totalPage, "toto1");
                        }
                        // 成功之后 +1
                        this.currentPage += 1;
                        this.analyseMeetingList(meetingList, 1);
                        break;
                    case 2:
                        if (totalAmount > 0) {
                            this.totalPage_ing = Math.ceil(totalAmount / 10);
                            //console.log(this.totalPage_ing, "toto2");
                        }

                        // 成功之后 +1
                        this.currentPage_ing += 1;
                        this.analyseMeetingList(meetingList, 2);

                        break;
                    case 3:
                        if (totalAmount > 0) {
                            this.totalPage_all = Math.ceil(totalAmount / 10);
                            //console.log(this.totalPage_all, "toto3");
                        }

                        // 成功之后 +1
                        this.currentPage_all += 1;
                        this.analyseMeetingList(meetingList, 3);

                        break;
                }
            };
            request.error = (data, status, xhr) => {
                //console.log(data);
            };
            // 发送请求
            request.send();
        },

        /** 
            MyRowNumber: 1,
            BM_MeetingTypeContent: "业务审查会",
            m_id: 23489,
            M_state: "结束",
            M_Name: "业务审查委员会2018年第15次会议",
            cn: "边嘉俐",
            m_begintime: "2018-09-06T15:13:56.75",
            m_endtime: "2018-09-07T10:00:00",
            shortname: "浙江" 
        */
        analyseMeetingList(list, tab) {
            list.forEach(element => {
                var item = element;
                item.title = element.M_Name;
                item.processName = element.BM_MeetingTypeContent;
                item.taskName = element.M_state;
                item.time = element.m_begintime;
                item.otherContentList = element.DmpListDetail;

                if (item.taskName == "进行") {
                    item.taskColor = "tab_red";
                } else if (item.taskName == "会前") {
                    item.taskColor = "tab_blue";
                } else if (item.taskName == "结束") {
                    item.taskColor = "tab_gray";
                } else if (item.taskName == "草稿") {
                    item.taskColor = "tab_lightblue";
                } else {
                    item.taskColor = "tab_blue";
                }

                switch (tab) {
                    case 1:
                        this.mineTabDataSource.push(item);
                        this.listDataSource = this.mineTabDataSource;
                        break;
                    case 2:
                        this.processingTabDataSource.push(item);
                        this.listDataSource = this.processingTabDataSource;

                        break;
                    case 3:
                        this.allTabDataSource.push(item);
                        this.listDataSource = this.allTabDataSource;

                        break;
                }
            });
            //console.log(JSON.stringify(this.listDataSource));
        }
    },
    components: {
        Tab,
        TabItem,
        HListNew,
        HList
        // PopupPicker,
        // Group
    }
};
</script>
