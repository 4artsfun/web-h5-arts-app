<script setup>
import {onMounted, ref, watch} from 'vue';
import LuBtn from "../../components/lu-btn/lu-btn";
import {back, getAddressFormat, wait, navTo, home} from "../../common/js/util";
import {useStore} from 'vuex';
import {get} from "../../common/js/ajax";
const store = useStore();
const logout = async () => {
  await store.dispatch("logout")
  back();
}
onMounted(() => {
  getData();
})
let mintArr = ref(["", "", ""]);
let data = ref({art: '-', ent: '-'})
const getData = async () => {
  if(!store.state.friendAddress){
    home();
    return;
  }
  let res= await get('/user/asset')
  data.value = res;
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
</script>
<template>
  <view class="app">
    <image class="close" src="/static/images/account/close.png" @click="back"/>
    <view class="top">
      <image class="icon" src="/static/images/account/ton.png"/>
      <text>{{getAddressFormat(store.state.friendAddress)}}</text>
      <image class="exit" src="/static/images/account/exit.png" @click="logout"/>
    </view>
    <view class="box">
      <view class="item">
        <image src="/static/images/account/ent.png"/>
        <view class="name">
          <view class="name_t">
            <text>ENT</text>
            <text>(Entertainment Token)</text>
          </view>
          <view class="name_c">{{data.ent}}ENT</view>
        </view>
        <view class="value">$0.000</view>
      </view>
      <view class="item">
        <image src="/static/images/account/art.png?v=1"/>
        <view class="name">
          <view class="name_t">
            <text>ART</text>
            <text>(Ecological Token)</text>
          </view>
          <view class="name_c">{{data.art}}ART</view>
        </view>
        <view class="value">$0.000</view>
      </view>
    </view>
    <lu-btn text="BUY" @onConfirm="wait"/>
    <view class="identity">
      <view class="title">
        CHOOSING AN ECOLOGICAL IDENTITY
      </view>
      <view class="wrapper">
        <view class="item" @click="navTo('/pages/ecosystem/index?t=1')">
          <view class="section">
            <view class="cover">
              <view class="btn" :class="mintArr[0] && 'minted'">{{mintArr[0]? mintArr[0]: "Mint"}}</view>
            </view>
          </view>
          <view class="name">Entertainment agent</view>
        </view>
        <view class="item" @click="navTo('/pages/ecosystem/index?t=2')">
          <view class="section">
            <view class="cover">
              <view class="btn" :class="mintArr[1] && 'minted'">{{mintArr[1]? mintArr[1]: "Not Open"}}</view>
            </view>
          </view>
          <view class="name">CREATOR</view>
        </view>
        <view class="item" @click="navTo('/pages/ecosystem/index?t=3')">
          <view class="section">
            <view class="cover">
              <view class="btn" :class="mintArr[2] && 'minted'">{{mintArr[2]? mintArr[2]: "Not Open"}}</view>
            </view>
          </view>
          <view class="name">ENTERTAINER</view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.app{
  color: #fff;
  .identity{
    .title{
      font-size: 20rpx;
      font-family: font_Rubik;
      text-align: center;
      margin-top: 100rpx;
    }
    .wrapper{
      margin-top: 30rpx;
      padding: 0 40rpx;
      display: flex;
      justify-content: space-between;
      .item{
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
          height: 250rpx;
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
              font-family: font_Rubik;
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
        .name{
          height: 100rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 200rpx;
          text-align: center;
          text-shadow: 0 2rpx 4rpx #000;
          font-family: font_Rubik;
          font-size: 20rpx;
          line-height: 1.5;
        }
      }
    }
  }
  .box{
    padding: 20rpx 40rpx 40rpx;
    .item{
      display: flex;
      align-items: center;
      margin-top: 20rpx;
      image{
        width: 100rpx;
        height: 100rpx;
      }
      .name{
        padding-left: 20rpx;
        .name_t{
          text{
            &:first-child{
              color: #FFF;
              font-size: 28rpx;
              font-family: font_Rubik;
              padding-right: 10rpx;
            }
            color: rgba(255, 255, 255, 0.50);
            font-family: font_Fredoka;
            font-size: 20rpx;
          }
        }
        .name_c{
          color: rgba(255, 255, 255, 0.50);
          font-family: Rubik;
          font-size: 10px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
      }
      .value{
        flex:1;
        text-align: right;
        font-family: font_Fredoka;
        font-size: 30rpx;
      }
    }
  }
  .close{
    width: 40rpx;
    height: 40rpx;
    margin: 40rpx;
  }
  .top{
    padding-bottom: 20rpx;
    border-bottom: 1px solid #3C4C5A;
    display: flex;
    align-items: center;
    justify-content: center;
    .exit{
      width: 40rpx;
      height: 40rpx;
    }
    .icon{
      width: 80rpx;
      height: 80rpx;
    }
    text{
      padding: 0 20rpx;
      font-family: font_Rubik;
      font-size: 32rpx;
    }
  }
}
</style>
