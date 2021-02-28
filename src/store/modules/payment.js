/* eslint-disable prettier/prettier */
import PaymentService from '@/services/PaymentService.js'

export default {
    namespaced: true,

    state: {
        payments: [],

        create_payment_form: {
            name: ''
        },

        payment: {
            id: '',
            name: ''
        },

        create_payment_body: {
            payment_name: '',
        },

        update_payment_body: {
            payment_name: '',
        },
    },

    mutations: {
        SET_PAYMENTS(state, payments) {
            state.payments = payments
        },

        SET_PAYMENT(state, payment) {
            state.payment = {
                id: payment.id,
                name: payment.payment_name
            }
        },

        SET_CREATE_PAYMENT_BODY(state, payment) {
            state.create_payment_body = {
                payment_name: payment.name
            }
        },

        SET_UPDATE_PAYMENT_BODY(state, payment) {
            state.update_payment_body = {
                payment_name: payment.name
            }
        },

        SET_CREATE_PAYMENT_FORM(state) {
            state.create_payment_form = {
                name: ''
            }
        },

        CLEAR_CREATE_PAYMENT_FORM(state) {
            state.create_payment_form = {
                name: ''
            }
        },

        CLEAR_PAYMENT(state) {
            state.payment = {
                id: '',
                name: ''
            }
        },

        CLEAR_CREATE_PAYMENT_BODY(state) {
            state.create_payment_body = {
                payment_name: '',
            }
        },

        CLEAR_UPDATE_PAYMENT_BODY(state) {
            state.update_payment_body = {
                payment_name: '',
            }
        }
    },

    actions: {
        get_payments({
            commit
        }, payment_keyword) {
            let keyword =
                typeof payment_keyword != 'undefined' ? payment_keyword : ''

            return new Promise((resolve, reject) => {
                PaymentService.get_payments(keyword)
                    .then(response => {
                        commit('SET_PAYMENTS', response.data.data)

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        get_payment({
            commit
        }, payment_id) {
            return new Promise((resolve, reject) => {
                PaymentService.get_employee(payment_id)
                    .then(response => {
                        commit('SET_PAYMENT', response.data.data)

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        create_payment({
            state,
            commit
        }, payment) {
            return new Promise((resolve, reject) => {
                commit('SET_CREATE_PAYMENT_BODY', payment)

                PaymentService.post_payment(state.create_payment_body)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        edit_payment({
            commit
        }, payment_id) {
            return new Promise((resolve, reject) => {
                PaymentService.get_payment_edit(payment_id)
                    .then(response => {
                        if (response.data.status === 'success') {
                            commit('SET_PAYMENT', response.data.data)
                        }

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        update_payment({
            state,
            commit
        }, payment) {
            return new Promise((resolve, reject) => {
                commit('SET_UPDATE_PAYMENT_BODY', payment)

                PaymentService.put_payment(state.payment.id, state.update_payment_body)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        delete_payment({
            dispatch
        }, payment_id) {
            return new Promise((resolve, reject) => {
                PaymentService.delete_payment(payment_id)
                    .then(response => {
                        dispatch('get_payments')

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    },

    getters: {
        payments: state => state.payments,

        create_payment_form: state => state.create_payment_form,

        payment: state => state.payment,

        payments_length: state => state.payments.length,
    }
}