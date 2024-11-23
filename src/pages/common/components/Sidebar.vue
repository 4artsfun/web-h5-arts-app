<script setup>
  import { ref } from 'vue'
  import { navTo } from '../../../common/js/util'
  import config from '../../../common/js/config'
  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    },
    selIndex: {
      type: Number,
      default: 1
    }
  })
  const emit = defineEmits(['update:show'])
  const close = () => emit('update:show', false)

  const openEco = ref(true)
  const openRwa = ref(true)

  const jump = (url) => {
    close()
    navTo(url)
  }
</script>

<template>
  <view class="nav" v-if="show">
    <view class="close" @click="close">
      <image src="/static/images/nav/close.png" alt="" />
    </view>
    <view class="box">
      <view
        class="item"
        :class="selIndex === 1 && 'sel'"
        @click="jump('/pages/home/index?type=switch')"
      >
        <view class="top">
          <text>BROWSE</text>
          <image mode="heightFix" src="/static/images/nav/browse.png" alt="" />
        </view>
      </view>
      <view
        class="item"
        :class="selIndex === 2 && 'sel'"
        @click="openEco = !openEco"
      >
        <view class="top">
          <text>ECOSYSTEM</text>
          <image mode="heightFix" src="/static/images/nav/eco.png" alt="" />
        </view>
        <view class="edge" v-if="openEco">
          <view class="leaf" @click="jump('/pages/ecosystem/index')">
            <text>Ecosystem Select identity</text>
          </view>
          <view class="leaf" @click="jump('/pages/bar/structure')">
            <text>Structure</text>
          </view>
        </view>
      </view>
      <view
        class="item"
        :class="selIndex === 4 && 'sel'"
        @click="openRwa = !openRwa"
      >
        <view class="top">
          <text>RWA MARKET</text>
          <image mode="heightFix" src="/static/images/nav/market.png" alt="" />
        </view>
        <view class="edge market" v-if="openRwa">
          <view class="leaf" @click="jump('/pages/market/index')">
            <text>Going Online Soon</text>
          </view>
          <view class="leaf" @click="jump('/pages/market/index')">
            <text>Non-Interest Bearing RWA</text>
          </view>
          <view class="leaf" @click="jump('/pages/market/index')">
            <text>Interest Bearing RWA</text>
          </view>
        </view>
      </view>
      <view
        class="item"
        :class="selIndex === 5 && 'sel'"
        @click="jump('/pages/trade/index')"
      >
        <view class="top">
          <text>TRADE</text>
          <image mode="heightFix" src="/static/images/nav/trade.png" alt="" />
        </view>
      </view>
      <view class="item" @click="jump(config.artsWhiteBookUrl)">
        <view class="top">
          <text>WHITE PAPER</text>
          <image mode="heightFix" src="/static/images/nav/paper.png" alt="" />
        </view>
      </view>
      <!-- <view class="item" :class="selIndex === 3 && 'sel'" @click="jump('/pages/genesis/index')">
          <view class="top">
            <text>GENESIS PROGRAM</text>
            <image mode="heightFix" src="/static/images/nav/genesis.png" alt="" />
          </view>
        </view> -->
    </view>
    <view class="media" @click="jump(config.artsTwitterUrl)">
      <view class="peace">
        <image mode="heightFix" src="/static/images/nav/twitter.png" alt="" />
        <text>Twitter</text>
      </view>
      <view class="peace" @click="jump(config.artsTgUrl)">
        <image mode="heightFix" src="/static/images/nav/telegram.png" alt="" />
        <text>Telegram</text>
      </view>
      <view class="peace" @click="jump(config.artsDiscordUrl)">
        <image mode="heightFix" src="/static/images/nav/discord.png" alt="" />
        <text>Discord</text>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
  .nav {
    background: rgb(6, 8, 32);
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 100;
    .close {
      padding: 110rpx 0 70rpx 60rpx;
      image {
        width: 35rpx;
        height: 35rpx;
      }
    }
    .box {
      padding-bottom: 120rpx;
    }
    .item {
      margin-top: 10rpx;
      font-family: 'font_Rubik';
      &.sel {
        .top {
          background: rgba(217, 217, 217, 0.1);
          &:before {
            display: block;
            content: '';
            width: 14rpx;
            background: #fff;
            height: 100%;
          }
        }
      }
      .top {
        padding-right: 50rpx;
        display: flex;
        align-items: center;
        height: 50rpx;
        font-size: 26rpx;
        image {
          height: 30rpx;
        }
        text {
          padding-right: 20rpx;
          text-align: right;
          flex: 1;
        }
      }
      .edge {
        font-size: 20rpx;
        padding-right: 62rpx;
        &.market {
          .leaf:after {
            background: rgb(177, 94, 228);
          }
        }
        .leaf {
          font-weight: bold;
          font-family: 'Microsoft YaHei', Avenir, Helvetica, Arial, sans-serif;
          display: flex;
          align-items: center;
          height: 50rpx;
          margin-top: 10rpx;
          text {
            text-align: right;
            flex: 1;
            padding-right: 32rpx;
          }

          &:after {
            display: block;
            content: '';
            width: 8rpx;
            background: rgb(99, 96, 250);
            height: 8rpx;
            border-radius: 50%;
          }
        }
      }
    }
    .media {
      border-top: 1.74px solid #3c4c5a;
      padding: 30rpx 50rpx;
      .peace {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 60rpx;
        image {
          height: 30rpx;
        }
        text {
          padding-left: 20rpx;
        }
      }
    }
  }
</style>
