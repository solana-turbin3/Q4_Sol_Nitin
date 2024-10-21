import wallet from "../wba-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"
import { readFile } from "fs/promises"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        //1. Load image
        //2. Convert image to generic file.
        //3. Upload image

        const image = await readFile("/home/nverma_36/turbine_q4/solana-starter/assets/jeffrug.png")
        const genericFile = createGenericFile(image, "Chill Jeff", {contentType: "image/png"});
        const [myUri] = await umi.uploader.upload([genericFile]);
        console.log("Your image URI: ", myUri.replace("arweave.net","devnet.irys.xyz")); // https://devnet.irys.xyz/HvJo4fx1B2ZapWdeqP3pU53uu6yvGXQAJad1UF9tw6Yf
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
