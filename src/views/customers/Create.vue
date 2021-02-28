<template>
  <div class="col-md-12 col-lg-12">
    <div class="card-block">
      <h3 class="card-title">Tambah Pelanggan dan Resep</h3>

      <form class="form" @submit.prevent="submit()">
        <!-- customer form section -->
        <section>
          <div class="form-group row mt-5">
            <div class="col">
              <h5>Tambah Pelanggan</h5>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-md-3 col-form-label">Kode Pelanggan</label>
            <div class="col-md-9">
              <input
                class="form-control"
                type="text"
                autocomplete="off"
                placeholder="Akan di generate otomatis"
                disabled
              />
              <span class="help-block">Contoh: PLG0001</span>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-md-3 col-form-label">Nama Pelanggan</label>

            <div class="col-md-9">
              <input
                type="text"
                class="form-control"
                autocomplete="off"
                placeholder="Nama pelanggan . . ."
                v-model="customer.name"
                :class="{ 'is-invalid': $v.customer.name.$error }"
                @blur="$v.customer.name.$touch()"
              />

              <template v-if="$v.customer.name.$error">
                <span
                  class="help-block text-danger"
                  v-if="!$v.customer.name.required"
                  >Nama pelanggan wajib diisi</span
                >
              </template>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-md-3 col-form-label"
              >Nomor Telepon Pelanggan</label
            >

            <div class="col-md-9">
              <input
                type="text"
                class="form-control"
                autocomplete="off"
                placeholder="Nomor telepon pelanggan . . ."
                v-model="customer.phone"
                :class="{ 'is-invalid': $v.customer.phone.$error }"
                @blur="$v.customer.phone.$touch()"
              />

              <template v-if="$v.customer.phone.$error">
                <span
                  class="help-block text-danger"
                  v-if="!$v.customer.phone.required"
                  >Nomor telepon pelanggan wajib diisi</span
                >

                <span
                  class="help-block text-danger"
                  v-if="!$v.customer.phone.numeric"
                  >Nomor telepon pelanggan harus dalam angka</span
                >
              </template>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-md-3 col-form-label">Email Pelanggan</label>

            <div class="col-md-9">
              <input
                type="text"
                class="form-control"
                autocomplete="off"
                placeholder="Email pelanggan . . ."
                v-model="customer.email"
                :class="{ 'is-invalid': $v.customer.email.$error }"
                @blur="$v.customer.email.$touch()"
              />

              <template v-if="$v.customer.email.$error">
                <span
                  class="help-block text-danger"
                  v-if="!$v.customer.email.required"
                  >Email pelanggan wajib diisi</span
                >

                <span
                  class="help-block text-danger"
                  v-if="!$v.customer.email.email"
                  >Email pelanggan harus dalam format email</span
                >
              </template>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-md-3 col-form-label">Alamat Pelanggan</label>

            <div class="col-md-9">
              <input
                type="text"
                class="form-control"
                autocomplete="off"
                placeholder="Alamat pelanggan . . ."
                v-model="customer.address"
                :class="{ 'is-invalid': $v.customer.address.$error }"
                @blur="$v.customer.address.$touch()"
              />

              <template v-if="$v.customer.address.$error">
                <span
                  class="help-block text-danger"
                  v-if="!$v.customer.address.required"
                  >Alamat pelanggan wajib diisi</span
                >
              </template>
            </div>
          </div>
        </section>
        <!-- end customer form section -->

        <div class="row">
          <!-- right eye prescription form section -->
          <section class="col-12 col-md-6">
            <div class="form-group row mt-5">
              <div class="col-12">
                <h5>Tambah Resep Mata Kanan</h5>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-md-3 col-form-label">SPH</label>

              <div class="col-md-5">
                <select
                  class="form-control form-control-md text-capitalize"
                  v-model="prescription.right_spherical"
                  :class="{
                    'is-invalid': $v.prescription.right_spherical.$error
                  }"
                  @blur="$v.prescription.right_spherical.$touch()"
                >
                  <option value="" disabled>Pilih SPH . . .</option>
                  <option
                    v-for="(spherical_value, index) in spherical_values"
                    :key="index"
                    :value="-spherical_value"
                    >-{{ spherical_value.toFixed(2) }}</option
                  >
                </select>

                <template v-if="$v.prescription.right_spherical.$error">
                  <span
                    class="help-block text-danger"
                    v-if="!$v.prescription.right_spherical.required"
                    >SPH wajib diisi</span
                  >
                </template>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-md-3 col-form-label">CYL</label>

              <div class="col-md-5">
                <select
                  class="form-control form-control-md text-capitalize"
                  v-model="prescription.right_cylinder"
                  :class="{
                    'is-invalid': $v.prescription.right_cylinder.$error
                  }"
                  @blur="$v.prescription.right_cylinder.$touch()"
                >
                  <option value="" disabled>Pilih CYL . . .</option>
                  <option
                    v-for="(cylinder_value, index) in cylinder_values"
                    :key="index"
                    :value="`-${cylinder_value}`"
                    >-{{ cylinder_value.toFixed(2) }}</option
                  >
                </select>

                <template v-if="$v.prescription.right_cylinder.$error">
                  <span
                    class="help-block text-danger"
                    v-if="!$v.prescription.right_cylinder.required"
                    >CYL wajib diisi</span
                  >
                </template>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-md-3 col-form-label">ADD (Plus)</label>

              <div class="col-md-5">
                <select
                  class="form-control form-control-md text-capitalize"
                  v-model="prescription.right_plus"
                  :class="{
                    'is-invalid': $v.prescription.right_plus.$error
                  }"
                  @blur="$v.prescription.right_plus.$touch()"
                >
                  <option value="" disabled>Pilih ADD . . .</option>
                  <option
                    v-for="(plus_value, index) in plus_values"
                    :key="index"
                    :value="`${plus_value}`"
                    >+{{ plus_value.toFixed(2) }}</option
                  >
                </select>

                <template v-if="$v.prescription.right_plus.$error">
                  <span
                    class="help-block text-danger"
                    v-if="!$v.prescription.right_plus.required"
                    >ADD wajib diisi</span
                  >
                </template>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-md-3 col-form-label">Axis</label>

              <div class="col-md-5">
                <select
                  class="form-control form-control-md text-capitalize"
                  v-model="prescription.right_axis"
                  :class="{
                    'is-invalid': $v.prescription.right_axis.$error
                  }"
                  @blur="$v.prescription.right_axis.$touch()"
                >
                  <option value="" disabled>Pilih axis . . .</option>
                  <option
                    v-for="(axis, index) in axis_values"
                    :key="index"
                    :value="`${axis}`"
                    >{{ axis }}</option
                  >
                </select>

                <template v-if="$v.prescription.right_axis.$error">
                  <span
                    class="help-block text-danger"
                    v-if="!$v.prescription.right_axis.required"
                    >Axis wajib diisi</span
                  >
                </template>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-md-3 col-form-label">PD</label>

              <div class="col-md-5">
                <input
                  type="text"
                  class="form-control"
                  autocomplete="off"
                  placeholder="PD . . ."
                  v-model="prescription.right_pupil_distance"
                  :class="{
                    'is-invalid': $v.prescription.right_pupil_distance.$error
                  }"
                  @blur="$v.prescription.right_pupil_distance.$touch()"
                />

                <template v-if="$v.prescription.right_pupil_distance.$error">
                  <span
                    class="help-block text-danger"
                    v-if="!$v.prescription.right_pupil_distance.required"
                    >PD wajib diisi</span
                  >
                </template>
              </div>
            </div>
          </section>
          <!-- end left eye prescription form section -->

          <!-- right eye prescription form section -->
          <section class="col-12 col-md-6">
            <div class="form-group row mt-5">
              <div class="col">
                <h5>Tambah Resep Mata Kiri</h5>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-md-3 col-form-label">SPH</label>

              <div class="col-md-5">
                <select
                  class="form-control form-control-md text-capitalize"
                  v-model="prescription.left_spherical"
                  :class="{
                    'is-invalid': $v.prescription.left_spherical.$error
                  }"
                  @blur="$v.prescription.left_spherical.$touch()"
                >
                  <option value="" disabled>Pilih SPH . . .</option>
                  <option
                    v-for="(spherical_value, index) in spherical_values"
                    :key="index"
                    :value="-spherical_value"
                    >-{{ spherical_value.toFixed(2) }}</option
                  >
                </select>

                <template v-if="$v.prescription.left_spherical.$error">
                  <span
                    class="help-block text-danger"
                    v-if="!$v.prescription.left_spherical.required"
                    >SPH wajib diisi</span
                  >
                </template>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-md-3 col-form-label">CYL</label>

              <div class="col-md-5">
                <select
                  class="form-control form-control-md text-capitalize"
                  v-model="prescription.left_cylinder"
                  :class="{
                    'is-invalid': $v.prescription.left_cylinder.$error
                  }"
                  @blur="$v.prescription.left_cylinder.$touch()"
                >
                  <option value="" disabled>Pilih CYL . . .</option>
                  <option
                    v-for="(cylinder_value, index) in cylinder_values"
                    :key="index"
                    :value="`-${cylinder_value}`"
                    >-{{ cylinder_value.toFixed(2) }}</option
                  >
                </select>

                <template v-if="$v.prescription.left_cylinder.$error">
                  <span
                    class="help-block text-danger"
                    v-if="!$v.prescription.left_cylinder.required"
                    >CYL wajib diisi</span
                  >
                </template>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-md-3 col-form-label">ADD (Plus)</label>

              <div class="col-md-5">
                <select
                  class="form-control form-control-md text-capitalize"
                  v-model="prescription.left_plus"
                  :class="{
                    'is-invalid': $v.prescription.left_plus.$error
                  }"
                  @blur="$v.prescription.left_plus.$touch()"
                >
                  <option value="" disabled>Pilih ADD . . .</option>
                  <option
                    v-for="(plus_value, index) in plus_values"
                    :key="index"
                    :value="`${plus_value}`"
                    >+{{ plus_value.toFixed(2) }}</option
                  >
                </select>

                <template v-if="$v.prescription.left_plus.$error">
                  <span
                    class="help-block text-danger"
                    v-if="!$v.prescription.left_plus.required"
                    >ADD wajib diisi</span
                  >
                </template>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-md-3 col-form-label">Axis</label>

              <div class="col-md-5">
                <select
                  class="form-control form-control-md text-capitalize"
                  v-model="prescription.left_axis"
                  :class="{
                    'is-invalid': $v.prescription.left_axis.$error
                  }"
                  @blur="$v.prescription.left_axis.$touch()"
                >
                  <option value="" disabled>Pilih axis . . .</option>
                  <option
                    v-for="(axis, index) in axis_values"
                    :key="index"
                    :value="`${axis}`"
                    >{{ axis }}</option
                  >
                </select>

                <template v-if="$v.prescription.left_axis.$error">
                  <span
                    class="help-block text-danger"
                    v-if="!$v.prescription.left_axis.required"
                    >Axis wajib diisi</span
                  >
                </template>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-md-3 col-form-label">PD</label>

              <div class="col-md-5">
                <input
                  type="text"
                  class="form-control"
                  autocomplete="off"
                  placeholder="Nilai PD . . ."
                  v-model="prescription.left_pupil_distance"
                  :class="{
                    'is-invalid': $v.prescription.left_pupil_distance.$error
                  }"
                  @blur="$v.prescription.left_pupil_distance.$touch()"
                />

                <template v-if="$v.prescription.left_pupil_distance.$error">
                  <span
                    class="help-block text-danger"
                    v-if="!$v.prescription.left_pupil_distance.required"
                    >PD wajib diisi</span
                  >
                </template>
              </div>
            </div>
          </section>
          <!-- end left eye prescription form section -->
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

import { required, numeric, email, decimal } from 'vuelidate/lib/validators'

export default {
  name: 'CreateBrand',

  created() {
    this.get_prescription_values(0.25, 10.0, 0.25, this.spherical_values)
    this.get_prescription_values(0.25, 600.0, 0.25, this.cylinder_values)
    this.get_prescription_values(0.25, 500.0, 0.25, this.plus_values)
    this.get_prescription_values(0.0, 180.0, 1.0, this.axis_values)
  },

  data() {
    return {
      spherical_values: [],
      cylinder_values: [],
      plus_values: [],
      axis_values: []
    }
  },

  validations: {
    customer: {
      name: {
        required
      },

      phone: {
        required,
        numeric
      },

      email: {
        required,
        email
      },

      address: {
        required
      }
    },

    prescription: {
      right_spherical: {
        required
      },

      right_cylinder: {
        required
      },

      right_plus: {
        required
      },

      right_axis: {
        required
      },

      right_pupil_distance: {
        required
      },

      left_spherical: {
        required
      },

      left_cylinder: {
        required
      },

      left_plus: {
        required
      },

      left_axis: {
        required
      },

      left_pupil_distance: {
        required,
        decimal
      }
    }
  },

  computed: {
    ...mapGetters('customer', ['customer', 'prescription'])
  },

  methods: {
    ...mapActions('customer', ['create_customer']),
    ...mapMutations('customer', [
      'CLEAR_CREATE_CUSTOMER_FORM',
      'CLEAR_CREATE_PRESCRIPTION_FORM',
      'CLEAR_CREATE_CUSTOMER_BODY'
    ]),

    get_prescription_values(
      value,
      limit_value,
      add_value,
      prescription_values_array
    ) {
      while (value <= limit_value) {
        prescription_values_array.push(value)

        value += add_value
      }
    },

    submit() {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.create_customer({
          customer: this.customer,
          prescription: this.prescription
        })
          .then(response => {
            if (response.status === 'success') {
              this.$swal({
                icon: 'success',
                title: 'Berhasil',
                text: 'Data pelanggan berhasil ditambahkan'
              })
            } else {
              this.$swal({
                icon: 'error',
                title: 'Gagal',
                text: 'Data pelanggan gagal ditambahkan'
              })
            }

            this.$router.push({ name: 'customers.data' })
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  },

  destroyed() {
    this.CLEAR_CREATE_CUSTOMER_FORM()
    this.CLEAR_CREATE_PRESCRIPTION_FORM()
    this.CLEAR_CREATE_CUSTOMER_BODY()
  }
}
</script>

<style></style>
