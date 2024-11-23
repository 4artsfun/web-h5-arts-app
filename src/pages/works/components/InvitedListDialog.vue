<script setup>
  import { onMounted, ref } from 'vue'
  import GlobalDialog from '../../../components/global-dialog/global-dialog.vue'
  import { get } from '@/common/js/ajax'

  const props = defineProps({
    worksId: {
      type: Number
    },
    show: {
      type: Boolean,
      default: false
    }
  })
  const emit = defineEmits(['update:show'])
  const close = () => emit('update:show', false)

  const listData = ref([])

  const getFriendsList = async () => {
    let res = await get('/work/friendsList', {
      work_id: props.worksId,
      page: 1,
      pageSize: 10
    })
    listData.value = res?.list ?? []
  }

  onMounted(() => {
    getFriendsList()
    // listData.value = Array.from({ length: 50 }).map((item) => {
    //   return {
    //     uid: `AHUGUWDV.${Math.floor(Math.random() * 100000)}`,
    //     time: new Date(
    //       Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
    //     ).toLocaleDateString()
    //   }
    // })
  })
</script>

<template>
  <GlobalDialog :show="props.show" @close="close" title="Invitation list">
    <div class="content">
      <div class="invite-list">
        <div class="list-title">
          <div class="uid">UID</div>
          <div class="time">Invitation time</div>
        </div>
        <div v-if="listData.length === 0" class="no-data">No Data</div>
        <div class="scroll-list">
          <div class="list-item" v-for="item in listData">
            <div class="uid">{{ item.invite_uid }}</div>
            <div class="time">{{ item.invitation_time }}</div>
          </div>
        </div>
      </div>
    </div>
  </GlobalDialog>
</template>

<style lang="scss" scoped>
  .invite-list {
    .list-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 32rpx;
      font-weight: 700;
      padding-bottom: 10rpx;
      border-bottom: 2rpx solid #333333;
    }

    .scroll-list {
      max-height: calc(76vh - 200rpx);
      overflow-y: auto;
    }

    .list-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 28rpx;
      font-weight: 400;
      line-height: 32rpx;
      margin: 30rpx 0;
    }
    .no-data {
      font-size: 28rpx;
      text-align: center;
      margin: 30rpx 0;
      color: #999;
    }
  }
</style>
