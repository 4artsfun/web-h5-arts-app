import {
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    getAssociatedTokenAddress,
    getAccount,
    createAssociatedTokenAccountInstruction,
    TokenAccountNotFoundError,
    TokenInvalidAccountOwnerError,
    TokenInvalidMintError,
    TokenInvalidOwnerError,
} from '@solana/spl-token'
import { Transaction } from '@solana/web3.js'

/**
 * (rewrite)Retrieve the associated token account, or create it if it doesn't exist
 *
 * @param connection               Connection to use
 * @param payer                    Payer of the transaction and initialization fees
 * @param mint                     Mint associated with the account to set or verify
 * @param owner                    Owner of the account to set or verify
 * @param sendTransaction
 * @param allowOwnerOffCurve       Allow the owner account to be a PDA (Program Derived Address)
 * @param commitment               Desired level of commitment for querying the state
 * @param programId                SPL Token program account
 * @param associatedTokenProgramId SPL Associated Token program account
 *
 * @return Address of the new associated token account
 */
export async function getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    owner,
    allowOwnerOffCurve = false,
    commitment,
    programId = TOKEN_PROGRAM_ID,
    associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID,
) {
    const associatedToken = await getAssociatedTokenAddress(
        mint,
        owner,
        allowOwnerOffCurve,
        programId,
        associatedTokenProgramId,
    )
    // This is the optimal logic, considering TX fee, client-side computation, RPC roundtrips and guaranteed idempotent.
    // Sadly we can't do this atomically.
    let account
    try {
        account = await getAccount(connection, associatedToken, commitment, programId)
        console.log("account", account);
    } catch (error) {
        // TokenAccountNotFoundError can be possible if the associated address has already received some lamports,
        // becoming a system account. Assuming program derived addressing is safe, this is the only case for the
        // TokenInvalidAccountOwnerError in this code path.
        if (error instanceof TokenAccountNotFoundError || error instanceof TokenInvalidAccountOwnerError) {
            // As this isn't atomic, it's possible others can create associated accounts meanwhile.
            const transaction = new Transaction().add(
                createAssociatedTokenAccountInstruction(
                    payer.publicKey,
                    associatedToken,
                    owner,
                    mint,
                    programId,
                    associatedTokenProgramId,
                ),
            )
            const blockHash = await connection.getLatestBlockhash()
            transaction.feePayer = await payer.publicKey
            transaction.recentBlockhash = blockHash.blockhash
            // transaction.lastValidBlockHeight = blockHash.lastValidBlockHeight;
            const signed = await payer.signTransaction(transaction)
            const signature = await connection.sendRawTransaction(signed.serialize())
            console.log("signature", signature);
            await connection.confirmTransaction(signature)
            // Now this should always succeed
            account = await getAccount(connection, associatedToken, commitment, programId)
        } else {
            throw error
        }
    }
    if (!account.mint.equals(mint)) throw new TokenInvalidMintError()
    if (!account.owner.equals(owner)) throw new TokenInvalidOwnerError()
    return account
}
