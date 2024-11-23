const config = {
  dev: {
    prefix: '/arts',
    cdn: 'https://www.4arts.fun/images/',
    network: 'testnet',
    tgBotName: 'my4artsTestBot',
    tgBotID: '7491434228',
    twitterClientId: 'NUZKelYzdmc2WnRoR1FmYUlQYVU6MTpjaQ'
  },

  test: {
    prefix: '/arts',
    cdn: 'https://www.4arts.fun/images/',
    network: 'mainnet',
    tgBotName: 'my4artsTestBot',
    tgBotID: '7491434228',
    twitterClientId: 'NUZKelYzdmc2WnRoR1FmYUlQYVU6MTpjaQ'
  },

  prod: {
    prefix: '/arts',
    cdn: 'https://www.4arts.cc/images/',
    network: 'mainnet',
    tgBotName: 'fourArtsBot',
    tgBotID: '8018693203',
    twitterClientId: 'OE5FcFdPcmVoZFgxbWxCM1FDSnE6MTpjaQ'
  }
}

const publicConfig = {
  ...config[import.meta.env.VITE_NODE_ENV],
  appVersion: '1',
  tonApiKey: '4d301bbef226115d8edba525e2d3eed3c437d0693d7683257abe885283f5aa4e',
  artsTwitterUrl: 'https://x.com/4arts_entfi?t=vcl9NGSA2Rb00XqFRrxdZw&s=09',
  artsTgUrl: 'https://t.me/TON4arts',
  artsDiscordUrl: 'https://discord.gg/dnSz54EKSr',
  artsGitBookUrl: 'https://ton-4arts.gitbook.io/4arts',
  artsWhiteBookUrl: 'https://linktr.ee/4Arts.cc'
}

export default publicConfig
