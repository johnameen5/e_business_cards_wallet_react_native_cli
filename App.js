/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CardsListPage} from './src/Pages/CardsListPage';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Cards List"
          component={CardsListPage}
          options={{title: 'E-Business Cards Wallet'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
