import { Input } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useRef } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../services/firebaseConfig';
import LoginScreen from './LoginScreen';


export default function RegisterScreen({ navigation }) {
  //variables principales
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMessages, setErrorMesssages] = ('');
  //variables secundarias
  const [confirmapassword, setConfirmaPassword] = useState('');
  const passwordRef = useRef(null);
  const confPasswordRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [estado, setEstado] = useState(true);

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        updateProfile(user, { displayName: name })
          .then(() => {
            console.log('Usuario Registraro con nombre:', user.displayName);
            navigation.navigate('Login', { Screen: 'LoginScreen' })
          })
          .catch((error) => {
            setError(true);
            setErrorMesssages(error.message);
          });
      })
      .catch((error) => {
        setError(true);
        setErrorMesssages(error.message);
      });

  }
  return (
    <LinearGradient colors={colors.gradientePrimario} style={styles.container}>
      <Image source={require('../../../assets/PatronB.png')} style={styles.logo} />
      <Text style={styles.title}>Registro Usuario</Text>
      <View style={styles.inputcontainer}>
        <Icon name='account-outline' size={24} style={styles.icon} />
        <Input
          style={styles.input}
          placeholder="name"
          value={name}
          onChangeText={setName}
        />

      </View>
      <View style={styles.inputcontainer}>
        <Icon name='email-outline' size={24} style={styles.icon} />
        <Input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputcontainer}>
        <Icon name='lock-outline' size={24} style={styles.icon} />
        <Input
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword} />
      </View>
      { error && (
        <Text style={styles.errorMessages}> 
        {errorMessages}
        </Text>)
        
      }
        <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
                 <Text style={styles.loginButtonText}>Crear Session</Text>          
             </TouchableOpacity>
       
      <View style={styles.loginContainer}>
        <Text style={styles.registerText}>.Ya tienes una Cuenta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.registerLink}>Iniciar Session</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.variante1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    color: colors.luminous,
    fontWeight: '600',
    marginBottom: 20,
  },
  inputcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.fondoClaro,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.variante3,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: colors.thin,
  },
  forgotPassword: {
    color: colors.variante8,
    fontSize: 14,
    marginBottom: 20,
  },
  loginButtonText: {
    fontSize: 16,
    color: colors.luminous,
    fontWeight: 'bold'
  },
  loginButton: {
    backgroundColor: colors.exito,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginBottom: 30,
  },
  registerButton:{
      backgroundColor:colors.exito,
      paddingVertical:15,
      paddingHorizontal:50,
      borderRadius:30,
      marginBottom:30,
    },
  loginContainer: {
    flexDirection: 'row',
  },
  registerContainer: {
    flexDirection: 'row',
  },
  registerText: {
    color: colors.subtitle,
    fontSize: 14,
  },
  registerButton: {
    color: colors.subtitle,
    fontSize: 14,
  },
  registerLink: {
    color: colors.variante3,
    fontSize: 14,
    fontWeight: 'bold',
  },
  errorMessages: {
    color: colors.error,
    fontSize: 14,
    marginBottom: 10,
  },
});