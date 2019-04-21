// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

/* Configure Firebase */
const config = {
  apiKey: 'AIzaSyCD6Aqza1GTj_7ohAOkKNNOCG7r3k2n_C8',
  authDomain: 'heisei-hackathon.firebaseapp.com',
  databaseURL: 'https://heisei-hackathon.firebaseio.com',
  projectId: 'heisei-hackathon',
  storageBucket: 'heisei-hackathon.appspot.com',
  messagingSenderId: '435095458233'
}

firebase.initializeApp(config)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
