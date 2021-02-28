<template>
  <div class="col-md-12 col-lg-12">
    <div class="card-block">
      <h3 class="card-title">Tambah Karyawan</h3>

      <form class="form" @submit.prevent="submit()">
        <div class="form-group row">
          <label class="col-md-3 col-form-label">Kode Karyawan</label>

          <div class="col-md-9">
            <input
              class="form-control"
              type="text"
              autocomplete="off"
              placeholder="Akan di generate otomatis"
              disabled
            />

            <span class="help-block">Contoh: KRY0001</span>
          </div>
        </div>

        <div class="form-group row">
          <label class="col-md-3 col-form-label">Nama Karyawan</label>

          <div class="col-md-9">
            <input
              type="text"
              class="form-control"
              placeholder="Nama karyawan . . ."
              autocomplete="off"
              v-model="employee.name"
              :class="{ 'is-invalid': $v.employee.name.$error }"
              @blur="$v.employee.name.$touch()"
            />

            <template v-if="$v.employee.name.$error">
              <span
                class="help-block text-danger"
                v-if="!$v.employee.name.required"
                >Nama karyawan wajib diisi</span
              >
            </template>
          </div>
        </div>

        <div class="form-group row">
          <label class="col-md-3 col-form-label">Nomor Telepon Karyawan</label>

          <div class="col-md-9">
            <input
              type="text"
              class="form-control"
              placeholder="Nomor telepon karyawan . . ."
              autocomplete="off"
              v-model="employee.phone"
              :class="{ 'is-invalid': $v.employee.phone.$error }"
              @blur="$v.employee.phone.$touch()"
            />

            <template v-if="$v.employee.phone.$error">
              <span
                class="help-block text-danger"
                v-if="!$v.employee.phone.required"
                >Nomor telepon karyawan wajib diisi</span
              >

              <span
                class="help-block text-danger"
                v-if="!$v.employee.phone.numeric"
                >Nomor telepon karyawan harus dalam angka</span
              >
            </template>
          </div>
        </div>

        <div class="form-group row">
          <label class="col-md-3 col-form-label">Alamat Karyawan</label>
          <div class="col-md-9">
            <input
              type="text"
              class="form-control"
              placeholder="Alamat karyawan . . ."
              autocomplete="off"
              v-model="employee.address"
              :class="{ 'is-invalid': $v.employee.address.$error }"
              @blur="$v.employee.address.$touch()"
            />

            <template v-if="$v.employee.address.$error">
              <span
                class="help-block text-danger"
                v-if="!$v.employee.address.required"
                >Alamat karyawan wajib diisi</span
              >
            </template>
          </div>
        </div>

        <div class="form-group row">
          <label class="col-md-3 col-form-label">Tanggal Lahir Karyawan</label>

          <div class="col-md-9">
            <div>
              <date-picker
                v-model="employee.birth"
                :class="{ 'is-invalid': $v.employee.birth.$error }"
                type="date"
                valueType="YYYY-MM-DD"
                @blur="$v.employee.birth.$touch()"
              ></date-picker>
            </div>

            <template v-if="$v.employee.birth.$error">
              <span
                class="help-block text-danger"
                v-if="!$v.employee.birth.required"
                >Tanggal lahir karyawan wajib diisi</span
              >
            </template>
          </div>
        </div>

        <div class="form-group row">
          <label class="col-md-3 col-form-label">Email Karyawan</label>

          <div class="col-md-9">
            <input
              type="text"
              class="form-control"
              placeholder="Email karyawan . . ."
              autocomplete="off"
              v-model="employee.email"
              :class="{ 'is-invalid': $v.employee.email.$error }"
              @blur="$v.employee.email.$touch()"
            />

            <template v-if="$v.employee.email.$error">
              <span
                class="help-block text-danger"
                v-if="!$v.employee.email.required"
                >Email karyawan wajib diisi</span
              >

              <span
                class="help-block text-danger"
                v-if="!$v.employee.email.email"
                >Email karyawan harus dalam format email</span
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

import { required, email, numeric } from 'vuelidate/lib/validators'

export default {
  name: 'CreateEmployee',

  validations: {
    employee: {
      name: {
        required
      },
      phone: {
        required,
        numeric
      },
      address: {
        required
      },
      birth: {
        required
      },
      email: {
        required,
        email
      }
    }
  },

  computed: {
    ...mapGetters('employee', { employee: 'create_employee_form' })
  },

  methods: {
    ...mapActions('employee', ['create_employee']),
    ...mapMutations('employee', [
      'CLEAR_CREATE_EMPLOYEE_FORM',
      'CLEAR_CREATE_EMPLOYEE_BODY'
    ]),

    submit() {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.create_employee(this.employee)
          .then(response => {
            if (response.status === 'success') {
              this.$swal({
                icon: 'success',
                title: 'Berhasil',
                text: 'Data karyawan berhasil ditambahkan'
              })
            } else {
              this.$swal({
                icon: 'error',
                title: 'Gagal',
                text: 'Data karyawan gagal ditambahkan'
              })
            }

            this.$router.push({ name: 'employees.data' })
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  },

  destroyed() {
    this.CLEAR_CREATE_EMPLOYEE_FORM()
    this.CLEAR_CREATE_EMPLOYEE_BODY()
  }
}
</script>

<style scoped>
.mx-datepicker.is-invalid {
  border: 1px solid #dc3545;
}
</style>
