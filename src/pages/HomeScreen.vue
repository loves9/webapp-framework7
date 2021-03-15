<template>
  <f7-page @page:afterin="onPageAfterIn">
    <!-- <f7-navbar>
      <f7-nav-left back-link color="white"></f7-nav-left>
      <f7-nav-title>About</f7-nav-title>
    </f7-navbar>-->
    <!-- <f7-block-title>{{$store.state}}</f7-block-title> -->
    <f7-block-title>computed:{{homeState}}</f7-block-title>
    <!-- <i class="material-icons" style="color:red; font-size:30px">check</i> -->

    <!-- <img :src="image" alt style="width:100vw; background-color:red" /> -->
    <f7-button fill raised @click="test">test</f7-button>

    <f7-button fill raised @click="next">下一页</f7-button>

    <!-- <f7-list>
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
    </f7-list> -->
  </f7-page>
</template>

<script>
import HttpBusinessRequest from "./api/api";

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
    },
    test() {
      this.$store.dispatch("login", {
        id: "9527" + Math.floor((Math.random()*100)+1),
        name: "ssss",
        token: "8888"
      }).then(() => {
        console.log('commit提交完成')
        
      })

      // this.$store.commit("Auth Login", {
      //   id: "9527",
      //   name: "ssss",
      //   token: "8888"
      // })


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

      // this.requestAll();
      // this.$f7.device.preloader.show();
    },

    sendRequest(resolve, reject) {
      let request = HttpBusinessRequest.queryMockServer();
      request.complete = () => {};
      request.success = (data, status, xhr) => {
        this.HRLog(data, "hrlog-s");
        resolve(data);
      };
      request.error = (data, status, xhr) => {
        this.HRLog(data, "hrlog-f");
        reject(data);
      };

      request.send();
    },

    // 串行
    async requestQueue() {
      console.log("p1start");
      let p1 = await new Promise(this.sendRequest)
        .then(result => {
          console.log("成功：" + result);
        })
        .catch(reason => {
          console.log("失败：" + reason);
        });

      console.log("p1end");

      console.log("p2start");

      let p2 = await new Promise(this.sendRequest)
        .then(result => {
          console.log("成功：" + result);
        })
        .catch(reason => {
          console.log("失败：" + reason);
        });

      console.log("p2end");
    },

    // 并行
    async requestAll() {
      let datas = await Promise.all([
        new Promise(this.sendRequest)
          .then(result => {
            console.log("成功：" + result);
          })
          .catch(reason => {
            console.log("失败：" + reason);
          }),
        new Promise(this.sendRequest)
          .then(result => {
            console.log("成功：" + result);
          })
          .catch(reason => {
            console.log("失败：" + reason);
          })
      ])
        .then(result => {
          console.log("all成功：" + result);
          
        })
        .catch(reason => {
          console.log("all失败：" + reason);
        });
    }
  },
  computed: {
    homeState() {
      return this.$store.state.home.user.id
    }
  }
};
</script>

<style lang="less">
</style>
