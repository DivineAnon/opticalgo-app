<template>
  <div class="col-md-12 col-lg-12">
    <div class="card-block">
      <h3 class="card-title">Tambah Pembayaran</h3>

      <form class="form" @submit.prevent="submit()">
        <div class="form-group row">
          <label class="col-md-3 col-form-label">Nama Pembayaran</label>
          <div class="col-md-9">
            <input
              type="text"
              class="form-control"
              autocomplete="off"
              placeholder="Nama pembayaran . . ."
              v-model="payment.name"
              :class="{ 'is-invalid': $v.payment.name.$error }"
              @blur="$v.payment.name.$touch()"
            />

            <template v-if="$v.payment.name.$error">
              <span
                class="help-block text-danger"
                v-if="!$v.payment.name.required"
                >Nama pembayaran wajib diisi</span
              >
            </template>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-lg-3 col-md-12 col-12 offset-lg-9">
            <button
              type="submit"
              class="btn btn-lg btn-block btn-success mt-3 text-white"
            >
              Tambah
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'

import { required } from 'vuelidate/lib/validators'

export default {
  name: 'CreatePayment',

  validations: {
    payment: {
      name: {
        required
      }
    }
  },

  computed: {
    ...mapGetters('payment', { payment: 'create_payment_form' })
  },

  methods: {
    ...mapActions('payment', ['create_payment']),
    ...mapMutations('payment', [
      'CLEAR_CREATE_PAYMENT_FORM',
      'CLEAR_CREATE_PAYMENT_BODY'
    ]),

    submit() {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.create_payment(this.payment)
          .then(response => {
            if (response.status === 'success') {
              this.$swal({
                icon: 'success',
                title: 'Berhasil',
                text: 'Data pembayaran berhasil ditambahkan'
              })
            } else {
              this.$swal({
                icon: 'error',
                title: 'Gagal',
                text: 'Data pembayaran gagal ditambahkan'
              })
            }

            this.$router.push({ name: 'payments.data' })
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  },

  destroyed() {
    this.CLEAR_CREATE_PAYMENT_FORM()
    this.CLEAR_CREATE_PAYMENT_BODY()
  }
}
</script>

<style></style>
