import requests from "./requests";
import mockRequests from "./mockRequests";
//三级联动接口
///product/getBaseCategoryList get 无参
export const reqBaseCategoryList = () => requests({url: '/product/getBaseCategoryList', method: 'get'})

//首页轮播图接口
export const reqBannerList = () => mockRequests.get('/banner')