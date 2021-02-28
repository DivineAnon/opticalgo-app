/* eslint-disable prettier/prettier */
import {
    axios_service
} from '@/services/AxiosService.js'

export default {
    get_owner(owner_id) {
        return axios_service.get(`/api/owners/${owner_id}`)
    },

    get_owner_edit(owner_id) {
        return axios_service.get(`/api/owners/${owner_id}/edit`)
    },

    put_owner(owner_id, owner_body_data) {
        return axios_service.post(`/api/owners/${owner_id}`, owner_body_data)
    }
}