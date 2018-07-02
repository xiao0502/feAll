import Vue from 'vue'
import App from './App'
import './styles/index.less'
import tdView from './components'
Vue.use(tdView)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
