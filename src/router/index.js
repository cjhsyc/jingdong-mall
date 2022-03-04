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
    const token = store.state.user.token
    const name = store.state.user.userInfo.name
    if (token) {//已登录
        if (to.path === '/login' || to.path === '/register') {
            next('/')
        } else {
            if (name) {//有用户信息
                next()
            } else {
                store.dispatch('getUserInfo').then(res => {//获取用户信息成功
                    next()
                }).catch(err => {//token失效，获取用户信息失败
                    //清除token
                    store.dispatch('logout').then(res => {
                        next('/login')
                    })
                })
            }
        }
    } else {
        if (to.path.includes('/trade') || to.path.includes('/pay') || to.path.includes('/center')) {
            //将未登录时要去的地址存为query参数
            next(`/login?redirect=${to.path}`)
        } else {
            next()
        }
    }
})

export default router
