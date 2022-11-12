import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import {
  NfcDisabledException,
  NfcNotSupportedException,
} from '../Exception/NfcExceptions';
import {Alert} from 'react-native';
import Snackbar from 'react-native-snackbar';

NfcManager.start();

export async function readNfcTag() {
  try {
    await checkNfc();

    Snackbar.show({
      text: 'Tap nfc card',
      duration: Snackbar.LENGTH_INDEFINITE,
      backgroundColor: 'yellow',
      textColor: 'black',
      action: {
        text: 'Cancel',
        textColor: 'red',
        onPress: async () => {
          await NfcManager.cancelTechnologyRequest();
        },
      },
    });

    // register for the NFC tag with NDEF in it
    await NfcManager.requestTechnology(NfcTech.Ndef);

    // the resolved tag object will contain `ndefMessage` property
    const tag = await NfcManager.getTag();
    Snackbar.dismiss();

    return tag;
  } catch (ex) {
    console.log(ex);
    handleNfcExceptions(ex);
    return null;
  } finally {
    await NfcManager.cancelTechnologyRequest();
  }
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

function handleNfcExceptions(exception) {
  if (exception instanceof NfcNotSupportedException) {
    Alert.alert('Error', 'NFC is not supported', [{text: 'Ok'}]);
  } else if (exception instanceof NfcDisabledException) {
    Alert.alert('Error', 'NFC is disabled, please enable NFC and try again', [
      {text: 'Ok'},
    ]);
  }
}
