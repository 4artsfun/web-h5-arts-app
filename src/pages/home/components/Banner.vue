<template>
  <view class="banner">
    <swiper class="swiper" autoplay circular interval="5000" previous-margin="0rpx" next-margin="0rpx" @change="onSwiperChange">
      <swiper-item class="swiper-item">
        <!-- <image :class="{current: current === 0}" src="/static/images/home/banner1.png?v=2" mode="aspectFill" @click="navTo('/pages/genesis/index')" /> -->
        <image :class="{current: current === 0}" src="/static/images/home/banner1.png?v=2" mode="aspectFill" />
      </swiper-item>
      <swiper-item class="swiper-item">
        <image :class="{current: current === 1}" src="/static/images/home/banner2.png?v=2" mode="aspectFill" @click="navTo('/pages/bar/structure')" />
      </swiper-item>
      <swiper-item class="swiper-item">
        <image :class="{current: current === 2}" src="/static/images/home/banner3.png?v=2" mode="aspectFill" />
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup>
import {ref} from "vue";
import {navTo} from "../../../common/js/util";
const current = ref(0);
const onSwiperChange = (e) => {
  current.value = e.detail.current;
}
</script>

<style scoped lang="scss">
::v-deep{
  .uni-swiper-wrapper{
    overflow: visible;
  }
}
.banner {
  overflow: hidden;
  position: relative;
  margin: 0 auto;
  .swiper{
    margin: 0 auto;
    width: 600rpx;
    height: 600rpx;
    image{
      width: 600rpx;
      height: 600rpx;
      display: block;
      height: 100%;
      transform: scale(0.9);
      transition: transform .36s;
      &.current {
        transform: scale(1);
      }
    }
  }
}
</style>
