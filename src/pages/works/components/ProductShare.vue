<script setup>
  import { ref, computed } from 'vue'
  import InvitedListDialog from './InvitedListDialog.vue'
  import { useWorks } from '../hooks/works'
  import { useShare } from '../hooks/share'
  const { getInviteUrl, shareX } = useShare()
  const { workCheckIn } = useWorks()

  const props = defineProps({
    worksId: {
      type: Number
    },
    worksType: {
      type: Number
    },
    inviteCount: {
      type: Number,
      default: 0
    },
    pic: {
      type: String,
      default: ''
    },
    tokenPic: {
      type: String,
      default: ''
    },
    tokenName: {
      type: String,
      default: ''
    },
    tokenBalance: {
      type: [String, Number],
      default: ''
    },
    signedIn: {
      type: Boolean,
      default: false
    }
  })
  const showInviteDialog = ref(false)

  const formatNumberWithUnit = (num) => {
    if (num === undefined || num === null) return '0'
    if (typeof num === 'string') num = parseFloat(num)
    if (num < 1000) return num + ''
    if (num < 1000000) return (num / 1000).toFixed(1) + 'k'
    if (num < 1000000000) return (num / 1000000).toFixed(1) + 'm'
    return (num / 1000000000).toFixed(1) + 'b'
  }

  const inviteNum = computed(() => formatNumberWithUnit(props.inviteCount))

  const inviteUrl = computed(() =>
    getInviteUrl({ workId: props.worksId, type: props.worksType })
  )

  const emit = defineEmits(['checkInFinish'])
  const checkPending = ref(false)
  const checkInFunc = async () => {
    if (checkPending.value) {
      return
    }
    checkPending.value = true
    await workCheckIn({ worksId: props.worksId })
    emit('checkInFinish')
    checkPending.value = false
  }
</script>

<template>
  <div>
    <div class="product-share">
      <img class="product-bg" :src="pic" />
      <div class="mask">
        <div class="avatar-border">
          <img class="cover-img" :src="tokenPic" />
        </div>
        <div class="name-flex">
          <div class="balance">{{ tokenBalance }}</div>
          <div>{{ tokenName }}</div>

          <div v-if="props.signedIn" class="check-in disabled">
            <div class="check-icon"></div>
            <div>Checked</div>
          </div>
          <div
            v-else
            class="check-in"
            :class="{ 'check-pending': checkPending }"
            @click="checkInFunc"
          >
            <div class="check-icon"></div>
            <div>Check in</div>
            <div class="tips" v-if="!checkPending">+5</div>
            <div class="global-pending" v-else></div>
          </div>
        </div>
        <div class="tips">
          Retweet the link to X, <br />Reward
          <b class="red-text">5 tokens</b> for each successful invitation
        </div>

        <div class="share-links">
          <div class="link-box">
            {{ inviteUrl }}
          </div>
        </div>

        <div class="btn-list">
          <div class="btn" @click="shareX({ inviteUrl, workId: worksId })">
            X Forward
          </div>
          <div class="btn" @click="showInviteDialog = true">
            Invited {{ inviteNum }} ppl
          </div>
        </div>
      </div>
    </div>
    <InvitedListDialog :worksId="worksId" v-model:show="showInviteDialog" />
  </div>
</template>

<style lang="scss" scoped>
  .product-share {
    position: relative;
    height: 486rpx;
    clip-path: inset(0 round 0 0 40rpx 40rpx);

    .product-bg {
      object-fit: cover;
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #f5f5f5;
    }
    .mask {
      position: absolute;
      z-index: 2;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      padding: 20rpx 30rpx 30rpx;
    }

    .avatar-border {
      margin: 0 auto 5rpx;
      display: flex;
      width: 160rpx;
      height: 160rpx;
      background: url('/static/images/works/avatar-border.svg') no-repeat center /
        contain;
    }
    .cover-img {
      margin: auto;
      width: 130rpx;
      height: 130rpx;
      border: 2rpx solid rgba(153, 153, 153, 1);
      border-radius: 50%;
      object-fit: cover;
    }

    .name-flex {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 36rpx;
      font-weight: 600;
      color: #eeeeee;
      text-align: center;
      margin-bottom: 10rpx;
      .balance {
        margin-right: 20rpx;
      }
      .check-in {
        margin-left: 16rpx;
        height: 60rpx;
        padding: 0 16rpx;
        opacity: 1;
        border-radius: 40rpx;
        background: linear-gradient(
          90deg,
          rgb(5, 250, 234) 0%,
          rgb(126, 0, 245) 100%
        );
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28rpx;
        font-weight: 400;

        &.check-pending {
          opacity: 0.6;
        }
        &.disabled {
          background: linear-gradient(
            90deg,
            rgb(12, 184, 188) 0%,
            rgb(47, 84, 186) 100%
          );
        }

        .check-icon {
          width: 32rpx;
          height: 32rpx;
          background: url('/static/images/works/check-in.png') no-repeat center /
            contain;
          margin-right: 10rpx;
        }
        .tips {
          font-size: 24rpx;
          margin-top: 8rpx;
          margin-left: 10rpx;
        }
      }
    }
    .tips {
      font-size: 28rpx;
      font-weight: 400;
      line-height: 32rpx;
      color: #eeeeee;
      text-align: center;
      margin-bottom: 8rpx;
      .red-text {
        font-weight: 400;
        color: #eb1484;
      }
    }

    .share-links {
      height: 62rpx;
      border-radius: 30rpx;
      background: rgba(17, 17, 17, 1);
      border: 1rpx solid rgba(235, 20, 132, 1);
      padding: 10rpx 16rpx;

      .link-box {
        width: 100%;
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
        font-size: 24rpx;
        font-weight: 400;
        color: #999999;
      }
    }

    .btn-list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 12rpx;
      .btn {
        width: 340rpx;
        height: 62rpx;
        border-radius: 30rpx;
        background: linear-gradient(
          146.07deg,
          rgba(235, 20, 132, 1) 0%,
          rgba(201, 28, 195, 1) 99.99%,
          rgba(200, 28, 197, 1) 100.99%,
          rgba(200, 28, 197, 1) 101.99%
        );
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 32rpx;
        font-weight: 600;
        color: #ffffff;
      }
    }
  }
</style>
