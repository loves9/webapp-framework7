<template>
  <div>
    <div class="nodata-container">
      <i class="iconfont ic-wushuju-l" style="font-size:120px; color:#999999"></i>
      <span style="color:#999999; margin-top:-10px; font-size:12px">没有数据</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "no-data",
  props: {},
  mounted() {},
  destroyed() {},
  methods: {}
};
</script>

<style lang="less" scoped>
@namespace: "nodata";
.nodata-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70vh;
  flex-direction: column;
}
</style>
