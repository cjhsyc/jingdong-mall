import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import router from './router'
import store from './store'
import TypeNav from './components/TypeNav/TypeNav'
import Pagination from './components/Pagination/Pagination'
//引入mock
import './mock/mockServe'
//统一引入api文件中的请求函数
import * as api from '@/api'
//引入element-ui
import { MessageBox } from 'element-ui';
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.component(TypeNav.name, TypeNav)
Vue.component(Pagination.name, Pagination)

new Vue({
    render: h => h(App),
    router,//注册路由
    store,//注册仓库
    beforeCreate() {
        Vue.prototype.$bus=this
        Vue.prototype.$api=api
    }
}).$mount('#app')
