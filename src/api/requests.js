//对axios进行封装
import axios from "axios";
//引入进度条和进度条样式
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
//引入store
import store from '@/store'
//request就是axios（进行一些配置）
const requests = axios.create({
    //配置对象
    baseURL: process.env.VUE_APP_BASEURL,//基础路径，自动加在端口后
    timeout: 5000,//超时的时间
})

//请求拦截器，在请求之前可以进行一些操作
requests.interceptors.request.use((config) => {
    //config：配置对象，其中一个属性是headers（请求头）
    if (store.state.detail.uuid) {//游客临时身份
        //在请求头中添加一个字段，和后端商量好字段名
        config.headers.userTempId = store.state.detail.uuid
    }
    if (store.state.user.token) {
        config.headers.token = store.state.user.token
    }
    //进度条开始
    nprogress.start()
    return config
})

//响应拦截器，在响应之后进行一些操作
requests.interceptors.response.use((res) => {
    //成功的回调
    //进度条结束
    nprogress.done()
    return res.data//返回数据部分
}, (err) => {
    //失败的回调
    return Promise.reject(new Error('失败'))
})

export default requests