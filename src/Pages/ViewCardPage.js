import {Text, View} from 'react-native';
import React from 'react';

export class ViewCardPage extends React.Component<{
  route: any,
  navigation: any,
}> {
  state = {
    businessCard: null,
  };

  componentDidMount() {
    let {route} = this.props;
    this.setState({businessCard: route.params.businessCard});
  }

  render() {
    console.log(this.state.businessCard);
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>View Cards Page</Text>
      </View>
    );
  }
}
