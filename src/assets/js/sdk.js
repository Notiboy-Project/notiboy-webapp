require('dotenv').config()
let  fs = require('fs');
let path = require('path');
const algosdk = require('algosdk');
// const algod  = require('./client');
// let client = algod.client;


const port="";
const token={
    "x-api-key": process.env.API // fill in yours
};

/*Use the following code to get info from testnet */
const Testserver="https://testnet-algorand.api.purestake.io/ps2"; 
let client = new algosdk.Algodv2(token,Testserver,port);

let PASSPHRASE = process.env.PASSPHRASE6;
let  myAccount = algosdk.mnemonicToSecretKey(PASSPHRASE); 
let sender = myAccount.addr;
console.log(sender);
(async () => {

    const waitForConfirmation = async function (client, txId) {
        let response = await client.status().do();
        let lastround = response["last-round"];
        while (true) {
            const pendingInfo = await client.pendingTransactionInformation(txId).do();
            if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
                //Got the completed Transaction
                console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
                break;
            }
            lastround++;
            await client.statusAfterBlock(lastround).do();
        }
    };
    let params = await client.getTransactionParams().do();
    console.log(params);
    params.fee = 1000;
    // logic sig creation
    let filePath = path.join(__dirname, 'logicsig.teal');
    console.log(filePath)
    let data = fs.readFileSync(filePath);
    let results = await client.compile(data).do();
    console.log("Hash = " + results.hash);
    console.log("Result = " + results.result);
    let program = new Uint8Array(Buffer.from(results.result, "base64"));
    let args = getUint8Int(123987);
    let lsig = new algosdk.LogicSigAccount(program, args);
    console.log("lsig : " + lsig.address());
    lsig.sign(myAccount.sk); 
    let appIndex = (94241155);

    // //Opt-in for logic sig
    // let opttxn = algosdk.makeApplicationOptInTxn(lsig.address(),params,appIndex);
    // rawSignedTxn = algosdk.signLogicSigTransaction(opttxn, lsig);
    // let opttx = (await client.sendRawTransaction(rawSignedTxn.blob).do());
    // await waitForConfirmation(client, opttx.txId);

    //Application call with notification
    const enc = new TextEncoder("utf-8")
    let appArgs = []
    appArgs.push(enc.encode("Notify"));
    let note = enc.encode("This is another notification")
    let accounts = []
    let  foreignApps = []
    let foreignAssets = []
    let opttxn = algosdk.makeApplicationNoOpTxn(lsig.address(),params,appIndex,appArgs,accounts,foreignApps,foreignAssets,note);
    rawSignedTxn = algosdk.signLogicSigTransaction(opttxn, lsig);
    let opttx = (await client.sendRawTransaction(rawSignedTxn.blob).do());
    await waitForConfirmation(client, opttx.txId);

})().catch(e => {
    console.log(e);
});

function getUint8Int(number) {
    const buffer = Buffer.alloc(8);
    const bigIntValue = BigInt(number);
    buffer.writeBigUInt64BE(bigIntValue);
    return  [Uint8Array.from(buffer)];
}
// let sender = lsig.address();   
    
    // //Update ASA ID
    // let assetID = (22515070);

    // //getting parameters for transactions including round number and genesis hash
    // const params = await client.getTransactionParams().do();
    // //Setting up a fixed fee
    // params.fee = 1000;
    // params.flatFee = true;

    // //Recovering the recipient address detials from passphrase
    // function recoverRecipientAccount(){
    //     const passphrase = process.env.PASSPHRASE6;
    //     let recipientAccount = algosdk.mnemonicToSecretKey(passphrase);
    //     return recipientAccount;
    // }
    // //Recovering the sender address detials from passphrase
    // let recipientRecover = recoverRecipientAccount()
    // let recipient = recipientRecover.addr
    // // let sender = recipient

    // //setting revocation target and closeremainder 
    // let revocationTarget = undefined;
    // let closeRemainderTo = undefined;
    // //Encoding the text to convert to uint8array
    // const enc = new TextEncoder()
    // let note= enc.encode("");
    // //Setting up a zero value transaction
    // let amount = 0;

    // //creating a transaction
    // let opttxn = algosdk.makeAssetTransferTxnWithSuggestedParams(sender, recipient, closeRemainderTo, revocationTarget,
    //     amount, note, assetID, params);
    // //Signing the transaction
    // rawSignedTxn = opttxn.signTxn(recipientRecover.sk);
    
    // //Propagate the transaction to blockchain
    // let opttx = (await client.sendRawTransaction(rawSignedTxn).do());
    
    // //Wait for confirmation
    // await waitForConfirmation(client, opttx.txId);

