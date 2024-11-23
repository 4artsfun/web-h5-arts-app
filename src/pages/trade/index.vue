<script setup>
  import { ref } from 'vue'
  import {wait} from "../../common/js/util";
  import Tabs from './components/Tabs.vue'
  import Nav from "../common/nav";
  const tableData = [
    // { price: 100, amount: 1000, all: 10000 },
    // { price: 200, amount: 2000, all: 20000 }
  ]
  const menus1 = [
    { index: 1, name: 'Makers Trades' },
    { index: 2, name: 'Contract' }
  ]
  const menus2 = [
    { index: 1, name: 'Sell' },
    { index: 2, name: 'Buy' },
    { index: 3, name: 'History' }
  ]

  import { usePageScroll } from '../common/menu.js'
  const { scroll, scrollShadow } = usePageScroll()
</script>
<template>
  <scroll-view scroll-y style="height: 100vh;" @scroll="scroll">
    <Nav :sel-index="4" :scrollShadow="scrollShadow" />
    <view class="page-content">
      <view class="trade-tran shadow-bg mb16">
        <view class="input-bg" style="justify-content: space-around">
          <view class="center">
            <image class="icon" src="/static/img/trade/ent.png" />
            <text style="margin-left: 16rpx">ENT</text>
          </view>
          <view>/</view>
          <view class="center">
            <image class="icon" src="/static/img/trade/ton.png" />
            <text style="margin-left: 16rpx">TON</text>
          </view>
        </view>
        <view class="action-btn">
          <view class="btn center" @click="wait">Buy</view>
          <view class="btn center" @click="wait">Sell</view>
        </view>
        <view class="input-bg mb16">
          <view>Price:</view>
          <input class="num-input" />
          <view class="center">
            <text style="margin-right: 6rpx">ENT</text>
            <image class="icon" src="/static/img/trade/ent.png" />
          </view>
        </view>
        <view class="input-bg mb16">
          <view>Amout:</view>
          <input class="num-input" />
          <view class="center">
            <text style="margin-right: 6rpx">ENT</text>
            <image class="icon" src="/static/img/trade/ent.png" />
          </view>
        </view>

        <view class="balance-info">
          <view class="info-title">Balance:</view>
          <view class="info-item">
            <view class="title">Price range</view>
            <view class="value">ENT</view>
          </view>
          <view class="info-item">
            <view class="title">Order quantity</view>
            <view class="value">ENT</view>
          </view>
          <view class="info-item">
            <view class="title">Expected receipt</view>
            <view class="value">CB</view>
          </view>
          <view class="info-item">
            <view class="title">Estimated revenue</view>
            <view class="value">0.3%</view>
          </view>
        </view>

        <view class="tran-btn center" @click="wait">Transaction</view>
      </view>

      <view class="shadow-bg tabs1 mb16">
        <Tabs :menus="menus1" />
        <view class="table-box">
          <view class="table">
            <view class="table-tr">
              <view class="table-th">Price(ENT)</view>
              <view class="table-th">Amount(CB)</view>
              <view class="table-th">All(ENT)</view>
            </view>
            <view class="table-tr" v-for="(item, index) in tableData" :key="index">
              <view class="table-td">{{ item.price }}</view>
              <view class="table-td">{{ item.amount }}</view>
              <view class="table-td">{{ item.all }}</view>
            </view>
          </view>
        </view>
      </view>

      <view class="shadow-bg tabs2">
        <Tabs :menus="menus2" />

        <view class="history-list">
<!--          <view class="history-item">-->
<!--            <view class="flex-text">-->
<!--              <view class="title">Order issuer:</view>-->
<!--              <view class="value">aaaa</view>-->
<!--            </view>-->

<!--            <view class="flex-text">-->
<!--              <view class="title">ayment amount(CB):</view>-->
<!--              <view class="value">aaaa</view>-->
<!--            </view>-->

<!--            <view class="flex-text">-->
<!--              <view class="title">Amount received(ENT):</view>-->
<!--              <view class="value">aaaa</view>-->
<!--            </view>-->

<!--            <view class="flex-text">-->
<!--              <view class="title">Transaction release time:</view>-->
<!--              <view class="value">aaaa</view>-->
<!--            </view>-->

<!--            <view class="flex-text">-->
<!--              <view class="title">Operate:</view>-->
<!--              <view class="value">aaaa</view>-->
<!--            </view>-->
<!--          </view>-->
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<style scoped lang="scss">
  .page-content {
    padding: 0 40rpx 50rpx;
  }
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .mb16 {
    margin-bottom: 16rpx;
  }

  .shadow-bg {
    background: rgb(255 255 255 / 5%);
  }

  .trade-tran {
    height: 936rpx;
    padding: 50rpx;

    .input-bg {
      height: 96rpx;
      background: url('/static/img/trade/input-bg.png');
      background-size: 100% 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30rpx 20rpx;
      color: #fff;
      text-shadow: 0px 6rpx 6px rgba(0, 0, 0, 0.2);
      font-size: 28rpx;
      font-style: normal;
      font-weight: 400;
      line-height: normal;

      .icon {
        width: 60rpx;
        height: 60rpx;
      }

      .num-input {
        padding: 0 16rpx;
        text-align: right;
      }
    }

    .action-btn {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 40rpx 0;

      .btn {
        width: 270rpx;
        height: 72rpx;
        background: url('/static/img/trade/btn-bg.png');
        background-size: 100% 100%;

        color: #f8feff;
        font-size: 32rpx;
        font-style: normal;
        font-weight: 700;
      }
    }

    .balance-info {
      .info-title {
        color: #fff;
        font-size: 28rpx;
        font-style: italic;
        font-weight: 800;
        line-height: normal;
        margin-bottom: 16rpx;
      }
      .info-item {
        margin-bottom: 16rpx;
        color: #fff;
        text-shadow: 0px 6rpx 6rpx rgba(0, 0, 0, 0.2);
        font-size: 28rpx;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .value {
          font-weight: bold;
        }
      }
    }

    .tran-btn {
      height: 80rpx;
      border-radius: 20rpx;
      background: var(
        --1,
        linear-gradient(90deg, #05faea -75.76%, #7e00f5 154.55%)
      );
      color: #fff;
      font-size: 28rpx;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      margin-top: 54rpx;
    }
  }

  .table {
    display: table;
    width: 100%;
    border-collapse: collapse;
    overflow-x: scroll;
    min-height: 400rpx;
    .table-tr {
      display: table-row;
    }
    .table-th {
      display: table-cell;
      text-align: center;
      font-size: 20rpx;
      font-weight: 900;
      line-height: 24rpx;
      color: #ffffff;
      padding-bottom: 10rpx;
      padding-right: 20rpx;
      &:last-child {
        padding-right: 0;
      }
    }

    .table-td {
      display: table-cell;
      text-align: center;
      font-size: 20rpx;
      font-weight: 400;
      line-height: 24rpx;
      color: #ffffff;
      padding: 20rpx 0;
      padding-right: 20rpx;
      &:last-child {
        padding-right: 0;
      }
    }
  }

  .tabs1 {
    padding-top: 34rpx;
    .table-box {
      margin-top: 32rpx;
    }
  }

  .tabs2 {
    padding-top: 34rpx;
    .history-list {
      min-height: 400rpx;
      padding: 24rpx;
      .history-item {
        background: #f3f3f30f;
        padding: 26rpx 20rpx;
        margin-bottom: 24rpx;
        border-radius: 20rpx;

        .flex-text {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #fff;
          text-align: right;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 500;
          line-height: 20rpx;
          margin-bottom: 20rpx;
          &:last-child {
            margin-bottom: 0;
          }

          .title {
            flex-grow: 1;
            max-width: 316rpx;
          }
        }
      }
    }
  }
</style>
