<template>
    <div class="wrap-head-seller">
        <a href="#" onclick="javascript:window.history.back();return false;">
            <img src="../../../../common/img/nav_btn_back_n@2x.png" alt="" class="fanhui">
        </a>
        <!--<a href="#" onclick="javascript:history.back(-1);" ></a>-->
        <div class="order-huishou">旧书回收</div>
        <a href="/view/demand" class="right-top">快速卖书</a>
        <div class="more" @click="choutiState=!choutiState">
            <div class="dian"></div>
            <div  class="dian"></div>
            <div  class="dian"></div>
        </div>
        <div class="chouti" :class="{'showChouti':choutiState,'hideChouti':!choutiState}">
            <div class="chouti-first">
                <a :href="this.site.m">
                    <div class="main-kong"></div>
                </a>
                <a :href="search">
                <div class="head-search">
                </div>
                </a>
                <div class="chouti-guanbi" @click="choutiState=false"></div>
            </div>
            <ul class="wrap-list-for-chouti">
                <a :href="personal">
                    <li class="list-for-chouti">
                            <div class="personal-chouti"></div>
                            <div class="personal-chouti-word">个人中心</div>
                    </li>
                </a>
                <a :href="seller">
                <li class="list-for-chouti showBoldLine">
                        <div class="seller-chouti"></div>
                        <div class="personal-chouti-word">卖家中心</div>
                </li>
                </a>
                <a :href="paimai">
                <li class="list-for-chouti">
                        <div class="personal-chouti-word-jingpai">我的竞拍</div>
                </li>
                </a>
                <a :href="shop">
                    <li class="list-for-chouti">
                        <div class="personal-chouti-word-jingpai">书店区</div>
                    </li>
                </a>
                <a :href="zaixian">
                    <li class="list-for-chouti">
                        <div class="personal-chouti-word-jingpai">在线拍卖</div>
                    </li>
                </a>
                <a :href="huishou">
                    <li class="list-for-chouti">
                        <div class="personal-chouti-word-jingpai">旧书回收</div>
                    </li>
                </a>
            </ul>
        </div>
        <div class="mask-for-chouti" v-show="choutiState" @click="choutiState=false"></div>
    </div>
</template>

<script>
    import './head.css'
    export default {
        name: "head",
        data() {
            return{
                choutiState:false
            }
        },
        props:{
            site:Object
        },
        computed:{
            search(){
                return this.site.m+'search/'
            },
            personal(){
                return this.site.m+'m/#/user/personal/'
            },
            seller(){
                return this.site.m+'m/#/shop/seller/sellerpersonal'
            },
            paimai(){
                return this.site.m+'m/#/pm/bidding/'
            },
            shop(){
                return this.site.m+'shop/'
            },
            zaixian(){
                return this.site.mpm
            },
            huishou(){
                return this.site.shoushu+'view/'
            }//出现cn域名需要后台再加一个
        },
        methods: {
        }

    }
</script>

<style scoped>

</style>