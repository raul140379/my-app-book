 import { useNavigation } from "@react-navigation/native";
import React,{useEffect} from "react";
import { StyleSheet,Text,View,Image } from "react-native";
import StyleTheme from "../constants/StyleTheme";
import colors from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";

export default function SplashScreen (){
    const navigation=useNavigation();
     useEffect(()=>{
        const timer=setTimeout(() => {
            navigation.replace('Login'); 
        }, 3000);
        return ()=>clearTimeout(timer)
    },[navigation])  
    return(
        <LinearGradient colors={colors.gradientePrimario} style={styles.container}>
            <Text style={styles.text}>Loading.....</Text>
            <Image source={require('../../assets/univalle.png')}   />  
        </LinearGradient>
    );
}

//export default SplashScreen 

const styles=StyleSheet.create({
    container:{
        flex:1,
       /*  backgroundColor:StyleTheme.colors.background, */
        justifyContent:'center',
        alignItems:'center'
    },
    logo:{
        width:200,
        height:2000,
        resizeMode:'contain'
    },
    text:{
        color:colors.luminous,
        fontSize:20,
        fontWeight:'bold',
        marginBottom:20,
    },
    loader:{
        marginTop:20
    }
})

/* import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Text>Mi pagina de Splash</Text>
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