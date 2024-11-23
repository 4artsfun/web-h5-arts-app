<template>
  <view>
    <view class="lu-cls-app-status-bar" :style="{height: statusBarHeight + 'px'}"/>
    <view class="lu-cls-app-status-bar-fixed" :style="{background: backColor, height: statusBarHeight + 'px'}"/>
  </view>
</template>

<script setup>
import {watchEffect, ref} from 'vue'

const statusBarHeight = ref(0);
watchEffect(() => {
  let systemInfo = getApp().globalData.systemInfo;
  statusBarHeight.value = systemInfo? systemInfo.statusBarHeight: 0;
})

defineProps({
  name: {
    type: String,
    default() {
      return ""
    }
  },
  backColor: {
    type: String,
    default() {
      return "transparent"
    }
  }
})
</script>

<style scoped lang="scss">
.lu-cls-app-status-bar {
  width: 100%;
}
.lu-cls-app-status-bar-fixed{
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>
