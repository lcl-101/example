import Vue from "vue";
import VueRouter from "vue-router";
import App from "./containers/app.vue";
import Router from "./router";
import store from "./store/store";

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

// 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
    routes: Router
})

let vm = new Vue({
    store,
    router,
    el: "#app",
    render: h => h(App)
})