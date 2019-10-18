<style src="../css/list.css"></style>
<template>
    <div class="list">
        <ul>
            <li>dfsdfsdfsdfsdfsdfsdfsd</li>
            <li>dfsdfsdfsdfsdfsdfsdfsd</li>
            <li>dfsdfsdfsdfsdfsdfsdfsd</li>
            <li>dfsdfsdfsdfsdfsdfsdfsd</li>
            <li>dfsdfsdfsdfsdfsdfsdfsd</li>
        </ul>
    </div>
</template>
<script>
    import {mapState, mapGetters,mapActions} from 'vuex'
    export default {
        name: "list",
        components: {
            
        },
        data() {
            return {
                fixedData: {
                    navClass: "",
                    subNavClass: ""
                },
                itemState:{
                    sale:[{name:'克隆',type:'clone',disabled:0},{name:'下架',type:'haltsale',disabled:0},{name:'删除',type:'delete',disabled:0},{name:'编辑',type:'edit',disabled:0}],
                    haltsale:[{name:'克隆',type:'clone',disabled:0},{name:'上架',type:'onsale',disabled:0},{name:'删除',type:'delete',disabled:0},{name:'编辑',type:'edit',disabled:0}],
                    uncertify:{
                        notCertified:[{name:'克隆',type:'clone',disabled:0},{name:'删除',type:'delete',disabled:0},{name:'编辑',type:'edit',disabled:0}],
                        failed:[{name:'复审',type:'applyApproved',disabled:0},{name:'删除',type:'delete',disabled:0},{name:'编辑',type:'edit',disabled:0}],
                        waitApproved:[{name:'克隆',type:'clone',disabled:1},{name:'删除',type:'delete',disabled:0},{name:'编辑',type:'edit',disabled:0}],
                        frozen:[{name:'克隆',type:'clone',disabled:1},{name:'删除',type:'delete',disabled:0},{name:'编辑',type:'edit',disabled:1}],
                    },
                }
            }
        },
        mounted() {
            // this.getNativeData();
        },
        computed: {
            
        },
        methods: {
           
            
        },
        created() {
           
        },

    }

</script>