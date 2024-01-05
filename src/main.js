import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 组件库
import 'ol/ol.css'
import olComps from '../packages/index'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(olComps)

app.mount('#app')
