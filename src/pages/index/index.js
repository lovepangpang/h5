import Vue from 'vue';
import VueRouter from 'vue-router'
import App from './App';
import 'src/commons/styles/base.scss';
import initEvent from 'src/commons/utils/init.js';
import axiosServer from 'src/commons/utils/axios.js';
import { Tabbar, TabbarItem, Button, Empty, Toast, Card, Swipe, SwipeItem, Circle, NoticeBar } from 'vant';
import Index from 'src/components/Index';
import Search from 'src/components/Search';
import Friend from 'src/components/Friend';
import Setting from 'src/components/Setting';

Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Button);
Vue.use(Toast);
Vue.use(Empty);
Vue.use(Card);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Circle);
Vue.use(NoticeBar);

Vue.use(VueRouter);

Vue.config.errorHandler = function (err, vm, info) {
    console.error('【Vue报错喽errorHandler】', err, vm, info)
};
Vue.config.productionTip = process.env.NODE_ENV === 'development' ? true : false;

const routes = [
    { path: '/', redirect: '/index' },
    { path: '/index', component: Index },
    { path: '/search', component: Search },
    { path: '/friends', component: Friend },
    { path: '/setting', component: Setting }
];

Vue.prototype.$axios = axiosServer;
Vue.prototype.routeArr = routes;

const router = new VueRouter({
    routes
});

new Vue({
    el: '#app',
    router,
    mixins: [initEvent],
    render: h => h(App)
});
