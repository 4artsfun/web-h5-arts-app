<script setup>
  import { ref } from 'vue'
  import { WORK_TYPE } from '../../../common/js/constants'
  const emit = defineEmits(['setType'])

  const selectTypeList = ref([])
  const typeList = ref([
    { text: 'Comic', child: [], icon: 'comic' },
    { text: 'Novel', child: [], icon: 'novel' },
    { text: 'Music', child: [], icon: 'music' },
    {
      text: 'Movie',
      child: ['Animated Film', 'Regular Movie'],
      defaultTitle: 'Movie',
      icon: 'animate'
    },
    {
      text: 'Drama Series',
      child: ['TV Drama', 'Animation', 'Playlet', 'Vlog'],
      defaultTitle: 'Drama Series',
      icon: 'drama'
    }
  ])
  const formatTypeList = () => {
    let typeValue = selectTypeList.value.map((text) => {
      return WORK_TYPE.find((type) => type.text === text)?.value
    })
    emit('setType', typeValue.join(','))
  }

  const getChildIcon = (text) => {
    let obj = WORK_TYPE.find((type) => type.text === text)
    return obj?.icon ?? ''
  }

  const selectedTypeFnc = (text) => {
    if (selectTypeList.value.includes(text)) {
      selectTypeList.value.splice(selectTypeList.value.indexOf(text), 1)
    } else {
      selectTypeList.value.push(text)
    }
    formatTypeList()
  }
  const setChildTitle = (item) => {
    let calc = 0
    for (const child of item.child) {
      if (selectTypeList.value.includes(child)) {
        item.text = child
        calc += 1
      }
    }
    if (calc === item.child.length || calc === 0) {
      item.text = item.defaultTitle
    }
  }
  const activeClass = (item) => {
    if (item.child?.length > 0) {
      for (const child of item.child) {
        if (selectTypeList.value.includes(child)) {
          return true
        }
      }
      return false
    } else {
      return selectTypeList.value.includes(item.text)
    }
  }
</script>

<template>
  <view class="tabs">
    <view
      class="tab"
      :class="activeClass(item) && 'active'"
      v-for="(item, index) in typeList"
      :key="index"
    >
      <view v-if="item.child.length" style="flex-grow: 1">
        <view class="child-group" @click="item.showChild = !item.showChild">
          <img
            class="work-type-icon"
            :src="`/static/images/works/product/${item.icon}.svg`"
          />
          <view>{{ item.text }}</view>
          <div class="more-icon"></div>
        </view>
        <view class="float" v-show="item.showChild">
          <view v-for="child in item.child" :key="child">
            <view
              class="tab tab-item"
              :class="selectTypeList.includes(child) && 'active'"
              @click="
                () => {
                  selectedTypeFnc(child)
                  setChildTitle(item)
                }
              "
            >
              <img
                class="work-type-icon"
                :src="`/static/images/works/product/${getChildIcon(child)}.svg`"
              />
              {{ child }}
            </view>
          </view>
        </view>
      </view>

      <view v-else class="tab-item" @click="selectedTypeFnc(item.text)">
        <img
          class="work-type-icon"
          :src="`/static/images/works/product/${item.icon}.svg`"
        />
        <div>{{ item.text }}</div>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
  .tabs {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: flex-start;

    .work-type-icon {
      margin-right: 10rpx;
      width: 28rpx;
      height: 24rpx;
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(195deg)
        brightness(100%) contrast(103%);
    }

    .tab {
      position: relative;
      z-index: 10;
      max-width: 270rpx;
      min-width: 200rpx;
      flex-grow: 1;
      height: 56rpx;
      color: #fff;
      font-size: 28rpx;
      margin-right: 14rpx;
      margin-bottom: 16rpx;
      border-radius: 6rpx;
      border: 1px solid #e41599;
      background: #07092c;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: normal;
      text-align: center;
      .child-group {
        display: flex;
        align-items: center;
        justify-content: center;

        .more-icon {
          width: 16rpx;
          height: 10rpx;
          background: url('/static/img/market/more.png') no-repeat center /
            contain;
          margin-left: 10rpx;
        }
      }
      .float {
        position: absolute;
        z-index: 100;
        width: 100%;
        top: 70rpx;
        right: 0;
        .tab {
          margin-right: 0;
          font-size: 20rpx;
          justify-content: flex-start;
          padding-left: 20rpx;
        }
      }
      image {
        height: 10rpx;
      }
      .tab-item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-grow: 1;
      }
      &:nth-child(3n) {
        margin-right: 0;
      }
      &:last-child {
        margin-right: 0;
      }
      &.active {
        background: linear-gradient(
          146deg,
          #eb1484 13.16%,
          #c91cc3 99.99%,
          #c81cc5 100.86%,
          #c81cc5 101.73%
        );
      }
    }
  }
</style>
