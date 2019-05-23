<template>
    <div>
        <transition :name="this.$store.state.direction">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive" class="router-view"></router-view>
            </keep-alive>
        </transition>
        <transition :name="this.$store.state.direction">
            <router-view v-if="!$route.meta.keepAlive" class="router-view"></router-view>
        </transition>
    </div>
</template>

<script>
import { mapState } from 'vuex'

import {
    Group,
    Cell,
    ViewBox,
    XButton
} from "vux";

export default {
    data() {
        return {};
    },
    mounted() {},
    methods: {},
    computed: {
        ...mapState({
            route: state => state.route,
            path: state => state.path,
            direction: state => state.direction,
            isLoading: state => state.isLoading
        })
    }
};
</script>

<style lang='less'>
@import "~vux/src/styles/reset.less";
@import "~vux/src/styles/1px.less";
@import "~vux/src/styles/tap.less";

html,
body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
}
body {
    background-color: #fbf9fe;
}
#app {
    height: 100%;
}
.router-view {
    width: 100%;
}
.turn-on-enter-active,
.turn-on-leave-active,
.turn-off-enter-active,
.turn-off-leave-active {
  will-change: transform;
  transition: all 500ms;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}
.turn-off-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.turn-off-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.turn-on-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.turn-on-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
