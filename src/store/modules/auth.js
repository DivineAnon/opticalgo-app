/* eslint-disable prettier/prettier */
import AuthService from '@/services/AuthService.js'

export default {
    namespaced: true,

    state: {
        token: sessionStorage.getItem('user-pos-token') || null,

        logged_user: JSON.parse(sessionStorage.getItem('user-pos')) || {},

        credential: {
            email: '',
            password: ''
        },
    },

    mutations: {
        SET_CREDENTIAL(state, credential) {
            state.credential = {
                email: credential.email,
                password: credential.password
            }
        },

        SET_AUTH(state, user) {
            state.token = user.token
            state.logged_user = user

            sessionStorage.setItem('user-pos-token', user.token)
            sessionStorage.setItem('user-pos', JSON.stringify(state.logged_user))
        },

        CLEAR_AUTH(state) {
            state.logged_user = {}
            sessionStorage.removeItem('user-pos-token')
            sessionStorage.removeItem('user-pos')

            location.reload()
        },

        CLEAR_CREDENTIAL(state) {
            state.credential = {
                email: '',
                password: ''
            }
        }
    },

    actions: {
        login({
            state,
            commit,
        }, credential) {
            sessionStorage.setItem('user-pos-token', null)
            sessionStorage.setItem('user-pos', null)

            commit('SET_CREDENTIAL', credential)

            return new Promise((resolve, reject) => {
                AuthService.get_csrf_token().then(() => {
                        AuthService.post_login(state.credential)
                            .then(response => {
                                if (response.data.status === 'success') {
                                    commit('SET_AUTH', response.data.data)
                                }

                                resolve(response.data)
                            })
                            .catch(error => {
                                reject(error)
                            })
                    })
                    .catch(error => {
                        reject(error)
                    })

            })
        },

        logout({
            commit
        }) {
            commit('CLEAR_AUTH')
            commit('CLEAR_TOKEN')
        }
    },

    getters: {
        credential: state => state.credential,

        is_logged_in: state => !!state.token,

        logged_role: state => state.logged_user.role,

        logged_user: state => state.logged_user
    }
}