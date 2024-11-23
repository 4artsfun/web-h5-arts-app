<script setup>
  import { ref } from 'vue'
  import Tabs from './components/Tabs.vue'
  import Online from './Online.vue'
  import Nft from './Nft.vue'
  import Money from './Money.vue'
  import Nav from "../common/nav";
  const tab = ref(1)
  const handleTabChange = (index) => {
    tab.value = index
  }

  import { usePageScroll } from '../common/menu.js'
  const { scroll, scrollShadow } = usePageScroll()
</script>

<template>
  <scroll-view scroll-y style="height: 100vh;" @scroll="scroll">
    <Nav :sel-index="3" :scrollShadow="scrollShadow" v-if="tab !== 1" />
    <view class="page-content">
      <Tabs class="mb28" :active="tab" @change="handleTabChange" v-if="tab !== 1" />
      <Online v-if="tab === 1" @tabsActiveChange="handleTabChange" />
      <Nft v-if="tab === 2" />
      <Money v-if="tab === 3" />
    </view>
  </scroll-view>

</template>

<style scoped lang="scss">
  .page-content {
    padding: 30rpx 40rpx 50rpx;
  }
  .mb28 {
    margin-bottom: 28rpx;
  }
</style>
