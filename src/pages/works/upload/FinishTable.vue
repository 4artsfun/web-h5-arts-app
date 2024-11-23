<script setup>
  import { ref, onMounted } from 'vue'
  import { get } from '../../../common/js/ajax'
  import VerifyButton from './VerifyButton.vue'
  import { WORK_TYPE } from '../../../common/js/constants'
  import config from '../../../common/js/config'
  import WorkForm from './WorkForm.vue'
  import { msg } from '../../../common/js/util'
  import { Pagination } from 'ant-design-vue'
  import GlobalDialog from '@/components/global-dialog/global-dialog.vue'
  import TokenBorderSelect from './TokenBorderSelect.vue'

  const list = ref([])
  const listLoading = ref(false)
  let currentPage = ref(1)
  let total = ref(0)
  const pageSize = ref(10000)
  const onPageChange = (pageNumber) => {
    currentPage.value = pageNumber
    list.value = []
    loadList(false)
  }
  const loadList = async (init) => {
    if (init) {
      currentPage.value = 1
      total.value = 0
    }
    listLoading.value = true
    let params = { page: currentPage.value, page_size: pageSize.value }
    let res = await get('/work/finishList', params).catch((e) => e)
    listLoading.value = false
    if (res?.code !== 0 && res?.msg) {
      msg(res.msg)
      return
    }
    list.value = res ?? []
    total.value = res?.length ?? 0
    // mock data
    // total.value = 100
    // list.value = Array.from({ length: 10 }).map((item) => {
    //   return {
    //     type: Math.floor(Math.random() * 3) + 1,
    //     name: `test.${Math.floor(Math.random() * 100000)}`,
    //     company_name: 'test',
    //     channeler: 'test',
    //     status: Math.floor(Math.random() * 3)
    //   }
    // })
  }
  const findType = (type) => {
    let findObj = WORK_TYPE.find((item) => item.value === type)
    return findObj?.text ?? ''
  }

  const showWorkForm = ref(false)
  const workId = ref(0)
  const toDetail = (item) => {
    if (item.CrawlStatus === 1) {
      msg('Content is being retrieved, please visit later')
      return
    }
    showWorkForm.value = true
    workId.value = item.WorkID
  }

  const delDetailId = ref(null)
  const confirmLoading = ref(false)
  const delDetail = (id) => {
    delDetailId.value = id
  }
  const delDetailFunc = async () => {
    confirmLoading.value = true
    let res = await get('/work/delete', { work_id: delDetailId.value }).catch(
      (e) => e
    )
    if (res && Object.keys(res).length === 0) {
      delDetailId.value = null
      loadList(true)
    }
    confirmLoading.value = false
  }

  const finishEdit = () => {
    list.value = []
    loadList(true)
    showWorkForm.value = false
  }

  onMounted(() => {
    loadList(true)
  })
</script>

<template>
  <div>
    <WorkForm
      v-if="showWorkForm"
      :workId="workId"
      @finish="finishEdit"
      @close="showWorkForm = false"
    />
    <view v-else class="identify-table">
      <view class="table-box">
        <view class="table">
          <view class="table-tr table-tr-head">
            <view class="table-th">Number</view>
            <view class="table-th">Type</view>
            <view class="table-th" style="min-width: 200rpx"
              >Title of work</view
            >
            <view class="table-th" style="min-width: 140rpx">Token pic</view>
            <view class="table-th" style="min-width: 180rpx">Token name</view>
            <view class="table-th">Current state</view>
            <view class="table-th">Operation</view>
          </view>
          <view
            class="table-tr"
            v-for="(item, index) in list"
            :key="index"
            :class="{
              success: item.status === 1,
              error: item.status === 2
            }"
          >
            <view class="table-td" style="text-align: left">{{
              index + 1
            }}</view>
            <view class="table-td">{{ findType(item.WorkType * 1) }}</view>
            <view class="table-td">{{ item.Name }}</view>
            <view class="table-td">
              <TokenBorderSelect class="pic-box">
                <img
                  loading="lazy"
                  class="token-pic"
                  :src="config.cdn + item.TokenURL"
                />
              </TokenBorderSelect>
            </view>
            <view class="table-td">{{ item.TokenName }}</view>
            <view class="table-td">
              <VerifyButton :status="item.CrawlStatus * 1" />
            </view>
            <view class="table-td">
              <div class="operation-list" v-if="item.CrawlStatus !== 1">
                <div class="btn edit" @click="toDetail(item)" v-if="item.CrawlStatus === 2">Modify</div>
                <div class="btn del" @click="delDetail(item.WorkID)">
                  Delete
                </div>
              </div>
            </view>
          </view>
        </view>
        <div class="list-loading" v-if="listLoading">
          <div class="global-loading"></div>
        </div>
      </view>
      <view class="page" v-if="total > pageSize">
        <a-config-provider
          :theme="{
            components: {
              Pagination: {
                itemActiveBg: '#eb1484',
                colorBgTextHover: '#eb1484',
                colorPrimary: '#fff',
                colorPrimaryHover: '#fff',
                colorText: '#fff',
                borderRadius: 30,
                colorTextDisabled: 'rgba(255, 255, 255, .3)'
              }
            }
          }"
        >
          <Pagination
            :current="currentPage"
            :showSizeChanger="false"
            :defaultCurrent="1"
            :defaultPageSize="pageSize"
            :total="total"
            @change="onPageChange"
          />
        </a-config-provider>
      </view>
    </view>

    <GlobalDialog
      :show="delDetailId"
      @close="delDetailId = null"
      title="Delete Tips"
    >
      <div class="del-tips">
        The data cannot be restored after deletion. Do you want to continue?
      </div>
      <div class="dialog-btn-list">
        <div class="btn cancel" @click="delDetailId = null">Cancel</div>
        <div
          class="btn confirm"
          :class="{ 'global-btn-disabled': confirmLoading }"
          @click="delDetailFunc"
        >
          <div class="global-pending" v-if="confirmLoading"></div>
          Confirm
        </div>
      </div>
    </GlobalDialog>
  </div>
</template>

<style scoped lang="scss">
  .identify-table {
    .table-box {
      width: 100%;
      overflow: auto;
    }
    .list-loading {
      margin: 20rpx auto;
      display: flex;
      justify-content: center;
    }
    .table {
      display: table;
      width: 100%;
      border-collapse: collapse;
      overflow-x: scroll;

      .table-tr-head {
        border-bottom: 2rpx solid rgba(51, 51, 51, 1);
      }

      .table-tr {
        display: table-row;
      }

      .table-th {
        display: table-cell;
        text-align: center;
        font-size: 26rpx;
        font-weight: 500;
        line-height: 24rpx;
        color: #ffffff;
        padding: 40rpx 20rpx 20rpx 0;
        min-width: 120rpx;
        &:last-child {
          padding-right: 0;
        }
      }

      .table-td {
        display: table-cell;
        text-align: center;
        vertical-align: middle;
        font-size: 24rpx;
        font-weight: 400;
        line-height: 24rpx;
        color: #ffffff;
        padding: 20rpx 0;
        padding-right: 20rpx;
        &:last-child {
          padding-right: 0;
        }
      }

      .operation-list {
        display: flex;
        justify-content: center;
        align-items: center;
        .btn {
          margin-right: 40rpx;
          text-decoration: underline;
          font-size: 24rpx;
          font-weight: 500;

          &.edit {
            color: #fff;
          }
          &.del {
            color: #ffc300;
          }
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
    .pic-box {
      width: 78rpx;
      height: 78rpx;
      margin: auto;
    }
    .token-pic {
      width: 60rpx;
      height: 60rpx;
      border-radius: 50%;
      overflow: hidden;
      object-fit: cover;
    }
    .page {
      display: flex;
      justify-content: flex-end;
      padding: 20rpx 0;
      ::v-deep {
        .ant-pagination .ant-pagination-item-active {
          background: #eb1484;
        }
        .ant-pagination .ant-pagination-item {
          margin-inline-end: 0;
          border: 0;
        }
      }
    }
  }

  .del-tips {
    font-size: 30rpx;
    text-align: center;
  }
  .dialog-btn-list {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 20rpx;
    .btn {
      width: 240rpx;
      height: 60rpx;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      &.cancel {
        border: 1px solid rgba(153, 153, 153, 1);
      }
      &.confirm {
        border: 1px solid rgba(235, 20, 132, 1);
        background: rgba(235, 20, 132, 1);
      }
    }
  }
</style>
