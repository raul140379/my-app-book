import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen() {
  const {user}=useAuth();
  return (
    <LinearGradient colors={colors.gradientePrimario} style={styles.container}>
      <Text style={styles.text}>Bienvenido a HOME usuario:{user?.displayName ||'Anonimo'} </Text>
      <StatusBar style="auto" />
    </LinearGradient>
    
  );    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    fontSize:24,
    color:colors.luminous,
    fontWeight:'bold'
    },
});