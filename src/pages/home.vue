<template>
    <f7-page :page:mounted="pmounted">
        <f7-navbar bg-color="blue">
            <f7-nav-left>
                <f7-link
                    class="f7-icons color-white"
                    icon-if-ios="f7:menu"
                    icon-if-md="material:menu"
                    panel-open="left"
                ></f7-link>
            </f7-nav-left>
            <f7-nav-title>Home</f7-nav-title>
            <f7-nav-right>
                <f7-link
                    class="f7-icons color-white"
                    icon-if-ios="f7:menu"
                    icon-if-md="material:menu"
                    panel-open="right"
                ></f7-link>
            </f7-nav-right>
        </f7-navbar>
        <!-- <f7-toolbar bottom>
            <f7-link>Left Link</f7-link>
            <f7-link>Right Link</f7-link>
        </f7-toolbar>-->

        <!-- <h-doc-cell title="hhtitle" image="static/doc.png" subTitle="lllllll"></h-doc-cell> -->
        <h-grid :dataSource="dataSource" @onPress="itemClick"></h-grid>

        <f7-block strong>
            <p>Here is your blank Framework7 app. Let's see what we have here.</p>
        </f7-block>
        <f7-block-title>Navigation</f7-block-title>
        <f7-list>
            <f7-list-item link="#" title="About" @click="next"></f7-list-item>
            <f7-list-item link="/form/" title="Form"></f7-list-item>
        </f7-list>

        <f7-list>
            <f7-list-item
                link="/dynamic-route/blog/45/post/125/?foo=bar#about"
                title="Dynamic Route"
            ></f7-list-item>
            <f7-list-item link="/load-something-that-doesnt-exist/" title="Default Route (404)"></f7-list-item>
        </f7-list>
    </f7-page>
</template>
<script>
import HttpBusinessRequest from "@/pages/api/api.js";
import { HGrid, HDocCell } from "hrkj-vux-components";

export default {
    data() {
        return {
            dataSource: [
                {
                    name: "待办事宜",
                    iconClass: "ic-daiban-l",
                    fontSize: "30px",
                    color: "#47B3E1"
                },
                {
                    name: "我的请求",
                    iconClass: "ic-wodeqingqiu-l",
                    fontSize: "30px",
                    color: "#FFB000"
                },
                {
                    name: "已办事宜",
                    iconClass: "ic-yiban-l",
                    fontSize: "30px",
                    color: "#47B3E1"
                },
                {
                    name: "办结事宜",
                    iconClass: "ic-banjie-l",
                    fontSize: "30px",
                    color: "#00A79F"
                }
            ]
        };
    },
    created() {
        console.log("Home created");
    },
    mounted() {
        console.log("Home mounted");
        // this.sendRequest();
    },
    destroyed() {
        console.log("Home destroyed");
    },
    methods: {
        pmounted() {
            console.log("pppmmm");
        },
        itemClick(item) {
            console.log("00000");

            this.easyPush("/about/", {});
        },
        /**
         * 请求示例
         *
         */
        sendRequest() {
            let request = HttpBusinessRequest.queryMockServer();
            request.complete = () => {
                console.log("complete");
            };
            request.success = (data, status, xhr) => {
                console.log(data);
            };
            request.error = (data, status, xhr) => {
                console.log(data);
            };
            // 发送请求
            request.send();
        },
        next() {
            this.easyPush("/about/", {
                foo: 'foooooo',
                index: 1
            });
            // this.$f7router.navigate("/about/", {
            //     props: {
            //         foo: "bar",
            //         bar: true
            //     }
            // });

            // this.$f7router.navigate({
            //     name: 'about',
            //     params: {
            //         params: 'hhhhh',
            //         index: 100
            //     },
            //     query: {
            //         query: 'qqqqq'
            //     }
            // });
        }
    },
    components: {
        HGrid,
        HDocCell
    }
};
</script>
