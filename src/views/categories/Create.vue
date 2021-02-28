<template>
  <div class="col-md-12 col-lg-12">
    <div class="card mb-4">
      <div class="card-block">
        <h3 class="card-title">Tambah Kategori</h3>

        <form class="form" @submit.prevent="submit()">
          <div class="form-group row">
            <label class="col-md-3 col-form-label">Kode Kategori</label>
            <div class="col-md-9">
              <input
                class="form-control"
                type="text"
                autocomplete="off"
                placeholder="Akan di generate otomatis"
                disabled
              />
              <span class="help-block">Contoh: KTG0001</span>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-md-3 col-form-label">Nama Kategori</label>
            <div class="col-md-9">
              <input
                type="text"
                autocomplete="off"
                class="form-control"
                placeholder="Nama kategori . . ."
                v-model="category.name"
                :class="{ 'is-invalid': $v.category.name.$error }"
                @blur="$v.category.name.$touch()"
              />

              <template v-if="$v.category.name.$error">
                <span
                  class="help-block text-danger"
                  v-if="!$v.category.name.required"
                  >Nama kategori wajib diisi</span
                >
              </template>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-md-3 col-form-label">Keterangan Kategori</label>
            <div class="col-md-9">
              <input
                type="text"
                autocomplete="off"
                class="form-control"
                placeholder="Keterangan kategori . . ."
                v-model="category.description"
                :class="{ 'is-invalid': $v.category.description.$error }"
                @blur="$v.category.description.$touch()"
              />

              <template v-if="$v.category.description.$error">
                <span
                  class="help-block text-danger"
                  v-if="!$v.category.description.required"
                  >Keterangan kategori wajib diisi</span
                >
              </template>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-md-3 col-form-label">Harga (Rp)</label>
            <div class="col-md-9">
              <input
                type="text"
                autocomplete="off"
                class="form-control"
                placeholder="Harga kategori . . ."
                v-model="category.price"
                :class="{ 'is-invalid': $v.category.price.$error }"
                @blur="$v.category.price.$touch()"
              />

              <template v-if="$v.category.price.$error">
                <span
                  class="help-block text-danger"
                  v-if="!$v.category.price.required"
                  >Harga wajib diisi</span
                >

                <span
                  class="help-block text-danger"
                  v-if="!$v.category.price.numeric"
                  >Harga harus dalam angka</span
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
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'

import { required, numeric } from 'vuelidate/lib/validators'

export default {
  name: 'CreateCategory',

  validations: {
    category: {
      name: {
        required
      },

      description: {
        required
      },

      price: {
        required,
        numeric
      }
    }
  },

  computed: {
    ...mapGetters('category', { category: 'create_category_form' })
  },

  methods: {
    ...mapActions('category', ['create_category']),
    ...mapMutations('category', [
      'CLEAR_CREATE_CATEGORY_FORM',
      'CLEAR_CREATE_CATEGORY_BODY'
    ]),

    submit() {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.create_category(this.category)
          .then(response => {
            if (response.status === 'success') {
              this.$swal({
                icon: 'success',
                title: 'Berhasil',
                text: 'Data kategori berhasil ditambahkan'
              })
            } else {
              this.$swal({
                icon: 'error',
                title: 'Gagal',
                text: 'Data kategori gagal ditambahkan'
              })
            }

            this.$router.push({ name: 'categories.data' })
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  },

  destroyed() {
    this.CLEAR_CREATE_CATEGORY_FORM()
    this.CLEAR_CREATE_CATEGORY_BODY()
  }
}
</script>

<style></style>
