import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';


import { Navigator } from './src/navigator/Navigator';
import { PermissionsProvider } from './src/context/PermissionsContext';

LogBox.ignoreLogs(['react-native-gesture-handler']);
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message

const AppState = ({ children }: any) =>{

  return(
    <PermissionsProvider>
      { children }
    </PermissionsProvider>
  )

}

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigator />
      </AppState>
    </NavigationContainer>
  )
}

export default App;
