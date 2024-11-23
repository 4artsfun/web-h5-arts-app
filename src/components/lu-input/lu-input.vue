<template>
  <view class="lu-cls-input-item">
    <view v-if="title" class="lu-cls-input-item-title">{{title}}</view>
    <view class="lu-cls-input-item-input" v-if="type === 'password'">
      <input :type="eyes? 'text': 'password'"
             :value="modelValue"
             @input="updateModel"
             :placeholder="placeholder"/>
      <text class="iconfont" @click="eyes = !eyes" :class="eyes && 'open'">{{eyes? '&#xe8c7;': '&#xe625;'}}</text>
    </view>
    <view class="lu-cls-input-item-input select" v-else-if="type === 'select'" @click="confirm">
      <input type="text"
             disabled
             :value="modelValue"
             @input="updateModel"
             :placeholder="placeholder"/>
      <text class="iconfont">&#xe645;</text>
      <picker class="date-picker" mode="date"  :value="modelValue" :start="startDate" :end="endDate" @change="bindDateChange" />
    </view>
    <view class="lu-cls-input-item-input" v-else-if="type === 'code'">
      <input type="number"
             maxlength="6"
             :value="modelValue"
             @input="updateModel"
             :placeholder="placeholder"/>
      <view class="lu-cls-input-item-input-code">
        <lu-code action="find" :account="account"/>
      </view>
    </view>
    <view class="lu-cls-input-item-input" v-else>
      <input :type="type"
             :value="modelValue"
             @input="updateModel"
             :placeholder="placeholder"/>
      <view class="lu-cls-input-item-input-icon" @click="confirm">
        <rich-text class="iconfont" v-if="icon" :nodes="icon"></rich-text>
      </view>
    </view>
  </view>
</template>

<script setup>
import {ref} from 'vue';
const eyes = ref(false);

const getDate = (type) => {
  const date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (type === 'start') {
    year = year - 80;
  } else if (type === 'end') {
    year = year - 18;
  }
  month = month > 9 ? month : '0' + month;
  day = day > 9 ? day : '0' + day;
  return `${year}-${month}-${day}`;
}
const startDate = getDate('start');
const endDate = getDate('end');

const bindDateChange = (e) => {
  console.log(e.detail.value);
  updateModel(e);
}
const props = defineProps({
  account: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
})

const emit = defineEmits(['onConfirm', 'onUpdateModel']);
const updateModel = (e) => {
  emit('onUpdateModel', e.detail.value);
}
const confirm = () => {
  emit('onConfirm');
}
</script>

<style scoped lang='scss'>

.lu-cls-input-item{
  &-title{
    margin-top: 20rpx;
    padding-bottom: 10rpx;
    padding-left: 60rpx;
    font-size: 32rpx;
    font-weight: 500;
  }
  &-input{
    width: 590rpx;
    height: 100rpx;
    background: $input-bg;
    padding: 0 60rpx;
    border-radius: 50rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    &-icon{
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &.select{
      position: relative;
      .iconfont{
        font-size: 60rpx;
        position: relative;
        left: 10rpx;
      }
      .date-picker{
        top: 0;
        left: 0;
        position: absolute;
        width: 590rpx;
        height: 100rpx;
        opacity: 0;
      }
    }
    input{
      font-size: 28rpx;
      flex: 1;
    }
    .iconfont{
      &.open{
        color: $font-color;
      }
      font-size: 40rpx;
      margin-left: 20rpx;
    }
  }
}
</style>
