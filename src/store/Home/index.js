import {reqBannerList, reqBaseCategoryList, reqFloorList} from '@/api'

const state = {
    categoryList: [],
    bannerList: [],
    floorList: [],
}
const mutations = {
    categoryList(state, categoryList) {
        state.categoryList = categoryList
    },
    getBannerList(state, bannerList) {
        state.bannerList = bannerList
    },
    getFloorList(state, floorList) {
        state.floorList = floorList
    }
}
const actions = {
    async categoryList({commit}) {
        const result = await reqBaseCategoryList()
        if (result.code === 200) {
            commit('categoryList', result.data)
        }
    },
    async getBannerList({commit}) {
        const result = await reqBannerList()
        if (result.code === 200) {
            commit('getBannerList', result.data)
        }
    },
    async getFloorList({commit}) {
        const result = await reqFloorList()
        if (result.code === 200) {
            commit('getFloorList', result.data)
        }
    },
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}