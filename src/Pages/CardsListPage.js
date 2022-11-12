import React from 'react';
import {View} from 'react-native';
import CustomExpandableFloatingAction from '../Widget/Custom_Widgets/fab';

export function CardsListPage() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <CustomExpandableFloatingAction />
    </View>
  );
}
