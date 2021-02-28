<template>
  <!-- Sidebar -->
  <nav class="sidebar col-xs-12 col-sm-4 col-lg-3 col-xl-2">
    <h1 class="site-title"><a href="index.html">Opticalgo</a></h1>

    <a @click="toggle_navbar" class="btn btn-default" id="menu-toggle">
      <em class="fa fa-bars"></em>
    </a>

    <ul class="nav nav-pills flex-column sidebar-nav text-center text-md-left">
      <li class="nav-item">
        <router-link :to="{ name: 'dashboard' }" class="nav-link">
          <i class="fas fa-chart-line fa-lg"></i> Dashboard
        </router-link>
      </li>

      <li class="nav-item">
        <a @click="toggle_submenu()" class="nav-link">
          <i class="fas fa-table fa-lg"></i> Pendaftaran
          <i class="fas fa-caret-down fa-lg float-md-right"></i>
        </a>
        <ul class="list-unstyled" v-show="is_submenu_show">
          <li class="nav-item">
            <router-link
              :to="{ name: 'products.data' }"
              class="nav-link ml-md-4"
            >
              <i class="fas fa-shopping-bag fa-lg"></i> Produk
            </router-link>
          </li>

          <li class="nav-item">
            <router-link :to="{ name: 'brands.data' }" class="nav-link ml-md-4">
              <i class="fas fa-hashtag fa-lg"></i> Merk
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              :to="{ name: 'categories.data' }"
              class="nav-link ml-md-4"
            >
              <i class="fas fa-clone fa-lg"></i> Kategori
            </router-link>
          </li>

          <li class="nav-item" v-if="logged_user.role === 1">
            <router-link
              :to="{ name: 'employees.data' }"
              class="nav-link ml-md-4"
            >
              <i class="fas fa-user-clock fa-lg"></i> Karyawan
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              :to="{ name: 'payments.data' }"
              class="nav-link ml-md-4"
            >
              <i class="fas fa-money-check-alt fa-lg"></i> Pembayaran
            </router-link>
          </li>
        </ul>
      </li>

      <li class="nav-item">
        <router-link :to="{ name: 'stocks.data' }" class="nav-link">
          <i class="fas fa-layer-group fa-lg"></i> Stok
        </router-link>
      </li>

      <li class="nav-item">
        <router-link :to="{ name: 'customers.data' }" class="nav-link">
          <i class="fas fa-users fa-lg"></i> Pelanggan
        </router-link>
      </li>
    </ul>
  </nav>
  <!-- End Sidebar -->
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'SidebarComponent',

  data() {
    return {
      is_submenu_show: false
    }
  },

  computed: {
    ...mapGetters('auth', ['logged_user'])
  },

  methods: {
    ...mapActions(['change_navbar_toggle']),

    toggle_navbar() {
      this.change_navbar_toggle()
    },

    toggle_submenu() {
      this.is_submenu_show = !this.is_submenu_show
    }
  }
}
</script>

<style scoped>
.sidebar a {
  cursor: pointer;
}

.default-link {
  padding: 0;
}
</style>
