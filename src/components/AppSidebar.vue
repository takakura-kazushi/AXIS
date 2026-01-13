<script setup lang="ts">
import { computed } from 'vue'

// 親(App.vue)とのデータ同期用設定
const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

// v-modelの実体
// サイドバー自体が閉じる動作をした時(スクリムクリック等)、
// setが呼ばれて親に「閉じたよ(false)」と伝えます。
const drawer = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const menuItems = [
  { title: 'ホーム', icon: 'mdi-home-outline', to: '/' },
  { title: '予定 (Calendar)', icon: 'mdi-calendar-clock', to: '/calendar' },
  { title: '記録 (Log)', icon: 'mdi-chart-timeline-variant', to: '/log' },
  { title: '設定 (Settings)', icon: 'mdi-cog-outline', to: '/settings' },
]
</script>

<template>
  <v-navigation-drawer
    v-model="drawer"
    temporary
  >
    <v-sheet class="pa-4">
      <div class="d-flex align-center">
        <v-avatar color="primary" class="mr-3" size="40">
          <v-icon icon="mdi-account" color="white"></v-icon>
        </v-avatar>
        <div class="font-weight-bold">User</div>
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
</template>