<template>
  <div class="header">
    <div class="header_box" :style="{ 'background-color': bgColor }">
      <span class="icon iconfont iconleft" :style="{ color: iconColor }" @click="goBack"></span>
      <span :class="{ title: showMarL }">{{ title }}</span>
      <slot></slot>
    </div>
    <div class="header_place"></div>
  </div>
</template>
<script>
import "./header.css";

export default {
  name: "Header",
  data() {
    return {
      site: this.site,
    };
  },
  props: {
    bgColor: {
      type: String,
      default: "#fff",
    },
    iconColor: {
      type: String,
      default: "#333",
    },
    title: {
      type: String,
      default: "我的交易",
    },
    showMarL: {
      type: Boolean,
      default: false,
    },
    fontColor: {
      type: String,
      default: "#262626",
    },
    goList:{
      type:Boolean,
      default:false
    },
    userType:{
      type: String,
      default: "buyer",
    }
  },
  methods:{
    goBack(){
        if(this.goList){
          if(this.userType == 'seller'){
            window.location.href = `${this.site.m}m/#/shop/seller/sellerpersonal`
          }else{
            window.location.href = `${this.site.m}personal/`
          }
        }else{
          this.$router.go(-1);//返回上一层
        }
    }
  }
};
</script>

