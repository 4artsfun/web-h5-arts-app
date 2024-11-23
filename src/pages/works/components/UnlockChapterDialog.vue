<script setup>
  import { computed, ref, watch } from 'vue'
  import GlobalDialog from '../../../components/global-dialog/global-dialog.vue'
  import FormPicker from '../../../components/global-form/FormPicker.vue'
  import { msg } from '../../../common/js/util'
  import { useWorks } from '../hooks/works.js'
  const { unlockWorkChapter } = useWorks()

  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    },
    worksId: {
      type: Number,
      default: null
    },
    // 解锁进度
    progress: {
      type: Number,
      default: 0
    },
    totalChapter: {
      type: Number,
      default: 0
    }
  })
  const emit = defineEmits(['update:show', 'buySucc'])
  const close = () => emit('update:show', false)

  const payType = ref('token')
  const payTypeList = [
    // 单价1
    { key: 'token', label: 'Fan Token', price: 1, minBuyNum: 1 },
    // 单价0.1, 最少购买30章
    { key: 'usdt', label: 'USDT', price: 0.1, minBuyNum: 30 }
  ]

  const payTypeObj = computed(() =>
    payTypeList.find((item) => item.key === payType.value)
  )

  // 切换类型时重置购买数量
  watch(payType, (val) => {
    if (val === 'token') {
      buyNum.value = payTypeObj.value.minBuyNum
    }
    if (val === 'usdt') {
      if (payTypeObj.value.minBuyNum > unlockChapter.value) {
        buyNum.value = unlockChapter.value
      } else {
        buyNum.value = payTypeObj.value.minBuyNum
      }
    }
  })

  const buyNum = ref(1)
  const minusBuyNum = () => {
    if (buyNum.value > 1) {
      buyNum.value--
    }
  }
  const PlusBuyNum = () => {
    if (buyNum.value < unlockChapter.value) {
      buyNum.value++
    }
  }

  // 计算可解锁章节数
  const unlockChapter = computed(() => {
    return props.totalChapter - props.progress
  })

  // 计算支付总金额
  const totalPrice = computed(() => {
    if (payType.value === 'usdt') {
      return (buyNum.value * payTypeObj.value.price).toFixed(1)
    } else {
      return (buyNum.value * payTypeObj.value.price).toFixed(0)
    }
  })

  const inviteFunc = () => {}
  const payFunc = async () => {
    if (payType.value === 'usdt') {
      msg('Coming Soon')
    } else {
      await buyChapter()
    }
  }
  const payPending = ref(false)
  const buyChapter = async () => {
    payPending.value = true

    const res = await unlockWorkChapter({
      worksId: props.worksId,
      count: buyNum.value
    })
    payPending.value = false
    if (Object.keys(res).length === 0 && res.constructor === Object) {
      msg('Purchase successful')
      emit('buySucc')
      close()
    } else {
      msg('Purchase failed')
    }
  }
</script>

<template>
  <GlobalDialog :show="props.show" @close="close" title="Unlocked chapters">
    <div class="content">
      <div class="desc">
        Please purchase before watching subsequent chapters,
        {{ payTypeObj.price }} {{ payTypeObj.label }} for one chapter
      </div>
      <div class="form-item">
        <div class="label">Payment method</div>
        <div class="picker-item">
          <FormPicker :options="payTypeList" v-model="payType" />
          <div class="pay-method"></div>
        </div>
      </div>
      <div class="form-item">
        <div class="label">Chapters</div>

        <div class="chapter-num">
          <!-- prettier-ignore -->
          <div class="minus" :class="{ disabled: buyNum === 1 }" @click="minusBuyNum">-</div>
          <div>{{ buyNum }}</div>
          <div
            class="plus"
            :class="{ disabled: buyNum === unlockChapter }"
            @click="PlusBuyNum"
          >
            +
          </div>
        </div>
      </div>

      <div class="pay-btn" v-if="!payPending" @click="payFunc">
        Pay {{ totalPrice }} {{ payTypeObj.label }}
      </div>
      <div class="pay-btn pend-btn" v-if="payPending">
        <div class="global-pending"></div>
      </div>

      <div v-if="payType === 'token'" class="text-btn" @click="inviteFunc">
        Invite to earn token
      </div>
      <div
        v-if="payType === 'usdt'"
        class="text-btn"
        @click="msg('Coming Soon')"
      >
        Recharge USDT
      </div>
    </div>
  </GlobalDialog>
</template>

<style scoped lang="scss">
  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .content {
    .desc {
      font-size: 26rpx;
      font-weight: 400;
      line-height: 34rpx;
      text-align: center;
      margin-bottom: 20rpx;
    }
    .form-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40rpx;
      .label {
        font-size: 28rpx;
        font-weight: 400;
      }
      .num {
        font-size: 48rpx;
        font-weight: 700;
        min-width: 180rpx;
        text-align: center;
      }

      .chapter-num {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 120rpx;
        color: #fff;
        font-size: 40rpx;
        font-weight: 700;
        margin: 0 40rpx;
        position: relative;
        z-index: 2;
        .minus,
        .plus {
          position: absolute;
          z-index: 3;
          top: 50%;
          transform: translateY(-50%);
          width: 64rpx;
          height: 64rpx;
          border-radius: 50rpx;
          background: #e31481;
          text-align: center;
          line-height: 60rpx;
          font-size: 50rpx;
          font-weight: 400;
          color: #fff;
          cursor: pointer;
          transition: all 0.3s ease;
          &.disabled {
            background: #222329;
            cursor: default;
          }
        }
        .minus {
          left: -40rpx;
        }
        .plus {
          right: -40rpx;
        }
      }
    }

    .pay-btn {
      @extend.flex-center;
      height: 96rpx;
      border-radius: 80rpx;
      background: linear-gradient(
        151.16deg,
        rgba(15, 42, 247, 1) 0%,
        rgba(235, 20, 132, 1) 100%
      );
      color: #fff;
      font-size: 32rpx;
      font-weight: 600;
      margin-bottom: 40rpx;

      &.pend-btn {
        background: linear-gradient(
          151.16deg,
          rgba(15, 42, 247, 0.6) 0%,
          rgba(235, 20, 131, 0.6) 100%
        );
      }
    }

    .text-btn {
      @extend.flex-center;
      height: 96rpx;
      border-radius: 80rpx;
      border: 2rpx solid #fff;
      font-size: 32rpx;
      font-weight: 400;
    }
  }

  .picker-item {
    @extend.flex-center;
    position: relative;
    min-width: 180rpx;
    height: 80rpx;
    border-radius: 40rpx;
    border: 2rpx solid #dddddd;
    ::v-deep {
      .pick-input {
        border: 0;
        background: unset;
        font-size: 28rpx;
        font-weight: 500;
        color: #fff;
        padding: 20rpx 62rpx 20rpx 32rpx;
      }
    }
    .pay-method {
      pointer-events: none;
      position: absolute;
      z-index: 2;
      right: 20rpx;
      width: 32rpx;
      height: 16rpx;
      background: url('/static/images/works/pay-method.png') no-repeat center /
        contain;
      filter: brightness(100);
    }
  }
</style>
