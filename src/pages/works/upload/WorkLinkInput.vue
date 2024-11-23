<script setup>
  import { computed, ref, watchEffect } from 'vue'
  const props = defineProps({
    workType: {
      type: Number
    },
    chapters: {
      type: Array,
      default: () => []
    }
  })

  const emit = defineEmits(['update:chapters'])

  // 网盘上传类型[Novel, Comic]
  const diskLinkType = [3, 4]

  // 视频链接类型
  const videoLinkType = [1, 2, 5, 6, 7, 8, 9]

  const showInputType = computed(() => {
    if (diskLinkType.includes(props.workType)) {
      return 'disk'
    }
    if (videoLinkType.includes(props.workType)) {
      return 'video'
    }
    return ''
  })

  watchEffect(() => {
    if (showInputType.value) {
      emit('update:chapters', [{ chapter_name: '', chapter_link: '' }])
    }
  })

  const addVideoFormInput = () => {
    props.chapters.push({ chapter_name: '', chapter_link: '' })
    emit('update:chapters', props.chapters)
  }
  const removeVideoFormInput = (index) => {
    let filterArr = props.chapters.filter((item, i) => i !== index)
    emit('update:chapters', filterArr)
  }
</script>

<template>
  <div class="link-input-container">
    <div v-if="showInputType === 'disk'" class="disk-form">
      <input
        class="input"
        placeholder="Enter the network disk link"
        v-model="props.chapters[0].chapter_link"
      />
      <div class="disk-tips">
        According to the number of chapters of the work, each chapter content is
        an independent folder, and only the content of the work is placed in the
        file.Folders are arranged according to the number of chapters.Google
        Drive, Dropbox
      </div>
    </div>

    <div v-if="showInputType === 'video'" class="video-form">
      <div
        v-for="(item, index) in props.chapters"
        :key="index"
        class="flex-input-container"
      >
        <div class="input-index">{{ index + 1 }}</div>
        <input
          class="input input-name"
          placeholder="name"
          maxlength="100"
          v-model="item.chapter_name"
        />
        <input
          class="input input-link"
          placeholder="Enter works link"
          v-model="item.chapter_link"
        />
        <div
          v-if="props.chapters.length > 1"
          class="input-del"
          @click="removeVideoFormInput(index)"
        >
          -
        </div>
      </div>

      <div class="add-input">
        <div class="add-btn" @click="addVideoFormInput">+</div>
      </div>

      <div class="disk-tips">
        You can enter the video link and chapter title in the form, and click
        the "+" button to add a new input field.
        <br />
        <br />
        For YouTube video links, you can refer to:
        <b class="link">https://youtu.be/videoID</b> or
        <b class="link">https://www.youtube.com/watch?v=videoID</b>
        <br />
        <br />
        For TikTok video links, refer to:
        <b class="link">https://www.tiktok.com/@username/video/videoID</b>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .link-input-container {
    padding: 12rpx 20rpx;

    .input {
      box-sizing: initial;
      height: 48rpx;
      font-size: 28rpx;
      font-weight: 500;
      color: rgba(235, 20, 132, 1);
      border-radius: 8rpx;
      background: rgba(153, 153, 153, 0.12);
      padding: 0 16rpx;
    }

    .disk-tips {
      font-size: 24rpx;
      font-weight: 400;
      line-height: 28rpx;
      color: rgba(153, 153, 153, 1);
      margin-top: 12rpx;
      .link {
        text-decoration: underline;
      }
    }

    .video-form {
      .flex-input-container {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        margin-bottom: 8rpx;
        .input-index {
          min-width: 48rpx;
          height: 48rpx;
          border-radius: 8rpx 0rpx 0rpx 8rpx;
          background: rgba(153, 153, 153, 0.12);
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 2rpx;
        }
        .input-name {
          min-width: 90rpx;
          border-radius: 0;
          margin-right: 2rpx;
        }
        .input-link {
          min-width: 300rpx;
          flex-grow: 1;
          border-radius: 0rpx 8rpx 8rpx 0rpx;
        }
      }

      .input-del {
        min-width: 30rpx;
        height: 48rpx;
        border-radius: 4rpx;
        background: rgba(153, 153, 153, 0.12);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 34rpx;
        margin-left: 2rpx;
        color: rgba(235, 20, 132, 1);
      }
      .add-input {
        display: flex;
        justify-content: flex-end;
        margin-top: 12rpx;
        .add-btn {
          width: 32rpx;
          height: 32rpx;
          border-radius: 4rpx;
          background: rgba(153, 153, 153, 0.12);
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 34rpx;
        }
      }
    }
  }
</style>
