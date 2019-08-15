<template>
  <div class="upgrade_container_cls" style="background-color:#fff; height:100vh">
    <img class="upgrade_img_cls" :src="imagePath" />

    <div class="upgrade_text_container_cls">
      <span class="label_one">{{labelText_one}}</span>
      <span class="label_two">尊敬的用户，您好！</span>
      <span class="label_two">{{labelText_two}}</span>
      <span class="label_two">{{labelText_three}}</span>
      <span class="label_three">服务电话：010-59618206</span>
    </div>

    <div class="error_btn_cls">
      <x-button style="background-color:#fff" @click.native="errorButtonClick">{{buttonTitle}}</x-button>
    </div>
  </div>
</template>

<script>
import { XButton } from "vux";
export default {
  props: {
    type: {
      type: String,
      default: "system"
    },
    buttonTitle: {
      type: String,
      default: "确定"
    }
  },
  data() {
    return {
      labelText_one: "哎呀，出错了…",
      labelText_two: "由于系统原因给您造成不便，",
      labelText_three: "请联系技术支持协助解决。",
      imagePath: require("./images/error.png")
    };
  },
  mounted() {
    switch (this.type) {
      case "system":
        break;
      case "upgrade":
        this.labelText_one = "精彩内容，稍后呈现…";
        this.labelText_two = "由于目前系统升级中，";
        this.labelText_three = "给您造成不便，敬请谅解。";
        this.imagePath = require("./images/upgrade.png");
        break;
    }
  },
  computed: {},
  methods: {
    errorButtonClick() {
      this.$emit("HREVENT_errorButtonClick");
    }
  },
  components: {
    XButton
  }
};
</script>

<style lang="less">
.upgrade_container_cls {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.upgrade_text_container_cls {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

.upgrade_img_cls {
  width: 239px;
  // height: 196px;
  margin-top: 50px;
}
.label_one {
  color: #346dc7;
  font-size: 24px;
  margin-top: 40px;
  padding-left: 89px;
  margin-bottom: 20px;
  font-family: "PingFangSC-Medium";
}
.label_two {
  color: #303133;
  font-size: 16px;
  margin-top: 10px;
  padding-left: 89px;
  font-family: "PingFangSC-Regular";
}

.label_three {
  color: #346dc7;
  font-size: 16px;
  margin-top: 10px;
  padding-left: 89px;
  font-family: "PingFangSC-Medium";
}
.error_btn_cls {
  width: 90%;
  // padding: 15px;
  margin-top: 90vh;
  position: absolute;
}
</style>
