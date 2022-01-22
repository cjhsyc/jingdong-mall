import VueRouter from "vue-router";
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Search from '../pages/Search/Search'
import Register from '../pages/Register/Register'

//重写push和replace方法
//保存原先的push和replace方法
const originPush =VueRouter.prototype.push
const originReplace=VueRouter.prototype.replace
VueRouter.prototype.push=function (location,resolve,reject){
    if (resolve&&reject){
        originPush.call(this,location,resolve,reject)//this指向$router(通过$router.push调用时)
    }else {
        originPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace=function (location,resolve,reject){
    if (resolve&&reject){
        originReplace.call(this,location,resolve,reject)//this指向$router(通过$router.push调用时)
    }else {
        originReplace.call(this,location,()=>{},()=>{})
    }
}

export default new VueRouter({
    routes:[
        //重定向：项目刚开始访问/时，定向到首页
        {
            path:'/',
            redirect:'/home'
        },
        {
            path:'/home',
            component:Home,
            meta:{
                show:true
            }
        },
        {
            path:'/login',
            component:Login,
            meta:{
                show:false
            }
        },
        {
            path:'/search/:keyWord?',
            component:Search,
            meta:{
                show:true
            },
            name:'search',
            props:($route)=>{
                return {keyWord:$route.params.keyWord,k:$route.query.k}
            }
        },
        {
            path:'/register',
            component:Register,
            meta:{
                show:false
            }
        }
    ]
})