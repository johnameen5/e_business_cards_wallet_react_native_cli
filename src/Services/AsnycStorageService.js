import AsyncStorage from '@react-native-async-storage/async-storage';
import {APP_KEY} from '../Values/Strings';

export async function saveInStorage(key, value) {
  await AsyncStorage.setItem(`${APP_KEY}:${key}`, value);
}

export async function getFromStorage(key) {
  return await AsyncStorage.getItem(`${APP_KEY}:${key}`);
}
