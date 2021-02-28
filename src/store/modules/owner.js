/* eslint-disable prettier/prettier */
import OwnerService from '@/services/OwnerService.js'

export default {
    namespaced: true,

    state: {
        owner: {
            id: '',
            name: '',
            email: '',
            image: ''
        },

        update_owner_body: {
            owner_name: '',
            owner_email: '',
            owner_password: '',
            owner_image: ''
        },
    },

    mutations: {
        SET_OWNER(state, owner) {
            state.owner = {
                id: owner.id,
                name: owner.owner_name,
                email: owner.owner_email,
                image: owner.owner_image,
            }
        },

        SET_UPDATE_OWNER_BODY(state, owner) {
            state.update_owner_body = {
                owner_name: owner.name,
                owner_email: owner.email,
                owner_password: owner.password,
                owner_image: owner.image
            }
        },

        CLEAR_OWNER(state) {
            state.owner = {
                id: '',
                name: '',
                email: '',
                image: ''
            }
        },

        CLEAR_UPDATE_OWNER_BODY(state) {
            state.update_owner_body = {
                owner_name: '',
                owner_email: '',
                owner_password: '',
                owner_image: ''
            }
        }
    },

    actions: {
        get_owner({
            commit
        }, owner_id) {
            return new Promise((resolve, reject) => {
                OwnerService.get_owner_edit(owner_id)
                    .then(response => {
                        if (response.data.status === 'success') {
                            commit('SET_OWNER', response.data.data)
                        }

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        update_owner({
            state,
            commit
        }, owner) {
            return new Promise((resolve, reject) => {
                commit('SET_UPDATE_OWNER_BODY', owner)

                OwnerService.put_owner(state.owner.id, state.update_owner_body)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

    },

    getters: {
        owner: state => state.owner
    }
}