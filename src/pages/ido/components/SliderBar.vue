<script setup>
  import { ref } from 'vue'
  const props = defineProps({
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    balance: {
      type: Number,
      default: 0
    },
    chain: {
      type: String,
      default: 'ton'
    },
    allowValue: {
      type: Number,
      default: 0
    }
  })
  const buyNumber = ref(0)

  const emit = defineEmits(['change'])
  const handleAfterChange = (value) => {
    emit('change', value)
  }
</script>

<template>
  <view>
    <view class="slider-box">
      <a-slider
        :min="min"
        :max="max"
        :step="chain === 'ton' ? 0.1 : 1"
        v-model:value="buyNumber"
        :tooltip-open="true"
        tooltipPlacement="top"
        :getTooltipPopupContainer="(trigger) => trigger?.parentNode"
        @afterChange="handleAfterChange"
      />
    </view>
    <div class="amount-num-flex">
      <view class="balance-num">
        Balance: {{ balance }}{{ chain === 'ton' ? 'TON' : 'USDT' }}
      </view>
      <view class="balance-num" v-if="chain === 'eth' || chain === 'bnb'">
        Approved: {{ allowValue }}USDT
      </view>
    </div>
  </view>
</template>

<style lang="scss" scoped>
  .slider-box {
    border: 2rpx solid transparent;
    border-radius: 50rpx;
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    background-image: linear-gradient(to right, #121541, #121541),
      linear-gradient(90deg, #4b93ff, #d844f0);
    margin: 0;
    height: 54rpx;
    padding: 0 70rpx 0 20rpx;

    ::v-deep .ant-slider {
      margin: 0;
      .ant-slider-track {
        background-color: transparent;
      }
      .ant-slider-rail {
        background-color: transparent;
      }
      .ant-slider-handle {
        inset-block-start: 0;
        &::after {
          width: 70rpx;
          height: 40rpx;
          margin-top: 5rpx;
          border-radius: 50rpx;
          box-shadow: unset;
          background: linear-gradient(90deg, #6f38e0 0%, #d160eb 100%);
          border: 2rpx solid #be8cff;
          inset-block-start: 0;
          inset-inline-start: 0;
        }
      }
    }
    ::v-deep .ant-slider-tooltip {
      top: -9rpx !important;
      z-index: 2;
      .ant-tooltip-inner {
        background-color: unset;
        box-shadow: unset;
        text-indent: 50rpx;
        font-size: 28rpx;
        line-height: 40rpx;
      }
      .ant-tooltip-arrow {
        display: none;
      }
    }
  }
  .amount-num-flex {
    display: flex;
    justify-content: space-between;
  }

  .balance-num {
    font-size: 16rpx;
    color: rgba(255, 255, 255, 0.5);
    margin-top: 8rpx;
  }
</style>
