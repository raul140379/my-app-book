import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import colors from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import { useEffect, useState } from 'react';
import { showMessage } from 'react-native-flash-message';

export default function UserScreen({ navigation }) {

  const { user, setUser } = useAuth();
  const [imageUri, setImageUri] = useState(null)
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false)  
  const defaultImage = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'

  useEffect(() => {
    if (user && user.photoURL) {
      setImageUri(user.photoURL)
    } else {
      setImageUri(defaultImage)
    }

  }, [user])

  const handleLogout = async() => {
    try
    {
      await signOut(auth)
      showMessage({
        message:'Cerrado',
        description:'Has cerrado sesion correctamente.',
        type:'success',
      })
      setLogoutModalVisible(false)
      navigation.replace('Login')
     // .then(() => navigation.replace('Login'))
     // .catch((error) => Alert.Alert('Error:', 'No se pudo cerrar session'))
    }catch (error){
      showMessage({
        message:'error',
        description:'No se pudo cerrar session. Intentelo de nuevo.',
        type:'danger',
      })
    }
    
  }
  return (
    <LinearGradient colors={colors.gradientePrimario} style={styles.container}>
      <View style={styles.container} >

        
        <View style={{  justifyContent: 'center',
          alignItems: 'center',}}>
          <Text style={{ fontSize: 30, color: colors.luminous, fontWeight: 'bold'}}>Foto de perfil</Text>
          <Image style={styles.perfilFoto} source={{ uri: imageUri || defaultImage }} />
          <Text style={{ fontSize: 15, color: colors.luminous, fontWeight: 'bold'}}>usuario: {user?.displayName || 'Anonimo'}</Text>
          <View >
            <TouchableOpacity style={styles.ajusteButton} onPress={() => navigation.navigate('Settings')}>
            <Text style={styles.text}>Ajustes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cerrarButton} onPress={handleLogout}>
            <Text style={styles.text}>Cerrar Session</Text>
          </TouchableOpacity>
          </View>
          
        </View>

      </View>

      <StatusBar style="auto" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: colors.variante1,
    paddingHorizontal: 30,
  },
  text: {
    fontSize: 15,
    color: colors.luminous,
    fontWeight: 'bold'
  },
  cerrarButton: {
    backgroundColor: colors.exito,
    padding: 10, 
    borderRadius: 10,
    alignItems:'center',
    marginTop:20
  },
   ajusteButton: {
          backgroundColor: colors.exito,
          flexDirection: 'column',
          paddingVertical: 10,
          paddingHorizontal: 10,
          borderRadius: 15,
          marginBottom: 15,
          justifyContent: 'center',
          alignItems: 'center',
          width: 80,
          height: 40,
      },
      perfilFoto: {
     width: 100,
     height: 100,
     justifyContent: 'center',
          alignItems: 'center',
  },
});