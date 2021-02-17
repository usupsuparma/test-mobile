import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  HomeScreen,
  LoginScreen,
  PresenceScreen,
  RegisterScreen,
  ReportScreen,
} from './src/screens';
const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name={'Home'}
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Login'}
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Presence'}
          component={PresenceScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Register'}
          component={RegisterScreen}
          // options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Report'}
          component={ReportScreen}
          // options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
