<script setup>
import {ref, onMounted } from 'vue';
import {wait} from "../../common/js/util";
import {DatePicker} from "ant-design-vue";
import useMescroll from "@/uni_modules/mescroll-uni/hooks/useMescroll.js";
import {useStore} from "vuex";
import {get, post} from "../../common/js/ajax";
import {navTo, msg} from "../../common/js/util";
import config from "../../common/js/config";
import {Spin} from "ant-design-vue";
import DaoTabs from '../home/components/DaoTabs.vue'

const cdn = config.cdn;
const store = useStore();
let startDate = "";
let endDate = "";
const keywords = ref("");
const change = (date, dateString) => {
  if(dateString){
    let arr = dateString.split("-");
    let weeks = arr[1].substring(0, 2);
    let year = arr[0];
    startDate = Math.floor(new Date(year, 0, (weeks - 1) * 7).getTime()/1000);
    endDate = Math.floor(new Date(year, 0, 7 * weeks).getTime()/1000);
  }else{
    startDate = "";
    endDate = "";
  }
  search();
};
const handleKeyDown = (event) => {
  if (event.key === 'Enter') {
    search();
  }
};
const search = () => {
  loadList(true);
}
const list = ref([]);
const { mescrollInit, downCallback, getMescroll } = useMescroll()
const upOption = ref({
  page: {
    size: 20
  }
})
const like = async (item) => {
  if(item.is_tread === 1) {
    msg("you had dissed the composition");
    return;
  }
  await likeOrDiss(item.id, 1)
  if(item.is_like === 1){
    item.like_count = item.like_count - 1;
    item.is_like = 0;
  }else{
    item.like_count = item.like_count + 1;
    item.is_like = 1;
  }
}
const diss = async(item) => {
  if(item.is_like === 1) {
    msg("you had liked the composition");
    return;
  }
  await likeOrDiss(item.id, 2)
  if(item.is_tread === 1){
    item.tread_count = item.tread_count - 1;
    item.is_tread = 0;
  }else{
    item.tread_count = item.tread_count + 1;
    item.is_tread = 1;
  }
}
const likeOrDiss = async(id, type) => {
  let params = {
    work_id: id,
    action: type
  };
  let res = await post('/work/action', params);
}
let currentPage = 1;
onMounted(() => {
  loadList(true);
})
const nomore = ref(false);
const pending = ref(false);
const loadList = async (flag)=>{
  if(pending.value){
    return;
  }
  if(flag){
    currentPage = 1;
    list.value = [];
    nomore.value = false;
  }else{
    if(nomore.value){
      return;
    }
    currentPage = currentPage + 1;
  }
  let params = {page: currentPage, page_size: 20 };
  if(startDate){
    params.start_time = startDate;
  }
  if(endDate){
    params.end_time = endDate;
  }
  if(keywords.value){
    params.name = keywords.value;
  }
  pending.value = true;
  const res = await get('/work/hotList', params, {}, () => {
    pending.value = false;
  });
  let records = res.list
  list.value = list.value.concat(records);
  if(list.value.length >= res.total){
    nomore.value = true;
  }
  pending.value = false;
}
const isFixed = ref(false);
const fixed = (flag) => {
  isFixed.value = flag;
}
const showTop = ref(false);
const showToTop = (flag) => {
  showTop.value = flag;
}
defineExpose({fixed, loadList, showToTop})
const emit = defineEmits(['toTop'])
</script>

<template>
  <view class="waterfall">
    <view class="box" :class="isFixed && 'fixed'">
      <view class="cooperate"></view>
      <view class="title">entertainment dao Contribution</view>
      <DaoTabs />
      <!-- <view class="tabs-nav">
        <view class="tab active">Online Works</view>
        <view class="tab" @click="wait">ANNOUNCEMENT</view>
        <view class="tab" @click="wait">Proposal</view>
        <view class="tab" @click="wait">Review</view>
      </view> -->
      <view class="search-bar">
        <a-config-provider
            :theme='{
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
                }
              }
           }'
        >
          <DatePicker class="date-select" @change="change" picker="week" />
        </a-config-provider>
        <view class="search-input">
          <input class="input" placeholder="Search" v-model="keywords" @keydown="handleKeyDown"/>
          <view class="search-icon" @click="search"></view>
        </view>
      </view>
    </view>
    <view class="content" :class="isFixed && 'fixed'">
      <view class="list">
          <view class="pic-list">
            <view class="pic-box" v-for="(item, index) in list" :key="item.id" @click="navTo('/pages/market/product?work_type=1&id=' + item.id)">
              <image class="img" mode="widthFix" :src="cdn + item.cover_url" @load="item.show =  true" />
              <view class="cover" @click.stop="" v-if="item.show">
                <view class="name">{{item.name}}</view>
                <view class="op">
                  <view class="leaf" @click.stop="like(item)">
                    <image mode="widthFix" :src="'/static/img/ecosystem/dao/like' + (item.is_like === 1? '-sel': '') + '.png'"/>
                    <text>{{item.like_count || 0}}</text>
                  </view>
                  <view class="leaf" @click.stop="diss(item)">
                    <image mode="widthFix" :src="'/static/img/ecosystem/dao/diss' + (item.is_tread === 1? '-sel': '') + '.png'"/>
                    <text>{{item.tread_count || 0}}</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
      </view>
      <view class="loading">
        <Spin :spinning="pending"/>
        <view class="end" v-if="nomore">-END-</view>
      </view>
    </view>
    <view class="totop" v-if="showTop" @click="emit('toTop')">
      <image src="https://www.mescroll.com/img/mescroll-totop.png"/>
    </view>
  </view>
</template>

<style scoped lang="scss">
.totop {
  overflow: hidden;
  z-index: 9990;
  position: fixed;
  right: 20rpx;
  bottom: 120rpx;
  width: 72rpx;
  height: 72rpx;
  border-radius: 50%;
  background: rgba(0,0,0,.8);
  image{
    width: 100%;
    height: 100%;
  }
}
.loading{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30rpx 0 0;
  .end{
    color: #999;
    font-size: 26rpx;
  }
}
.waterfall{
  padding-top: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  .box{
    padding-top: 10px;
    &.fixed{
      padding-left: 40rpx;
      padding-right: 40rpx;
      position: fixed;
      top: 120rpx;
      width: 100%;
      left: 0;
      z-index: 50;
      background: rgba(18, 9, 44, 0.9);
    }
  }
}
  .cooperate {
    width: 114rpx;
    height: 92rpx;
    background: url('/static/img/ecosystem/cooperate.png');
    background-size: 100% 100%;
    margin: 0rpx auto 20rpx;
  }
  .title {
    color: #fff;
    font-family: font_Rubik;
    font-size: 20rpx;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-align: center;
    margin-bottom: 40rpx;
  }

  .tabs-nav {
    height: 54rpx;
    border-radius: 12rpx;
    background: rgba(125, 125, 125, 0.2);
    display: flex;
    justify-content: space-around;
    align-items: center;
    .tab {
      color: #fff;
      // font-family: font_Rubik;
      font-size: 16rpx;
      font-style: normal;
      font-weight: 500;
      line-height: normal;

      &.active {
        border-bottom: 1px solid #e31481;
        padding-bottom: 4rpx;
      }
    }
  }
.search-bar {
  width: 100%;
  padding: 20rpx 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .date-select {
    width: 266rpx;
    height: 56rpx;
    background: url('/static/img/ecosystem/date-border.png');
    border:none!important;
    &:hover{
      border:none!important;
    }
    background-size: 100% 100%;
    color: #fff;
    font-size: 16rpx;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .search-input {
    width: 186rpx;
    height: 56rpx;
    border-radius: 68rpx;
    border: 2.4rpx solid var(--006, #4715eb);
    background: rgba(217, 217, 217, 0);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16rpx;

    .input {
      flex-grow: 1;
      height: 24rpx;
      font-size: 28rpx;
      font-style: normal;
      line-height: normal;
      color: rgba(255, 255, 255, 0.5);
    }

    .search-icon {
      min-width: 32rpx;
      height: 32rpx;
      background: url('/static/img/ecosystem/search-icon.png');
      background-size: 100% 100%;
    }
  }
}

  .content {
    &.fixed{
      padding-top: 340rpx;
    }
    overflow: hidden;
    flex: 1;
    padding: 0 20rpx;
    display: flex;
    flex-direction: column;
    border-image: linear-gradient(to right, #d944f073, #4b93ff86) 1;
    .list{
      flex: 1;
      border: 1px sollid red;
      overflow: scroll;
    }
    .pic-list {
      column-count: 2;
      column-gap: 12rpx;
      .pic-box {
        margin-bottom: 10rpx;
        break-inside: avoid;
        position: relative;
        overflow: hidden;
        .cover{
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(5px);
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 150rpx;
          color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .name{
            text-align: center;
            padding: 0 10rpx;
            width: 100%;
            font-size: 26rpx;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-break: break-all;
          }
          .op{
            padding-top: 20rpx;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            .leaf{
              cursor: pointer;
              padding-right: 30rpx;
              display: flex;
              align-items: center;
              image{
                width: 40rpx;
              }
              text{
                padding-left: 10rpx;
                font-size: 24rpx;
              }
            }
          }
        }
      }

      .img {
        width: 100%;
        height: auto;
      }
    }
  }
</style>
