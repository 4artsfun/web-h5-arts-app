<script setup>
  import { ref } from 'vue'
  import GlobalDialog from '../../../components/global-dialog/global-dialog.vue'
  import UploadTabs from './UploadTabs.vue'
  import WorkForm from './WorkForm.vue'
  import FinishTable from './FinishTable.vue'

  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    }
  })
  const emit = defineEmits(['update:show'])

  const tabActive = ref(1)

  const workAddFinish = () => {
    tabActive.value = 2
  }

  const close = () => {
    tabActive.value = 1
    emit('update:show', false)
  }
</script>

<template>
  <GlobalDialog
    class="upload-work-dialog"
    :show="props.show"
    @close="close"
    title="Upload entertainment fan tokens"
  >
    <div class="content">
      <UploadTabs
        :active="tabActive"
        @change="(index) => (tabActive = index)"
      />

      <WorkForm v-if="tabActive === 1" @finish="workAddFinish" />
      <FinishTable v-if="tabActive === 2" />
    </div>
  </GlobalDialog>
</template>

<style lang="scss" scoped>
  .upload-work-dialog {
    ::v-deep .header .title {
      font-size: 32rpx;
      color: #eb1484;
      background: unset;
      -webkit-background-clip: unset;
      -webkit-text-fill-color: unset;
    }
  }

  .content {
    color: #eb1484;
  }
</style>
