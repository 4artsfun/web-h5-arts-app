<script setup>
import {watch, ref} from "vue";
import {get, loading} from "../../../common/js/ajax";
import {useStore} from 'vuex';
import {msg} from "../../../common/js/util";
import {mintV2} from "../../../common/js/walletUtil";
import LuLoading from "../../../components/lu-loading/lu-loading";
const store = useStore();
defineProps({
  active: {
    type: Number,
    default: 1
  }
})
const emit = defineEmits(['change'])
const changeActive = (index) => {
  emit('change', index)
}

let mintArr = ref(["", "", ""]);
const getData = async () => {
  let res= await get('/user/asset')
  let arr = ["", "", ""];
  if(res.nft_list && res.nft_list.length > 0){
    res.nft_list.map((item) => {
      if(item.type === 1){
        arr[0] = item.nft_id;
      }
      if(item.type === 2){
        arr[1] = item.nft_id;
      }
      if(item.nftType === 3){
        arr[2] = item.nft_id;
      }
    })
  }
  mintArr.value = arr;
}
watch(() => store.state.friendAddress, (val) => {
  if(val){
    getData();
  }else{
    mintArr.value = ["", "", ""]
  }
}, {immediate: true})

const minting = ref(0);
watch(() => mintArr.value, (val) => {
  if(val[0]){
    minting.value = 2;
  }else{
    minting.value = 0;
  }
}, {immediate: true})

const beginMint = async () => {
  if(minting.value === 2){
    msg("had minted")
    return;
  }
  try{
    await mintV2('channel', minting);
    minting.value = 2
    mintArr.value[0] = "Minted";
  }catch (e){
    if(e.message !== "Mint is in progress."){
      minting.value = 0;
      loading.value = false;
    }
    console.log("error tx", e, e.message, typeof e.message);
    if(e.message.indexOf("InsufficientBalance") !== -1){
      msg("Insufficient balance");
    }else if(e.message.indexOf("Pop-up closed") !== -1 || e.message.indexOf("Reject request") !== -1 ){
      msg("You cancel the request");
    }else{
      msg(e.message);
    }
  }
}
</script>

<template>
  <view>
    <lu-loading />
    <view class="identify-list">
      <view class="item" :class="{ active: active === 1 }" @click="changeActive(1)">
        <view class="title">ENTERTAINMENT AGENT</view>
        <view class="section">
          <view class="cover">
            <view class="btn" :class="mintArr[0] && 'minted'" @click.stop="beginMint">{{mintArr[0]? mintArr[0]: "Mint"}}</view>
          </view>
        </view>
      </view>
      <view class="item" :class="{ active: active === 2 }" @click="changeActive(2)">
        <view class="title">CREATOR</view>
        <view class="section">
          <view class="cover">
            <view class="btn">Not Open</view>
          </view>
        </view>
      </view>
      <view class="item" :class="{ active: active === 3 }" @click="changeActive(3)">
        <view class="title">ENTERTAINER</view>
        <view class="section">
          <view class="cover">
            <view class="btn">Not Open</view>
          </view>
        </view>
      </view>
    </view>
    <view class="intro">
      With a {{active === 1? "channeler": active === 2? "creator": "entertainer"}} identity card, you can introduce entertainment works and
      earn ENT & ART token.
    </view>
  </view>
</template>

<style scoped lang="scss">
  .identify-list {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .active {
      .title {
        background: linear-gradient(149.62deg, #eb1484 -7.48%, #c81cc5 100.27%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .title {
      font-size: 16rpx;
      color: #ffffff;
      font-weight: bold;
      text-align: center;
      margin-bottom: 10rpx;
    }
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      &:nth-child(1){
        .section{
          background-image: url('/static/images/account/channel.png');
        }
      }
      &:nth-child(2){
        .section{
          background-image: url('/static/images/account/creator.png');
        }
      }
      &:nth-child(3){
        .section{
          background-image: url('/static/images/account/entertainer.png');
        }
      }
      .section{
        background-repeat: no-repeat;
        background-size: 100% 100%;
        width: 180rpx;
        height: 264rpx;
        position: relative;
        border-radius: 20rpx;
        overflow: hidden;
        .cover{
          position: absolute;
          bottom: 0;
          left: 0;
          height: 60rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          background: rgba(196, 196, 196, 0.20);
          backdrop-filter: blur(4px);
          .btn{
            &.minted{
              background: transparent;
            }
            font-family: font_Fredoka;
            color: #fff;
            width: 150rpx;
            height: 40rpx;
            font-size: 20rpx;
            border-radius: 14rpx;
            background: linear-gradient(139deg, #4715EB -9.48%, #6C1CC7 188.6%);
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
  }
  .intro {
    color: #ffffff;
    font-size: 20rpx;
    line-height: 24rpx;
    text-align: justify;
    margin: 30rpx 0;
  }
</style>
