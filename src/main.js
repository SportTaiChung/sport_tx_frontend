import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueClipboard from 'vue-clipboard2'
import './router/reouterRigth'
import './assets/sass/global.scss'
import './assets/sass/elementChange.scss'
import * as filters from '@/utils/filters'

Object.keys(filters).forEach(key=>{
  Vue.filter(key,filters[key])
})
Vue.use(VueClipboard)
Vue.use(ElementUI)
Vue.prototype.$axios=axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
