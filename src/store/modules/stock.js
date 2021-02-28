/* eslint-disable prettier/prettier */
import StockService from '@/services/StockService.js'

export default {
    namespaced: true,

    state: {
        stocks: [],

        create_stock_form: {
            type: '',
            color: '',
            quantity: '',
            brand_id: '',
            category_id: ''
        },

        stock: {
            id: '',
            code: '',
            type: '',
            color: '',
            quantity: '',
            brand_id: '',
            category_id: ''
        },

        create_stock_body: {
            stock_type: '',
            stock_color: '',
            stock_quantity: '',
            brands_id: '',
            categories_id: ''
        },

        update_stock_body: {
            stock_code: '',
            stock_type: '',
            stock_color: '',
            stock_quantity: '',
            brands_id: '',
            categories_id: ''
        },
    },

    mutations: {
        SET_STOCKS(state, stocks) {
            state.stocks = stocks
        },

        SET_STOCK(state, stock) {
            state.stock = {
                id: stock.id,
                code: stock.stock_code,
                type: stock.stock_type,
                color: stock.stock_color,
                quantity: stock.stock_quantity,
                brand_id: stock.brands_id,
                category_id: stock.categories_id
            }
        },

        SET_CREATE_STOCK_BODY(state, stock) {
            state.create_stock_body = {
                stock_type: stock.type,
                stock_color: stock.color,
                stock_quantity: stock.quantity,
                brands_id: stock.brand_id,
                categories_id: stock.category_id
            }
        },

        SET_UPDATE_STOCK_BODY(state, stock) {
            state.update_stock_body = {
                stock_code: stock.code,
                stock_type: stock.type,
                stock_color: stock.color,
                stock_quantity: stock.quantity,
                brands_id: stock.brand_id,
                categories_id: stock.category_id
            }
        },

        CLEAR_CREATE_STOCK_FORM(state) {
            state.create_stock_form = {
                type: '',
                color: '',
                quantity: '',
                brand_id: '',
                category_id: ''
            }
        },

        CLEAR_STOCK(state) {
            state.stock = {
                id: '',
                code: '',
                type: '',
                color: '',
                quantity: '',
                brand_id: '',
                category_id: ''
            }
        },

        CLEAR_CREATE_STOCK_BODY(state) {
            state.create_stock_body = {
                stock_type: '',
                stock_color: '',
                stock_quantity: '',
                stock_brand_id: '',
                stock_category_id: ''
            }
        },

        CLEAR_UPDATE_STOCK_BODY(state) {
            state.update_stock_body = {
                stock_code: '',
                stock_type: '',
                stock_color: '',
                stock_quantity: '',
                stock_brand_id: '',
                stock_category_id: ''
            }
        }
    },

    actions: {
        get_stocks({
            commit
        }, stock_keyword) {
            let keyword =
                typeof stock_keyword != 'undefined' ? stock_keyword : ''

            return new Promise((resolve, reject) => {
                StockService.get_stocks(keyword)
                    .then(response => {
                        commit('SET_STOCKS', response.data.data)

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        show_stock({
            commit,
            dispatch
        }, stock_id) {
            return new Promise((resolve, reject) => {
                StockService.get_stock(stock_id)
                    .then(response => {
                        if (response.data.status === 'success') {
                            dispatch('product/show_product', response.data.data.brand.products_id, {
                                root: true
                            })

                            dispatch('brand/show_brand', response.data.data.brands_id, {
                                root: true
                            })

                            dispatch('category/show_category', response.data.data.categories_id, {
                                root: true
                            })

                            commit('SET_STOCK', response.data.data)
                        }

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        create_stock({
            state,
            commit
        }, stock) {
            return new Promise((resolve, reject) => {
                commit('SET_CREATE_STOCK_BODY', stock)

                StockService.post_stock(state.create_stock_body)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })

        },

        edit_stock({
            commit
        }, stock_id) {
            return new Promise((resolve, reject) => {
                StockService.get_stock_edit(stock_id)
                    .then(response => {
                        if (response.data.status === 'success') {
                            commit('SET_STOCK', response.data.data)
                        }

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        update_stock({
            state,
            commit
        }, stock) {
            return new Promise((resolve, reject) => {
                commit('SET_UPDATE_STOCK_BODY', stock)

                StockService.put_stock(state.stock.id, state.update_stock_body)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        delete_stock({
            dispatch
        }, stock_id) {
            return new Promise((resolve, reject) => {
                StockService.delete_stock(stock_id)
                    .then(response => {
                        dispatch('get_stocks')

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    },

    getters: {
        stocks: state => state.stocks,

        create_stock_form: state => state.create_stock_form,

        stock: state => state.stock,

        stocks_length: state => state.stocks.length,
    }
}