<template>
  <div>
    <Search></Search>
    <div class="demo"><i>Index</i><span class="demo1">demo1</span></div>
    <div>{{demo}}</div>
    <span class="icon iconfont iconsearch"></span>
    <div>get:</div>
    <ul>
      <li v-for="item in list" :key="item.id">{{item.name}}</li>
    </ul>
    <div>post:</div>
    <ul>
      <li v-for="item in catList" :key="item.catId">{{item.name}}</li>
    </ul>
    <router-link to="/List">toList</router-link>
  </div>
</template>
<script>
import '../css/index.css';
import { mapGetters } from 'vuex';
import { getList,getData,deleteData } from '../api/api';
import Search from 'vant/lib/search';
import 'vant/lib/search/style/less';

export default {
  name: 'Index',
  data (){
    return {
      list: '',
      catList: ''
    }
  },
  components: {
    Search
  },
  computed: {
    ...mapGetters({
      demo: 'demo'
    })
  },
  created (){
    const that = this;
    getList({
      id:1
    }).then(res => {
      if(res.status){
        that.list = res.data;
      }
    }).catch(e => {
      console.log(e);
    });

    getData({
      topCatName: '',
      secondCatName: '',
      thirdCatName: '',
      fourthCatName: '',
      auctionArea: 0,
      auctionTime: 0,
      auctionTable: 0,
      orderType: 10,
      sonLevel: 1,
      hideArea: 0,
      qian: 0,
      minMoney: 0,
      maxMoney: 0,
      pageShow: 20,
      page: 1
    }).then(res => {
      if(res.status){
        that.catList = res.data.catList;
      }
    })

    deleteData()
  },
  methods: {

  }
}
</script>
