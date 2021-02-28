/* eslint-disable prettier/prettier */
import EmployeeService from '@/services/EmployeeService.js'

export default {
    namespaced: true,

    state: {
        employees: [],

        create_employee_form: {
            name: '',
            phone: '',
            address: '',
            birth: '',
            email: ''
        },

        employee: {
            id: '',
            code: '',
            name: '',
            phone: '',
            address: '',
            birth: '',
            email: ''
        },

        create_employee_body: {
            employee_name: '',
            employee_phone: '',
            employee_address: '',
            employee_date_of_birth: '',
            employee_email: ''
        },

        update_employee_body: {
            employee_code: '',
            employee_name: '',
            employee_phone: '',
            employee_address: '',
            employee_date_of_birth: '',
            employee_email: '',
            employee_password: '',
            employee_image: ''
        },
    },

    mutations: {
        SET_EMPLOYEES(state, employees) {
            state.employees = employees
        },

        SET_EMPLOYEE(state, employee) {
            state.employee = {
                id: employee.id,
                code: employee.employee_code,
                name: employee.employee_name,
                phone: employee.employee_phone,
                address: employee.employee_address,
                birth: employee.employee_date_of_birth,
                email: employee.employee_email
            }
        },

        SET_CREATE_EMPLOYEE_BODY(state, employee) {
            state.create_employee_body = {
                employee_name: employee.name,
                employee_phone: employee.phone,
                employee_address: employee.address,
                employee_date_of_birth: employee.birth,
                employee_email: employee.email
            }
        },

        SET_UPDATE_EMPLOYEE_BODY(state, employee) {
            state.update_employee_body = {
                employee_code: employee.code,
                employee_name: employee.name,
                employee_phone: employee.phone,
                employee_address: employee.address,
                employee_date_of_birth: employee.birth,
                employee_email: employee.email,
                employee_password: '',
                employee_image: ''
            }
        },

        CLEAR_CREATE_EMPLOYEE_FORM(state) {
            state.create_employee_form = {
                name: '',
                phone: '',
                address: '',
                birth: '',
                email: ''
            }
        },

        CLEAR_EMPLOYEE(state) {
            state.employee = {
                code: '',
                name: '',
                phone: '',
                address: '',
                birth: '',
                email: ''
            }
        },

        CLEAR_CREATE_EMPLOYEE_BODY(state) {
            state.create_employee_body = {
                employee_name: '',
                employee_phone: '',
                employee_address: '',
                employee_date_of_birth: '',
                employee_email: '',
                employee_password: ''
            }
        },

        CLEAR_UPDATE_EMPLOYEE_BODY(state) {
            state.update_employee_body = {
                employee_code: '',
                employee_name: '',
                employee_phone: '',
                employee_address: '',
                employee_date_of_birth: '',
                employee_email: '',
                employee_password: '',
                employee_image: ''
            }
        }
    },

    actions: {
        get_employees({
            commit
        }, employee_keyword) {
            let keyword =
                typeof employee_keyword != 'undefined' ? employee_keyword : ''

            return new Promise((resolve, reject) => {
                EmployeeService.get_employees(keyword)
                    .then(response => {
                        commit('SET_EMPLOYEES', response.data.data)

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        get_employee({
            commit
        }, employee_id) {
            return new Promise((resolve, reject) => {
                EmployeeService.get_employee(employee_id)
                    .then(response => {
                        commit('SET_EMPLOYEE', response.data.data)

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        create_employee({
            state,
            commit
        }, employee) {
            return new Promise((resolve, reject) => {
                commit('SET_CREATE_EMPLOYEE_BODY', employee)

                EmployeeService.post_employee(state.create_employee_body)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        edit_employee({
            commit
        }, employee_id) {
            return new Promise((resolve, reject) => {
                EmployeeService.get_employee_edit(employee_id)
                    .then(response => {
                        if (response.data.status === 'success') {
                            commit('SET_EMPLOYEE', response.data.data)
                        }

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        update_employee({
            state,
            commit
        }, employee) {
            return new Promise((resolve, reject) => {
                commit('SET_UPDATE_EMPLOYEE_BODY', employee)

                EmployeeService.put_employee(state.employee.id, state.update_employee_body)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        delete_employee({
            dispatch
        }, employee_id) {
            return new Promise((resolve, reject) => {
                EmployeeService.delete_employee(employee_id)
                    .then(response => {
                        dispatch('get_employees')

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    },

    getters: {
        employees: state => state.employees,

        create_employee_form: state => state.create_employee_form,

        employee: state => state.employee,

        employees_length: state => state.employees.length,
    }
}