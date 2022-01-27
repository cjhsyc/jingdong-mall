import {reqSearchInfo} from "@/api";

const state={
    searchList:{}
}
const mutations={
    getSearchInfo(state,searchList){
        state.searchList=searchList
    }
}
const actions={
    async getSearchInfo({commit},params={}){
        const result=await reqSearchInfo(params)
        if (result.code===200){
            commit('getSearchInfo',result.data)
        }
    }
}
const getters={
    goodsList({searchList}){
        return searchList.goodsList
    },
    attrsList({searchList}){
        return searchList.attrsList
    },
    trademarkList({searchList}){
        return searchList.trademarkList
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}