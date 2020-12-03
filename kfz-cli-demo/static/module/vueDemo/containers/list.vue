<template>
  <div>
    <Search></Search>
    <h1>List</h1>
    <router-link to="/">toIndex</router-link>
    <Button type="primary"  @click="showToast">主要按钮</Button>
    <Button type="info" @click="show = true">信息按钮</Button>
    <Button type="default">默认按钮</Button>
    <Button type="warning">警告按钮</Button>
    <Button type="danger">危险按钮</Button>
    <van-number-keyboard safe-area-inset-bottom :show="show" @blur="show = false" @input="onInput" @delete="onDelete"/>
  </div>
</template>
<script>
import Button from 'vant/lib/button';
import 'vant/lib/button/style/less';
import Toast from 'vant/lib/toast';
import 'vant/lib/toast/style/less';
import VanNumberKeyboard from 'vant/lib/number-keyboard';
import 'vant/lib/number-keyboard/style/less';
import Search from 'vant/lib/search';
import 'vant/lib/search/style/less';

export default {
  data (){
    return {
      show: false
    };
  },
  components: {
    Button,
    VanNumberKeyboard,
    Search
  },
  name: 'List',
  methods: {
    showToast (){
      Toast.success('成功文案');
    },
    onInput(value) {
      Toast(value);
    },
    onDelete() {
      Toast('删除');
    },
  }
}
</script>