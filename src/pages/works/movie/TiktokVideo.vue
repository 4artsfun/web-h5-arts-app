<script setup>
  import { computed, ref, onMounted } from 'vue'
  const props = defineProps({
    content: {
      type: String,
      default: ''
    }
  })
  const tiktokEmbed = ref(null)

  const getTiktokLink = computed(() => {
    const link = props.content
    return link
  })

  const getTiktokId = computed(() => {
    const regex = /\/video\/(\d+)/
    const match = props.content.match(regex)
    return match ? match[1] : ''
  })

  const loadTiktokSDK = () => {
    const script = document.createElement('script')
    script.src = 'https://www.tiktok.com/embed.js'
    script.async = true
    document.body.appendChild(script)
  }

  onMounted(() => {
    loadTiktokSDK()
  })
</script>

<template>
  <div>
    <div ref="tiktokEmbed">
      <blockquote
        class="tiktok-embed"
        :cite="getTiktokLink"
        :data-video-id="getTiktokId"
        data-embed-from="embed_page"
        style="max-width: 605px; min-width: 325px"
      >
        <section></section>
      </blockquote>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
