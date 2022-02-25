import {reqGetCode, reqLogin, reqlogout, reqRegister, reqUserInfo} from "@/api";
import getToken from "@/utils/getToken";

const state = {
    code: '',
    token: getToken(),
    userInfo: {}
}
const mutations = {
    getCode(state, code) {
        state.code = code
    },
    login(state, token) {
        state.token = token
    },
    getUserInfo(state, userInfo) {
        state.userInfo = userInfo
    },
    logout(state) {
        localStorage.removeItem('token')
        state.userInfo = {}
        state.token = ''
    }
}
const actions = {
    async getCode({commit}, phoneNum) {
        const result = await reqGetCode(phoneNum)
        if (result.code === 200) {
            commit('getCode', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    async register({commit}, data) {
        const result = await reqRegister(data)
        if (result === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    async login({commit}, data) {
        const result = await reqLogin(data)
        if (result.code === 200) {
            commit('login', result.data.token)
            localStorage.setItem('token', result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    async getUserInfo({commit}) {
        const result = await reqUserInfo()
        if (result.code === 200) {
            commit('getUserInfo', result.data)
        }
    },
    async logout({commit}) {
        const result = await reqlogout()
        if (result.code === 200) {
            commit('logout')
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    }
}
const getters = {}

export default {
    state, mutations, actions, getters
}