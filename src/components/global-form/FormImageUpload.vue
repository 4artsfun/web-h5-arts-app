<script setup>
  import { ref, watchEffect } from 'vue'
  import { msg } from '../../common/js/util'
  // import { loading } from '../../common/js/ajax'
  import config from '../../common/js/config'
  import { useStore } from 'vuex'
  const store = useStore()
  const props = defineProps({
    btnText: {
      type: String,
      default: ''
    },
    modelValue: {
      type: String,
      default: ''
    }
  })
  const emit = defineEmits(['update:modelValue'])
  const imgUrl = ref('')
  const loading = ref(false)
  watchEffect(() => {
    if (props.modelValue) {
      imgUrl.value = props.modelValue
    }
  })

  const chooseImage = () => {
    uni.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success: (res) => {
        loading.value = true
        res.tempFilePaths.forEach((file) => {
          upload(file)
        })
      }
    })
  }

  const upload = (file) => {
    uni.uploadFile({
      url: config.prefix + '/file/upload',
      header: {
        token: store.state.token,
        'Accept-Language': uni.getLocale()
      },
      filePath: file,
      formData: {
        type: 1
      },
      name: 'file',
      success: async (res) => {
        loading.value = false
        if (res.statusCode !== 200) {
          if (res.statusCode === 401) {
            await store.dispatch('openWallet')
          } else {
            msg('service error: ' + res.statusCode)
          }
          return
        }
        let result = res.data
        if (typeof result === 'string') {
          result = JSON.parse(result)
        }
        if (result.code !== 0) {
          msg(result.msg)
          return
        }

        succFunc(result.data)
      },
      fail: () => {
        loading.value = false
        msg('network error')
      }
    })
  }

  const succFunc = (res) => {
    imgUrl.value = res?.url ?? ''
    emit('update:modelValue', imgUrl.value)
  }
</script>

<template>
  <div class="form-image-upload">
    <div class="upload-btn" @click="chooseImage">
      <img v-if="imgUrl" class="preview" :src="config.cdn + imgUrl" />
      <div v-else>
        <div class="upload-btn-pic"></div>
        <div v-if="btnText" class="upload-btn-text">{{ btnText }}</div>
      </div>

      <div class="loading" v-if="loading"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .form-image-upload {
    .upload-btn {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .preview {
      position: absolute;
      z-index: 5;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
      margin: auto;
    }

    .upload-btn-pic {
      width: 80rpx;
      height: 80rpx;
      background: url(@/static/img/ecosystem/upload-btn.png) no-repeat center /
        contain;
      margin: 0 auto;
    }

    .upload-btn-text {
      font-size: 20rpx;
      font-weight: 600;
      line-height: 24rpx;
      text-align: center;
      color: #a6a6a6;
      padding: 0 20rpx;
      margin-top: 20rpx;
    }
  }

  .loading {
    position: absolute;
    z-index: 5;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60rpx;
    height: 60rpx;
    border: 8rpx solid #fff;
    border-top-color: rgba(0, 0, 0, 0.2);
    border-right-color: rgba(0, 0, 0, 0.2);
    border-bottom-color: rgba(0, 0, 0, 0.2);
    border-radius: 100%;
    animation: circle infinite 0.75s linear;
  }

  @keyframes circle {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
</style>
