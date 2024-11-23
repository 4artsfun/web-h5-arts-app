<script setup>
import { ref } from 'vue'
import Nav from '../common/nav'
import { usePageScroll } from '../common/menu.js'
const { scroll, scrollShadow } = usePageScroll()
</script>
<template>
  <scroll-view scroll-y style="height: 100vh;" @scroll="scroll" class="app">
    <Nav :selIndex="1"  :scrollShadow="scrollShadow" />
    <lu-back />
    <view class="title">STRUCTURE</view>
    <!-- <view class="content">
      The 4ARTS Ecosystem thrives on the dynamic engagement of participants such as distributors, creators, and entertainer. It utilizes a spectrum of assets, encompassing the $ENT token for entertainment, the foundational $ART token for ecosystem activities, plus interest bearing entertainment offerings and stable RWA assets.
    </view>
    <view class="content">
      As users assume specialized roles and deepen their involvement, they boost their contribution tier, thereby ascending within the ecosystem's hierarchy and unlocking greater rewards.
    </view> -->
    <view class="all">
      <image mode="widthFix" src="/static/images/structure/summary.png?v=2"/>
    </view>
  </scroll-view>
</template>

<style scoped lang="scss">
.app{
  color: #fff;
  .title{
    padding: 20rpx 40rpx;
    text-align: right;
    font-family: font_Rubik;
    font-size: 36rpx;
  }
  .content{
    padding: 0 40rpx 20rpx;
    color: #FFF;
    font-family: font_Fredoka;
    font-size: 24rpx;
    font-style: normal;
    font-weight: 500;
    line-height: 1.3;
  }
  .all{
    width: 670rpx;
    margin: 40rpx auto;
    padding-bottom: 40rpx;
    text-align: center;
  }
}
</style>
