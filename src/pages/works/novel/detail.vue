<script setup>
  const props = defineProps({
    content: {
      type: String,
      default: ''
    }
  })
</script>

<template>
  <div class="novel-detail">
    <div class="content-html" v-html="content"></div>
  </div>
</template>

<style lang="scss" scoped>
  .novel-detail {
    font-family: Rubik;
    color: #fff;
    font-size: 30rpx;
    .content-html {
      white-space: pre-wrap;
      text-align: justify;
    }
  }
</style>
