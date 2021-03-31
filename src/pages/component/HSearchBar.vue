<template>
  <div>
    <div>
      <div v-transfer-dom>
        <!-- <popup
          v-model="showPop"
          @on-hide="popHidden"
          @on-show="popShow"
          position="top"
          style="background-color:#f4f4f4"
        >
          <div class="home-pop-search-container-cls">
            <f7-list inline-labels no-hairlines-md>
              <f7-list-input
                inputStyle="text-align:right"
                label="起始日期"
                type="datepicker"
                :calendar-params="{backdrop:true}"
                placeholder="请选择"
                @calendar:change="startTimeChange"
              >
                <div slot="inner" style="margin-left:5px; margin-right:-6px">
                  <f7-icon style="color:#D5D5D5;" size="18px" f7="chevron_right"></f7-icon>
                </div>
              </f7-list-input>

              <f7-list-input
                inputStyle="text-align:right"
                label="结束日期"
                type="datepicker"
                :calendar-params="{backdrop:true}"
                placeholder="请选择"
                @calendar:change="endTimeChange"
              >
                <div slot="inner" style="margin-left:5px; margin-right:-6px">
                  <f7-icon style="color:#D1D1D1;" size="18px" f7="chevron_right"></f7-icon>
                </div>
              </f7-list-input>
              <f7-list-input
                inputStyle="text-align:right"
                label="通知单编号"
                type="text"
                placeholder="请输入"
                :value="billNumber"
                @input="billNumber = $event.target.value"
              ></f7-list-input>

              <f7-list-item title="业务分类" link="#">
                <div style @click="popPicker(1)" slot="after">
                  <input
                    style="height:30px; text-align:right"
                    type="text"
                    placeholder="请选择"
                    readonly="readonly"
                    id="object-type-picker"
                  />
                </div>
              </f7-list-item>

              <f7-list-item title="金额">
                <div class="layout-h-cls">
                  <f7-list-input
                    class="hsb-amount-box-cls"
                    outline
                    :value="billAmount.from"
                    @input="billAmount.from = $event.target.value"
                    type="tel"
                    placeholder
                  ></f7-list-input>
                  <div style="color:#C0C4CC;">-</div>
                  <f7-list-input
                    class="hsb-amount-box-cls"
                    outline
                    :value="billAmount.to"
                    @input="billAmount.to = $event.target.value"
                    type="tel"
                    placeholder
                  ></f7-list-input>
                </div>
              </f7-list-item>
            </f7-list>

            <div class="home-pop-search-text-container-cls">
              <span class="home-pop-span-cls" @click="cancelPopSearch">取消</span>
              <span class="home-pop-span-submit-cls" @click="advancedsubmitSearch">查询</span>
            </div>
          </div>
        </popup> -->
      </div>
    </div>

    <div class="hr-search-box">
      <div class="searchInput">
        <search
          v-model="searchContent"
          @on-submit="submitSearch"
          @on-cancel="cancelSearch"
          @on-focus="getFocus"
          ref="search"
          :placeholder="placeholder"
        ></search>

        <!-- <div v-show="!searchHistoryIsShow" class="hsb-advanced-search-icon-cls">
          <f7-icon
            slot="icon"
            material="format_list_bulleted"
            style="font-size: 16px; color: #909399"
            @click.native="advancedClick"
          ></f7-icon>
        </div> -->
      </div>

      <!-- 搜索历史 -->
      <div v-show="searchHistoryIsShow" class="hr-search-history-cls">
        <div class="hsb-search-history-title-container-cls">
          <span class="search_history_title_cls">历史搜索记录：</span>
          <div class="hsb-layout-right-cls">
            <i
              class="iconfont ic-shanchu-l"
              style="font-size: 14px; color: #298ccf"
              @click="tapDelete"
            ></i>
          </div>
        </div>

        <div v-for="(mainItem, index) in arangData" :key="index">
          <div
            v-if="Array.isArray(mainItem)"
            class="hsb-search-history-title-container-cls"
          >
            <div
              class="hsb-history-item-container-cls"
              v-for="subItem in mainItem"
              :key="subItem"
              @click="historyItemClick(subItem)"
            >
              <span class="hsb-history-item-cls">{{ subItem }}</span>
            </div>
          </div>

          <div v-else class="hsb-search-history-title-container-cls">
            <div
              class="hsb-history-item-container-cls"
              @click="historyItemClick(mainItem)"
            >
              <span class="hsb-history-item-cls">{{ mainItem }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var statePicker = null;
var objectPicker = null;

const SEARCH_HISTORY_TAG = "HRKJ-XX";  // 业务tag 需要修改

export default {
  name: "h-search-bar",
  props: {
    disableHistory: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "请输入",
    },
  },
  data() {
    return {
      searchContent: "",
      searchHistoryIsShow: false,
      historyData: [],
      arangData: [],
      showPop: false,
      startTime: "",
      endTime: "",
      billNumber: "",
      billType: "",
      billState: "",
      billObjType: "",
      billAmount: {
        from: "",
        to: "",
      },
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
    advancedClick() {
      console.log("advancedClick");
      this.$emit("advancedOnPressed");
      // this.showPop = true;
      // this.easyPush('/search-result/')
    },
    popShow() {},
    popHidden() {},
    submitSearch(text) {
      this.showPop = false;
      this.$refs.search.setBlur();

      this.searchContent = text;
      // this.$refs.search.setBlur();
      this.$emit("onSubmit", text);

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
            SEARCH_HISTORY_TAG,
            JSON.stringify(this.historyData)
          );
        }
      }
    },
    cancelSearch() {
      if (!this.disableHistory) {
        this.searchHistoryIsShow = false;
      }

      this.$emit("onCancel");
    },
    getFocus() {
      let _this = this;
      if (!this.disableHistory) {
        this.searchHistoryIsShow = true;

        // 初始化历史数据
        if (window.localStorage) {
          console.log(
            window.localStorage[SEARCH_HISTORY_TAG],
            "初始化保存的数据源"
          );
          if (window.localStorage[SEARCH_HISTORY_TAG]) {
            this.historyData = JSON.parse(
              window.localStorage[SEARCH_HISTORY_TAG]
            );

            var subItem = [];
            var itemLength = 0;
            this.arangData = [];

            this.historyData.forEach((item, index) => {
              console.log(item, "数据源的每个item");
              // 如果单个搜索结果大于13 则直接添加
              if (item.length >= 13) {
                _this.arangData.push(item);
                itemLength = 0;
              } else {
                itemLength += item.length;

                if (itemLength < 13) {
                  subItem.push(item);
                  itemLength += item.length;

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

      this.$emit("onFocus");
    },
    tapDelete() {
      window.localStorage.clear();
      this.historyData = [];
      this.arangData = [];
    },
    historyItemClick(item) {
      this.submitSearch(item);
    },
    startTimeChange(date) {
      this.startTime = this.$core.Utils.dateFormat(date[0], "yyyy-MM-dd");
    },
    endTimeChange(date) {
      this.endTime = this.$core.Utils.dateFormat(date[0], "yyyy-MM-dd");
    },
    advancedsubmitSearch() {
      let searchParams = {
        dept: "",
        fdate: this.startTime,
        tdate: this.endTime,
        billCode: this.billNumber,
        billType: this.billObjType,
        famount: this.billAmount.from,
        tamount: this.billAmount.to,
        page: 0,
      };
      console.log("=>", JSON.stringify(searchParams));
      this.showPop = false;
      this.easyPush("/search-result/", searchParams);
    },
    selectedButton(obj) {
      console.log(obj);
      this.billType = obj.index;
    },
    popPicker(index) {
      switch (index) {
        case 0:
          if (statePicker) {
            statePicker.open();
            return;
          }

          statePicker = this.$f7.picker.create({
            inputEl: "#state-type-picker",
            rotateEffect: true,
            openIn: "popover",
            toolbar: false,
            formatValue: (val) => {
              return val;
            },
            cols: [
              {
                textAlign: "center",
                values: [
                  "已保存",
                  "已确认",
                  "一级复核通过",
                  "已提交",
                  "二级复核通过",
                  "审批通过",
                  "已退回",
                  "已撤销",
                ],
                onChange: (picker, value, displayValue) => {
                  console.log(value);
                },
              },
            ],
          });
          statePicker.open();
          break;
        case 1:
          if (objectPicker) {
            objectPicker.open();
            return;
          }

          objectPicker = this.$f7.picker.create({
            inputEl: "#object-type-picker",
            rotateEffect: true,
            openIn: "popover",
            toolbar: false,
            formatValue: (val) => {
              return val;
            },
            cols: [
              {
                textAlign: "center",
                values: [
                  "上划管理",
                  "自动归集",
                  "取回",
                  "备用金拨付申请",
                  "内部借款拨付申请",
                  "内部借款申请",
                  "周转金拨付申请",
                  "调款管理",
                  "内部借款申请合并",
                ],
                onChange: (picker, value, displayValue) => {},
              },
            ],
          });
          objectPicker.open();
          break;

        default:
          break;
      }
    },
  },
  components: {
    // Search,
    // PopupPicker,
    // Popup
  },
};
</script>

<style lang="less" scoped>
.hsb-history-item-container-cls {
  background-color: #f4f4f4;
  border-radius: 18px;
  // width: 100vh;
  margin-right: 10px;
  padding: 3px 15px 3px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hsb-history-item-cls {
  font-size: 14px;
  color: #909399;
  letter-spacing: 0;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 280px;
}

.hsb-layout-right-cls {
  display: flex;
  justify-content: flex-end;
  width: 100vh;
}
.hr-search-history-cls {
  background-color: white;
  height: auto;
  z-index: 99;
}
.hsb-search-history-title-container-cls {
  display: flex;
  flex-direction: row;
  padding: 10px 15px 10px 15px;
}

.search_history_title_cls {
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
.hr-search-box {
  height: 45px;
  // background-color: #c64248;
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

// .weui-icon-search {
// }

.hsb-advanced-search-icon-cls {
  width: 32px;
  height: 30px;
  // background-color: white;
  // border-radius: 15px;
  margin: 8px 15px 8px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hsb-amount-box-cls {
  // border: 1px solid #c0c4cc;
  // border-radius: 8px;
  width: 140px;
}

// .f7-popup-cls{
//   // height: 50vh;
// }
</style>
