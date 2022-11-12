import Icon from 'react-native-vector-icons/MaterialIcons';
import {Text} from 'react-native';
import {
  readCardUsingNFC,
  readCardUsingQrCode,
} from '../../Controllers/FabController';
import ExpandableFloatingAction from '../fab';
import React from 'react';

const CustomExpandableFloatingAction = () => {
  return (
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
          callback: async () => {
            await readCardUsingNFC();
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
  );
};

export default CustomExpandableFloatingAction;
