import 'normalize.css'
import '@/assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Tabbar, TabbarItem } from 'vant'

const app = createApp(App)

app.use(router)
app.use(Tabbar)
app.use(TabbarItem)
app.mount('#app')
