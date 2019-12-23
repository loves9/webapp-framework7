<template>
  <f7-page @page:afterin="onPageAfterIn">
    <!-- <f7-navbar>
      <f7-nav-left back-link color="white"></f7-nav-left>
      <f7-nav-title>About</f7-nav-title>
    </f7-navbar>-->
    <f7-block-title>HOME</f7-block-title>
    <!-- <i class="material-icons" style="color:red; font-size:30px">check</i> -->

    <!-- <img :src="image" alt style="width:100vw; background-color:red" /> -->
    <f7-button fill raised @click="test">test</f7-button>

    <f7-button fill raised @click="next">下一页</f7-button>

    <f7-list>
      <f7-list-item
        title="Mac or Windows"
        smart-select
        :smart-select-params="{openIn: 'sheet', backdrop: true, sheetCloseLinkText: '确定'}"
      >
        <select name="mac-windows">
          <option value="mac" selected>Mac</option>
          <option value="windows">Windows</option>
        </select>
      </f7-list-item>
    </f7-list>
  </f7-page>
</template>

<script>
export default {
  data() {
    return {
      image: require("@/assets/logo.png")
    };
  },
  mounted() {
    console.log("HomePage mounted");
  },
  destroyed() {
    console.log("HomePage destroyed");
  }, 
  methods: {
    onPageAfterIn(pageData) {
      // console.log(pageData)
    },
    popForResult(data) {
      console.log(data);
    },
    next() {
      this.easyPush("/about/", {
        name: "About",
        index: 2
      });

      this.imageCapture();
    },
    test() {
      this.$store.dispatch("login", {
        id: "9527",
        name: "ssss",
        token: "8888"
      });
      // this.$emit('popForResult', {aaa: 1});
      // this.HRActionSheet(['11', '22'], (obj)=>{
      //   console.log(obj)
      // })

      // this.HRConfirm("操作成功交会拉克登记卡al?", (index) => {
      //   console.log("sssss", index);
      // });

      // this.HRPicker(["飞机票", "火车票", "公交票", "的士票", "其它"], obj => {
      //   console.log(obj);
      // });
    },

    imageCapture() {}
  }
};
</script>

<style lang="less">
</style>
