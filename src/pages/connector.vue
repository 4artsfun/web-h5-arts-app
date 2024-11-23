<script>
import { TonConnectUI } from '@tonconnect/ui';
import { Address, beginCell, toNano, SendMode } from "@ton/core";
import {TonClient} from "@ton/ton";
export default {
  name: 'TonConnect',
  mounted() {
    // console.log("mounted")
    // const tonConnectUI = new TonConnectUI({
    //   manifestUrl: 'https://4arts.io/tonconnect-manifest.json',
    //   buttonRootId: 'tonConnectUI'
    // });
    // this.init(tonConnectUI);
  },
  methods: {
    init: async (tonConnectUI) =>{
      console.log("begin")
      let address = "UQBkyQHvsgvYKVqkvrK4hnZx6kzW_bgybBM0lHHiT6WTGn8R";
      let nftAddress = "EQD0r82wW4tzol-aLtbjAnGEFUTgVgeKtsYUjokeSaNFRKEh"
      const collectionAddress = Address.parse(nftAddress);
      let endpointUrl = process.env.NODE_ENV === 'production'? "https://toncenter.com": "https://testnet.toncenter.com";
      const client = new TonClient({
        endpoint: endpointUrl + '/api/v2/jsonRPC',
        apiKey: '4d301bbef226115d8edba525e2d3eed3c437d0693d7683257abe885283f5aa4e'
      });
      const getMethodResult = await client.runMethod(collectionAddress, 'get_collection_data');
      let nextItemIndex = getMethodResult.stack.readNumber();
      const opts = {
        queryID: 1,
        nextItemId: nextItemIndex,
        amount: toNano("0.05"),
        owner: Address.parse(address)
      }
      console.log("opts", opts)
      const messageCell = beginCell()
          .storeUint(0x1, 32) // op
          .storeUint(opts.queryID ?? 0, 64)
          .storeUint(opts.nextItemId, 64) // item_index
          .storeCoins(opts.amount)//opts.amount
          .storeRef(beginCell()
              .storeAddress(opts.owner)
              .storeRef(beginCell().endCell())
              .endCell())
          .endCell()
      const tx3 = {
        validUntil: Math.floor(Date.now() / 1000) + 360,
        messages: [
          {
            address: nftAddress,
            amount: "50000000",
            payload: messageCell.toBoc().toString("base64"),
            sendMode: SendMode.PAY_GAS_SEPARATELY
          }
        ]
      }
      try{
        const result = await tonConnectUI.sendTransaction(tx3);
        console.log('Channel mint is in progress.');
        let currentItemIndex = nextItemIndex;
        while (currentItemIndex === nextItemIndex) {
          const getMethodResult2 = await client.runMethod(collectionAddress, 'get_collection_data')
          currentItemIndex = getMethodResult2.stack.readNumber();
        }
        console.log("transaction confirmed!");
        const response = await client.runMethod(
            collectionAddress,
            "get_nft_address_by_index",
            [{ type: "int", value: BigInt(nextItemIndex) }]
        );
        console.log('get_nft_address_by_index response:', response);
        const nftItemAddress = response.stack.readAddress();
        console.log("nftItemAddress:", nftItemAddress.toString());
        console.log("result:", result);
      }catch (e){
        console.log("error tx", e, typeof e.message);
      }
    }
  }
};
</script>
<template>
  <view class="app">
    <view id="tonConnectUI"></view>
  </view>
</template>

<style scoped lang="scss">
.app{

}
</style>
