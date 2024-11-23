<script setup>
import config from "../../common/js/config";
  import { ref } from 'vue'
  import {navTo} from "../../common/js/util";
  import Nav from "../common/nav";
  import {get, post} from "../../common/js/ajax";
  import {useStore} from 'vuex';
  const store = useStore();

  const follow = ref(false)
  import {onLoad} from '@dcloudio/uni-app';
  const data = ref({});
  const list = ref([]);
  const cdn = config.cdn;
  const isInit = ref(false);
  onLoad(async(option) => {
    //why not get instead of list?
    await getData(option.id, option.work_type);
    const listRes = await get('/work/hotList', {page: 1, page_size: 5}, {}, () => {e.endErr()});
    list.value = listRes.list;
    isInit.value = true;
  })
const getData = async (id, work_type) => {
  const res = await get('/work/detail', {
    work_id: id,
    work_type: work_type || 2
  }, {}, () => {e.endErr()});
  console.log('res', res)
  let result = res;
  result.names = res.creator_name.split(",");
  data.value = result;
}

const like = async () => {
  let res = await post('/work/action', {
    work_id: data.value.id,
    action: 3
  });
  getData();
}

import { usePageScroll } from '../common/menu.js'
const { scroll, scrollShadow } = usePageScroll()
</script>

<template>
  <scroll-view scroll-y style="height: 100vh;" @scroll="scroll">
    <Nav :showScrollList="false" :sel-index="3" :scrollShadow="scrollShadow" />
    <lu-back />
    <view class="page-content">
      <view class="cover">
        <view class="cover-bg">
          <view class="cover-bg2">
            <view class="cover-flex" v-if="isInit">
              <image
                class="img-bg"
                :src="cdn + data.cover_url"
              />
              <view class="info">
                <view class="favorite" @click="like" :class="{ active: data.is_like === 1 }">
                  <view class="favorite-btn"></view>
                  <view class="favorite-num">{{data.like_count || 0}}</view>
                </view>
                <view class="title">{{ data.name }}</view>
                <view class="creator">Creator</view>
                <view class="creator-info">{{data.names[0]}}{{data.names[1]?"/": ""}}{{data.names[1]}}{{data.names[2]?"/": ""}}{{data.names[2]}}</view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="form-box">
        <view class="form-item">
          <view class="label">
            <image class="label-icon" src="/static/img/market/mark-icon.png" />
            <text>Introduction</text>
          </view>
          <view class="desc-input">
            {{data.description}}
          </view>
        </view>

        <view class="form-item">
          <view class="label">
            <image class="label-icon" src="/static/img/market/mark-icon.png" />
            <text>Others</text>
          </view>
          <view class="pic-list" >
            <image @click="navTo('/pages/market/product?id=' + item.id)"
                v-for="item in list" :key="item.id"
              class="pic-item"
              mode="aspectFill"
              :src="cdn + item.cover_url"
            />
          </view>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<style scoped lang="scss">
  .page-content {
    padding: 0 40rpx 50rpx;


    .cover {
      .cover-bg {
        position: relative;
        width: 100%;
        height: 382rpx;
        background: url('/static/img/market/cover-bg.png');
        background-size: 100% 100%;
        margin-top: 24rpx;
      }
      .cover-bg2 {
        width: 96%;
        height: 408rpx;
        background: url('/static/img/market/cover-bg.png');
        background-size: 100% 100%;
        position: absolute;
        top: -14rpx;
        left: 0;
        right: 0;
        margin: 0 auto;
      }

      .cover-flex {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-top: -6rpx;
        padding: 0 24rpx;

        .img-bg {
          border-radius: 10rpx;
          width: 280rpx;
          height: 420rpx;
          margin-right: 10rpx;
        }

        .info {
          padding-top: 26rpx;
          height: 420rpx;
          flex: 1;
          overflow: hidden;
          color: #fff;
          text-shadow: 0px 4rpx 8rpx rgba(0, 0, 0, 0.98);
          // font-family: font_Rubik;
          font-style: normal;
          font-weight: 900;
          line-height: normal;
          text-align: center;
          .title {
            font-size: 32rpx;
            margin-top: 12rpx;
          }
          .creator {
            font-size: 24rpx;
            margin: 80rpx 0 10rpx;
          }
          .creator-info {
            color: #50eaff;
            font-size: 24rpx;
            // word-break: break-all;
            // text-overflow: ellipsis;
            // display: -webkit-box;
            // -webkit-box-orient: vertical;
            // -webkit-line-clamp: 3;
            // overflow: hidden;
          }
        }
      }
    }

    .favorite {
      display: flex;
      justify-content: end;
      align-items: center;
      .favorite-btn {
        width: 46rpx;
        height: 44rpx;
        background: url(@/static/img/market/favorite.png) no-repeat center;
        background-size: 100% 100%;
      }

      .favorite-num {
        color: #fff;
        text-shadow: 0px 4rpx 4rpx #000;
        font-size: 32rpx;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }

      &.active {
        .favorite-btn {
          background: url(@/static/img/market/favorite-active.png) no-repeat
            center;
          background-size: 100% 100%;
        }

        .favorite-num {
          background: var(
            --001,
            linear-gradient(
              146deg,
              #eb1484 13.16%,
              #c91cc3 99.99%,
              #c81cc5 100.86%,
              #c81cc5 101.73%
            )
          );
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0px 0px 4rpx #c81cc5;
        }
      }
    }

    .form-box {
      margin-top: 30rpx;
      .form-item {
        margin-bottom: 12rpx;
        .label {
          color: #fff;
          text-shadow: 0px 4rpx 8rpx rgba(0, 0, 0, 0.98);
          font-size: 30rpx;
          font-style: italic;
          font-weight: 700;
          line-height: normal;
          margin-bottom: 10rpx;
          .label-icon {
            width: 28rpx;
            height: 28rpx;
            margin-right: 10rpx;
          }
        }

        .desc-input {
          padding: 32rpx;
          height: 360rpx;
          overflow: scroll;
          border: 2rpx solid #3c4c5a;
          border-radius: 16rpx;
          font-size: 24rpx;
          font-weight: 400;
          line-height: normal;
          color: #fff;
        }

        .pic-list {
          border: 2rpx solid #3c4c5a;
          padding: 14rpx;
          border-radius: 16rpx;
          display: flex;
          align-items: center;
          overflow-x: auto;
          .pic-item {
            overflow: 10rpx;
            flex-shrink: 0;
            width: 218rpx;
            height: 328rpx;
            margin-right: 26rpx;
            border-radius: 16rpx;
            &:last-child {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
</style>
