import { ref, onMounted } from 'vue'

export const useMenuScroll = (selIndex) => {
  const menuList = [
    // { index: 1, name: 'ALL', url: '/pages/home/index?type=switch' },
    { index: 3, name: 'RWA MARKET', url: '/pages/market/index' },
    { index: 2, name: 'POOL', url: '/pages/ecosystem/index' },
    // { index: 4, name: 'TRADE', url: '/pages/trade/index' },
    // { index: 5, name: 'WHITE PAPER', url: 'https://linktr.ee/4Arts.cc' },
    // { index: 6, name: 'GENESIS PROGRAM', url: '/pages/genesis/index' },
    // { index: 7, name: 'IDO', url: '/pages/ido/index' }
  ]

  const scrollTop = ref(0)
  onMounted(() => {
    setTimeout(() => {
      if (selIndex === 0 || selIndex === 1) {
        scrollTop.value = 0
      }
      if (selIndex === 2) {
        scrollTop.value = 0
      }
      if (selIndex === 3) {
        scrollTop.value = 80
      }
      if (selIndex === 4) {
        scrollTop.value = 180
      }
      if (selIndex === 5) {
        scrollTop.value = 420
      }
      if (selIndex === 6) {
        scrollTop.value = 420
      }
      if (selIndex === 7) {
        scrollTop.value = 480
      }
    }, 100)
  })
  return {
    scrollTop,
    menuList
  }
}

export const usePageScroll = () => {
  const scrollShadow = ref(false)
  const scrollTop = ref(0)
  const scroll = (e) => {
    scrollTop.value = e.detail.scrollTop
    scrollShadow.value = e.detail.scrollTop > 0
  }
  return {
    scrollShadow,
    scrollTop,
    scroll
  }
}
