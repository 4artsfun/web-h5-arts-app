<script setup>
  import { ref, nextTick } from 'vue'
  import {onLoad} from "@dcloudio/uni-app";
  import IdentifyList from './components/IdentifyList.vue'
  import Dao from './dao.vue'
  import Channel from './Channel.vue'
  import Creator from './Creator.vue'
  import Entertainer from './Entertainer.vue'
  import Nav from "../common/nav";
  const identifyActive = ref(0)
  const selectIdentify = (index) => {
    identifyActive.value = index
  }
  onLoad((option) => {
    if(option.t){
      identifyActive.value = option.t * 1;
    }
  })
  const scrollShadow = ref(false)
  const scrollToBottom = () => {
    if(identifyActive.value === 0){
        dao.value.loadList(false);
    }
  }
  const dao = ref();
  const scrollTop = ref(0);
  const oldScrollTop = ref(0);
  const scroll = (e) => {
    scrollShadow.value = e.detail.scrollTop > 0
    if(identifyActive.value === 0){
      if(e.detail.scrollTop > 600){
        dao.value.fixed(true);
      }else{
        dao.value.fixed(false);
      }
      if(e.detail.scrollTop > 1200){
        dao.value.showToTop(true);
      }else{
        dao.value.showToTop(false);
      }
    }
    oldScrollTop.value = e.detail.scrollTop
  }
  const toTop = () => {
    scrollTop.value = oldScrollTop.value
    nextTick(() => {
      scrollTop.value  = 0
    });
  }
</script>

<template>
  <scroll-view scroll-with-animation :scroll-top="scrollTop" scroll-y style="height: 100vh;" @scroll="scroll" @scrolltolower="scrollToBottom">
    <Nav :selIndex="2" :scrollShadow="scrollShadow" />
    <view class="introduce-bg">
      <view class="mask">
        <view class="flex-box">
          <view class="flex-text-content">
            <view class="introduce-title">
              LET'S MINT AN IDENTITY AND EARN REVENUE!
            </view>
            <view class="introduce-text">
              The RWA products belong to the copyright owner of the work, and part belongs to the creator.
            </view>
          </view>
          <view class="introduce-human"></view>
        </view>

        <view class="pixel-arrow"></view>
      </view>
    </view>
    <view class="page-content">
      <view class="identify-title">SELECT IDENTIFY</view>
      <IdentifyList :active="identifyActive" @change="selectIdentify" />
      <Dao @toTop="toTop" ref="dao" v-if="identifyActive === 0" />
      <Channel v-if="identifyActive === 1" />
      <Creator v-if="identifyActive === 2" />
      <Entertainer v-if="identifyActive === 3" />
    </view>
  </scroll-view>
</template>

<style scoped lang="scss">
  .introduce-bg {
    font-family: font_Fredoka;
    height: 820rpx;
    background: url(@/static/img/ecosystem/introduce.jpg) no-repeat center;
    background-size: auto 100%;
    .mask {
      margin-top: -288rpx;
      padding: 320rpx 50rpx 0;
      font-size: 24rpx;
      height: 100%;
      // background: linear-gradient(0deg, rgb(131 0 177 / 27%) -8.85%, rgb(78 23 59 / 12%) 106.89%);
      box-shadow: 0px 80px 60px 40px rgb(178 50 213 / 24%);
    }
  }

  .page-content {
    padding: 0 40rpx 50rpx;
    margin-top: 50rpx;
  }

  .flex-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .introduce-title {
    font-family: font_Rubik;
    font-size: 32rpx;
    line-height: normal;
    color: #ffffff;
    margin-bottom: 40rpx;
  }

  .introduce-text {
    font-size: 21rpx;
    line-height: 24rpx;
    color: #ffffff;
    margin-bottom: 15rpx;
    text-align: justify;
  }

  .flex-text-content {
    min-width: 350rpx;
  }
  .introduce-human {
    margin-left: 40rpx;
    max-width: 356rpx;
    min-width: 220rpx;
    height: 260rpx;
    background: url(@/static/img/ecosystem/introduce-human.png) no-repeat center;
    background-size: auto 100%;
    margin-top: -50rpx;
    transform: scale(1.2);
  }
  .pixel-arrow {
    width: 40rpx;
    height: 53rpx;
    background: url(@/static/img/ecosystem/pixel-arrow.png) no-repeat center;
    background-size: 100% 100%;
    margin: 120rpx auto 0;
  }

  .identify-title {
    font-family: font_Rubik;
    text-align: center;
    color: #ffffff;
    font-size: 24rpx;
    margin-bottom: 20rpx;
  }
</style>
