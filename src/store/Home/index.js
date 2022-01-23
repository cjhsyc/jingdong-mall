import {reqBannerList, reqBaseCategoryList} from '@/api'

const state = {
    categoryList:[],
    bannerList:[]
}
const mutations = {
    categoryList(state,categoryList){
        state.categoryList=categoryList
    },
    getBannerList(state,bannerList){
        state.bannerList=bannerList
    }
}
const actions = {
    async categoryList({commit}) {
        const result = await reqBaseCategoryList()
        console.log(result)
        if (result.code===200){
            commit('categoryList',result.data)
        }
    },
    async getBannerList({commit}){
        const result = await reqBannerList()
        console.log(result)
        if (result.code===200){
            commit('getBannerList',result.data)
        }
    }
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}