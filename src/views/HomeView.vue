<script setup lang="ts">
import { ref } from 'vue'

const summaryCards = [
  { title: '今日のタスク', value: '5件', icon: 'mdi-check-circle-outline', color: 'blue' },
  { title: '今月の稼働', value: '12時間', icon: 'mdi-clock-time-four-outline', color: 'orange' },
  { title: '達成率', value: '85%', icon: 'mdi-chart-bar', color: 'green' },
]

const recentUpdates = ref([
  { id: 1, text: 'Vuetifyの環境構築完了', time: '10:00' },
  { id: 2, text: 'ルーティングの設定', time: '11:30' },
  { id: 3, text: 'WSLとの格闘', time: '13:00' },
])
</script>

<template>
  <v-container fluid>
    
    <h2 class="mb-4">ダッシュボード</h2>

    <v-row>
      <v-col
        v-for="(card, index) in summaryCards"
        :key="index"
        cols="12"
        sm="4"
      >
        <v-card class="mx-auto" :color="card.color" variant="tonal">
          <v-card-item>
            <div>
              <div class="text-overline mb-1">{{ card.title }}</div>
              <div class="text-h4 mb-1">{{ card.value }}</div>
            </div>
          </v-card-item>
          <template v-slot:append>
            <v-icon :icon="card.icon" size="48" color="grey-darken-2"></v-icon>
          </template>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12">
        <v-card title="最近のアクティビティ">
          <v-list lines="one">
            <v-list-item
              v-for="update in recentUpdates"
              :key="update.id"
              :title="update.text"
              :subtitle="update.time"
              prepend-icon="mdi-information-outline"
            ></v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>