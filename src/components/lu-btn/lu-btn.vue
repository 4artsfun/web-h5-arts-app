<template>
  <view class="lu-cls-btn" :class="{disabled}" :style="myStyle" @click.stop="confirm">
    <rich-text v-if="icon" :nodes="icon" :style="{fontSize: iconSize + 'rpx'}" class="iconfont"></rich-text>
    <text>{{ text }}</text>
    <lu-loading/>
  </view>
</template>

<script setup>

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  iconSize: {
    type: Number,
    default: 32
  },
  disabled: {
    type: Boolean,
    default: false
  },
  myStyle: {
    type: Object,
    default: {}
  },
})
const emit = defineEmits(['onConfirm']);
const confirm = () => {
  if (props.disabled) {
    return;
  }
  emit('onConfirm');
}
</script>

<style scoped lang='scss'>
.lu-cls-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 660rpx;
  height: 100rpx;
  margin: 0 auto;
  color: #fff;
  border-radius: 50rpx;
  background: linear-gradient(90deg, #05FAEA -75.76%, #7E00F5 154.55%);
  position: relative;
  font-family: font_Rubik;
  font-size: 28rpx;
  line-height: normal;
  &.disabled {
    background: #aaa;
  }
  .iconfont {
    margin-right: 10rpx;
  }
}
</style>
