import {reqAddress, reqOrderInfo} from "@/api";

const state = {
    address: [],
    orderInfo: {}
}
const mutations = {
    getAddress(state, address) {
        state.address = address
    },
    getOrderInfo(state, orderInfo) {
        state.orderInfo = orderInfo
    }
}
const actions = {
    async getAddress({commit}) {
        const result = await reqAddress()
        if (result.code === 200) {
            commit('getAddress', result.data)
        }
    },
    async getOrderInfo({commit}) {
        const result = await reqOrderInfo()
        if (result.code === 200) {
            commit('getOrderInfo', result.data)
        }
    }
}
const getters = {}

export default {
    state, mutations, actions, getters
}