import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify()

const app = createApp(App)
app.use(vuetify)
app.mount('#app')