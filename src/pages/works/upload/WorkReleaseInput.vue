<script setup>
  import { ref, watchEffect } from 'vue'
  import { DatePicker } from 'ant-design-vue'
  import dayjs from 'dayjs'

  const props = defineProps({
    time: {
      type: String,
      default: ''
    }
  })
  const emit = defineEmits(['update:time'])

  const releaseType = [
    { label: 'Not yet', value: 1 },
    { label: 'Release | ', value: 2 }
  ]
  const selected = ref()
  const releaseTime = ref()

  watchEffect(() => {
    if (props.time === '') {
      selected.value = 1
      releaseTime.value = ''
    } else {
      selected.value = 2
      releaseTime.value = dayjs(props.time, 'YYYY-MM-DD')
    }
  })

  const selectFunc = (value) => {
    if (value === 1) {
      releaseTime.value = ''
      emit('update:time', '')
    }
    if (value === 2 && releaseTime.value === '') {
      releaseTime.value = dayjs()
      emit('update:time', dayjs().format('YYYY-MM-DD'))
    }
  }

  const changeDate = (date, dateString) => {
    emit('update:time', dateString)
  }
</script>

<template>
  <div class="release-input">
    <div
      v-for="item in releaseType"
      :key="item.value"
      class="select-box"
      :class="{
        active: selected === item.value,
        'release-type': item.value === 2
      }"
      @click="selectFunc(item.value)"
    >
      <div class="label-name">{{ item.label }}</div>

      <a-config-provider
        v-if="item.value === 2"
        :theme="{
          components: {
            DatePicker: {
              fontSize: 14,
              controlHeight: 24,
              colorPrimary: '#eb1484',
              colorBgElevated: 'rgba(0, 0, 0, 0.8)',
              colorText: '#ffffff',
              colorTextHeading: '#ffffff',
              colorTextDescription: '#ffffff',
              colorIcon: '#ffffff',
              colorIconHover: '#ffffff',
              colorTextDisabled: 'rgb(255, 255, 255, 0.6)',
              colorTextTertiary: '#ffffff',
              colorTextPlaceholder: 'rgb(255, 255, 255, 0.6)'
            }
          }
        }"
      >
        <DatePicker
          v-model:value="releaseTime"
          :bordered="false"
          :allowClear="false"
          :showToday="false"
          :inputReadOnly="true"
          placement="topLeft"
          placeholder="YYYY-MM-DD"
          format="YYYY-MM-DD"
          @change="changeDate"
        />
      </a-config-provider>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .release-input {
    padding: 12rpx 20rpx;
    display: flex;
    align-items: center;

    .select-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 48rpx;
      border-radius: 8rpx;
      border: 2rpx solid rgba(153, 153, 153, 1);
      padding: 0rpx 12rpx;
      margin-right: 16rpx;

      &.active {
        color: #eb1484;
        border: 2rpx solid #eb1484;
      }

      &:last-child {
        margin-right: 0rpx;
      }
    }

    .release-type {
      flex-grow: 1;
      .label-name {
        min-width: 120rpx;
      }
      ::v-deep .ant-picker {
        padding: 0;
        flex-grow: 1;
      }
    }
  }
</style>
