import { Modal, View, Text, Button, StyleSheet, TouchableOpacity,Image } from 'react-native';
import colors from "../constants/colors"
import React from "react"

const ModalPicker=({visible,imageUri,onElegirImage,onSave,onCancel})=>{

     const defaultImage = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'

return(
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onCancel}>
   <View style={styles.containerPadre}  > 
              
            <View style={[styles.containerModal,styles.fondoModal]}>
                <Text style={styles.textTitle}>Cambiar Foto de Perfil</Text>                 
                <View style={{alignContent:'center',alignItems:'center'}}>                     
                {imageUri? (<Image style={{width: 100, height: 100,}} source={{uri:imageUri } } />):( 
                    <View style={{alignItems:'center',}}> 
                    <Image style={{width: 100, height: 100,}} source={{ uri:defaultImage }} />
                    <Text style={styles.text}>No tienes una Imagen</Text>
                    </View>
                     
                )}       
                 <TouchableOpacity style={[styles.button,styles.colorButtonImg]} onPress={onElegirImage}>
                    <Text style={styles.text}>Seleccionar imagen</Text>
                </TouchableOpacity>        
                </View>
                
                <View style={styles.containerBotton}>
                    <TouchableOpacity style={[styles.button,styles.colorButtonProcess]} onPress={onCancel}>
                        <Text style={styles.text}>Cancelar</Text>
                    </TouchableOpacity>
                     <TouchableOpacity style={[styles.button,styles.colorButtonProcess]} onPress={onSave}>
                        <Text style={styles.text}>Guardar</Text>
                     </TouchableOpacity>
                </View>
                <View></View>
            </View>
        </View>
    </Modal>
)
}

const styles = StyleSheet.create({
  containerPadre:{
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',      
},
  containerModal: {
   // flex: 1, // Ocupa todo el espacio disponible
    margin: 20, 
    borderRadius: 20, 
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, 
  },
  containerBotton: {
   // flex: 1, // Ocupa todo el espacio disponible
    display:'flex',  //  Para ver los límites de la vista        
    flexDirection:'row',      
    alignContent:'center',
    alignItems:'center', 
    
  },
  fondoModal:{
    backgroundColor:colors.variante3,
  },
   button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
     marginBottom: 15,
  },
  colorButtonImg:{
      backgroundColor: '#e74c3c',
  },
  colorButtonProcess:{
      backgroundColor: '#f1c40f',
  },
  text: {
    fontSize: 10,
    fontWeight: 'bold',
     color: 'white',
     
  },
  textTitle:{
    fontSize: 24,
    fontWeight: 'bold',
     color: 'white',
  }, 
});
export default ModalPicker