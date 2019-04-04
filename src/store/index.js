import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        token: window.localStorage.getItem('token'),
        userInfo: {}
    },
    mutations: {
        setToken (state, token) {
            state.token = token
            window.localStorage.setItem('token', token)
        },
        clearToken (state) {
            state.token = ''
            window.localStorage.setItem('token', '')
        },
        setUserInfo (state, userInfo) {
            state.userInfo = userInfo
        }
    }
})

