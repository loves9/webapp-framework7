<template>
  <div>
    <f7-list media-list class="skeleton-text skeleton-effect-blink">
      <f7-list-item
        v-for="(item, index) in 10"
        :key="index"
        title="xxxxxxxxxx"
        after="xxxxxxxxxxxx"
      ></f7-list-item>
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

</style>

