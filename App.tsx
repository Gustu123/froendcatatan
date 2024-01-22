/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView } from 'react-native';
import TopScreen from './src/screens/TopScreen';
import LoginScreen from './src/screens/LoginScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from './src/navigations/MainNavigation';
import { GestureHandlerRefContext } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { combineReducers } from 'redux';
import { authReducer } from './src/redux/reducers/authReducer';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

function App(): JSX.Element {

  const rootReducer = combineReducers({
    authReducer
  })

  const store = configureStore({
    reducer: rootReducer
  })

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <SafeAreaProvider>
          <NavigationContainer>
            <MainNavigation></MainNavigation>
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;

