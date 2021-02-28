/* eslint-disable prettier/prettier */
import CustomerService from '@/services/CustomerService.js'

export default {
    namespaced: true,

    state: {
        customers: [],

        create_customer_form: {
            name: '',
            phone: '',
            email: '',
            address: ''
        },

        create_prescription_form: {
            right_spherical: '',
            right_cylinder: '',
            right_plus: '',
            right_axis: '',
            right_pupil_distance: '',
            left_spherical: '',
            left_cylinder: '',
            left_plus: '',
            left_axis: '',
            left_pupil_distance: ''
        },

        customer: {
            id: '',
            code: '',
            name: '',
            phone: '',
            email: '',
            address: ''
        },

        prescription: {
            id: '',
            right_spherical: '',
            right_cylinder: '',
            right_plus: '',
            right_axis: '',
            right_pupil_distance: '',
            left_spherical: '',
            left_cylinder: '',
            left_plus: '',
            left_axis: '',
            left_pupil_distance: ''
        },

        create_customer_body: {
            customer_name: '',
            customer_phone: '',
            customer_email: '',
            customer_address: '',
            prescription: ''
        },

        update_customer_body: {
            id: '',
            customer_code: '',
            customer_name: '',
            customer_phone: '',
            customer_email: '',
            customer_address: '',
            prescription: ''
        },
    },

    mutations: {
        SET_CUSTOMERS(state, customers) {
            state.customers = customers
        },

        SET_CUSTOMER(state, customer) {
            state.customer = {
                id: customer.id,
                code: customer.customer_code,
                name: customer.customer_name,
                phone: customer.customer_phone,
                email: customer.customer_email,
                address: customer.customer_address
            }
        },

        SET_PRESCRIPTION(state, prescription) {
            state.prescription = {
                id: prescription.id,
                right_spherical: prescription.right_spherical,
                right_cylinder: prescription.right_cylinder,
                right_plus: prescription.right_plus,
                right_axis: prescription.right_axis,
                right_pupil_distance: prescription.right_pupil_distance,
                left_spherical: prescription.left_spherical,
                left_cylinder: prescription.left_cylinder,
                left_plus: prescription.left_plus,
                left_axis: prescription.left_axis,
                left_pupil_distance: prescription.left_pupil_distance
            }
        },

        SET_CREATE_CUSTOMER_BODY(state, {
            customer,
            prescription
        }) {
            state.create_customer_body = {
                customer_name: customer.name,
                customer_phone: customer.phone,
                customer_email: customer.email,
                customer_address: customer.address,
                prescription: prescription
            }
        },

        SET_UPDATE_CUSTOMER_BODY(state, {
            customer,
            prescription
        }) {
            state.update_customer_body = {
                id: customer.id,
                customer_code: customer.code,
                customer_name: customer.name,
                customer_phone: customer.phone,
                customer_email: customer.email,
                customer_address: customer.address,
                prescription: prescription
            }
        },

        CLEAR_CREATE_CUSTOMER_FORM(state) {
            state.create_customer_form = {
                customer_name: '',
                customer_phone: '',
                customer_email: '',
                customer_address: '',
                prescription: ''
            }
        },

        CLEAR_CREATE_PRESCRIPTION_FORM(state) {
            state.create_prescription_form = {
                right_spherical: '',
                right_cylinder: '',
                right_plus: '',
                right_axis: '',
                right_pupil_distance: '',
                left_spherical: '',
                left_cylinder: '',
                left_plus: '',
                left_axis: '',
                left_pupil_distance: ''
            }
        },

        CLEAR_CUSTOMER(state) {
            state.customer = {
                id: '',
                code: '',
                name: '',
                phone: '',
                email: '',
                address: ''
            }
        },

        CLEAR_PRESCRIPTION(state) {
            state.prescription = {
                id: '',
                right_spherical: '',
                right_cylinder: '',
                right_plus: '',
                right_axis: '',
                right_pupil_distance: '',
                left_spherical: '',
                left_cylinder: '',
                left_plus: '',
                left_axis: '',
                left_pupil_distance: ''
            }
        },

        CLEAR_CREATE_CUSTOMER_BODY(state) {
            state.create_customer_body = {
                customer_name: '',
                customer_phone: '',
                customer_email: '',
                customer_address: '',
                prescription: ''
            }
        },

        CLEAR_UPDATE_CUSTOMER_BODY(state) {
            state.update_customer_body = {
                id: '',
                customer_code: '',
                customer_name: '',
                customer_phone: '',
                customer_email: '',
                customer_address: '',
                prescription: ''
            }
        }
    },

    actions: {
        get_customers({
            commit
        }, customer_keyword) {
            let keyword =
                typeof customer_keyword != 'undefined' ? customer_keyword : ''

            return new Promise((resolve, reject) => {
                CustomerService.get_customers(keyword)
                    .then(response => {
                        commit('SET_CUSTOMERS', response.data.data)

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        show_customer({
            commit
        }, customer_id) {
            return new Promise((resolve, reject) => {
                CustomerService.get_customer(customer_id)
                    .then(response => {
                        if (response.data.status === 'success') {
                            commit('SET_CUSTOMER', response.data.data.customer)
                            commit('SET_PRESCRIPTION', response.data.data)
                        }

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        create_customer({
            state,
            commit
        }, {
            customer,
            prescription
        }) {
            return new Promise((resolve, reject) => {
                commit('SET_CREATE_CUSTOMER_BODY', {
                    customer,
                    prescription
                })

                CustomerService.post_customer(state.create_customer_body)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })

        },

        edit_customer({
            commit
        }, customer_id) {
            return new Promise((resolve, reject) => {
                CustomerService.get_customer_edit(customer_id)
                    .then(response => {
                        if (response.data.status === 'success') {
                            commit('SET_CUSTOMER', response.data.data.customer)
                            commit('SET_PRESCRIPTION', response.data.data)
                        }

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        update_customer({
            state,
            commit
        }, {
            customer,
            prescription
        }) {
            return new Promise((resolve, reject) => {
                commit('SET_UPDATE_CUSTOMER_BODY', {
                    customer,
                    prescription
                })

                CustomerService.put_customer(state.customer.id, state.update_customer_body)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        delete_customer({
            dispatch
        }, customer_id) {
            return new Promise((resolve, reject) => {
                CustomerService.delete_customer(customer_id)
                    .then(response => {
                        dispatch('get_customers')

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    },

    getters: {
        customers: state => state.customers,

        create_customer_form: state => state.create_customer_form,

        customer: state => state.customer,

        prescription: state => state.prescription,

        customers_length: state => state.customers.length,
    }
}