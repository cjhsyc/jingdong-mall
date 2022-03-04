export default [
    //重定向：项目刚开始访问/时，定向到首页
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        //路由懒加载，跳转到该路由时才加载组件
        component: () => import('@/pages/Home/Home'),
        meta: {show: true}
    },
    {
        path: '/login',
        component: () => import('@/pages/Login/Login'),
        meta: {show: false}
    },
    {
        path: '/search/:keyword?',
        component: () => import('@/pages/Search/Search'),
        meta: {show: true},
        name: 'search',
        props: true,
        /*props:($route)=>{
            return {keyword:$route.params.keyword}
        }*/
    },
    {
        path: '/register',
        component: () => import('@/pages/Register/Register'),
        meta: {show: false}
    },
    {
        path: '/detail/:id',
        component: () => import('@/pages/Detail/Detail')
    },
    {
        path: '/addCartSuccess',
        component: () => import('@/pages/AddCartSuccess/AddCartSuccess'),
        meta: {show: true}
    },
    {
        path: '/shopCart',
        component: () => import('@/pages/ShopCart/ShopCart'),
        meta: {show: true}
    },
    {
        path: '/trade',
        component: () => import('@/pages/Trade/Trade'),
        meta: {show: true},
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path === '/shopCart') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/pay',
        component: () => import('@/pages/Pay/Pay'),
        meta: {show: true},
        beforeEnter: (to, from, next) => {
            if (from.path === '/trade') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/paySuccess',
        component: () => import('@/pages/PaySuccess/PaySuccess'),
        meta: {show: true}
    },
    {
        path: '/center',
        component: () => import('@/pages/Center/Center'),
        meta: {show: true},
        children: [
            {
                path: 'myOrder',
                component: () => import('@/pages/Center/MyOrder/MyOrder')
            },
            {
                path: 'groupOrder',
                component: () => import('@/pages/Center/GroupOrder/GroupOrder')
            },
            {
                path: '/center',//重定向
                redirect: 'myOrder'
            }
        ]
    }
]