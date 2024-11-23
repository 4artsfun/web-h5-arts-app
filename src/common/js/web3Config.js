import { createConfig, http } from '@wagmi/core'
import { mainnet, sepolia ,bsc, bscTestnet} from '@wagmi/core/chains'
import { coinbaseWallet, metaMask, walletConnect } from '@wagmi/connectors'
export const web3Config = createConfig({
    chains: [bsc, bscTestnet, mainnet, sepolia],
    connectors: [coinbaseWallet(), metaMask(), walletConnect({
        projectId: 'f87cf4373910e1766c873dc5df019573'
    })],
    transports: {
        [bsc.id]: http(),
        [bscTestnet.id]: http(),
        [mainnet.id]: http(),
        [sepolia.id]: http(),
    },
})
