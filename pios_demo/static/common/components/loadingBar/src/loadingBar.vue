<template>
  <div v-show="visible">
    <div class="layer"></div>
    <div class="loading-box">
      <h2 class="title">{{title}}</h2>
      <div class="con_txt">{{text}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LoadingBar',
    data () {
      return {
        title: '温馨提示',
        text: '加载中...',
        visible: false
      }
    }
  }
</script>
<style scoped>
  .layer{
    background: rgba(0,0,0,.6);
    position: fixed;
    top: 0;right: 0;bottom: 0;left: 0;
  }
  .loading-box{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    -webkit-transform: translate(-50%, -50%);
    min-width: 200px;
    max-width: 260px;
    z-index: 999;
    background-color: #fff;
    border-radius: 2px;
  }
  .loading-box .title{
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-bottom: 1px solid #ddd;
    color: #e63b53;
  }
  .loading-box .con_txt{
    padding: 15px 10px;
    font-size: 12px;
    text-align: center;
    color: #60656f;
  }
</style>