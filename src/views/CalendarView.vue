<script setup lang="ts">
import { ref } from "vue";
import { VCalendar } from "vuetify/components"; // 自動インポートされない場合の保険
import { useDate } from "vuetify";

const adapter = useDate();

// ■ ダミーデータ: 日付ごとのTODOリスト
// 本来はデータベースから取得しますが、まずは表示確認用です
const tasks = ref({
  "2026-02-17": [
    { id: 1, title: "会議資料作成", done: true },
    { id: 2, title: "AXIS開発", done: false },
  ],
  "2026-02-18": [{ id: 3, title: "スーパーへ行く", done: false }],
  "2026-02-25": [
    { id: 4, title: "美容院", done: false },
    { id: 5, title: "本を読む", done: false },
    { id: 6, title: "ジム", done: true },
  ],
});

// 今日の日付
const value = ref([new Date()]);

// 特定の日のタスクを取得する関数
const getTasksForDate = (date: any) => {
  // カレンダーの日付オブジェクトを 'YYYY-MM-DD' 文字列に変換して検索
  const dateString = adapter.format(date, "keyboardDate") as string;
  return tasks.value[dateString as keyof typeof tasks.value] || [];
};
</script>

<template>
  <v-container fluid class="fill-height pa-0">
    <v-row class="fill-height" no-gutters>
      <v-col cols="12" class="fill-height">
        <v-calendar
          v-model="value"
          view-mode="month"
          :weekdays="[0, 1, 2, 3, 4, 5, 6]"
        >
          <template v-slot:day="{ day }">
            <div
              class="fill-height pa-1"
              style="
                border-right: 1px solid #e0e0e0;
                border-bottom: 1px solid #e0e0e0;
              "
            >
              <div class="text-caption font-weight-bold mb-1">
                {{ day.day }}
              </div>

              <div
                v-for="task in getTasksForDate(day.date)"
                :key="task.id"
                class="mb-1"
              >
                <v-sheet
                  rounded
                  :color="task.done ? 'grey-lighten-3' : 'primary-lighten-4'"
                  class="px-1 py-0 text-caption text-truncate"
                  style="font-size: 10px; line-height: 1.2"
                >
                  <v-icon
                    size="10"
                    :icon="
                      task.done
                        ? 'mdi-checkbox-marked'
                        : 'mdi-checkbox-blank-outline'
                    "
                    class="mr-1"
                  ></v-icon>
                  <span
                    :class="
                      task.done ? 'text-decoration-line-through text-grey' : ''
                    "
                  >
                    {{ task.title }}
                  </span>
                </v-sheet>
              </div>
            </div>
          </template>
        </v-calendar>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
/* カレンダーの高さを画面いっぱいに調整 */
:deep(.v-calendar-month__day) {
  min-height: 80px; /* セルの最低の高さ */
}
</style>
