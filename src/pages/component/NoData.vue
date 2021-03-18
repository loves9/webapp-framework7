<template>
  <div>
    <div class="nodata-container">
      <img src="@/assets/nodata.svg" class="nodata-pic" />
      <!-- <span style="color:#999999; margin-top:-10px; font-size:12px">没有数据</span> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "no-data",
  props: {},
  mounted() {},
  destroyed() {},
  methods: {},
};
</script>

<style lang="less" scoped>
@namespace: "nodata";
.nodata-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  // height: 100%;

  position: absolute;
  top: 130px;
  bottom: 130px;
  left: 0px;
  right: 0;
  // background-color: aquamarine;
}
.nodata-pic {
  width: 120px;
  height: 120px;
  opacity: 0.3;
}
</style>
