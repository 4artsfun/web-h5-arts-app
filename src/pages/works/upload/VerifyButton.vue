<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    status: {
      type: Number,
      default: ''
    }
  })

  // 1=Including(爬取中), 2=Error(爬取失败), 3=Success(爬取成功)'
  const typeList = [
    { name: 'Including', value: 1, className: 'verifying' },
    { name: 'Error', value: 2, className: 'error' },
    { name: 'Success', value: 3, className: 'success' }
  ]
  const findType = computed(() => {
    return typeList.find((item) => item.value === props.status)
  })
</script>

<template>
  <view class="verify-button">
    <button class="btn" :class="findType.className">
      {{ findType.name }}
    </button>
  </view>
</template>

<style scoped lang="scss">
  .verify-button {
    .btn {
      width: 166rpx;
      height: 60rpx;
      border-radius: 32rpx;
      background: rgba(0, 0, 0, 0.2);
      font-size: 24rpx;
      font-weight: 500;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;

      &.verifying {
        color: #ffc300;
        border: 2rpx solid #ffc300;
      }
      &.error {
        color: #ff5733;
        border: 2rpx solid #ff5733;
      }
      &.success {
        color: #52c41a;
        border: 2rpx solid #52c41a;
      }
    }
  }
</style>
