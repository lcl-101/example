<template>
    <!--<transition name="imageview"
        @enter="enter"
    >-->
    <div>
        <transition name="imageview">
            <div class="focus-pic" v-if="visible" id="bigimg_main">
                <Swipe 
                    :defaultIndex="defaultIndex" 
                    :auto="0" 
                    :showIndicators="!hasDesc" 
                    indicatorType="number"
                    v-if="visible"
                    @indexChanged="indexChanged"
                >
                    <SwipeItem 
                        id="dt_big_image" 
                        v-for="(item, index) of imgSource" 
                        :handleClick="handleClose"
                    >
                        <img class="img-item" v-lazy="item" width="100%" />
                    </SwipeItem>
                </Swipe>
                <div class="bigimg-desc-area" v-if="hasDesc">
                    <div class="bigimg-desc-header">
                        <span class="bigimg-desc-title" v-if="imgTitles.length" v-html="imgTitles[curIndex]"></span>
                        <span class="own-indicators">{{curIndex + 1}} / {{source.length}}</span>
                    </div>
                    <div class="bigimg-desc-sku" v-if="imgSkus.length" >{{ imgSkus[curIndex] }}</div>
                    <div class="bigimg-desc-body" v-if="imgContents.length">{{imgContents[curIndex]}}</div>
                </div>
            </div>
            
        </transition>     
        <transition name="imageview">
            <div id="bg_layer" v-show="visible" @click="handleClose"></div>
        </transition>
    </div>
    <!--</transition>-->
</template>
<script>
    import "./commentPic.css"
    import Swipe from "../../swipe"
    import SwipeItem from "../../swipe-item"

    export default {
        name: 'focus-pic',
        data() {
            return {
                'curIndex': 0
            }
        },
        components: {
            Swipe,
            SwipeItem
        },
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            defaultIndex: {
                type: Number,
                // required: true
                default: 0
            },
            source: {
                type: Array,
                // require: true
                default: function () { // 数组／对象的默认值应当由一个工厂函数返回
                    return []
                }
            },
            cbClose: {
                type: Function,
                default: function(){
                    this.visible = false;
                }
            }
        },
        computed: {
            hasDesc() {
                return !(typeof this.source[0] === 'string')
            },
            imgSource() {
                let _this = this,
                    _source = this.source,
                    _imgSource = _source            
                if(this.hasDesc){
                    _imgSource = _this.dataFormat(_source, 'imgUrl')
                }
                return _imgSource
            },
            imgTitles() {
                let _source = this.source                
                let _imgTitles = []                
                
                if(this.hasDesc){
                    _imgTitles = this.dataFormat(_source, 'descTitle')
                }

                return _imgTitles
            },
            imgContents() {
                let _source = this.source                
                let _imgContents = []                
                
                if(this.hasDesc){
                    _imgContents = this.dataFormat(_source, 'descContent')
                }

                return _imgContents
            },
            imgSkus() {
                let _source = this.source                
                let _imgSkus = []                
                
                if(this.hasDesc){
                    _imgSkus = this.dataFormat(_source, 'descSku')
                }

                return _imgSkus
            },
            canShowIndicators() {
                return this.describeTitle || this.describeConent
            }
        },
        methods: {
            handleClose (event) {
                this.visible = false;
                if(this.cbClose && typeof this.cbClose === 'function'){
                    this.cbClose() 
                }
            },
            indexChanged(index) {
                this.curIndex = index
            },
            dataFormat(source, key) {
                let _this = this,
                    _source = source,
                    data = []
                _source.forEach((item, index) => {
                    data.push(item[key])
                })
                return data
            }
        }
    }
</script>











