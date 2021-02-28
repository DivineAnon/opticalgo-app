/* eslint-disable prettier/prettier */
import {
    axios_service
} from '@/services/AxiosService.js'

export default {
    get_customers(customer_keyword = '') {
        return axios_service.get(`/api/customers?keyword=${customer_keyword}`)
    },

    get_customer(customer_id) {
        return axios_service.get(`/api/customers/${customer_id}`)
    },

    get_customer_edit(customer_id) {
        return axios_service.get(`/api/customers/${customer_id}/edit`)
    },

    post_customer(customer_body_data) {
        return axios_service.post(`/api/customers`, customer_body_data)
    },

    put_customer(customer_id, customer_body_data) {
        return axios_service.put(`/api/customers/${customer_id}`, customer_body_data)
    },

    delete_customer(customer_id) {
        return axios_service.delete(`/api/customers/${customer_id}`)
    }
}