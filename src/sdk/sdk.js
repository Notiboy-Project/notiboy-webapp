import algosdk from "algosdk";
import {
  // APP_ARG_FOR_DAPP,
  APP_INDEX,
  DAPP_ESCROW,
  OPTIN_FEE,
} from "./constants";
import RPC from "./rpc";
import Notification from "./notifications";
import LsigTeal from "./lsig";

export default class SDK extends RPC {
  isValidAddress(address) {
    return algosdk.isValidAddress(address);
  }

  //Creating a logic sig for channel
  async createLogicSig(channelName) {
    const teal = LsigTeal(channelName);
    const results = await this.client.compile(teal).do();
    const program = new Uint8Array(Buffer.from(results.result, "base64"));
    return new algosdk.LogicSigAccount(program);
  }

  // Funding logicsig with minimum balance of 1 algo
  async provideBasicLsigBalance(address, lsig) {
    const params = await this.client.getTransactionParams().do();
    return algosdk.makePaymentTxnWithSuggestedParams(
      address,
      lsig,
      OPTIN_FEE,
      undefined,
      undefined,
      params,
      undefined
    );
  }

  // Optin to SC for channel creation
  async optin(
    // name can be either dApp name or user
    channelName,
    optinAddress,
    address,
    appArg
  ) {
    //TODO: dapp name validations if necessary
    if (!this.isValidAddress(address)) {
      throw new Error("Invalid address");
    }
    let appArgs = [];
    if (channelName == "") {
      appArgs = [this.convertToIntArray(appArg)];
    } else {
      appArgs = [
        this.convertToIntArray(appArg),
        this.convertToIntArray(channelName),
      ];
    }
    const params = await this.client.getTransactionParams().do();
    params.fee = 2000;
    params.flatFee = true;
    const paymentTxn = algosdk.makePaymentTxnWithSuggestedParams(
      address,
      DAPP_ESCROW,
      OPTIN_FEE,
      undefined,
      undefined,
      params,
      undefined
    );

    const optinTxn = algosdk.makeApplicationOptInTxn(
      optinAddress,
      params,
      APP_INDEX,
      appArgs
    );
    optinTxn.fee = 0;
    const groupTxns = [paymentTxn, optinTxn];

    algosdk.assignGroupID(groupTxns);

    return groupTxns;
  }
  // Get list of public channels
  async listPublicChannels() {
    const appInfo = await this.indexer.lookupApplications(APP_INDEX).do();
    let channelDetails = [];
    for (
      let i = 0;
      i < appInfo.application.params["global-state"].length;
      i++
    ) {
      const key = Buffer.from(
        appInfo.application.params["global-state"][i].key,
        "base64"
      ).toString("utf-8");
      if (key === "Creator") continue;
      const addressList = Buffer.from(
        appInfo.application.params["global-state"][i].value.bytes,
        "base64"
      );
      channelDetails.push({
        channelName: key,
        dappAddress: algosdk.encodeAddress(addressList.slice(0, 32)),
        lsigAddress: algosdk.encodeAddress(addressList.slice(33)),
      });
    }
    return channelDetails;
  }

  //Get notifications from a channel
  notification() {
    return new Notification(this.client, this.indexer);
  }
}
