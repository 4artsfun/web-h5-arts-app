<script setup>
  import { ref } from 'vue'
  import InComeBar from './components/InComeBar.vue'
  import IdentifyTable from './components/IdentifyTable.vue'
  import IdentifyForm from './components/IdentifyForm.vue'
  const active = ref('pic')
  const activeChange = (status) => {
    active.value = status
  }
</script>

<template>
  <view>
    <InComeBar @change="activeChange" :showTab="false"/>
    <view class="desc">
      After the launch of the ARTS app, entertainer Ecology releases
      5,400,000,000 ENT&18,000,000ART in its first year，and hold Entertainer
      NFT can earn ENT&ART tokens Entertainer partner contribution = Entertainer
      factor * NFT level
    </view>
    <view class="desc">
      Earned ENT&ART amount = entertainer partner contribution/total entertainer
      partner contribution this month * total amount of entertainer partner
      ENT&ART released this day(14,800,000ENT & 50,000ART)
    </view>
    <view>
      <view class="entertainer-pic"></view>
    </view>
  </view>
</template>

<style scoped lang="scss">
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

  .entertainer-pic {
    height: 1000rpx;
    background: url(@/static/img/ecosystem/entertainer-form.png) no-repeat
      center;
    background-size: 100% 100%;
  }
</style>
