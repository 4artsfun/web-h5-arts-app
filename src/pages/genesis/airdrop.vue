<script setup>
import Nav from '../common/nav'
import {post} from "../../common/js/ajax";
import {msg, debounce, back, navTo} from "../../common/js/util";
import config from '../../common/js/config'
import {onLoad} from '@dcloudio/uni-app';
import {useStore} from "vuex";

const store = useStore();
import { ref, watch  } from 'vue'
const name = ref('')
const direction = ref('referral')
const changeActive = (type) => {
  direction.value = type
}
onLoad((option) => {
  if(option.t){
    direction.value = option.t;
  }
})
const tid = ref("");
const tLink = ref("");
const inviter = ref("");
const follower = ref("");
const add = async () => {
  if(!tid.value){
    msg("fill in the twitter username");
    return;
  }
  if(!tLink.value){
    msg("fill in the link to the retweeted tweet");
    return;
  }
  if(direction.value === 'referral' && !inviter.value){
    msg("fill in your referral’s twitter username");
    return;
  }
  if (direction.value === 'kol') {
    if (!follower.value) {
      msg("fill in your twitter follower count");
      return;
    }
    if(isNaN(follower.value * 1)){
      msg("twitter follower count is not correct, fill in a number");
      return;
    }
  }
  let params = {
    twitter_user_name: tid.value,
    twitter_link_url: tLink.value,
    type: direction.value === 'referral' ? 2 : 1
  };
  if(direction.value === 'referral'){
    params['referral_twitter_username'] = inviter.value;
  }else{
    params['twitter_follower_count'] = follower.value * 1;
  }
  let res = await post('/airdrop/submit', params);
  follower.value = "";
  inviter.value = "";
  tid.value = "";
  tLink.value = "";
  msg("Operate successfully")
  debounce(back);
}
import { usePageScroll } from '../common/menu.js'
const { scroll, scrollShadow } = usePageScroll()
</script>

<template>
  <scroll-view scroll-y style="height: 100vh;" @scroll="scroll">
    <Nav :sel-index="6" :scrollShadow="scrollShadow" />
    <view class="page-content">
      <view class="switch-btn-list">
        <view class="btn" @click="changeActive('kol')">KOL Airdrop</view>
        <view class="btn" @click="changeActive('referral')">
          Referral Airdrop
        </view>
        <view class="active-line" :class="{
          left: direction === 'kol',
          right: direction === 'referral'
        }"
        ></view>
      </view>
      <view class="now-time"></view>
      <view class="airdrop-card-bg">
        <view class="airdrop-card-list">
          <view class="card">
            <view class="flex-box">
              <view class="title"> Retweet the tweet </view>
              <view class="btn go" @click="navTo('https://x.com/4arts_cc/status/1810589939685572791?s=46')">GO</view>
            </view>
          </view>
          <view class="split-line"></view>
          <view class="card">
            <view class="flex-box">
              <view class="title"> Follow on Twitter </view>
              <view class="btn go" @click="navTo(config.artsTwitterUrl)">GO</view>
            </view>
          </view>
          <view class="split-line"></view>
          <view class="card">
            <view class="title"> Fill in your participation information</view>
            <view class="form-box" style="margin-top: 20rpx">
              <view class="form-item">
                <view class="label">Ton Wallet Address:</view>
                <input class="input" v-model="store.state.friendAddress" disabled />
              </view>
              <view class="form-item">
                <view class="label">Twitter Username:</view>
                <input class="input" v-model="tid" />
              </view>
              <view class="form-item">
                <view class="label">Link to the retweeted tweet:</view>
                <input class="input" v-model="tLink" />
              </view>
              <view class="form-item" v-if="direction === 'kol'">
                <view class="label">Your Twitter Follower Count:</view>
                <input class="input" v-model="follower" />
              </view>
              <view class="form-item" v-if="direction === 'referral'">
                <view class="label">Your Referral’s Twitter Username:</view>
                <input class="input" v-model="inviter" />
              </view>
            </view>
            <view class="form-submit">
              <view class="btn yes" @click="add">
                Submit
              </view>
              <view class="btn no" @click="back">Cancel</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<style scoped lang="scss">
  .page-content {
    padding: 0 40rpx 50rpx;
  }
  .switch-btn-list {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 82rpx;
    border-radius: 12rpx;
    border: 1px solid #7f7f7f;
    overflow: hidden;
    .btn {
      width: 50%;
      font-size: 28rpx;
      font-weight: 700;
      text-align: center;
      color: #ffffffcc;
      z-index: 2;
      align-content: center;
    }

    .active-line {
      position: absolute;
      z-index: 1;
      width: 50%;
      height: 82rpx;
      border-radius: 12rpx;
      background: #e31481;
      &.left {
        left: 0;
      }

      &.right {
        right: 0;
      }
    }
  }

  .now-time {
    font-size: 28rpx;
    font-weight: 700;
    text-align: center;
    color: #ffffffb0;
    margin: 26rpx 0;
  }

  .flex-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .airdrop-card-bg {
    height: 920rpx;
    background: url(@/static/img/genesis/airdrop-card-bg.png) no-repeat center;
    background-size: 100% 100%;
    border-radius: 24rpx;
    overflow: hidden;
    .airdrop-card-list {
      .card {
        padding: 40rpx 20rpx;
      }
      .title {
        font-size: 28rpx;
        font-weight: bold;
        line-height: 34rpx;
        color: #fff;
      }
      .btn {
        width: 110rpx;
        height: 60rpx;
        border-radius: 20rpx;
        font-size: 22rpx;
        font-weight: 700;
        text-align: center;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        &.go {
          background: linear-gradient(90deg, #05faea -75.76%, #7e00f5 154.55%);
        }
      }
    }

    .split-line {
      border: 10rpx solid #6d84ff66;
    }
    .form-box {
      .form-item {
        margin-bottom: 12rpx;
        .label {
          font-size: 18rpx;
          font-weight: 600;
          line-height: 20rpx;
          color: #fff;
          margin-bottom: 10rpx;
        }
        .input {
          box-sizing: initial;
          height: 24rpx;
          background: #e6e6e61a;
          padding: 12rpx 20rpx;
          font-size: 18rpx;
          font-weight: 400;
          line-height: 20rpx;
          color: #e31481;
        }
      }
    }

    .form-submit {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 40rpx;
      .btn {
        width: 260rpx;
        height: 80rpx;
        align-content: center;
        font-size: 28rpx;
        font-weight: 700;
        text-align: center;
        &.yes {
          background: #e31481;
        }
        &.no {
          background: linear-gradient(
            139.26deg,
            #4715eb -9.48%,
            #6c1cc7 188.6%
          );
        }
      }
    }
  }
</style>
