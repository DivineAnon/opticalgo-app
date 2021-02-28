/* eslint-disable prettier/prettier */
import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import product from '@/store/modules/product.js'
import brand from '@/store/modules/brand.js'
import category from '@/store/modules/category.js'
import employee from '@/store/modules/employee.js'
import payment from '@/store/modules/payment.js'
import stock from '@/store/modules/stock.js'
import customer from '@/store/modules/customer.js'
import auth from '@/store/modules/auth.js'
import owner from '@/store/modules/owner.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    product,
    brand,
    category,
    employee,
    payment,
    stock,
    customer,
    auth,
    owner
  },

  state: {
    is_navbar_toggled: false
  },

  mutations: {
    SET_NAVBAR_TOGGLE(state) {
      state.is_navbar_toggled = !state.is_navbar_toggled
    }
  },

  actions: {
    change_navbar_toggle({
      commit
    }) {
      commit('SET_NAVBAR_TOGGLE')
    }
  },

  getters: {
    is_navbar_toggled: state => state.is_navbar_toggled
  }
})