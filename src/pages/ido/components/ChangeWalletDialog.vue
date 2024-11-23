<script setup>
  import { ref } from 'vue'
  import UniPopup from '@/components/uni-popup/uni-popup.vue'
  const popupRef = ref(null)
  const showTip = ref('')
  const showPopup = (tip) => {
    showTip.value = tip
    popupRef.value.open('center')
  }
  defineExpose({ showPopup })

  const emit = defineEmits(['confirm'])
  const confirmFnc = () => {
    emit('confirm', { val: showTip.value })
    popupRef.value.close()
  }
</script>

<template>
  <view>
    <UniPopup ref="popupRef" background-color="#060820">
      <view class="popup-content">
        <view class="dialog-text">
          <view class="content">
            Are you sure you want to switch to the {{ showTip }} blockchain?
          </view>
          <view class="desc">
            After switching, you will need to log out and log in again with a
            new blockchain wallet.
          </view>
        </view>

        <view class="btn-list">
          <view class="btn" @click="confirmFnc">Confirm</view>
          <view class="btn" @click="$refs.popupRef.close()">Cancel</view>
        </view>
      </view>
    </UniPopup>
  </view>
</template>

<style scoped lang="scss">
  .popup-content {
    width: 700rpx;
    height: 300rpx;
    border-radius: 26rpx;
    border: 2px solid #3c4c5a;
    background: #060820;
    padding: 20rpx 48rpx 0;
  }

  .dialog-text {
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    .content {
      font-size: 28rpx;
      padding: 20rpx 20rpx 10rpx;
      text-align: center;
    }
    .desc {
      font-size: 20rpx;
      color: rgba(128, 128, 128, 1);
      padding: 0 20rpx;
      text-align: center;
    }
  }

  .btn-list {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 30rpx auto 0;
    .btn {
      cursor: pointer;
      font-size: 24rpx;
      width: 160rpx;
      height: 60rpx;
      border-radius: 50rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(79, 27, 250, 0.4);
    }
  }
</style>
