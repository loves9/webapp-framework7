<template>
  <div class="tc-container-cls">
    <f7-row no-gap>
      <div class="tc-type-title-cls">{{data.processInstance.definitionName}}</div>
    </f7-row>

    <f7-row style="margin-top:5px; margin-bottom:5px">
      <span class="tc-title-cls">{{data.processInstance.title}}</span>
    </f7-row>
    <f7-row>
      <f7-col style="margin-top:5px;" width="55">
        <span class="tc-actname-cls">{{data.name}}</span>
      </f7-col>
      <f7-col style="margin-top:5px; text-align: right;" width="45">
        <span class="tc-date-cls">{{data.customTime}}</span>
      </f7-col>
    </f7-row>
  </div>
</template>

<script>
export default {
  name: "table-cell",
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          processInstance:{}
        };
      }
    }
  },
  mounted() {},
  destroyed() {},
  methods: {
    next() {}
  }
};
</script>

<style lang="less" scoped>
.tc-container-cls {
  &:active {
    background-color: #eee;
  }

  background-color: #ffffff;
  padding: 15px;

  margin-bottom: 10px;
}
.tc-type-title-cls {
  font-size: 14px;
  color: #606266;
}

.tc-title-cls {
  font-size: 17px;
  color: #303133;
}

.tc-date-cls {
  font-size: 14px;
  color: #606266;
}

.tc-actname-cls {
  font-size: 14px;
  color: #298CCF;
}
</style>
