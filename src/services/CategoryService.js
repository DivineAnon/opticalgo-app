/* eslint-disable prettier/prettier */
import {
    axios_service
} from '@/services/AxiosService.js'

export default {
    get_categories(category_keyword = '') {
        return axios_service.get(`/api/categories?keyword=${category_keyword}`)
    },

    get_category(category_id) {
        return axios_service.get(`/api/categories/${category_id}`)
    },

    get_category_edit(category_id) {
        return axios_service.get(`/api/categories/${category_id}/edit`)
    },

    post_category(category_body_data) {
        return axios_service.post(`/api/categories`, category_body_data)
    },

    put_category(category_id, category_body_data) {
        return axios_service.put(`/api/categories/${category_id}`, category_body_data)
    },

    delete_category(category_id) {
        return axios_service.delete(`/api/categories/${category_id}`)
    }
}