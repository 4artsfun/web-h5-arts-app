<script setup>
  import { onMounted, ref, watch } from 'vue'
  import GlobalDialog from '../../../components/global-dialog/global-dialog.vue'
  import { useUserLogin } from '../hooks/userLogin'
  import { useUserInfo } from '../hooks/userInfo'
  import IdentityList from './IdentityList.vue'
  import TokenBorderSelect from '@/pages/works/upload/TokenBorderSelect.vue'
  const { logout } = useUserLogin()
  const { ent, art, tokenList, getAsset, getWorkTotal } = useUserInfo()

  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    }
  })
  const emit = defineEmits(['update:show'])
  const close = () => emit('update:show', false)

  watch(
    () => props.show,
    (val) => {
      if (val) {
        getAsset()
        getWorkTotal()
      }
    }
  )

  const logoutFunc = () => {
    close()
    logout()
  }
</script>

<template>
  <GlobalDialog :show="props.show" @close="close" title="Mine">
    <div class="content">
      <div class="content-title">Asset</div>
      <div class="card-token">
        <div class="card ent">
          <div class="icon"></div>
          <div class="text">
            <div>ENT</div>
            <div>{{ ent }}</div>
          </div>
        </div>
        <div class="card art">
          <div class="icon"></div>
          <div class="text">
            <div>ART</div>
            <div>{{ art }}</div>
          </div>
        </div>
      </div>

      <div class="content-title">Choosing an ecological identity</div>
      <IdentityList style="margin-bottom: 40rpx" />

      <div class="content-title">Fan Token</div>
      <div class="fan-token-list">
        <div class="token-item" v-for="token in tokenList" :key="token.WorkId">
          <div class="left-text">
            <div>{{ token.TokenName }}</div>
            <div class="split-line"></div>
            <div>{{ token.Work.TokenBalance }}</div>
          </div>
          <TokenBorderSelect class="pic-box">
            <img class="token-cover" :src="token.CoverURL" />
          </TokenBorderSelect>
        </div>
      </div>

      <div class="logout-flex">
        <div class="logout-btn" @click="logoutFunc"></div>
      </div>
    </div>
  </GlobalDialog>
</template>

<style lang="scss" scoped>
  .content {
    .content-title {
      font-size: 32rpx;
      font-weight: 500;
      margin-bottom: 10rpx;
    }
    .card-token {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30rpx;
      .card {
        display: flex;
        align-items: center;
        flex-grow: 1;
        max-width: 304rpx;
        padding: 14rpx 20rpx;
        border-radius: 60rpx;
        background: rgba(153, 153, 153, 0.4);
        .icon {
          width: 84rpx;
          height: 84rpx;
          border-radius: 50%;
          margin-right: 14rpx;
        }
        &.ent {
          .icon {
            background: url('/static/images/account/ent.png') no-repeat center /
              contain;
          }
        }
        &.art {
          .icon {
            background: url('/static/images/account/art.png') no-repeat center /
              contain;
          }
        }
        .text {
          font-size: 28rpx;
          font-weight: 500;
        }
      }
    }

    .fan-token-list {
      font-size: 26rpx;
      font-weight: 400;

      .token-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20rpx;

        .left-text {
          display: flex;
          align-items: center;
        }

        .split-line {
          width: 1rpx;
          height: 32rpx;
          margin: 0 20rpx;
          background-color: #fff;
        }
        .pic-box {
          width: 50rpx;
          height: 50rpx;
        }
        .token-cover {
          width: 32rpx;
          height: 32rpx;
          border-radius: 50%;
          background: rgba(204, 204, 204, 1);
        }
      }
    }

    .logout-flex {
      margin-top: 30rpx;
      display: flex;
      justify-content: flex-end;
      .logout-btn {
        cursor: pointer;
        width: 40rpx;
        height: 40rpx;
        background: url('/static/images/account/exit.png') no-repeat center /
          contain;
      }
    }
  }
</style>
