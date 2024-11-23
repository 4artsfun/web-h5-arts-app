import { ref } from 'vue'
import { useStore } from 'vuex'
import { msg } from '../../../common/js/util'
import { post } from '../../../common/js/ajax'
import { decode } from 'js-base64'
import { useInvite } from './invite'

export const useUserLogin = () => {
  const store = useStore()
  const { invite_uid, from_work_id, updateInviteData } = useInvite()
  const username = ref('')
  const password = ref('')
  const loginLoading = ref(false)

  const closeLoginShow = () => {
    store.state.loginShow = false
  }

  const loginFunc = async (formType) => {
    if (loginLoading.value) {
      return false
    }
    const check = verifyForm()
    if (check) {
      updateInviteData()
      let params = {
        username: username.value,
        password: password.value,
        invite_uid: invite_uid.value,
        from_work_id: from_work_id.value
      }
      let res = null
      if (formType === 'login') {
        res = await login(params)
      } else {
        res = await register(params)
      }
      if (res?.token) {
        store.commit('setToken', res.token)
        store.commit('setUserInfo', decode(res.token))
        closeLoginShow()
      }
    }
  }

  const register = async (params) => {
    loginLoading.value = true
    const res = await post('/user/register', params).catch((e) => e)
    loginLoading.value = false
    return res
  }

  const login = async (params) => {
    loginLoading.value = true
    const res = await post('/user/standardLogin', params).catch((e) => e)
    loginLoading.value = false
    return res
  }

  const verifyForm = () => {
    if (username.value.trim() === '') {
      msg('Please enter username')
      return false
    }
    if (password.value.trim() === '') {
      msg('Please enter password')
      return false
    }
    return true
  }

  const logout = () => {
    store.dispatch('logout')
  }

  return {
    username,
    password,
    loginFunc,
    loginLoading,
    logout
  }
}
