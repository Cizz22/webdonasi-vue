import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import mixins from './mixins'


createApp(App)
.use(router)
.use(store)
.use(Toast)
.use(mixins)
.mount('#app')
