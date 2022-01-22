import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import router from './router'
import TypeNav from './components/TypeNav/TypeNav'
import {reqBaseCategoryList} from './api'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.component(TypeNav.name,TypeNav)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
