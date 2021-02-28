<template>
  <div class="col-md-12 col-lg-12">
    <div class="card-block">
      <h3 class="card-title">Tambah Merk</h3>

      <form class="form" @submit.prevent="submit()">
        <div class="form-group row">
          <label class="col-md-3 col-form-label">Nama Merk</label>

          <div class="col-md-9">
            <input
              type="text"
              class="form-control"
              autocomplete="off"
              placeholder="Nama merk . . ."
              v-model="brand.name"
              :class="{ 'is-invalid': $v.brand.name.$error }"
              @blur="$v.brand.name.$touch()"
            />

            <template v-if="$v.brand.name.$error">
              <span
                class="help-block text-danger"
                v-if="!$v.brand.name.required"
                >Nama merk wajib diisi</span
              >
            </template>
          </div>
        </div>

        <div class="form-group row">
          <label class="col-md-3 col-form-label">Nama Produk</label>
          <div class="col-md-9">
            <select
              class="form-control form-control-md text-capitalize"
              v-model="brand.product_id"
              :class="{ 'is-invalid': $v.brand.product_id.$error }"
              @blur="$v.brand.product_id.$touch()"
            >
              <option value="" disabled>Pilih Produk . . .</option>
              <option
                v-for="product in products"
                :key="product.id"
                :value="product.id"
                >{{ product.product_code }} - {{ product.product_name }}</option
              >
            </select>

            <template v-if="$v.brand.product_id.$error">
              <span
                class="help-block text-danger"
                v-if="!$v.brand.product_id.required"
                >Nama produk wajib diisi</span
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
  name: 'CreateBrand',

  created() {
    this.get_products()
  },

  validations: {
    brand: {
      name: {
        required
      },

      product_id: {
        required
      }
    }
  },

  computed: {
    ...mapGetters('product', ['products']),
    ...mapGetters('brand', { brand: 'create_brand_form' })
  },

  methods: {
    ...mapActions('brand', ['create_brand']),
    ...mapActions('product', ['get_products']),
    ...mapMutations('brand', [
      'CLEAR_CREATE_BRAND_FORM',
      'CLEAR_CREATE_BRAND_BODY'
    ]),

    submit() {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.create_brand(this.brand)
          .then(response => {
            if (response.status === 'success') {
              this.$swal({
                icon: 'success',
                title: 'Berhasil',
                text: 'Data merk berhasil ditambahkan'
              })
            } else {
              this.$swal({
                icon: 'error',
                title: 'Gagal',
                text: 'Data merk gagal ditambahkan'
              })
            }

            this.$router.push({ name: 'brands.data' })
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  },

  destroyed() {
    this.CLEAR_CREATE_BRAND_FORM()
    this.CLEAR_CREATE_BRAND_BODY()
  }
}
</script>

<style></style>
