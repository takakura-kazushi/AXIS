<script setup lang="ts">
import { ref } from "vue";

const drawer = ref(true);

// メニュー定義
const menuItems = [
  { title: "ホーム", icon: "mdi-home-outline", to: "/" },
  { title: "予定 (Calendar)", icon: "mdi-calendar-clock", to: "/calendar" },
  { title: "記録 (Log)", icon: "mdi-chart-timeline-variant", to: "/" },
  { title: "設定 (Settings)", icon: "mdi-cog-outline", to: "/" },
];
</script>

<template>
  <v-app>
    <v-navigation-drawer v-model="drawer">
      <v-sheet color="grey-lighten-4" class="pa-4">
        <div class="d-flex align-center">
          <v-avatar color="primary" class="mr-3" size="40">
            <span class="text-h6 text-white">A</span>
          </v-avatar>
          <div>
            <div class="font-weight-bold">Guest User</div>
            <div class="text-caption">Basic Plan</div>
          </div>
        </div>
      </v-sheet>
      <v-divider></v-divider>

      <v-list nav>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :prepend-icon="item.icon"
          :title="item.title"
          :to="item.to"
          active-color="primary"
          rounded="xl"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar elevation="1">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title class="font-weight-bold">AXIS</v-app-bar-title>

      <template v-slot:append>
        <v-btn icon="mdi-bell-outline"></v-btn>
      </template>
    </v-app-bar>

    <v-main class="bg-grey-lighten-5">
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>
