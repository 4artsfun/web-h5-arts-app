<script setup>
  import { computed, ref } from 'vue'

  const props = defineProps({
    expand: {
      type: Boolean,
      default: false
    },
    total: {
      type: Number,
      default: 0
    },
    active: {
      type: Number,
      default: 0
    },
    progress: {
      type: Number,
      default: 0
    }
  })

  const showAllPages = ref(false)
  const directoryList = computed(() => {
    const list = []
    if (showAllPages.value || props.total <= 16 || props.expand) {
      for (let i = 1; i <= props.total; i++) {
        list.push({
          name: i,
          type: 'page',
          lock: i > props.progress
        })
      }
    } else {
      for (let i = 1; i <= 16; i++) {
        list.push({
          name: i === 16 ? '...' : i,
          type: i === 16 ? 'expand' : 'page',
          lock: i > props.progress && i !== 16
        })
      }
    }
    return list
  })

  const emit = defineEmits(['change', 'buyChapter'])
  const changePage = (item) => {
    if (item.type === 'expand') {
      showAllPages.value = true
      return
    }
    if (item.lock) {
      emit('buyChapter', item.name)
      return
    } else {
      emit('change', item.name)
    }
  }
</script>

<template>
  <view class="directory">
    <view
      v-for="item in directoryList"
      :class="{ active: props.active === item.name }"
      class="chapter"
      @click="changePage(item)"
    >
      <image
        v-if="item.lock"
        class="lock-icon"
        src="/static/images/works/lock.png"
      />
      {{ item.name }}
    </view>
  </view>
</template>

<style lang="scss" scoped>
  .directory {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 16rpx 10rpx;
    justify-items: start;

    .chapter {
      position: relative;
      width: 72rpx;
      height: 72rpx;
      border-radius: 18rpx;
      border: 1px solid #606170;
      font-size: 30rpx;
      font-weight: 400;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #060820;

      &.active {
        background: linear-gradient(149.62deg, #eb1484 -7.48%, #c81cc5 100.27%);
        box-shadow: 0px 2.28px 11.41px 0px #d619ac99;
        border: unset;
      }

      .lock-icon {
        width: 12rpx;
        height: 15rpx;
        position: absolute;
        top: 6rpx;
        right: 8rpx;
        z-index: 2;
      }
    }
  }
</style>
