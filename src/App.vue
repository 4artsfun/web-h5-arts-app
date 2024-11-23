<script>
  import store from './store'
  import { pages } from '@/pages.json'
  import config from './common/js/config'

  export default {
    onLaunch: async function (res) {
      if (pages.findIndex((item) => item.path === res.path) < 0) {
        window.location.href = '/pages/home/index'
      }

      uni.setLocale('en')
      uni.getSystemInfo({
        success: (e) => {
          this.init(e)
        }
      })
      const token = uni.getStorageSync('userToken')
      if (token) {
        store.commit('setToken', token)
      } else {
        // await store.dispatch("logout")
      }
      const userInfo = uni.getStorageSync('userInfo')
      if (userInfo) {
        store.commit('setUserInfo', userInfo)
      }

      const tonAddr = uni.getStorageSync('tonAddr')
      if (tonAddr) {
        store.commit('setAddress', tonAddr)
      } else {
        // await store.dispatch("logout")
      }

      const chain = uni.getStorageSync('chain')
      if (chain) {
        store.commit('setChain', chain)
      } else {
        // await store.dispatch("logout")
      }
      await store.dispatch('initTonConnectUI')
      this.toLogout()
      localStorage.setItem('v', config.appVersion)
    },
    globalData: {
      systemInfo: {}
    },
    methods: {
      init(e) {
        const systemInfo = e
        let navigationBarHeight
        let custom = {}
        // #ifndef MP
        custom = {
          height: 36,
          width: 88
        }
        navigationBarHeight = 44
        // #endif
        // #ifdef MP-WEIXIN
        custom = wx.getMenuButtonBoundingClientRect()
        navigationBarHeight = custom.bottom + custom.top - e.statusBarHeight * 2
        systemInfo.statusBarHeight = systemInfo.statusBarHeight + 30
        // #endif
        systemInfo.navigationBarHeight = navigationBarHeight
        systemInfo.custom = custom
        this.globalData.systemInfo = systemInfo
      },
      toLogout() {
        const v = localStorage.getItem('v')
        const timestamp = Number(localStorage.getItem('timestamp'))
        const expired = Date.now() > timestamp

        if (timestamp && expired) {
          store.dispatch('logout')
          return
        }
        if (v != config.appVersion) {
          store.dispatch('logout')
        }
      }
    }
  }
</script>
<style lang="scss">
  @import './common/css/common.css';
  ::-webkit-scrollbar {
    display: none;
    width: 0 !important;
    height: 0 !important;
    -webkit-appearance: none;
    background: transparent;
  }
  .uni-simple-toast__text {
    background: #314262;
    color: #fff;
  }
  page {
    box-sizing: border-box;
    height: 100%;
    background: url(@/static/img/app-bg.png) no-repeat center top;
    background-size: 100% auto;
    color: $font-black-color;
    font-size: 26rpx;
    line-height: 1.8;
    overflow-y: scroll;
    font-family: 'Microsoft YaHei', Avenir, Helvetica, Arial, sans-serif;
  }
  ::v-deep {
    .mescroll-empty {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
    .uni-picker-container {
      z-index: 2000 !important;
    }
  }
  uni-toast {
    z-index: 2001 !important;
    .uni-simple-toast__text {
      word-break: auto-phrase;
    }
  }
</style>
