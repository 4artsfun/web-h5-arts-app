<script setup>
  import { ref } from 'vue'
  import UniPopup from '@/components/uni-popup/uni-popup.vue'
  import config from '../../../common/js/config'
  import { chooseImage, msg } from '../../../common/js/util'

  import {post} from "../../../common/js/ajax";

  const popupRef = ref(null)
  const showPopup = () => {
    popupRef.value.open('center')
  }
  defineExpose({ showPopup })
  const uploadImageFnc = () => {
    // msg("not open");
    chooseImage(2, (res) => {
      iImg.value = res?.url
    })
  }
  const iName = ref("");
  const iEmail = ref("");
  const iPhone = ref("");
  const iImg = ref("");
  const emit = defineEmits(['getIdCard'])
  const kyc = async () => {
    if(!iName.value){
      msg("fill in partner's name");
      return;
    }
    if(!iEmail.value){
      msg("fill in partner's email");
      return;
    }
    if(!iPhone.value){
      msg("fill in partner's telephone");
      return;
    }
    if(!iImg.value){
      msg("upload the holding ID card");
      return;
    }
    let params = {channel_name: iName.value, channel_email: iEmail.value, channel_phone: iPhone.value, channel_id_card: iImg.value}
    let res = await post("/channel/submit", params)
    iImg.value = "";
    iPhone.value = "";
    iEmail.value = "";
    iName.value = "";
    popupRef.value.close();
    msg("operate success, wait for check!")
    emit("getIdCard")
  }
</script>

<template>
  <view>
    <UniPopup ref="popupRef" background-color="#060820">
      <view class="popup-content">
        <view class="close-btn" @click="$refs.popupRef.close()"></view>
        <view class="dialog-title">Entertainment agent</view>
        <view class="dialog-text">
          Note: This information is used for platform verification, is not open
          to the public, and is highly confidential to users
        </view>

        <view class="form-group">
          <view class="input-item">
            <view>Partner's name:</view>
            <input class="input" v-model="iName"/>
          </view>
          <view class="input-item">
            <view>Partner's Email:</view>
            <input class="input"  v-model="iEmail"/>
          </view>
          <view class="input-item">
            <view>Partner's telephone:</view>
            <input class="input" v-model="iPhone"/>
          </view>

          <view class="upload-photo">
            <view class="upload-btn" @click="uploadImageFnc">
              <view class="preview">
                <image
                  style="width: 300rpx; height: 300rpx"
                  :src="config.cdn + iImg"
                  mode="aspectFill"
                />
              </view>
              <view class="upload-icon"></view>
              <view class="upload-text">Front photo of holding ID card</view>
            </view>
            <view class="upload-tips">
              <view class="tips-text">Give a demonstration</view>
              <view class="down-icon"></view>
              <view class="tips-pic"></view>
            </view>
          </view>
        </view>

        <view class="submit-btn" @click="kyc">Add to Private Pool</view>
      </view>
    </UniPopup>
  </view>
</template>

<style scoped lang="scss">
  .popup-content {
    width: 700rpx;
    height: 884rpx;
    border-radius: 13px;
    border: 2px solid #3c4c5a;
    background: #060820;
    padding: 120rpx 48rpx 0;
  }

  .close-btn {
    position: absolute;
    top: 40rpx;
    left: 40rpx;
    width: 36rpx;
    height: 36rpx;
    background: url(@/static/img/genesis/close.png) no-repeat center;
    background-size: 100% 100%;
  }

  .dialog-title {
    color: #fff;
    font-family: font_Rubik;
    font-size: 28rpx;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 6rpx;
  }
  .dialog-text {
    color: #d9d9d9;
    font-size: 18rpx;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .form-group {
    margin-top: 25rpx;
    .input-item {
      background: rgba(230, 230, 230, 0.1);
      border-radius: 8rpx;
      color: #d9d9d9;
      font-size: 18rpx;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      display: flex;
      align-items: center;
      padding: 12rpx 18rpx;
      margin-bottom: 20rpx;

      .input {
        text-align: right;
        flex-grow: 1;
        color: #d9d9d9;
        font-size: 18rpx;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        padding-left: 24rpx;
      }
    }
    .upload-photo {
      display: flex;
      justify-content: space-between;
      .upload-btn {
        max-width: 300rpx;
        height: 300rpx;
        background: rgba(230, 230, 230, 0.1);
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        padding: 20rpx;
        text-align: center;
        position: relative;
        .preview {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .upload-icon {
          width: 88rpx;
          height: 74rpx;
          background: url(@/static/img/ecosystem/photo-icon.png);
          background-size: 100% 100%;
          margin-bottom: 34rpx;
        }
        .upload-text {
          color: #d9d9d9;
          font-size: 18rpx;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
      }
      .upload-tips {
        flex-grow: 1;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        .tips-text {
          color: rgba(217, 217, 217, 0.58);
          font-size: 18rpx;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
        .down-icon {
          width: 36rpx;
          height: 20rpx;
          background: url(@/static/img/ecosystem/down.png);
          background-size: 100% 100%;
          margin: 10rpx 0;
        }
        .tips-pic {
          width: 200rpx;
          height: 200rpx;
          background: url(@/static/img/ecosystem/demonstration.png);
          background-size: 100% 100%;
        }
      }
    }
  }

  .submit-btn {
    border-radius: 11.084px;
    background: linear-gradient(90deg, #00f5e4 -50.88%, #05c5fa 82.66%);
    padding: 14rpx;
    width: 245rpx;
    height: 56rpx;
    color: #fff;
    text-shadow: 0px 2rpx 8rpx rgba(0, 0, 0, 0.25);
    font-size: 20rpx;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-align: center;
    margin: 40rpx auto 0;
  }
</style>
