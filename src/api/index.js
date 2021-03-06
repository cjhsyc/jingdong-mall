import requests from "./requests";
import mockRequests from "./mockRequests";
//三级联动接口
///product/getBaseCategoryList get 无参
export const reqBaseCategoryList = () => requests({url: '/product/getBaseCategoryList', method: 'get'})

//首页轮播图接口
export const reqBannerList = () => mockRequests.get('/banner')
//floor数据
export const reqFloorList = () => mockRequests.get('/floor')

//搜索数据
export const reqSearchInfo = (params) => requests.post('/list', params)
//获取商品详情
export const reqGoodsInfo = (id) => requests.get(`/item/${id}`)
//将产品添加到购物车中，或者更新以添加产品数量
export const reqAddToCart = (id, num) => requests.post(`/cart/addToCart/${id}/${num}`)
//获取购物车列表数据
export const reqCartList = () => requests({url: '/cart/cartList', method: 'get'})
//删除购物车产品
export const reqDeleteCart = (id) => requests(({url: `/cart/deleteCart/${id}`, method: 'delete'}))
//修改商品选中状态
export const reqUpdateChecked = (id, ischecked) => requests({url: `/cart/checkCart/${id}/${ischecked}`, method: 'get'})
//获取登录验证码
export const reqGetCode = (phone) => requests.get(`/user/passport/sendCode/${phone}`)
//注册接口
export const reqRegister = (data) => requests.post(`/user/passport/register`, {
    phone: data.phoneNum,
    code: data.code,
    password: data.password
})
//登录接口
export const reqLogin = (data) => requests.post('/user/passport/login', data)
//获取用户信息(请求头中带上)
export const reqUserInfo = () => requests.get('/user/passport/auth/getUserInfo')
//退出登录
export const reqLogout = () => requests.get('/user/passport/logout')
//获取用户地址信息
export const reqAddress=()=> requests.get('/user/userAddress/auth/findUserAddressList')
//获取商品清单
export const reqOrderInfo=()=>requests.get('/order/auth/trade')
//提交订单
export const reqSubmitOrder=(tradeNo,data)=>requests.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`,data)
//获取订单支付信息
export const reqPayInfo=(orderId)=>requests.get(`/payment/weixin/createNative/${orderId}`)
//获取订单支付状态
export const reqPatStatus=(orderId)=>requests.get(`/payment/weixin/queryPayStatus/${orderId}`)
//获取我的订单信息
export const reqMyOrder=(page,limit)=>requests.get(`/order/auth/${page}/${limit}`)