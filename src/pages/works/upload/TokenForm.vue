<script setup>
  import { ref } from 'vue'
  import FormImageUpload from '../../../components/global-form/FormImageUpload.vue'
  import TokenBorderSelect from './TokenBorderSelect.vue'

  const props = defineProps({
    tokenPic: {
      type: String,
      default: ''
    },
    tokenName: {
      type: String,
      default: ''
    },
    borderType: {
      type: [String, Number],
      default: 1
    },
    confirmLoading: {
      type: Boolean,
      default: false
    }
  })
  const emit = defineEmits([
    'close',
    'confirm',
    'update:tokenName',
    'update:tokenPic',
    'update:borderType'
  ])

  const form = ref({
    token_name: props.tokenName,
    token_url: props.tokenPic,
    border_type: props.borderType
  })

  const confirmForm = () => {
    if (!form.value.token_name) {
      return
    }
    emit('update:tokenName', form.value.token_name)
    emit('update:tokenPic', form.value.token_url)
    emit('update:borderType', Number(form.value.border_type))
    emit('confirm', form.value)
  }

  const validateInput = (event) => {
    const inputValue = event.detail.value
    form.value.token_name = inputValue.toUpperCase()
  }
</script>

<template>
  <div class="token-form">
    <div class="close-btn">
      <div @click="$emit('close')">Return to modify</div>
    </div>

    <div class="token-pic-flex">
      <div class="box-flex">
        <TokenBorderSelect class="pic-box" v-model="form.border_type">
          <FormImageUpload class="upload-btn" v-model="form.token_url" />
        </TokenBorderSelect>
        <div class="pic-title">Upload Symbol</div>
      </div>

      <div class="box-flex">
        <TokenBorderSelect
          selectMode
          class="pic-box"
          v-model="form.border_type"
        />
        <div class="pic-title">Select border</div>
      </div>
    </div>

    <div class="name-title">Set Fan Token Name :</div>
    <input
      class="input"
      placeholder="Please enter the name of the token"
      v-model="form.token_name"
      @input="validateInput"
      maxlength="8"
    />

    <div class="tips">
      1. the default is, the first letter of the work type + the first letter of
      the work name, the longest is not more than three, if the name is repeated
      after the number accumulates 1 ~ 100.
    </div>
    <div class="tips">
      2. The user Token name supports "letters" and "Arabic numerals". The name
      "Fan Token" in the platform cannot be repeated, and the token letters are
      displayed in uppercase and characters.Contains a maximum of 8 characters.
    </div>

    <div
      class="confirm-btn"
      :class="{
        disabled: !form.token_name,
        'global-btn-disabled': confirmLoading
      }"
      @click="confirmForm"
    >
      <div class="global-pending" v-if="confirmLoading"></div>
      Confirm upload
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .token-form {
    color: #fff;
    margin-top: 16rpx;
    padding: 20rpx;
    position: relative;
    border-radius: 16rpx;
    background: rgba(153, 153, 153, 0.12);
    .close-btn {
      display: flex;
      justify-content: flex-end;
      font-size: 24rpx;
      color: #fff;
      text-decoration: underline;
      text-align: right;
      margin-bottom: 20rpx;
    }

    .token-pic-flex {
      margin: 40rpx 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .box-flex {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        .pic-box {
          width: 160rpx;
          height: 160rpx;
          margin-bottom: 16rpx;
          .upload-btn {
            width: 128.29rpx;
            height: 128.29rpx;
            border-radius: 50%;
            overflow: hidden;
            ::v-deep img {
              object-fit: cover;
            }
          }
        }
      }

      .pic-title {
        font-size: 24rpx;
        font-weight: 500;
        text-align: center;
        color: rgba(221, 221, 221, 1);
      }
    }

    .name-title {
      font-size: 28rpx;
      font-weight: 500;
      color: rgba(221, 221, 221, 1);
    }
    .input {
      box-sizing: initial;
      padding: 0 16rpx;
      height: 60rpx;
      font-size: 28rpx;
      font-weight: 500;
      color: rgba(235, 20, 132, 1);
      border-radius: 8rpx;
      background: rgba(153, 153, 153, 0.12);
      margin: 20rpx 0;
      text-transform: uppercase;
    }
    .tips {
      font-size: 26rpx;
      font-weight: 400;
      line-height: 31rpx;
      color: rgba(128, 128, 128, 1);
      margin-bottom: 8rpx;
    }
    .confirm-btn {
      margin-top: 30rpx;
      height: 60rpx;
      border-radius: 40rpx;
      background: rgba(235, 20, 132, 1);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28rpx;
      font-weight: 900;
      &.disabled {
        opacity: 0.5;
      }
    }
  }
</style>
