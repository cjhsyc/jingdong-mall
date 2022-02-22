import {reqCartList} from "@/api";

const state = {
    cartList: []
}

const mutations = {
    getCartList(state, cartList) {
        state.cartList = cartList
    }
}

const actions = {
    async getCartList({commit}) {
        const result = await reqCartList()
        console.log(result)
        if (result.code === 200) {
            commit('getCartList', result.data)
        }
    }
}

const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}