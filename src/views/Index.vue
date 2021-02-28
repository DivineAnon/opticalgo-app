<template>
  <div class="row">
    <SidebarComponent />

    <main class="col-xs-12 col-sm-8 col-lg-9 col-xl-10 pt-3 pl-4 ml-auto">
      <HeaderComponent />

      <router-view />
    </main>
  </div>
</template>

<script>
import SidebarComponent from '@/components/SidebarComponent.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'

export default {
  name: 'Index',

  components: {
    SidebarComponent,
    HeaderComponent
  }
}
</script>

<style></style>
