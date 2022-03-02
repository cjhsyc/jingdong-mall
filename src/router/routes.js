import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Search from '../pages/Search/Search'
import Register from '../pages/Register/Register'
import Detail from '../pages/Detail/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess/AddCartSuccess'
import ShopCart from '@/pages/ShopCart/ShopCart'
import Trade from '@/pages/Trade/Trade'
import Pay from '@/pages/Pay/Pay'
import PaySuccess from '@/pages/PaySuccess/PaySuccess'

export default [
    //重定向：项目刚开始访问/时，定向到首页
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home,
        meta: {show: true}
    },
    {
        path: '/login',
        component: Login,
        meta: {show: false}
    },
    {
        path: '/search/:keyword?',
        component: Search,
        meta: {show: true},
        name: 'search',
        props: true,
        /*props:($route)=>{
            return {keyword:$route.params.keyword}
        }*/
    },
    {
        path: '/register',
        component: Register,
        meta: {show: false}
    },
    {
        path: '/detail/:id',
        component: Detail
    },
    {
        path: '/addCartSuccess',
        component: AddCartSuccess,
        meta: {show: true}
    },
    {
        path: '/shopCart',
        component: ShopCart,
        meta: {show: true}
    },
    {
        path: '/trade',
        component: Trade,
        meta: {show: true}
    },
    {
        path: '/pay',
        component: Pay,
        meta: {show: true}
    },
    {
        path: '/paySuccess',
        component: PaySuccess,
        meta: {show: true}
    }
]