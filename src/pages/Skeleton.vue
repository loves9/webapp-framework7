<template>
  <div>
    <f7-list media-list class="skeleton-text skeleton-effect-blink">
      <!-- <f7-list-item
        v-for="index in 13"
        :key="index"
        title="xxxxxxxx"
        after="xxxxxxxxxxxxxx"
      ></f7-list-item>-->

      <div style="margin:10px 10px 10px 15px">xxxxxxxxxxxxxxxxxxxx</div>

      <div style="background-color:#fff">
        <div class="title">xxxxxxxxxxxxx</div>
        <div style="margin:10px 10px 10px 15px">xxxxxxxxxxxx</div>

        <div>
          <div class="line_cls"></div>
          <div class="textBox">xxxxxxxxxxxxxx</div>
        </div>
        <f7-list-item title="xxxxxxxxxxxx xxxxxxx xxxxxxxxxxxx" subtitle="Subtitle">
          <f7-skeleton-block style="width: 44px; height: 44px;" slot="media"></f7-skeleton-block>
        </f7-list-item>

        <div class="line_cls" style="margin-left:15px"></div>

        <div class="skeleton-box">
          <div class="color333">xxxxxxxxxx</div>
          <div class="color666">xxxxxxxxxxxxxxxxxxx</div>
        </div>
        <div class="skeleton-box">
          <div>xxxxxxxxxx</div>
          <div>xxxxxxxxxxxxxxxxxxx</div>
        </div>
        <div class="skeleton-box">
          <div class="color333">xxxxxxxxxx</div>
          <div class="color666">xxxxxxxxxxxxxxxxxxx</div>
        </div>
        <!-- <div class="flexBox1">
          <div>xxxxxxxxxxxx</div>
        </div> -->
      </div>
    </f7-list>
  </div>
</template>

<script>
export default {
  mounted() {},
  destroyed() {},
  methods: {
    next() {}
  }
};
</script>

<style lang="less" scoped>
.textbox {
  line-height: 20px;
  padding: 10px 20px 10px 15px;
  font-size: 14px;
  color: #666;
}

.title {
  padding: 15px 0;
  margin: 0 0px 0px 15px;
  // border-bottom: 1px solid #e7e7e7;
  line-height: 24px;
  font-size: 16px;
  color: #000;
}
.skeleton-box {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  line-height: 20px;
  margin-bottom: 8px;
  padding: 0px 15px 10px 15px;
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
</style>

