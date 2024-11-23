import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import config from '../../../common/js/config.js'
import { web3Config } from '../../../common/js/web3Config.js'
import { msg, getSolProvider } from '../../../common/js/util.js'
import { mainnet, sepolia, bsc, bscTestnet } from '@wagmi/core/chains'
import { switchChain } from '@wagmi/core'
import { useConnect, useChainId, useAccount } from '@wagmi/vue'

export const useWalletSelect = () => {
  const store = useStore()
  // const chainId = useChainId()
  const { address, connector } = useAccount()
  const { connectors, connect } = useConnect()
  const enableConnectors = ref({})
  let chainType = ref()
  const aim = ref(0)

  const closeLoginShow = () => {
    store.state.loginShow = false
  }

  watch(address, async (addr) => {
    if (addr) {
      closeLoginShow()
    }
  })

  const openTonWallet = async () => {
    if (store.state.tonConnectUI) {
      closeLoginShow()
      const walletsList = await store.state.tonConnectUI.getWallets()
      await store.state.tonConnectUI.openModal()
      await store.dispatch('getMerProof')
    } else {
      msg('init ton wallet connect failed')
    }
  }

  const openEvmWallet = (type) => {
    chainType.value = type
    enableConnectors.value = {}
    connectors.map(async (connector) => {
      if (chainType.value === 'bnb' && connector.name === 'Phantom') {
        return
      }
      enableConnectors.value[connector.name] = connector
    })
    aim.value = 1
  }

  const connectEvm = async (connector) => {
    if (connector.type !== 'injected') {
      closeLoginShow()
    }
    let chainId = ''
    if (chainType.value === 'eth') {
      // @ts-ignore
      chainId = config.network === 'testnet' ? sepolia.id : mainnet.id
    }
    if (chainType.value === 'bnb') {
      // @ts-ignore
      chainId = config.network === 'testnet' ? bscTestnet.id : bsc.id
    }
    try {
      await switchChain(web3Config, { chainId })
    } catch (e) {
      console.log(e)
    }
    connect({ connector, chainId })
  }

  const connectSolWallet = async (openWebSite) => {
    closeLoginShow()
    try {
      const provider = getSolConnection(openWebSite)
      if (provider) {
        const resp = await provider.connect()
        let addr = resp.publicKey.toString()
        if (store.state.address !== addr) {
          await store.dispatch('login', { addr, proof: null, chainId: 333 })
        }
        store.state.friendAddress = addr
        close()
      } else {
        console.log('Phantom Wallet not found')
      }
    } catch (err) {
      console.error('Error connecting to Phantom Wallet:', err)
    }
  }
  const getSolConnection = (openWebSite) => {
    let provider = getSolProvider()
    if (!provider) {
      if (openWebSite) {
        window.open('https://phantom.app/', '_blank')
      }
      return null
    } else {
      return provider
    }
  }

  return {
    openTonWallet,
    openEvmWallet,
    connectEvm,
    connectSolWallet,
    closeLoginShow,
    enableConnectors,
    aim
  }
}
