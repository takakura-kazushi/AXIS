<script setup lang="ts">
const emit = defineEmits(['toggleDrawer'])
</script>

<template>
  <v-app-bar elevation="1">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="emit('toggleDrawer')"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title class="font-weight-bold">AXIS</v-app-bar-title>

    <template v-slot:append>
      <v-btn icon="mdi-bell-outline" class="mr-4"></v-btn>
    </template>
  </v-app-bar>
</template>