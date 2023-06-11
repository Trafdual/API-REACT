import React, { useState } from "react";
import { Text, View, Button, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import SigninScreen from "./screens/SigninScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Stack = createNativeStackNavigator();
const App = () => {
  const doLogout = navigation => {
    AsyncStorage.removeItem("authInfo");
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }]
    });
  };
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={SigninScreen}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={props => ({
            gestureEnabled: false,
            headerBackVisible: false,
            headerRight: () =>
              <Pressable onPress={() => doLogout(props.navigation)}>
                <Text style={{ color: "#0066FF", fontSize: 15 }}>Log out</Text>
              </Pressable>
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
