import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import {
  HCESession,
  NFCTagType4NDEFContentType,
  NFCTagType4,
} from 'react-native-hce';
import {
  NfcDisabledException,
  NfcNotSupportedException,
} from '../Exceptions/NfcExceptions';

NfcManager.start();

export async function readNfcTag() {
  return new Promise(async (resolve, reject) => {
    try {
      await checkNfc();

      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);

      // the resolved tag object will contain `ndefMessage` property
      let tag = await NfcManager.getTag();
      resolve(tag);
    } catch (ex) {
      reject(ex);
    }
  });
}

async function checkNfc() {
  const nfcIsSupported = await NfcManager.isSupported();
  if (!nfcIsSupported) {
    throw new NfcNotSupportedException();
  }

  const nfcEnabled = await NfcManager.isEnabled();
  if (!nfcEnabled) {
    throw new NfcDisabledException();
  }
}

export async function stopReadingNfc() {
  await NfcManager.cancelTechnologyRequest();
}

export async function writeThroughHCE(url) {
  const tag = new NFCTagType4({
    type: NFCTagType4NDEFContentType.URL,
    content: url,
    writable: false,
  });
  let session = await HCESession.getInstance();
  await session.setApplication(tag);
  await session.setEnabled(true);

  return session;
}

export async function stopWritingThroughHCE(session) {
  await session.setEnabled(false);
}
