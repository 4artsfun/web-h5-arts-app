<template>
  <view class="lu-cls-ul-item" @click="confirm">
    <view class="lu-cls-title">{{ title }}</view>
    <text class="lu-cls-content" v-if="content">{{content}}</text>
    <text class="iconfont" v-else>&#xe611;</text>
  </view>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
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
.lu-cls-ul-item{
  background: #fff;
  display: flex;
  height: 110rpx;
  border-radius: 30rpx;
  margin: 30rpx 40rpx 0;
  align-items: center;
  justify-content: space-between;
  padding: 0 40rpx;
  .lu-cls-title{
    overflow: hidden;
    font-size: 30rpx;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .lu-cls-content{
    font-size: 30rpx;
    color: #999;
  }
  .iconfont{
    margin-left: 20rpx;
  }
}
</style>
