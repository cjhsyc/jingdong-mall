import VueRouter from "vue-router";
import routes from "@/router/routes";
import store from '@/store'//引入仓库

//重写push和replace方法
//保存原先的push和replace方法
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)//this指向$router(通过$router.push调用时)
    } else {
        originPush.call(this, location, () => {
        }, () => {
        })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)//this指向$router(通过$router.push调用时)
    } else {
        originReplace.call(this, location, () => {
        }, () => {
        })
    }
}

const router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        return {y: 0}//路由跳转，回到顶部
    }
})

//全局前置守卫
router.beforeEach((to, from, next) => {
    next()
})

export default router
