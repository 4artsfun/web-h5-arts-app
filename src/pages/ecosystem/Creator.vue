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
    <InComeBar @change="activeChange" />
    <view v-if="active === 'pic'">
      <view class="desc">
        Creator Ecosystem releases 1,800,000,000 ENT&6,000,000ART in its first
        year，and hold caertor NFT can earn ENT&ART tokens Creator contribution =
        contribution factor * NFT level
      </view>
      <view class="desc">
        Earned ENT&ART amount = creator contribution/total creator contribution
        this week * total amount of creator ENT&ART released this
        week(34,610,000ENT & 115,000ART)
      </view>
      <view class="creator-pic"></view>
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

  .creator-pic {
    height: 1038rpx;
    background: url(@/static/img/ecosystem/creator-form.png) no-repeat center;
    background-size: 100% 100%;
  }
</style>
