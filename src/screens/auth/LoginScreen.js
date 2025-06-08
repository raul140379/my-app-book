import React, { useState } from 'react';
import { View, Text,Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Input} from 'react-native-elements'; 
// import { Input } from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebaseConfig';

export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [errorMessages, setErrorMesssages] = useState ('');

  const handleLogin= async () => {

     /* try {
      await signInWithEmailAndPassword(auth, email, password).then((userCredential)=>{ 
      //console.log('Usuario Logeado',userCredential.user);
      alert("Inicio de sesión exitoso");
      setError(false);
      //errorMessages('');
      navigation.replace('MainTabs');
      })    
      //setError('');
      //errorMessages('')  ;
     // navigation.replace('MainTabs');
       //alert("Inicio de sesión exitoso");
    } catch (error) {
      setError(true);
      setErrorMesssages(error.message);
      alert(error.message);
    } */
    await signInWithEmailAndPassword (auth,email,password)
    .then((userCredential)=>{ 
      console.log('Usuario Logeado',userCredential.user);
     // alert('Usuario Logeado:',userCredential.user);
      setError(false)
      setErrorMesssages('')  
      navigation.replace('MainTabs');
    })
    .catch((error)=>{
      setError(true);
      setErrorMesssages(error.message);
      console.log('Error:Inicio Session');
    })
  }

  return (
    <LinearGradient colors={colors.gradientePrimario} style={styles.container}>
      <Image source={require('../../../assets/PatronB.png')} style={styles.logo}/> 
      
          <Text style={styles.title}>En busqueda de libros?</Text>
          <Text style={styles.title}>Inicia Session en tu cuenta</Text> 
       
      
      <View style={styles.inputcontainer}>
        <Icon name='email-outline' size={24} style={styles.icon}/>
        
        <Input 
          style={styles.input} 
          placeholder="Email" 
          value={email}
          onChangeText={setEmail} 
        />
       
      </View>
      <View style={styles.inputcontainer}>
        <Icon name='lock-outline' size={24} style={styles.icon}/>
        <Input 
          style={styles.input} 
          placeholder="Contraseña" 
          secureTextEntry 
          value={password}
          onChangeText={setPassword} />
      </View > 
      { error && (
              <Text style={styles.errorMessages}> 
             {errorMessages} 
             : Revisa tus credenciales y intenta de nuevo
              </Text>)
              
            }
       <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Iniciar Session</Text>          
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Aun no tienes una Cuenta?</Text> 
        <TouchableOpacity  onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerLink}>Registrate aqui?</Text>
        </TouchableOpacity>
      </View>
       
       <Text >Salir</Text>
       {/*<Button title="Iniciar sesión" onPress={handleLogin} /> 
      <Button title="Iniciar sesión" />
      <Button title="Registrarse"  />  */}
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.variante1,
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal:30,
  },
  logo:{
    width:100,
    height:100,
    resizeMode:'contain', 
    marginBottom:30,
  },
  title:{
    fontSize:18,
    color:colors.luminous,
    fontWeight:'600',
    marginBottom:20,
  },
  inputcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:colors.fondoClaro,
    borderRadius:10,
    borderWidth:1,
    borderColor:colors.variante3,
    marginBottom:15,
    paddingHorizontal:10,     
  },

  icon:{
    marginRight:10,
  },
  input:{
    flex:1,
    height:50,
    fontSize:16,
    color:colors.thin,
  },
  forgotPassword:{
    color:colors.variante8,
    fontSize:14,
    marginBottom:20,  
  },
  loginButtonText: {
    fontSize: 16,
    color: colors.luminous,
    fontWeight: 'bold'
  },
  loginButton:{
    backgroundColor:colors.exito,
    paddingVertical:15,
    paddingHorizontal:50,
    borderRadius:30,
    marginBottom:30,
  },   
  registerContainer:{
    flexDirection:'row',
  },
  registerText:{ 
    color:colors.subtitle,
     fontSize:14,
  },
  registerLink:{
    color:colors.variante3,
    fontSize:14,
    fontWeight:'bold',
  },
  errorMessages:{
    color:colors.error,
    fontSize:14,
    marginBottom:10,
  },
});