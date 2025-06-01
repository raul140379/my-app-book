 import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import SplashScreen from "../screens/SplashScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { createStackNavigator } from "@react-navigation/stack"; 

const   Stack =createStackNavigator();

export default function AppNavigator() {


    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash">
                 <Stack.Screen name="Splash" component={SplashScreen} options={{HeadersShown:false}}/> 
                <Stack.Screen name="Home" component={HomeScreen} options={{HeadersShown:true,title:'Biblioteca Libros'}} />
                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
                <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}} /> 
                 
            </Stack.Navigator>
        </NavigationContainer>
    );
} 
//export default AppNavigator  
/* 
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Mi pagina de autenticacion</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); */