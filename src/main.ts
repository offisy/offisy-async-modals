import Vue from 'vue'
import App from './App.vue'
import ModalPlugin from './lib'
import 'bootstrap/dist/css/bootstrap.min.css'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(ModalPlugin)
Vue.use(BootstrapVue)

new Vue({
  render: h => h(App)
}).$mount('#app')
