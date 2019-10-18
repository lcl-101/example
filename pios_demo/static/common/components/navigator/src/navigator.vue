<template>
    <div class="wrap-head-common">
        <div class="myOrder-book" @click="toIndex">
            闲置图书
        </div>
        <div class="myOrder-order" @click="toOrder" :class="{'currentOrder':index==1}">
            我的订单
        </div>
        <div class="divideOrder"></div>
        <div class="wrap-message-head">
            <div @click="toMessage" :class="{'currentMessage':index==2,'head-message':index!==2}">
            </div>
            <div class="lessThanTen" v-if="messageList&&messageList<10">{{messageList}}</div>
            <div class="moreThanTen" v-if="messageList&&messageList>10"></div>
        </div>
        <div @click="toSet" :class="{'currentSet':index==3,'head-set':index!==3}">
        </div>
    </div>
</template>

<script>
    import './navigator.css'
    export default {
        name: "navigator",
        data() {
          return {

          }
        },
        props:{
            index:{
                type:Number
            },
            messageList:{
                type:Number
            }
        },
        methods:{
            toIndex(){
                window.location.href='/view'
            },
            toMessage(){
                window.location.href='/view/message'
            },
            toSet(){
                window.location.href='/view/setting'
            },
            toOrder(){
                window.location.href='/view/order'
            }
        }
    }
</script>

<style scoped>

</style>