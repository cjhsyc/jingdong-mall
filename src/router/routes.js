import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Search from '../pages/Search/Search'
import Register from '../pages/Register/Register'
import Detail from '../pages/Detail/Detail'

export default [
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
        path:'/search/:keyword?',
        component:Search,
        meta:{
            show:true
        },
        name:'search',
        props:true,
        /*props:($route)=>{
            return {keyword:$route.params.keyword}
        }*/
    },
    {
        path:'/register',
        component:Register,
        meta:{
            show:false
        }
    },
    {
        path:'/detail/:id',
        component:Detail
    }
]