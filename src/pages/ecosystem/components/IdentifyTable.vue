<script setup>
  import { ref, onMounted } from 'vue'
  import {get} from "../../../common/js/ajax";
  import VerifyButton from './VerifyButton.vue'
  import {WORK_TYPE} from "../../../common/js/constants";
  import {Pagination} from "ant-design-vue";

  const list = ref([]);
  let currentPage = ref(1);
  let total = ref(0);
  const pageSize = ref(20);
  const onPageChange = (pageNumber) => {
    currentPage.value = pageNumber;
    loadList(false);
  };
  const loadList = async (init) => {
    if(init){
      currentPage.value = 1;
      total.value = 0;
    }
    let params = {page: currentPage.value, page_size: pageSize.value}
    let res = await get('/work/finishedList', params)
    list.value = res.list;
    total.value = res.total;
  }
  const findType = (type) => {
    let findObj = WORK_TYPE.find((item) => item.value === type)
    return findObj?.text ?? '';
  }
  onMounted(() => {
    loadList(true);
  })
</script>

<template>
  <view class="identify-table">
    <view class="table-box">
      <view class="table">
        <view class="table-tr">
          <view class="table-th">Number</view>
          <view class="table-th">Type</view>
          <view class="table-th">Title of work</view>
          <view class="table-th">Company name</view>
          <view class="table-th">Channel</view>
          <view class="table-th">---</view>
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
          <view class="table-td">{{ index + 1 }}</view>
          <view class="table-td">{{ findType(item.type * 1) }}</view>
          <view class="table-td">{{ item.name }}</view>
          <view class="table-td">{{ item.company_name }}</view>
          <view class="table-td">{{ item.channeler }}</view>
          <view class="table-td">
            <VerifyButton :status="item.status * 1" />
          </view>
        </view>
      </view>
    </view>
    <view class="page">
      <a-config-provider :theme='{
      components: {
        DatePicker: {
                  controlHeight: 40,
                  borderRadius: 20,
                  activeBorderColor: "transparent",
                  cellHoverWithRangeBg: "rgba(255, 200, 253, 0.54)",
                  cellRangeBorderColor: "rgba(255, 124, 254, 0.74)",
                  hoverBorderColor: "transparent",
                  colorPrimary: "rgb(235, 47, 150)",
                  colorPrimaryBorder: "rgba(235, 47, 150, 0.42)",
                  controlItemBgActive: "rgba(235, 47, 150, 0.18)",
                  hoverBg: "rgba(255, 255, 255, 0.02)",
                  activeBg: "rgba(255, 255, 255, 0.02)",
                  colorBgContainer: "linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 100%)",
                  colorBgElevated: "rgb(38, 42, 81)",
                  fontSize: 14,
                  colorBorder: "var(--006, #4715eb)",
                  colorText: "rgb(255, 255, 255)",
                  colorTextHeading: "rgb(255, 255, 255)",
                  colorTextDescription: "rgb(255, 255, 255)",
                  colorIcon: "rgb(255, 255, 255)",
                  colorIconHover: "rgb(255, 255, 255)",
                  colorTextDisabled: "rgb(255, 255, 255, .7)",
                  colorTextTertiary: "rgb(255, 255, 255)",
                  colorTextPlaceholder: "rgb(255, 255, 255, .6)"
                },
        Pagination: {
          itemActiveBg: "rgba(228, 9, 229, 1)",
          colorBgTextHover: "rgba(228, 9, 229, 1)",
          colorPrimary: "#fff",
          colorPrimaryHover: "#fff",
          colorText: "#fff",
          borderRadius: 30,
          colorTextDisabled: "rgba(255, 255, 255, .3)"
        }
      }}'>
      <Pagination :current="currentPage" :showSizeChanger="false" defaultCurrent="1" :defaultPageSize="pageSize"
                  :total="total" @change="onPageChange"/>
      </a-config-provider>
    </view>
  </view>
</template>

<style scoped lang="scss">

  .identify-table {
    .table-box {
      padding: 20rpx;
      background: #d9d9d91a;
      border-radius: 10rpx;
      width: 100%;
      overflow: auto;
    }
    .table {
      display: table;
      width: 100%;
      border-collapse: collapse;
      overflow-x: scroll;

      .table-tr {
        display: table-row;
        &.success {
          .table-td {
            color: #00db3d;
          }
        }

        &.error {
          .table-td {
            color: #ff0000;
          }
        }
      }

      .table-th {
        display: table-cell;
        text-align: center;
        font-size: 20rpx;
        font-weight: 900;
        line-height: 24rpx;
        color: #ffffff;
        padding-bottom: 10rpx;
        padding-right: 20rpx;
        &:last-child {
          padding-right: 0;
        }
      }

      .table-td {
        display: table-cell;
        text-align: center;
        font-size: 20rpx;
        font-weight: 400;
        line-height: 24rpx;
        color: #ffffff;
        padding: 20rpx 0;
        padding-right: 20rpx;
        &:last-child {
          padding-right: 0;
        }
      }
    }
    .page{
      display: flex;
      justify-content: flex-end;
      padding: 20rpx 20rpx;
      ::v-deep {
        .ant-pagination .ant-pagination-item-active {
          background: rgba(228, 9, 229, 1);
        }
        .ant-pagination .ant-pagination-item{
          margin-inline-end: 0;
        }
      }
    }
  }
</style>
