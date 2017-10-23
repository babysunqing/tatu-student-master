// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router.js'
import VueResource from 'vue-resource'
import axios from 'axios'
import Mint from 'mint-ui'
import ElementUI from 'element-ui'
import GetQueryString from './common/js/GetQueryString.js'
import VeeValidate, {Validator}  from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_CN'
import './common/css/reset.css'
import 'mint-ui/lib/style.css'
import 'element-ui/lib/theme-default/index.css'

Validator.addLocale(zh)
const config = {
  locale: 'zh_CN'
}
Vue.use(Mint)
Vue.use(ElementUI)
Vue.use(VueResource)
Vue.use(axios)
Vue.config.productionTip = false
Vue.prototype.GetQueryString = GetQueryString
Vue.use(VeeValidate,config)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
// 设置title
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = binding.value
  }
})
