<script setup>
  import { ref } from 'vue'
  const props = defineProps({
    pic: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    author: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    }
  })

  const showDesc = ref(false)
</script>

<template>
  <div class="cover">
    <img class="cover-img" :src="pic" />
    <div class="cover-content">
      <div class="cover-title">{{ title }}</div>
      <div class="cover-author">{{ author }}</div>
      <div
        class="cover-desc"
        :class="{ expanded: showDesc }"
        @click="showDesc = !showDesc"
      >
        {{ desc }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .cover {
    display: flex;
    justify-content: space-between;

    .cover-img {
      object-fit: cover;
      width: 240rpx;
      min-width: 240rpx;
      height: 304rpx;
      border-radius: 12rpx;
      border: 2rpx solid #ffffff;
      margin-right: 24rpx;
      background: #f5f5f5;
    }

    .cover-content {
      display: flex;
      flex-flow: column nowrap;
      align-items: flex-start;
      flex-grow: 1;

      .cover-title {
        font-size: 32rpx;
        font-weight: 700;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
      .cover-author {
        font-size: 24rpx;
        font-weight: 400;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        margin-bottom: 10rpx;
      }
      .cover-desc {
        font-size: 24rpx;
        font-weight: 400;
        line-height: 32rpx;
        color: #dddddd;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 6;
        overflow: hidden;
        word-break: break-all;
        &.expanded {
          -webkit-line-clamp: unset;
          overflow: visible;
        }
      }
    }
  }
</style>
