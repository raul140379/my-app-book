 import { NavigationContainer } from "@react-navigation/native";
import React from "react";
//import SplashScreen from "../screens/SplashScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import { createStackNavigator } from "@react-navigation/stack"; 
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserScreen from "../screens/UserScreen";
import BookListScreen from "../screens/BookListScreen";
import { Ionicons} from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import SettingScreen from "../screens/SettingScreen"
import SplashScreen from "../screens/SplashScreen";

const Stack =createStackNavigator();
const Tab=createBottomTabNavigator();
//const styles=StyleSheet.create({});
const TabNavigator=()=>{
    return(
        <Tab.Navigator initialRouteName="Home" screenOptions={({route})=>
        ({
            tabBarIcon:({color,size})=>{
                let iconName
                if (route.name === 'Home') {
                    iconName='home-outline'
                }else if (route.name === 'User'){
                         iconName='person-outline'
                }else if (route.name === 'Perfil'){
                         iconName='person-outline'
                }else if (route.name === 'Books'){
                         iconName='book-outline'
                }
                return <Ionicons name={iconName} size={size} color={color} /> 
            },
            tabBarActiveTintColor:'#0077b6',
            tabBarInactiveTintColor:'gray',
            tabBarStyle:{backgroundColor:'#F8FAFC'}
        })}>

            <Tab.Screen name="Home" component={HomeScreen} options={{title:'Home'}}  />
            <Tab.Screen name="User" component={UserScreen} options={{title:'Users'}} />            
             <Tab.Screen name="Books" component={BookListScreen} options={{title:'Mis libros'}} />
        </Tab.Navigator>
    );
}
export default function AppNavigator() {


    return ( 
            <Stack.Navigator initialRouteName="Splash" style={styles.container}>
                 <Stack.Screen  name="Splash" component={SplashScreen} options={{HeadersShown:false}} />                  
                  <Stack.Screen name="Login" component={LoginScreen} options={{title:'Perfil'}} />
                  <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}} /> 
                  <Stack.Screen name="Settings" component={SettingScreen} options={{headerShown:false}} /> 
                  <Stack.Screen name="MainTabs" component={TabNavigator} options={{HeadersShown:false}} />
               {/*  <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
                 */}
                 
            </Stack.Navigator> 
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
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff0f',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 