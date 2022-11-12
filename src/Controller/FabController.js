import {readNfcTag, stopReadingNfc} from '../Service/NfcService';
import NfcManager, {Ndef} from 'react-native-nfc-manager';
import {
  NfcDisabledException,
  NfcNotSupportedException,
} from '../Exception/NfcExceptions';
import {Alert} from 'react-native';
import {dismissSnackbar, showInfoSnackbar} from '../Service/SnackbarService';
import Snackbar from 'react-native-snackbar';
import {
  NdefRecordIsNotAnURL,
  NdefRecordsEmpty,
} from '../Exception/NdefRecordsExceptions';

export async function readCardUsingNFC() {
  readNfcTag()
    .then(tag => {
      onTagRead(tag.ndefMessage);
    })
    .catch(exception => {
      handleNfcExceptions(exception);
    })
    .finally(() => {
      dismissSnackbar();
      stopReadingNfc();
    });

  showInfoSnackbar('Tap nfc card', Snackbar.LENGTH_INDEFINITE, {
    text: 'Cancel',
    textColor: 'red',
    onPress: async () => {
      await NfcManager.cancelTechnologyRequest();
    },
  });
}

function handleNfcExceptions(exception) {
  if (exception instanceof NfcNotSupportedException) {
    Alert.alert('Error', 'NFC is not supported', [{text: 'Ok'}]);
  } else if (exception instanceof NfcDisabledException) {
    Alert.alert('Error', 'NFC is disabled, please enable NFC and try again', [
      {text: 'Ok'},
    ]);
  } else {
    Alert.alert('Error', 'An error occurred while reading the nfc tag', [
      {text: 'Ok'},
    ]);
  }
}

function checkReadNdefRecords(records) {
  if (!records) {
    throw new NdefRecordsEmpty();
  }
  if (!Ndef.isType(records[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI)) {
    throw new NdefRecordIsNotAnURL();
  }
}

function handleNdefExceptions(exception) {
  if (exception instanceof NdefRecordsEmpty) {
    Alert.alert('Error', 'NFC tag is empty', [{text: 'Ok'}]);
  } else if (exception instanceof NdefRecordIsNotAnURL) {
    Alert.alert('Error', 'NFC tag has invalid content', [{text: 'Ok'}]);
  } else {
    Alert.alert('Error', 'An error occurred while reading the nfc tag', [
      {text: 'Ok'},
    ]);
  }
}

function onTagRead(records) {
  try {
    checkReadNdefRecords(records);
    console.log(Ndef.uri.decodePayload(records[0].payload));
    Alert.alert('', 'Card successfully read', [{text: 'Ok'}]);
  } catch (exception) {
    handleNdefExceptions(exception);
  }
}

export function readCardUsingQrCode() {
  console.log('QR Code');
}
