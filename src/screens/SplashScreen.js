 import React,{useEffect} from "react";
import { StyleSheet,Text,View,Image } from "react-native";

export default function SplashScreen ({navigation}){

     useEffect(()=>{
        const timer=setTimeout(() => {
            navigation.replace('Home'); 
        }, 3000);
        return ()=>clearTimeout(timer)
    },[navigation])  
    return(
        <View Style={styles.container} >
            <Text>Loading.....</Text>
              <Image source={require('../../assets/univalle.png')}   />  
            
        </View>
    ); 
}

//export default SplashScreen 

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ff5733',
        justifyContent:'center',
        alignItems:'center'
    },
    logo:{
        width:200,
        height:2000,
        resizeMode:'contain'
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