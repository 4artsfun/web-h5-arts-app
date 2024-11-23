<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    content: {
      type: String,
      default: ''
    }
  })

  // 获取youtube视频id
  // 支持格式：
  // 1. https://www.youtube.com/watch?v=xxxxxxxxxxx
  // 2. https://youtu.be/xxxxxxxxxxx
  // 3. <iframe src="https://www.youtube.com/embed/xxxxxxxxxxx"></iframe>"
  const extractVideoId = (url) => {
    if (url?.length === 11 && /^[a-zA-Z0-9_-]+$/.test(url)) {
      return url
    }
    // prettier-ignore
    const regex = /(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([^&\n]{11})/i
    const matches = url?.match(regex)
    return matches ? matches[1] : ''
  }

  const videoId = computed(() => {
    return extractVideoId(props.content)
  })
</script>

<template>
  <div class="youtube-detail">
    <iframe
      width="100%"
      height="300"
      :src="`https://www.youtube.com/embed/${videoId}?autoplay=1`"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>
  </div>
</template>

<style lang="scss" scoped>
  .youtube-detail {
    color: #fff;
  }
</style>
