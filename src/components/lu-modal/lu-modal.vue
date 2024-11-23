<template>
  <view class="lu-cls-pop-box"  v-if="show">
    <view class="lu-cls-pop-content">
      <text class="lu-cls-title" v-if="title">{{ title }}</text>
      <view class="lu-cls-con">
        <text class="lu-cls-text">{{ content }}</text>
      </view>
      <view class="lu-cls-input-item-input" v-if="placeholder">
        <input :maxlength="maxlength" :type="type" :value="modelValue" @input="updateModel" :placeholder="placeholder"/>
      </view>
      <view class="lu-cls-button-box">
        <view class="lu-cls-item-button" @click="cancel" v-if="showCancel">{{cancelGlobalText}}</view>
        <view class="lu-cls-item-button lu-cls-confirm" @click="confirm">
          {{confirmGlobalText}}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import {ref, computed} from 'vue';
const show = ref(false);

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  maxlength: {
    type: Number,
    default: 1000
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  confirmText: {
    type: String,
    default: ''
  },
  cancelText: {
    type: String,
    default: ''
  },
  showCancel: {
    type: Boolean,
    default: true
  },
  confirmHold: {
    type: Boolean,
    default: false
  }
})
const confirmGlobalText = computed(() => {
  return props.confirmText || "Confirm"
})
const cancelGlobalText = computed(() => {
  return props.cancelText || "Cancel"
})
const emit = defineEmits(['onConfirm', 'onCancel', 'onUpdateModel']);
const updateModel = (e) => {
  emit('onUpdateModel', e.detail.value);
}
const close = () => {
  show.value = false;
}
const open = () => {
  show.value = true;
}
const cancel = () => {
  close();
  emit('onCancel');
}
const confirm = () => {
  if(!props.confirmHold){
    close();
    emit('onConfirm');
  }else{
    emit('onConfirm', close);
  }
}

defineExpose({open})
</script>

<style scoped lang='scss'>
.lu-cls-input-item-input{
  width: 400rpx;
  height: 100rpx;
  background: $input-bg;
  padding: 0 60rpx;
  border-radius: 50rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  input{
    font-size: 30rpx;
    text-align: center;
    flex: 1;
  }
}
.lu-cls-pop-box {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.lu-cls-pop-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 540rpx;
  padding-top: 36rpx;
  background-color: #2c343f;
  border-radius: 26rpx;
  overflow: hidden;
  .lu-cls-title {
    font-size: 32rpx;
    color: #fff;
    line-height: 48rpx;
    font-weight: 700;
    padding: 0 30rpx;
  }
  .lu-cls-con {
    padding: 60rpx 40rpx 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .lu-cls-text {
    width: 460rpx;
    font-size: 30rpx;
    color: #fff;
    line-height: 40rpx;
    text-align: center;
  }
}
.lu-cls-button-box {
  display: flex;
  margin-top: 64rpx;
  justify-content: space-between;
  margin-bottom: 30rpx;
  padding: 0 10rpx;

  .lu-cls-item-button {
    width: 200rpx;
    height: 80rpx;
    background: #3c4b5d;
    border-radius: 40rpx;
    font-size: 32rpx;
    font-weight: 500;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    &:nth-child(2){
      margin-left: 40rpx;
    }
    &.lu-cls-confirm{
      color:#fff;
      background: rgb(235, 47, 150);
    }
  }
}
</style>
