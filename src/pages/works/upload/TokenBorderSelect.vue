<script setup>
  import { ref, watchEffect } from 'vue'
  import FormPicker from '../../../components/global-form/FormPicker.vue'

  const props = defineProps({
    modelValue: {
      type: [String, Number],
      default: ''
    },
    selectMode: {
      type: Boolean,
      default: false
    }
  })
  const emit = defineEmits(['update:modelValue'])

  const borderType = ref('')
  watchEffect(() => {
    if (props.modelValue) {
      borderType.value = props.modelValue
    }
  })

  const borderTypeList = [
    { key: 1, label: 'Border 1' }
    // { key: 2, label: 'Border 2' }
  ]
  const updateBorder = (value) => {
    emit('update:modelValue', value)
  }
</script>

<template>
  <div class="token-border-select">
    <div class="avatar-border" :class="`bg-${borderType || 'default'}`">
      <slot></slot>

      <div class="select-box" v-if="selectMode">
        <FormPicker
          class="select-btn"
          :options="borderTypeList"
          v-model="borderType"
          @change="updateBorder"
        />
        <img class="select-icon" src="/static/images/works/select-btn.svg" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .token-border-select {
    .avatar-border {
      position: relative;
      z-index: 2;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .select-box {
        position: absolute;
        z-index: 3;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        .select-btn {
          width: 100%;
          height: 100%;
          opacity: 0;
        }
        .select-icon {
          pointer-events: none;
          position: absolute;
          z-index: 3;
          top: 0;
          right: 0;
        }
      }

      &.bg-default,
      &.bg-1 {
        background: url('/static/images/works/avatar-border.svg') no-repeat
          center / contain;
      }
    }
  }
</style>
