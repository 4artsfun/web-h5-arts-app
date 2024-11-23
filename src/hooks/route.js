import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { navTo } from '../common/js/util.js'

export const useRouteHook = () => {
  const router = useRouter()
  const route = useRoute()
  const query = route.query
  const queryStr = computed(() => {
    const queryString = Object.keys(query)
      .map((key) => `${key}=${route.query[key]}`)
      .join('&')
    return queryString ? `?${queryString}` : ''
  })

  const jumpPage = (path) => {
    if (path === '/pages/home/index') {
      path += '?type=switch'
    }
    navTo(path)
  }

  const back = () => {
    uni.navigateBack()
  }

  const backPage = (urlArr) => {
    let pages = getCurrentPages()
    let perviousPage = pages[pages.length - 2]?.route ?? ''
    if (urlArr.includes(`/${perviousPage}`)) {
      back()
    } else {
      jumpPage(urlArr[0])
    }
  }

  const updateQuery = (query) => {
    const newQuery = Object.assign({}, route.query, query)
    router.replace({ query: newQuery })
  }

  return {
    route,
    query,
    queryStr,
    jumpPage,
    back,
    backPage,
    updateQuery
  }
}
