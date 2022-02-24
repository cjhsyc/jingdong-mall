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
export const reqDeleteCart=(id)=>requests(({url:`/cart/deleteCart/${id}`,method:'delete'}))
//修改商品选中状态
export const reqUpdateChecked=(id,ischecked)=>requests({url:`/cart/checkCart/${id}/${ischecked}`,method:'get'})