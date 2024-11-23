<script setup>
  import { ref } from 'vue'
  const menus = [
    { index: 1, name: 'Going online' },
    { index: 2, name: 'Non-Interest Bearing  RWA' },
    { index: 3, name: 'Interest Bearing  RWA' }
  ]
  const props = defineProps({
    active: {
      type: Number,
      default: 1
    }
  })
  const emit = defineEmits(['change'])
  const activeChange = (index) => {
    emit('change', index)
  }
</script>

<template>
  <view class="tabs">
    <view
      v-for="menu in menus"
      :key="menu.index"
      class="tab"
      :class="{ active: menu.index === active }"
      @click="activeChange(menu.index)"
    >
      <view class="icon" :class="`icon-${menu.index}`"></view>
      <view>{{ menu.name }}</view>
    </view>
  </view>
</template>

<style scoped lang="scss">
  .tabs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60rpx;
    overflow-x: auto;
    border-bottom: 1px solid rgba(229, 229, 229, 0.2);

    .tab {
      flex-shrink: 0;
      color: #fff;
      font-size: 24rpx;
      margin-right: 28rpx;
      padding-bottom: 10rpx;
      display: flex;
      align-items: center;
      &:last-child {
        margin-right: 0;
      }
      &.active {
        border-bottom: 6rpx solid #e41599;
      }
    }

    .icon {
      width: 32rpx;
      height: 32rpx;
      margin-right: 5rpx;

      &.icon-1 {
        background: url(@/static/img/market/tab-icon-1.png) no-repeat center;
        background-size: 100% 100%;
      }
      &.icon-2 {
        background: url(@/static/img/market/tab-icon-2.png) no-repeat center;
        background-size: 100% 100%;
      }
      &.icon-3 {
        background: url(@/static/img/market/tab-icon-3.png) no-repeat center;
        background-size: 100% 100%;
      }
    }
  }
</style>
