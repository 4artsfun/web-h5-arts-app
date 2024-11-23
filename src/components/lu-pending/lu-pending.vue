<template>
  <view class="lu-cls-spinner">
    <view class="lu-cls-rect lu-cls-rect1"></view>
    <view class="lu-cls-rect lu-cls-rect2"></view>
    <view class="lu-cls-rect lu-cls-rect3"></view>
    <view class="lu-cls-rect lu-cls-rect4"></view>
    <view class="lu-cls-rect lu-cls-rect5"></view>
    <view class="lu-cls-rect lu-cls-rect6"></view>
    <view class="lu-cls-rect lu-cls-rect7"></view>
    <view class="lu-cls-rect lu-cls-rect8"></view>
    <view class="lu-cls-rect lu-cls-rect9"></view>
    <view class="lu-cls-rect lu-cls-rect10"></view>
  </view>
</template>

<style scoped lang="scss">
.lu-cls-spinner {
  height: 40rpx;
  .lu-cls-rect{
    background-color: $font-color;
    height: 100%;
    width: 10rpx;
    margin-right: 4rpx;
    display: inline-block;
    animation: sk-sketchDelay 1s infinite ease-in-out;
    &.lu-cls-rect1 {
      animation-delay: -1s;
    }
    &.lu-cls-rect2 {
      animation-delay: -0.9s;
    }
    &.lu-cls-rect3 {
      animation-delay: -0.8s;
    }
    &.lu-cls-rect4 {
      animation-delay: -0.7s;
    }
    &.lu-cls-rect5 {
      animation-delay: -0.6s;
    }
    &.lu-cls-rect6 {
      animation-delay: -0.5s;
    }
    &.lu-cls-rect7 {
      animation-delay: -0.4s;
    }
    &.lu-cls-rect8 {
      animation-delay: -0.3s;
    }
    &.lu-cls-rect9 {
      animation-delay: -0.2s;
    }
    &.lu-cls-rect10 {
      animation-delay: -0.1s;
    }
  }
}
@keyframes sk-sketchDelay {
  0%, 40%, 100% {
    transform: scaleY(0.6)
  }
  20% {
    transform: scaleY(1)
  }
}
</style>
