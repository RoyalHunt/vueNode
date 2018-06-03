import Vue from 'vue'
import { Vuetify, VApp, VDataTable, VBtn, VIcon, VGrid, VDialog, VCard, VTextField } from 'vuetify'
import App from './App'
import router from './router'
import '../node_modules/vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VDataTable,
    VDialog,
    VBtn,
    VIcon,
    VGrid,
    VCard,
    VTextField
  },
  theme: {
    primary: '#ee44aa',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
