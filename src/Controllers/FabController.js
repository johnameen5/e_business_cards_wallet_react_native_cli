import {readNfcTag, stopReadingNfc} from '../Services/NfcService';
import {Ndef} from 'react-native-nfc-manager';
import {
  NfcDisabledException,
  NfcNotSupportedException,
} from '../Exceptions/NfcExceptions';
import {Alert} from 'react-native';
import {dismissSnackbar, showInfoSnackbar} from '../Services/SnackbarService';
import Snackbar from 'react-native-snackbar';
import {
  NdefRecordIsNotAnURLException,
  NdefRecordsEmptyException,
} from '../Exceptions/NdefRecordsExceptions';
import {sprintf} from 'sprintf-js';
import {VALIDATE_CARD_URL, VALIDATE_DOMAIN_URL} from '../Values/Urls';
import axios from 'axios';
import {
  CardAlreadyExistsException,
  CardInvalidException,
  UrlDomainInvalidException,
  UuidInvalidException,
} from '../Exceptions/BusinessCardsUrlsExceptions';
import NetInfo from '@react-native-community/netinfo';
import {BusinessCard} from '../Models/BusinessCard';
import {getFromStorage, saveInStorage} from '../Services/AsnycStorageService';
import {BUSINESS_CARDS_KEY} from '../Values/Strings';

let Url = require('url');

export async function readCardUsingNFC(callback) {
  let networkState = await NetInfo.fetch();

  if (!networkState.isConnected) {
    Alert.alert('Error', 'No internet connection detected', [{text: 'Ok'}]);
    return;
  }

  readNfcTag()
    .then(async tag => {
      await onTagRead(tag.ndefMessage);
      callback(JSON.parse(await getFromStorage(BUSINESS_CARDS_KEY)));
    })
    .catch(exception => {
      console.log(exception.message);

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
      await stopReadingNfc();
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
  }
}

function checkReadNdefRecords(records) {
  if (!records) {
    throw new NdefRecordsEmptyException();
  }
  if (!Ndef.isType(records[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI)) {
    throw new NdefRecordIsNotAnURLException();
  }
}

function handleNdefExceptions(exception) {
  if (exception instanceof NdefRecordsEmptyException) {
    Alert.alert('Error', 'NFC tag is empty', [{text: 'Ok'}]);
  } else if (exception instanceof NdefRecordIsNotAnURLException) {
    Alert.alert('Error', 'NFC tag has invalid content', [{text: 'Ok'}]);
  }
}

async function onTagRead(records) {
  try {
    checkReadNdefRecords(records);
    let url = Ndef.uri.decodePayload(records[0].payload);

    let uuid = await isUrlValid(url);

    let businessCard = new BusinessCard(url, uuid);

    await checkIfBusinessCardExists(businessCard);

    await saveBusinessCard(businessCard);

    Alert.alert('', 'Card successfully read', [{text: 'Ok'}]);
  } catch (exception) {
    console.log(exception);

    handleNdefExceptions(exception);
    handleBusinessCardExceptions(exception);
  }
}

export function readCardUsingQrCode() {
  console.log('QR Code');
}

async function isUrlValid(urlString) {
  let url = Url.parse(urlString);
  let domain = url.host;

  await isDomainValid(domain);

  let pathArray = url.path.split('/');
  let uuid = pathArray.length > 0 ? pathArray[pathArray.length - 1] : '';

  isUuidValid(uuid);

  await isCardValid(url, uuid);

  return uuid;
}

function isUuidValid(uuid) {
  let matches =
    /^[0-9(a-f|A-F)]{8}-[0-9(a-f|A-F)]{4}-4[0-9(a-f|A-F)]{3}-[89ab][0-9(a-f|A-F)]{3}-[0-9(a-f|A-F)]{12}$/.test(
      uuid,
    );

  if (!matches) {
    throw new UuidInvalidException();
  }
}

async function isCardValid(cardUrl, uuid) {
  let host = cardUrl.hostname;
  let port = cardUrl.port;
  let protocol = cardUrl.protocol;

  let url = sprintf(
    VALIDATE_CARD_URL,
    protocol,
    `${host}${port ? `:${port}` : ''}`,
    uuid,
  );

  let response = await axios.get(url);

  if (response.status !== 200 || !response.data.success) {
    throw new CardInvalidException();
  }
}

async function isDomainValid(domain) {
  let url = sprintf(VALIDATE_DOMAIN_URL, domain);
  let response = await axios.get(url);
  if (response.status !== 200 || !response.data.success) {
    throw new UrlDomainInvalidException();
  }
}

function handleBusinessCardExceptions(exception) {
  if (exception instanceof UrlDomainInvalidException) {
    Alert.alert('Error', 'Business card invalid', [{text: 'Ok'}]);
  } else if (exception instanceof NdefRecordIsNotAnURLException) {
    Alert.alert('Error', 'Business card invalid', [{text: 'Ok'}]);
  } else if (exception instanceof CardAlreadyExistsException) {
    Alert.alert('Error', 'Business card already exists', [{text: 'Ok'}]);
  }
}

async function saveBusinessCard(businessCard) {
  let businessCards = JSON.parse(await getFromStorage(BUSINESS_CARDS_KEY));
  businessCards = businessCards ?? [];
  businessCards.push(businessCard);
  console.log(businessCards);
  await saveInStorage(BUSINESS_CARDS_KEY, JSON.stringify(businessCards));
}

async function checkIfBusinessCardExists(businessCard) {
  let businessCards = JSON.parse(await getFromStorage(BUSINESS_CARDS_KEY));
  if (!businessCards) {
    return;
  }
  let filteredBusinessCards = businessCards.filter(card => {
    return card.uuid === businessCard.uuid;
  });

  if (filteredBusinessCards.length > 0) {
    throw new CardAlreadyExistsException();
  }
}
