import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { post } from '../../../common/js/ajax'
import config from '../../../common/js/config'
import { useRouteHook } from '@/hooks/route'
import { decode } from 'js-base64'
import { useInvite } from './invite'

const random = (length) => {
  length = length || 32
  const t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  const a = t.length
  let n = ''
  for (let i = 0; i < length; i++) n += t.charAt(Math.floor(Math.random() * a))
  return n
}

const cfg = {
  oauthUrl: 'https://twitter.com/i/oauth2/authorize',
  clientId: config.twitterClientId,
  redirectUri: `${window.location.origin}/?oauthType=twitter`,
  responseType: 'code',
  scope: 'tweet.read%20users.read',
  state: random(),
  codeChallenge: 'challenge',
  codeChallengeMethod: 'plain'
}

export const useTwitterLogin = () => {
  const store = useStore()
  const { invite_uid, from_work_id, updateInviteData } = useInvite()
  const { query } = useRouteHook()

  const redirectTwitter = () => {
    const authorizationURL = `${cfg.oauthUrl}?response_type=${cfg.responseType}&client_id=${cfg.clientId}&redirect_uri=${cfg.redirectUri}&scope=${cfg.scope}&state=${cfg.state}&code_challenge=${cfg.codeChallenge}&code_challenge_method=${cfg.codeChallengeMethod}`
    window.location.href = authorizationURL
  }

  const twitterLogin = async (code) => {
    updateInviteData()
    let params = {
      code: code,
      invite_uid: invite_uid.value,
      from_work_id: from_work_id.value
    }

    const res = await post('/user/twitterLogin', params).catch((e) => e)
    if (res?.token) {
      store.commit('setToken', res.token)
      store.commit('setUserInfo', decode(res.token))
    }
  }

  onMounted(() => {
    if (query?.oauthType && query?.code) {
      twitterLogin(query?.code)
    }
  })

  return {
    redirectTwitter,
    twitterLogin
  }
}
