import { ref } from 'vue'
import { get, post } from '../../../common/js/ajax'
import { msg } from '../../../common/js/util'

export const useUploadWork = () => {
  const formatForm = (params) => {
    let callback = {
      verify: true,
      params: {
        ...params
      }
    }

    if (params.name === '') {
      msg('Please fill in the title of the work')
      callback.verify = false
      return callback
    }

    // 创作者名称合并
    let creator_name = ''
    params.creator_name.forEach((item) => {
      if (item !== '') {
        creator_name += ',' + item
      }
    })
    creator_name = creator_name.substring(1)
    if (creator_name === '') {
      msg('Please fill in the name of the creator')
      callback.verify = false
      return callback
    }
    callback.params.creator_name = creator_name

    if (params.cover_url === '') {
      msg('Please upload the cover of the work')
      callback.verify = false
      return callback
    }

    if (params.description === '') {
      msg('Please fill in the description of the work')
      callback.verify = false
      return callback
    }

    // 链接不能为空
    params.chapters.forEach((item) => {
      if (item.chapter_link === '') {
        msg('Please enter work link')
        callback.verify = false
        return callback
      }
      // 非网盘链接需要检查
      if (![3, 4].includes(params.type)) {
        if (checkVideoUrlType(item.chapter_link) === '') {
          msg('Please enter a valid work link')
          callback.verify = false
          return callback
        }
      }
    })

    // 网盘链接类型
    if ([3, 4].includes(params.type)) {
      callback.params.link_type = 1
    } else {
      callback.params.link_type = 0
    }

    return callback
  }

  // 获取默认Token信息
  const getDefaultToken = async ({ type, name }) => {
    const res = await get('/work/defaultToken', {
      work_type: type,
      work_name: name
    })
    return res
  }

  const saveWork = async (params) => {
    const res = await post('/work/standardUpload', params)
    return res
  }

  const updateWork = async (params) => {
    const res = await post(`/work/update?work_id=${params.work_id}`, params)
    return res
  }

  // 检查视频链接合法
  const checkVideoUrlType = (url) => {
    // 检查 TikTok 链接
    // prettier-ignore
    const tiktokRegex = /^(https?:\/\/)?(www\.|m\.)?tiktok\.com\/@[^\/]+\/video\/\d+(\?.*)?$/i
    if (tiktokRegex.test(url)) {
      return 'TikTok'
    }

    // 检查 YouTube 相关链接
    // prettier-ignore
    const youtubeRegex = /(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([^&\n]{11})/i
    if (youtubeRegex.test(url)) {
      return 'YouTube'
    }

    // 检查是否是 YouTube 视频 ID
    const idRegex = /^[a-zA-Z0-9_-]{11}$/
    if (idRegex.test(url)) {
      return 'YouTube'
    }

    return ''
  }

  return {
    formatForm,
    getDefaultToken,
    saveWork,
    updateWork,
    checkVideoUrlType
  }
}
