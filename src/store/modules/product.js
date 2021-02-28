/* eslint-disable prettier/prettier */
import ProductService from '@/services/ProductService.js'

export default {
    namespaced: true,

    state: {
        products: [],

        create_product_form: {
            name: ''
        },

        product: {
            id: '',
            code: '',
            name: ''
        },

        create_product_body: {
            product_name: ''
        },

        update_product_body: {
            product_code: '',
            product_name: ''
        },
    },

    mutations: {
        SET_PRODUCTS(state, products) {
            state.products = products
        },

        SET_PRODUCT(state, product) {
            state.product = {
                id: product.id,
                code: product.product_code,
                name: product.product_name
            }
        },

        SET_CREATE_PRODUCT_BODY(state, product) {
            state.create_product_body = {
                product_name: product.name
            }
        },

        SET_UPDATE_PRODUCT_BODY(state, product) {
            state.update_product_body = {
                product_code: product.code,
                product_name: product.name
            }
        },

        CLEAR_CREATE_PRODUCT_FORM(state) {
            state.create_product_form = {
                name: ''
            }
        },

        CLEAR_PRODUCT(state) {
            state.product = {
                id: '',
                code: '',
                name: ''
            }
        },

        CLEAR_CREATE_PRODUCT_BODY(state) {
            state.create_product_body = {
                product_name: ''
            }
        },

        CLEAR_UPDATE_PRODUCT_BODY(state) {
            state.update_product_body = {
                product_code: '',
                product_name: ''
            }
        }
    },

    actions: {
        get_products({
            commit
        }, product_keyword) {
            let keyword =
                typeof product_keyword != 'undefined' ? product_keyword : ''

            return new Promise((resolve, reject) => {
                ProductService.get_products(keyword)
                    .then(response => {
                        commit('SET_PRODUCTS', response.data.data)

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        show_product({
            commit
        }, product_id) {
            return new Promise((resolve, reject) => {
                ProductService.get_product(product_id)
                    .then(response => {
                        if (response.data.status === 'success') {
                            commit('SET_PRODUCT', response.data.data)
                        }

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        create_product({
            state,
            commit
        }, product) {
            return new Promise((resolve, reject) => {
                commit('SET_CREATE_PRODUCT_BODY', product)

                ProductService.post_product(state.create_product_body)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })

        },

        edit_product({
            commit
        }, product_id) {
            return new Promise((resolve, reject) => {
                ProductService.get_product_edit(product_id)
                    .then(response => {
                        if (response.data.status === 'success') {
                            commit('SET_PRODUCT', response.data.data)
                        }

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        update_product({
            state,
            commit
        }, product) {
            return new Promise((resolve, reject) => {
                commit('SET_UPDATE_PRODUCT_BODY', product)

                ProductService.put_product(state.product.id, state.update_product_body)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        delete_product({
            dispatch
        }, product_id) {
            return new Promise((resolve, reject) => {
                ProductService.delete_product(product_id)
                    .then(response => {
                        dispatch('get_products')

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    },

    getters: {
        products: state => state.products,

        create_product_form: state => state.create_product_form,

        product: state => state.product,

        products_length: state => state.products.length,
    }
}