<script setup>
  import { computed, ref } from 'vue'
  const props = defineProps({
    options: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: [Array, String, Number],
      default() {
        return ''
      }
    }
  })

  const label = computed(() => {
    let obj = props.options.find((item) => item.key === props.modelValue)
    return obj?.label || ''
  })

  const emit = defineEmits(['update:modelValue', 'change'])

  const pickChange = (e) => {
    const obj = props.options[e.detail.value]
    if (obj) {
      // @ts-ignore
      emit('update:modelValue', obj.key || '')
      emit('change', obj.key || '')
    }
  }
</script>

<template>
  <picker :range="options" range-key="label" @change="pickChange">
    <div class="pick-input">{{ label }}</div>
  </picker>
</template>

<style lang="scss" scoped>
  .pick-input {
    box-sizing: initial;
    background: #00000033;
    height: 60rpx;
    font-size: 26rpx;
    font-weight: 400;
    color: #fff;
    border: 1px solid #4f519c;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 30rpx;
  }
</style>
