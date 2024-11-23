import { onMounted, ref } from 'vue'
import { get } from '../../../common/js/ajax'
import config from '../../../common/js/config'
const cdn = config.cdn

export const useUserInfo = () => {
  const ent = ref(0)
  const art = ref(0)
  const tokenList = ref([])

  const completeLinks = (str) => {
    return /^(http|https):\/\//.test(str) ? str : cdn + str
  }

  const getAsset = async () => {
    let res = await get('/user/asset')
    ent.value = res?.ent ?? 0
    art.value = res?.art ?? 0
  }

  const getWorkTotal = async () => {
    let res = await get('/work/total')
    tokenList.value = res?.map(item => {
      return  {
        ...item,
        CoverURL: completeLinks(item.CoverURL)
      }
    }) ?? []
  }

  return {
    ent,
    art,
    tokenList,
    getAsset,
    getWorkTotal
  }
}
