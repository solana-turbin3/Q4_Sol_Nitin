import wallet from "../wba-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        const image = "https://devnet.irys.xyz/HvJo4fx1B2ZapWdeqP3pU53uu6yvGXQAJad1UF9tw6Yf"
        const metadata = {
            name: "Chill Jeff 🍻",
            symbol: "CJ",
            description: "Chill Jeff is the embodiment of laid-back vibes and carefree moments.",
            image,
            attributes: [
                { trait_type: 'Mood', value: 'Chill' },
                { trait_type: 'Drink', value: 'Beer' }
            ],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: image,
                    },
                ]
            },
            creators: [
                {
                    address: keypair.publicKey,
                }
            ]
        };
        const myUri = await umi.uploader.uploadJson(metadata);
        // console.log("Your metadata URI: ", myUri);
        console.log("Your metadata URI: ", myUri.replace("arweave.net", "devnet.irys.xyz")); // https://devnet.irys.xyz/2ubtK8SHDHHSEyyXqUQDkC3HdG4t5c9TdaPgKtdKyzrQ
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
