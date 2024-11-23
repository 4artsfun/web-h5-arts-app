<script setup>
  import { ref, onMounted, computed } from 'vue'
  // import Nav from '../common/nav.vue'
  import ProductCover from './components/ProductCover.vue'
  import ProductShare from './components/ProductShare.vue'
  import Directory from './components/Directory.vue'
  import UnlockChapterDialog from './components/UnlockChapterDialog.vue'
  import ComicDetail from './comic/detail.vue'
  import NovelDetail from './novel/detail.vue'
  import MoviePlay from './movie/MoviePlay.vue'
  import { usePageScroll } from '../common/menu.js'
  import { useWorks } from './hooks/works.js'
  import { useRouteHook } from '@/hooks/route'
  import { msg } from '../../common/js/util'
  import config from '../../common/js/config'

  const { scroll, scrollShadow, scrollTop } = usePageScroll()
  const { loadWorkDetail, loadWorkChapter, joinWorkCommunity } = useWorks()
  const { query, backPage } = useRouteHook()

  const activePage = ref(1)
  const worksType = ref(3)
  const worksId = ref(null)
  const worksDetail = ref({})
  const worksContent = ref(null)
  const getDetail = async () => {
    const res = await loadWorkDetail({ worksId: worksId.value })
    worksType.value = res?.work_type ?? Number(query.type) ?? 3
    worksDetail.value = res
  }
  const getChapterData = async () => {
    worksContent.value = ''
    const res = await loadWorkChapter({
      worksId: worksId.value,
      chapterId: activePage.value
    })
    // Comic
    if (worksType.value == 4) {
      worksContent.value = res?.Content?.split(',')
    }
    // Novel
    if (worksType.value == 3) {
      worksContent.value = res?.Content ?? ''
    }
    // Movie
    if ([1, 2, 5, 6, 7, 8, 9].includes(worksType.value)) {
      worksContent.value = res?.Content ?? ''
    }
  }

  const changePageFnc = async (index) => {
    activePage.value = index
    await getChapterData()
  }
  const prePageFunc = () => {
    if (activePage.value > 1) {
      changePageFnc(activePage.value - 1)
    }
  }
  const nextPageFunc = () => {
    if (activePage.value < worksDetail.value.work_total_chapter) {
      if (activePage.value === worksDetail.value.unlocked_chapter_count) {
        showBuyChapter()
      } else {
        changePageFnc(activePage.value + 1)
      }
    }
  }

  const showUnlockDialog = ref(false)
  const showBuyChapter = () => {
    showUnlockDialog.value = true
  }

  const saveInviteData = () => {
    const from_work_id = (query?.id ?? 0) * 1
    const invite_uid = (query?.invite_uid ?? 0) * 1
    localStorage.setItem('from_work_id', from_work_id)
    localStorage.setItem('invite_uid', invite_uid)
  }

  const showToTopBtn = computed(() => {
    if (scrollTop.value) {
      return scrollTop.value > 300
    }
    return false
  })

  const joinTg = async () => {
    window.open(config.artsTgUrl, '_blank')
    const res = await joinWorkCommunity({ worksId: worksId.value })
    if (res?.code !== 10000) {
      msg('Community opened successfully')
      await getDetail()
    }
  }

  onMounted(() => {
    worksId.value = Number(query.id)
    worksType.value = Number(query.type)
    saveInviteData()
    getDetail()
    getChapterData()
  })
</script>

<template>
  <scroll-view
    scroll-y
    scroll-with-animation
    :scroll-top="scrollTop"
    style="height: 100vh"
    @scroll="scroll"
  >
    <!-- <Nav :sel-index="3" :scrollShadow="scrollShadow" /> -->
    <div
      class="page-back"
      @click="backPage(['/pages/home/index', '/pages/market/index'])"
    ></div>
    <ProductShare
      :worksId="worksId"
      :worksType="worksType"
      :inviteCount="worksDetail.invite_count"
      :pic="worksDetail.work_cover_url_full"
      :tokenPic="worksDetail.token_cover_url_full"
      :tokenName="worksDetail.token_name"
      :tokenBalance="worksDetail.token_balance"
      :signedIn="worksDetail.signed_in"
      @checkInFinish="getDetail"
    />
    <div class="page-content">
      <ProductCover
        :pic="worksDetail.work_cover_url_full"
        :title="worksDetail.work_name"
        :author="worksDetail.work_creator_name"
        :desc="worksDetail.work_description"
      />
      <div class="chapter-info">Chapter table of contents:</div>

      <UnlockChapterDialog
        v-model:show="showUnlockDialog"
        :worksId="worksId"
        :progress="worksDetail.unlocked_chapter_count"
        :totalChapter="worksDetail.work_total_chapter"
        @buySucc="getDetail"
      />
      <Directory
        style="margin-top: 16rpx"
        :total="worksDetail.work_total_chapter"
        :active="activePage"
        :progress="worksDetail.unlocked_chapter_count"
        @change="changePageFnc"
        @buyChapter="showBuyChapter"
      />

      <div class="detail-content">
        <div v-show="worksContent === ''" class="loading-box">
          <div class="global-loading"></div>
        </div>
        <div v-show="worksContent !== ''">
          <ComicDetail v-if="worksType == 4" :picArr="worksContent" />
          <NovelDetail v-if="worksType == 3" :content="worksContent" />
          <MoviePlay
            v-if="[1, 2, 5, 6, 7, 8, 9].includes(worksType)"
            :content="worksContent"
          />
        </div>
      </div>

      <div class="turn-page" v-show="worksDetail.work_total_chapter > 0">
        <div
          class="btn"
          :class="{ disabled: activePage === 1 }"
          @click="prePageFunc"
        >
          Previous page
        </div>
        <div
          class="btn"
          :class="{ disabled: activePage === worksDetail.work_total_chapter }"
          @click="nextPageFunc"
        >
          Next page
        </div>
      </div>

      <div class="fixed-bottom">
        <div
          class="btn tg"
          v-if="!worksDetail.joined_community"
          @click="joinTg"
        >
          <img class="btn-icon" src="/static/images/works/tg-icon.png" />
        </div>
        <div class="btn to-top" v-if="showToTopBtn" @click="scrollTop = 0">
          <img class="btn-icon" src="/static/images/works/to-top-icon.png" />
        </div>
      </div>
    </div>
  </scroll-view>
</template>

<style lang="scss" scoped>
  .page-back {
    position: absolute;
    z-index: 10;
    left: 30rpx;
    top: 40rpx;
    width: 40rpx;
    height: 40rpx;
    background: url('/static/images/works/back-btn.png') no-repeat center center /
      contain;
    cursor: pointer;
  }
  .page-content {
    position: relative;
    font-family: Rubik;
    color: #fff;
    padding: 30rpx;

    .chapter-info {
      font-size: 32rpx;
      font-weight: 500;
      color: #ffffff;
      text-align: left;
      margin-top: 24rpx;
    }

    .detail-content {
      margin-top: 24rpx;
      .loading-box {
        margin: 200rpx 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .turn-page {
      display: flex;
      justify-content: space-around;
      margin-top: 30rpx;
      .btn {
        width: 256rpx;
        height: 60rpx;
        border-radius: 30rpx;
        background: #eb1484;
        font-size: 32rpx;
        font-weight: 400;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        &.disabled {
          background: #750a42;
          color: #666;
          cursor: not-allowed;
        }
      }
    }

    .fixed-bottom {
      position: fixed;
      z-index: 58;
      bottom: 120rpx;
      .btn {
        position: absolute;
        bottom: 0;
        cursor: pointer;
        width: 64rpx;
        height: 64rpx;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.2);

        &.tg {
          left: 0;
        }
        &.to-top {
          left: calc(100vw - 120rpx);
        }
        .btn-icon {
          object-fit: contain;
          width: 30rpx;
          height: 30rpx;
        }
      }
    }
  }
</style>
