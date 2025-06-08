import React, { useState,useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import colors from '../constants/colors';
import { useAuth } from '../context/AuthContext';
import { auth } from '../services/firebaseConfig';
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { LinearGradient } from 'expo-linear-gradient';
import EditModal from '../components/EditModal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
import ModalPicker from '../components/ModalPicker';
//import { measure } from 'react-native-reanimated';

const CLOUDINARY_CLOUD_NAME = 'dwvxnx4cz';
const CLOUDINARY_URL=`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
const UPLOAD_PRESET = 'PHOTOPERFIL';

export default function SettingScreen({ navigation }) {

    const { nagations } = useNavigation();
    const { user,setUser } = useAuth();
    const [imageUri, setImageUri] = useState(null)
    const [isImageModalVisible, setImageModalVisible] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false)
    const [modalTitle, setModalTitle] = useState('')
    const [fieldValue, setFielValue] = useState('')
    const defaultImage = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'

    useEffect(() => {
      //  alert(user.name);
        if (user && user.photoURL) {
            setImageUri(user.photoURL)
            // alert('cargofoto');
        } else {
            setImageUri(defaultImage)
           // alert('cargofoto defaut');
        }

    }, [user]);


    const handleElegirImage = async () => {
        try {
            //const {status}=await ImagePicker.requestCameraPermissionsAsync();
            const  {status}  = await ImagePicker.requestMediaLibraryPermissionsAsync();
           console.log(status)
            if (status !== 'granted') {
                showMessage({
                    message: 'Permiso denegado',
                    description: 'Se necesita permiso para acceder a la galeria.',
                    type: 'danger',
                })
                return;
            }
            const result = await ImagePicker.launchImageLibraryAsync({                
                allowsEditing: true,
                aspect:[1,1],
                quality: 0.7,
            });
             console.log(result);
            if (!result.canceled) {
                 setImageUri(result.assets[0].uri);                           
            }else{
                 showMessage({
                    message: 'Cancelado',
                    description: 'No se selleciono ninguna imagen.',
                    type: 'info',
                });
                return;
            }
           
            //setImageUrl(result.uri);
           // alert('finalizo la seleccion:',result.assets[0].uri)
        }
        catch (error) {
            console.error('Error seleccionado la imagen:', error)
            showMessage({
                message: 'Error',
                description: 'Ocuarrio un error al intentar seleccionar la imagen',
                type: 'danger',
            });
        }
    }

    const uploadImage = async () => {
        if (!user || !imageUri) {
            console.error('Usuario o URI de la imagen no valido:', { user, imageUri });
            return;
        }
        try {
            const formData = new FormData()
            formData.append('file', {
                uri: imageUri,
                type: 'image/jpeg',
                name: 'profile.jpg',
            });
            formData.append('upload_preset', UPLOAD_PRESET);

            const response = await fetch(CLOUDINARY_URL, {
                method: 'POST',
                body: formData,
            });
           
            const data = await response.json(); 
            
            if (data.secure_url) {
                
             console.log('ENTRE AL SECURE URL')
                await updateProfile(auth.currentUser, { photoURL: data.secure_url })
                setUser({ ...user, photoURL: data.secure_url })
                setImageUri(data.secure_url)
                showMessage({
                    message: 'Exitoso',
                    description: 'Foto de perfil actualizado correctamente',
                    type: 'success'
                });
            } else {
                throw new error(data.error?.message || 'No se pudo obtener la URL de la imagen subida')
            }
        }
        catch (error) {
            console.error('Error subiendo la imagen:', error)
            showMessage({
                message: 'Error ',
                description: error.message,
                type: 'danger',
            });
        } finally {
            setImageModalVisible(false);
        }
    }
  
   
    const handleEdit = (field) => {
        setModalTitle(field)
        setFielValue(
            field === 'Nombre' ? user?.displayName || ''
                : field === 'Correo' ? user?.email || ''
                    : field === 'Contraseña' ? '' : ''
        )
        setModalVisible(true)
    }

    const handleSave = async () => {
        // console.log(`Nuevo ${modalTitle}:`, fieldValue)
        try {
            if (modalTitle === 'Nombre') {
                // console.log('actualizando la contrasena...')
                await updateProfile(auth.currentUser, { displayName: fieldValue });
                showMessage({
                    message: 'Ok', description: 'Nombre Actualizado Correctamente..', type: 'success',
                })
            } else if ((modalTitle === 'Correo')) {
                await updateProfile(auth.currentUser, { displayName: fieldValue });
                showMessage({
                    message: 'Ok', description: 'Correo Actualizado Correctamente..', type: 'success',
                })
            } else if ((modalTitle === 'Contraseña')) {
                await updateProfile(auth.currentUser, { displayName: fieldValue });
                showMessage({
                    message: 'Ok', description: 'Contraseña Actualizado Correctamente..', type: 'success',
                })
            }
        } catch (error) {
            showMessage({
                message: 'Error', description: error.message, type: 'danger',
            })
        } finally {
            setModalVisible(false)
        }
    }
    const handleHome = () => {
        signOut(auth)
            .then(() => navigation.replace('Login'))
            .catch((error) => Alert.Alert('Error:', 'No se pudo cerrar'))
    }

    const handleGoBack = () => {
        navigation.goBack()
    }
    return (


        <View style={styles.container}>
            <TouchableOpacity onPress={handleGoBack}>
                <Text>Volver</Text>
            </TouchableOpacity>
            <Text style={styles.subtitle}>AJUSTES</Text>
            <Text style={styles.sectionTitle}>Sobre tu cuenta</Text>
            <View>
                <View>
                    <Text style={styles.label}>Foto Perfil</Text>
                    <Image style={{width:100,height:100,}} source={{ uri: imageUri || defaultImage }} />
                    <Text style={styles.labelText}>
                        {user?.displayName || 'sin nombre'}
                    </Text>
                </View>
                <TouchableOpacity style={styles.editButton} onPress={() => setImageModalVisible(true)}>
                    <Icon name='account-edit-outline' size={24} style={styles.icon} />
                    <Text style={styles.editButtonText}>Cambiar</Text>
                </TouchableOpacity>
            </View>
            {/* ediccion de nombre del usuario*/}
            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.car}>
                    <View style={styles.inputContainer}>
                        <Icon name='account-outline' size={24} style={styles.icon} />
                        <Text style={styles.label}>Nombre</Text>
                        <Text style={styles.labelText}>
                            {user?.displayName || 'sin nombre'}
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.editButton} onPress={() => handleEdit('Nombre')}>
                        <Icon name='account-edit-outline' size={24} style={styles.icon} />
                        <Text style={styles.editButtonText}>Editar</Text>
                    </TouchableOpacity>
                </View>
                {/* ediccion del email*/}
                <View style={styles.car}>
                    <View style={styles.inputContainer}>
                        <Icon name='email-outline' size={24} style={styles.icon} />
                        <Text style={styles.label}>Email</Text>
                        <Text style={styles.labelText}>
                            {user?.email || 'sin Email'}
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.editButton} onPress={() => handleEdit('Correo')}>
                        <Icon name='email-edit' size={24} />
                        <Text style={styles.editButtonText}>Editar</Text>
                    </TouchableOpacity>
                </View>
                {/* ediccion de la contrasena*/}
                <View style={styles.car}>
                    <View >
                        <Icon name='lock-outline' size={24} style={styles.icon} />
                        <Text style={styles.label}>Nueva Password</Text>
                        <Text style={styles.labelText}>*********</Text>
                    </View>
                    <TouchableOpacity style={styles.editButton} onPress={() => handleEdit('Contraseña')}>
                        <Icon name='lock-open-variant-outline' size={24} />
                        <Text style={styles.editButtonText}>Editar</Text>
                    </TouchableOpacity>


                </View>
                <TouchableOpacity style={styles.cerrarButton} onPress={() => navigation.navigate('MainTabs')}>
                    <Text style={styles.text}>Home</Text>
                </TouchableOpacity>
            </View>



            <EditModal
                visible={isModalVisible}
                title={modalTitle}
                value={fieldValue}
                onChangeText={setFielValue} 
                onSave={handleSave}
                onCancel={() => setModalVisible(false)}
            />
            <ModalPicker
                visible={isImageModalVisible}
                imageUri={imageUri}
                onElegirImage={handleElegirImage}
                onSave={uploadImage}
                onCancel={() => setImageModalVisible(false)}
            />
        </View>



    )

}
{/* <LinearGradient colors={colors.gradienteSecundario} style={styles.container}>
           </LinearGradient>  */}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.variante1,

    },

    icon: {
        marginRight: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.fondoClaro,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.variante3,
        marginBottom: 15,
        paddingHorizontal: 10,

    },
    subtitle: {
        fontSize: 30,
        color: colors.luminous,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 14,
        color: colors.luminous,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    label: {

        flex: 1,
        height: 50,
        fontSize: 16,
        color: colors.delicate,

    },
    car: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        height: 130,
        width: 300,
        shadowRadius: 4,
        elevation: 5,
    },
    sectionText: {
        fontSize: 10,
        color: colors.luminous,
        marginBottom: 5,
    },
    labelText: {
        fontSize: 16,
        color: colors.exito,
        fontWeight: 'bold'
    },
    editButton: {
        backgroundColor: colors.exito,
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editButtonText: {
        fontSize: 16,
        color: colors.luminous,
        fontWeight: 'bold',

    },
})   