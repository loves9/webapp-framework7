<template>
    <div ref="myScroll" @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)">

        <section>
            <slot ref="list"></slot>

            <load-more v-show="isLoading" :tip="loadingText"></load-more>
        </section>
    </div>
</template>

<script>
import { LoadMore } from "vux";

export default {
    props: {
        isLoading: {
            type: Boolean,
            default: false
        },
        loadingText: {
            type: String,
            default: "正在加载..."
        },
        scrollToTop: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            pageX: 0,
            pageY: 0,
            state: 0,
            scrollPosition: 0,
            myScroll: null,
            myScrollList: null,

            listHeight: 0
        };
    },
    created() {
        window.addEventListener("scroll", this.onScroll($event), true);
    },
    mounted() {
        this.myScroll = this.$refs.myScroll; //获取滑条dom
        this.myScrollList = this.myScroll.children[1]; //获取列表dom
    },
    methods: {
        touchStart(e) {

        },
        touchEnd() {
        },
        touchMove(e) {

        },
        onScroll(e) {

            console.log("onScroll");

        }
    },
    components: {
        LoadMore
    }
};
</script>

<style scoped>
.scroll-loadmore .inner {
    position: absolute;
    top: 0;
    width: 100%;
    transition-duration: 300ms;
}
</style>

<style lang="less" scoped>
.container_layout_cls {
    display: flex;
    margin-top: -20%;
    align-items: center;
    justify-content: center;
    height: 100%;
    flex-direction: column;
}

.nodata_container_cls {
    display: flex;
    flex-direction: row;
    // justify-content: center;
    align-items: center;
}

.nodata_line_cls {
    height: 1px;
    background-color: #d5d5d5;
    width: 100vh;
}

.nodata_span_cls {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #909399;
    letter-spacing: 0;
    text-align: center;
    width: 80vh;
}
</style>


