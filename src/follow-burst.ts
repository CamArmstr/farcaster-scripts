import { MerkleAPIClient } from "@standard-crypto/farcaster-js";
import { Wallet } from "ethers";
import 'dotenv/config'

const FC_MNEMONIC = process.env.FC_MNEMONIC;
if (!FC_MNEMONIC) {
    throw new Error('Missing Farcaster Recovery Phrase')
}

const wallet = Wallet.fromMnemonic(FC_MNEMONIC);

const apiClient = new MerkleAPIClient(wallet);
console.log("Connected to Merkle API")


const user = await apiClient.lookupUserByUsername("dwr");

console.log("Got Dan");
try {
if (user === undefined) throw new Error("no such user");

console.log("No Dan");

const followees = await apiClient.fetchUserFollowing(user);

console.log("Got Dan's followees", followees)

while (true) {
    const { value: f, done } = await followees.next();

    if (done) {
        break;
    }

    console.log(f);

    try {
        await apiClient.followUser(f);
    } catch (e) {
        // ..
    }
}


} catch (e) {
    console.log("It broke here");
}





