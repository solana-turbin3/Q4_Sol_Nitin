import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import wallet from "../wba-wallet.json"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000n;

// Mint address
const mint = new PublicKey("5S27jCcdc4xgToKoWFyGYngr7KFpKVFAat7QH8PB2EUT");

(async () => {
    try {
        // Create an ATA
        const ata = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey);
        console.log(`Your ata is: ${ata.address.toBase58()}`); // 5fmXYM2kJHfGbf5EtP8Xacza7xzRHGBFkgcyQkEMmoCJ

        // Mint to ATA
        const mintTx = await mintTo(connection,keypair, mint, ata.address, keypair, token_decimals);
        console.log(`Your mint txid: ${mintTx}`); // 4DkKKanKeDMaUjdqK9oXj8EpCvyCt4p7BH15ispWTjbiBzg1uUPSyXYvYXjuwtKQztbhS6SF34DLNtJpZDELAAgz
    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
