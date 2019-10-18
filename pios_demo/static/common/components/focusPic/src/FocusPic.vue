<template>
    <div>
        <transition name="imageview">
            <div class="focus-pic" v-show="visible" id="bigimg_main">
                <Swipe 
                    :defaultIndex="defaultIndex" 
                    :auto="0" 
                    :indicatorType="indicatorType"
                    :indicatorPosition="indicatorPosition"
                    v-if="visible"
                    @indexChanged="indexChanged"
                >
                    <SwipeItem 
                        id="dt_big_image" 
                        v-for="(item, index) of source" 
                        :handleClick="handleClose"
                    >
                        <img class="img-item" v-lazy="item" width="100%" />
                    </SwipeItem>
                </Swipe>
            </div>
        </transition>     
        <transition name="imageview">
            <div id="bg_layer" v-show="visible" @click="handleClose"></div>
        </transition>
    </div>
</template>
<script>
    import "./focusPic.css"
    import Swipe from "../../swipe"
    import SwipeItem from "../../swipe-item"

    export default {
        name: 'focus-pic',
        data() {
            return {
                'curIndex': this.defaultIndex
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
            },
            indicatorType: {
                // the value is  'point' or 'number'
                type: String,
                default: 'number'
            },
            indicatorPosition: {
                // the value is  'left' or 'right' or 'center'
                type: String,
                default: 'center'
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
            }
        }
    }
</script>