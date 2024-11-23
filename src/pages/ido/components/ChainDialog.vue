<script setup>
  import { nextTick, ref } from 'vue'
  import WalletOptions from '../../account/components/WalletOptions.vue'
  const walletOptionsEl = ref()

  const visible = ref(false)
  const show = () => {
    visible.value = true
  }
  const close = () => {
    visible.value = false
  }

  const changeChain = (chain) => {
    show()
    nextTick(() => {
      walletOptionsEl.value.changeChain(chain)
    })
  }
  defineExpose({ changeChain })
</script>

<template>
  <view class="modal" v-if="visible">
    <view class="box">
      <view class="title">Select a chain</view>
      <image
        mode="heightFix"
        class="close"
        src="/static/images/network/close.png"
        alt=""
        @click="close"
      />

      <WalletOptions ref="walletOptionsEl" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
  .modal {
    font-family: Rubik;
    color: #fff;
    min-width: 700rpx;
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .box {
    position: relative;
    padding: 20rpx 30rpx;
    width: 690rpx;
    border-radius: 40rpx;
    background: rgba(24, 14, 48, 1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0px 2px 10px 1px rgba(213, 0, 255, 0.2);
    .title {
      margin-bottom: 20rpx;
      font-size: 36rpx;
      font-weight: 900;
    }
    .close {
      cursor: pointer;
      width: 28rpx;
      height: 28rpx;
      position: absolute;
      top: 30rpx;
      right: 30rpx;
      z-index: 1;
    }
  }
</style>
