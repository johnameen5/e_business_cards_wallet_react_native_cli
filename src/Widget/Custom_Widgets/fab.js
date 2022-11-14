import Icon from 'react-native-vector-icons/MaterialIcons';
import {Text} from 'react-native';
import {
  readCardUsingNFC,
  readCardUsingQrCode,
} from '../../Controllers/FabController';
import ExpandableFloatingAction from '../fab';
import React from 'react';
import {connect} from 'react-redux';

const CustomExpandableFloatingAction = props => {
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
            await readCardUsingNFC(props.setBusinessCards);
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

function mapStateToProps(state) {
  return {
    businessCards: state.businessCards,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setBusinessCards: businessCards =>
      dispatch({type: 'SET_BUSINESS_CARDS', businessCards: businessCards}),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomExpandableFloatingAction);
