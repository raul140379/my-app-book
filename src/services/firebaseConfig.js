import { initializeApp } from "firebase/app";
import { initializeAuth,getReactNativePersistence } from "firebase/auth";
 import { getFirestore } from "firebase/firestore";
 import { getStorage } from "firebase/storage";
 //import  ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
 //import  ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
   apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain:  process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId:  process.env.EXPO_PUBLIC_PROYECT_ID,
  storageBucket:  process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId:  process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId:  process.env.EXPO_PUBLIC_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID

};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app,{
   // persistence:getReactNativePersistence(ReactNativeAsyncStorage),
});
const storage=getStorage(app);

export {auth,storage};


//const app = initializeApp(firebaseConfig);
//const auth =initializeAuth(app,{ persistence:getReactNativePersistence(ReactNativeAsyncStorage)});
//const storage=getFirestore(app);

//export {auth};
//export const auth = getAuth(app);
//export const db = getFirestore(app);