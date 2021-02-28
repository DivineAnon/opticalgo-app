/* eslint-disable prettier/prettier */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  mapState,
  mapGetters
} from "vuex";

// Third party library
import VueSweetAlert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import VueCurrencyFilter from 'vue-currency-filter'
import Vuelidate from 'vuelidate'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import 'nprogress/nprogress.css'

// Use the third party library
Vue.use(Vuelidate)
Vue.use(VueSweetAlert2)
Vue.use(VueCurrencyFilter, {
  symbol: 'Rp.',
  thousandsSeparator: '.',
  fractionCount: 0,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: true
})
Vue.use(DatePicker)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  computed: {
    ...mapGetters('auth', ['is_logged_in', 'logged_user']),
    ...mapState('auth', ['token']),
  },
  render: function (h) {
    return h(App)
  }
}).$mount('#app')