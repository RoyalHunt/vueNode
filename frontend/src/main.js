import Vue from 'vue'
import {
  Vuetify,
  VApp,
  VDataTable,
  VBtn,
  VIcon,
  VGrid,
  VDialog,
  VCard,
  VTextField,
  VForm,
  VToolbar,
  VCheckbox
} from 'vuetify'
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
    VTextField,
    VForm,
    VToolbar,
    VCheckbox
  },
  theme: {
    primary: '#2196F3',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
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
