/* eslint-disable prettier/prettier */
import axios from 'axios'
import NProgress from 'nprogress'

export const axios_service = axios.create({
    baseURL: `http://127.0.0.1:8000`,
    withCredentials: true,
    headers: {
        'Accept': 'aplication/json',
        'Content-Type': 'application/json'
    }
})

axios_service.interceptors.request.use(
    (config) => {
        NProgress.start()

        let token = sessionStorage.getItem('user-pos-token')

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }

        return config
    },

    (error) => {
        return Promise.reject(error)
    }
)


axios_service.interceptors.response.use(response => {
    NProgress.done()

    return response
})