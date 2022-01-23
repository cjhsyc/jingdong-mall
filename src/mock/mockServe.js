//引入mockjs模拟数据
import Mock from 'mockjs'
//引入json数据
import banner from './banner.json'
import floor from './floor.json'

//参数1：请求地址，参数2：请求数据
Mock.mock('mock/banner',{code:200,data:banner})
Mock.mock('mock/floor',{code:200,data:floor})