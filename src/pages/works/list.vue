<script setup>
  import { ref } from 'vue'
  import ProductCard from './components/ProductCard.vue'
  import { useShare } from './hooks/share'
  import { useWorks } from './hooks/works'
  const { loadList, navToProduct, getWorkType } = useWorks()
  const { getInviteUrl, shareX } = useShare()
  const list = ref([])
  const loadListFunc = async (params) => {
    const { data, total } = await loadList(params)
    if (params?.page === 1) {
      list.value = []
    }
    list.value = list.value.concat(data)
    return { data, total }
  }

  const redirect = (item) => {
    const url = getInviteUrl({ workId: item.id, type: item.type })
    shareX({ inviteUrl: url, workId: item.id })
    if (item.is_shared) {
      return
    }
    list.value = list.value.map((i) => {
      if (i.id === item.id) {
        i.is_shared = true
        i.share_count = (i.share_count || 0) + 1
      }
      return i
    })
  }

  defineExpose({ loadListFunc })
</script>

<template>
  <view class="product-list">
    <template v-for="(item, index) in list" :key="item.id">
      <view class="product-item">
        <view class="product-card-big" v-if="index % 6 === 0">
          <view class="shadow-bg"></view>
          <view class="product-img">
            <swiper
              class="swiper"
              :indicator-dots="true"
              autoplay
              indicator-color="#99999966"
              indicator-active-color="#eb1484"
              circular
              interval="5000"
              previous-margin="0rpx"
              next-margin="0rpx"
            >
              <swiper-item
                v-for="(leaf, leafIndex) in list.length > index + 6
                  ? 6
                  : list.length - index"
                @click="navToProduct(list[index + leafIndex])"
              >
                <img
                  loading="lazy"
                  referrer="no-referrer"
                  class="img-bg"
                  mode="aspectFill"
                  :src="list[index + leafIndex].cover_url"
                />
                <div
                  class="to-x"
                  :class="{ act: list[index + leafIndex].is_shared }"
                  @click.stop="redirect(list[index + leafIndex])"
                >
                  <div class="to-x-btn"></div>
                  <div class="to-x-white"></div>
                  <div class="x-num">
                    {{ list[index + leafIndex].share_count || 0 }}
                  </div>
                </div>

                <div class="work-type">
                  <img
                    class="work-type-icon"
                    :src="`/static/images/works/product/${
                      getWorkType(list[index + leafIndex].type).icon
                    }.svg`"
                  />
                  <div class="work-type-text">
                    {{ getWorkType(list[index + leafIndex].type).text }}
                  </div>
                </div>

                <!-- <view
                class="favorite"
                :class="list[index + leafIndex].is_like === 1 && 'active'"
                @click.stop="like(list[index + leafIndex])"
              >
                <view class="favorite-btn"></view>
                <view class="favorite-num">{{
                  list[index + leafIndex].like_count || 0
                }}</view>
              </view> -->
                <view
                  class="content"
                  :class="{ 'hover-desc': list[index + leafIndex].hoverDesc }"
                >
                  <view class="title">
                    《{{ list[index + leafIndex].name }}》
                  </view>
                  <view class="creator">
                    {{ list[index + leafIndex].names[0] }}
                    {{ list[index + leafIndex].names[1] ? '/' : ''
                    }}{{ list[index + leafIndex].names[1] }}
                    {{ list[index + leafIndex].names[2] ? '/' : ''
                    }}{{ list[index + leafIndex].names[2] }}
                  </view>
                  <view
                    class="brief"
                    @click.stop="
                      list[index + leafIndex].hoverDesc =
                        !list[index + leafIndex].hoverDesc
                    "
                  >
                    {{ list[index + leafIndex].description }}
                  </view>

                  <img
                    class="desc-top"
                    src="/static/images/works/desc-top.svg"
                  />
                </view>
              </swiper-item>
            </swiper>
          </view>
        </view>
      </view>
      <ProductCard
        class="card-small"
        @redirect="redirect"
        @click="navToProduct(item)"
        :item="item"
      />
    </template>
  </view>
</template>

<style lang="scss" scoped>
  ::v-deep {
    uni-swiper-item {
      overflow: visible;
    }
    .uni-swiper-dots-horizontal {
      z-index: 7;
      right: unset;
      bottom: unset;
      top: calc(100% + 26rpx);
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .uni-swiper-wrapper {
      overflow: visible;
    }
  }

  .product-list {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    padding: 0 30rpx;
    margin-top: -16rpx;
    .product-item {
      margin-bottom: 24rpx;
    }
    .card-small {
      margin-right: 14rpx;
      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
  .product-card-big {
    position: relative;
    z-index: 5;
    width: 640rpx;
    height: 940rpx;
    .shadow-bg {
      position: absolute;
      z-index: 6;
      bottom: 0;
      width: 100%;
      height: 800rpx;
      border-radius: 50rpx;
      box-shadow: 0px 0px 16rpx 0px rgba(228, 21, 153, 0.33) inset;
      filter: drop-shadow(0px 1.2rpx 2.6rpx rgba(0, 0, 0, 0.41));
      border: 2rpx solid #c81cc569;
    }

    .product-img {
      position: relative;
      z-index: 7;
      width: 592rpx;
      height: 100%;
      margin: 0 auto;
      overflow-y: hidden;
      overflow-x: visible;
      .swiper {
        height: 890rpx;
      }
      .img-bg {
        object-fit: cover;
        width: 100%;
        margin-top: 10%;
        height: 90%;
        border-radius: 52rpx;
        background-color: #f5f5f5;
      }
    }

    .to-x {
      position: absolute;
      z-index: 8;
      top: 90rpx;
      left: 30rpx;
      width: 120rpx;
      height: 40rpx;
      border-radius: 40rpx;
      background: rgba(0, 0, 0, 0.4);
      display: flex;
      justify-content: center;
      align-items: center;
      &.act {
        background: #eb1484;
      }
      .to-x-btn {
        width: 26rpx;
        height: 24rpx;
        background: url('/static/images/works/to-x.png') no-repeat center /
          contain;
        margin-right: 10rpx;
      }
      .to-x-white {
        width: 26rpx;
        height: 24rpx;
        background: url('/static/images/works/to-x-white.png') no-repeat center /
          contain;
      }
      .x-num {
        position: absolute;
        z-index: 8;
        width: 100%;
        text-align: center;
        top: 40rpx;
        font-size: 24rpx;
        font-weight: 500;
        color: #ffffff;
        text-shadow: 0px 1px 1px rgba(35, 35, 35, 0.8);
      }
    }

    .work-type {
      position: absolute;
      z-index: 8;
      top: 90rpx;
      right: 30rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      .work-type-icon {
        margin-right: 10rpx;
        margin-top: 2rpx;
        width: 28rpx;
        height: 24rpx;
        filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(195deg)
          brightness(100%) contrast(103%)
          drop-shadow(0px 1px 1px rgba(35, 35, 35, 0.8));
      }
      .work-type-text {
        font-size: 32rpx;
        font-weight: 400;
        line-height: 38rpx;
        color: #fff;
        text-shadow: 0px 1px 1px rgba(35, 35, 35, 0.8);
      }
    }

    // .favorite {
    //   position: absolute;
    //   z-index: 8;
    //   top: 90rpx;
    //   left: 48rpx;
    //   .favorite-btn {
    //     width: 46rpx;
    //     height: 44rpx;
    //     background: url(@/static/img/market/favorite.png) no-repeat center;
    //     background-size: 100% 100%;
    //     margin: 0 auto;
    //   }

    //   .favorite-num {
    //     text-align: center;
    //     color: #fff;
    //     text-shadow: 0px 4rpx 4rpx #000;
    //     font-size: 40rpx;
    //     font-style: normal;
    //     font-weight: 400;
    //     line-height: normal;
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
      width: 560rpx;
      min-height: 186rpx;
      border-radius: 22rpx;
      border: 2rpx solid rgb(127 127 127 / 40%);
      background: linear-gradient(
        180deg,
        rgb(127 127 127 / 33%) 100%,
        rgb(217 217 217 / 63%) 20%
      );
      backdrop-filter: blur(10px);
      bottom: 0rpx;
      left: 0;
      right: 0;
      margin: 0 auto;
      padding: 10rpx 18rpx;
      color: #fff;
      text-shadow: 0px 4rpx 8rpx rgba(0, 0, 0, 0.98);
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      text-align: center;

      .title {
        font-size: 30rpx;
        font-weight: 600;
        margin-bottom: 10rpx;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
      .brief {
        position: relative;
        z-index: 10;
        padding: 25rpx 0 0rpx;
        font-size: 20rpx;
        line-height: 28rpx;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
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

      .desc-top {
        position: absolute;
        z-index: 11;
        width: 24rpx;
        height: 14rpx;
        bottom: -7rpx;
        left: 50%;
        transform: translateX(-50%);
      }
      &.hover-desc {
        .brief {
          -webkit-line-clamp: 20;
        }
        .desc-top {
          transform: translateX(-50%) rotate(180deg);
        }
      }
    }
  }
</style>
