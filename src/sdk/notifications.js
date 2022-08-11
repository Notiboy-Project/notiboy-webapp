import algosdk from "algosdk";
import RPC from "./rpc";

import {
  APP_INDEX,
  ZERO_TXN,
  APP_ARG_PUB,
  APP_ARG_PVT,
  DAPP_ESCROW,
} from "./constants";

export default class Notification extends RPC {
  // Send Public Notification
  async sendPublicNotification(address, lsig, dappName, notification) {
    const note = this.encodeString(notification);
    let appArgs = [this.encodeString(APP_ARG_PUB), this.encodeString(dappName)];

    const params = await this.client.getTransactionParams().do();
    params.fee = 2000;
    params.flatFee = true;
    const paymentTxn = algosdk.makePaymentTxnWithSuggestedParams(
      address,
      DAPP_ESCROW,
      ZERO_TXN,
      undefined,
      note,
      params,
      undefined
    );

    const notificationTransaction = algosdk.makeApplicationNoOpTxn(
      lsig,
      params,
      APP_INDEX,
      appArgs,
      undefined,
      undefined,
      undefined,
      note
    );
    notificationTransaction.fee = 0;
    const groupTxns = [paymentTxn, notificationTransaction];

    algosdk.assignGroupID(groupTxns);
    return groupTxns;
  }
  //Get Public Notification
  async getPublicNotification(lsig) {
    const localState = await this.indexer
      .lookupAccountAppLocalStates(lsig)
      .applicationID(APP_INDEX)
      .do();
    const transactionDetails = localState["apps-local-states"][0]["key-value"];
    if (transactionDetails == undefined) return [];
    const transactionIds = this.getTransactionIds(transactionDetails);
    const notifications = [];
    for (let i = 0; i < transactionIds.length; i++) {
      const txnId = transactionIds[i];
      const txnInfo = await this.indexer.lookupTransactionByID(txnId).do();
      const notification = {
        notification: this.decodeNote(txnInfo.transaction.note),
        timeStamp: txnInfo.transaction["round-time"],
      };
      notifications.unshift(notification);
    }
    return notifications;
  }

  // Send Personal Notification
  async sendPersonalNotification(
    address,
    userAddress,
    lsig,
    channelName,
    notification
  ) {
    const note = this.encodeString(notification);
    let appArgs = [];
    appArgs.push(this.encodeString(APP_ARG_PVT));
    appArgs.push(this.encodeString(channelName));
    let accounts = [];
    accounts.push(userAddress);
    const params = await this.client.getTransactionParams().do();
    params.fee = 2000;
    params.flatFee = true;
    const paymentTxn = algosdk.makePaymentTxnWithSuggestedParams(
      address,
      DAPP_ESCROW,
      ZERO_TXN,
      undefined,
      note,
      params,
      undefined
    );

    const notificationTransaction = algosdk.makeApplicationNoOpTxn(
      lsig,
      params,
      APP_INDEX,
      appArgs,
      accounts,
      undefined,
      undefined,
      note
    );
    notificationTransaction.fee = 0;
    const groupTxns = [paymentTxn, notificationTransaction];

    algosdk.assignGroupID(groupTxns);
    return groupTxns;
  }

  // Get Personal notifications
  async getPersonalNotification(userAddress) {
    const localState = await this.indexer
      .lookupAccountAppLocalStates(userAddress)
      .applicationID(APP_INDEX)
      .do();
    if (localState["apps-local-states"] == null) return [];
    const channelDetails = localState["apps-local-states"][0]["key-value"];
    if (channelDetails == null) return;
    const transactionIds = this.getTransactionDetails(channelDetails);
    const notifications = [];
    for (let i = 0; i < transactionIds.length; i++) {
      const txnId = transactionIds[i].decodedValue;
      const txnInfo = await this.indexer.lookupTransactionByID(txnId).do();
      const notification = {
        channel: transactionIds[i].finalKey,
        notification: this.decodeNote(txnInfo.transaction.note),
        timeStamp: txnInfo.transaction["round-time"],
      };
      notifications.unshift(notification);
    }
    return notifications;
  }
}
