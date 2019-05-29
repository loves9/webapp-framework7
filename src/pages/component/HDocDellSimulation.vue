<template>
    <section>
        <div v-for="(value,key,index) in attachmentList" :key="index" class="attachmentBox">
            <div class="title">{{key}}</div>
            <div class="attachmentList" v-for="(item,index1) in value" :key="index1" @click="viewAttachment(item)">
                <span class="iconfont" :class="resolveClass(item.docType)"></span>
                <div class="fileTitle">
                    <p class="p1">{{item.docName}}</p>
                    <p class="p2">{{item.docSize | bytesToSize}}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { AlertModule,LoadingPlugin  } from "vux";
export default {
    data(){
        return {
            attachmentDisab:true,
        };
    },
    components:{
        AlertModule,LoadingPlugin
    },
    props: {
        attachmentList:null,
    },
    methods: {
        resolveClass(value) {
            var imgtype = ["png", "jpg", "jpeg", "PNG", "JPG", "JPEG"],
                className;
            if (imgtype.indexOf(value) > -1) {
                className = "ic-tupian-fang-f";
            }else if(value === "doc" || value === "docx") {
                className = "ic-word-fang-f";
            }else if(value === "xls" || value === "xlsx"){
                className = "ic-excel-fang-f";
            }else if(value === "ppt" || value === "pptx"){
                className = "ic-ppt-fang-fjiandan"
            }else if(value === "pdf"){
                className = "ic-pdf-fang-fjiandan";
            }else if(value === "txt"){
                className = "ic-txt-fang-f";
            }else{
                className = "ic-wenjian-fang-f";
            }
            return className;
        },
        viewAttachment(item){
            if(item.docShow === "是"){
                if(item.docSize === null){
                    AlertModule.show({
                        title: '',
                        content: '文档为空',
                    })
                    setTimeout(() => {
                        AlertModule.hide()
                    }, 2000)
                }else{
                    if(this.attachmentDisab){
                        this.attachmentDisab = false;
                        var fileId = item.docId;
                        var fileName = item.docName;
                        this.viewDoc(fileId, fileName);
                    }else{
                        return;
                    }
                }
            }else{
                AlertModule.show({
                    title: '',
                    content: '其他系统上送的会议议案不可在线预览',
                })
                setTimeout(() => {
                    AlertModule.hide()
                }, 2000)
            }
        },
        viewDoc: function(FileId, FileName) {
            var _this = this;
            var u = navigator.userAgent;
            var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

            //文件预览仿真
            var fileName = encodeURIComponent(FileName, "utf-8");
            var fileUrl = "http://kmsbak.chamc.com.cn/meetingapi/doc/Meeting/DownloadFile?DocumentID=" + FileId;
            var realUrl = encodeURIComponent(fileUrl, "utf-8");

            //仿真
            var androidurl ="http://bak-sys-mobserver.chamc.com.cn/api/v2/hr/preview?url=" + realUrl + "&name=" + fileName + "&enableZoom=true&method=200";
            var iosurl ="http://bak-sys-mobserver.chamc.com.cn/api/v2/hr/preview?url=" + realUrl + "&name=" + fileName + "&enableZoom=true";

            if (isAndroid) {
                this.$vux.loading.show({
                    text: 'Loading'
                });
                MXCommon.ajax({
                    type: "GET",
                    url: androidurl,
                    complete: function () {
                        _this.$vux.loading.hide();
                    },
                    success: function (data, status, xhr) {
                        if (xhr.status == 200) {
                            var url = JSON.parse(data).previewUrl;
                            MXCommon.openUrlPage(url,jsSuccessCallBack => {
                                //console.log("打开附件成功")
                            });
                            setTimeout(function(){ _this.attachmentDisab = true; },1000);
                        }
                    },
                    error: function (data, status, xhr) {
                        AlertModule.show({
                            title: '',
                            content: JSON.stringify(data),
                        })
                        setTimeout(() => {
                            AlertModule.hide()
                        }, 2000)
                    }
                })
            }

            if (isiOS) {
                window.open(iosurl, "_blank");
                _this.attachmentDisab = true;
            }
        }
    },
    filters:{
        bytesToSize(bytes) {
            if(bytes === null || bytes ==="") return '';
            if (bytes === 0) return '0 B';
            var k = 1024,sizes = ['B','KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
                i = Math.floor(Math.log(bytes) / Math.log(k));
            return (bytes / Math.pow(k, i)).toFixed(1) + ' ' + sizes[i]; 
        },
    }
};
</script>
<style lang="less">
.attachmentBox{
    margin-bottom: 10px;
    background-color: #fff;
    .title{
        padding: 10px 15px;
        line-height: 20px;
        font-size: 14px;
        color: #666;
    }
}
.attachmentList{
    &:active{
        background-color: #eee;
    }
    display: flex;
    display: -webkit-flex;
    padding: 12px 15px;
    align-items: center;
    .iconfont{
        font-size: 48px;
        background: #ffffff;
        margin-right: 10px;
        line-height: 48px;
    }
    .fileTitle{
        .p1{
            line-height: 20px;
            font-size: 16px;
            color: #000;
        }
        .p2{
            line-height: 18px;
            font-size: 14px;
            color: #999;
            margin-top: 3px;
        }
    }
}

.ic-pdf-fang-fjiandan{
    color: #FF5252;
}
.ic-word-fang-f,.ic-tupian-fang-f{
    color: #2956A3;
}
.ic-excel-fang-f,.ic-txt-fang-f{
    color: #2BA245;
}
.ic-ppt-fang-fjiandan{
    color: #EF6C10;
}
.ic-wenjian-fang-f{
    color: #999;
}
</style>
