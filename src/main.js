import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import router from './router'
import TypeNav from './components/TypeNav/TypeNav'
import store from './store'
//引入mock
import './mock/mockServe'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.component(TypeNav.name,TypeNav)

new Vue({
  render: h => h(App),
  router,//注册路由
  store,//注册仓库
}).$mount('#app')
