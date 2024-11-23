<script setup>
  defineProps({
    status: {
      type: Number,
      default: ''
    }
  })
</script>

<template>
  <view class="verify-button">
    <button
      class="btn"
      :class="{
        verifying: status === 0,
        error: status === 2,
        success: status === 1
      }"
    >
      {{ status === 0? "Verifying": status === 1? "Success": "Error" }}
    </button>
  </view>
</template>

<style scoped lang="scss">
  .verify-button {
    .btn {
      width: 128rpx;
      height: 44rpx;
      border-radius: 12rpx;
      color: #ffffff;
      font-size: 20rpx;
      line-height: 44rpx;

      &.verifying {
        background: linear-gradient(310.89deg, #f2de7c -8.31%, #ff5e00 100%);
      }
      &.error {
        background: linear-gradient(
          146.07deg,
          #eb1484 13.16%,
          #c91cc3 99.99%,
          #c81cc5 100.86%,
          #c81cc5 101.73%
        );
      }
      &.success {
        background: linear-gradient(139.26deg, #4715eb -9.48%, #6c1cc7 188.6%);
      }
    }
  }
</style>
