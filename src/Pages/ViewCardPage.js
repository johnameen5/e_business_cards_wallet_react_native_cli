import {Text, View} from 'react-native';
import React from 'react';

export class ViewCardPage extends React.Component<{
  route: any,
  navigation: any,
}> {
  state = {
    uuid: null,
  };

  componentDidMount() {
    let {route} = this.props;
    this.setState({uuid: route.params.uuid});
  }

  render() {
    console.log(this.state.uuid);
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>View Cards Page</Text>
      </View>
    );
  }
}
