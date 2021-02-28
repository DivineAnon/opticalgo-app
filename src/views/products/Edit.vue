<template>
  <div class="col-md-12 col-lg-12">
    <div class="card-block">
      <h3 class="card-title">Ubah Produk</h3>

      <form class="form" @submit.prevent="submit()">
        <div class="form-group row">
          <label class="col-md-3 col-form-label">Kode Produk</label>
          <div class="col-md-9">
            <input
              class="form-control"
              type="text"
              v-model="product.code"
              disabled
            />
          </div>
        </div>

        <div class="form-group row">
          <label class="col-md-3 col-form-label">Nama Produk</label>
          <div class="col-md-9">
            <input
              type="text"
              class="form-control"
              placeholder="Nama jenis produk . . ."
              v-model="product.name"
              :class="{ 'is-invalid': $v.product.name.$error }"
              @blur="$v.product.name.$touch()"
            />

            <template v-if="$v.product.name.$error">
              <span
                class="help-block text-danger"
                v-if="!$v.product.name.required"
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
              Ubah
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
  name: 'EditProduct',

  created() {
    this.edit_product(this.$route.params.id)
      .then(response => {
        if (response.status === 'not found') {
          this.$swal({
            icon: 'error',
            title: 'Gagal',
            text: 'Data produk ini tidak ditemukan'
          })

          this.$router.push({ name: 'products.data' })
        }
      })
      .catch(error => {
        console.log(error)
      })
  },

  validations: {
    product: {
      name: {
        required
      }
    }
  },

  computed: {
    ...mapGetters('product', ['product'])
  },

  methods: {
    ...mapActions('product', ['edit_product', 'update_product']),
    ...mapMutations('product', ['CLEAR_PRODUCT', 'CLEAR_UPDATE_PRODUCT_BODY']),

    submit() {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.update_product(this.product)
          .then(response => {
            if (response.status === 'success') {
              this.$swal({
                icon: 'success',
                title: 'Berhasil',
                text: 'Data produk berhasil diubah'
              })

              this.$router.push({ name: 'products.data' })
            } else {
              this.$swal({
                icon: 'error',
                title: 'Gagal',
                text: 'Data produk gagal diubah'
              })
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  },

  destroyed() {
    this.CLEAR_PRODUCT()
    this.CLEAR_UPDATE_PRODUCT_BODY()
  }
}
</script>

<style></style>
