/// <reference types="vite/client" />

// .vueファイルをインポートできるようにする設定
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Vuetifyの型定義エラー回避（念のため）
declare module 'vuetify'
declare module 'vuetify/components'
declare module 'vuetify/directives'