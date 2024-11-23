import { ref } from 'vue'
import config from '../../../common/js/config'
import { get, post } from '../../../common/js/ajax'
import { msg, navTo } from '../../../common/js/util'
import { WORK_TYPE } from '../../../common/js/constants'
const cdn = config.cdn

export const useWorks = () => {
  const completeLinks = (str) => {
    return /^(http|https):\/\//.test(str) ? str : cdn + str
  }

  const loadList = async ({ page, size, type }) => {
    let params = { page: page, page_size: size }
    if (type) {
      params['type'] = type
    }
    const res = await get('/work/list', params, {}, () => {
      // e.endErr()
    })
    const records = res.list
    let data = records.map((item) => {
      if (item.creator_name) {
        item.names = item.creator_name.split(',')
      } else {
        item.names = ['']
      }
      return {
        ...item,
        cover_url: completeLinks(item.cover_url)
      }
    })
    return { data, total: res.total }
  }

  const likeOrDiss = async (id, type) => {
    let params = {
      work_id: id,
      action: type
    }
    let res = await post('/work/action', params)
  }
  const like = async (item) => {
    if (item.is_like === 0 && item.is_tread === 1) {
      msg('you had dissed the composition')
      return
    }
    await likeOrDiss(item.id, 3)
    if (item.is_like === 1) {
      item.like_count = item.like_count - 1
      item.is_like = 0
    } else {
      item.like_count = item.like_count + 1
      item.is_like = 1
    }
  }

  const navToProduct = (item) => {
    navTo(`/pages/works/detail?id=${item.id}&type=${item.type}`)
  }

  const loadWorkDetail = async ({ worksId }) => {
    let res = await get('/work/detail', {
      work_id: worksId * 1
    })
    res.token_cover_url_full = completeLinks(res.token_cover_url)
    res.work_cover_url_full = completeLinks(res.work_cover_url)
    return res
  }

  const loadWorkChapter = async ({ worksId, chapterId }) => {
    let res = await get('/work/chapter', {
      work_id: worksId * 1,
      chapter_id: chapterId * 1
    })
    return res
  }

  const unlockWorkChapter = async ({ worksId, count }) => {
    let res = await post('/work/purchase', {
      work_id: worksId * 1,
      chapterCount: count,
      currency: 'token'
    })
    return res
  }

  const workCheckIn = async ({ worksId }) => {
    let res = await post('/work/signIn', {
      work_id: worksId * 1
    })
    return res
  }

  const getWorkType = (type) => {
    let obj = WORK_TYPE.find((item) => item.value === Number(type))
    return obj ?? {}
  }

  const joinWorkCommunity = async ({ worksId }) => {
    let res = await post('/work/community', {
      work_id: worksId * 1
    })
    return res
  }

  const getWorkChapterLink = async ({ worksId }) => {
    let res = await get('/work/linkList', {
      work_id: worksId * 1
    })
    return res
  }

  return {
    loadList,
    like,
    loadWorkDetail,
    loadWorkChapter,
    unlockWorkChapter,
    workCheckIn,
    joinWorkCommunity,
    navToProduct,
    getWorkType,
    getWorkChapterLink
  }
}
