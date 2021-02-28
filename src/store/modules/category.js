/* eslint-disable prettier/prettier */
import CategoryService from '@/services/CategoryService.js'

export default {
    namespaced: true,

    state: {
        categories: [],

        create_category_form: {
            name: '',
            description: '',
            price: ''
        },

        category: {
            id: '',
            code: '',
            name: '',
            description: '',
            price: ''
        },

        create_category_body: {
            category_name: '',
            category_description: '',
            category_price: ''
        },

        update_category_body: {
            category_code: '',
            category_name: '',
            category_description: '',
            category_price: ''
        },
    },

    mutations: {
        SET_CATEGORIES(state, categories) {
            state.categories = categories
        },

        SET_CATEGORY(state, category) {
            state.category = {
                id: category.id,
                code: category.category_code,
                name: category.category_name,
                description: category.category_description,
                price: category.category_price
            }
        },

        SET_CREATE_CATEGORY_BODY(state, category) {
            state.create_category_body = {
                category_name: category.name,
                category_description: category.description,
                category_price: category.price
            }
        },

        SET_UPDATE_CATEGORY_BODY(state, category) {
            state.update_category_body = {
                category_code: category.code,
                category_name: category.name,
                category_description: category.description,
                category_price: category.price
            }
        },

        CLEAR_CREATE_CATEGORY_FORM(state) {
            state.create_category_form = {
                name: '',
                description: '',
                price: ''
            }
        },

        CLEAR_CATEGORY(state) {
            state.category = {
                id: '',
                code: '',
                name: '',
                description: '',
                price: ''
            }
        },

        CLEAR_CREATE_CATEGORY_BODY(state) {
            state.create_category_body = {
                category_name: '',
                category_description: '',
                category_price: ''
            }
        },

        CLEAR_UPDATE_CATEGORY_BODY(state) {
            state.update_category_body = {
                category_code: '',
                category_name: '',
                category_description: '',
                category_price: ''
            }
        }
    },

    actions: {
        get_categories({
            commit
        }, category_keyword) {
            let keyword =
                typeof category_keyword != 'undefined' ? category_keyword : ''

            return new Promise((resolve, reject) => {
                CategoryService.get_categories(keyword)
                    .then(response => {
                        commit('SET_CATEGORIES', response.data.data)

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        show_category({
            commit
        }, category_id) {
            return new Promise((resolve, reject) => {
                CategoryService.get_category(category_id)
                    .then(response => {
                        if (response.data.status === 'success') {
                            commit('SET_CATEGORY', response.data.data)
                        }

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        create_category({
            state,
            commit
        }, category) {
            return new Promise((resolve, reject) => {
                commit('SET_CREATE_CATEGORY_BODY', category)

                CategoryService.post_category(state.create_category_body)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })

        },

        edit_category({
            commit
        }, category_id) {
            return new Promise((resolve, reject) => {
                CategoryService.get_category_edit(category_id)
                    .then(response => {
                        if (response.data.status === 'success') {
                            commit('SET_CATEGORY', response.data.data)
                        }

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        update_category({
            state,
            commit
        }, category) {
            return new Promise((resolve, reject) => {
                commit('SET_UPDATE_CATEGORY_BODY', category)

                CategoryService.put_category(state.category.id, state.update_category_body)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        delete_category({
            dispatch
        }, category_id) {
            return new Promise((resolve, reject) => {
                CategoryService.delete_category(category_id)
                    .then(response => {
                        dispatch('get_categories')

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    },

    getters: {
        categories: state => state.categories,

        create_category_form: state => state.create_category_form,

        category: state => state.category,

        categories_length: state => state.categories.length,
    }
}