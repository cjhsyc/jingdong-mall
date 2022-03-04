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
//图片懒加载插件
import VueLazyload from 'vue-lazyload'
//引入表单验证插件
import '@/plugins/validate'
//引入element-ui
import { MessageBox } from 'element-ui';
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.component(TypeNav.name, TypeNav)
Vue.component(Pagination.name, Pagination)

Vue.use(VueLazyload,{
    //懒加载默认图片
    loading:require('@/assets/图片加载中.gif')
})

import myPlugins from "@/plugins/myPlugins";
Vue.use(myPlugins,{name:'innerText'})

new Vue({
    render: h => h(App),
    router,//注册路由
    store,//注册仓库
    beforeCreate() {
        Vue.prototype.$bus=this
        Vue.prototype.$api=api
    }
}).$mount('#app')
