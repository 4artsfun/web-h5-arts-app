<script setup>
  import { nextTick, onMounted, ref, unref, watchEffect } from 'vue'
  import { WORK_TYPE } from '../../../common/js/constants'
  import FormCheckbox from '../../../components/global-form/FormCheckbox.vue'
  import FormImageUpload from '../../../components/global-form/FormImageUpload.vue'
  import WorkLinkInput from './WorkLinkInput.vue'
  import WorkReleaseInput from './WorkReleaseInput.vue'
  import TokenForm from './TokenForm.vue'
  import { useWorks } from '../hooks/works'
  import { useUploadWork } from '../hooks/uploadWork'
  const { formatForm, getDefaultToken, saveWork, updateWork } = useUploadWork()
  const { loadWorkDetail, getWorkChapterLink } = useWorks()

  const props = defineProps({
    workId: {
      type: Number
    }
  })

  const emit = defineEmits(['close', 'finish'])

  const showTokenForm = ref(false)
  const form = ref({
    type: 1,
    name: '',
    creator_name: ['', '', ''],
    description: '',
    cover_url: '',
    chapters: [],
    premiere_time: '',
    link_type: 0,
    border_type: 1,
    token_url: '',
    token_name: ''
  })

  const backToUploadForm = () => {
    showTokenForm.value = false
  }

  const confirmLoading = ref(false)
  const confirmForm = async () => {
    confirmLoading.value = true
    const { verify, params } = formatForm(unref(form.value))
    if (verify) {
      // if (params.token_name && params.token_url) {
      //   showTokenForm.value = true
      // } else {
      const res = await getDefaultToken({
        type: params.type,
        name: params.name
      })
      form.value.token_name = res?.TokenName ?? ''
      form.value.border_type = params.border_type || (res?.BorderType ?? 1)
      form.value.token_url = params.cover_url || (res?.TokenUrl ?? '')
      showTokenForm.value = true
      // }
    }
    confirmLoading.value = false
  }
  const saveForm = async () => {
    confirmLoading.value = true
    const { params } = formatForm(unref(form.value))
    let res = null
    if (props.workId) {
      params.work_id = props.workId
      console.log(params)
      res = await updateWork(params).catch((e) => e)
    } else {
      res = await saveWork(params).catch((e) => e)
    }
    if (res && Object.keys(res).length === 0) {
      emit('finish')
    }
    confirmLoading.value = false
  }

  const getDetail = async () => {
    const res = await loadWorkDetail({ worksId: props.workId })
    form.value.type = res?.work_type ?? 1
    form.value.name = res?.work_name ?? ''
    form.value.creator_name = res?.work_creator_name.split(',') ?? ['', '', '']
    form.value.description = res?.work_description ?? ''
    form.value.cover_url = res?.work_cover_url ?? ''
    form.value.premiere_time = res?.premiere_time ?? ''
    form.value.link_type = res?.work_link_type ?? 0
    form.value.border_type = res?.work_border_type ?? 1
    form.value.token_url = res?.token_cover_url ?? ''
    form.value.token_name = res?.token_name ?? ''
  }
  const getChapter = async () => {
    const res = await getWorkChapterLink({
      worksId: props.workId
    })
    form.value.chapters =
      res?.map((item) => {
        return {
          chapter_name: item.Title,
          chapter_link: item.Content
        }
      }) ?? []
  }

  const filterName = (event) => {
    const inputValue = event.detail.value
    nextTick(() => {
      form.value.name = inputValue.replace(/[\u4e00-\u9fa5]/g, '')
    })
  }

  watchEffect(() => {
    if (props.workId) {
      getDetail()
      getChapter()
    }
  })
</script>

<template>
  <div>
    <div v-show="!showTokenForm" class="work-form">
      <div class="form-content">
        <div class="close-btn" v-if="props.workId">
          <div @click="$emit('close')">Return to finished list</div>
        </div>

        <div class="work-type">
          <div class="label-title">· Type :</div>
          <div class="type-options">
            <FormCheckbox v-model="form.type" :options="WORK_TYPE" />
          </div>
        </div>

        <div class="name-input">
          <div class="label-title">· Name :</div>
          <input
            class="input"
            maxlength="150"
            @input="filterName"
            v-model="form.name"
          />
        </div>

        <div class="label-title">· Creator Name :</div>
        <div class="creator-name-list">
          <input
            class="input"
            placeholder="name"
            maxlength="30"
            v-model="form.creator_name[0]"
          />
          <input
            class="input"
            placeholder="name"
            maxlength="30"
            v-model="form.creator_name[1]"
          />
          <input
            class="input"
            placeholder="name"
            maxlength="30"
            v-model="form.creator_name[2]"
          />
        </div>

        <div class="upload-info">
          <FormImageUpload
            class="upload-btn"
            btnText="Upload Poster"
            v-model="form.cover_url"
          />
          <div class="desc-input">
            <div class="intro-title">Intro:</div>
            <textarea
              placeholder="Please enter a brief introduction, no more than 150 words"
              class="input-area"
              maxlength="150"
              v-model="form.description"
            />
          </div>
        </div>

        <div class="label-title">· Work Link :</div>
        <WorkLinkInput :workType="form.type" v-model:chapters="form.chapters" />

        <div class="label-title">· Release :</div>
        <WorkReleaseInput v-model:time="form.premiere_time" />
      </div>
      <div
        class="confirm-btn"
        :class="{ 'global-btn-disabled': confirmLoading }"
        @click="confirmForm"
      >
        <div class="global-pending" v-if="confirmLoading"></div>
        Confirm upload
      </div>
    </div>
    <TokenForm
      v-if="showTokenForm"
      v-model:tokenPic="form.token_url"
      v-model:tokenName="form.token_name"
      v-model:borderType="form.border_type"
      @close="backToUploadForm"
      @confirm="saveForm"
      :confirmLoading="confirmLoading"
    />
  </div>
</template>

<style lang="scss" scoped>
  .work-form {
    color: #fff;
    margin-top: 16rpx;
    .form-content {
      padding-bottom: 20rpx;
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
        padding: 20rpx 20rpx 0 0;
      }
    }

    .input {
      box-sizing: initial;
      padding: 0 16rpx;
      height: 48rpx;
      font-size: 28rpx;
      font-weight: 500;
      color: rgba(235, 20, 132, 1);
    }

    .label-title {
      font-size: 28rpx;
      font-weight: 500;
      padding: 20rpx 0 12rpx 20rpx;
    }

    .type-options {
      padding: 12rpx 10rpx;
    }

    .name-input {
      display: flex;
      align-items: center;
      border-top: 2rpx solid rgba(153, 153, 153, 0.12);
      border-bottom: 2rpx solid rgba(153, 153, 153, 0.12);
      height: 60rpx;

      .label-title {
        padding: 0 0 0 20rpx;
      }

      .input {
        padding-left: 30rpx;
        flex-grow: 1;
      }
    }

    .creator-name-list {
      padding: 0 20rpx;
      text-align: center;
      margin-bottom: 20rpx;
      .input {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 8rpx;
        background: rgba(153, 153, 153, 0.12);
        margin-bottom: 12rpx;
      }
    }

    .upload-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 2rpx solid rgba(153, 153, 153, 0.12);
      border-bottom: 2rpx solid rgba(153, 153, 153, 0.12);

      .upload-btn {
        min-width: 160rpx;
        max-width: 160rpx;
        height: 202rpx;
        margin-right: 2rpx;
        background: rgba(153, 153, 153, 0.12);
      }

      .desc-input {
        flex-grow: 1;
        background: rgba(153, 153, 153, 0.12);
        padding: 20rpx;

        .intro-title {
          font-size: 28rpx;
          font-weight: 500;
          line-height: 33rpx;
          color: rgba(221, 221, 221, 1);
        }

        .input-area {
          width: 100%;
          height: 130rpx;
          overflow-y: scroll;
          font-size: 20rpx;
          font-weight: 400;
          line-height: 23rpx;
          color: rgba(235, 20, 132, 1);
        }
      }
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
    }
  }
</style>
