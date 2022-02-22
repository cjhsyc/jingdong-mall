import {reqAddToCart, reqGoodsInfo} from "@/api";
import getUuid from "@/utils/getUuid";

const state = {
    goodsInfo: {},
    uuid: getUuid()
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
    },
    async addToCart({commit}, {id, num}) {//该函数返回的是promise对象
        const result = await reqAddToCart(id, num)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
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