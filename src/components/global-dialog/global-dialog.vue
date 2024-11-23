<script setup>
  const props = defineProps({
    show: {
      type: [Boolean, Number, String],
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  })

  const emit = defineEmits(['update:show', 'close'])
  const closeFunc = () => {
    emit('update:show', false)
    emit('close', {})
  }
</script>

<template>
  <div class="modal" :class="{ show }">
    <div class="dialog-box">
      <div class="header">
        <div class="title">{{ title }}</div>
        <div class="close-btn" @click="closeFunc">×</div>
      </div>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .modal {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;

    // animate
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease-in-out;
    &.show {
      opacity: 1;
      pointer-events: auto;
      .dialog-box {
        transform: translateY(0);
      }
    }
  }
  .dialog-box {
    font-family: Rubik;
    color: #fff;
    width: 690rpx;
    border-radius: 40rpx;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(48rpx);
    border: 2rpx solid rgb(51, 51, 51);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
    overflow: hidden;
    // animate
    transform: translateY(-40rpx);
    transition: transform 0.4s ease-in-out;
  }

  .header {
    position: relative;
    padding: 10rpx 0;
    border-bottom: 2rpx solid #333333;
    height: 92rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    .title {
      font-size: 40rpx;
      font-weight: 900;
      background: linear-gradient(
        90deg,
        rgba(5, 250, 234, 1) 0%,
        rgba(126, 0, 245, 1) 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .close-btn {
      position: absolute;
      z-index: 1;
      top: 10rpx;
      right: 30rpx;
      background: none;
      border: none;
      color: white;
      font-size: 40rpx;
      cursor: pointer;
    }
  }

  .content {
    padding: 30rpx;
    max-height: 76vh;
    overflow-y: auto;
  }
</style>
