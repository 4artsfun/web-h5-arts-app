import App from './App'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import { Buffer } from 'buffer'
if (!window.Buffer) {
  window.Buffer = Buffer
}
import { createSSRApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { WagmiPlugin } from '@wagmi/vue'
import { web3Config } from './common/js/web3Config.js'
import VueLazyLoad from 'vue3-lazyload'

uni.hideTabBar()
export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  app.use(WagmiPlugin, { config: web3Config })
  app.use(VueQueryPlugin, {})
  app.use(Antd)
  app.use(VueLazyLoad, {})
  return {
    app
  }
}
