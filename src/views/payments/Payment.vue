<template>
  <!-- Content -->
  <div class="col-md-12 col-lg-12">
    <!-- Title Page -->
    <div class="row">
      <div class="col-lg-9 col-sm-12">
        <h3 class="card-title text-center text-md-left">Daftar Pembayaran</h3>
      </div>
      <div class="col-lg-3 col-sm-12">
        <router-link :to="{ name: 'payments.create' }">
          <button type="button" class="btn btn-sm btn-success btn-block">
            <i class="fas fa-plus fa-lg"></i> Tambah Pembayaran
          </button>
        </router-link>
      </div>
    </div>
    <!-- End Title Page -->

    <div class="card mb-4">
      <div class="card-block">
        <div class="row mb-4">
          <div class="col-md-3 offset-md-4 col-sm-12 mb-4 mb-md-0">
            <!-- <select class="form-control form-control-md">
              <option selected>Pilih Filter . . .</option>
              <option>Semua</option>
            </select> -->
          </div>

          <div class="col-md-5 col-sm-12 mb-4 mb-md-0">
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="Kata kunci . . ."
                v-model="payment_keyword"
              />
              <span class="input-group-append">
                <button class="btn btn-primary" type="button">
                  Cari Pembayaran
                </button>
              </span>
            </div>

            <small>nama pembayaran</small>
          </div>
        </div>

        <!-- Table Data -->
        <div class="table-responsive" v-if="payments_length > 0">
          <table class="table table-hover text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>Nama</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(payment, index) in payments" :key="payment.id">
                <td>{{ index + 1 }}</td>
                <td>{{ payment.payment_name }}</td>
                <td>
                  <router-link
                    :to="{
                      name: 'payments.edit',
                      params: { id: payment.id }
                    }"
                  >
                    <button
                      type="button"
                      class="btn btn-sm btn-warning mb-3 mb-md-0 mr-md-2"
                    >
                      <i class="fas fa-edit fa-lg"></i> Ubah
                    </button>
                  </router-link>

                  <button
                    type="button"
                    class="btn btn-sm btn-danger"
                    @click="remove_payment(payment.id)"
                  >
                    <i class="fas fa-trash-alt fa-lg"></i> Hapus
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-5" v-else>
          <h3 class="text-center">-- Tidak Ada Data Pembayaran --</h3>
        </div>
        <!-- End Table Data -->
      </div>
    </div>
    <!-- End Content -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'DataPayment',

  data() {
    return {
      payment_keyword: ''
    }
  },

  watch: {
    payment_keyword() {
      this.get_payments(this.payment_keyword)
    }
  },

  computed: {
    ...mapGetters('payment', ['payments', 'payments_length'])
  },

  methods: {
    ...mapActions('payment', ['get_payments', 'delete_payment']),

    remove_payment(payment_id) {
      this.$swal({
        icon: 'warning',
        title: 'Konfirmasi Hapus Data',
        text: 'Apakah yakin ingin menghapus data ini?',
        showCancelButton: true,
        cancelButtonText: 'Tidak',
        confirmButtonText: 'Ya'
      }).then(result => {
        if (result.isConfirmed) {
          this.delete_payment(payment_id)
            .then(response => {
              if (response.status === 'success') {
                this.$swal({
                  icon: 'success',
                  title: 'Berhasil',
                  text: 'Data pembayaran berhasil dihapus'
                })
              } else {
                this.$swal({
                  icon: 'error',
                  title: 'Gagal',
                  text: 'Data pembayaran gagal dihapus'
                })
              }
            })
            .catch(error => {
              console.log(error)
            })
        }
      })
    }
  }
}
</script>

<style></style>
