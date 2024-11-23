import { createStore } from 'vuex'
import { TonConnectUI, CHAIN } from '@tonconnect/ui'
import { toUserFriendlyAddress } from '@tonconnect/sdk'
import { post, get } from '../common/js/ajax'
// import { msg } from '../common/js/util'
import { disconnect } from '@wagmi/core'
import { web3Config } from '../common/js/web3Config.js'
import { mainnet, sepolia, bsc, bscTestnet } from '@wagmi/core/chains'
import { signEvm, getSolProvider } from '../common/js/util.js'
import { decode } from 'js-base64'
import dayjs from 'dayjs'

const store = createStore({
  state: {
    token: '',
    address: '',
    friendAddress: '',
    tonConnectUI: null,
    loginShow: false,
    chain: '',
    info: null,
    isLogoutTg: false
  },
  mutations: {
    setChain(state, value) {
      state.chain = value
      uni.setStorageSync('chain', value)
    },
    setToken(state, value) {
      state.token = value
      uni.setStorageSync('userToken', value)

      const timestamp = dayjs().add(7, 'day').valueOf()
      localStorage.setItem('timestamp', timestamp)
    },
    setAddress(state, value) {
      state.address = value
      uni.setStorageSync('tonAddr', value)
    },
    setUserInfo(state, value) {
      if (typeof value === 'string') {
        try {
          value = JSON.parse(value)
        } catch (e) {
          console.error(e)
        }
      }
      state.info = value
      uni.setStorageSync('userInfo', value)
    }
  },
  actions: {
    async openWallet({ state, dispatch }) {
      await dispatch('logout')
      state.loginShow = true

      //todo remove
      // if(store.state.tonConnectUI){
      // 	await store.state.tonConnectUI.openModal();
      // 	await store.dispatch("getMerProof")
      // }else{
      // 	msg("init ton wallet connect failed")
      // }
    },
    async getMerProof({ state }) {
      state.tonConnectUI.setConnectRequestParameters({
        state: 'loading'
      })
      let proofRes = await get('/user/getPayload')
      let payload = proofRes.payload
      state.tonConnectUI.setConnectRequestParameters({
        state: 'ready',
        value: {
          tonProof: payload
        }
      })
    },
    async logout({ state }) {
      state.isLogoutTg = true
      if (state.tonConnectUI?.connected) {
        await state.tonConnectUI.disconnect() //disconnect ton
        state.isLogoutTg = false
      }
      if (web3Config.state.status === 'connected') {
        try {
          await disconnect(web3Config) //disconnect evm
        } catch (e) {
          console.log(e)
        }
      }
      web3Config.state.current = null
      let solProvider = getSolProvider()
      if (solProvider && solProvider.isConnected) {
        await solProvider.disconnect() //disconnect sol
      }
      state.token = ''
      state.address = ''
      state.chain = ''
      state.friendAddress = ''
      state.info = null
      localStorage.removeItem('userToken')
      localStorage.removeItem('tonAddr')
      localStorage.removeItem('chain')
      localStorage.removeItem('userInfo')
    },
    async initTonConnectUI({ state, dispatch }) {
      state.tonConnectUI = new TonConnectUI({
        manifestUrl: 'https://4arts.cc/static/tonconnect-manifest.json'
      })
      const { modal } = state.tonConnectUI
      modal.onStateChange(async () => {
        if (state.tonConnectUI.account) {
          let addr = state.tonConnectUI.account.address
          if (state.tonConnectUI.wallet.connectItems) {
            const proof = state.tonConnectUI.wallet.connectItems.tonProof.proof
            proof.state_init = state.tonConnectUI.account.walletStateInit

            await dispatch('login', {
              addr,
              proof,
              chainId: state.tonConnectUI.account.chain * 1
            })
          }

          if (state.isLogoutTg) {
            dispatch('logout')
            state.tonConnectUI?.disconnect()
          }

          state.friendAddress = toUserFriendlyAddress(
            addr,
            state.tonConnectUI.account.chain === CHAIN.TESTNET
          )
        }
      })
    },
    async login({ state, commit, dispatch }, data) {
      let { addr, proof, chainId, loginType } = data
      let chain = 'ton'
      if (chainId === bscTestnet.id || chainId === bsc.id) {
        chain = 'bnb'
      }
      if (chainId === mainnet.id || chainId === sepolia.id) {
        chain = 'eth'
      }
      if (chainId === 333) {
        chain = 'sol'
      }
      let params = { address: addr, chain_id: chainId, login_type: loginType }
      if (proof) {
        params['proof'] = {
          ...proof,
          domain: {
            length_bytes: proof.domain.lengthBytes,
            value: proof.domain.value
          }
        }
      }

      let url = '/user/tonWalletLogin'
      switch (chain) {
        case 'eth':
          url = '/user/ethWalletLogin'
          break
        case 'bnb':
          url = '/user/ethWalletLogin'
          break
        case 'sol':
          url = '/user/solanaWalletLogin'
          break
        default:
          break
      }

      if (chain !== 'ton') {
        params = {
          wallet_address: addr,
          chain_id: chainId,
          login_type: 'wallet'
        }
        let signMsg
        if (chain !== 'sol') {
          signMsg = await signEvm()
        } else {
          let message = 'Login Time ' + new Date().getTime()
          const encodedMessage = new TextEncoder().encode(message)
          let solProvider = getSolProvider()
          const signedMessage = await solProvider.signMessage(
            encodedMessage,
            'utf8'
          )
          console.log('signedMessage', signedMessage.signature)
          const signature = btoa(
            String.fromCharCode(...signedMessage.signature)
          )
          console.log('Base64 signature:', signature)
          signMsg = { message, sign: signature }
        }
        params = { ...params, ...signMsg }
      }

      params.invite_uid = Number(localStorage.getItem('invite_uid'))
      params.from_work_id = Number(localStorage.getItem('from_work_id'))
      state.isLogoutTg = false
      try {
        let res = await post(url, params, { skipToast: true })
        if (res?.token) {
          commit('setToken', res.token)
          commit('setUserInfo', decode(res.token))
          commit('setAddress', addr)
          commit('setChain', chain)
        } else {
          dispatch('logout')
          throw { message: 'login failed' }
        }
      } catch (e) {
        dispatch('logout')
      }
    }
  }
})

export default store
