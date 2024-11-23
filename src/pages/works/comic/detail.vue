<script setup>
  import { watch, ref } from 'vue'
  import config from '../../../common/js/config.js'
  const cdn = config.cdn
  const picList = ref([])

  const props = defineProps({
    picArr: {
      type: Array,
      default: () => []
    }
  })
  watch(
    () => props.picArr,
    (val) => {
      picList.value = val.map((item) => {
        let pic = ''
        if (/^(http|https):\/\//.test(item)) {
          pic = item
        } else {
          pic = cdn + item
        }
        return {
          // url: `${cdn}${item}`,
          url: pic,
          loading: true,
          isZoom: false
        }
      })
    }
  )

  const scale = ref(1)
</script>

<template>
  <view class="comic-pic">
    <view
      v-for="item in picList"
      class="pic-box"
      :style="{
        minHeight: item.loading ? '200rpx' : 'auto'
      }"
    >
      <view class="loading" v-if="item.loading"></view>

      <img
        :key="item.url"
        class="pic"
        v-lazy="{
          src: item.url,
          lifecycle: {
            loading: () => {},
            error: () => {},
            loaded: () => {
              item.loading = false
            }
          }
        }"
        @click="item.isZoom = !item.isZoom"
      />
      <view class="zoom-overlay" v-show="item.isZoom">
        <movable-area scale-area class="movable-area">
          <movable-view
            class="movable-view"
            direction="all"
            scale="true"
            scale-min="1"
            scale-max="4"
            :scale-value="scale"
          >
            <img
              :key="item.url"
              v-lazy="{
                src: item.url
              }"
              class="zoom-image"
              @click="item.isZoom = !item.isZoom"
            />
          </movable-view>
        </movable-area>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
  .comic-pic {
    .pic-box {
      position: relative;
    }
    .loading {
      position: absolute;
      z-index: 3;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80rpx;
      height: 80rpx;
      border: 8rpx solid #fff;
      border-top-color: rgba(0, 0, 0, 0.2);
      border-right-color: rgba(0, 0, 0, 0.2);
      border-bottom-color: rgba(0, 0, 0, 0.2);
      border-radius: 100%;
      animation: circle infinite 0.75s linear;
    }

    @keyframes circle {
      from {
        transform: translate(-50%, -50%) rotate(0deg);
      }
      to {
        transform: translate(-50%, -50%) rotate(360deg);
      }
    }

    .pic {
      width: 100%;
    }
  }

  .zoom-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1200;

    .movable-area {
      height: 100%;
      width: 100%;
    }

    .movable-view {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .zoom-image {
    width: 100%;
    height: auto;
  }
</style>
