<script setup>
  import { ref } from 'vue'

  const props = defineProps({
    menus: {
      type: Array,
      default: () => []
    }
  })

  const active = ref(1)
  const emit = defineEmits(['change'])
  const activeChange = (index) => {
    active.value = index
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
      <view>{{ menu.name }}</view>
    </view>
  </view>
</template>

<style scoped lang="scss">
  .tabs {
    display: flex;
    justify-content: space-around;
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
  }
</style>
