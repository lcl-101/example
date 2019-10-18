<template>
  <div class="swiper-slide" @click="tap">
    <slot></slot>
  </div>
</template>

<script>
    export default {
        name: 'swipe-item',
        props: {
            handleClick: {
                type: Function
            }
        },
        mounted() {
            // console.log('mounted')
            // this.$parent && this.$parent.swipeItemCreated(this);
        },
        beforeUpdate() {
            // console.log('updated')
            // this.$parent && this.$parent.swipeItemUpdated(this);
        },
        methods: {
            tap: function(){
                if (this.handleClick){
                    this.handleClick()
                }
            }
        }
    }
</script>