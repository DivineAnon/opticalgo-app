/* eslint-disable prettier/prettier */
import {
    axios_service
} from '@/services/AxiosService.js'

export default {
    get_brands(brand_keyword = '') {
        return axios_service.get(`/api/brands?keyword=${brand_keyword}`)
    },

    get_brands_with_products(product = '') {
        return axios_service.get(`/api/brands?product=${product}`)
    },

    get_brand(brand_id) {
        return axios_service.get(`/api/brands/${brand_id}`)
    },

    get_brand_edit(brand_id) {
        return axios_service.get(`/api/brands/${brand_id}/edit`)
    },

    post_brand(brand_body_data) {
        return axios_service.post(`/api/brands`, brand_body_data)
    },

    put_brand(brand_id, brand_body_data) {
        return axios_service.put(`/api/brands/${brand_id}`, brand_body_data)
    },

    delete_brand(brand_id) {
        return axios_service.delete(`/api/brands/${brand_id}`)
    }
}