/* eslint-disable prettier/prettier */
import {
    axios_service
} from '@/services/AxiosService.js'

export default {
    get_payments(payment_keyword = '') {
        return axios_service.get(`/api/payments?keyword=${payment_keyword}`)
    },

    get_payment(payment_id) {
        return axios_service.get(`/api/payments/${payment_id}`)
    },

    get_payment_edit(payment_id) {
        return axios_service.get(`/api/payments/${payment_id}/edit`)
    },

    post_payment(payment_body_data) {
        return axios_service.post(`/api/payments`, payment_body_data)
    },

    put_payment(payment_id, payment_body_data) {
        return axios_service.put(`/api/payments/${payment_id}`, payment_body_data)
    },

    delete_payment(payment_id) {
        return axios_service.delete(`/api/payments/${payment_id}`)
    }
}