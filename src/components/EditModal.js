 import React, { useState } from 'react';
import { View, Text, TextInput,StyleSheet, Modal,TouchableOpacity } from 'react-native';
import { Input} from 'react-native-elements'; 
import colors from '../constants/colors'; 

const EditModal=({ visible,title,value,onChangeText,onSave,onCancel })=> {

    return(
        <Modal visible={visible} animationType='slide' transparent={true} onRequestClose={onCancel}>
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}> 
                <View style={{alignItems:'center',justifyContent:'center',height:100,width:300,}}>
                    <Text style={{ fontSize:18, color:colors.luminous}}>{title}</Text>
                    <Input 
                       style={{alignItems:'center',justifyContent:'center',height:10,width:30,backgroundColor:'#fff'}}
                        placeholder={`nuevo :${title.toLowerCase()}`}
                        value={value}
                        onChangeText={onChangeText}
                    />                                     
                </View>   
                  <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}} >
                     <TouchableOpacity style={{alignItems:'center',justifyContent:'center',backgroundColor:colors.default,paddingHorizontal:20,  paddingVertical:10, borderRadius:30, marginBottom:30,}} onPress={onCancel}>
                        <Text style={{ fontSize:18, color:colors.luminous}}>Cancelar</Text>
                    </TouchableOpacity>
                     <TouchableOpacity style={{alignItems:'center',justifyContent:'center',backgroundColor:colors.default,paddingHorizontal:20,  paddingVertical:10, borderRadius:30, marginBottom:30,}} onPress={onSave}>
                        <Text style={{ fontSize:18, color:colors.luminous}}>Guardar</Text>
                    </TouchableOpacity>
                    </View>             
            </View>
        </Modal>
    )
}


export default EditModal;

const styles = StyleSheet.create({   
  modalcontainer: {
    flex:1,
    alignItems: 'center', 
    justifyContent:'center', 
    backgroundColor:'rgba(0,0,0,5)',   
  },
  modalContext:{
    width:'80%',
    backgroundColor:  colors.principal,
    borderRadius:10,
    padding:20,
    alignItems:'center',
    elevation: 5,
  },
   loginButton:{
      backgroundColor:colors.exito,
      paddingVertical:15,
      paddingHorizontal:50,
      borderRadius:30,
      marginBottom:30,
    },   
  modalTitle:{
    fontSize:18,
     color: colors.luminous,
    fontWeight:'bold', 
  },
  description: {
    marginVertical: 15,
    textAlign: 'center',
  },
  modalInput:{
    width:'100%',
    height:40,
    borderColor:colors.variante3,
    backgroundColor:colors.fondoClaro,
    borderWidth:1,
    borderRadius:5,
    paddingHorizontal:10,
    marginBoot:20,
  },
  modalBottons:{
    marginTop: 10,
    backgroundColor: '#2196F3',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20, 
  },
  modalButtonText: {
    fontSize: 16,
    color: colors.luminous,
    fontWeight: 'bold',
  },
  modalButton:{
    flex:1,
    paddingVertical:10,
    paddingHorizontal:5,
    borderRadius:5,
    alignItems:'center',    
    backgroundColor:colors.variante3,
  },  
  saveButton:{
    backgroundColor:colors.exito,
  },
  modalButttonText:{
    color:colors.luminous,
    fontWeight:"bold",
  },
}); 