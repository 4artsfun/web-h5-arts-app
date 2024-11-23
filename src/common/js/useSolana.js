import { getOrCreateAssociatedTokenAccount } from "./solCreateTokenAccount.js";
import {getAssociatedTokenAddress} from '@solana/spl-token'
import {getSolProvider, msg} from './util.js';
import {Connection, PublicKey, clusterApiUrl} from "@solana/web3.js";
import { Program, AnchorProvider, BN, utils } from "@coral-xyz/anchor";
import idl from './ido_arts.json';
import store from "../../store";
import {postMsg} from "./walletUtil.js";
import config from "./config.js";

const decimals = 6;
const mintDecimals = Math.pow(10, decimals);
const connection = new Connection(clusterApiUrl(config.network === 'testnet'? 'devnet': 'mainnet-beta'), "confirmed");
const mint_usdt_ID = new PublicKey("4GMWAa3hMjbPe2C1hwuB3huFGjVFYDrpo5wu6mEQFSKG");
const mint_ent_ID = new PublicKey("5Y6MQYxbyDMr1jbUPLCst3iVhS8bWwgSTo6tjoct2ypK");
export const participateInIdo = async (status, amount) => {
    const wallet = getSolProvider();
    if(!wallet){
        msg('no phantom wallet injected!')
        return;
    }
    if(!store.state.chain) {
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
    const provider = new AnchorProvider(connection, wallet, { preflightCommitment: "processed" });
    const program = new Program(idl, provider);
    const userInfoPDA = PublicKey.findProgramAddressSync([utils.bytes.utf8.encode("user_info_vec")], program.programId)[0]
    let [tokenAccountOwnerPda] = PublicKey.findProgramAddressSync([Buffer.from("token_account_owner_pda")], program.programId);
    let [tokenVault] = PublicKey.findProgramAddressSync([Buffer.from("token_vault"), mint_usdt_ID.toBuffer()], program.programId);
    try {
        const tokenAccount = await getOrCreateAssociatedTokenAccount(connection, wallet, mint_usdt_ID, wallet.publicKey);
        const tx = await program.methods.userIdo(new BN(amount * mintDecimals)).accounts({
          userinfo: userInfoPDA, tokenAccountOwnerPda, vaultTokenAccount: tokenVault, senderTokenAccount: tokenAccount.address,
          mintOfTokenBeingSent: mint_usdt_ID, signer: wallet.publicKey,}).signers([]).rpc();
        console.log("IDO transaction successful:", tx);
        msg('Ido is in progress.', {type: 2});
        status.value = 2;
        await postMsg(tx);
    } catch (err) {
        if(err.message.includes("Simulation failed")){
            msg("simulation transaction failed, check your balance");
        }else if(err.message.includes("Failed to fetch")){
            msg("connect to solana network failed, check your network.");
        }else{
            msg(err.message);
        }
        console.error("IDO transaction failed:", err);
        status.value = 0;
    }
};

export const getSolUsdtBalance = async () => {
    try{
        const wallet = getSolProvider();
        const tokenAccount = await getAssociatedTokenAddress(mint_usdt_ID, wallet.publicKey);
        const balance = await connection.getTokenAccountBalance(tokenAccount);
        return Math.floor(balance.value.amount / mintDecimals * 100) / 100;
    }catch (e){
        console.log(e);
        return 0;
    }
}

export const getSolClaimOpen = async () => {
    const wallet = getSolProvider();
    const provider = new AnchorProvider(connection, wallet, { preflightCommitment: "processed" });
    const program = new Program(idl, provider);
    const cfgPDA = PublicKey.findProgramAddressSync([utils.bytes.utf8.encode("ido_config")], program.programId)[0]
    let cfg = await program.account.configInfo.fetch(cfgPDA);
    const userInfoPDA = PublicKey.findProgramAddressSync([utils.bytes.utf8.encode("user_info_vec")], program.programId)[0]
    let userCfg = await program.account.userInfoVec.fetch(userInfoPDA);
    console.log("cfg", cfg);
    console.log("userCfg", userCfg);
    //{isClaim: true, isIdo: true, bump: 254}
    return cfg.isClaim;
}
export const solClaim = async (status) => {
    const wallet = getSolProvider();
    const provider = new AnchorProvider(connection, wallet, { preflightCommitment: "processed" });
    const program = new Program(idl, provider);
    const userInfoPDA = PublicKey.findProgramAddressSync([utils.bytes.utf8.encode("user_info_vec")], program.programId)[0]
    let [tokenAccountOwnerPda] = PublicKey.findProgramAddressSync([Buffer.from("token_account_owner_pda")], program.programId);
    let [tokenVault] = PublicKey.findProgramAddressSync([Buffer.from("token_vault"), mint_ent_ID.toBuffer()], program.programId);
    try {
        const tokenAccount = await getOrCreateAssociatedTokenAccount(connection, wallet, mint_ent_ID, wallet.publicKey);
        const tx = await program.methods.userClaim().accounts({
            userinfo: userInfoPDA, tokenAccountOwnerPda, vaultTokenAccount: tokenVault, senderTokenAccount: tokenAccount.address,
            mintOfTokenBeingSent: mint_ent_ID, signer: wallet.publicKey}).signers([]).rpc();
        console.log("sol claim successful:", tx);
        msg('Claim is in progress.', {type: 2});
        status.value = 2;
        console.log("last 1 status", status.value);
    } catch (err) {
        if(err.message.includes("Simulation failed")){
            msg("simulation transaction failed, check your balance");
        }else if(err.message.includes("Failed to fetch")){
            msg("connect to solana network failed, check your network.");
        }else{
            msg(err.message);
        }
        console.error("Claim transaction failed:", err, err.message, err.msg, err.errorMsg, err.error);
        status.value = 0;
    }
};

