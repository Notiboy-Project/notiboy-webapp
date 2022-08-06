import algosdk from "algosdk";
import * as base32 from "hi-base32";

export default class RPC {
  constructor(client, indexer) {
    this.client = client;
    this.indexer = indexer;
  }

  convertToIntArray(arg) {
    return new Uint8Array(Buffer.from(arg));
  }

  convertToArrayBuffer(arg) {
    const args = [];
    args.push([Buffer.from(arg)]);
    return args;
  }

  encodeUint(arg) {
    return algosdk.encodeUint64(arg);
  }

  encodeString(arg) {
    return new Uint8Array(Buffer.from(arg, "utf8"));
  }

  base32EncodeArrayBuffer(arg) {
    return base32.encode(Buffer.from(arg, "base64"));
  }

  decodeNote(note) {
    return Buffer.from(note, "base64").toString("utf-8");
  }
  //Get transaction ids for the list of notifications
  getTransactionIds(transactionDetails) {
    let transactionIds = [];
    for (let j = 0; j < transactionDetails.length; j++) {
      // converting key into array buffer
      const bufferKey = Buffer.from(transactionDetails[j].key, "base64");
      let finalKey;
      // checking for "index" string to keep it as is
      const convertToString = bufferKey.toString("utf-8");
      if (convertToString == "index") {
        finalKey = convertToString;
        continue;
      } else {
        // other key values are converted into number
        finalKey = algosdk.decodeUint64(bufferKey, "mixed");
      }
      // Decoding the value into string and removing "===="
      let value = transactionDetails[j].value.bytes;
      let decodedValue = this.base32EncodeArrayBuffer(value);
      for (let i = decodedValue.length - 1; i >= 0; i--) {
        if (decodedValue[i] == "=") {
          decodedValue = decodedValue.slice(0, -1);
        } else {
          transactionIds.splice(finalKey - 1, 0, decodedValue);
          break;
        }
      }
    }
    return transactionIds;
  }

  //Get channel details for private notifications
  getTransactionDetails(transactionDetails) {
    let channelDetails = [];
    for (let j = 0; j < transactionDetails.length; j++) {
      // converting key into array buffer
      const bufferKey = Buffer.from(transactionDetails[j].key, "base64");
      const finalKey = bufferKey.toString("utf-8");
      // Decoding the value into string and removing "===="
      let value = transactionDetails[j].value.bytes;
      let decodedValue = this.base32EncodeArrayBuffer(value);
      for (let i = decodedValue.length - 1; i >= 0; i--) {
        if (decodedValue[i] == "=") {
          decodedValue = decodedValue.slice(0, -1);
        } else {
          channelDetails.push({
            finalKey,
            decodedValue,
          });
          break;
        }
      }
    }
    return channelDetails;
  }
}
