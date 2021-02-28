<template>
  <div class="col-md-12 col-lg-12">
    <div class="card-block">
      <h3 class="card-title">Tambah Stok</h3>

      <form class="form" @submit.prevent="submit()">
        <div class="form-group row">
          <label class="col-md-3 col-form-label">Kode Stok</label>
          <div class="col-md-9">
            <input
              class="form-control"
              type="text"
              placeholder="Akan di generate otomatis"
              disabled
            />
            <span class="help-block">Contoh: STK0001</span>
          </div>
        </div>

        <div class="form-group row">
          <label class="col-md-3 col-form-label">Tipe</label>
          <div class="col-md-9">
            <input
              type="text"
              class="form-control"
              autocomplete="off"
              placeholder="Tipe . . ."
              v-model="stock.type"
              :class="{ 'is-invalid': $v.stock.type.$error }"
              @blur="$v.stock.type.$touch()"
            />

            <template v-if="$v.stock.type.$error">
              <span
                class="help-block text-danger"
                v-if="!$v.stock.type.required"
                >Tipe wajib diisi</span
              >
            </template>
          </div>
        </div>

        <div class="form-group row">
          <label class="col-md-3 col-form-label">Warna</label>
          <div class="col-md-9">
            <input
              type="text"
              class="form-control"
              autocomplete="off"
              placeholder="Warna . . ."
              v-model="stock.color"
              :class="{ 'is-invalid': $v.stock.color.$error }"
              @blur="$v.stock.color.$touch()"
            />

            <template v-if="$v.stock.color.$error">
              <span
                class="help-block text-danger"
                v-if="!$v.stock.color.required"
                >Warna wajib diisi</span
              >
            </template>
          </div>
        </div>

        <div class="form-group row">
          <label class="col-md-3 col-form-label">Jumlah</label>
          <div class="col-md-9">
            <input
              type="text"
              class="form-control"
              autocomplete="off"
              placeholder="Jumlah . . ."
              v-model="stock.quantity"
              :class="{ 'is-invalid': $v.stock.quantity.$error }"
              @blur="$v.stock.quantity.$touch()"
            />

            <template v-if="$v.stock.quantity.$error">
              <span
                class="help-block text-danger"
                v-if="!$v.stock.quantity.required"
                >Jumlah wajib diisi</span
              >

              <span
                class="help-block text-danger"
                v-if="!$v.stock.quantity.numeric"
                >Jumlah harus dalam angka</span
              >
            </template>
          </div>
        </div>

        <div class="form-group row">
          <label class="col-md-3 col-form-label">Merk</label>
          <div class="col-md-9">
            <input
              type="text"
              class="form-control"
              autocomplete="off"
              placeholder="Merk . . ."
              v-model="selected_brand"
              :class="{ 'is-invalid': $v.stock.brand_id.$error }"
              @blur="$v.stock.brand_id.$touch()"
              disabled
            />
            <input type="hidden" v-model="stock.brand_id" />

            <template v-if="$v.stock.brand_id.$error">
              <span
                class="help-block text-danger"
                v-if="!$v.stock.brand_id.required"
              >
                Merk wajib diisi
              </span>
            </template>

            <template v-else>
              <span class="help-block text-success"
                >Pilih produk terlebih dahulu</span
              >
            </template>

            <select
              class="form-control form-control-md mt-2"
              v-model="selected_product"
              :class="{ 'is-invalid': $v.stock.brand_id.$error }"
            >
              <option value="" disabled>Pilih Produk . . .</option>
              <option
                v-for="product in products"
                :key="product.id"
                :value="product.id"
                >{{ product.product_code }} - {{ product.product_name }}</option
              >
            </select>

            <template v-if="$v.stock.brand_id.$error">
              <span
                class="help-block text-danger"
                v-if="!$v.stock.brand_id.required"
                >Pilih produk terlebih dahulu</span
              >
            </template>

            <div v-show="brand_exist">
              <div class="card mt-3 mb-4" v-if="brands_length > 0">
                <div class="card-header">
                  <p><strong>Detail Merk</strong></p>
                </div>

                <div class="card-body text-center">
                  <div class="row">
                    <div
                      class="col-md-3 col-sm-6 col-12"
                      v-for="(brand, index) in brands"
                      :key="brand.id"
                    >
                      <button
                        class="btn btn-primary"
                        type="button"
                        @click="set_brand(brand.id, brand.brand_name)"
                      >
                        <strong>Nama Merk {{ index + 1 }}</strong
                        ><br />

                        {{ brand.brand_name }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card mt-3 mb-4" v-else>
                <div class="card-body text-center">
                  <p><strong>Produk ini belum ada merk</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="form-group row">
          <label class="col-md-3 col-form-label">Kategori</label>
          <div class="col-md-9">
            <select
              class="form-control form-control-md"
              v-model="stock.category_id"
              :class="{ 'is-invalid': $v.stock.category_id.$error }"
              @blur="$v.stock.category_id.$touch()"
            >
              <option value="" disabled>Pilih Kategori . . .</option>
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
                >{{ category.category_code }} -
                {{ category.category_name }}</option
              >
            </select>

            <template v-if="$v.stock.category_id.$error">
              <span
                class="help-block text-danger"
                v-if="!$v.stock.category_id.required"
                >Kategori wajib diisi</span
              >
            </template>

            <div class="card mt-3" v-show="category_exist">
              <div class="card-header">
                <p><strong>Detail Kategori</strong></p>
              </div>

              <div class="card-body text-justify">
                <div class="row">
                  <div class="col-6">
                    <p><strong>Kode</strong></p>
                    <p>{{ category.code }}</p>
                  </div>
                  <div class="col-6">
                    <p><strong>Nama</strong></p>
                    <p>{{ category.name }}</p>
                  </div>
                </div>

                <div class="row">
                  <div class="col-6">
                    <p><strong>Harga</strong></p>
                    <p>{{ category.price | currency }}</p>
                  </div>
                  <div class="col-6">
                    <p><strong>Keterangan</strong></p>
                    <p>
                      {{ category.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
import { mapMutations, mapActions, mapGetters } from 'vuex'

import { required, numeric } from 'vuelidate/lib/validators'

export default {
  name: 'CreateStock',

  created() {
    this.get_products()
    this.get_categories()
  },

  data() {
    return {
      selected_product: '',
      selected_brand: '',
      category_exist: false,
      brand_exist: false
    }
  },

  validations: {
    stock: {
      type: {
        required
      },
      color: {
        required
      },
      quantity: {
        required,
        numeric
      },
      brand_id: {
        required
      },
      category_id: {
        required
      }
    }
  },

  watch: {
    selected_product() {
      this.show_brands_product(this.selected_product)
        .then(() => {
          this.brand_exist = true
        })
        .catch(error => {
          console.log(error)
        })
    },

    'stock.category_id'() {
      this.show_category(this.stock.category_id)
        .then(() => {
          this.category_exist = true
        })
        .catch(error => {
          console.log(error)
        })
    }
  },

  computed: {
    ...mapGetters('stock', { stock: 'create_stock_form' }),

    ...mapGetters('product', ['products']),

    ...mapGetters('category', ['categories', 'category']),

    ...mapGetters('brand', ['brands', 'brands_length'])
  },

  methods: {
    ...mapActions('stock', ['create_stock']),
    ...mapMutations('stock', [
      'CLEAR_CREATE_STOCK_FORM',
      'CLEAR_CREATE_STOCK_BODY'
    ]),

    ...mapActions('product', ['get_products']),

    ...mapActions('brand', ['show_brands_product']),

    ...mapActions('category', ['get_categories', 'show_category']),
    ...mapMutations('category', ['CLEAR_CATEGORY']),

    set_brand(selected_brand_id, brand_name) {
      this.stock.brand_id = selected_brand_id
      this.selected_brand = brand_name
    },

    submit() {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.create_stock(this.stock)
          .then(response => {
            if (response.status === 'success') {
              this.$swal({
                icon: 'success',
                title: 'Berhasil',
                text: 'Data stok berhasil ditambahkan'
              })
            } else {
              this.$swal({
                icon: 'error',
                title: 'Gagal',
                text: 'Data stok gagal ditambahkan'
              })
            }

            this.$router.push({ name: 'stocks.data' })
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  },

  destroyed() {
    this.CLEAR_CATEGORY()
    this.CLEAR_CREATE_STOCK_FORM()
    this.CLEAR_CREATE_STOCK_BODY()
  }
}
</script>

<style></style>
