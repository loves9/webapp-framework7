export default {
    methods: {
        /**
         * 设置页面标题
         *
         * @param {string} title
         */
        setTitle(title) {
            MXWebui.setWebViewTitle(title);

        },

        /**
         * 页面push方法
         * @param url
         * @param options
         */
        easyPush(url, options) {
            if (this.$core) {
                this.$core.RouterManager.push(url, options, this)
            }
        },

        /**
         * 页面pop方法
         * @param options
         * @return 调用是否成功。
         */
        easyPop(url, options) {
            if (this.$core) {
                this.$core.RouterManager.pop(url, options, this);
                return true;
            }
            return false;
        },

        /**
         * 获取页面传递的参数
         */
        easyGetParams() {
            if (this.$f7route) {
                return this.$f7route.query
            }

            return {}
        },

        /**
         * 设置 MX cordova
         *
         * @param {*} callBack 回调函数
         */
        setDeviceReady(callBack) {
            document.addEventListener("deviceready", onDeviceReady, false); //等待cordova加载

            function onDeviceReady() {
                MXSetting &&
                    typeof MXSetting.setConsoleLogEnabled === 'function' &&
                    MXSetting.setConsoleLogEnabled();
                console.log('ondeviceready-mixin');

                callBack()
            }
        },

        
    }
}