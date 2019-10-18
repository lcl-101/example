import Vue from 'vue';
// import VueRouter from 'vue-router';
// import routes from './routes'
import store from './store';
import demo from './components';
// import FastClick from 'fastclick'
// import VueLazyload from 'vue-lazyload'

let vm = new Vue({
    el: '#app',
    store,
    render: h => h(demo)
});



