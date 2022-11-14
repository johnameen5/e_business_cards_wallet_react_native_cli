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
import {Provider} from 'react-redux';
import store from './store';
import {ViewCardPage} from './src/Pages/ViewCardPage';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Cards List"
            component={CardsListPage}
            options={{title: 'E-Business Cards Wallet'}}
          />
          <Stack.Screen
            name="Card"
            component={ViewCardPage}
            options={{title: 'Card'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
