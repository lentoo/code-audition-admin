import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './components'
import './assets/icons'
import './lib/element-ui'
import './assets/styles/reset.scss'

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    /**
     * @description 弹出提示
     */
    $tips ({ result }) {
      // eslint-disable-next-line no-new
      return new Promise((resolve, reject) => {
        if (result.code === 1) {
          this.$message.success(result.msg || '操作成功')
          resolve(result.data)
        }
      })
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
