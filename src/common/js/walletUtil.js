// import {loading} from "./ajax";
import {msg} from "./util";
import store from "../../store";
import {Address, beginCell, toNano, SendMode, Cell, Dictionary, fromNano} from "@ton/core";
import {getHttpEndpoint, getHttpV4Endpoint} from "@orbs-network/ton-access";
import {TonClient, TonClient4} from "@ton/ton";
import config from "./config";
import {ServiceNftMinter, eqQueryId} from "./wallet/ServiceNftMinter.ts";
import {Airdrop} from "./wallet/Airdrop";
import {Sender} from "./wallet/sender.ts";
import {Ido} from "./wallet/Ido.ts";
import ethIdoAbi from '../abi/ethIdo.js'
import bscIdoAbi from '../abi/bscIdo.js'
import eusdtAbi from '../abi/eusdt.js'
import busdtAbi from '../abi/busdt.js'
import {post} from "./ajax.js";
import {solClaim, getSolClaimOpen, getSolUsdtBalance} from './useSolana.js'

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const getPayCoinBalance = async () => {
    if(store.state.chain === 'ton'){
        const client = new TonClient({
            endpoint: await getHttpEndpoint({network: config.network}),
            apiKey: config.tonApiKey
        });
        let num = await client.getBalance(store.state.friendAddress);
        return fromNano(num);
    }
    if(store.state.chain === 'eth'){
        console.log({
            abi: eusdtAbi,
            address: ETH_USDT_CONTRACT,
            functionName: 'balanceOf',
            args: [store.state.friendAddress],
        })
        const res = await readContract(web3Config, {
            abi: eusdtAbi,
            address: ETH_USDT_CONTRACT,
            functionName: 'balanceOf',
            args: [store.state.friendAddress],
        })
        return Math.floor(res.toString()/ (Math.pow(10, ETH_USDT_UNIT)));
    }
    if(store.state.chain === 'bnb'){
        const res = await readContract(web3Config, {
            abi: busdtAbi,
            address: BSC_USDT_CONTRACT,
            functionName: 'balanceOf',
            args: [store.state.friendAddress],
        })
        console.log("balance res", res);
        return Math.floor(res.toString()/ (Math.pow(10, BSC_USDT_UNIT)));
    }
    if(store.state.chain === "sol"){
        return await getSolUsdtBalance()
    }
}
export const mintV2 = async (type, minting) => {
    if(!store.state.tonConnectUI.account) {
        throw {message: "connect the ton wallet first please"};
    }
    if(minting.value === 1){
        throw {message: "Mint is in progress."};
    }
    minting.value = 1;
    const collectionAddress = Address.parse("EQDdCK5rHU2FWfZOW3aQOKd3XWn8HSHY2-n_UjJU0Tw6wVPr");
    let endpoint = await getHttpEndpoint({
        network: config.network
    });
    const client = new TonClient({
        endpoint,
        apiKey: config.tonApiKey
    });
    const s = new ServiceNftMinter(collectionAddress);
    const contract = client.open(s);
    let queryId = BigInt(Date.now());
    console.log("queryId", queryId);
    await contract.send(new Sender(store.state.tonConnectUI), { value: toNano("0.15") }, {
        $$type: 'MintIdentity',
        collectionIndex: type === "channel"? 0n: type === "creator"? 1n: 2n,
        queryId
    });
    msg('Mint is in progress.', {type: 2});
    let flag = await listTransactions(queryId);
    if(flag){
        console.log("transaction confirmed!");
        msg('Mint successfully', {type: 1});
    }else{
        console.log("net error");
        msg('Search result failed');
    }
}
export const claimV2 = async (pending) => {
    if(!store.state.tonConnectUI.account) {
        throw {message: "connect the ton wallet first please"};
    }
    if(pending.value){
        throw {message: "Claim is in progress."};
    }
    pending.value = true;
    const client = new TonClient({
        endpoint: await getHttpEndpoint({network: config.network}),
        apiKey: config.tonApiKey
    });
    const collectionAddress = Address.parse("0QCGLqc1o8YtzWwix1deJAjmjvm5RbVovpf2-7Gck8NIPW7e");
    const contract = client.open(new Airdrop(collectionAddress));
    let queryId = BigInt(Date.now());
    console.log("queryId", queryId);
    let claimData = {
        $$type: "RewardAddress",
        query_id: queryId,
        custom_payload: beginCell().endCell(),
        forward_ton_amount: toNano("0.000000001"),
        forward_payload: beginCell()
            .storeBit(0)
            .storeUint(0, 32)
            .storeBuffer(Buffer.from("airdrop", "utf-8"))
            .endCell()
    }
    await contract.send(new Sender(store.state.tonConnectUI), { value: toNano("0.15") }, claimData);
    msg('Claim is in progress.', {type: 2});
    let flag = await listTransactions(queryId);
    if(flag){
        console.log("transaction confirmed!");
        msg('Claim successfully', {type: 1});
    }else{
        console.log("Bet error");
        msg('Search result failed');
    }
}
const ETH_USDT_CONTRACT = config.network === 'testnet'? "0xAec4dF23f2402201d16Ae270e3d9e9ee6380bF3C": "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const ETH_USDT_UNIT = config.network === 'testnet'? 18: 6;
const BSC_USDT_CONTRACT = config.network === 'testnet'? "0xceBf1fc593E5afE01cFB1162CA99591A7dCc5F70": "0x55d398326f99059ff775485246999027b3197955";
const BSC_USDT_UNIT = config.network === 'testnet' ? 18: 18;
const ETH_IDO_CONTRACT = "0xfC4962F9Ef8560965F28A10e4512C10ff4039978"
const BSC_IDO_CONTRACT = "0xe16507F4Cc75b561b2Fca917E9458b28F30db00E"
export const ido = async (status, amount) => {
    // 0 init | 1 pending | 2 calculating | 3 disabled
    if(!store.state.tonConnectUI.account) {
        msg('connect the wallet first please', {type: 2});
        return;
    }
    if(status.value === 1){
        msg('Ido is in progress.', {type: 2});
        return;
    }
    if(status.value === 2){
        msg('Calculating', {type: 2});
        return;
    }
    if(status.value === 3){
        return;
    }
    status.value = 1;
    if(store.state.chain === 'ton'){
        try{
            let body = beginCell().storeUint(0, 32).storeStringTail("Ido").endCell();
            let res = await store.state.tonConnectUI.sendTransaction({
                messages: [
                    {
                        address: "kQDMgtJoOct2qwLy1rBRtpRaYz-rR_g6fd0NxgGeARSuM-EO",
                        amount: toNano(amount).toString(),
                        payload: body.toBoc().toString("base64")
                    },
                ],
                validUntil: Date.now() + 5 * 60 * 1000
            })
            console.log("res: ", res)
            const hash = Cell.fromBase64(res.boc).hash().toString("hex");
            console.log("in msg hash: ", hash);
            msg('Ido is in progress.', {type: 2});
            status.value = 2;
            await postMsg(hash);
        }catch (e){
            if(e.message.indexOf("InsufficientBalance") !== -1){
                msg("Insufficient balance");
            }else if(e.message.indexOf("Pop-up closed") !== -1
                || e.message.indexOf("Close PopUp") !== -1
                || e.message.indexOf("Reject request") !== -1
            ){
                msg("You cancel the request");
            }else if(e.message.indexOf("Transaction was not sent")){
                msg("Transaction was not sent");
            }else{
                console.log(e.message);
                msg(e.message);
            }
            status.value = 0;
        }
    }
}

export const postMsg = async (hash) => {
    // await post('/ido/submitMsg', {hash}); //todo
}

const getAllowRes = async (old, allowValue) => {
    await sleep(3500);
    let newAmount = await getAllowance();
    console.log("wait", old, newAmount);
    if(old === newAmount){
        await getAllowRes(old, allowValue);
    }else{
        allowValue.value = newAmount;
    }
}

export const idoEvm = async (status, amount, writeContract, allowValue) => {
    // 0 wait approve | 1 pending | 2 Buy | 3 calculating | 4 approve disabled | 5 buy disabled
    if(!store.state.chain) {
        msg('connect the wallet first please', {type: 2});
        return;
    }
    if(status.value === 1){
        msg('Ido is in progress.', {type: 2});
        return;
    }
    if(status.value === 3){
        msg('Calculating', {type: 2});
        return;
    }
    if(status.value === 4 || status.value === 5){
        return;
    }
    let type = status.value === 0? "approve": "buy";
    status.value = 1;
    if(type === 'approve'){
        approve(writeContract, amount, status, allowValue);
    }else{
        await eIdo(writeContract, status, allowValue);
    }
}

const eIdo = async (writeContract, status, allowValue) => {
    let newAmount = await getAllowance(true);
    console.log(newAmount)
    if(store.state.chain === 'eth'){
        writeContract({
            abi: ethIdoAbi,
            address: ETH_IDO_CONTRACT,
            functionName: 'ido',
            args: [BigInt(newAmount)],
        }, {
            onError: e => {
                console.log(e);
                if(e.message.indexOf("User denied") !== -1){
                    msg("You cancel the request");
                }else{
                    msg(e.message);
                }
                status.value = 2;
            },
            onSuccess: async (res) => {
                console.log("tx res", res )
                let oldAmount = await getAllowance();
                await getAllowRes(oldAmount, allowValue);
                status.value = 3;
                await postMsg(res);
            }
        })
    }
    if(store.state.chain === 'bnb'){
        writeContract({
            abi: bscIdoAbi,
            address: BSC_IDO_CONTRACT,
            functionName: 'ido',
            args: [BigInt(newAmount)],
        }, {
            onError: e => {
                if(e.message.indexOf("User denied") !== -1){
                    msg("You cancel the request");
                }else{
                    msg(e.message);
                }
                status.value = 2;
            },
            onSuccess: async (res) => {
                console.log("tx res", res )
                let oldAmount = await getAllowance();
                await getAllowRes(oldAmount, allowValue);
                status.value = 3;
                await postMsg(res);
            }
        })
    }

}
const approve = (writeContract, amount, status, allowValue) => {
    if(store.state.chain === 'eth'){
        writeContract({
            abi: eusdtAbi,
            address: ETH_USDT_CONTRACT,
            functionName: 'approve',
            args: [ETH_IDO_CONTRACT, Math.pow(10, ETH_USDT_UNIT) * amount],
        }, {
            onError: e => {
                if(e.message.indexOf("User denied") !== -1){
                    msg("You cancel the request");
                }else{
                    msg(e.message);
                }
                status.value = 0;
            },
            onSuccess: async (res) => {
                console.log("tx res", res )
                let oldAmount = await getAllowance();
                await getAllowRes(oldAmount, allowValue);
                status.value = 2;
            }
        })
    }
    if(store.state.chain === 'bnb'){
        writeContract({
            abi: busdtAbi,
            address: BSC_USDT_CONTRACT,
            functionName: 'approve',
            args: [BSC_IDO_CONTRACT, Math.pow(10, BSC_USDT_UNIT) * amount],
        }, {
            onError: e => {
                if(e.message.indexOf("User denied") !== -1){
                    msg("You cancel the request");
                }else{
                    msg(e.message);
                }
                status.value = 0;
            },
            onSuccess: async (res) => {
                console.log("tx res", res )
                let oldAmount = await getAllowance();
                await getAllowRes(oldAmount, allowValue);
                status.value = 2;
            }
        })
    }

}
import {readContract} from "@wagmi/core";
import {web3Config} from "./web3Config.js";

export const getAllowance = async (big) => {
    if(store.state.chain === 'eth'){
        const res = await readContract(web3Config, {
            abi: eusdtAbi,
            address: ETH_USDT_CONTRACT,
            functionName: 'allowance',
            args: [
                store.state.friendAddress,
                ETH_IDO_CONTRACT
            ],
        })
        return big? res.toString(): Math.floor(res.toString()/ (Math.pow(10, ETH_USDT_UNIT)));
    }
    if(store.state.chain === 'bnb'){
        const res = await readContract(web3Config, {
            abi: busdtAbi,
            address: BSC_USDT_CONTRACT,
            functionName: 'allowance',
            args: [
                store.state.friendAddress,
                BSC_IDO_CONTRACT
            ],
        })
        return big? res.toString(): Math.floor(res.toString()/ (Math.pow(10, BSC_USDT_UNIT)));
    }
}

export const idoClaim = async (status, writeContract) => {
    // 0 init | 1 pending | 2 claimed | 3 not open
    if(!store.state.chain) {
        msg('connect the wallet first please', {type: 2});
        return;
    }
    if(status.value === 1){
        msg('Claim is in progress.', {type: 2});
        return;
    }
    if(status.value === 2){
        return;
    }
    if(status.value === 3){
        return;
    }
    status.value = 1;
    if(store.state.chain === 'ton'){
        try{
            const client = new TonClient({
                endpoint: await getHttpEndpoint({network: config.network}),
                apiKey: config.tonApiKey
            });
            const collectionAddress = Address.parse("kQDMgtJoOct2qwLy1rBRtpRaYz-rR_g6fd0NxgGeARSuM-EO");
            const contract = client.open(new Ido(collectionAddress));
            let queryId = BigInt(Date.now());
            console.log("queryId", queryId);
            let claimData = {
                $$type: "RewardAddress",
                query_id: queryId,
                custom_payload: beginCell().endCell(),
                forward_ton_amount: toNano("0.000000001"),
                forward_payload: beginCell()
                    .storeBit(0)
                    .storeUint(0, 32)
                    .storeBuffer(Buffer.from("idoClaim", "utf-8"))
                    .endCell()
            }
            console.log("begin claim")
            await contract.send(new Sender(store.state.tonConnectUI), { value: toNano("0.15") }, claimData);
            msg('Claim is in progress.', {type: 2});
            let flag = await listTransactions(queryId);
            if(flag){
                console.log("transaction confirmed!");
                msg('Claim successfully', {type: 1});
            }else{
                console.log("Bet error");
                msg('Search result failed');
            }
            status.value = 2;
        }catch (e){
            if(e.message.indexOf("InsufficientBalance") !== -1){
                msg("Insufficient balance");
            }else if(e.message.indexOf("Pop-up closed") !== -1
                || e.message.indexOf("Close PopUp") !== -1
                || e.message.indexOf("Reject request") !== -1
            ){
                msg("You cancel the request");
            }else if(e.message.indexOf("Transaction was not sent")){
                msg("Transaction was not sent");
            }else{
                console.log(e.message);
                msg(e.message);
            }
            status.value = 0;
        }
    }
    if(store.state.chain === 'eth'){
        writeContract({
            abi: ethIdoAbi,
            address: ETH_IDO_CONTRACT,
            functionName: 'claimToken',
            args: [],
        }, {
            onError: e => {
                if(e.message.indexOf("User denied") !== -1){
                    msg("You cancel the request");
                }else if(e.message.indexOf("reverted") !== -1){
                    msg("You had claimed all ent");
                }else{
                    msg(e.message);
                }
                status.value = 0;
            },
            onSuccess: async (res) => {
                console.log("claim eth ido tx res", res )
                status.value = 2;
            }
        })
    }
    if(store.state.chain === 'bnb'){
        writeContract({
            abi: bscIdoAbi,
            address: BSC_IDO_CONTRACT,
            functionName: 'claimToken',
            args: [],
        }, {
            onError: e => {
                if(e.message.indexOf("User denied") !== -1){
                    msg("You cancel the request");
                }else if(e.message.indexOf("reverted") !== -1){
                    msg("You had claimed all ent");
                }else{
                    msg(e.message);
                }
                status.value = 0;
            },
            onSuccess: async (res) => {
                console.log("claim bsc ido res", res )
                status.value = 2;
            }
        })
    }
    if(store.state.chain === "sol"){
        await solClaim(status);
        console.log("last status", status.value)
    }
}

export const idoInfo = async () => {
    const client = new TonClient({
        endpoint: await getHttpEndpoint({network: config.network}),
        apiKey: config.tonApiKey
    });
    const collectionAddress = Address.parse("kQDMgtJoOct2qwLy1rBRtpRaYz-rR_g6fd0NxgGeARSuM-EO");
    const contract = client.open(new Ido(collectionAddress));
    let res = await contract.getGetPersonInfo(Address.parse(store.state.friendAddress));
    console.log("Res", res);
    return fromNano(res);
}
export const claimOpen = async () => {
    if(store.state.chain === 'ton'){
        const client = new TonClient({
            endpoint: await getHttpEndpoint({network: config.network}),
            apiKey: config.tonApiKey
        });
        const collectionAddress = Address.parse("kQDMgtJoOct2qwLy1rBRtpRaYz-rR_g6fd0NxgGeARSuM-EO");
        const contract = client.open(new Ido(collectionAddress));
        let res = await contract.getGetIsClaim();
        console.log("ton claim status", res)
        return res;
    }
    if(store.state.chain === 'eth'){
        const res = await readContract(web3Config, {
            abi: ethIdoAbi,
            address: ETH_IDO_CONTRACT,
            functionName: 'isClaim',
            args: [
            ],
        })
        console.log("eth claim status", res)
        return res;
    }
    if(store.state.chain === 'bnb'){
        const res = await readContract(web3Config, {
            abi: bscIdoAbi,
            address: BSC_IDO_CONTRACT,
            functionName: 'isClaim',
            args: [
            ],
        })
        console.log("bsc claim status", res)
        return res;
    }
    if(store.state.chain === "sol"){
        return await getSolClaimOpen();
    }
}
export const setClaimOpen = async (flag) => {
    const client = new TonClient({
        endpoint: await getHttpEndpoint({network: config.network}),
        apiKey: config.tonApiKey
    });
    const collectionAddress = Address.parse("kQDMgtJoOct2qwLy1rBRtpRaYz-rR_g6fd0NxgGeARSuM-EO");
    const contract = client.open(new Ido(collectionAddress));
    let method = flag? "Owner: ClaimOpen": "Owner: ClaimClose"
    await contract.send(new Sender(store.state.tonConnectUI), { value: toNano("0.15") }, method);
}

export const claimReplace = async (receiverAddr, amount) => {
    const client = new TonClient({
        endpoint: await getHttpEndpoint({network: config.network}),
        apiKey: config.tonApiKey
    });
    const collectionAddress = Address.parse("0QCGLqc1o8YtzWwix1deJAjmjvm5RbVovpf2-7Gck8NIPW7e");
    const contract = client.open(new Airdrop(collectionAddress));
    let receiver = Address.parse(receiverAddr);
    let _addressBoolMap = Dictionary.empty(Dictionary.Keys.Address(), Dictionary.Values.Bool());
    _addressBoolMap.set(receiver, true);
    let _addressIntMap = Dictionary.empty(Dictionary.Keys.Address(), Dictionary.Values.BigUint(256));
    _addressIntMap.set(receiver, toNano(amount));
    await contract.send(new Sender(store.state.tonConnectUI), { value: toNano("0.15") },
        {
            $$type: "Replace",
            ddressBoolMap: _addressBoolMap,
            addressIntMap: _addressIntMap,
            length: BigInt(1)
        }
    );
}

export const claimAppend = async (receiverAddr, amount) => {
    const client = new TonClient({
        endpoint: await getHttpEndpoint({network: config.network}),
        apiKey: config.tonApiKey
    });
    const collectionAddress = Address.parse("0QCGLqc1o8YtzWwix1deJAjmjvm5RbVovpf2-7Gck8NIPW7e");
    const contract = client.open(new Airdrop(collectionAddress));
    let receiver = Address.parse(receiverAddr);
    let _addressBoolMap = Dictionary.empty(Dictionary.Keys.Address(), Dictionary.Values.Bool());
    _addressBoolMap.set(receiver, true);
    let _addressIntMap = Dictionary.empty(Dictionary.Keys.Address(), Dictionary.Values.BigUint(256));
    _addressIntMap.set(receiver, toNano(amount));
    await contract.send(new Sender(store.state.tonConnectUI), { value: toNano("0.15") },
        {
            $$type: 'Append',
            receiver,
            mark: true,
            amount: toNano(amount)
        }
    );
}

const listTransactions = async (queryId) => {
    let prefix = config.network === 'testnet'? "testnet.": ""
    try{
        let res = await fetch("https://"+ prefix +"toncenter.com/api/v3/transactions?account=" + store.state.tonConnectUI.account.address);
        if(res.status === 200){
            let json = await res.json();
            let minted = false;
            json.transactions.forEach(transaction => {
                let body = transaction.in_msg.message_content.body;
                let flag = eqQueryId(Cell.fromBase64(body).beginParse(), queryId);
                if(flag){
                    console.log(transaction.hash);
                    minted = true;
                }
            })
            if(!minted){
                console.log("wait...")
                await sleep(3500);
                return await listTransactions(queryId);
            }else{
                return true;
            }
        }
    }catch (e){
        console.log(e);
    }
    return false;
}
