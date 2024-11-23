<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'

  const props = defineProps({
    startTime: {
      type: Number,
      default: 0
    },
    endTime: {
      type: Number,
      default: 0
    }
  })

  const day = ref(0)
  const hour = ref(0)
  const minute = ref(0)
  const second = ref(0)

  let intervalId = null

  const calculateTimeLeft = () => {
    const now = Date.now()
    const difference = props.endTime - props.startTime
    const elapsed = now - props.startTime

    if (elapsed < difference) {
      const remaining = difference - elapsed
      day.value = Math.floor(remaining / (1000 * 60 * 60 * 24))
      hour.value = Math.floor((remaining / (1000 * 60 * 60)) % 24)
      minute.value = Math.floor((remaining / 1000 / 60) % 60)
      second.value = Math.floor((remaining / 1000) % 60)
    } else {
      day.value = 0
      hour.value = 0
      minute.value = 0
      second.value = 0
    }
  }

  onMounted(() => {
    calculateTimeLeft()
    intervalId = setInterval(calculateTimeLeft, 1000)
  })

  onUnmounted(() => {
    clearInterval(intervalId)
  })

  const formatTime = (time) => {
    return time.toString().padStart(2, '0')
  }
</script>

<template>
  <view>
    <view class="count">
      <view class="list">
        <view class="number">{{ formatTime(day) }}</view>
        <view class="unit">Days</view>
      </view>

      <view class="list">
        <view class="number">{{ formatTime(hour) }}</view>
        <view class="unit">Hours</view>
      </view>

      <view class="list">
        <view class="number">{{ formatTime(minute) }}</view>
        <view class="unit">Minutes</view>
      </view>

      <view class="list">
        <view class="number">{{ formatTime(second) }}</view>
        <view class="unit">Seconds</view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
  .count {
    display: flex;
    justify-content: center;
    align-items: center;

    .list {
      color: #fff;
      text-align: center;
      width: 100rpx;
      margin-left: 12rpx;
      &:first-child {
        margin-left: 0;
      }

      .number {
        border: 1px solid #fff;
        border-radius: 8rpx;
        font-size: 22rpx;
      }
      .unit {
        font-size: 24rpx;
      }
    }
  }
</style>
