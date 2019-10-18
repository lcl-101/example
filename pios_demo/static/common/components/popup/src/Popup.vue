<template>
    <div>
        <transition name="popup">
            <div class="zheui-popup" v-show="visible" :class="[position ? 'zheui-popup-' + position : '']">
                <slot></slot>
            </div>
        </transition>
        <transition name="layer">
            <div class="zheui-popup-layer" v-show="visible" @click="maskClickHandle"></div>
        </transition>

    </div>
</template>

<script>
    import "./popup.css";

    export default {
        name: 'popup',
        props: {
            position: {
                type: String,
                default: 'bottom'
            },
            visible: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            isNeedLayer: function(){
                let witchCanShowLayer = ["bottom"]
                return witchCanShowLayer.indexOf(this.position) > -1;
            }
        },
        methods: {
            maskClickHandle: function(){
                console.log("popup's mask is clicked")
                this.$emit('maskClickHandle')
            }
        }
    }
</script>