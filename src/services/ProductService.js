/* eslint-disable prettier/prettier */
import {
    axios_service
} from '@/services/AxiosService.js'

export default {
    get_products(product_keyword = '') {
        return axios_service.get(`/api/products?keyword=${product_keyword}`)
    },

    get_product(product_id) {
        return axios_service.get(`/api/products/${product_id}`)
    },

    get_product_edit(product_id) {
        return axios_service.get(`/api/products/${product_id}/edit`)
    },

    post_product(product_body_data) {
        return axios_service.post(`/api/products`, product_body_data)
    },

    put_product(product_id, product_body_data) {
        return axios_service.put(`/api/products/${product_id}`, product_body_data)
    },

    delete_product(product_id) {
        return axios_service.delete(`/api/products/${product_id}`)
    }
}