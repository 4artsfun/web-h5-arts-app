<script setup>
  import { ref, onMounted, watch } from 'vue'
  import Nav from '../common/nav.vue'
  import ChainDialog from './components/ChainDialog.vue'
  import { get } from '../../common/js/ajax'
  import { date } from '../../common/js/util.js'
  import { usePageScroll } from '../common/menu.js'
  const { scroll, scrollShadow } = usePageScroll()
  import { useStore } from 'vuex'
  const store = useStore()
  const navEl = ref(null)
  const chainDialogEl = ref(null)
  import TimeCountDown from './components/TimeCountDown.vue'
  const startTime = ref(0)
  const endTime = ref(0)

  import UserTypeIcon from './components/UserTypeIcon.vue'
  const userType = ref(0)

  import UserWalletSelect from './components/UserWalletSelect.vue'
  import SliderBar from './components/SliderBar.vue'

  import { participateInIdo } from '../../common/js/useSolana.js'
  import { useWriteContract } from '@wagmi/vue'
  const { writeContract } = useWriteContract()
  import {
    claimOpen,
    getAllowance,
    getPayCoinBalance,
    ido,
    idoClaim,
    idoEvm,
    idoInfo,
    setClaimOpen
  } from '../../common/js/walletUtil.js'
  import config from '../../common/js/config.js'

  const tonEntRate = ref(0)
  const usdtEntRate = ref(0)
  const totalRaised = ref(0)
  const idoStartTime = ref(0)
  const claimStartTime = ref(0)
  const hardCap = ref(0)
  const raisedPercent = ref(0)
  const personalCapMin = ref(0)
  const personalCapMax = ref(0)
  const totalPurchased = ref(0)
  const claimable = ref(0)

  const balance = ref(0)
  const allowValue = ref(0)
  const status = ref(3) // 0 init | 1 pending | 2 calculating | 3 disabled
  const evmStatus = ref(5) // 0 wait approve | 1 pending | 2 Buy | 3 calculating | 4 approve disabled | 5 buy disabled

  const getData = async () => {
    let res = await get('/ido/info', {
      chain_id: store.state.chainId
    })
    if (res) {
      startTime.value = res.current_time * 1000
      endTime.value = res.ido_end_time * 1000
      claimStartTime.value = res.claim_start_time
      userType.value = res.user_type
      tonEntRate.value = res.ton_ent_rate
      usdtEntRate.value = res.usdt_ent_rate
      totalRaised.value = res.total_raised
      idoStartTime.value = res.ido_start_time
      hardCap.value = res.hard_cap

      if (res.hard_cap) {
        let num = (res.total_raised / res.hard_cap) * 100
        raisedPercent.value = parseFloat(num.toFixed(2))
      }

      personalCapMin.value = res.personal_cap.min
      personalCapMax.value = res.personal_cap.max
      totalPurchased.value = res.total_purchased
      claimable.value = res.claimable
    }
  }

  const getBuyStatus = async () => {
    // let res = await get('/ido/buyResult'); //todo edit
    let res = { wait: 0 }
    if (res.wait) {
      console.log('set status')
      status.value = 2
      evmStatus.value = 3
    }
  }
  const getClaimStatus = async () => {
    // let res = await get('/ido/claim_status'); //todo edit
    let res = { is_claimed: false }
    if (res.is_claimed) {
      claimStaus.value = 2
    } else {
      let isClaimOpen = await claimOpen()
      if (isClaimOpen) {
        console.log('set claim status 0')
        claimStaus.value = 0
      }
    }
  }
  const currentValue = ref(0)
  const changeNum = (value) => {
    if (value > totalPurchased.value) {
      status.value = 0
      if (allowValue.value === 0) {
        evmStatus.value = 0
      }
    } else {
      status.value = 3
      if (allowValue.value === 0) {
        evmStatus.value = 4
      }
    }
    currentValue.value = value
  }

  const buyFunc = (type) => {
    if (type === 'ton') {
      buy()
    }
    if (type === 'sol') {
      buySol()
    }
    if (type === 'eth' || type === 'bnb') {
      buyEvm()
    }
  }

  const buy = async () => {
    let amount = currentValue.value - totalPurchased.value
    if (amount > 0) {
      await ido(status, amount + 0.1)
    }
  }
  const buySol = async () => {
    let amount = currentValue.value - totalPurchased.value
    if (amount > 0) {
      await participateInIdo(status, amount)
    }
  }
  const buyEvm = async () => {
    let amount = currentValue.value - totalPurchased.value
    if (evmStatus.value === 2 || amount > 0) {
      await idoEvm(evmStatus, amount, writeContract, allowValue)
    }
  }

  // prettier-ignore
  const seek = () => {
    if(store.state.chain === 'ton'){
      let prefix = config.network === "testnet"? 'testnet.': '';
      window.open('https://' + prefix + 'tonviewer.com/' + store.state.friendAddress);
    }
    if(store.state.chain === 'eth'){
      let prefix = config.network === "testnet"? 'sepolia.': '';
      window.open('https://' + prefix + 'etherscan.io/address/' + store.state.friendAddress);
    }
    if(store.state.chain === 'bnb'){
      let prefix = config.network === "testnet"? 'testnet.': '';
      window.open('https://' + prefix + 'bscscan.com/address/' + store.state.friendAddress);
    }
    if(store.state.chain === 'sol'){
      let suffix = config.network === "testnet"? '?cluster=devnet': '';
      window.open('https://explorer.solana.com/address/' + store.state.friendAddress + suffix);
    }
  }

  const claimStaus = ref(3)
  const claim = () => {
    idoClaim(claimStaus, writeContract)
  }
  const getBalance = async () => {
    balance.value = await getPayCoinBalance()
  }
  const chainUnit = ref('TON')
  watch(
    () => store.state.chain,
    async (val) => {
      if (val) {
        if (store.state.chain === 'ton') {
          chainUnit.value = 'TON'
        } else {
          chainUnit.value = 'USDT'
        }
        getData()
        getClaimStatus()
        getBuyStatus()
        setTimeout(async () => {
          getBalance()
          if (store.state.chain === 'eth' || store.state.chain === 'bnb') {
            let res = await getAllowance()
            if (res > 0) {
              evmStatus.value = 2
            }
            allowValue.value = res
          }
        }, 300)
        // setClaimOpen(true);
      } else {
        if(!store.state.friendAddress){
          store.dispatch("openWallet");
        }
      }
    },
    { immediate: true }
  )
  watch(allowValue, async () => {
    console.log('refresh pay coin balance')
    getBalance()
  })
</script>
<template>
  <scroll-view scroll-y style="height: 100vh" @scroll="scroll">
    <Nav ref="navEl" :sel-index="7" :scrollShadow="scrollShadow" />
    <ChainDialog ref="chainDialogEl"/>
    <view class="page-content">
      <view class="page-title">
        <view class="title">Private IDO</view>
        <view class="time">
          <TimeCountDown :startTime="startTime" :endTime="endTime" />
        </view>
      </view>

      <view class="user-info">
        <UserTypeIcon :type="userType" />
        <UserWalletSelect
          :chain="store.state.chain"
          @changeChain="(chain) => $refs.chainDialogEl.changeChain(chain)"
        />
      </view>

      <view class="price-info">
        <view class="title">Price</view>
        <view class="value">
          1 TON = {{ tonEntRate }} ENT、1 USDT = {{ usdtEntRate }} ENT
        </view>
      </view>

      <view class="raised-info">
        <view class="title">Total raised</view>
        <view class="progress-value">
          <view class="value-num">
            {{ totalRaised }} USDT ({{ raisedPercent }}%)
          </view>
          <a-progress
            :strokeWidth="4"
            :stroke-color="{
              '0%': '#4B93FF',
              '100%': '#D844F0'
            }"
            trailColor="#4D4D4D"
            :show-info="false"
            :percent="raisedPercent"
          />
        </view>
      </view>

      <view class="buy-bar">
        <view class="slider-bar">
          <SliderBar
            :balance="balance"
            :chain="store.state.chain"
            :allowValue="allowValue"
            :min="personalCapMin"
            :max="personalCapMax"
            @change="changeNum"
          />
        </view>
        <view
          v-if="['ton', 'sol'].includes(store.state.chain)"
          class="buy-btn"
          :class="{ disabled: status !== 0 }"
          @click="buyFunc(store.state.chain)"
        >
          <div v-if="[0, 3].includes(status)">BUY</div>
          <div v-if="[1, 2].includes(status)" class="pending"></div>
        </view>

        <view
          v-if="['eth', 'bnb'].includes(store.state.chain)"
          class="buy-btn"
          :class="{ disabled: evmStatus !== 0 && evmStatus !== 2 }"
          @click="buyFunc(store.state.chain)"
        >
          <div v-if="[0, 4].includes(evmStatus)">APPROVE</div>
          <div v-if="[1, 3].includes(evmStatus)" class="pending"></div>
          <div v-if="[2, 5].includes(evmStatus)">BUY</div>
        </view>
      </view>

      <view class="claim-info">
        <view class="info-item">
          <view class="title">Start Time</view>
          <view class="value">{{ date('Y-m-d H:i:s', idoStartTime) }}</view>
        </view>
        <view class="info-item">
          <view class="title">Hard cap</view>
          <view class="value">{{ hardCap }} {{ chainUnit }}</view>
        </view>
        <view class="info-item">
          <view class="title">Personal cap</view>
          <view class="value">
            {{ personalCapMin }} {{ chainUnit }} ~ {{ personalCapMax }}
            {{ chainUnit }}
          </view>
        </view>
        <view class="info-item">
          <view class="title">Total Purchased</view>
          <view class="value">{{ totalPurchased }} {{ chainUnit }}</view>
        </view>
        <view class="info-item">
          <view class="title">Claimable</view>
          <view class="value">{{ claimable }} ENT</view>
        </view>
      </view>

      <view class="claim-btns">
        <view
          class="claim-btn"
          :class="{ disabled: claimStaus !== 0 }"
          @click="claim"
        >
          <view v-if="claimStaus === 0"> Claim ENT </view>
          <view v-if="claimStaus === 1"> ... </view>
          <view v-if="claimStaus === 2"> Claimed </view>
          <view v-if="claimStaus === 3"> Claim is coming soon </view>
        </view>
        <view class="seek" @click="seek">
          <view>Check Records</view>
          <image class="seek-icon" src="/static/images/ido/look.png" />
        </view>
      </view>

      <view class="tip">
        <view class="text">
          The current IDO ended on {{ date('Y-m-d H:i:s', endTime) }}.
        </view>
        <view class="text">
          $ENT will be released on
          {{ date('Y-m-d H:i:s', claimStartTime) }}.
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<style scoped lang="scss">
  .page-content {
    padding: 0 40rpx 50rpx;
  }
  .flex-center {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .page-title {
    @extend .flex-center;
    margin-bottom: 24rpx;
    .title {
      font-size: 32rpx;
      font-weight: bold;
      color: #fff;
    }
  }
  .user-info {
    @extend .flex-center;
    margin-bottom: 24rpx;
    font-size: 24rpx;
    color: #fff;
  }

  .price-info {
    @extend .flex-center;
    margin-bottom: 24rpx;
    color: #fff;
    font-size: 24rpx;
    .title {
      font-weight: 600;
    }
  }

  .raised-info {
    @extend .price-info;
    .progress-value {
      flex-grow: 1;
      margin-left: 40rpx;
      .value-num {
        text-align: right;
        font-size: 16rpx;
        margin-bottom: -20rpx;
      }
    }
  }

  .buy-bar {
    @extend .flex-center;
    margin-bottom: 24rpx;
    .slider-bar {
      flex-grow: 1;
      margin-right: 48rpx;
    }
    .buy-btn {
      min-width: 100rpx;
      width: 100rpx;
      height: 54rpx;
      border-radius: 20rpx;
      font-size: 22rpx;
      font-weight: 700;
      text-align: center;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(90deg, #6f38e0 0%, #d160eb 100%);
      align-self: flex-start;

      &.disabled {
        background: #aaa;
      }
    }
  }
  .claim-info {
    border-radius: 20rpx;
    background: #0e0c1a;
    padding: 30rpx;

    .info-item {
      @extend .flex-center;
      font-size: 20rpx;
      color: #fff;
      font-weight: 600;
      margin-bottom: 16rpx;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .claim-btns {
    position: relative;
    .seek {
      position: absolute;
      z-index: 1;
      right: 0;
      top: 8rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 22rpx;
      color: #fff;
      .seek-icon {
        width: 20rpx;
        height: 20rpx;
        margin-left: 10rpx;
      }
    }
  }

  .claim-btn {
    width: 200rpx;
    height: 60rpx;
    border-radius: 50rpx;
    font-size: 22rpx;
    font-weight: 700;
    line-height: 26rpx;
    text-align: center;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(90deg, #05faea -75.76%, #7e00f5 154.55%);
    margin: 40rpx auto 30rpx;
    &.disabled {
      background: #aaa;
    }
  }

  .tip {
    padding: 40rpx 0 0;
    .text {
      text-align: center;
      font-size: 24rpx;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.5);
      margin-bottom: 10rpx;
      line-height: 32rpx;
    }
  }

  .pending {
    display: inline-block;
    width: 40rpx;
    height: 40rpx;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    animation: loading 1s steps(12) infinite;
  }
  @keyframes loading {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(1turn);
    }
  }
</style>
