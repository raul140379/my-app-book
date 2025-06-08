import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth"; 
import { auth } from '../services/firebaseConfig'

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
//import { Provider } from "react-native-paper";

const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(userActual)=>{
            setUser(userActual);    
        });
        return unsubscribe;
    },[])
    return(
        <AuthContext.Provider value={{user,setUser}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth=()=>useContext(AuthContext);
/* export const AuthProvider=({children})=>{

    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{

        const unsubscribe=onAuthStateChanged(auth,(user)=>{
            setUser(user||null);
            setLoading(false);
        });        
        return unsubscribe;
    },[]);
    return(
        <AuthContext.Provider value={{user,loading}}> {children}</AuthContext.Provider>
    );
}; */
 