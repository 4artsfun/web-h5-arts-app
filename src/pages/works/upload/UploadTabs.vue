<script setup>
  const props = defineProps({
    active: {
      type: Number,
      default: 1
    }
  })
  const menus = [
    { index: 1, name: 'Upload' },
    { index: 2, name: 'Finished List' }
  ]

  const emit = defineEmits(['change'])
  const activeChange = (index) => {
    emit('change', index)
  }
</script>

<template>
  <div class="tabs">
    <div
      v-for="menu in menus"
      :key="menu.index"
      class="tab"
      :class="{ active: menu.index === active }"
      @click="activeChange(menu.index)"
    >
      <div>{{ menu.name }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .tabs {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow-x: auto;
    border-bottom: 2rpx solid rgba(51, 51, 51, 1);

    .tab {
      flex-shrink: 0;
      color: #fff;
      font-size: 28rpx;
      font-weight: 900;
      margin-right: 30rpx;
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
  }
</style>
