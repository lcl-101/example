<template>
    <div class="topBar">
        <span class="top-bar-back" @click="goBack"><i></i></span>
        <h3 v-text="title"></h3>
        <span v-if="rightBtn" @click="rightBtn.func" v-text="rightBtn.name" class="right-btn"></span>
    </div>
</template>
<script>
    export default {
        name: 'TopBar',
        props: {
            title: {
                type: String,
                required: true
            },
            rightBtn: {
                type: Object
            },
            hasBackHandle: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            goBack() {
                if (this.hasBackHandle) {
                    this.$emit('goBack')
                } else {
                    if (this.$router) {
                        this.$router.go(-1)
                        return true
                    } else {
                        window.history.go(-1)
                        return true
                    }
                }
            }
        }
    }
</script>
<style scoped>
    .topBar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 0.88rem;
        line-height: 0.88rem;
        background-color: #6179a6;
        color: #fff;
        font-size: 0.34rem;
        text-align: center;
        border-bottom: 0.01rem solid #365899;
        z-index:99;
    }

    h3 {
        font-size: 0.34rem;
        line-height: 0.88rem;
    }

    .top-bar-back {
        display: inline-block;
        position: absolute;
        width: 0.44rem;
        height: 0.44rem;
        left: 0;
    }

    .top-bar-back i {
        display: block;
        width: 0.26rem;
        height: 0.26rem;
        border-bottom: 0.04rem solid #fff;
        border-left: 0.04rem solid #fff;
        position: absolute;
        left: 0.17rem;
        top: 0.3rem;
        -webkit-transform: rotate(45deg);
    }

    .right-btn {
        position: absolute;
        font-size: 0.3rem;
        display: inline-block;
        right: 0.3rem;
        top: 0;
        letter-spacing: 0.02rem;
        color: #fff;
    }
</style>