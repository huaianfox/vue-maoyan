import Vue from 'vue'
import fastClick from 'fastclick'
import 'babel-polyfill'
import App from './App.vue'
import router from './router/index'
import store from './store/'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import InfiniteLoading from 'vue-infinite-loading'
import './assets/styles/index.scss'

Vue.config.productionTip = false

fastClick.attach(document.body)
Vue.use(VueLazyload, {
  loading: '/assets/ajax-loader.gif'
})

Vue.use(infiniteScroll)
Vue.use(InfiniteLoading, {
  slots: {
    noMore: '我也是有底线的'
  }
})

new Vue({
  router,
  store,
  directives: { infiniteScroll },
  render: h => h(App)
}).$mount('#app')
