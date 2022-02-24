import {reqCartList, reqDeleteCart, reqUpdateChecked} from "@/api";

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
        if (result.code === 200) {
            commit('getCartList', result.data)
        }
    },
    async deleteCart({commit}, id) {
        const result = await reqDeleteCart(id)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    async updateChecked({commit}, {id, isChecked}) {
        const result = await reqUpdateChecked(id, isChecked)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    deleteAllCheckedCart({dispatch, getters}) {
        const promiseList = []
        getters.cartList.cartInfoList.forEach((item) => {
            if (item.isChecked === 1) {
                promiseList.push(dispatch('deleteCart', item.skuId))
            }
        })
        return Promise.all(promiseList)
    },
    checkedAll({dispatch, getters}, isChecked) {
        const promiseList = []
        getters.cartList.cartInfoList.forEach((item) => {
            if (item.isChecked !== isChecked) {
                promiseList.push(dispatch('updateChecked', {id: item.skuId, isChecked}))
            }
        })
        return Promise.all(promiseList)
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