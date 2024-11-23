<script setup>
  import YoutubeVideo from './YoutubeVideo.vue'
  import TiktokVideo from './TiktokVideo.vue'
  import { computed } from 'vue'
  import { useUploadWork } from '../hooks/uploadWork';
  const { checkVideoUrlType } = useUploadWork();

  const props = defineProps({
    content: {
      type: String,
      default: ''
    }
  })

  const videoType = computed(() => {
    return checkVideoUrlType(props.content)
  })
</script>

<template>
  <div>
    <YoutubeVideo v-if="videoType === 'YouTube'" :content="props.content" />
    <TiktokVideo v-if="videoType === 'TikTok'" :content="props.content" />
  </div>
</template>

<style lang="scss" scoped></style>
