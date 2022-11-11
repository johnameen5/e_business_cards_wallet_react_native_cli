import React from 'react';
import {Text, View} from 'react-native';
import ExpandableFloatingAction from '../Widget/fab';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { readCardUsingNFC, readCardUsingQrCode } from "../Controller/FabController";

export function CardsListPage() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ExpandableFloatingAction
        mainColor="#0096FF"
        secondaryColor="#0096FF"
        closeIcon={<Icon name="close" color={'#FFFFFF'} size={25} />}
        openIcon={<Icon name="add" color={'#FFFFFF'} size={25} />}
        menuIcons={[
          {
            name: 'nfc',
            icon: <Icon name="nfc" color={'#FFFFFF'} size={20} />,
            text: <Text />,
            callback: () => {
              readCardUsingNFC();
            },
          },
          {
            name: 'qr-code',
            icon: <Icon name="qr-code" color={'#FFFFFF'} size={20} />,
            text: <Text />,
            callback: () => {
              readCardUsingQrCode();
            },
          },
        ]}
      />
    </View>
  );
}
