<script setup>
  import { ref, computed, watch } from 'vue'
  import Nav from '../common/nav.vue'
  import Banner from './components/Banner.vue'
  import DaoTabs from './components/DaoTabs.vue'
  import FilterTag from '../works/components/FilterTag.vue'
  import WorksList from '../works/list.vue'
  import UploadWorkDialog from '../works/upload/UploadWorkDialog.vue'
  import { useStore } from 'vuex'
  import { onLoad } from '@dcloudio/uni-app'
  import { post } from '../../common/js/ajax'
  import { msg, navTo } from '../../common/js/util'
  import config from '../../common/js/config'

  import { usePageScroll } from '../common/menu.js'
  const { scroll, scrollShadow } = usePageScroll()
  const claimData = ref('')
  const claimFnc = async () => {
    const res = await post('/user/claim', {
      claim_data: claimData.value
    })
    if (res) {
      msg('Claim successfully')
      claimData.value = ''
    }
  }

  const store = useStore()
  const token = computed(() => store.state.token)
  const checkWalletLogin = async (token) => {
    if (token) {
      claimFnc()
    } else {
      await store.dispatch('openWallet')
    }
  }
  watch(token, (val) => {
    if (val && claimData.value) {
      checkWalletLogin(val)
    }
  })
  onLoad((option) => {
    if (option?.claim_data) {
      claimData.value = decodeURIComponent(option.claim_data)
      checkWalletLogin(token.value)
    }
  })

  const showUploadDialog = ref(false)

  // dao info
  import useMescroll from '@/uni_modules/mescroll-uni/hooks/useMescroll.js'
  const { mescrollInit, downCallback, getMescroll } = useMescroll()
  const upOption = ref({
    page: {
      size: 12
    }
  })
  const downOption = ref({
    use: false
  })
  const type = ref('')
  const setType = (t) => {
    type.value = t
    getMescroll() && getMescroll().resetUpScroll()
  }
  const worksListEl = ref(null)
  const loadList = async (e) => {
    const { data, total } = await worksListEl.value.loadListFunc({
      page: e.num,
      size: e.size,
      type: type.value
    })
    e.endBySize(data.length, total)
  }

  const openUploadDialog = () => {
    if (token.value) {
      showUploadDialog.value = true
    } else {
      store.dispatch('openWallet')
    }
  }
</script>
<template>
  <!-- <scroll-view scroll-y style="height: 100vh" @scroll="scroll" class="app"> -->
  <mescroll-uni
    @init="mescrollInit"
    :down="downOption"
    :up="upOption"
    @down="downCallback"
    @up="loadList"
    :top="1"
  >
    <Nav :selIndex="1" :scrollShadow="true" />
    <Banner style="margin-top: 30rpx" />

    <div class="link-list">
      <img
        @click="navTo(config.artsGitBookUrl)"
        class="icon"
        src="/static/images/home/link/1.svg"
      />
      <img
        @click="navTo(config.artsDiscordUrl)"
        class="icon"
        src="/static/images/home/link/2.svg"
      />
      <img
        @click="navTo(config.artsTgUrl)"
        class="icon"
        src="/static/images/home/link/3.svg"
      />
      <img
        @click="navTo(config.artsTwitterUrl)"
        class="icon"
        src="/static/images/home/link/4.svg"
      />
    </div>

    <div class="coin-btn-list">
      <div class="coin-btn">
        <img class="icon" src="/static/images/account/ent.png" />
        <div>$ENT</div>
      </div>
      <div class="coin-btn">
        <img class="icon" src="/static/images/account/art.png" />
        <div>$ART</div>
      </div>
      <div
        @click="navTo(config.artsWhiteBookUrl)"
        class="coin-btn"
        style="flex-grow: 1"
      >
        WHITEBOOK
      </div>
    </div>

    <UploadWorkDialog v-model:show="showUploadDialog" />

    <div class="dao-info">
      <div class="arrow">
        <div class="pixel-arrow"></div>
        <div class="upload-work-btn" @click="openUploadDialog">
          <div class="icon"></div>
          <div class="text">Upload</div>
        </div>
      </div>
      <div class="home-dao">
        <div class="dao-icon"></div>
        <div class="title">ENTERTAINMENT DAO CONTRIBUTION</div>
      </div>

      <DaoTabs style="margin-bottom: 24rpx" />
      <FilterTag style="margin-bottom: 24rpx" @setType="setType" />
    </div>
    <WorksList ref="worksListEl" />
  </mescroll-uni>
  <!-- </scroll-view> -->
</template>

<style scoped lang="scss">
  .link-list {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 30rpx;
    margin-top: 25rpx;
    .icon {
      width: 40rpx;
      height: 40rpx;
      object-fit: contain;
      margin-left: 30rpx;
    }
  }

  .coin-btn-list {
    margin-top: 30rpx;
    padding: 0 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .coin-btn {
      min-width: 200rpx;
      max-width: 240rpx;
      height: 64rpx;
      border-radius: 40rpx;
      background: rgba(153, 153, 153, 0.04);
      border: 2rpx solid rgba(235, 20, 132, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28rpx;
      font-weight: 900;
      color: #fff;
      .icon {
        width: 32rpx;
        height: 32rpx;
        object-fit: contain;
        margin-right: 10rpx;
      }
    }
  }

  .dao-info {
    padding: 0 30rpx;
    .arrow {
      margin-top: 30rpx;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      .pixel-arrow {
        width: 40rpx;
        height: 53rpx;
        background: url(@/static/img/ecosystem/pixel-arrow.png) no-repeat center;
        background-size: 100% 100%;
      }
      .upload-work-btn {
        position: absolute;
        z-index: 3;
        right: 0;
        width: 76rpx;
        height: 76rpx;
        border-radius: 10rpx;
        cursor: pointer;
        background: #eb1484;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        .icon {
          width: 33rpx;
          height: 33rpx;
          background: url('/static/images/works/upload-work-btn.png') no-repeat
            center / contain;
        }
        .text {
          font-size: 20rpx;
          font-weight: 500;
          color: #ffffff;
          line-height: 26rpx;
        }
      }
    }

    .home-dao {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin: 40rpx auto 60rpx;

      .dao-icon {
        width: 36rpx;
        height: 26.24rpx;
        background: url('/static/images/home/home-dao.png') no-repeat center /
          contain;
        margin-right: 16rpx;
      }
      .title {
        font-size: 28rpx;
        font-weight: 500;
        color: #fff;
      }
    }
  }
</style>
