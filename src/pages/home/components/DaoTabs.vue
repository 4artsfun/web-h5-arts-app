<script setup>
  import { wait } from '../../../common/js/util'

  const menus = [
    { index: 1, name: 'PREHEATING POOL' },
    { index: 2, name: 'ANNOUNCEMENT' },
    { index: 3, name: 'PROPOSAL' },
    { index: 4, name: 'REVIEW' }
  ]
  const props = defineProps({
    active: {
      type: Number,
      default: 1
    }
  })
  const emit = defineEmits(['change'])
  const activeChange = (index) => {
    if (index !== 1) {
      wait()
    }
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
      <img
        class="icon"
        :src="`/static/images/home/dao-tab-${menu.index}.svg`"
      />
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
      margin-right: 80rpx;
      padding-bottom: 10rpx;
      display: flex;
      align-items: center;
      &:last-child {
        margin-right: 0;
      }
      &.active {
        border-bottom: 6rpx solid #eb1484;
        color: #eb1484;
        .icon {
          filter: invert(20%) sepia(89%) saturate(3982%) hue-rotate(316deg)
            brightness(92%) contrast(100%);
        }
      }
    }

    .icon {
      width: 32rpx;
      height: 32rpx;
      margin-right: 5rpx;
      filter: brightness(0) invert(1);
    }
  }
</style>
