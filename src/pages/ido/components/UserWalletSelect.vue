<script setup>
  import { ref, computed } from 'vue'
  const props = defineProps({
    chain: {
      type: String,
      default: 'ton'
    }
  })
  
  const walletOptions = [
    { label: 'TonChain', value: 'TonChain', chain: 'ton' },
    { label: 'Ethereum', value: 'Ethereum', chain: 'eth' },
    { label: 'Solana', value: 'Solana', chain: 'sol' },
    { label: 'BNBChain', value: 'BNBChain', chain: 'bnb' }
  ]

  const selectWallet = computed(() => {
    let obj = walletOptions.find(item => item.chain === props.chain)
    return obj?.value
  })

  import { useStore } from 'vuex'
  const store = useStore()
  const selectWalletFnc = (val) => {
    dialogRef.value.showPopup(val)
  }
  const confirmWallet = async ({ val }) => {
    let findObj = walletOptions.find((item) => item.value === val)

    await store.dispatch('logout')
    emit('changeChain', findObj?.chain)
  }
  const emit = defineEmits(['changeChain'])

  import ChangeWalletDialog from './ChangeWalletDialog.vue'
  const dialogRef = ref(null)
</script>

<template>
  <ChangeWalletDialog ref="dialogRef" @confirm="confirmWallet" />
  <view class="user-wallet">
    <view style="display: flex">
      <image
        v-if="selectWallet === 'TonChain'"
        class="wallet-icon"
        src="/static/images/network/ton.png"
      />

      <image
        v-if="selectWallet === 'Ethereum'"
        class="wallet-icon"
        src="/static/images/network/eth.png"
      />

      <image
        v-if="selectWallet === 'Solana'"
        class="wallet-icon"
        src="/static/images/network/sol.png"
      />

      <image
        v-if="selectWallet === 'BNBChain'"
        class="wallet-icon"
        src="/static/images/network/bnb.png"
      />
    </view>
    <a-select
      style="width: auto !important"
      :dropdownMatchSelectWidth="120"
      :bordered="false"
      :showArrow="true"
      :value="selectWallet"
      :options="walletOptions"
      @change="selectWalletFnc"
    >
      <template #suffixIcon>
        <image
          class="suffix-icon"
          mode="heightFix"
          src="/static/images/ido/more.png"
          alt=""
        />
      </template>
    </a-select>
  </view>
</template>

<style lang="scss" scoped>
  .user-wallet {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    ::v-deep .ant-select-selector {
      padding: 0;
      .ant-select-selection-item {
        font-size: 24rpx;
        color: #fff;
      }
    }
    .wallet-icon {
      width: 48rpx;
      height: 48rpx;
      margin-right: 6rpx;
    }
    .suffix-icon {
      width: 14rpx;
      height: 10rpx;
      margin-right: -12rpx;
    }
  }
</style>
