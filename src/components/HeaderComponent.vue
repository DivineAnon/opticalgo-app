<template>
  <!-- Header -->
  <header class="page-header row justify-center">
    <div class="col-md-6 col-lg-8">
      <h1 class="float-left text-center text-md-left">Point of Sales</h1>
    </div>

    <div
      class="dropdown user-dropdown col-md-6 col-lg-4 text-center text-md-right"
    >
      <a
        class="btn btn-stripped dropdown-toggle"
        id="dropdownMenuLink"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <img
          v-if="logged_user.image === null"
          src="/images/default-image.jpg"
          alt="profile photo"
          class="circle float-left profile-photo"
          width="50"
          height="auto"
        />

        <img
          v-else
          :src="logged_user.image"
          alt="profile photo"
          class="circle float-left profile-photo"
          width="50"
          height="auto"
        />

        <div class="username mt-1">
          <h4 class="mb-1">{{ logged_user.name }}</h4>
          <h6 class="text-muted">
            {{ logged_user.role === 1 ? 'Pemilik' : 'Karyawan' }}
          </h6>
        </div>
      </a>

      <div
        class="dropdown-menu dropdown-menu-right text-center text-md-left"
        style="margin-right: 1.5rem;"
        aria-labelledby="dropdownMenuLink"
      >
        <router-link
          :to="{ name: 'profiles.edit', params: { id: logged_user.id } }"
          class="dropdown-item"
        >
          <i class="fa fa-user-circle mr-1"></i> Lihat Profil
        </router-link>

        <a @click.prevent="exit()" class="dropdown-item">
          <i class="fa fa-power-off mr-1"></i> Logout
        </a>
      </div>
    </div>
    <div class="clear"></div>
  </header>
  <!-- End Header -->
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'HeaderComponent',

  computed: {
    ...mapGetters('auth', ['logged_user'])
  },

  methods: {
    ...mapActions('auth', ['logout']),

    exit() {
      this.logout()
    }
  }
}
</script>

<style scoped>
a:hover {
  cursor: pointer;
}
</style>
