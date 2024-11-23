<script setup>
  import { ref } from 'vue'
  import FilterTag from '../works/components/FilterTag.vue'
  import WorksList from '../works/list.vue'
  import useMescroll from '@/uni_modules/mescroll-uni/hooks/useMescroll.js'
  import Nav from '../common/nav'
  import Tabs from './components/Tabs.vue'
  const emit = defineEmits(['tabsActiveChange'])
  const tabsActiveChange = (index) => {
    emit('tabsActiveChange', index)
  }
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
</script>
<template>
  <view>
    <mescroll-uni
      @init="mescrollInit"
      :down="downOption" 
      :up="upOption"
      @down="downCallback"
      @up="loadList"
      :top="1"
    >
      <Nav :sel-index="3" :scrollShadow="true" />
      <div class="page-content">
        <Tabs class="mb28" @change="tabsActiveChange" />
        <FilterTag @setType="setType" />
      </div>
      <WorksList ref="worksListEl" />
    </mescroll-uni>
  </view>
</template>

<style scoped lang="scss">
  .page-content {
    padding: 30rpx 40rpx 0rpx;
  }
  .mb28 {
    margin-bottom: 28rpx;
  }
</style>
