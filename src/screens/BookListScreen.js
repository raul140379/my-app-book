import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';

export default function BookListScreen() {
  return (
     <LinearGradient colors={colors.gradientePrimario} style={styles.container}>
          <Text style={styles.text}>Mi pagina de HOME</Text>
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