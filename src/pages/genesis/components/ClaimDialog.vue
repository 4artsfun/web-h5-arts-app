<script setup>
  import { ref } from 'vue'
  import UniPopup from '@/components/uni-popup/uni-popup.vue'
  import {useStore} from 'vuex';
  import {get} from "../../../common/js/ajax";
  import {msg} from "../../../common/js/util";
  import {claimV2} from "../../../common/js/walletUtil";
  const store = useStore();
  const popupRef = ref(null)
  const showPopup = () => {
    popupRef.value.open('center')
    getData();
  }
  defineExpose({ showPopup })
  const isInit = ref(false);
  const income = ref(0);
  const isClaimed = ref(false);
  const pending = ref(false);;
  const claim = async () => {
    if(isClaimed.value){
      msg("you had claimed");
      return;
    }
    try{
      await claimV2(pending);
      pending.value = false;
      isClaimed.value = true;
    }catch (e){
      if(e.message !== "Claim is in progress."){
        pending.value = false;
      }
      console.log("error tx", e, e.message, typeof e.message);
      if(e.message.indexOf("InsufficientBalance") !== -1){
        msg("Insufficient balance");
      }else if(e.message.indexOf("Pop-up closed") !== -1
          || e.message.indexOf("Close PopUp") !== -1
          || e.message.indexOf("Reject request") !== -1
      ){
        msg("You cancel the request");
      }else{
        msg(e.message);
      }
    }
  }
  const getUserAsset = async () => {
    let res = await get('/user/asset')
    income.value = res.ent;
  }
  const checkIsClaim = async () => {
    let res = await get('/airdrop/isClaim')
    isClaimed.value = res.is_claim === 1;
  }
  const getData = async () => {
    await getUserAsset();
    await checkIsClaim();
    isInit.value = true;
  }
</script>

<template>
  <view>
    <UniPopup ref="popupRef" background-color="#060820">
      <view class="popup-content">
        <view class="close-btn" @click="$refs.popupRef.close()"></view>
        <view class="title-box">
          <view class="logo"></view>
          <view class="text">4Arts Genesis Airdrop Claim</view>
        </view>
        <view class="line"></view>
        <view class="desc">
          As of the snapshot time, your airdrop allocation is:
        </view>
        <view class="claim-info">
          <view class="num">{{income}}</view>
          <view class="unit">$ENT</view>
        </view>
        <view class="ent-bg">
          <view class="ent-icon"></view>
        </view>
        <view v-if="pending" class="click-btn" @click="claim">
          Claiming
        </view>
        <view v-else-if="isClaimed" class="click-btn claimed" @click="claim">
          Claimed
        </view>
        <view v-else-if="!isClaimed && income > 0" class="click-btn" @click="claim">
          Click to claim
        </view>
        <view v-else class="click-btn claimed">
          Wait to transfer ent
        </view>
      </view>
    </UniPopup>
  </view>
</template>

<style scoped lang="scss">
  .popup-content {
    width: 700rpx;
    height: 874rpx;
    border-radius: 13px;
    border: 2px solid #3c4c5a;
    background: #060820;
  }

  .close-btn {
    position: absolute;
    top: 40rpx;
    left: 40rpx;
    width: 36rpx;
    height: 36rpx;
    background: url(@/static/img/genesis/close.png) no-repeat center;
    background-size: 100% 100%;
  }

  .title-box {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 124rpx;

    .logo {
      width: 68rpx;
      height: 72rpx;
      background: url(@/static/img/genesis/logo.png) no-repeat center;
      background-size: 100% 100%;
      margin-right: 34rpx;
    }
    .text {
      color: #fff;
      text-shadow: 0px 4px 10px rgba(227, 20, 129, 0.37);
      font-size: 32rpx;
      font-style: italic;
      font-weight: 900;
      line-height: normal;
    }
  }
  .line {
    height: 2rpx;
    background: linear-gradient(0deg, #3c4c5a 0%, #3c4c5a 100%),
      linear-gradient(0deg, #3c4c5a 0%, #3c4c5a 100%), #3c4c5a;
    margin: 36rpx 0;
  }

  .desc {
    color: #d9d9d9;
    text-align: center;
    font-size: 24rpx;
    font-weight: 400;
    line-height: normal;
  }

  .claim-info {
    width: 530rpx;
    height: 88rpx;
    border-radius: 12rpx;
    border: 1px solid #7f7f7f;
    background: rgba(217, 217, 217, 0.1);
    backdrop-filter: blur(1.7372653484344482px);
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 28rpx;
    color: #fff;
    font-size: 32rpx;
    font-weight: 900;
    line-height: normal;
    padding: 24rpx;

    .num {
      font-style: italic;
    }
  }

  .ent-bg {
    width: 220rpx;
    height: 244rpx;
    background: url(@/static/img/genesis/ent-bg.png) no-repeat center;
    background-size: 100% 100%;
    margin: 50rpx auto 30rpx;

    .ent-icon {
      width: 114rpx;
      height: 122rpx;
      background: url(@/static/img/genesis/ent-icon.png) no-repeat center;
      background-size: 100% 100%;
      margin: 10rpx auto 0;
    }
  }

  .click-btn {
    &.claimed{
      background: #aaa;
    }
    width: 300rpx;
    height: 80rpx;
    line-height: 80rpx;
    color: #fff;
    font-size: 26rpx;
    font-weight: 700;
    text-align: center;
    border-radius: 12px;
    background: var(
      --1,
      linear-gradient(150deg, #eb1484 -7.48%, #c81cc5 100.27%)
    );
    margin: 0 auto;
  }
</style>
