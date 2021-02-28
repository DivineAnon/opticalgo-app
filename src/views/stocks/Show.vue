<template>
  <div class="col-md-12 col-lg-12">
    <div class="card-block">
      <h3 class="card-title">Detail Stok</h3>

      <section>
        <div class="form-group row mt-5">
          <div class="col">
            <!-- brand and product detail section -->
            <section>
              <h5>Informasi Merk dan Produk</h5>

              <div class="row mt-4">
                <div class="col-6 col-md-3">
                  <p><strong>Kode Produk</strong></p>
                  <p>{{ product.code }}</p>
                </div>

                <div class="col-6 col-md-3">
                  <p><strong>Nama Produk</strong></p>
                  <p>{{ product.name }}</p>
                </div>

                <div class="col-6 col-md-3">
                  <p><strong>Nama Merk</strong></p>
                  <p>{{ brand.name }}</p>
                </div>
              </div>
            </section>
            <!-- end brand and product detail section -->

            <!-- category detail section -->
            <section class="mt-5">
              <h5>Informasi Kategori</h5>

              <div class="row mt-4">
                <div class="col-6 col-md-3">
                  <p><strong>Kode Kategori</strong></p>
                  <p>{{ category.code }}</p>
                </div>

                <div class="col-6 col-md-3">
                  <p><strong>Nama Kategori</strong></p>
                  <p>{{ category.name }}</p>
                </div>

                <div class="col-6 col-md-3">
                  <p><strong>Harga Kategori</strong></p>
                  <p>{{ category.price | currency }}</p>
                </div>

                <div class="col-6 col-md-3">
                  <p><strong>Keterangan Kategori</strong></p>
                  <p>{{ category.description }}</p>
                </div>
              </div>
            </section>
            <!-- end category detail section -->

            <!-- stock detail section -->
            <section class="mt-5">
              <h5>Informasi Stok</h5>

              <div class="row mt-4">
                <div class="col-6 col-md-3">
                  <p><strong>Kode Stok</strong></p>
                  <p>{{ stock.code }}</p>
                </div>

                <div class="col-6 col-md-3">
                  <p><strong>Tipe Stok</strong></p>
                  <p>{{ stock.type }}</p>
                </div>

                <div class="col-6 col-md-3">
                  <p><strong>Warna Stok</strong></p>
                  <p>{{ stock.color }}</p>
                </div>

                <div class="col-6 col-md-3">
                  <p><strong>Jumlah Stok</strong></p>
                  <p>{{ stock.quantity }}</p>
                </div>
              </div>
            </section>
            <!-- end stock detail section -->

            <div class="row">
              <div class="col-lg-3 col-md-12 col-12 offset-lg-9">
                <router-link :to="{ name: 'stocks.data' }">
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
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  name: 'ShowStock',

  created() {
    this.show_stock(this.$route.params.id).then(response => {
      if (response.status === 'not found') {
        this.$swal({
          icon: 'error',
          title: 'Gagal',
          text: 'Data stok ini tidak ditemukan'
        })

        this.$router.push({ name: 'stocks.data' })
      }
    })
  },

  computed: {
    ...mapGetters('product', ['product']),

    ...mapGetters('brand', ['brand']),

    ...mapGetters('category', ['category']),

    ...mapGetters('stock', ['stock'])
  },

  methods: {
    ...mapMutations('product', ['CLEAR_PRODUCT']),

    ...mapMutations('brand', ['CLEAR_BRAND']),

    ...mapMutations('category', ['CLEAR_CATEGORY']),

    ...mapActions('stock', ['show_stock']),
    ...mapMutations('stock', ['CLEAR_STOCK'])
  },

  destroyed() {
    this.CLEAR_PRODUCT()
    this.CLEAR_BRAND()
    this.CLEAR_CATEGORY()
    this.CLEAR_STOCK()
  }
}
</script>

<style></style>
