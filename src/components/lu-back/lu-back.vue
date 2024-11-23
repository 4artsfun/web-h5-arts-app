<template>
  <view class="go-back" @click="back">
    <image class="go-back-img" src="/static/img/market/go-back.png" />
    <text class="go-back-text">go back</text>
  </view>
</template>

<script setup>
import {back} from "@/common/js/util";
</script>

<style scoped lang='scss'>
.go-back {
  padding: 20rpx 40rpx;
  .go-back-img {
    width: 36rpx;
    height: 32rpx;
  }
  .go-back-text {
    padding-left: 10rpx;
    color: #fff;
    text-align: justify;
    font-family: font_Fredoka;
    font-size: 24rpx;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-transform: uppercase;
  }
}
</style>
