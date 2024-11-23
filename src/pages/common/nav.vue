<script setup>
  import { ref, watch, onMounted, computed } from 'vue'
  import { navTo, getAddressFormat } from '../../common/js/util'
  import { useStore } from 'vuex'
  const store = useStore()
  import LoginDialog from '../account/components/LoginDialog.vue'
  import UserInfoDialog from '../account/components/UserInfoDialog.vue'
  // import Sidebar from './components/Sidebar.vue'

  const props = defineProps({
    selIndex: {
      type: Number,
      default: 1
    },
    scrollShadow: {
      type: Boolean,
      default: false
    },
    showScrollList: {
      type: Boolean,
      default: true
    }
  })
  const show = ref(false)
  const jump = (url) => {
    show.value = false
    navTo(url)
  }
  import { useMenuScroll } from './menu.js'
  const { scrollTop, menuList } = useMenuScroll(props.selIndex)

  const userInfo = computed(() => store.state.info)
  const showUserInfo = ref(false)
  const triggerWallet = async () => {
    // if (store.state.friendAddress) {
    if (userInfo.value?.u) {
      showUserInfo.value = true
      // navTo("/pages/account/summary", {login: true})
    } else {
      await store.dispatch('openWallet')
    }
  }
  import { useAccount } from '@wagmi/vue'
  const { address, connector } = useAccount()
  watch(
    address,
    async (addr) => {
      if (addr) {
        store.state.friendAddress = addr
        if (store.state.chain != 'ton' && store.state.chain != 'sol') {
          if (
            store.state.address &&
            (store.state.chain == 'bnb' || store.state.chain == 'eth')
          ) {
            store.state.friendAddress = addr
          } else if (connector) {
            let chainId = await connector.value.getChainId()
            await store.dispatch('login', {
              addr,
              proof: null,
              chainId,
              loginType: 'wallet'
            })
          }
        }
      } else {
        if (store.state.chain === 'eth' || store.state.chain === 'bnb') {
          await store.dispatch('logout')
        }
      }
    },
    { immediate: true }
  )

  import { useWalletSelect } from '../account/hooks/walletSelect'
  const { connectSolWallet } = useWalletSelect()

  onMounted(() => {
    if (store.state.chain === 'sol' && store.state.address) {
      console.log('mounted connect')
      connectSolWallet(false)
    }
  })
</script>
<template>
  <view class="header">
    <view
      class="wrapper"
      :class="{ 'scroll-shadow': scrollShadow }"
      v-if="!show"
    >
      <!-- <view style="flex-grow: 1">
        <image
          class="logo"
          @click="jump('/pages/home/index?type=switch')"
          src="/static/images/logo.png"
        />
      </view> -->
      <div class="logo" @click="jump('/pages/home/index?type=switch')"></div>

      <div class="menu-list">
        <div
          v-for="item in menuList"
          :key="item.index"
          class="menu-name"
          :class="{ active: selIndex === item.index }"
          @click="jump(item.url)"
        >
          {{ item.name }}
        </div>
      </div>

      <view
        class="connector"
        :class="{ 'is-login': userInfo?.u }"
        @click="triggerWallet"
      >
        <div v-if="userInfo?.u">
          <!-- prettier-ignore -->
          <div v-if="store.state.chain" class="wallet-user">
            <img class="icon" src="/static/images/network/ton.png" v-if="store.state.chain === 'ton'">
            <img class="icon" src="/static/images/network/eth.png" v-if="store.state.chain === 'eth'">
            <img class="icon" src="/static/images/network/sol.png" v-if="store.state.chain === 'sol'">
            <img class="icon" src="/static/images/network/bnb.png" v-if="store.state.chain === 'bnb'">
            <div class="text">{{ getAddressFormat(store.state.friendAddress) }}</div>
          </div>
          <div v-else class="username-user">
            <div class="user-icon"></div>
            <div class="text">{{ getAddressFormat(userInfo?.n) }}</div>
          </div>
        </div>
        <div v-else class="login-btn">
          <div class="wallet-icon"></div>
          <div class="text">Login</div>
        </div>
      </view>
      <!-- <image
        class="search"
        @click="jump('/pages/search/index')"
        mode="heightFix"
        src="/static/images/nav/search.png"
      /> -->
      <!-- <image
        class="menu"
        mode="heightFix"
        src="/static/images/nav/menu.png"
        @click="show = true"
      /> -->
    </view>
    <LoginDialog />
    <UserInfoDialog v-model:show="showUserInfo" />
    <!-- <scroll-view
      class="tab"
      v-if="showScrollList"
      scroll-x
      overflow-anchor
      enable-flex
      scroll-with-animation
      :scroll-left="scrollTop"
    >
      <view
        v-for="item in menuList"
        :key="item.index"
        class="title"
        @click="jump(item.url)"
        :class="selIndex === item.index && 'sel'"
        :id="'tab' + selIndex"
      >
        <text>{{ item.name }}</text>
      </view>
    </scroll-view> -->
    <!-- <Sidebar :selIndex="selIndex" v-model:show="show" /> -->
  </view>
</template>

<style scoped lang="scss">
  .header {
    position: relative;
    padding-top: 128rpx;
    font-family: Rubik;
    color: #fff;
    .wrapper {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 999;
      padding: 0 20rpx;
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      height: 128rpx;
      display: flex;
      align-items: center;
      &.scroll-shadow {
        background: rgb(18 9 44 / 90%);
      }
      image {
        height: 50rpx;
      }
      .connector {
        display: flex;
        align-items: center;
        // min-width: 176rpx;
        height: 76rpx;
        margin-top: 20rpx;
        padding: 0 25rpx 20rpx;
        background: url('/static/images/nav/connect-wallet-bg.png');
        background-size: 100% 100%;
        position: relative;
        .wallet-user {
          display: flex;
          align-items: center;
          .icon {
            width: 32rpx;
            height: 32rpx;
            margin-right: 10rpx;
          }
        }

        .username-user {
          display: flex;
          align-items: center;
          .user-icon {
            min-width: 36rpx;
            height: 36rpx;
            margin-right: 15rpx;
            background: url('/static/images/nav/user-icon.png') no-repeat center /
              contain;
          }
        }

        .login-btn {
          display: flex;
          align-items: center;

          .wallet-icon {
            min-width: 36rpx;
            height: 36rpx;
            margin-right: 15rpx;
            background: url('/static/images/nav/wallet-icon.png');
            background-size: 100% 100%;
          }
        }

        .text {
          font-weight: bold;
          font-size: 24rpx;
          height: 80rpx;
          line-height: 80rpx;
          text-align: left;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }
        &.is-login {
          // width: 200rpx;
        }
      }
      .logo {
        cursor: pointer;
        height: 92rpx;
        width: 234rpx;
        background: url('/static/images/logo.png') no-repeat center / contain;
        margin-top: -20rpx;
      }

      .menu-list {
        flex-grow: 1;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .menu-name {
          font-size: 24rpx;
          font-weight: 900;
          &.active {
            background: linear-gradient(
              90deg,
              rgba(5, 197, 250, 1) 0%,
              rgba(0, 245, 228, 1) 100%
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      }

      // .search {
      //   width: 44rpx;
      //   max-width: 44rpx;
      //   height: 44rpx;
      //   margin-left: 30rpx;
      // }
      // .menu {
      //   width: 52rpx;
      //   max-width: 52rpx;
      //   margin-left: 30rpx;
      // }
    }
    .tab {
      white-space: nowrap;
      padding-bottom: 40rpx;
      .title {
        // background: rgba(255, 255, 255, 0.1);
        border-radius: 8rpx;
        height: 52rpx;
        line-height: 52rpx;
        display: inline-block;
        align-items: center;
        padding: 0 20rpx;
        font-family: 'font_Rubik';
        font-size: 20rpx;
        margin-left: 40rpx;
        &:first-child {
          margin-left: 0;
        }
        &.sel {
          background-color: rgba(255, 255, 255, 0.3);
          text {
            color: #00f5e4;
            background: var(
              --002,
              linear-gradient(90deg, #05c5fa 25%, #00f5e4 100%)
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      }
    }
  }
</style>
