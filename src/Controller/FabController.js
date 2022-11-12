import {readNfcTag} from '../Service/NfcService';

export async function readCardUsingNFC() {
  let tag = await readNfcTag();
  console.log(tag);
}

export function readCardUsingQrCode() {
  console.log('QR Code');
}
