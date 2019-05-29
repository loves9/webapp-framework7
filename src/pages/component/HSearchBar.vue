<template>
    <div>
        <div transfer-dom>
            <popup v-model="showPop" @on-hide="popHidden" @on-show="popShow" position="top" style="background-color:#f4f4f4">
                <div>
                    <div class="searchInput">
                        <search v-model="searchContent" @on-submit="submitSearch" @on-cancel="cancelSearch" ref="search" :placeholder="placeholder">
                        </search>
                    </div>
                    <slot></slot>
                </div>
            </popup>
        </div>

        <div class="searchBox">
            <div class="searchInput">
                <search v-model="searchContent" @on-submit="submitSearch" @on-cancel="cancelSearch" @on-focus="getFocus" ref="search" :placeholder="placeholder">
                </search>

                <div class="advancedSearch_icon_cls">
                    <i @click="showPop = !showPop" class="iconfont ic-shaixuan-l" style="font-size:16px; color:#909399;"></i>
                </div>
            </div>

            <!-- 搜索历史 -->
            <div v-show="searchHistoryIsShow" class="search_history_cls">
                <div class="search_history_title_container_cls">
                    <span class="search_history_title_cls">历史搜索记录：</span>
                    <div class="layout_right">
                        <i class="iconfont ic-shanchu-l" style="font-size:14px; color:#298CCF;" @click="tapDelete"></i>
                    </div>
                </div>

                <div v-for="(mainItem, index) in arangData" :key="index">
                    <div v-if="Array.isArray(mainItem)" class="search_history_title_container_cls">
                        <div class="history_item_container_cls" v-for="subItem in mainItem" :key="subItem" @click="historyItemClick(subItem)">
                            <span class="history_item_cls">{{subItem}}</span>
                        </div>
                    </div>

                    <div v-else class="search_history_title_container_cls">
                        <div class="history_item_container_cls" @click="historyItemClick(mainItem)">
                            <span class="history_item_cls">{{mainItem}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Search, PopupPicker, Popup } from "vux";
import { stringify } from "querystring";

export default {
    props: {
        disableHistory: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: "请输入"
        }
    },
    data() {
        return {
            searchContent: "",
            searchHistoryIsShow: false,
            historyData: [],
            arangData: [],
            showPop: false
        };
    },
    mounted() {},
    destroyed() {},
    methods: {
        historyIsShow() {
            return this.searchHistoryIsShow;
        },
        getSearchContent() {
            return this.searchContent;
        },
        cancelPopSearch() {
            this.showPop = false;
        },
        popShow() {},
        popHidden() {},
        submitSearch(text) {
            let _this = this;
            this.searchContent = text;
            // this.$refs.search.setBlur();
            this.$emit("HREVENT_submit", text);

            // 为空 不存储
            if (text == "") {
                return;
            }

            if (!this.disableHistory) {
                this.searchHistoryIsShow = false;

                // 去重
                var sameWord = false;
                for (let i = 0; i < this.historyData.length; i++) {
                    if (
                        this.historyData[i].indexOf(text) != -1 &&
                        this.historyData[i].length == text.length
                    ) {
                        sameWord = true;
                        break;
                    }
                }

                if (!sameWord || this.historyData.length == 0) {
                    this.historyData.push(text);
                }

                // 设置最大存储数
                if (this.historyData.length > 6) {
                    this.historyData.splice(0, 1);
                    console.log(this.historyData[0], "超出最大值，挤出的item");
                }

                if (window.localStorage) {
                    console.log(this.historyData, "保存的数据");

                    window.localStorage.setItem(
                        "HRKJ",
                        JSON.stringify(this.historyData)
                    );
                }
            }
        },
        cancelSearch() {
            if (!this.disableHistory) {
                this.searchHistoryIsShow = false;
            }

            this.$emit("HREVENT_onCancel");
        },
        getFocus() {
            let _this = this;
            if (!this.disableHistory) {
                this.searchHistoryIsShow = true;

                // 初始化历史数据
                if (window.localStorage) {
                    console.log(
                        window.localStorage["HRKJ"],
                        "初始化保存的数据源"
                    );
                    if (window.localStorage["HRKJ"]) {
                        this.historyData = JSON.parse(
                            window.localStorage["HRKJ"]
                        );

                        var subItem = [];
                        var itemLength = 0;
                        this.arangData = [];

                        this.historyData.forEach((item, index) => {
                            console.log(item, '数据源的每个item')
                            // 如果单个搜索结果大于13 则直接添加
                            if (item.length >= 13) {
                                _this.arangData.push(item);
                                itemLength = 0
                            } else {
                                itemLength += item.length;

                                if (itemLength < 13) {
                                    subItem.push(item);
                                    itemLength += item.length

                                    // 当数组中最后一个时
                                    if (this.historyData.length == index + 1) {
                                        this.arangData.push(subItem.reverse());
                                    }
                                } else {
                                    // 先存储小于限制的数组 再存储当前循环字段
                                    _this.arangData.push(subItem.reverse());

                                    // 循环归零
                                    subItem = [];
                                    subItem.push(item);
                                    itemLength = item.length;

                                    // 当数组中最后一个时
                                    if (this.historyData.length == index + 1) {
                                        this.arangData.push(item);
                                    }
                                }
                            }
                        });

                        if (this.arangData.length == 0 && subItem.length != 0) {
                            this.arangData.push(subItem);
                        }

                        console.log(this.arangData, "排列数据源");
                        this.arangData.reverse();
                    }
                }
            }

            this.$emit("HREVENT_onFocus");
        },
        tapDelete() {
            window.localStorage.clear();
            this.historyData = [];
            this.arangData = [];
        },
        historyItemClick(item) {
            this.submitSearch(item);
        }
    },
    components: {
        Search,
        PopupPicker,
        Popup
    }
};
</script>

<style lang="less" scoped>
.history_item_container_cls {
    background-color: #f4f4f4;
    border-radius: 18px;
    // width: 100vh;
    margin-right: 10px;
    padding: 3px 15px 3px 15px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.history_item_cls {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #909399;
    letter-spacing: 0;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 280px;
}

.layout_right {
    display: flex;
    justify-content: flex-end;
    width: 100vh;
}
.search_history_cls {
    background-color: white;
    height: auto;
    z-index: 99;
}
.search_history_title_container_cls {
    display: flex;
    flex-direction: row;
    padding: 10px 15px 10px 15px;
}

.search_history_title_cls {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #606266;
    letter-spacing: 0;
    width: 100vh;
}
</style>


<style lang="less">
.weui-search-bar__cancel-btn {
    color: #298ccf !important;
}
.searchBox {
    height: 45px;
}
.advancedSearch {
    width: 100%;
    position: fixed;
    top: 0px;
    left: 0;
    z-index: 9;
    background: #f4f4f4;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    padding-bottom: 20px;
    padding-top: 10px;
}
.searchInput {
    height: 45px;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f4f4f4;
    flex-direction: row;
}
.searchmore {
    width: 40px;
    font-size: 14px;
    color: #c64248;
}
.buttonBox {
    text-align: right;
    padding: 10px 20px 0 0;
}
.searchText {
    font-size: 16px;
    color: #c64248;
    line-height: 20px;
    display: inline-block;
    margin: 0 10px;
}

.weui-search-bar__form {
    background: #f4f4f4 !important;
    border-color: #f4f4f4 !important;
}

.weui-search-bar__form:after {
    border-radius: 25px !important;
}

.weui-search-bar__label {
    background-color: transparent !important;
    z-index: 0 !important;
}

.weui-search-bar:after {
    border-bottom: none !important;
}
.weui-search-bar:before {
    border-top: none !important;
}

.weui-icon-search {
}

.advancedSearch_icon_cls {
    width: 32px;
    height: 30px;
    background-color: white;
    border-radius: 15px;
    margin: 8px 15px 8px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>