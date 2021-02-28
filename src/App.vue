<template>
  <div id="app">
    <div
      class="container-fluid"
      id="wrapper"
      :class="{ toggled: is_navbar_toggled }"
    >
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['is_navbar_toggled'])
  }
}
</script>

<style></style>
