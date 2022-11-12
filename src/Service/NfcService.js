import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import {
  NfcDisabledException,
  NfcNotSupportedException,
} from '../Exception/NfcExceptions';

NfcManager.start();

export async function readNfcTag() {
  return new Promise(async (resolve, reject) => {
    try {
      await checkNfc();

      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);

      // the resolved tag object will contain `ndefMessage` property
      resolve(await NfcManager.getTag());
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
