<template>
    <section>
        <div class="textBox">共{{DmpDocumentListCount}}个材料</div>
        <div class="materials">
            <h-doc-dell :attachmentList="attachmentList"></h-doc-dell>
        </div>
    </section>
</template>

<script>
import HDocDell from "@/pages/component/HDocDell.vue";
import HttpBusinessRequest from "@/pages/api/api.js";
export default {
    props:{
        data: {}

    },
    data(){
        return{
            Dmpid:"",
            attachmentList:"",
            DmpDocumentListCount:""
        }
    },
    components:{
        HDocDell
    },
    mounted(){
        if(this.data.Dmpid){
            this.Dmpid = this.data.Dmpid
        }else{
            this.Dmpid = this.$route.query.Dmpid;
        }
        this.getMaterials(this.Dmpid);
    },
    methods:{
        getMaterials(){
            var me = this,
            params = {
                Dmpid:this.Dmpid
            };
            let request = HttpBusinessRequest.GetDocumentList(params);
            request.complete = function() {
                //console.log("complete");
            };
            request.success = function(data, status, xhr) {
                me.DmpDocumentListCount = data.Data.DmpDocumentList.DmpDocumentListCount[0].totalnumber;
                var data = data.Data.DmpDocumentList.DmpDocumentListDetail,obj={};
                data.forEach(item => {
                    if(obj[item.BM_MaterialTypeContent]){
                        obj[item.BM_MaterialTypeContent].push({
                            docId:item.DiscussionMeeting_P_D_ID,
                            docName:item.DiscussionMeeting_P_D_Name,
                            docType:item.DocType,
                            docSize:item.DocLength,
                            docViewUrl:item.DocumentUrl,
                            docSecerit:item.DocumentSecerit,
                            docShow:item.Show
                        })
                    }else{
                        obj[item.BM_MaterialTypeContent]=[];
                        obj[item.BM_MaterialTypeContent].push({
                            docId:item.DiscussionMeeting_P_D_ID,
                            docName:item.DiscussionMeeting_P_D_Name,
                            docType:item.DocType,
                            docSize:item.DocLength,
                            docViewUrl:item.DocumentUrl,
                            docSecerit:item.DocumentSecerit,
                            docShow:item.Show
                        })
                    }
                });
                me.attachmentList = obj;

                console.log(obj, 'feng')
            };
            request.error = function(data, status, xhr) {
                // AlertModule.show({
                //     title: '',
                //     content: JSON.stringify(data),
                // })
                // setTimeout(() => {
                //     AlertModule.hide()
                // }, 2000)
            };
            // 发送请求
            request.send();
        },
    },
}
</script>
<style lang="less">
.textBox{
    padding: 10px 15px;
    line-height: 20px;
    font-size: 14px;
    color: #666;
}
</style>