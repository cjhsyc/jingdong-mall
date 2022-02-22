import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//引入vuex模块
import home from './Home'
import search from './Search'
import detail from './Detail'
import cart from './Cart'

//暴露一个store类的实例对象
export default new Vuex.Store({
    modules:{
        home,search,detail,cart
    }
})