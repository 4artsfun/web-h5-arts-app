<script setup>
import Nav from "../common/nav"
import {ref} from 'vue';
import {get} from "../../common/js/ajax";
import {navTo} from "../../common/js/util";

const keywords = ref();
const list = ref([]);
const search = async () => {
  let params = {page: 1, page_size: 100};
  if(keywords.value){
    params.name = keywords.value;
  }else{
    list.value = [];
    return;
  }
  const res = await get('/work/list', params);
  list.value = res.list;
}
</script>
<template>
  <view class="app">
    <Nav :show-scroll-list="false"/>
    <lu-back />
    <view class="search">
      <input placeholder="Search" @keyup="search" v-model="keywords" type="text" />
      <image src="/static/images/search/search.png" />
    </view>
    <view class="result">
      <view class="item" v-for="item in list" :key="item.id" @click="navTo('/pages/market/product?work_type=2&id='+ item.id + '&type=replace')">
        <text>《{{item.name}}》</text>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.app{
  height: 100%;
  display: flex;
  flex-direction: column;
  .search{
    padding-right: 40rpx;
    margin: 20rpx auto;
    border-radius: 40rpx;
    width: 670rpx;
    height: 80rpx;
    display: flex;
    align-items: center;
    background: linear-gradient(262deg, rgba(226, 80, 229, 0.20) 22.4%, rgba(75, 80, 230, 0.20) 88.39%);
   input{
     flex: 1;
     padding: 0 40rpx;
     color: #fff;
     font-size: 32rpx;
   }
    image{
      width: 40rpx;
      height: 40rpx;
    }
  }
  .result{
    flex: 1;
    overflow: scroll;
    .item{
      padding: 20rpx 40rpx 0;
      display: flex;
      text{
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #fff;
        font-size: 34rpx;
        font-weight: 700;
      }
    }
  }
}
</style>
