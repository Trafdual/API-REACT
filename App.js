import React, {useState} from 'react';
import { Text,View, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SigninScreen from './screens/SigninScreen';
const Stack=createNativeStackNavigator();
const App=()=>{
  return(
  <NavigationContainer>
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name='Home' component={HomeScreen} options={{ gestureEnabled: false }}  />
      <Stack.Screen name='Login' component={SigninScreen} options={{ gestureEnabled: false }}/>
    </Stack.Navigator>
  </NavigationContainer>  
  );
}
export default App;
