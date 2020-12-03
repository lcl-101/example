<template>
  <div>
    <Header></Header>
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view><!-- 这里是会被缓存的视图组件 --></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"><!-- 这里是不被缓存的视图组件 --></router-view>
  </div>
</template>
<script>
import "../../../common/css/mBase.css";
import flexible from '../../../common/utils/flexible';
import Header from '../../../common/component/header/header';
import "../../../common/font/iconfont.css";

export default {
  name: 'App',
  components: {
    Header
  },
  created(){
    flexible(750,750);
  }
}
</script>
