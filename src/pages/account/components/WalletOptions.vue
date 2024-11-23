<script setup>
  import { useWalletSelect } from '../hooks/walletSelect'
  // prettier-ignore
  const {
    openTonWallet,
    openEvmWallet,
    connectEvm,
    connectSolWallet,
    enableConnectors,
    aim 
  } = useWalletSelect()

  const changeChain = (chain) => {
    if (chain === 'ton') {
      openTonWallet()
    } else if (chain === 'sol') {
      connectSolWallet(true)
    } else {
      openEvmWallet(chain)
    }
  }
  defineExpose({ changeChain })
</script>

<template>
  <view>
    <view class="wallet-list">
      <view class="item" @click="openTonWallet">
        <image
          class="wallet-icon"
          mode="heightFix"
          src="/static/images/network/ton.png"
          alt="TON"
        />
        <view class="wallet-name">Ton Chain</view>
        <view class="wallet-select"></view>
      </view>
      <view class="item" @click="openEvmWallet('eth')">
        <image
          class="wallet-icon"
          mode="heightFix"
          src="/static/images/network/eth.png"
          alt="ETH"
        />
        <view class="wallet-name">Ethereum</view>
        <view class="wallet-select"></view>
      </view>
      <view class="item" @click="openEvmWallet('bnb')">
        <image
          class="wallet-icon"
          mode="heightFix"
          src="/static/images/network/bnb.png"
          alt="BNB"
        />
        <view class="wallet-name">BNB Chain</view>
        <view class="wallet-select"></view>
      </view>
      <view class="item" @click="connectSolWallet(true)">
        <image
          class="wallet-icon"
          mode="heightFix"
          src="/static/images/network/sol.png"
          alt="SOL"
        />
        <view class="wallet-name">Solana</view>
        <view class="wallet-select"></view>
      </view>
    </view>
    <view class="modal" v-if="aim === 1">
      <view class="evmWallets">
        <view class="sub_btn" @click="aim = 0" data-tc-icon-button="true">
          <!-- prettier-ignore -->
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.71966 2.71968C3.01255 2.42678 3.48743 2.42677 3.78032 2.71966L8.00002 6.93925L12.2197 2.71967C12.5126 2.42677 12.9874 2.42678 13.2803 2.71967C13.5732 3.01257 13.5732 3.48744 13.2803 3.78033L9.06068 7.99991L13.2803 12.2197C13.5732 12.5126 13.5732 12.9874 13.2803 13.2803C12.9874 13.5732 12.5126 13.5732 12.2197 13.2803L8.00002 9.06057L3.78033 13.2803C3.48744 13.5732 3.01257 13.5732 2.71967 13.2803C2.42678 12.9874 2.42677 12.5126 2.71967 12.2197L6.93936 7.99991L2.71968 3.78034C2.42678 3.48745 2.42677 3.01257 2.71966 2.71968Z" fill="#7A8999"></path>
          </svg>
        </view>
        <view class="sub_title">Connect your wallet</view>
        <view class="sub_list">
          <view
            class="sub_item"
            v-for="connector in enableConnectors"
            :key="connector.uid"
            @click="connectEvm(connector)"
          >
            <view class="img">
              <img
                class="img-icon"
                :src="
                  connector.icon
                    ? connector.icon
                    : '/static/images/network/' +
                      connector.name.split(' ')[0] +
                      '.png'
                "
              />
            </view>
            <view class="name">{{ connector.name }}</view>
            <view class="status">{{
              connector.type === 'injected' ? 'Installed' : ''
            }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
  .wallet-list {
    font-family: Rubik;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-between;
    .item {
      display: flex;
      align-items: center;
      margin-bottom: 30rpx;
      cursor: pointer;
      width: 300rpx;
      height: 64rpx;
      border-radius: 40rpx;
      background: rgba(153, 153, 153, 0.4);
      backdrop-filter: blur(80px);
      padding: 0 30rpx;
      overflow: hidden;
      .wallet-select {
        width: 28rpx;
        height: 28rpx;
        display: block;
        background: url('/static/images/network/circle.png') no-repeat;
        background-size: 100% 100%;
      }
      &:hover {
        background: radial-gradient(
          145.29% 705.71% at -45.294117647058826% -218.57142857142856%,
          rgba(255, 0, 191, 1) 0%,
          rgba(89, 21, 235, 1) 100%
        );
        .wallet-select {
          background-image: url('/static/images/network/circle-sel.png');
        }
      }
      .wallet-icon {
        width: 32rpx;
        height: 32rpx;
      }
      .wallet-name {
        flex: 1;
        font-size: 28rpx;
        font-weight: 500;
        padding-left: 8rpx;
      }
    }
  }

  .modal {
    min-width: 700rpx;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .evmWallets {
    width: 650rpx;
    border-radius: 48rpx;
    background-color: #fff;
    padding: 40rpx;
    position: relative;
    .sub_btn {
      position: absolute;
      top: 32rpx;
      right: 32rpx;
      z-index: 1;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 64rpx;
      height: 64rpx;
      border-radius: 50%;
      background-color: #f0f0f0;
      border: none;
      cursor: pointer;
      transition: transform 0.125s ease-in-out;
    }
    .sub_title {
      margin-bottom: 40rpx;
      font-style: normal;
      font-weight: 700;
      font-size: 32rpx;
      line-height: 32rpx;
      text-align: center;
      color: #0f0f0f;
      cursor: default;
    }
    .sub_list {
      padding-top: 20rpx;
      overflow: scroll;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .sub_item {
        margin-bottom: 20rpx;
        width: 240rpx;
        height: 240rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        &:hover {
          transform: scale(1.05);
        }
        .img {
          background: #f0f0f0;
          width: 120rpx;
          height: 120rpx;
          border-radius: 32rpx;
          margin-bottom: 16rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          .img-icon {
            width: 80%;
            height: 80%;
            border-radius: 32rpx;
            object-fit: cover;
          }
        }
        .name {
          font-weight: 500;
          font-size: 28rpx;
          color: #0f0f0f;
          &.status {
            color: #6a7785;
          }
        }
      }
    }
  }
</style>
