import React from 'react';
import {SafeAreaView, View} from 'react-native';
import CustomExpandableFloatingAction from '../Widget/Custom_Widgets/fab';
import CardsList from '../Widget/Custom_Widgets/CardsList';

export function CardsListPage() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <CardsList />

      <CustomExpandableFloatingAction />
    </View>
  );
}
