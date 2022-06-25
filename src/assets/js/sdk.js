require('dotenv').config()
var base32 = require('hi-base32');
let  fs = require('fs');
let path = require('path');
const algosdk = require('algosdk');
// const algod  = require('./client');
// let client = algod.client;

const token = '';
const server = 'https://testnet-api.algonode.cloud';
const port = '';
const client = new algosdk.Algodv2(token, server, port);

// Indexer
const BASE_SERVER = "https://testnet-idx.algonode.cloud";
let algoIndexer = new algosdk.Indexer(token, BASE_SERVER, port);


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

    // logic sig creation
    let filePath = path.join(__dirname, 'logicsig.teal');
    //console.log(filePath)
    let data = fs.readFileSync(filePath);
    let results = await client.compile(data).do();
    //console.log("Hash = " + results.hash);
    //console.log("Result = " + results.result);
    let program = new Uint8Array(Buffer.from(results.result, "base64"));
    let args = getUint8Int(2022);
    let lsig = new algosdk.LogicSigAccount(program, args);
    console.log("lsig : " + lsig.address());
    let appIndex = (94241155);

    // // Opt-in for logic sig
    // let appArgs = [];
    // let dappName = "Noti Boy"
    // const enc = new TextEncoder("utf-8")
    // appArgs.push(enc.encode(dappName))
    // appArgs.push(enc.encode("dapp"))
    // let closeRemainderTo = undefined;
    // let note = undefined;
    // params.fee = 2000;
    //let receiver = `HZ57J3K46JIJXILONBBZOHX6BKPXEM2VVXNRFSUED6DKFD5ZD24PMJ3MVA`;
    // params.flatFee = true;
    // let transaction1 = algosdk.makePaymentTxnWithSuggestedParams(sender, receiver, 1000000,closeRemainderTo,
    //        note,params);
    // let transaction2 = algosdk.makeApplicationOptInTxn(lsig.address(),params,appIndex,appArgs);
    // transaction2.fee = 0
    // let txns = [transaction1, transaction2]
    // let txgroup = algosdk.assignGroupID(txns);
    // let SignedTxn1 =  algosdk.signTransaction(transaction1, myAccount.sk ); 
    // let SignedTxn2 = algosdk.signLogicSigTransaction(transaction2, lsig);
    // let signed = []
    // signed.push( SignedTxn1.blob )
    // signed.push( SignedTxn2.blob )
    // let opttx = (await client.sendRawTransaction(signed).do());
    // await waitForConfirmation(client, opttx.txId);

//     // Application call with notification
//     const enc = new TextEncoder("utf-8")
//     let appArgs = []
//     receiver = sender;
//     appArgs.push(enc.encode("Notify"));
//     params.fee = 2000;
//     params.flatFee = true;
//     let note = enc.encode("This is forth notification.")
//     let closeRemainderTo =undefined;
//     let accounts = []
//     let  foreignApps = []
//     let foreignAssets = []
//     let transaction1 = algosdk.makePaymentTxnWithSuggestedParams(sender, receiver, 0,closeRemainderTo,
//     note,params);
//     let transaction2 = algosdk.makeApplicationNoOpTxn(lsig.address(),params,appIndex,appArgs,accounts,foreignApps,foreignAssets,note);
//     transaction2.fee = 0
//     let txns = [transaction1, transaction2]
//     let txgroup = algosdk.assignGroupID(txns);
//     let SignedTxn1 =  algosdk.signTransaction(transaction1, myAccount.sk ); 
//     let SignedTxn2 = algosdk.signLogicSigTransaction(transaction2, lsig);
//     let signed = []
//     signed.push( SignedTxn1.blob )
//     signed.push( SignedTxn2.blob )
//     let opttx = (await client.sendRawTransaction(signed).do());
//     await waitForConfirmation(client, opttx.txId);

    
    let  localState = await algoIndexer.lookupAccountAppLocalStates(lsig.address()).applicationID(appIndex).do();
    let transactionDetails = localState['apps-local-states'][0]['key-value']
    let transactionIds= getTransactionIds(transactionDetails)
    let notifications = await getNotifications(transactionIds)
    console.log(notifications)
 
})().catch(e => {
    console.log(e.status);
});

    function getUint8Int(number) {
        const buffer = Buffer.alloc(8);
        const bigIntValue = BigInt(number);
        buffer.writeBigUInt64BE(bigIntValue);
        return  [Uint8Array.from(buffer)];
    }

    function getTransactionIds(notifications){
        let transactionIds = [];
        for(let j=0; j< notifications.length; j++){
            // converting key into array buffer
            let bufferKey = Buffer.from(notifications[j].key, 'base64')
            let finalKey;
            // checking for "index" string to keep it as is
            let stringConvert =  bufferKey.toString('utf-8')
            if( stringConvert == "index"){
                finalKey = stringConvert;
                continue;
            }else{
                // other key values are converted into int
               finalKey = algosdk.decodeUint64(bufferKey, "mixed")
            }
            // Decoding the value into string and removing "===="
            let decodedValue = base32.encode(Buffer.from(notifications[j].value.bytes, 'base64'));
            for(let i=decodedValue.length-1; i>=0; i--){
                if(decodedValue[i] == '='){
                    decodedValue =  decodedValue.slice(0,-1);
                }
                else{
                    transactionIds.splice(finalKey-1, 0, decodedValue)
                    break;
                }
            }
        }
        return transactionIds;
    }

    async function getNotifications(transactionIds){
        let notifications =[];
        for(let i=0; i<transactionIds.length;i++){
            let txnId = transactionIds[i];
            let txnInfo = await algoIndexer.lookupTransactionByID(txnId).do();
  
            let note = (Buffer.from(txnInfo.transaction.note, 'base64')).toString('utf-8')
            notifications.unshift(note)
        }
        return notifications;
    }


