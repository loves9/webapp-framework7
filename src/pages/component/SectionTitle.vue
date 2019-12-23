<template>
  <div class="section-title-box">
    <div class="head"></div>
    <span class="title">{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: "section-title",
  props: {
    title: {
      type: String,
      default: "title"
    }
  },
  mounted() {},
  destroyed() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.section-title-box {
  margin: 10px 15px 10px 15px;
  display: flex;
  align-items: center; /*定义body的元素垂直居中*/

  .head {
    width: 3px;
    height: 14px;
    background-color: #298ccf;
    margin-right: 8px;
  }
  .title {
    font-size: 14px;
    color: #303133;
  }
}
</style>