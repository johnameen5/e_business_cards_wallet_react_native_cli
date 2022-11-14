import {Alert, Button, View} from 'react-native';
import React from 'react';
import {cardsStyle} from '../Values/styles';
import CardListItem from '../Widget/Custom_Widgets/Card';
import {stopWritingThroughHCE, writeThroughHCE} from '../Services/NfcService';

export class ViewCardPage extends React.Component<{
  route: any,
  navigation: any,
}> {
  state = {
    businessCard: null,
    session: null,
  };

  componentDidMount() {
    let {route} = this.props;
    this.setState({...this.state, businessCard: route.params.businessCard});
  }

  render() {
    console.log(this.state.businessCard);
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <CardListItem style={cardsStyle} />
        <View style={{flex: 2}} />
        <View style={{padding: 20}}>
          <Button
            onPress={async () => {
              await this.writeThroughNfc();
            }}
            title={'Send card through NFC'}
            width
          />
        </View>
      </View>
    );
  }

  async writeThroughNfc() {
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
  }
}
