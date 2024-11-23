<script setup>
  import { navTo } from '../../../common/js/util'
</script>

<template>
  <div class="identity-list">
    <div class="item">
      <div class="section">
        <div class="cover">
          <div class="title">
            AGENT <br />
            ROLE
          </div>
        </div>
      </div>
      <div class="btn" @click="navTo('/pages/ecosystem/index?t=1')">Mint</div>
    </div>
    <div class="item">
      <div class="section">
        <div class="cover">
          <div class="title">
            CREATOR <br />
            ROLE
          </div>
        </div>
      </div>
      <div class="btn disabled" @click="navTo('/pages/ecosystem/index?t=2')">
        Not Open
      </div>
    </div>
    <div class="item">
      <div class="section">
        <div class="cover">
          <div class="title">
            ENTERTAINER <br />
            ROLE
          </div>
        </div>
      </div>
      <div class="btn disabled" @click="navTo('/pages/ecosystem/index?t=3')">
        Not Open
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .identity-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .item {
    flex-grow: 1;
    max-width: 200rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    &:nth-child(1) {
      .section {
        background-image: url('/static/images/account/channel.png');
      }
    }
    &:nth-child(2) {
      .section {
        background-image: url('/static/images/account/creator.png');
      }
    }
    &:nth-child(3) {
      .section {
        background-image: url('/static/images/account/entertainer.png');
      }
    }
    .section {
      position: relative;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      width: 196rpx;
      height: 276rpx;
      border: 2rpx solid rgba(255, 255, 255, 1);
      border-radius: 8rpx;
      overflow: hidden;
      margin-bottom: 16rpx;
      .cover {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 82rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        border-radius: 0 0 8rpx 8rpx;
        overflow: hidden;
      }
    }

    .title {
      font-size: 24rpx;
      font-weight: 500;
      line-height: 32rpx;
    }

    .btn {
      width: 160rpx;
      height: 40rpx;
      font-size: 28rpx;
      font-weight: 600;
      border-radius: 200rpx;
      background: linear-gradient(
        229.11deg,
        rgba(245, 39, 2, 1) 13.81%,
        rgba(255, 153, 0, 1) 100%
      );
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;

      &.disabled {
        opacity: 0.5;
      }
    }
  }
</style>
