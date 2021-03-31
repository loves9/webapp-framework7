<template>
  <f7-page>
    <div>
      <tab>
        <tab-item selected @on-item-click="tabClick(1)">待办</tab-item>
        <tab-item @on-item-click="tabClick(2)">已办</tab-item>
      </tab>

      <no-data v-show="noData"></no-data>
      <div v-show="!noData">
        <h-list ref="list1" :dataSource="listData" :headHeight="44" @onPress="onPressed"> </h-list>
      </div>
    </div>
  </f7-page>
</template>

<script>
import HList from "hrkj-vux-components/src/components/h-list/index.vue";
import SearchBar from "@/pages/component/HSearchBar.vue";
import HttpBusinessRequest from "@/pages/api/api";
import NoData from "@/pages/component/NoData";

export default {
  props: {
    type: String,
    default: "",
  },
  data() {
    return {
      isLoading: false,
      isHiddenContent: false,
      showPopupPicker: false,
      listData: [
        {
          title: "协同机会test",
          subTitle: "北京分公司",
          text: "1111",
        },
      ],
      pageNumber: 0,
      currentPage: 0,
      totalPage: 0,
      pageSize: 10,
      currentTab: 0,
    };
  },
  mounted() {
    this.setDeviceReady(() => {
      // this.queryFeeCategory({
      //   page: this.pageNumber,
      //   size: this.pageSize,
      // });
    });
  },
  destroyed() {},
  methods: {
    onFoucus() {
      this.$emit("searchBarState", { state: "onFoucus" });
      this.isHiddenContent = true;
    },
    onCancel() {
      this.$emit("searchBarState", { state: "onCancel" });
      this.isHiddenContent = false;
    },
    onSubmit(context) {
      this.easyPush("/search-result/", {
        content: context,
      });
    },
    advancedClick() {
      // console.log(
      //   "advancedOnPressed",
      //   JSON.stringify(
      //     this.$store.state.home.dictionaryParams.state.xtProjectType
      //   )
      // );
    },
    tabClick(index) {
      this.HRLog(index);
      this.currentTab = index;
      switch (index) {
        case 0:
          break;

        case 1:
          break;

        default:
          break;
      }
    },
    infinite() {
      if (this.isLoading || this.noData) {
        return;
      }

      var requestParams = {};

      if (this.currentPage + 1 >= this.totalPage) {
        // console.log("==", this.currentPage, this.totalPage);
        this.$refs.list1.finishPullUpRefresh();
        this.$refs.list1.noMoreData();

        return;
      }

      requestParams = {
        page: this.currentPage + 1,
        size: this.pageSize,
      };

      this.queryFeeCategory(requestParams);
    },
    onPressed(item) {
      // console.log(item);
      this.easyPush("/form/", item);
    },
    queryFeeCategory(params, setUp) {
      this.isLoading = true;
      let request = HttpBusinessRequest.queryFeeCategory(params, setUp);
      request.complete = () => {
        this.isLoading = false;
        this.$refs.list1.finishPullUpRefresh();
      };
      request.success = (data, status, xhr) => {
        // this.HRLog("queryChanceList-success:", JSON.stringify(data));
      };
      request.error = (data, status, xhr) => {
        console.log("queryFeeCategory-error:", JSON.stringify(data));
      };
      request.send();
    },
  },
  computed: {
    noData() {
      if (this.listData.length === 0) {
        return true;
      }

      return false;
    },
  },
  components: {
    SearchBar,
    NoData,
    HList,
  },
};
</script>
