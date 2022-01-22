import requests from "./requests";

//三级联动接口
///product/getBaseCategoryList get 无参
export const reqBaseCategoryList=()=> requests({url:'/product/getBaseCategoryList',method:'get'})
