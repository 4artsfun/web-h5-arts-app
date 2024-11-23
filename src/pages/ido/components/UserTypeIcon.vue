<script setup>
  import { computed, ref } from 'vue'
  const props = defineProps({
    type: {
      type: Number,
      required: true
    }
  })

  const typeList = {
    0: { name: 'REGULAR USER' },
    1: { name: 'WHITELISTED USER' },
    2: { name: 'VIP USER' }
  }

  const userType = computed(() => {
    return typeList[props.type] ?? {}
  })
</script>

<template>
  <view class="user-type">
    <view class="user-icon">
      <image
        v-if="props.type === 2"
        class="icon"
        mode="heightFix"
        src="/static/images/ido/vip-user.png"
        alt=""
      />

      <image
        v-if="props.type === 1"
        class="icon"
        mode="heightFix"
        src="/static/images/ido/whitelisted-user.png"
        alt=""
      />

      <image
        v-if="props.type === 0"
        class="icon"
        mode="heightFix"
        src="/static/images/ido/regular-user.png"
        alt=""
      />
    </view>
    <view class="user-name" :class="{ vip: props.type === 2 }">
      {{ userType.name }}
    </view>
  </view>
</template>

<style lang="scss" scoped>
  .user-type {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    .user-icon {
      margin-right: 10rpx;
      .icon {
        width: 56rpx;
        height: 56rpx;
      }
    }
    .user-name {
      font-size: 22rpx;
      color: #fff;
      &.vip {
        background: linear-gradient(229.11deg, #f2de7c 0%, #ff5e00 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
</style>
