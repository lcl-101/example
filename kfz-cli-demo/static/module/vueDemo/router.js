const Index = () => import(/* webpackChunkName: "vueDemo/Index" */ './containers/index.vue');
const List = () => import(/* webpackChunkName: "vueDemo/List" */ './containers/list');

export default [
    {
        path: "/",
        title: "index",
        name: "/",
        component: Index,
        meta: {
            keepAlive: true, //此组件需要被缓存
        }
    },
    {
        path: "/index",
        title: "index",
        name: "index",
        component: Index,
        meta: {
            keepAlive: true, //此组件需要被缓存
        }
    },
    {
        path: "/List",
        title: "list",
        name: "list",
        component: List,
        meta: {
            keepAlive: true, //此组件需要被缓存
        }
    }
]