<template>
  <f7-page>
    <!-- <f7-navbar>
      <f7-nav-left
        back-link
        color="white"
        @click.native="easyPop"
      ></f7-nav-left>
      <f7-nav-title>业务协同</f7-nav-title>
    </f7-navbar> -->

    <no-data v-show="noData"></no-data>

    <div v-show="!noData">
      <h-list
        ref="searchlist"
        :dataSource="listData"
        :pullUpRefresh="true"
        @pullUpRefresh="infinite"
        @onPress="chanceItemClick"
      >
      </h-list>

      <!-- <div style="height: 200px; width: 1px"></div> -->
    </div>
  </f7-page>
</template>

<script>
import HList from "hrkj-vux-components/src/components/h-list/index.vue";
import HttpBusinessRequest from "@/pages/api/api";
import NoData from "@/pages/component/NoData";

export default {
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
    };
  },
  mounted() {
    var title = encodeURIComponent(this.easyGetParams().content)
      .replace(/\(/g, "%28")
      .replace(/\)/g, "%29");

    if (this.$f7.device.android) {
      title = this.easyGetParams().content;
    }

  },
  destroyed() {},
  methods: {
    infinite() {
      if (this.isLoading) {
        return;
      }

      var requestParams = {};

      console.log("==", this.currentPage, this.totalPage);

      if (this.currentPage >= this.totalPage) {
        this.$refs.searchlist.finishPullUpRefresh();
        this.$refs.searchlist.noMoreData();

        return;
      }

      let title = encodeURIComponent(this.easyGetParams().content)
        .replace(/\(/g, "%28")
        .replace(/\)/g, "%29");

      requestParams = {
        page: this.currentPage + 1,
        size: this.pageSize,
        chanceTitle: title,
        // boardFlag: 'WF01'
      };

      // this.queryChanceList(requestParams);
    },
    chanceItemClick(item) {
      // console.log("search-list:", JSON.stringify(item));

      if (item.label == "推荐类") {
        this.easyPush("/demand-detail/", {
          id: item.id,
        });
      } else {
        this.easyPush("/chance-detail/", item);
      }
    },


  },
  computed: {
    noData() {
      if (this.listData.length === 0) {
        return true;
      }

      return false;
    },
    trade() {
      return dict.getCustomProfessionAction();
    },
    customerArea() {
      return dict.getCustomerAreaAction();
    },
  },
  components: {
    HList,
    NoData,
  },
};
</script>

<style lang="less" scoped>
</style>