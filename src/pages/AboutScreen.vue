<template>
  <f7-page>
    <!-- <f7-navbar>
            <f7-nav-left back-link color="white"></f7-nav-left>
            <f7-nav-title>About</f7-nav-title>
    </f7-navbar>-->
    <f7-block-title>userId:{{userId}}</f7-block-title>
    <f7-block-title>getUser:{{getUser}}</f7-block-title>
    <f7-block-title>getUserFunc:{{getUserFunc}}</f7-block-title>

    <f7-block-title>About My App</f7-block-title>
    <f7-block strong>
      <p>Here is About page!</p>
      <p>
        You can go
        <f7-link back>back</f7-link>.
      </p>
      <p>Mauris posuere sit amet metus id venenatis. Ut ante dolor, tempor nec commodo rutrum, varius at sem. Nullam ac nisi non neque ornare pretium. Nulla mauris mauris, consequat et elementum sit amet, egestas sed orci. In hac habitasse platea dictumst.</p>
      <p>Fusce eros lectus, accumsan eget mi vel, iaculis tincidunt felis. Nulla tincidunt pharetra sagittis. Fusce in felis eros. Nulla sit amet aliquam lorem, et gravida ipsum. Mauris consectetur nisl non sollicitudin tristique. Praesent vitae metus ac quam rhoncus mattis vel et nisi. Aenean aliquet, felis quis dignissim iaculis, lectus quam tincidunt ligula, et venenatis turpis risus sed lorem. Morbi eu metus elit. Ut vel diam dolor.</p>
    </f7-block>

    <f7-button fill raised @click="next">确定</f7-button>
  </f7-page>
</template>

<script>
export default {
  created() {
    console.log("AboutPage created");
  },
  mounted() {
    console.log("AboutPage mounted");
    // console.log("state", this.$store.getters.getUser);
  },
  destroyed() {
    console.log("AboutPage destroyed");
  },
  methods: {
    next() {
      this.easyPush("/form/", {
        name: "About",
        index: 2
      });
    }
  },
  computed: {
    userId() {
      return this.$store.state.home.user.id
    },
    getUser() {
      return this.$store.getters.getUser
    },
    getUserFunc() {
      return this.$store.getters.getUserFunc(89757)
    }
  }
};
</script>
