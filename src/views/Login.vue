<template>
  <div class="container" id="wrapper">
    <div class="row justify-content-center">
      <div class="col-lg-5 col-10 mt-5">
        <div class="card">
          <div class="card-header text-center bg-primary text-white">
            <h3>Login POS</h3>
          </div>

          <div class="card-body">
            <form @submit.prevent="submit()">
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  type="text"
                  autocomplete="off"
                  class="form-control"
                  id="email"
                  placeholder="Email . . ."
                  v-model="credential.email"
                  :class="{ 'is-invalid': $v.credential.email.$error }"
                  @blur="$v.credential.email.$touch()"
                />

                <template v-if="$v.credential.email.$error">
                  <span
                    class="help-block text-danger"
                    v-if="!$v.credential.email.required"
                    >Email wajib diisi</span
                  >

                  <span
                    class="help-block text-danger"
                    v-if="!$v.credential.email.email"
                    >Email harus dalam format email</span
                  >
                </template>
              </div>

              <div class="form-group mt-4">
                <label for="password">Password</label>
                <input
                  type="password"
                  autocomplete="off"
                  class="form-control"
                  id="password"
                  placeholder="Password . . ."
                  v-model="credential.password"
                  :class="{ 'is-invalid': $v.credential.password.$error }"
                  @blur="$v.credential.password.$touch()"
                />

                <template v-if="$v.credential.password.$error">
                  <span
                    class="help-block text-danger"
                    v-if="!$v.credential.password.required"
                    >Password wajib diisi</span
                  >
                </template>
              </div>

              <div class="form-group mt-3">
                <button
                  type="submit"
                  class="btn btn-login btn-primary btn-block"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'

import { required, email } from 'vuelidate/lib/validators'

export default {
  validations: {
    credential: {
      email: {
        required,
        email
      },
      password: {
        required
      }
    }
  },

  computed: {
    ...mapGetters('auth', ['credential'])
  },

  methods: {
    ...mapActions('auth', ['login']),
    ...mapMutations('auth', ['CLEAR_CREDENTIAL']),

    submit() {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.login(this.credential).then(response => {
          if (response.status === 'not match') {
            this.$swal({
              icon: 'error',
              title: 'Gagal',
              text: 'Email atau password salah'
            })
          } else {
            this.$router.push({ name: 'dashboard' })
          }
        })
      }
    }
  },

  destroyed() {
    this.CLEAR_CREDENTIAL()
  }
}
</script>

<style></style>
