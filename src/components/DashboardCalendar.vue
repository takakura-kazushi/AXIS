<script setup lang="ts">
import { ref, computed } from "vue";
import { useDisplay } from "vuetify";

const { mdAndUp } = useDisplay();

// TODOデータ（時間情報も追加）
const todoData: Record<
  string,
  Array<{ title: string; time: string; done: boolean }>
> = {
  "2026-02-17": [
    { title: "会議資料作成", time: "09:00", done: true },
    { title: "AXIS開発", time: "14:00", done: false },
    { title: "チームミーティング", time: "16:00", done: false },
  ],
  "2026-02-18": [
    { title: "買い物", time: "10:30", done: false },
    { title: "ジム", time: "18:00", done: false },
  ],
  "2026-02-19": [{ title: "ランチミーティング", time: "12:00", done: false }],
  "2026-02-20": [
    { title: "プレゼン準備", time: "10:00", done: false },
    { title: "打ち合わせ", time: "15:00", done: false },
  ],
  "2026-02-25": [
    { title: "美容院", time: "11:00", done: false },
    { title: "読書", time: "15:00", done: false },
    { title: "夕食準備", time: "17:30", done: true },
  ],
};

const currentDate = ref(new Date());
const selectedDate = ref(new Date());

const year = computed(() => currentDate.value.getFullYear());
const month = computed(() => currentDate.value.getMonth() + 1);
const day = computed(() => currentDate.value.getDate());

// 週の開始日（日曜日）を取得
const weekStart = computed(() => {
  const date = new Date(currentDate.value);
  const dayOfWeek = date.getDay();
  const diff = dayOfWeek; // 日曜日からの差分
  const weekStartDate = new Date(date);
  weekStartDate.setDate(date.getDate() - diff);
  return weekStartDate;
});

// 1週間分の日付を生成
const weekDays = computed(() => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(weekStart.value);
    date.setDate(weekStart.value.getDate() + i);
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

    days.push({
      date: date,
      dateStr: dateStr,
      dayOfWeek: ["日", "月", "火", "水", "木", "金", "土"][date.getDay()],
      dayNum: date.getDate(),
      isToday: isSameDay(new Date(), date),
      todos: todoData[dateStr] || [],
    });
  }
  return days;
});

const currentDateStr = computed(() => {
  const y = currentDate.value.getFullYear();
  const m = String(currentDate.value.getMonth() + 1).padStart(2, "0");
  const d = String(currentDate.value.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
});

const currentDateDisplay = computed(() => {
  return `${month.value}月${day.value}日`;
});

const currentDayTodos = computed(() => {
  return todoData[currentDateStr.value] || [];
});

const isSameDay = (d1: Date, d2: Date) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

const prevDay = () => {
  const newDate = new Date(currentDate.value);
  newDate.setDate(newDate.getDate() - 1);
  currentDate.value = newDate;
};

const nextDay = () => {
  const newDate = new Date(currentDate.value);
  newDate.setDate(newDate.getDate() + 1);
  currentDate.value = newDate;
};

const prevWeek = () => {
  const newDate = new Date(currentDate.value);
  newDate.setDate(newDate.getDate() - 7);
  currentDate.value = newDate;
};

const nextWeek = () => {
  const newDate = new Date(currentDate.value);
  newDate.setDate(newDate.getDate() + 7);
  currentDate.value = newDate;
};

const timeSlots = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];
</script>

<template>
  <div class="calendar-wrapper">
    <!-- スマホ版: 1日のタイムライン -->
    <div v-if="!mdAndUp" class="mobile-view">
      <!-- 日付ヘッダー -->
      <div class="date-header">
        <v-btn icon size="small" variant="text" @click="prevDay">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <span class="text-h6 font-weight-bold"
          >{{ year }}年 {{ currentDateDisplay }}</span
        >
        <v-btn icon size="small" variant="text" @click="nextDay">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>

      <!-- タイムライン -->
      <div class="timeline-scroll">
        <div
          v-if="currentDayTodos.length === 0"
          class="pa-4 text-center text-grey no-events"
        >
          <v-icon size="48" color="grey-lighten-2">mdi-calendar-blank</v-icon>
          <div class="mt-2">予定なし</div>
        </div>

        <div v-else class="timeline">
          <div
            v-for="(slot, index) in timeSlots"
            :key="index"
            class="time-slot"
          >
            <div class="time-label">{{ slot }}</div>
            <div class="time-line"></div>

            <div
              v-for="todo in currentDayTodos.filter((t) =>
                t.time.startsWith(slot.substring(0, 2)),
              )"
              :key="todo.title"
              class="todo-card"
              :class="{ 'todo-done': todo.done }"
            >
              <div class="d-flex align-center">
                <v-icon
                  size="small"
                  :icon="todo.done ? 'mdi-check-circle' : 'mdi-circle-outline'"
                  :color="todo.done ? 'success' : 'primary'"
                  class="mr-2"
                ></v-icon>
                <div class="flex-grow-1">
                  <div class="font-weight-medium">{{ todo.title }}</div>
                  <div class="text-caption text-grey">{{ todo.time }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- PC版: 1週間のタイムライン -->
    <div v-else class="desktop-view">
      <!-- 週ヘッダー -->
      <div class="week-header">
        <v-btn icon size="small" variant="text" @click="prevWeek">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <span class="text-h6 font-weight-bold">{{ year }}年 {{ month }}月</span>
        <v-btn icon size="small" variant="text" @click="nextWeek">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>

      <div class="week-container">
        <!-- 時間軸ラベル -->
        <div class="time-axis">
          <div class="day-label"></div>
          <div class="time-axis-scroll">
            <div v-for="slot in timeSlots" :key="slot" class="time-axis-label">
              {{ slot }}
            </div>
          </div>
        </div>

        <!-- 各曜日のタイムライン -->
        <div class="week-timelines">
          <div
            v-for="(dayData, index) in weekDays"
            :key="index"
            class="day-column"
          >
            <!-- 曜日ヘッダー -->
            <div class="day-label" :class="{ 'is-today': dayData.isToday }">
              <div class="text-caption text-grey">{{ dayData.dayOfWeek }}</div>
              <div
                class="text-h6"
                :class="{ 'text-primary font-weight-bold': dayData.isToday }"
              >
                {{ dayData.dayNum }}
              </div>
            </div>

            <!-- タイムライン -->
            <div class="day-timeline">
              <div
                v-for="(slot, sIndex) in timeSlots"
                :key="sIndex"
                class="time-slot-desktop"
              >
                <div
                  v-for="todo in dayData.todos.filter((t) =>
                    t.time.startsWith(slot.substring(0, 2)),
                  )"
                  :key="todo.title"
                  class="todo-card-desktop"
                  :class="{ 'todo-done': todo.done }"
                >
                  <div class="text-caption font-weight-medium">
                    {{ todo.title }}
                  </div>
                  <div class="text-caption text-grey">{{ todo.time }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 進捗バー -->
    <div class="progress-bar"></div>
  </div>
</template>

<style scoped>
.calendar-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

/* スクロールバーを非表示 */
.timeline-scroll,
.day-timeline,
.week-timelines,
.time-axis-scroll {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.timeline-scroll::-webkit-scrollbar,
.day-timeline::-webkit-scrollbar,
.week-timelines::-webkit-scrollbar,
.time-axis-scroll::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

/* スマホ版 */
.mobile-view {
  height: calc(100vh - 64px - 80px); /* ヘッダー分とマージン分を引く */
  display: flex;
  flex-direction: column;
  margin: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.date-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background-color: white;
  border-bottom: 1px solid #e0e0e0;
  flex-shrink: 0;
}

.timeline-scroll {
  flex: 1;
  overflow-y: auto;
  background-color: #fafafa;
}

.no-events {
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.timeline {
  position: relative;
  background-color: white;
  padding: 0 16px;
  padding-bottom: 20px;
}

.time-slot {
  position: relative;
  min-height: 60px;
  border-bottom: 1px solid #f0f0f0;
}

.time-label {
  position: absolute;
  left: 16px;
  top: 0;
  width: 60px;
  padding: 8px;
  font-size: 12px;
  color: #666;
}

.time-line {
  position: absolute;
  left: 86px;
  right: 16px;
  top: 0;
  bottom: 0;
  border-left: 2px solid #e0e0e0;
}

.todo-card {
  margin-left: 96px;
  margin-right: 16px;
  margin-top: 8px;
  margin-bottom: 8px;
  padding: 12px;
  background-color: #e3f2fd;
  border-left: 4px solid #1976d2;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.todo-card:hover {
  background-color: #bbdefb;
  transform: translateX(2px);
}

.todo-done {
  opacity: 0.6;
  background-color: #f5f5f5;
  border-left-color: #4caf50;
}

.todo-done .font-weight-medium {
  text-decoration: line-through;
}

/* PC版 */
.desktop-view {
  height: calc(100vh - 64px - 80px); /* ヘッダー分とマージン分を引く */
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
  margin: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.week-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 16px;
  background-color: white;
  border-bottom: 1px solid #e0e0e0;
  flex-shrink: 0;
  z-index: 10;
}

.week-container {
  flex: 1;
  display: flex;
  overflow: hidden;
  padding: 20px;
  padding-bottom: 20px;
}

.time-axis {
  width: 80px;
  flex-shrink: 0;
  background-color: white;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
}

.time-axis .day-label {
  height: 60px;
  flex-shrink: 0;
  border-bottom: 1px solid #e0e0e0;
}

.time-axis-scroll {
  flex: 1;
  overflow-y: auto;
}

.time-axis-label {
  height: 60px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 4px;
  font-size: 11px;
  color: #666;
  border-bottom: 1px solid #f0f0f0;
  flex-shrink: 0;
}

.week-timelines {
  flex: 1;
  display: flex;
  overflow-x: auto;
}

.day-column {
  flex: 1;
  min-width: 150px;
  border-right: 1px solid #e0e0e0;
  background-color: white;
  display: flex;
  flex-direction: column;
}

.day-label {
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e0e0e0;
  background-color: #fafafa;
  flex-shrink: 0;
}

.day-label.is-today {
  background-color: #e3f2fd;
}

.day-timeline {
  flex: 1;
  overflow-y: auto;
}

.time-slot-desktop {
  min-height: 60px;
  border-bottom: 1px solid #f0f0f0;
  padding: 4px 12px;
  position: relative;
}

.todo-card-desktop {
  padding: 8px;
  margin-bottom: 4px;
  background-color: #e3f2fd;
  border-left: 3px solid #1976d2;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.todo-card-desktop:hover {
  background-color: #bbdefb;
}

.todo-card-desktop.todo-done {
  opacity: 0.6;
  background-color: #f5f5f5;
  border-left-color: #4caf50;
}

.todo-card-desktop.todo-done .font-weight-medium {
  text-decoration: line-through;
}

/* 進捗バー */
.progress-bar {
  position: fixed;
  bottom: 8px;
  right: 8px;
  width: 5px;
  height: 80px;
  background: linear-gradient(
    to top,
    rgba(251, 207, 232, 0.6),
    rgba(125, 211, 252, 0.6)
  );
  border-radius: 2.5px;
  box-shadow:
    0 0 12px rgba(125, 211, 252, 0.4),
    0 0 6px rgba(251, 207, 232, 0.4);
  backdrop-filter: blur(4px);
  z-index: 1000;
}
</style>
