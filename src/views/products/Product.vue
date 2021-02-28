<template>
  <!-- Content -->
  <div class="col-md-12 col-lg-12">
    <!-- Title Page -->
    <div class="row">
      <div class="col-lg-9 col-sm-12">
        <h3 class="card-title text-center text-md-left">
          Daftar Produk
        </h3>
      </div>

      <div class="col-lg-3 col-sm-12">
        <router-link :to="{ name: 'products.create' }">
          <button type="button" class="btn btn-sm btn-success btn-block">
            <i class="fas fa-plus fa-lg"></i> Tambah Merk
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
                v-model="product_keyword"
              />
              <span class="input-group-append">
                <button class="btn btn-primary" type="button">
                  Cari Produk
                </button>
              </span>
            </div>
            <small>kode produk, nama produk</small>
          </div>
        </div>

        <!-- Table Data -->
        <div class="table-responsive" v-if="products_length > 0">
          <table class="table table-hover text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>Kode</th>
                <th>Nama</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(product, index) in products" :key="product.id">
                <td>{{ index + 1 }}</td>
                <td>{{ product.product_code }}</td>
                <td>{{ product.product_name }}</td>
                <td>
                  <router-link
                    :to="{
                      name: 'products.edit',
                      params: { id: product.id }
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
                    @click="remove_product(product.id)"
                  >
                    <i class="fas fa-trash-alt fa-lg"></i> Hapus
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-5" v-else>
          <h3 class="text-center">-- Tidak Ada Data Produk --</h3>
        </div>
        <!-- End Table Data -->
      </div>
    </div>
  </div>
  <!-- End Content -->
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'DataProduct',

  data() {
    return {
      product_keyword: ''
    }
  },

  watch: {
    product_keyword() {
      this.get_products(this.product_keyword)
    }
  },

  computed: {
    ...mapGetters('product', ['products', 'products_length'])
  },

  methods: {
    ...mapActions('product', ['get_products', 'delete_product']),

    remove_product(product_id) {
      this.$swal({
        icon: 'warning',
        title: 'Konfirmasi Hapus Data',
        text: 'Apakah yakin ingin menghapus data ini?',
        showCancelButton: true,
        cancelButtonText: 'Tidak',
        confirmButtonText: 'Ya'
      })
        .then(result => {
          if (result.isConfirmed) {
            this.delete_product(product_id).then(response => {
              if (response.status === 'success') {
                this.$swal({
                  icon: 'success',
                  title: 'Berhasil',
                  text: 'Data produk berhasil dihapus'
                })
              } else if (response.status === 'restricted') {
                this.$swal({
                  icon: 'error',
                  title: 'Gagal',
                  text:
                    'Data produk ini masih memiliki merk, mohon untuk menghapus data merk tersebut'
                })
              } else if (response.status === 'not found') {
                this.$swal({
                  icon: 'error',
                  title: 'Gagal',
                  text: 'Data produk ini tidak ditemukan'
                })
              } else {
                this.$swal({
                  icon: 'error',
                  title: 'Gagal',
                  text: 'Data produk gagal dihapus'
                })
              }
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style></style>
