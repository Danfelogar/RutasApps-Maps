import 'react-native-gesture-handler';
import React, { Children } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';


import { Navigator } from './src/navigator/Navigator';
import { PermissionsProvider } from './src/context/PermissionsContext';

LogBox.ignoreLogs(['react-native-gesture-handler']);

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
