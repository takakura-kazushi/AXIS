<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const drawer = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const menuItems = [
  { title: "ホーム", icon: "mdi-home-outline", to: "/" },
  { title: "予定 (Calendar)", icon: "mdi-calendar-clock", to: "/calendar" },
  { title: "記録 (Log)", icon: "mdi-chart-timeline-variant", to: "/log" },
  { title: "設定 (Settings)", icon: "mdi-cog-outline", to: "/settings" },
];
</script>

<template>
  <v-navigation-drawer v-model="drawer" temporary>
    <div class="py-6" style="text-align: center">
      <div class="font-weight-bold text-h6">User</div>
    </div>

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
</template>
