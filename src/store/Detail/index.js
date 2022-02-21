import {reqGoodsInfo} from "@/api";

const state = {
    goodsInfo: {}
}
const mutations = {
    getGoodsInfo(state, data) {
        state.goodsInfo = data
    }
}
const actions = {
    async getGoodsInfo({commit}, id) {
        const result = await reqGoodsInfo(id)
        if (result.code === 200) {
            commit('getGoodsInfo', result.data)
        }
    }
}
const getters = {
    categoryView(state) {
        return state.goodsInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.goodsInfo.skuInfo || {}
    },
    //产品的售卖属性
    spuSaleAttrList(state) {
        return state.goodsInfo.spuSaleAttrList || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}