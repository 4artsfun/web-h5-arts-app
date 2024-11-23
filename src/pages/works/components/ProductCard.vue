<script setup>
  import { useWorks } from '../hooks/works'
  const { getWorkType } = useWorks()

  defineProps({
    item: {
      type: Object,
      default: {}
    }
  })
  const emit = defineEmits(['like', 'redirect'])
</script>

<template>
  <view class="product-card">
    <view class="shadow-bg"></view>
    <view class="product-img">
      <img
        referrer="no-referrer"
        class="img-bg"
        mode="aspectFill"
        :src="item.cover_url"
      />
    </view>

    <div
      class="to-x"
      :class="{ act: item.is_shared }"
      @click.stop="emit('redirect', item)"
    >
      <div class="to-x-btn"></div>
      <div class="to-x-white"></div>
      <div class="x-num">
        {{ item.share_count || 0 }}
      </div>
    </div>

    <div class="work-type">
      <img
        class="work-type-icon"
        :src="`/static/images/works/product/${getWorkType(item.type).icon}.svg`"
      />
      <div class="work-type-text">
        {{ getWorkType(item.type).text }}
      </div>
    </div>

    <!-- <view
      class="favorite"
      :class="{ active: item.is_like === 1 }"
      @click.stop="emit('like', item)"
    >
      <view class="favorite-btn"></view>
      <view class="favorite-num">{{ item.like_count || 0 }}</view>
    </view> -->
    <view class="content">
      <view class="title">《{{ item.name }}》</view>
      <view class="creator">
        {{ item.names[0] }}{{ item.names[1] ? '/' : '' }}{{ item.names[1]
        }}{{ item.names[2] ? '/' : '' }}{{ item.names[2] }}
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
  .product-card {
    position: relative;
    z-index: 5;
    width: 220rpx;
    height: 320rpx;
    .shadow-bg {
      position: absolute;
      z-index: 6;
      bottom: 0;
      width: 100%;
      height: 272rpx;
      border-radius: 20rpx;
      box-shadow: 0px 0px 16rpx 0px rgba(228, 21, 153, 0.33) inset;
      filter: drop-shadow(0px 1.2rpx 2.6rpx rgba(0, 0, 0, 0.41));
      border: 2rpx solid #c81cc569;
    }
    .product-img {
      position: relative;
      z-index: 7;
      width: 200rpx;
      height: 300rpx;
      margin: 0 auto;
      .img-bg {
        width: 100%;
        margin-top: 10%;
        height: 90%;
        border-radius: 15rpx;
        object-fit: cover;
        background-color: #f5f5f5;
      }
    }

    .to-x {
      position: absolute;
      z-index: 8;
      top: 30rpx;
      left: 20rpx;
      width: 72rpx;
      height: 24rpx;
      border-radius: 40rpx;
      background: rgba(0, 0, 0, 0.4);
      display: flex;
      justify-content: center;
      align-items: center;
      &.act {
        background: #eb1484;
      }
      .to-x-btn {
        width: 17rpx;
        height: 16rpx;
        background: url('/static/images/works/to-x.png') no-repeat center /
          contain;
        margin-right: 10rpx;
      }
      .to-x-white {
        width: 17rpx;
        height: 16rpx;
        background: url('/static/images/works/to-x-white.png') no-repeat center /
          contain;
      }
      .x-num {
        position: absolute;
        z-index: 8;
        width: 100%;
        text-align: center;
        top: 20rpx;
        font-size: 20rpx;
        font-weight: 500;
        color: #ffffff;
        text-shadow: 0px 1px 1px rgba(35, 35, 35, 0.8);
      }
    }

    .work-type {
      position: absolute;
      z-index: 8;
      top: 20rpx;
      right: 20rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      .work-type-icon {
        margin-right: 10rpx;
        margin-top: 5rpx;
        width: 15rpx;
        height: 13rpx;
        filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(195deg)
          brightness(100%) contrast(103%)
          drop-shadow(0px 1px 1px rgba(35, 35, 35, 0.8));
      }
      .work-type-text {
        font-size: 16rpx;
        font-weight: 400;
        line-height: 38rpx;
        color: #fff;
        text-shadow: 0px 1px 1px rgba(35, 35, 35, 0.8);
      }
    }

    // .favorite {
    //   position: absolute;
    //   z-index: 8;
    //   top: 34rpx;
    //   right: 26rpx;
    //   .favorite-btn {
    //     width: 26rpx;
    //     height: 24rpx;
    //     background: url(@/static/img/market/favorite.png) no-repeat center;
    //     background-size: 100% 100%;
    //     margin: 0 auto;
    //   }
    //   .favorite-num {
    //     color: #fff;
    //     text-shadow: 0px 1.2rpx 1.2rpx #000;
    //     font-size: 16rpx;
    //     font-style: normal;
    //     font-weight: 400;
    //     line-height: normal;
    //     text-align: center;
    //   }
    //   &.active {
    //     .favorite-btn {
    //       background: url(@/static/img/market/favorite-active.png) no-repeat
    //         center;
    //       background-size: 100% 100%;
    //     }

    //     .favorite-num {
    //       background: var(
    //         --001,
    //         linear-gradient(
    //           146deg,
    //           #eb1484 13.16%,
    //           #c91cc3 99.99%,
    //           #c81cc5 100.86%,
    //           #c81cc5 101.73%
    //         )
    //       );
    //       background-clip: text;
    //       -webkit-background-clip: text;
    //       -webkit-text-fill-color: transparent;
    //       text-shadow: 0px 0px 4rpx #c81cc5;
    //     }
    //   }
    // }

    .content {
      position: absolute;
      z-index: 9;
      width: 188rpx;
      height: 80rpx;
      border-radius: 10rpx;
      border: 2rpx solid rgb(127 127 127 / 40%);
      background: linear-gradient(
        180deg,
        rgb(127 127 127 / 33%) 100%,
        rgb(217 217 217 / 63%) 20%
      );
      backdrop-filter: blur(10px);
      bottom: 14rpx;
      left: 0;
      right: 0;
      margin: 0 auto;
      padding: 10rpx;
      color: #fff;
      text-shadow: 0px 1.2rpx 2.6rpx rgba(0, 0, 0, 0.98);
      font-size: 16rpx;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      text-align: center;
      .title {
        font-family: font_Rubik;
        margin-bottom: 10rpx;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
      .creator {
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
    }
  }
</style>
