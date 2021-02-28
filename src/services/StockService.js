/* eslint-disable prettier/prettier */
import {
    axios_service
} from '@/services/AxiosService.js'

export default {
    get_stocks(stock_keyword = '') {
        return axios_service.get(`/api/stocks?keyword=${stock_keyword}`)
    },

    get_stock(stock_id) {
        return axios_service.get(`/api/stocks/${stock_id}`)
    },

    get_stock_edit(stock_id) {
        return axios_service.get(`/api/stocks/${stock_id}/edit`)
    },

    post_stock(stock_body_data) {
        return axios_service.post(`/api/stocks`, stock_body_data)
    },

    put_stock(stock_id, stock_body_data) {
        return axios_service.put(`/api/stocks/${stock_id}`, stock_body_data)
    },

    delete_stock(stock_id) {
        return axios_service.delete(`/api/stocks/${stock_id}`)
    }
}