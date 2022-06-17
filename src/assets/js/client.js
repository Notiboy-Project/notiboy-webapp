const algosdk = require('algosdk');

async function client(){

    const port="";
    const token={
        "x-api-key": process.env.API // fill in yours
    };

    /*Use the following code to get info from testnet */
    const Testserver="https://testnet-algorand.api.purestake.io/ps2"; 
    let client = new algosdk.Algodv2(token,Testserver,port);

    let assetID = (94241155);

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
}

module.exports = client