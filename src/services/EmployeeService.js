/* eslint-disable prettier/prettier */
import {
    axios_service
} from '@/services/AxiosService.js'

export default {
    get_employees(employee_keyword = '') {
        return axios_service.get(`/api/employees?keyword=${employee_keyword}`)
    },

    get_employee(employee_id) {
        return axios_service.get(`/api/employees/${employee_id}`)
    },

    get_employee_edit(employee_id) {
        return axios_service.get(`/api/employees/${employee_id}/edit`)
    },

    post_employee(employee_body_data) {
        return axios_service.post(`/api/employees`, employee_body_data)
    },

    put_employee(employee_id, employee_body_data) {
        return axios_service.put(`/api/employees/${employee_id}`, employee_body_data)
    },

    put_employee_profile(employee_id, employee_body_data) {
        return axios_service.post(`/api/employees/${employee_id}/profile`, employee_body_data)
    },

    delete_employee(employee_id) {
        return axios_service.delete(`/api/employees/${employee_id}`)
    }
}