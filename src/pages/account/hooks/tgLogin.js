import { ref } from 'vue'
import { useStore } from 'vuex'
import { post } from '../../../common/js/ajax'
import config from '../../../common/js/config'
import { decode } from 'js-base64'
import { useInvite } from './invite'

export const useTgLogin = () => {
  const store = useStore()
  const { invite_uid, from_work_id, updateInviteData } = useInvite()

  const closeLoginShow = () => {
    store.state.loginShow = false
  }

  const redirectTg = () => {
    Telegram?.Login.auth(
      { bot_id: config.tgBotID, request_access: 'write', embed: 1 },
      async (data) => {
        if (!data) {
          return
        }
        await tgLogin(data)
        closeLoginShow()
      }
    )
  }

  const tgLogin = async (data) => {
    updateInviteData()
    let params = {
      ...data,
      invite_uid: invite_uid.value,
      from_work_id: from_work_id.value
    }

    const res = await post('/user/telegramLogin', params).catch((e) => e)
    if (res?.token) {
      store.commit('setToken', res.token)
      store.commit('setUserInfo', decode(res.token))
    }
  }

  return {
    redirectTg,
    tgLogin
  }
}
