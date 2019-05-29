<template>
    <f7-page>
        <tab>
            <tab-item selected @on-item-click="itemTabClick(1)"
                >会议议案</tab-item
            >

            <tab-item @on-item-click="itemTabClick(0)">会议信息</tab-item>
        </tab>
        <div
            v-show="itemshowhide"
            v-for="(item, index) in information"
            :key="index"
        >
            <ul class="information">
                <li>
                    <div class="left">会议状态</div>
                    <div class="right">{{ item.MStatus }}</div>
                </li>
                <li>
                    <div class="left">会议类型</div>
                    <div class="right">{{ item.MType }}</div>
                </li>
                <li>
                    <div class="left">单位</div>
                    <div class="right">{{ item.MOrg }}</div>
                </li>
                <li>
                    <div class="left">会议名称</div>
                    <div class="right">{{ item.MName }}</div>
                </li>
                <li>
                    <div class="left">会议地点</div>
                    <div class="right">{{ item.MAddress }}</div>
                </li>
                <li>
                    <div class="left">创建人</div>
                    <div class="right">{{ item.MCreate }}</div>
                </li>
                <li>
                    <div class="left">秘书长</div>
                    <div class="right">{{ item.MSecretaryGeneral }}</div>
                </li>
                <li>
                    <div class="left">秘书</div>
                    <div class="right">{{ item.MSecretary }}</div>
                </li>
                <li>
                    <div class="left">与会委员</div>
                    <div class="right">{{ item.MVoteCommissioner }}</div>
                </li>
                <li>
                    <div class="left">列席人员</div>
                    <div class="right">{{ item.MCommissioner }}</div>
                </li>
                <li>
                    <div class="left">会议说明</div>
                    <div class="right">{{ item.MContent }}</div>
                </li>
            </ul>
            <div v-if="item.MIsSign !== '否' && signin">
                <div class="fixed">
                    <x-button type="primary" @click.native="Signin"
                        >签到</x-button
                    >
                </div>
            </div>
        </div>
        <div v-show="!itemshowhide">
            <div class="conferenceBill">
                <div v-if="information[0].MIsSign !== '否' && signin">
                    <div class="textbox"></div>
                    <div class="fixed">
                        <x-button type="primary" @click.native="Signin"
                            >签到</x-button
                        >
                    </div>
                </div>

                <div
                    class="textbox"
                    v-for="(item, index) in DmpListCount"
                    :key="index"
                >
                    共{{ item.totalnumber1 }}个议案，其中{{
                        item.totalnumber2
                    }}个待表决/审议。
                </div>
                <ul>
                    <li v-for="(item, index) in conferenceBill" :key="index">
                        <div class="title">
                            <strong>议案{{ index + 1 }}：</strong>
                            {{ item.Dmpname }}
                        </div>

                        <materials :data="item"></materials>

                        <div class="line_cls"></div>

                        <div class="flexBox">
                            <div class="color333">议案类型</div>
                            <div class="color666">{{ item.Dmptype }}</div>
                        </div>
                        <div class="flexBox">
                            <div>状态</div>
                            <div
                                :class="{
                                    colorblue: item.Dmpstatus === '未开始',
                                    colorred: item.Dmpstatus === '进行中'
                                }"
                            >
                                {{ item.Dmpstatus }}
                            </div>
                        </div>
                        <div class="flexBox">
                            <div class="color333">结果</div>
                            <div class="color666">{{ item.Dmpresult }}</div>
                        </div>
                        <div class="flexBox1">
                            <!-- <div
                class="color333"
                @click="goMaterials(item)"
                            >查看材料</div>-->

                            <!-- <div
                v-if="item.MIsSign !== '否' && signin"
                class="colorblue"
                @click.native="Signin"
              >
                签到
                            </div>-->
                            <div
                                class="colorred"
                                :class="{
                                    colord5d5d5: item.VoteVisible === '否'
                                }"
                                @click="goOpinion(item)"
                            >
                                <span v-show="item.IsVote === '是'">已</span>
                                {{ item | Clickable }}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </f7-page>
</template>

<script>
import { Tab, TabItem, XButton, AlertModule } from "vux";
import HttpBusinessRequest from "@/pages/api/api.js";
import Materials from "./Materias.vue";

export default {
    data() {
        return {
            url: "",
            conferenceId: "",
            itemshowhide: true,
            information: null,
            conferenceBill: [],
            DmpListCount: [],
            signin: true,
            DocTitle: ""
        };
    },
    components: {
        Tab,
        TabItem,
        XButton,
        AlertModule,
        Materials
    },
    created() {
        this.setDeviceReady(() => {
            this.init();
        });
    },
    mounted() {},
    destroyed() {},
    methods: {
        init() {
            this.conferenceId = this.easyGetParams().m_id;
            this.DocTitle = this.easyGetParams().M_Name;
            this.setTitle(this.DocTitle);
            this.getInformation();
            this.getConferenceBill();

            this.itemTabClick(1);
        },
        itemTabClick(i) {
            if (i === 0) {
                this.itemshowhide = true;
            } else if (i === 1) {
                this.itemshowhide = false;
            }
        },
        getInformation() {
            var me = this,
                params = {
                    Mid: this.conferenceId
                };
            let request = HttpBusinessRequest.GetMeetingDetail(params);
            request.complete = function() {
                //console.log("complete1");
            };
            request.success = function(data, status, xhr) {
                console.log("dddddd=>", JSON.stringify(data));
                me.information = data.Data.Meeting.MeetingDetail;
            };
            request.error = function(data, status, xhr) {
                //console.log(JSON.stringify(data));
                AlertModule.show({
                    title: "",
                    content: JSON.stringify(data)
                });
                setTimeout(() => {
                    AlertModule.hide();
                }, 2000);
            };
            // 发送请求
            request.send();
        },
        getConferenceBill() {
            var me = this,
                params = {
                    Mid: this.conferenceId
                };
            let request = HttpBusinessRequest.GetDmpList(params);
            request.complete = function() {
                //console.log("complete");
            };
            request.success = function(data, status, xhr) {
                me.DmpListCount = data.Data.DmpList.DmpListCount;
                me.conferenceBill = data.Data.DmpList.DmpListDetail;
                console.log(JSON.stringify(data));
            };
            request.error = function(data, status, xhr) {
                //console.log(JSON.stringify(data));
                AlertModule.show({
                    title: "",
                    content: JSON.stringify(data)
                });
                setTimeout(() => {
                    AlertModule.hide();
                }, 2000);
            };
            // 发送请求
            request.send();
        },
        goMaterials(item) {
            this.$router.push({ path: "/materials", query: item });
        },
        goOpinion(item) {
            if (item.VoteVisible === "否") {
                return;
            } else {
                if (item.Dmptype === "审查类") {
                    this.$router.push({ path: "/vote", query: item });
                } else if (item.Dmptype === "审议类") {
                    this.$router.push({ path: "/approval", query: item });
                }
            }
        },
        Signin() {
            var me = this,
                params = {
                    Mid: this.conferenceId
                };
            let request = HttpBusinessRequest.UserSign(params);
            request.complete = function() {
                //console.log("complete");
            };
            request.success = function(data, status, xhr) {
                //console.log("====" + JSON.stringify(data));
                var data = data.Data.UserSign.UserSignResult[0].SignResult;
                if (data === "成功") {
                    me.signin = false;
                    me.getConferenceBill();
                    AlertModule.show({
                        title: "",
                        content: data
                    });
                    setTimeout(() => {
                        AlertModule.hide();
                    }, 2000);
                } else {
                    AlertModule.show({
                        title: "",
                        content: data
                    });
                    setTimeout(() => {
                        AlertModule.hide();
                    }, 2000);
                }
            };
            request.error = function(data, status, xhr) {
                //console.log(JSON.stringify(data));
                AlertModule.show({
                    title: "",
                    content: JSON.stringify(data)
                });
                setTimeout(() => {
                    AlertModule.hide();
                }, 2000);
            };
            request.send();
        }
    },
    filters: {
        Clickable(item) {
            if (item.Dmptype === "审查类") {
                if (item.VoteVisible === "否") {
                    if(item.Dmpstatus != '进行中'){
                        return '不能表决(未开始或已结束)'
                    }
                    return "表决（请先签到）";
                }

                return "表决";
            } else if (item.Dmptype === "审议类") {
                return "审议";
            }
        }
    }
};
</script>

<style lang="less">
.line_cls {
    border-bottom: 1px solid #e7e7e7;
    width: 100%;
    margin-bottom: 10px;
    margin-left: 15px;
}
.information {
    background-color: #fff;
    padding: 0 15px 0 15px;
    li {
        border-bottom: 1px solid #e7e7e7;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        padding: 15px 0;
        line-height: 22px;
        .left {
            color: #000;
            flex-shrink: 0;
            margin-right: 20px;
        }
        .right {
            color: #666;
            flex-shrink: 1;
            text-align: right;
        }
    }
}
.conferenceBill {
    .textbox {
        line-height: 20px;
        padding: 10px 20px;
        font-size: 14px;
        color: #666;
    }
    ul {
        li {
            background-color: #fff;
            margin-bottom: 10px;
            .title {
                padding: 15px 0;
                margin: 0 0px 0px 15px;
                border-bottom: 1px solid #e7e7e7;
                line-height: 24px;
                font-size: 16px;
                color: #000;
            }
            .flexBox {
                display: flex;
                display: -webkit-flex;
                justify-content: space-between;
                line-height: 20px;
                margin-bottom: 8px;
                padding: 0px 15px;
                font-size: 14px;
            }
            .flexBox1 {
                display: flex;
                display: -webkit-flex;
                line-height: 20px;
                margin-bottom: 8px;
                padding: 0px;
                font-size: 16px;
                border-top: 1px solid #e7e7e7;
                border-bottom: 1px solid #e7e7e7;
                div {
                    text-align: center;
                    flex: 1;
                    line-height: 48px;
                    &:active {
                        background-color: #eee;
                    }
                }
                div:first-child {
                    border-right: 1px solid #e7e7e7;
                }
                & .colord5d5d5:active {
                    background-color: #fff;
                }
            }
        }
    }
}
.color333 {
    color: #333;
}
.color666 {
    color: #666;
}
.colorblue {
    color: #1e4a8d;
}
.colorred {
    color: #ef5350;
}
.colord5d5d5 {
    color: #d5d5d5;
}
.fixed {
    width: 100%;
    box-sizing: border-box;
    position: static;
    padding: 10px 15px;
    display: flex;
    display: -webkit-flex;
}
</style>
