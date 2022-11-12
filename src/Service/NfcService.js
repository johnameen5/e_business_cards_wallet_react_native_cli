import NfcManager, { NfcTech } from "react-native-nfc-manager";
import {
  NfcDisabledException,
  NfcNotSupportedException,
} from "../Exception/NfcExceptions";
import { Alert } from "react-native";
import Snackbar from "react-native-snackbar";
import { dismissSnackbar, showInfoSnackbar } from "./SnackbarService";

NfcManager.start();

export async function readNfcTag() {
  try {
    await checkNfc();

    showInfoSnackbar('Tap nfc card', Snackbar.LENGTH_INDEFINITE, {
      text: 'Cancel',
      textColor: 'red',
      onPress: async () => {
        await NfcManager.cancelTechnologyRequest();
      },
    });

    // register for the NFC tag with NDEF in it
    await NfcManager.requestTechnology(NfcTech.Ndef);

    // the resolved tag object will contain `ndefMessage` property
    const tag = await NfcManager.getTag();
    dismissSnackbar();

    return tag;
  } catch (ex) {
    dismissSnackbar();
    handleNfcExceptions(ex);
    return null;
  } finally {
    dismissSnackbar();
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
    Alert.alert("Error", "NFC is not supported", [{ text: "Ok" }]);
  } else if (exception instanceof NfcDisabledException) {
    Alert.alert("Error", "NFC is disabled, please enable NFC and try again", [
      { text: "Ok" },
    ]);
  }
}
