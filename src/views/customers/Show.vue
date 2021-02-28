<template>
  <div class="col-md-12 col-lg-12">
    <div class="card-block">
      <h3 class="card-title">Detail Resep Pelanggan</h3>

      <section>
        <div class="form-group row mt-5">
          <div class="col">
            <!-- customer detail section -->
            <section>
              <h5>Informasi Pelanggan</h5>

              <div class="row mt-4">
                <div class="col-6 col-md-4">
                  <p><strong>Kode Pelanggan</strong></p>
                  <p>{{ customer.code }}</p>
                </div>

                <div class="col-6 col-md-4">
                  <p><strong>Nama Pelanggan</strong></p>
                  <p>{{ customer.name }}</p>
                </div>

                <div class="col-6 col-md-4">
                  <p><strong>Nomor Telepon Pelanggan</strong></p>
                  <p>{{ customer.phone }}</p>
                </div>

                <div class="col-6 col-md-4">
                  <p><strong>Email Pelanggan</strong></p>
                  <p>{{ customer.email }}</p>
                </div>

                <div class="col col-md-6">
                  <p><strong>Alamat Pelanggan</strong></p>
                  <p>{{ customer.address }}</p>
                </div>
              </div>
            </section>
            <!-- end customer detail section -->

            <!-- right eye prescription detail section -->
            <section class="mt-5">
              <h5>Resep Mata Kanan</h5>

              <div class="row mt-4">
                <div class="col-6 col-md-4">
                  <p><strong>SPH</strong></p>
                  <p>{{ prescription.right_spherical.toFixed(2) }}</p>
                </div>

                <div class="col-6 col-md-4">
                  <p><strong>CYL</strong></p>
                  <p>{{ prescription.right_cylinder.toFixed(2) }}</p>
                </div>

                <div class="col-6 col-md-4">
                  <p><strong>ADD (Plus)</strong></p>
                  <p>{{ prescription.right_plus.toFixed(2) }}</p>
                </div>

                <div class="col-6 col-md-4">
                  <p><strong>Axis</strong></p>
                  <p>{{ prescription.right_axis.toFixed(2) }}</p>
                </div>

                <div class="col-6 col-md-4">
                  <p><strong>PD</strong></p>
                  <p>{{ prescription.right_pupil_distance }}</p>
                </div>
              </div>
            </section>
            <!-- end right eye prescription detail section -->

            <!-- left eye prescription detail section -->
            <section class="mt-5">
              <h5>Resep Mata Kiri</h5>

              <div class="row mt-4">
                <div class="col-6 col-md-4">
                  <p><strong>SPH</strong></p>
                  <p>{{ prescription.left_spherical.toFixed(2) }}</p>
                </div>

                <div class="col-6 col-md-4">
                  <p><strong>CYL</strong></p>
                  <p>{{ prescription.left_cylinder.toFixed(2) }}</p>
                </div>

                <div class="col-6 col-md-4">
                  <p><strong>ADD (Plus)</strong></p>
                  <p>{{ prescription.left_plus.toFixed(2) }}</p>
                </div>

                <div class="col-6 col-md-4">
                  <p><strong>Axis</strong></p>
                  <p>{{ prescription.left_axis.toFixed(2) }}</p>
                </div>

                <div class="col col-md-6">
                  <p><strong>PD</strong></p>
                  <p>{{ prescription.left_pupil_distance }}</p>
                </div>
              </div>
            </section>
            <!-- end left eye prescription detail section -->

            <div class="row">
              <div class="col-lg-3 col-md-12 col-12 offset-lg-9">
                <router-link :to="{ name: 'customers.data' }">
                  <button
                    type="submit"
                    class="btn btn-lg btn-block btn-success mt-3 text-white"
                  >
                    Kembali
                  </button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- end left eye prescription form section -->
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  name: 'ShowCustomer',

  created() {
    this.show_customer(this.$route.params.id)
      .then(response => {
        if (response.status === 'not found') {
          this.$swal({
            icon: 'error',
            title: 'Gagal',
            text: 'Data pelanggan ini tidak ditemukan'
          })

          this.$router.push({ name: 'customers.data' })
        }
      })
      .catch(error => {
        console.log(error)
      })
  },

  computed: {
    ...mapGetters('customer', ['customer', 'prescription'])
  },

  methods: {
    ...mapActions('customer', ['show_customer']),
    ...mapMutations('customer', ['CLEAR_CUSTOMER', 'CLEAR_PRESCRIPTION'])
  },

  destroyed() {
    this.CLEAR_CUSTOMER()
    this.CLEAR_PRESCRIPTION()
  }
}
</script>

<style></style>
