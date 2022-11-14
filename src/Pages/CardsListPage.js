import React from 'react';
import {View} from 'react-native';
import CustomExpandableFloatingAction from '../Widget/Custom_Widgets/fab';
import CardsList from '../Widget/Custom_Widgets/CardsList';

export function CardsListPage({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <CardsList navigation={navigation} />

      <CustomExpandableFloatingAction />
    </View>
  );
}
