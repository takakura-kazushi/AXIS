<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppSidebar from './components/AppSidebar.vue'

const drawer = ref(false)
</script>

<template>
  <v-app>
    <AppHeader @toggle-drawer="drawer = !drawer" />

    <AppSidebar v-model="drawer" />

    <v-main class="bg-grey-lighten-5">
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>