import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  cardsStyle,
  viewCardsActionButtonsStyle,
  viewCardsActionButtonsTextStyle,
  viewCardsBottomSheetBackDropStyle,
  viewCardsBottomSheetImageStyle,
  viewCardsBottomSheetStyle,
} from '../Values/styles';

import {BottomSheet} from '@rneui/base';

import CardListItem from '../Widget/Custom_Widgets/Card';
import {stopWritingThroughHCE, writeThroughHCE} from '../Services/NfcService';
import {
  NfcDisabledException,
  NfcNotSupportedException,
} from '../Exceptions/NfcExceptions';
import {Platform} from 'react-native';

const QR_CODE_TYPES = {
  ContactQrCode: 'ContactQrCode',
  UrlQrCode: 'UrlQrCode',
};

export class ViewCardPage extends React.Component<{
  route: any,
  navigation: any,
}> {
  state = {
    businessCard: null,
    session: null,
    bottomSheetVisible: false,
    visibleQrCode: null,
  };

  componentDidMount() {
    let {route} = this.props;
    this.setState({...this.state, businessCard: route.params.businessCard});
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <CardListItem style={cardsStyle} />
        <View style={{flex: 2, marginTop: 30}}>
          {this.getNfcActionButton()}
          {this.getContactQrActionButton()}
          {this.getUrlQrActionButton()}
        </View>
        <BottomSheet
          isVisible={this.state.bottomSheetVisible}
          containerStyle={viewCardsBottomSheetStyle}
          backdropStyle={viewCardsBottomSheetBackDropStyle}
          onBackdropPress={() => this.toggleBottomSheet()}>
          <View style={{flexDirection: 'column', justifyContent: 'center'}}>
            <Image
              source={{uri: this.state.visibleQrCode}}
              style={viewCardsBottomSheetImageStyle}
            />
            <TouchableOpacity
              style={viewCardsActionButtonsStyle}
              onPress={() => {
                this.toggleBottomSheet();
              }}>
              <Text style={viewCardsActionButtonsTextStyle}>{'Done'}</Text>
            </TouchableOpacity>
          </View>
        </BottomSheet>
      </View>
    );
  }

  getNfcActionButton() {
    return Platform.OS !== 'android' ? null : (
      <TouchableOpacity
        style={viewCardsActionButtonsStyle}
        onPress={async () => {
          await this.writeThroughNfc();
        }}>
        <Text style={viewCardsActionButtonsTextStyle}>
          {'Share card through NFC'}
        </Text>
      </TouchableOpacity>
    );
  }

  getContactQrActionButton() {
    return (
      <TouchableOpacity
        style={viewCardsActionButtonsStyle}
        onPress={() => {
          this.handleQrCodeActionClicked(QR_CODE_TYPES.ContactQrCode);
        }}>
        <Text style={viewCardsActionButtonsTextStyle}>{'Contact QR Code'}</Text>
      </TouchableOpacity>
    );
  }

  getUrlQrActionButton() {
    return (
      <TouchableOpacity
        style={viewCardsActionButtonsStyle}
        onPress={() => {
          this.handleQrCodeActionClicked(QR_CODE_TYPES.UrlQrCode);
        }}>
        <Text style={viewCardsActionButtonsTextStyle}>{'URL QR Code'}</Text>
      </TouchableOpacity>
    );
  }

  handleQrCodeActionClicked(type) {
    let businessCard = this.state.businessCard;
    let isVisible = this.state.bottomSheetVisible;
    let qrCode = null;

    if (type === QR_CODE_TYPES.ContactQrCode) {
      qrCode = businessCard.contactQrCode;
    } else if (type === QR_CODE_TYPES.UrlQrCode) {
      qrCode = businessCard.urlQrCode;
    }

    this.setState({
      ...this.state,
      bottomSheetVisible: !isVisible,
      visibleQrCode: qrCode,
    });
  }

  async writeThroughNfc() {
    try {
      let session = await writeThroughHCE(this.state.businessCard.uri);
      Alert.alert('', 'Please tap mobile phone to scan the card', [
        {
          text: 'Cancel',
          onPress: async () => {
            await stopWritingThroughHCE(session);
          },
        },
      ]);
      this.setState({
        ...this.state,
        session: session,
      });
    } catch (exception) {
      this.handleNfcExceptions(exception);
    }
  }

  handleNfcExceptions(exception) {
    if (exception instanceof NfcNotSupportedException) {
      Alert.alert('Error', 'NFC is not supported', [{text: 'Ok'}]);
    } else if (exception instanceof NfcDisabledException) {
      Alert.alert('Error', 'NFC is disabled, please enable NFC and try again', [
        {text: 'Ok'},
      ]);
    }
  }

  toggleBottomSheet() {
    let bottomSheetVisible = !this.state.bottomSheetVisible;
    this.setState({
      ...this.state,
      bottomSheetVisible: bottomSheetVisible,
    });
  }
}
