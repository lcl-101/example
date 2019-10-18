<template>
    <div id="app">
        <topBar title="商品管理" :rightBtn="rightBtn"></topBar>
        <list></list>
        <button type="button" @click="openPage">加载web页面</button>
        <button type="button">打开上书编辑页面</button>
        <button type="button" @click="toAddbook('111111')">打开上书克隆页面</button>
    </div>
</template>
<script>
    import {mapState, mapGetters} from 'vuex'
    import EventBus from '../EventBus.js'
    import _ from 'lodash'
    import '../../../common/css/base.css';
    import list from './list';
    //import KfzJSBridge from '../../../common/utils/KfzJSBridge';

    export default {
        components: {
            list
        },
        data() {
            return {
                rightBtn: {
                    name: '•••',
                    func() {

                    },
                }
            }
        },
        computed: {},
        mounted() {

        },
        methods: {
            openPage(){
                KfzJSBridge.methods.loadPage({
                    "title":"标题",
                    "url":"http://neibushop.kongfz.com/seller/"
                });
                KfzJSBridge.callback.testfun = function(data){
                    console.log(data);
                }
            },
            toAddbook(itemid){
                KfzJSBridge.methods.toAddBook({
                    cmd:'clone',
                    itemId:itemid 
                })
            }
        },
        created(){

            this.$store.dispatch('getData',{id:123456});
        }
    }
</script>
