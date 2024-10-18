import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "../wba-wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("5S27jCcdc4xgToKoWFyGYngr7KFpKVFAat7QH8PB2EUT");

// Recipient address
const to = new PublicKey("AfQQ3krHwF2tzo4oaTRmRqVf8j6qBVJrHydKQTqzAnCB");

(async () => {
    try {
        // Get the token account of the fromWallet address, and if it does not exist, create it
        const fromATA = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey);

        // Get the token account of the toWallet address, and if it does not exist, create it
        const toATA = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, to);

        // Transfer the new token to the "toTokenAccount" we just created
        const tx = await transfer(connection, keypair, fromATA.address, toATA.address, keypair.publicKey, 1e6);

        console.log(`Transaction Signature: ${tx}`); //4jUcAVBtJ6URhbyvxQL666BaGQabsJcnLERV64Ucn43Btbh28PzMYoYzMhBg4uNj3R31i8cSLXejKnQZPfncPaEm
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();