<template>
    <div class="go-btn" v-show="showBtn" @click="goTop">
        <div class="go-btn"></div>
    </div>
</template>

<script>
    import './goTop.css';

    export default {
        name: "goTop",
        props: {

        },
        data(){
            return {
                showBtn:false
            }
        },
        mounted(){
            this.$nextTick(function () {
                window.addEventListener('scroll', this.btnShow)
            })
        },
        methods: {
            goTop() {
                (function smoothDown() {
                    // 获取当前滚动条与窗体顶部的距离
                    let distance = document.documentElement.scrollTop || document.body.scrollTop;
                    let step = distance / 15;   // 速度不断减小
                    if (distance > 200) {
                        distance -= step > 50 ? step : 50  // 速度最小值
                        document.body.scrollTop = distance
                        document.documentElement.scrollTop = distance
                        // 设定每一次跳动的时间间隔为10ms
                        setTimeout(smoothDown, 10)
                    } else {
                        // 限制滚动停止时的距离
                        document.body.scrollTop = -200;
                        document.documentElement.scrollTop = -200;
                    }
                })()
            },
            btnShow(){
                // 获取当前滚动条与窗体顶部的距离
                let distance = document.documentElement.scrollTop || document.body.scrollTop
                if(distance > 300){
                    this.showBtn = true;
                }else{
                    this.showBtn = false;
                }
            }
        }
    }
</script>