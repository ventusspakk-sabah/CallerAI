import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import ContactsScreen from './src/screens/ContactsScreen';
import DialerScreen from './src/screens/DialerScreen';
import CallerIDScreen from './src/screens/CallerIDScreen';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerStyle:{backgroundColor:'#1a73e8'},headerTintColor:'#fff',headerTitleStyle:{fontWeight:'bold'}}}>
        <Stack.Screen name="Home" component={HomeScreen} options={{title:'CallerAI'}}/>
        <Stack.Screen name="Dialer" component={DialerScreen} options={{title:'拨号盘'}}/>
        <Stack.Screen name="Contacts" component={ContactsScreen} options={{title:'联系人'}}/>
        <Stack.Screen name="CallerID" component={CallerIDScreen} options={{title:'号码识别'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}