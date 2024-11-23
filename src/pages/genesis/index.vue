<script setup>
import Nav from '../common/nav'
import {get} from "../../common/js/ajax";
import {ref, computed, watch, onUnmounted} from 'vue';
import {msg, navTo} from "../../common/js/util";
import ClaimDialog from './components/ClaimDialog.vue'
import {useStore} from 'vuex';
import { onHide, onShow, onUnload } from '@dcloudio/uni-app';
const store = useStore();
const claimDialogRef = ref(null)
const type = ref(0);
const isInit = ref(true);
const auditStatus = ref(-1); //-1 wait post | 0 wait check | 1 success | 2 rejected |  3 claim
const getData = async () => {
  let res = await get('/airdrop/userSubmitData')
  if(res){
    auditStatus.value =  res.status
    type.value = res.type;
  }
  isInit.value = true;
}

const token = computed(() => store.state.token)
const jumpClickIndex = ref(null)
const checkWalletLogin = async (index, token) => {
  if (token) {
    if (index === 1) {
      navTo("/pages/genesis/airdrop?t=kol")
    } else if (index === 2) {
      navTo("/pages/genesis/airdrop")
    }
  } else {
    await store.dispatch("openWallet");
  }
}
watch(token, (val) => {
  if (val) {
    getData()
    checkWalletLogin(jumpClickIndex.value, val)
  } else {
    auditStatus.value = -1;
    type.value = 0;
  }
}, { immediate: false })

const jump = (index) => {
  // msg("Coming Soon");
  // return false;

  if(index === 1){
    if(type.value === 2 && auditStatus.value !== -1){
      msg("you had attend the referral airdrop");
      return;
    }
    if(type.value === 1 && auditStatus.value === 0){
      msg("checking now");
      return;
    }
    if(type.value === 1 && auditStatus.value === 1){
      msg("It's not yet time to airdrop, please be patient and wait");
      return;
    }
  }else{
    if(type.value === 0 && auditStatus.value === -1) {
      navTo('https://t.me/dogarts_bot/dogdog')
      return;
    }
    if(type.value === 1 && auditStatus.value !== -1){
      msg("you had attend the kol airdrop");
      return;
    }
    if(type.value === 2 && auditStatus.value === 0){
      msg("checking now");
      return;
    }
    if(type.value === 2 && auditStatus.value === 1){
      msg("It's not yet time to airdrop, please be patient and wait");
      return;
    }
  }
  if(auditStatus.value === 3){
    claimDialogRef.value.showPopup();
  }else{
    jumpClickIndex.value = index
    checkWalletLogin(index, token.value)
  }
}
import { usePageScroll } from '../common/menu.js'
const { scroll, scrollShadow } = usePageScroll()

const kolCount = ref(0)
const kolFollowerCount = ref(0)
const referralCount = ref(0)
const referralInviteCount = ref(0)
const getReferralCount = async () => {
  let res = await get('/airdrop/dataStatistics')
  if(res){
    kolCount.value = res.kol_count;
    kolFollowerCount.value = res.total_influencers;
    referralCount.value = res.total_referees;
    referralInviteCount.value = res.total_participants;
  }
}

// 定时轮询
const timer = ref(null)
const startTimer = () => {
  timer.value = setInterval(() => {
    getReferralCount();
  }, 5000)
}
const stopTimer = () => {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
}

onShow(() => {
  // getData()
  getReferralCount()
  startTimer()
})
onUnload(() => {
  stopTimer()
})
onHide(() => {
  stopTimer()
})
onUnmounted(() => {
  stopTimer()
})
</script>

<template>
  <scroll-view scroll-y style="height: 100vh;" @scroll="scroll">
    <ClaimDialog ref="claimDialogRef" />
    <Nav :sel-index="6" :scrollShadow="scrollShadow" />
    <view class="page-content">

      <view class="title-bg">
        <view class="title-font"></view>
      </view>

      <view class="ent-flex-box mt20">
        <view class="text">
          <view class="title"> Welcome to the 4Arts Genesis Airdrop Program! </view>
          <view>
            We will offer a bonus pool of 10 million $ENT to thank our seed users for participating in the construction of the 4Arts ecosystem.
          </view>
        </view>
        <view class="ent-bg">
          <view class="ent-icon"></view>
        </view>
      </view>

      <view class="airdrop-card-bg">
        <view class="airdrop-card-list">
          <view class="card">
            <view class="title">① KOL Airdrop (EInfluencer Airdrop)</view>
            <view class="desc">
              5 million $ENT will be distributed to KOLs based on their Twitter follower count, with bonuses proportional to follower weight.
            </view>

            <view class="total-num-flex">
              <view class="total-item">
                <view class="total-title color-font" style="text-indent: 32rpx;">KOLs:</view>
                <view class="total-num color-font">{{ kolCount }}</view>
              </view>
              <view class="total-item">
                <view class="total-title color-font">Total Influencers:</view>
                <view class="total-num color-font">{{ kolFollowerCount }}</view>
              </view>
            </view>

              <view class="btn"
                    :class="
                      type === 1 && auditStatus === 0? 'wait':
                      type === 1 && auditStatus === 1? 'success':
                      type === 1 && auditStatus === 2? 'error':
                      type === 1 && auditStatus === 3? 'claim': 'go'
                    "
                    v-if="isInit" @click="jump(1)">{{
                  type === 1 && auditStatus === 0? 'PROCESSING':
                      type === 1 && auditStatus === 1? 'Verified Awaiting Airdrop':
                          type === 1 && auditStatus === 2? 'Failed Verification Please Retry':
                              type === 1 && auditStatus === 3? 'CLAIM $ENT': 'GO'
                }}</view>
          </view>
          <view class="split-line"></view>
          <view class="card">
            <view class="title">② Referral Airdrop</view>
            <view class="desc">
              5 million $ENT will be distributed based on the number of users invited via unique Twitter usernames.
            </view>

            <view class="total-num-flex">
              <view class="total-item">
                <view class="total-title color-font">Total Referees:</view>
                <view class="total-num color-font">{{ referralCount }}</view>
              </view>
              <view class="total-item">
                <view class="total-title color-font">Total Participants:</view>
                <view class="total-num color-font">{{ referralInviteCount }}</view>
              </view>
            </view>

            <view class="btn"
                  :class="
                      type === 2 && auditStatus === 0? 'wait':
                      type === 2 && auditStatus === 1? 'success':
                      type === 2 && auditStatus === 2? 'error':
                      type === 2 && auditStatus === 3? 'claim': 'go'
                    "
                  v-if="isInit" @click="jump(2)">{{
                type === 2 && auditStatus === 0? 'PROCESSING':
                    type === 2 && auditStatus === 1? 'Verified Awaiting Airdrop':
                        type === 2 && auditStatus === 2? 'Failed Verification Please Retry':
                            type === 2 && auditStatus === 3? 'CLAIM $ENT': 'GO'
              }}</view>
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
  .title-bg {
    height: 144rpx;
    background: url(@/static/img/genesis/title-bg.png) no-repeat center;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .title-font {
      width: 346rpx;
      height: 100rpx;
      flex-shrink: 0;
      background: url(@/static/img/genesis/title-font.png);
      background-size: 100% 100%;
    }

  }
  .mt20 {
    margin-top: 20rpx;
  }

  .ent-flex-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 34rpx;

    .text {
      font-size: 26rpx;
      line-height: 30rpx;
      text-align: left;
      color: #fff;
      flex-grow: 1;

      .title {
        font-size: 28rpx;
        line-height: 40rpx;
        font-weight: bold;
        background: linear-gradient(90deg, #05c5fa 25%, #00f5e4 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-align: left;
        padding-bottom: 16rpx;
      }
    }
    .ent-bg {
      min-width: 196rpx;
      height: 226rpx;
      background: url(@/static/img/genesis/ent-bg.png) no-repeat center;
      background-size: 100% 100%;
      margin-left: 10rpx;

      .ent-icon {
        width: 114rpx;
        height: 114rpx;
        background: url(@/static/img/genesis/ent-icon.png) no-repeat center;
        background-size: 100% 100%;
        margin: 10rpx auto 0;
      }
    }
  }

  .airdrop-card-bg {
    height: 842rpx;
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
        margin-bottom: 16rpx;
        background: linear-gradient(90deg, #05c5fa 25%, #00f5e4 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .desc {
        font-size: 20rpx;
        font-weight: 400;
        line-height: normal;
        text-align: justify;
        color: #B8B8B8;
        margin-bottom: 32rpx;
      }

      .total-num-flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20rpx;

        .total-item {
          width: 320rpx;
          height: 80rpx;
          background: url(@/static/img/genesis/total-num-bg.png);
          background-size: 100% 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 40rpx 10rpx 50rpx;

          .color-font {
            background: linear-gradient(90deg, #2FDAFF 0%, #428EFF 100%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .total-title {
            text-shadow: 0px 8rpx 8rpx rgba(0, 0, 0, 0.25);
            font-size: 20rpx;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            text-align: right;
            max-width: 124rpx;
          }
          .total-num {
            text-shadow: 0px 8rpx 8rpx rgba(0, 0, 0, 0.25);
            font-size: 32rpx;
            font-style: italic;
            font-weight: 700;
            line-height: normal;
          }
        }
      }

      .btn {
        width: 240rpx;
        height: 60rpx;
        border-radius: 20rpx;
        font-size: 22rpx;
        font-weight: 700;
        text-align: center;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 22rpx;

        &.go {
          background: linear-gradient(90deg, #05faea -75.76%, #7e00f5 154.55%);
        }
        &.wait {
          background: linear-gradient(
            151.46deg,
            #ff5e00 29.04%,
            #f2de7c 133.08%
          );
        }
        &.success {
          background: linear-gradient(
            139.26deg,
            #4715eb -9.48%,
            #6c1cc7 188.6%
          );
        }
        &.error {
          background: #e31446;
        }
        &.claim {
          background: linear-gradient(
            149.62deg,
            #eb1484 -7.48%,
            #c81cc5 100.27%
          );
        }
      }
    }

    .split-line {
      border: 10rpx solid #6d84ff66;
    }
  }
</style>
