<script setup>
  import { ref, onMounted } from 'vue'
  import InComeBar from './components/InComeBar.vue'
  import IdentifyTable from './components/IdentifyTable.vue'
  import IdentifyForm from './components/IdentifyForm.vue'
  import PartnerDialog from './components/PartnerDialog.vue'
  import {get} from "../../common/js/ajax";
  import {msg} from "../../common/js/util";

  const partnerDialogRef = ref(null)

  const active = ref('pic')
  const activeChange = (status) => {
    active.value = status
  }

  const kycStatus = ref(0);
  onMounted(() => {
    getIdCard();
  })
  const getIdCard = async () => {
    let res = await get('/channel/info');
    kycStatus.value = {auditStatus: res.status * 1};

    // if(!res || res.length === 0 || res[0].auditStatus === null){
    //   kycStatus.value = 0;
    // }else{
    //   kycStatus.value = res[0].auditStatus * 1 + 1;
    // }
  }
  const judgeKycStatus = () => {
    if(kycStatus.value === 1){
      msg("wait for check")
      return;
    }
    if(kycStatus.value === 2){
      msg("kyc successfully")
      return;
    }
    if(kycStatus.value === 3){
      failedBox.value.open();
      return;
    }
    openPartner();
  }

  const openPartner = () => {
    partnerDialogRef.value.showPopup();
  }
  const failedBox = ref();
</script>

<template>
  <view>
    <PartnerDialog ref="partnerDialogRef" @getIdCard="getIdCard"/>
    <lu-modal content="Kyc failed, Are you sure to resubmit it" ref="failedBox" @onConfirm="openPartner"/>
    <InComeBar @change="activeChange" />
    <view class="title" @click="judgeKycStatus">
      <image v-if="kycStatus === 3" src="/static/img/ecosystem/channel/warning.png"/>
      <image v-if="kycStatus === 2" src="/static/img/ecosystem/channel/correct.png"/>
      <image v-if="kycStatus === 1" src="/static/img/ecosystem/channel/ing.png"/>
      <text>Entertainment agent</text>
    </view>
    <view v-show="active === 'pic'">
      <view class="desc">
        Hold Channel NFT can earn ENT&ART tokens Entertainment agent contribution
        <text class="mark">=</text> contribution factor
        <text class="mark">*</text> NFT level Earned ENT&ART amount
        <text class="mark">=</text> Entertainment agent contribution
        <text class="mark">/</text> total Entertainment agent contribution this month
        <text class="mark">*</text> total amount of Entertainment agent ENT&ART
        released this month
      </view>
      <view class="channel-pic"></view>
    </view>
    <view v-if="active === 'list'">
      <IdentifyTable />
    </view>
    <view v-if="active === 'form'">
      <IdentifyForm />
    </view>
  </view>
</template>

<style scoped lang="scss">
.title {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  image{
    width: 40rpx;
    height: 40rpx;
  }
  text{
    padding-left: 20rpx;
    font-size: 24rpx;
    font-weight: 900;
    line-height: 28rpx;
    background: linear-gradient(90deg, #05c5fa 25%, #00f5e4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: right;
  }
  padding-bottom: 20rpx;
}
  .desc {
    font-size: 20rpx;
    font-weight: 500;
    line-height: 24rpx;
    text-align: justify;
    color: #ffffff;
    margin-bottom: 30rpx;

    .mark {
      color: #6d84ff;
    }
  }

  .channel-pic {
    height: 1080rpx;
    background: url(@/static/img/ecosystem/channel-form.png) no-repeat center;
    background-size: 100% 100%;
  }
</style>
