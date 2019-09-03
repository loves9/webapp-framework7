<template>
  <f7-page>
    <!-- <f7-navbar>
      <f7-nav-left back-link color="white"></f7-nav-left>
      <f7-nav-title>About</f7-nav-title>
    </f7-navbar>-->
    <f7-block-title>HOME</f7-block-title>

    <!-- <img :src="image" alt style="width:100vw; background-color:red" /> -->
    <f7-button fill raised @click="test">test</f7-button>

    <f7-button fill raised @click="next">下一页</f7-button>
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
    next() {
      this.easyPush("/about/", {
        name: "About",
        index: 2
      });

      this.imageCapture();
    },
    test() {
      // this.HRActionSheet(['11', '22'], (obj)=>{
      //   console.log(obj)
      // })

      // this.HRToast('操作成功', 'checked')

      this.HRPicker(["飞机票", "火车票", "公交票", "的士票", "其它"], obj => {
        console.log(obj);
      });
    },

    imageCapture() {}
  }
};
</script>

<style lang="less">
</style>
