<template>
  <!-- Content -->
  <div class="col-md-12 col-lg-12">
    <!-- Title Page -->
    <div class="row">
      <div class="col-lg-9 col-sm-12">
        <h3 class="card-title text-center text-md-left">Daftar Karyawan</h3>
      </div>
      <div class="col-lg-3 col-sm-12">
        <router-link :to="{ name: 'employees.create' }">
          <button type="button" class="btn btn-sm btn-success btn-block">
            <i class="fas fa-plus fa-lg"></i> Tambah Pembayaran
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
                v-model="employee_keyword"
              />
              <span class="input-group-append">
                <button class="btn btn-primary" type="button">
                  Cari Karyawan
                </button>
              </span>
            </div>
          </div>
        </div>

        <!-- Table Data -->
        <div class="table-responsive" v-if="employees_length > 0">
          <table class="table table-hover text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>Kode</th>
                <th>Nama</th>
                <th>No. Telp</th>
                <th>Email</th>
                <th>Detail</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(employee, index) in employees" :key="employee.id">
                <td>{{ index + 1 }}</td>
                <td>{{ employee.employee_code }}</td>
                <td>{{ employee.employee_name }}</td>
                <td>{{ employee.employee_phone }}</td>
                <td>{{ employee.employee_email }}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-sm btn-primary"
                    @click="get_related_employee(employee.id)"
                  >
                    <i class="fas fa-eye fa-lg"></i> Lihat
                  </button>
                </td>
                <td>
                  <router-link
                    :to="{
                      name: 'employees.edit',
                      params: { id: employee.id }
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
                    @click="remove_employee(employee.id)"
                  >
                    <i class="fas fa-trash-alt fa-lg"></i> Hapus
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-5" v-else>
          <h3 class="text-center">-- Tidak Ada Data Karyawan --</h3>
        </div>
        <!-- End Table Data -->
      </div>
    </div>
    <!-- End Content -->
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'DataEmployee',

  data() {
    return {
      employee_keyword: ''
    }
  },

  watch: {
    employee_keyword() {
      this.get_employees(this.employee_keyword)
    }
  },

  computed: {
    ...mapGetters('employee', ['employees', 'employee', 'employees_length'])
  },

  methods: {
    ...mapActions('employee', [
      'get_employees',
      'get_employee',
      'delete_employee'
    ]),
    ...mapMutations('employee', ['CLEAR_EMPLOYEE']),

    get_related_employee(employee_id) {
      this.get_employee(employee_id)
        .then(response => {
          if (response.status === 'success') {
            this.$swal({
              title: 'Detail Karyawan',
              html: `
              <div class="container text-left">
                <div class="row">
                  <div class="col-5">
                    <p><strong>Kode</strong></p>
                    <p>${this.employee.code}</p>
                  </div>

                  <div class="col-7">
                    <p><strong>Email</strong></p>
                    <p>${this.employee.email}</p>
                  </div>    
                </div>

                <div class="row">
                 <div class="col-5">
                    <p><strong>Nama</strong></p>
                    <p>${this.employee.name}</p>
                  </div>

                  <div class="col-7">
                    <p><strong>Tanggal Lahir</strong></p>
                    <p>${this.employee.birth}</p>
                  </div>
                </div>

                <div class="row">
                  <div class="col-5">
                    <p><strong>Telepon</strong></p>
                    <p>${this.employee.phone}</p>
                  </div>

                  <div class="col-7">
                    <p><strong>Alamat</strong></p>
                    <p>${this.employee.address}</p>
                  </div>
                </div>
              </div>
            `
            }).then(() => this.CLEAR_EMPLOYEE())
          } else {
            this.$swal({
              icon: 'error',
              title: 'Gagal',
              text: 'Data karyawan ini tidak ditemukan'
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    },

    remove_employee(employee_id) {
      this.$swal({
        icon: 'warning',
        title: 'Konfirmasi Hapus Data',
        text: 'Apakah yakin ingin menghapus data ini?',
        showCancelButton: true,
        cancelButtonText: 'Tidak',
        confirmButtonText: 'Ya'
      }).then(result => {
        if (result.isConfirmed) {
          this.delete_employee(employee_id)
            .then(response => {
              if (response.status === 'success') {
                this.$swal({
                  icon: 'success',
                  title: 'Berhasil',
                  text: 'Data karyawan berhasil dihapus'
                })
              } else if (response.data.status === 'not found') {
                this.$swal({
                  icon: 'error',
                  title: 'Gagal',
                  text: 'Data karyawan ini tidak ditemukan'
                })
              } else {
                this.$swal({
                  icon: 'error',
                  title: 'Gagal',
                  text: 'Data karyawan gagal dihapus'
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
