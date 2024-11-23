<script setup>
  import { ref } from 'vue'

  const direction = ref('pic')

  const emit = defineEmits(['change'])
  const changeActive = (type) => {
    direction.value = type
    emit('change', type)
  }

  const props = defineProps({
    showTab: {
      type: Boolean,
      default: true
    }
  })
</script>

<template>
  <view class="income-bar">
    <view
      class="title"
      :class="{ active: direction === 'pic' }"
      @click="changeActive('pic')"
    >
      INCOME
    </view>
    <view class="btn-list" v-if="showTab">
      <view class="btn" @click="changeActive('form')">upload</view>
      <view class="btn" @click="changeActive('list')">finished list</view>
      <view
        class="active-line"
        :class="{
          left: direction === 'form',
          right: direction === 'list',
          active: direction !== 'pic'
        }"
      ></view>
    </view>
  </view>
</template>

<style scoped lang="scss">
  .income-bar {
    padding-bottom: 10rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10rpx;
    .title {
      font-size: 24rpx;
      font-weight: bold;
      color: #ffffff;
      &.active {
        color: #e31481;
      }
    }

    .btn-list {
      position: relative;
      display: flex;
      align-items: center;
      width: 372rpx;
      height: 48rpx;
      border-radius: 12rpx;
      border: 1px solid #7f7f7f;
      overflow: hidden;

      .btn {
        width: 186rpx;
        font-size: 24rpx;
        font-weight: 700;
        text-align: center;
        color: #ffffffcc;
        z-index: 2;
      }

      .active-line {
        position: absolute;
        z-index: 1;
        width: 186rpx;
        height: 48rpx;
        border-radius: 12rpx;
        background: #d9d9d91a;
        &.active {
          background: #e31481;
        }
        &.left {
          left: 0;
        }

        &.right {
          right: 0;
        }
      }
    }
  }
</style>
