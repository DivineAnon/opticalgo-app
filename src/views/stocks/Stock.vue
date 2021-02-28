<template>
  <!-- Content -->
  <div class="col-md-12 col-lg-12">
    <!-- Title Page -->
    <div class="row">
      <div class="col-lg-9 col-sm-12">
        <h3 class="card-title text-center text-md-left">Daftar Stok</h3>
      </div>
      <div class="col-lg-3 col-sm-12">
        <router-link :to="{ name: 'stocks.create' }">
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
                v-model="stock_keyword"
              />

              <span class="input-group-append">
                <button class="btn btn-primary" type="button">
                  Cari Stok
                </button>
              </span>
            </div>

            <small>kode stok, tipe, warna, jumlah, merk, nama kategori</small>
          </div>
        </div>

        <!-- Table Data -->
        <div class="table-responsive" v-if="stocks_length > 0">
          <table class="table table-hover text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>Kode</th>
                <th>Tipe</th>
                <th>Warna</th>
                <th>Jumlah</th>
                <th>Merk</th>
                <th>Kategori</th>
                <th>Detail</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(stock, index) in stocks" :key="stock.id">
                <td>{{ index + 1 }}</td>
                <td>{{ stock.stock_code }}</td>
                <td>{{ stock.stock_type }}</td>
                <td>{{ stock.stock_color }}</td>
                <td>{{ stock.stock_quantity }}</td>
                <td>{{ stock.brand.brand_name }}</td>
                <td>
                  {{ stock.category.category_name }}
                </td>
                <td>
                  <router-link
                    :to="{ name: 'stocks.show', params: { id: stock.id } }"
                  >
                    <button type="button" class="btn btn-sm btn-primary">
                      <i class="fas fa-eye fa-lg"></i> Lihat
                    </button>
                  </router-link>
                </td>
                <td>
                  <router-link
                    :to="{ name: 'stocks.edit', params: { id: stock.id } }"
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
                    @click="remove_stock(stock.id)"
                  >
                    <i class="fas fa-trash-alt fa-lg"></i> Hapus
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-5" v-else>
          <h3 class="text-center">-- Tidak Ada Data Stok --</h3>
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
  name: 'DataStock',

  data() {
    return {
      stock_keyword: ''
    }
  },

  watch: {
    stock_keyword() {
      this.get_stocks(this.stock_keyword)
    }
  },

  computed: {
    ...mapGetters('stock', ['stocks', 'stocks_length'])
  },

  methods: {
    ...mapActions('stock', ['get_stocks', 'delete_stock']),

    remove_stock(stock_id) {
      this.$swal({
        icon: 'warning',
        title: 'Konfirmasi Hapus Data',
        text: 'Apakah yakin ingin menghapus data ini?',
        showCancelButton: true,
        cancelButtonText: 'Tidak',
        confirmButtonText: 'Ya'
      }).then(result => {
        if (result.isConfirmed) {
          this.delete_stock(stock_id)
            .then(response => {
              if (response.status === 'success') {
                this.$swal({
                  icon: 'success',
                  title: 'Berhasil',
                  text: 'Data stok berhasil dihapus'
                })
              } else if (response.status === 'not found') {
                this.$swal({
                  icon: 'error',
                  title: 'Gagal',
                  text: 'Data stok ini tidak ditemukan'
                })
              } else {
                this.$swal({
                  icon: 'error',
                  title: 'Gagal',
                  text: 'Data stok gagal dihapus'
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
