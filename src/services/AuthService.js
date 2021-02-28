/* eslint-disable prettier/prettier */
import {
    axios_service
} from '@/services/AxiosService.js'

export default {
    get_csrf_token() {
        return axios_service.get('/sanctum/csrf-cookie')
    },

    post_login(login_body_data) {
        return axios_service.post(`/api/login`, login_body_data)
    }
}