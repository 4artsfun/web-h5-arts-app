<script setup>
  import { ref } from 'vue'
  import UniDataCheckbox from '@/components/uni-data-checkbox/uni-data-checkbox.vue'
  // import UniFilePicker from '@/components/uni-file-picker/uni-file-picker.vue'
  import {msg, chooseImage} from "../../../common/js/util";
  import config from "../../../common/js/config";
  import {post} from "../../../common/js/ajax";
  import countryOptions from '../../../common/js/countries'
  import {WORK_TYPE} from "../../../common/js/constants";
  let uL = {name: '', names: ['','',''], img: '', intro: '', type: null, time: null}

  const releaseOptions = [
    { text: 'Not yet', value: 0 },
    { text: 'Within 3 month', value: 1 },
    { text: '3 month to 7 year', value: 2 },
    { text: 'Beyond 7 years', value: 3 }
  ]
  const typeOptions = WORK_TYPE

  const country = ref("");
  const email = ref("");
  const company = ref("");
  const tel = ref("");
  const uploadProduct = async () => {
    if(!uploadList.value || uploadList.value.length === 0){
      msg("upload 1 composition at least")
      return;
    }
    let errMsg = '';
    uploadList.value.forEach((item) => {
      if(item.type === null){
        errMsg = "select the composition type in each composition";
      }
      if(item.time === ''){
        errMsg = "select the release time in each composition";
      }
      if(!item.intro){
        errMsg = "fill in all composition introduction";
      }
      if(!item.img){
        errMsg = "upload all composition poster";
      }
      let personNum = 0;
      item.names.forEach((leaf) => {
        if(leaf) {
          personNum ++;
        }
      })
      if(personNum === 0){
        errMsg = "fill in 1 creator name at least in each composition";
      }
      if(!item.name){
        errMsg = "fill in all composition name";
      }
    })
    if(errMsg){
      msg(errMsg);
      return;
    }
    if(!country.value){
      msg("select the country");
      return;
    }
    if(!company.value){
      msg("fill in the company");
      return;
    }
    if(!email.value){
      msg("fill in your email");
      return;
    }
    if(!tel.value){
      msg("fill in your telphone");
      return;
    }
    let works = [];
    uploadList.value.forEach((item) => {
      let data = {
        name: item.name,
        cover_url: item.img,
        type: item.type + 1,
        release_time: item.time,
        description: item.intro
      }
      let creator = ""
      item.names.forEach((leaf) => {
        if(leaf) {
          creator += (',' + leaf);
        }
      })
      data.creator_name = creator.substring(1);
      works.push(data);
    })
    
    let res = await post("/work/upload", {
      works: works,
      region: country.value,
      company_name: company.value,
      email: email.value,
      telephone: tel.value
    })
    uploadList.value = [JSON.parse(JSON.stringify(uL))];
    country.value = "";
    company.value = "";
    email.value = "";
    tel.value = "";
    msg("upload successfully")
  }
  const uploadList = ref([JSON.parse(JSON.stringify(uL))])
  const add = () => {
    uploadList.value.push(JSON.parse(JSON.stringify(uL)))
  }
  const delUploadItem = (index) => {
    uploadList.value.splice(index, 1);
  }
  const uploadImageFnc = (res, index) => {
    uploadList.value[index].img = res?.url;
  }
  const countryChange = (e) => {
    const countryObj = countryOptions[e.detail.value]
    country.value = countryObj.label
  }
</script>

<template>
  <view class="identify-form">
    <view class="form-box" v-for="(item, index) in uploadList" :key="index">
        <view v-if="uploadList.length > 1" class="del-btn" @click="delUploadItem(index)">
          <view class="del-icon"></view>
        </view>
        <view class="form-item">
          <view class="label">Name:</view>
          <input class="input" v-model="item.name" />
        </view>
        <view class="form-item">
          <view class="label">Creator name:</view>
          <view class="flex-input">
            <input class="input" v-model="item.names[0]" />
            <input class="input" v-model="item.names[1]" />
            <input class="input" v-model="item.names[2]" />
          </view>
        </view>
        <view class="form-item">
          <view class="label">Release:</view>
          <view class="radio-box">
            <UniDataCheckbox v-model="item.time" :localdata="releaseOptions" />
          </view>
        </view>
        <view class="form-item">
          <view class="label">Intro:</view>
          <view class="flex-box">
            <view class="upload-btn" @click="chooseImage(1, (res) => uploadImageFnc(res, index))">
            <!-- <view class="upload-btn" @click="msg('not open')"> -->
              <view class="upload-btn-bg">
                <view class="preview">
                  <image
                    style="width: 148rpx; height: 220rpx"
                    :src="config.cdn + item.img"
                    mode="aspectFill"
                  />
                </view>
                <view class="upload-btn-pic"></view>
                <view class="upload-btn-text">Upload Poster</view>
              </view>
              <!-- <UniFilePicker
                  v-model="item.img"
                  mode="grid"
                  limit="1"
                  :image-styles="{
                    border: {
                    width: 0
                  }
              }"
              >
                <view class="upload-btn-bg">
                  <view class="upload-btn-pic"></view>
                  <view class="upload-btn-text">Upload Poster</view>
                </view>
              </UniFilePicker> -->
            </view>
            <view class="desc-input">
              <textarea  :maxlength="-1" class="input-area" v-model="item.intro" />
            </view>
          </view>
        </view>
        <view class="form-item">
          <view class="label">Type:</view>
          <view class="radio-box">
            <UniDataCheckbox v-model="item.type" :localdata="typeOptions" />
          </view>
        </view>
    </view>
    <button class="add-btn" @click="add">ADD</button>
    <view class="form-box" style="margin-top: 20rpx">
      <view class="form-item">
        <view class="label">Countries/Regions:</view>
        <picker :range="countryOptions" range-key="label" @change="countryChange">
          <view class="input">{{ country }}</view>
        </picker>
      </view>

      <view class="form-item">
        <view class="label">Company:</view>
        <input class="input" v-model="company" />
      </view>

      <view class="form-item">
        <view class="label">Email:</view>
        <input class="input" v-model="email" />
      </view>

      <view class="form-item">
        <view class="label">Phone:</view>
        <input class="input" v-model="tel" />
      </view>
    </view>

    <view>
      <button class="save-btn" @click="uploadProduct">UPLOAD</button>
    </view>
  </view>
</template>

<style scoped lang="scss">
  .identify-form {
    .form-box {
      position: relative;
      padding: 30rpx 20rpx 20rpx;
      background: #d9d9d91a;
      border-radius: 10rpx;
      width: 100%;
      margin-bottom: 20rpx;
      .form-item {
        margin-bottom: 12rpx;
        .label {
          font-size: 18rpx;
          font-weight: 600;
          line-height: 20rpx;
          color: #fff;
          margin-bottom: 10rpx;
        }
        .input {
          box-sizing: initial;
          height: 24rpx;
          background: #e6e6e61a;
          padding: 12rpx 20rpx;
          font-size: 18rpx;
          font-weight: 400;
          line-height: 20rpx;
          color: #e31481;
        }
        .radio-box {
          background: #e6e6e61a;
          padding: 12rpx 20rpx;
        }
        .flex-input {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #e6e6e61a;
          padding: 4rpx;
          .input {
            background: rgb(16 11 46 / 50%);
            margin-right: 4rpx;
            &:last-child {
              margin-right: 0;
            }
          }
        }
      }

      .flex-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .upload-btn {
          width: 148rpx;
          height: 220rpx;
          margin-right: 8rpx;
          .upload-btn-bg {
            width: 148rpx;
            height: 220rpx;
            background: #313049;
            padding-top: 40rpx;
            position: relative;
            .upload-btn-pic {
              width: 80rpx;
              height: 80rpx;
              background: url(@/static/img/ecosystem/upload-btn.png) no-repeat
                center;
              background-size: 100% 100%;
              margin: 0 auto 20rpx;
            }
            .upload-btn-text {
              font-size: 20rpx;
              font-weight: 600;
              line-height: 24rpx;
              text-align: center;
              color: #a6a6a6;
              padding: 0 20rpx;
            }
          }

          .preview {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        }

        .desc-input {
          flex-grow: 1;
          padding: 32rpx;
          height: 220rpx;
          background: #e6e6e61a;

          .input-area {
            width: 100%;
            font-size: 18rpx;
            font-weight: 400;
            line-height: 22rpx;
            color: #e31481;
          }
        }
      }

      .del-btn {
        position: absolute;
        top: 6rpx;
        right: 6rpx;
        width: 40rpx;
        height: 40rpx;
        border-radius: 4rpx;
        background: rgba(217, 217, 217, 0.10);
        box-shadow: 0px 8rpx 8rpx 0px rgba(0, 0, 0, 0.25);
        backdrop-filter: blur(1.7372653484344482px);
        display: flex;
        justify-content: center;
        align-items: center;
        .del-icon {
          width: 24rpx;
          height: 24rpx;
          background: url(@/static/img/ecosystem/delete-icon.png) no-repeat center;
          background-size: 100% 100%;
        }
      }
    }

    .add-btn {
      width: 200rpx;
      height: 48rpx;
      margin: 0 auto;
      background: #e31481;
      font-size: 24rpx;
      line-height: 48rpx;
      font-weight: 500;
      color: #fff;
    }

    .save-btn {
      width: 264rpx;
      height: 64rpx;
      margin: 48rpx auto 0;
      background: linear-gradient(139.26deg, #4715eb -9.48%, #6c1cc7 188.6%);
      font-size: 28rpx;
      font-weight: 900;
      line-height: 64rpx;
      text-align: center;
      color: #fff;
    }
  }
</style>
