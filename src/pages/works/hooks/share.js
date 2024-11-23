import { ref } from 'vue'
import { useStore } from 'vuex'
import { get } from '../../../common/js/ajax'

export const useShare = () => {
  const store = useStore()

  const getInviteUrl = ({ workId, type }) => {
    const userId = store.state.info?.u ?? ''
    return `${location.origin}/pages/works/detail?id=${workId}&type=${type}&invite_uid=${userId}`
  }

  const shareX = ({ inviteUrl, workId }) => {
    if (store.state.info?.u) {
      const xTitle =
        'Exciting news! Enjoy ENT Airdrop by Daily Check event and Share Invite Links.'
      const openUrl = 'http://x.com/intent/tweet?text='
        .concat(encodeURIComponent(xTitle))
        .concat(' ')
        .concat(encodeURIComponent(inviteUrl))
      shareApi(workId)
      window.open(openUrl, '_blank')
    } else {
      store.dispatch('openWallet')
    }
  }

  const shareApi = async (id) => {
    let res = await get('/work/share', {
      work_id: id
    })
    return res
  }

  return {
    getInviteUrl,
    shareX
  }
}
