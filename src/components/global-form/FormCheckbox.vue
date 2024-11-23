<script setup>
  import UniDataCheckbox from '@/components/uni-data-checkbox/uni-data-checkbox.vue'
  const props = defineProps({
    modelValue: {
      type: [String, Number],
      default() {
        return ''
      }
    },
    options: {
      type: Array,
      default: () => []
    }
  })
  const emit = defineEmits(['update:modelValue'])
  const updateModel = (val) => {
    emit('update:modelValue', val)
  }
</script>

<template>
  <UniDataCheckbox
    class="checkbox-group"
    :value="modelValue"
    @input="updateModel"
    :localdata="options"
  />
</template>

<style lang="scss" scoped>
  .checkbox-group {
    ::v-deep {
      .checklist-text {
        font-size: 28rpx !important;
      }

      .checklist-group {
        justify-content: flex-start;
        .checklist-box {
          margin: 0 25rpx 20rpx 0;
        }
      }

      .radio__inner {
        width: 28rpx !important;
        height: 28rpx !important;
      }
      .radio__inner-icon {
        width: 12rpx !important;
        height: 12rpx !important;
      }
    }
  }
</style>
